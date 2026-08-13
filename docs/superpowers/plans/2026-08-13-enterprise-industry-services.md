# 企业端产业服务 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在企业端新增“产业服务”入口及可点击的服务大厅、服务详情、提交成功链路，并按要求注释首页供应链金融横幅、补充四个首页快捷按钮。

**Architecture:** 使用独立的产业服务演示数据驱动列表和详情页；页面沿用现有 `SiteLayout` 与企业端视觉体系。服务需求仅保留前端表单状态，提交后跳转静态成功页，不接入后端。

**Tech Stack:** React、React Router、Lucide React、CSS、Node.js Test Runner、Vite。

## Global Constraints

- 所有修改和提交只保存在本地仓库，不推送远程。
- 首页供应链金融横幅只注释，不删除代码。
- 新增第二排四个同款快捷按钮：一个“产业服务”，三个“功能待定”。
- 导航名称使用“产业服务”，页面标题使用“产业服务大厅”。
- 仅做企业端静态演示，不修改消费零售页面，不接入真实支付、物流、审批或后台。
- PC 页面不得出现整页横向滚动，核心操作优先在首屏可见。

---

### Task 1：首页与公共导航入口

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/layout/SiteHeader.jsx`

- [x] 注释供应链金融横幅 JSX，保留原代码。
- [x] 在首页第二排增加“产业服务”和三个“功能待定”快捷按钮。
- [x] 将公共导航的“交易服务”改为“产业服务”并指向 `/services`。

### Task 2：产业服务数据与页面链路

**Files:**
- Create: `src/data/industryServices.js`
- Create: `src/pages/IndustryServicesPage.jsx`
- Create: `src/pages/IndustryServiceDetailPage.jsx`
- Create: `src/pages/ServiceRequestSuccessPage.jsx`
- Create: `src/styles/industry-services.css`
- Modify: `src/App.jsx`
- Test: `scripts/industry-services.test.mjs`

- [x] 先编写数据与查找行为测试并确认失败。
- [x] 添加加工、包装、检测、仓储、冷链运输、船运六类演示数据和详情查找函数。
- [x] 实现服务大厅、详情表单和提交成功页，接通 `/services` 路由族。
- [x] 运行测试并确认通过。

### Task 3：验证与本地交付

**Files:**
- Modify: `docs/CURRENT_STATE.md`

- [x] 运行全部自动测试。
- [x] 运行静态资源检查和生产构建。
- [x] 浏览器检查 1366×768 和 1920×1080 的关键页面、跳转及横向滚动。
- [x] 同步 Dashi 任务结论和 `docs/CURRENT_STATE.md`，仅提交企业端相关文件。
