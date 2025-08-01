# BusinessCopilot – Implementation Checklist

> Granular, actionable steps we’ll tick off as we move from **dev → prod**.  Use GitHub issues or Notion to mirror these check-boxes.

---

## Legend
- [ ] **Open**  
- [x] **Done**  
- [~] **In-progress**

---

## Phase 0 – Repo Setup 🔧

| Task | Owner | Notes |
|------|-------|-------|
| [x] 0.1 Create **GitHub monorepo** (`landing/`, `app/`) | | Split landing & dashboard sub-apps |
| [x] 0.2 Push existing landing-page code | | Ensure `.env.example` committed |
| [x] 0.3 Connect **Vercel** → _two_ projects from **same repo** (`landing` & `app`) | | Auto-deploy on `main` |
| [x] 0.4 Create `.env.example` structure for app | | Local API keys setup |

---

## Phase 1 – Supabase Bootstrap 🗄️

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 1.1 Create Supabase project (EU region, “business-copilot”) | | |
| [ ] 1.2 Enable **pgvector** extension | | For future RAG |
| [ ] 1.3 Run `docs/tech_spec_supabase.md` DDL (tables + indexes) | | SQL editor or `supabase db push` |
| [ ] 1.4 Add RLS policies per spec | | Verify with test user |
| [ ] 1.5 Create helper functions (`consume_chat_credit`, triggers) | | |
| [ ] 1.6 Insert initial `chat_credits` row via migration | | default 10 |
| [ ] 1.7 Configure **Stripe** in Supabase dashboard (webhook) | | link customer id column |
| [ ] 1.8 Generate Service Role & anon keys, update Vercel env | | |

---

## Phase 2 – Auth & Billing Flow 🔐💳

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 2.1 Implement `/(auth)` pages (sign in/up, reset) using `@supabase/auth-helpers-nextjs` | | Edge runtime |
| [ ] 2.2 Setup middleware.ts to guard `/dashboard` | | Redirect unauth |
| [ ] 2.3 Create `/api/account/portal` route (Stripe portal) | | server-only key |
| [ ] 2.4 Add `/api/stripe/webhook` route (Edge) + Supabase function | | Update `users.is_pro`, credits |
| [ ] 2.5 Local end-to-end test: Free → upgrade → Pro unlocks | | |

---

## Phase 2.5 – Prompt Engineering & API Keys ✍️🔑

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 2.5.1 Draft **Agent prompt templates** (structurer, researcher, docs) | | store in `/agents/prompts` |
| [ ] 2.5.2 Configure **Env vars** in Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `OPENAI_API_KEY`, `PERPLEXITY_API_KEY`, etc.) | | test curl, refer tech spec |
| [ ] 2.5.3 Write **Prompt unit tests** (expected JSON schema) | | jest |
| [ ] 2.5.4 Add fallback instructions for prompt versioning | | canary vs stable |
| [ ] 2.5.5 Enable Prettier + ESLint monorepo config | | Consistent code style across projects |

---

## Phase 3 – Project Generation Pipeline ⚙️🤖

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 3.1 Build `/api/projects` POST handler (creates project & version 1) | | |
| [ ] 3.2 Persist idea from landing via `localStorage` + redirect | | |
| [ ] 3.3 Edge Function `/agents/generate` (Idea → Docs) | | OpenAI + Perplexity |
| [ ] 3.4 Poll project status in `useProject` hook | | processing → ready |
| [ ] 3.5 Implement clarifying Q flow (`/api/projects/:id/clarifications`) | | 2–3 Qs |
| [ ] 3.6 SSE chat route `/api/chat` streaming, credit decrement | | |
| [ ] 3.7 Blur logic + 402 responses for locked docs/tasks | | |

---

## Phase 4 – Dashboard UI 🖥️

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 4.1 Protected **Dashboard layout** (sidebar + top bar) | | Tailwind UI |
| [ ] 4.2 `<GenerationStatus>` component (rotating text) | | |
| [ ] 4.3 `<ClarifyQuestions>` component with collapsible cards | | |
| [ ] 4.4 `<Overview>` doc renderer | | Markdown → React |
| [ ] 4.5 `<DocumentViewer>` w/ blur overlay & CTA | | |
| [ ] 4.6 `<PhaseTasks>` list (phase 1 unlocked) | | |
| [ ] 4.7 `<ChatSidebar>` SSE stream with credits badge | | |
| [ ] 4.8 Billing modal integration | | opens Stripe portal |

---

## Phase 5 – Observability & Polishing 📈

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 5.1 Map **Custom Domains** – `business.com` → landing, `app.business.com` → app | | via Vercel domain settings |
| [ ] 5.2 Integrate **Google Analytics** into landing & app | | basic pageviews |
| [ ] 5.3 Log agent cost/latency to `events` table | | |
| [ ] 5.4 Playwright smoke tests (auth, project create, upgrade) | | CI on push |
| [ ] 5.5 Lighthouse perf audit | | target 85+ |
| [ ] 5.6 Add `robots.txt` & OG tags for marketing pages | | |

---

## Phase 6 – Nice-to-Have Expansions 🚀 (post-launch)

| Task | Owner | Notes |
|------|-------|-------|
| [ ] 6.1 Voice input (STT) | | Whisper or AssemblyAI |
| [ ] 6.2 Slide deck export | | Convert Markdown → Remark-reveal |
| [ ] 6.3 AI Copilot live mode | | streaming agent |
| [ ] 6.4 PostHog/Mixpanel advanced analytics | | |

---

_End of checklist v0.1_