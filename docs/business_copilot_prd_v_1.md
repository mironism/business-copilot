**BusinessCopilot – Product Requirement Document (PRD)**
**Version 1.6 | Date: 2025-08-01**

---

## Executive Summary

BusinessCopilot is a web-based SaaS platform that turns raw business ideas into complete, actionable business documentation. It automates product requirement documents (PRD), implementation plans, marketing strategies, user personas, and monetization frameworks. The core focus is on solo founders, indie hackers, consultants, and SMB owners who want to validate and refine business ideas quickly, with minimal effort.

Key differentiator: **From raw idea to detailed documentation pack with AI-powered feedback loop, designed for real execution, not just fancy PDFs.**

---

## Hosting & Infrastructure

- **Frontend:** Vercel (Next.js)
- **Backend:** Node.js on Vercel Serverless Functions
- **Database & Storage:** Supabase (PostgreSQL + Storage)
- **AI Providers:** OpenAI API (GPT-4o), Perplexity API (Research mode)
- **Authentication:** Supabase Auth (email/password, Google OAuth)
- **Data Persistence:** Supabase for projects, documents and chat history (no forced expirations)
- **Compliance:** GDPR / CCPA ready from day one (data-subject access & deletion endpoints, EU region storage)
- **LLM Context Handling:** Custom prompt pipelines with long-context chaining (planned LangChain or in-house chaining system)

---

## User Types

1. **Free User**
   - Up to **3 projects**
   - Full document pack is generated, but only the **Idea Overview block** (high-level metrics & teaser paragraphs) is visible. Detailed sections are locked behind a blur overlay.
   - **10 AI Advisor chat credits / month**
   - Shareable Idea Overview (public URL)

2. **Pro User**
   - Unlimited projects
   - Full access to every document section: PRD, Implementation Plan, Marketing Plan, Monetization, etc.
   - **Unlimited AI Advisor chat (fair-use)**
   - Download documents as PDF, Markdown, and (future) Slide Decks
   - Context-aware AI Advisor chat with full project memory

---

## Core User Journey

1. **Landing Page (Hero + CTA)**
   - User sees "Turn your ideas into business" headline.
   - CTA leads to direct idea input field.
   - After user inputs their idea they are prompted to sign up / sign in.

2. **Idea Input & Clarification**
   - After authentication the captured idea is already being processed in the background.
   - System asks 2-3 clarifying questions (short trail UI). Each answered question collapses into a compact card while the next one appears, keeping focus.

3. **AI Generation Flow**
   - Agents execute:
     - Idea Structurer Agent
     - Research Agent (uses Perplexity Labs, Google Trends, Crunchbase, etc.)
     - Documentation Agent (outputs PRD, marketing, technical plan, etc.)
   - Intermediate agent outputs are persisted for debugging / explainability.

4. **Project Workspace UI**
   - **Left Sidebar:** Projects, Knowledge Base, Settings.
   - **Top Center Header:** Idea Name, Initial Prompt.
   - **Tabs:** Overview, Marketing, Development, Step-by-Step Plan, Business, Monetization (exact list TBD)
   - **Document View:** Executive Summary on top, expandable Document Sections below.
   - **Step-by-Step Plan gating:** Free users see Phase 1 tasks only; subsequent phases are blurred/locked until upgrade.
   - **Right Sidebar:** AI Advisor Chat (context-aware, updates documents).

5. **Aha Moment – Shareable Overview**
   - Potential Revenue Estimate
   - Market Size Snapshot
   - Competitor Landscape (top 3)
   - Feasibility Score (AI-generated)
   - One-click **Share** → Twitter / LinkedIn

6. **Exports**
   - On-demand generation of PDF & Markdown (files not stored long-term to allow for live edits).

7. **Follow-Up & Iteration**
   - AI Advisor proposes follow-up questions; each reply consumes one chat credit for free users.
   - Pro users enjoy unlimited interaction (fair-use policy).
   - When free users exhaust credits or click locked content, they’re redirected to **Account → Billing** where Stripe Checkout is embedded.

---

## Key Features

- Instant Idea-to-Brief Generation (fast, no fixed SLA)
- Detailed Modular Document Packs (PRD, Marketing, etc.)
- AI Advisor Chat with Context Memory (credit-based for free tier)
- Smart Follow-up Prompts to Increase Engagement
- On-Demand Exports: PDF & Markdown (Slides later)
- Shareable Overview (Viral Growth Loop)
- Project & Idea Vault (Manage Multiple Ideas)
- Knowledge Base Integration (Tech, Marketing Tips, etc.)
- Simple Credit System for Chat Interactions
- Contextual “Add Doc/Task to Chat” buttons inject relevant content into the AI Advisor

---

## Future Scope (Beyond Phase 1)

- Stripe usage-based add-ons, GitHub / Zapier integrations
- AI Copilot Mode (live chat for ongoing ops)
- Deeper financial projections & revenue models
- Voice input capture (STT)
- Slide deck exports (Google Slides or PPTX)
- Multi-LLM Support (Gemini, Claude, etc.)
- Advanced analytics (PostHog/Mixpanel)

---

## Monetization Approach

- **Free Tier:** 3 projects, limited Overview visibility, 10 chat credits / month.
- **Pro Tier (Subscription via Stripe):** Unlimited projects, docs & chat – unlocks instantly in current session once payment succeeds.
- Additional credit top-ups or feature add-ons considered later.

---

## Core Differentiators

- True multi-agent architecture with external research sources.
- Focus on **execution-ready** docs, not generic plans.
- Viral shareable Overview for growth.
- Frictionless UX — as seamless as sending a message.

---

## Notes

- Build Phase 1 around **Overview + Docs + Limited Chat**, full Copilot comes later.
- Ensure GDPR / CCPA compliance (user data export / deletion endpoints).
- Persist intermediate agent steps for transparency & debugging.

### Related Technical Docs
- [AI Agent PRD](./business_copilot_ai_agent_prd.md)
- [Supabase Tech Spec](./tech_spec_supabase.md)
- [Next.js API Spec](./tech_spec_nextjs_api.md)
- [Implementation Checklist](./implementation_checklist.md)

---

End of PRD v1.6.
