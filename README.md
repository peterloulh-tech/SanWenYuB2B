# 三文鱼数字化交易平台

面向三文鱼产业链的数字化交易与运营平台。项目围绕“能交易、能追溯、能看见”建设，连接采购商、供应商、物流仓储参与方和平台运营人员。

当前阶段已完成首页第一版，视觉设计参考 `projectFiles/微信图片_20260811113734_98_53.png`。

## 当前功能

- 平台品牌 Logo 和顶部导航。
- 三文鱼产业主题横幅。
- 商品、供应商和采购需求搜索框。
- 本地部署、安全可靠、在线交易和市场行情能力展示。
- 我要采购、我要卖鱼、我要找货和查看行情快捷入口。
- 供应链金融服务入口。
- 今日市场行情。
- 热门现货商品。
- 最新采购需求。
- 优质供应商。
- 平台经营数据统计。
- 页面底部平台信息。
- 首页业务数据异步 Mock API 加载。
- 产品大厅、商品详情、采购大厅和市场行情页面。
- 报价对比、确认订单、订单列表及冷链履约详情。
- 供应商、供应链金融、帮助中心和演示表单流程。
- 平台运营管理后台和产业数据大屏。
- React Router 页面导航及业务链路跳转。
- 独立移动端首页和移动端交易中心。
- 商品、金融主视觉等图片均使用项目本地资源，不依赖外部图片服务。

## 技术栈

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- pnpm

## 环境要求

- Node.js 20 或更高版本。
- pnpm 10 或更高版本。

也可以使用 npm 安装和运行项目。

## 安装依赖

```bash
pnpm install
```

## 启动开发服务

```bash
pnpm dev
```

默认访问地址：

```text
http://localhost:5173
```

若需要允许局域网设备访问：

```bash
pnpm dev -- --host 0.0.0.0
```

## 生产构建

```bash
pnpm build
```

构建结果输出到 `dist/`。

## 本地预览生产构建

```bash
pnpm preview
```

## 项目结构

```text
salmon-digital-platform/
├─ public/
│  └─ assets/                 # 首页横幅等公共静态资源
├─ projectFiles/              # 原始方案汇报和界面设计图
├─ src/
│  ├─ App.jsx                 # 路由配置
│  ├─ components/             # 公共布局、UI 和业务组件
│  ├─ data/                   # 页面共享 Mock 数据
│  ├─ layouts/                # 公共页面布局
│  ├─ pages/                  # 独立路由页面
│  ├─ services/               # Mock API 与未来真实 API 访问层
│  ├─ index.css               # Tailwind 引入和全局样式
│  └─ main.jsx                # React 应用入口
├─ AGENTS.md                  # 项目长期上下文、功能清单和变更记录
├─ index.html                 # Vite HTML 入口
├─ package.json               # 项目依赖和脚本
├─ vite.config.js             # Vite 和 Tailwind 配置
└─ README.md                  # 项目说明
```

## Mock API

当前尚未接入后端服务，首页数据由 `src/services/homeService.js` 模拟异步接口调用，共享数据位于 `src/data/mockData.js`。

```js
homeService.getHome().then((data) => {
  // 使用首页行情、商品、采购需求、供应商和统计数据
})
```

后续接入真实 API 时，应保留统一的数据访问层，避免在页面组件中散落请求地址和请求逻辑。

## 设计与样式约定

- 设计资料统一存放在 `projectFiles/`。
- 首页主要参考 `微信图片_20260811113734_98_53.png`。
- 主要文字色为 `#00015F`，次级文字色为 `#434973`，全站主题蓝为 `#0051FE`；橙色、绿色和紫色仅用于业务类型及状态强调。
- 主要内容区域统一使用最大 `1516px` 宽度和一致的左右对齐基线。
- 横幅背景保持宽高比，使用等比例裁切铺满，不可强制拉伸。
- 横幅中的标题、搜索框、能力标签和宣传语使用 React/HTML 渲染，不写入背景图片。
- 中文字体优先使用苹方、微软雅黑 UI 等圆润无衬线字体。
- 全站通用按钮保持紧凑的上下内边距，顶部导航固定展示供应链金融入口。

## 项目上下文

项目的完整功能范围、角色说明、技术约定、当前状态、待确认事项和需求变更记录位于 `AGENTS.md`。

开始新开发任务前，请先完整阅读 `AGENTS.md`。新增、删除或调整需求时，必须同步维护该文件。

## 当前状态

- [x] React、Vite 和 Tailwind CSS 工程初始化。
- [x] 首页第一版实现。
- [x] 首页 Mock API。
- [x] 生产构建验证。
- [ ] 首页最终视觉验收。
- [ ] 登录和用户体系。
- [x] 产品大厅和商品详情。
- [x] 采购大厅、报价对比和确认订单。
- [x] 市场行情中心。
- [x] 供应商中心。
- [x] 交易及订单履约服务。
- [x] 运营管理后台第一版。
- [x] 数据可视化大屏第一版。
- [ ] 真实后端 API 接入。

## 主要路由

| 路由 | 页面 |
| --- | --- |
| `/` | 平台首页 |
| `/products` | 产品大厅 |
| `/products/:id` | 商品详情 |
| `/procurement` | 采购需求大厅 |
| `/procurement/:id` | 报价对比 |
| `/procurement/:id/confirm` | 确认订单 |
| `/market` | 市场行情 |
| `/suppliers` | 供应商中心 |
| `/services/orders` | 订单中心 |
| `/services/orders/:id` | 订单履约详情 |
| `/finance` | 供应链金融 |
| `/help` | 帮助中心 |
| `/operations` | 运营管理后台 |
| `/data-screen` | 产业数据大屏 |
| `/mobile` | 移动端首页 |
| `/mobile/trade` | 移动端交易中心 |
