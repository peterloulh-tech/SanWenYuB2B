# 产业服务大厅布局整改 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按用户截图整改产业服务大厅布局、服务卡片信息层级、企业首页标语和全站公共页脚高度。

**Architecture:** 保持现有数据驱动和路由不变，仅扩展每项服务的第四个指标并重排大厅布局。公共页脚继续由 `SiteFooter` 统一负责，所有使用 `SiteLayout` 的 PC 页面同步获得紧凑样式。

**Tech Stack:** React、React Router、CSS、Node.js Test Runner、Vite。

## Global Constraints

- 所有修改和提交只保存在本地仓库，不推送远程。
- 产业服务顶部横幅右侧依次显示搜索栏、“搜索”和“发布服务需求”。
- 保留六类快速功能卡片，不保留原内容区搜索工具栏。
- 推荐服务卡片显示两行四项：服务地区、服务能力、计价方式、服务周期。
- 产业服务大厅在 1366×768 与 1920×1080 下不得出现页面纵向或横向滚动。
- 公共页脚参考消费页面布局，高度压缩但文字必须完整显示。

---

### Task 1：数据契约与回归测试

**Files:**
- Modify: `scripts/industry-services.test.mjs`
- Modify: `src/data/industryServices.js`

- [x] 先添加每项服务必须具备 `leadTime` 的展示契约测试并确认红灯。
- [x] 保持六项服务独立的服务周期数据并让测试转绿。

### Task 2：页面布局整改

**Files:**
- Modify: `src/pages/IndustryServicesPage.jsx`
- Modify: `src/styles/industry-services.css`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/components/layout/SiteFooter.jsx`
- Modify: `src/index.css`

- [x] 将搜索、搜索按钮和发布服务需求并排放入顶部横幅。
- [x] 放大分类与推荐卡片字号，将服务信息改为 2×2 指标布局。
- [x] 首页“本地部署”改为“国企平台”。
- [x] 公共页脚移除企业专属口号并压缩高度。

### Task 3：验证与本地交付

**Files:**
- Modify: `docs/CURRENT_STATE.md`

- [x] 运行全部测试、静态资源检查和生产构建。
- [x] 浏览器检查首页、产业服务大厅及其他公共页脚页面。
- [x] 确认产业服务大厅两档 PC 分辨率均无页面滚动。
- [x] 同步 Dashi、当前状态并创建本地提交。
