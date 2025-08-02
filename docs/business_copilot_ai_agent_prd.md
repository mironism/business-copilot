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

## Summary
- **LangChain with Supabase Vector Store forms the core workflow management.**
- **SlowBaseSelector optimizes token usage with smart context pruning.**
- **Lite RAG layer ensures up-to-date data enrichment.**
- **Modular agent chains guarantee scalability.**
- **Tone & critique are fundamental design principles—not optional.**

This architecture enables BusinessCopilot to deliver lightning-fast, deeply contextual, and brutally honest business documentation advisory, creating a wow-effect from Day 1.

---

End of AI Agent PRD (Final Version).

