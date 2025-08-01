# BusinessCopilot – Supabase Technical Spec (v0.1)

_Last updated: 2025-08-01_

> Robust, future-proof schema giving the AI agents **full historical context** of every project while maintaining GDPR-compliant data boundaries.

---

## 1. Design Principles

1. **Version Everything** – Documents & tasks are append-only; nothing is overwritten.
2. **Strong Ownership** – Every row owned by `user_id`; RLS blocks cross-account access.
3. **Explainable AI** – Persist intermediate agent outputs & events for audit/debug.
4. **Cost-Aware** – Hot paths indexed, cold history partitioned by month.
5. **Extensible** – Integrations & analytics tables are optional, can be enabled later.

---

## 2. Entity-Relationship Overview

```
users ─┬── projects ─┬── project_versions
       │             ├── documents ─┬── document_revisions
       │             │             └── document_sections
       │             ├── tasks ─┬── task_activity
       │             └── chat_sessions ─── chat_messages
       │
       └── chat_credits
```

Legend: _Singular arrows denote 1-to-many relationships._

---

## 3. Tables & Columns

### 3.1 `users`
```sql
CREATE TABLE users (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email             TEXT UNIQUE NOT NULL,
  full_name         TEXT,
  stripe_customer_id TEXT,
  is_pro            BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 `projects`
Top-level container. One per idea.
```sql
CREATE TABLE projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  idea_prompt  TEXT NOT NULL,
  current_version INT DEFAULT 1,          -- FK into project_versions.version
  status       TEXT CHECK (status IN ('processing','ready','archived')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX projects_user_id_idx ON projects(user_id);
```

### 3.3 `project_versions`
Snapshot of meta fields each time user adds detail or agent rewrites structure.
```sql
CREATE TABLE project_versions (
  project_id   UUID REFERENCES projects(id) ON DELETE CASCADE,
  version      INT  NOT NULL,
  change_note  TEXT,
  created_by   UUID,                       -- user_id or NULL (agent)
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, version)
);
```
Trigger increments `projects.current_version` when a new version inserted.

### 3.4 `documents`
High-level doc types (overview, prd, marketing, etc.) that belong to a specific project version.
```sql
CREATE TABLE documents (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID REFERENCES projects(id) ON DELETE CASCADE,
  version        INT,  -- same as project_versions.version
  section        TEXT CHECK (section IN ('overview','prd','marketing','tech','tasks')),
  is_locked      BOOLEAN DEFAULT TRUE,
  current_rev    INT DEFAULT 1,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (project_id, version, section)
);
CREATE INDEX documents_project_idx ON documents(project_id, version);
```

### 3.5 `document_revisions`
Stores full JSON of each rewrite.
```sql
CREATE TABLE document_revisions (
  document_id  UUID REFERENCES documents(id) ON DELETE CASCADE,
  rev          INT NOT NULL,
  content      JSONB NOT NULL,
  created_by   UUID,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (document_id, rev)
);
```

### 3.6 `document_sections`
Optional granular storage if we want to split large docs into paragraphs/blocks for vector search.
```sql
CREATE TABLE document_sections (
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  rev         INT,
  block_id    TEXT,
  heading     TEXT,
  body_md     TEXT,
  embedding   VECTOR,                       -- pgvector extension optional
  PRIMARY KEY (document_id, rev, block_id)
);
```

### 3.7 `tasks`
```sql
CREATE TABLE tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase        INT,
  title        TEXT,
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX tasks_project_idx ON tasks(project_id);
```

### 3.8 `task_activity`
```sql
CREATE TABLE task_activity (
  task_id      UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id      UUID,
  action       TEXT CHECK(action IN ('complete','reopen')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.9 `chat_sessions`
One per browser tab or page session – groups messages for streaming.
```sql
CREATE TABLE chat_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID REFERENCES projects(id) ON DELETE CASCADE,
  started_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.10 `chat_messages`
```sql
CREATE TABLE chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role          TEXT CHECK (role IN ('user','assistant')),
  content       TEXT,
  token_count   INT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX chat_messages_session_idx ON chat_messages(session_id);
```

### 3.11 `chat_credits`
```sql
CREATE TABLE chat_credits (
  user_id     UUID PRIMARY KEY,
  remaining   INT DEFAULT 10,
  reset_at    DATE
);
```

### 3.12 `integrations`
```sql
CREATE TABLE integrations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID,
  type        TEXT CHECK (type IN ('google_analytics','github','zapier')),
  metadata    JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.13 `events` (optional audit)
```sql
CREATE TABLE events (
  id          BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id     UUID,
  event_type  TEXT,
  payload     JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. Row-Level Security (RLS)

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view themselves" ON users
FOR SELECT USING ( id = auth.uid() );

-- Repeat similar pattern for every table referencing user_id.
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User owns project" ON projects
USING ( user_id = auth.uid() );
```
*Tables with only public data (e.g., public templates) will have relaxed policies.*

---

## 5. Helper Functions

### `consume_chat_credit`
```sql
CREATE OR REPLACE FUNCTION consume_chat_credit(p_user UUID)
RETURNS INT AS $$
DECLARE
  remaining INT;
BEGIN
  UPDATE chat_credits
  SET remaining = remaining - 1
  WHERE user_id = p_user AND remaining > 0
  RETURNING remaining INTO remaining;
  IF remaining IS NULL THEN
    RAISE EXCEPTION 'Out of credits';
  END IF;
  RETURN remaining;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### `create_document_revision` (trigger)
Auto-increments `rev` and bumps `documents.current_rev`.

---

## 6. Indexing & Partitioning

1. `document_sections.embedding` – `ivfflat` index for vector similarity (optional).
2. Time-based `events` & `chat_messages` partitioned monthly for cheap storage.
3. Combined `(project_id, phase)` idx on `tasks` for quick phase queries.

---

## 7. Stripe Webhooks

`supabase.functions` edge function receives webhook → updates `users.is_pro`, resets `chat_credits.remaining = NULL` (=> unlimited) & syncs `stripe_subscriptions` view.

---

## 8. Future Extensions

• **Snapshots** – materialized view `latest_documents` for easy joins.  
• **Vector Store** – migrate `document_sections` into pgvector for RAG.  
• **LLM Telemetry** – store latency & cost metrics per agent call.

---

## 9. Open Questions

1. **Delete / Archive flow** – soft-delete or purge on user request?  
2. **Rate limiting** – PG function to throttle free chat API calls per minute.  
3. **Multi-tenant analytics** – separate schema vs single public schema with RLS?

---

_End of spec v0.1_