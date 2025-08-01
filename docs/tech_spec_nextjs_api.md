# BusinessCopilot – Next.js API & Hooks Spec (v0.1)

_Last updated: 2025-08-01_

> Defines **route handlers**, **server actions**, and **client hooks** that connect the React frontend to Supabase & third-party services. Targeting Next.js 14 (app router) deployed on Vercel.

---

## 1. Directory Structure (proposed)

```
/app
 ├─ (landing)/              – public marketing pages (hero, pricing, etc.)
 ├─ (auth)/                 – sign-in, callback, password reset
 ├─ dashboard/              – protected layout (projects list & workspace)
 │   └─ [projectId]/        – project workspace pages
 ├─ api/                    – REST-ish route handlers (Edge)
 │   ├─ stripe/webhook/     – POST route
 │   ├─ projects/           – collection routes
 │   │   └─ [projectId]/    – nested item routes
 │   ├─ chat/               – streaming chat relay
 │   └─ account/            – billing portal session
 └─ agents/                 – server actions (long-running generation)
/lib
 ├─ supabase/server.ts      – singleton Admin client (service key)
 ├─ supabase/client.ts      – browser client (anon key)
 ├─ auth/validate.ts        – middleware helpers (getUserOrThrow)
 ├─ queries/                – type-safe PostgREST functions (using PostgREST types or drizzle-orm)
 └─ utils/                  – misc helpers
/hooks
 ├─ useAuth.ts              – SupabaseAuth + SWR
 ├─ useProject.ts           – fetch + alert on RLS errors
 ├─ useClarifyingQs.ts
 ├─ useDocuments.ts         – returns latest + locked flag
 ├─ useChat.ts              – SSE streaming wrapper
 ├─ useChatCredits.ts       – returns remaining credits
 └─ useStripePortal.ts      – opens billing portal
```

---

## 2. Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (server only) |
| `OPENAI_API_KEY` | For agents/chat |
| `PERPLEXITY_API_KEY` | Research agent |
| `STRIPE_SECRET_KEY` | Billing |
| `STRIPE_WEBHOOK_SECRET` | Verify events |

---

## 3. Route Handlers

### 3.1 `POST /api/projects` (Create)
```
Input: { ideaPrompt: string, name?: string }
Auth: session required
Logic:
  • insert into projects (status='processing')
  • insert project_versions(version=1, change_note='initial')
  • enqueue Edge Function `/agents/generate` (see below)
Returns: { projectId }
```

### 3.2 `GET /api/projects` (List)
```
Query params: none
Returns array of minimal project rows
```

### 3.3 `PATCH /api/projects/[projectId]` (Update meta)
```
Body: { name?: string, status?: 'archived' }
```

### 3.4 `POST /api/projects/[projectId]/clarifications`
```
Body: { answers: ClarifyAnswer[] }
 • Inserts rows into clarifying_q
 • Bumps project_versions to version+1 (change_note='clarifications')
 • Triggers regenerate agent for impacted docs only
```

### 3.5 `GET /api/documents/[docId]`
```
Returns latest revision JSON.
If `documents.is_locked` and user is free → returns 402 w/ { upgradeUrl }
```

### 3.6 `POST /api/chat` (SSE stream)
> Edge runtime – streams tokens as they arrive from OpenAI.
```
Body: { projectId: UUID, message: string }
 • Calls consume_chat_credit()
 • Stores user message ➜ OpenAI ➜ stores assistant chunks incrementally
```

### 3.7 `GET /api/chat/credits`
Returns `{ remaining: number|null }` (null = unlimited)

### 3.8 `POST /api/account/portal` (Stripe Customer Portal)
Returns `{ url }`

### 3.9 `POST /api/stripe/webhook` (Edge function, no auth)
 • Updates `users.is_pro` & `chat_credits`

---

## 4. Server Actions / Edge Functions (agents)

`/agents/generate` – Runs Idea->Doc pipeline (can be a Vercel Function w/ 15min timeout, or Supabase Edge function).

Steps:
1. Load project + clarifications
2. Call Idea Structurer ➜ produce outline (persist in document_revisions)
3. Call Research Agent ➜ enrich JSON (persist)
4. Call Doc Agent ➜ produce PRD, marketing, etc.
5. Update `documents.is_locked` (overview unlocked)
6. Set `projects.status='ready'`

Future: run as background cron to refresh docs.

---

## 5. Client Hooks (SWR / React Query)

### `useAuth()`
```ts
const { user, session, signIn, signOut } = useAuth();
```

### `useProject(projectId)`
```ts
const { data: project, mutate } = useProject(id);
```
Handles reconnection when `projects.status` moves from `processing` → `ready`.

### `useClarifyingQs(projectId)`
```ts
{ questions, sendAnswer }  // handles optimistic insertion
```

### `useDocuments(projectId, section)`
Returns `{ content, isLocked, loading }`.

### `useChat(projectId)`
```ts
const { messages, sendMessage, remainingCredits } = useChat(id);
```
Streams via Server-Sent Events.

### `useStripePortal()`
```ts
openPortal();  // fetches /api/account/portal then window.location = url;
```

---

## 6. Middleware

`middleware.ts` (Edge) protects `/dashboard` routes: redirect to `/auth/login` if no session.

---

## 7. Error Codes & Conventions

| HTTP | Meaning |
|------|---------|
| 401  | Not authenticated |
| 402  | Payment required (locked doc / no credits) |
| 403  | RLS forbidden |
| 422  | Validation error |

Client hooks map 402 → open billing modal.

---

## 8. Testing Strategy

1. **Unit:** mock Supabase client for helper functions.
2. **Integration:** Playwright tests use Supabase shadow DB.
3. **Load:** k6 script for `/api/chat` streaming.

---

## 9. Open Questions

1. Use TanStack Query vs built-in React cache?  
2. Place Edge Functions in Supabase or Vercel Cron?  
3. Where to store OpenAI tokens for cost tracking (`events` table?).

---

_End of spec v0.1_