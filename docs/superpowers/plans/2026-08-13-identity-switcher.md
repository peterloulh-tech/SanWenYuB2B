# 公共页头身份切换实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有公共页头加入已确认的单按钮身份切换，并用可测试规则表达冻结的账号状态矩阵。

**Architecture:** 将账号状态判断放在纯函数 `identityPolicy` 中，页头交互放在独立 `IdentitySwitcher` 组件中，`SiteHeader` 只负责布局组合。当前应用以游客状态演示自由浏览切换；其他账号状态由策略测试锁定，等待真实登录或后续演示入口接入。

**Tech Stack:** React、React Router、Node.js test、CSS、Vite。

## Global Constraints

- 页面草图已确认的范围仅包括公共页头身份切换和提示，不新增零售首页。
- 所有修改和 Git 提交只保存在本地，不推送远程。
- 不建设真实登录、身份注册、企业审批或权限系统。
- 现有 B2B 导航和页面路由保持可用。

---

### Task 1: 冻结身份策略

**Files:**
- Create: `src/features/identity/identityPolicy.js`
- Create: `scripts/identity-policy.test.mjs`

**Interfaces:**
- Produces: `IDENTITIES`、`ACCOUNT_STATES`、`getIdentitySwitchResult(accountState, targetIdentity)`。
- Result: `{ action: 'switch'|'open-personal'|'apply-enterprise', targetIdentity }`。

- [x] **Step 1:** 先写游客、仅个人、仅企业和双身份的失败测试。
- [x] **Step 2:** 运行 `node --test scripts/identity-policy.test.mjs`，确认因模块不存在而失败。
- [x] **Step 3:** 实现最小纯函数，使账号状态矩阵测试通过。
- [x] **Step 4:** 运行完整 `pnpm test`，确认全部通过。

### Task 2: 实现已确认的页头交互

**Files:**
- Create: `src/components/layout/IdentitySwitcher.jsx`
- Modify: `src/components/layout/SiteHeader.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `getIdentitySwitchResult` 和游客账号状态。
- Produces: 单个当前身份按钮、身份选择卡片、游客说明以及开通/入驻提示弹窗结构。

- [x] **Step 1:** 扩展轻量源代码测试，要求 `SiteHeader` 引入 `IdentitySwitcher` 且不出现两个固定频道导航。
- [x] **Step 2:** 运行测试并确认因组件尚未接入而失败。
- [x] **Step 3:** 实现 `IdentitySwitcher`，游客可在企业交易和个人消费之间切换当前标签；不导航到尚未确认的零售页面。
- [x] **Step 4:** 将组件接入页头并添加紧凑样式，保持现有 B2B 导航。
- [x] **Step 5:** 运行 `pnpm test`、`pnpm check:assets` 和 `pnpm build`。

### Task 3: 页面验证与状态同步

**Files:**
- Modify: `docs/CURRENT_STATE.md`
- Modify: Dashi `SALMONDIGITA-1` 评论。

**Interfaces:**
- Consumes: 浏览器检查结果和本地提交哈希。
- Produces: 可恢复的当前进度和下一张页面草图入口。

- [x] **Step 1:** 浏览器检查常见 PC 宽度，无横向滚动，身份按钮和选择卡片可见可用。
- [x] **Step 2:** 核对现有 B2B 导航和首页不受影响。
- [ ] **Step 3:** 本地提交代码与文档，不推送远程。
- [ ] **Step 4:** 更新 `CURRENT_STATE.md` 和 Dashi 简短进展，下一步为消费零售首页文字草图。
