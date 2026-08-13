# Project Instruction Context Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the always-loaded project instructions while preserving every active project rule in a clearly owned, on-demand document.

**Architecture:** `AGENTS.md` becomes the compact always-on policy and document router. `docs/CURRENT_STATE.md` remains the single mutable recovery snapshot. Development, page-approval, verification, Dashi, and reporting procedures move into one on-demand `docs/DEVELOPMENT_WORKFLOW.md`; durable product facts remain in the existing overview and requirements documents.

**Tech Stack:** Markdown, local Git, Dashi `taskctl` CLI.

## Global Constraints

- Keep all changes and Git history local; do not push or create a remote PR.
- Do not change application code or any user-visible page.
- Preserve the page wireframe approval gate and all existing product, accessibility, source-attribution, verification, and task-tracking rules.
- Avoid duplicate sources of truth: each category of guidance must have one primary owner.

---

### Task 1: Compact the always-loaded instruction layer

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: existing project hard rules and documentation hierarchy.
- Produces: a concise mandatory policy plus routing links to task-specific documentation.

- [x] **Step 1:** Retain local-only Git, static-demo scope, page-approval, regression/build, PC/accessibility, data-source, and focused-change hard rules.
- [x] **Step 2:** Retain conflict precedence and route new sessions to `docs/CURRENT_STATE.md`.
- [x] **Step 3:** Replace embedded workflow, Dashi, recovery, and reporting detail with links to their owning documents.

### Task 2: Consolidate on-demand workflow guidance

**Files:**
- Create: `docs/DEVELOPMENT_WORKFLOW.md`
- Delete: `docs/DEMO_GUIDE.md`
- Delete: `docs/REPORT_TEMPLATE.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: all active guidance in the two superseded documents and workflow sections removed from `AGENTS.md`.
- Produces: one complete workflow reference and updated document index.

- [x] **Step 1:** Merge page approval, lightweight implementation, code placement, PC/accessibility, data-source, and minimum verification rules.
- [x] **Step 2:** Merge Dashi issue lifecycle, `CURRENT_STATE.md` synchronization, completion comment, and concise report format.
- [x] **Step 3:** Remove superseded files and update all live README references and tree descriptions.

### Task 3: Tighten recovery state and record the architecture change

**Files:**
- Modify: `docs/CURRENT_STATE.md`
- Modify: `docs/CHANGELOG.md`

**Interfaces:**
- Consumes: current Dashi state, current local Git state, and the active B2B/B2C design spec.
- Produces: a smaller current snapshot with the same unique next action and a durable record of the documentation architecture decision.

- [x] **Step 1:** Remove design-detail duplication already owned by the active design spec.
- [x] **Step 2:** Preserve current task statuses, implemented scope, verified baseline, constraints, recovery commands, and the next unique action.
- [x] **Step 3:** Add a changelog entry describing the instruction/document responsibility split.

### Task 4: Verify and record locally

**Files:**
- Verify: all Markdown files and Git diff.
- Update: Dashi issue `SALMONDIGITA-2` comment only; keep its status `in_review` pending user acceptance.

**Interfaces:**
- Consumes: final documentation set.
- Produces: evidence that no active rule or live reference was lost, plus a local commit and taskboard trace.

- [x] **Step 1:** Search for stale `DEMO_GUIDE.md` and `REPORT_TEMPLATE.md` references outside historical plan/spec files.
- [x] **Step 2:** Compare old and new rule coverage, inspect `git diff --check`, and measure instruction/recovery sizes.
- [x] **Step 3:** Run the production build because the repository baseline requires it after modifications.
- [x] **Step 4:** Create one local documentation commit without pushing.
- [x] **Step 5:** Add a concise Dashi refinement comment including the local commit and verification; leave the task in `in_review`.
