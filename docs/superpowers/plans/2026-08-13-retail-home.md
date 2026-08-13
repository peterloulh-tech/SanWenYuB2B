# 消费零售首页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增已确认的 `/retail` 消费零售首页，并让公共页头身份切换进入对应交易模式。

**Architecture:** 零售静态数据集中放入 `retailData.js`，页面由 `RetailHomePage` 渲染，样式使用独立 `retail-pages.css` 前缀隔离。`SiteHeader` 根据零售路由显示对应导航，`IdentitySwitcher` 负责在 `/` 与 `/retail` 之间切换。

**Tech Stack:** React、React Router、Lucide React、Node.js test、CSS、Vite、生成式图片素材。

## Global Constraints

- 本轮只实现 `/retail` 首页，不实现商品详情、购物车、结算和支付。
- 先测试后实现；所有测试、静态资源检查和生产构建必须通过。
- 所有新增内容和 Git 提交只保存在本地，不推送远程。
- 1366×768 禁止横向滚动，页面核心入口需清楚易点。

---

### Task 1: 锁定零售首页内容和路由

**Files:**
- Create: `scripts/retail-home.test.mjs`
- Create: `src/data/retailData.js`
- Modify: `src/App.jsx`
- Modify: `src/components/layout/IdentitySwitcher.jsx`
- Modify: `src/components/layout/SiteHeader.jsx`

**Interfaces:**
- Produces: `retailCategories` 四项分类和 `retailProducts` 五件商品。
- Produces: `/retail` 页面路由；身份切换分别导航 `/` 与 `/retail`。

- [x] **Step 1:** 编写源代码与数据失败测试，要求四类、五件商品、零售路由和身份导航存在。
- [x] **Step 2:** 运行 `node --test scripts/retail-home.test.mjs`，确认因零售文件不存在而失败。
- [x] **Step 3:** 实现静态数据、路由和按频道变化的页头导航。
- [x] **Step 4:** 运行 `pnpm test`，确认全部通过。

### Task 2: 生成并接入零售视觉素材

**Files:**
- Create: `public/assets/retail/retail-hero.png`
- Create: `public/assets/retail/fresh-salmon-center.png`
- Create: `public/assets/retail/salmon-sashimi.png`
- Create: `public/assets/retail/smoked-salmon.png`
- Create: `public/assets/retail/garlic-scallops.png`
- Create: `public/assets/retail/seafood-family-gift-box.png`

**Interfaces:**
- Consumes: `retailProducts[*].image`。
- Produces: 与商品名称、加工形态和包装规格对应的本地图片。

- [x] **Step 1:** 分别生成横幅和五张商品图，不在图片中生成文字、Logo 或水印。
- [x] **Step 2:** 将最终图片保存到项目素材目录并逐张检查对应关系。
- [x] **Step 3:** 运行 `pnpm check:assets`，确认所有图片引用可用。

### Task 3: 实现消费零售首页

**Files:**
- Create: `src/pages/RetailHomePage.jsx`
- Create: `src/styles/retail-pages.css`

**Interfaces:**
- Consumes: `retailCategories`、`retailProducts`。
- Produces: 横幅、保障项、四个大分类按钮和五件热门商品卡片。

- [x] **Step 1:** 实现紧凑横幅，含搜索、右侧标语和四项保障。
- [x] **Step 2:** 实现四个大图标分类按钮和五列热门推荐。
- [x] **Step 3:** 为 1366px 和更窄 PC 宽度添加无横向滚动适配。
- [x] **Step 4:** 运行 `pnpm test && pnpm check:assets && pnpm build`。

### Task 4: 浏览器验证与进度同步

**Files:**
- Modify: `docs/CURRENT_STATE.md`
- Modify: `docs/CHANGELOG.md`
- Modify: Dashi `SALMONDIGITA-1` 评论。

**Interfaces:**
- Consumes: 自动测试和浏览器验证结果。
- Produces: 新会话可恢复的当前进度与下一页面草图入口。

- [x] **Step 1:** 检查 1366×768 和 1920×1080，无横向滚动且页面完整一屏显示。
- [x] **Step 2:** 验证个人消费进入 `/retail`，企业交易返回 `/`，原有企业导航可用。
- [x] **Step 3:** 更新当前状态、变更记录和 Dashi 阶段摘要。
- [x] **Step 4:** 完整验证后本地提交，不推送远程。
