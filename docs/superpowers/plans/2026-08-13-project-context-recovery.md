# 项目上下文恢复机制实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一个不依赖聊天历史、可在新会话或更换模型服务后快速恢复项目进度的最小上下文机制。

**Architecture:** 由 `AGENTS.md` 保存长期规则，`docs/CURRENT_STATE.md` 保存可覆盖更新的当前快照，Dashi 任务评论保存单任务交付事实。README 只提供入口，CHANGELOG 只记录方向性变化。

**Tech Stack:** Markdown、Git、Dashi/taskctl。

## Global Constraints

- 所有修改和提交只保存在本地仓库，不推送远程。
- 当前状态文档控制在一两页，不复制完整需求或任务说明。
- Dashi 任务进入 `in_review` 前必须留下标准结论。
- 只有用户明确验收后才把 Dashi 任务标记为 `done`。

---

### Task 1: 建立项目状态入口

**Files:**
- Create: `docs/CURRENT_STATE.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: Dashi 当前任务状态、Git 当前提交、项目现有验证结果。
- Produces: 新会话最小恢复入口与阅读顺序。

- [x] **Step 1:** 创建 `docs/CURRENT_STATE.md`，写明当前阶段、任务、提交、验证、风险、下一步和恢复顺序。
- [x] **Step 2:** 在 README 文档清单中加入 `docs/CURRENT_STATE.md`。
- [x] **Step 3:** 检查状态文档中没有占位内容或与 Dashi 不一致的状态。

### Task 2: 固化维护规则与任务结论格式

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/REPORT_TEMPLATE.md`
- Modify: `docs/CHANGELOG.md`

**Interfaces:**
- Consumes: Dashi 工作流与项目简要汇报规则。
- Produces: 后续会话都能遵循的状态维护约定。

- [x] **Step 1:** 在 `AGENTS.md` 增加新会话恢复顺序与强制同步时点。
- [x] **Step 2:** 在 `docs/REPORT_TEMPLATE.md` 增加 Dashi 标准任务结论模板。
- [x] **Step 3:** 在 `docs/CHANGELOG.md` 记录恢复机制已建立。

### Task 3: 本地提交并同步 Dashi

**Files:**
- Modify: Dashi `SALMONDIGITA-2` 评论与状态。

**Interfaces:**
- Consumes: 本地提交哈希、验证命令结果。
- Produces: 可追溯的基线任务交付结论。

- [x] **Step 1:** 运行 Markdown 占位符扫描、`git diff --check`、测试、静态资源检查和生产构建。
- [x] **Step 2:** 将全部基线与恢复机制修改统一提交到本地 Git。
- [x] **Step 3:** 向 `SALMONDIGITA-2` 添加“结论 / 实际完成 / 验证结果 / 注意事项 / 本地提交 / 下一步”评论。
- [x] **Step 4:** 将 `SALMONDIGITA-2` 移动到 `in_review`，等待用户确认。
