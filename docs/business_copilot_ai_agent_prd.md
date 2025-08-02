**BusinessCopilot – AI Agent System PRD (Final Version)**
**Date: 2025-08-01**

---

## AI Agent Architecture Overview

BusinessCopilot’s AI system transforms raw user ideas into comprehensive business documentation through a multi-agent layered workflow, ensuring precision, robustness, and on-point advisory.

**Core Pillars:**
1. **Agent Specialization**: Dedicated agents for Structuring, Research, Product Documentation, Marketing, Monetization, and Strategy.
2. **Contextual Depth with On-Point Reasoning**: Agents are designed to *critique, validate, and challenge* user ideas—not human-pleasers.
3. **Adaptive Prompting System**: Modular, dynamically updated prompts per agent role.
4. **Multi-Layer Context Awareness**: Ensures the advisor always “knows the business” without overwhelming token costs.

---

## Architecture Components

### 1. LLM & Core Stack
- **Primary LLM**: OpenAI GPT-4o (Multiple temperature models for varied tasks)
- **Framework**: LangChain (chains, context routing)
- **Database**: Supabase (PostgreSQL + Vector Store)
- **Vector Search**: Supabase Vector Extension (pgvector)
- **Hosting**: Vercel (Serverless Functions)

### 2. Context Handling & Efficiency Layer

#### a) **Slow Token Base Selector (SlowBaseSelector)**
- Function: Dynamically selects only the most relevant document segments to feed into prompts.
- Technique: Hybrid of semantic vector similarity and token-aware summarization.
- Benefit: Maintains context integrity without token overflows.

#### b) **Retrieval Augmented Generation (RAG-Lite)**
- Setup: Lightweight RAG layer using LangChain Retriever pulling from Supabase Vector DB.
- Trigger: Auto-triggered during user follow-up or when agents require external references.
- Scope: Market data, competitor benchmarks, validated assumptions.
- Why “Lite”: Full RAG orchestration deferred till scaling; for MVP, this will serve precise data retrieval needs.

### 3. Agent Roles & Flow
- **Idea Structurer Agent**: Refines raw idea input into actionable prompt structure.
- **Research Agent**: Pulls live data (Perplexity API), fills market assumptions.
- **Documentation Agents (Product, Marketing, Technical, Financial)**: Each specializes in crafting robust documents for their domain.
- **Synthesizer Agent**: Combines outputs into Overview, Executive Summaries, and Final Packs.
- **AI Advisor Agent**: Front-facing conversational agent, layered with context-driven follow-ups.

### 4. Response Behavior & Tone
- Non-pleaser policy: Agents will challenge flawed ideas, offer contrarian perspectives.
- Short-form default answers; expandable upon user demand.
- Sarcasm/Wit Layer: Calibrated to professional tone but with personality (custom prompt rules).

### 5. Follow-Up Flow
- AI Advisor generates sharp follow-up prompts after each major output.
- Free users are limited to a set number of credits.
- Pro users can iterate deeply with AI Advisor, refining plans contextually.

---

## Operations & Reliability Additions

### Prompt Versioning & Lifecycle
- Each agent prompt template is stored in Supabase table `agent_prompts` (id, agent_role, version, content, created_at, author).
- Agents fetch the latest `is_active = true` version at runtime.
- Rollback: toggle `is_active` or pin a version via query param—no redeploy required.
- Every prompt change is diff-logged for audit and A/B testing.

### Feedback & Evaluation Loop
- **Feedback Agent** captures user thumbs-up/down and free-text comments for each generated doc.
- Records land in `agent_feedback` (idea_id, agent_id, version, score, comment, token_cost).
- Nightly job aggregates acceptance-rate, hallucination count, and avg completion time.

### Error Handling & Fallback
- Central ErrorMiddleware wraps every LLM/API call.
- Perplexity outage → use cached market snapshot or mark section “needs data”.
- OpenAI rate-limit → exponential backoff; after 3 retries downgrade to GPT-3.5.

### Concurrency & Queueing
- Supabase Function `job_dispatcher` inserts tasks into `jobs` table.
- State machine: queued → running → succeeded/failed; max 3 concurrent chains per user.
- Prevents token-blast when traffic spikes.

### Security & Access Controls
- Supabase RLS restricts `ideas`, `documents`, `agent_outputs` to row owner.
- Agents operate strictly within user context; secrets live in Vercel env vars.

### Monitoring & Alerting
- OpenAI usage logs synced nightly to Supabase for cost analytics.
- Supabase “observer” streams logs to Logflare; Sentry captures exceptions.
- Vercel Analytics monitors latency; PagerDuty fires when p95 > 30 s or error-rate > 5 %.

### UI Handshake (Progress Signals)
- Front-end shows live chips: “Thinking…”, “Reading…”, “Analyzing…”, “Writing…”.
- Supabase Realtime broadcasts job status, reproducing Cursor-style feedback.

---

## Summary
- **LangChain + Supabase Vector Store** orchestrate multi-agent workflow.
- **Prompt Versioning** enables hot-fixes & A/B experimentation.
- **SlowBaseSelector** keeps token spend lean while **RAG-Lite** enriches context.
- **Feedback Agent & Monitoring stack** create a continuous quality loop.
- **Queue, fallback & RLS security** ensure reliability at scale.
- **UI handshake** gives users transparent, satisfying progress cues.

This architecture lets BusinessCopilot convert raw ideas into data-rich, investor-ready docs with speed and confidence.

---

End of AI Agent PRD (Final Version).

