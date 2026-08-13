# 三文鱼数字化交易平台

以日照、青岛为产业中心，以三文鱼全产业链为核心，逐步覆盖其他海产品的 B2B + B2C 数字化交易与产业服务平台。当前阶段以 PC 静态演示页面和简单点击跳转为主。

> 所有新增和修改只保存在本地仓库。未经用户明确授权，不得上传或同步任何远程仓库。

## 项目文档

- `AGENTS.md`：始终生效的精简执行规则和文档路由。
- `docs/CURRENT_STATE.md`：新会话恢复入口和项目当前进度快照。
- `docs/PROJECT_OVERVIEW.md`：项目定位、背景、用户与阶段目标。
- `docs/REQUIREMENTS.md`：全产业链、B2B/B2C 和长期需求方向。
- `docs/DEVELOPMENT_WORKFLOW.md`：页面确认、开发验证、Dashi 和汇报流程。
- `docs/PAGES_AND_FLOWS.md`：页面、路由和业务链路。
- `docs/UI_REFERENCE.md`：UI 原稿和项目方案 PPT 索引。
- `docs/CHANGELOG.md`：项目方向和开发规则的关键变化。

## 技术与环境

- React、Vite、Tailwind CSS、Lucide React。
- Node.js `^20.19.0` 或 `>=22.12.0`。
- pnpm 10 或更高版本。

## 安装与运行

```bash
pnpm install
pnpm dev
```

开发服务默认访问 `http://localhost:5173`。

## 检查与构建

```bash
pnpm test
pnpm check:assets
pnpm build
pnpm preview
```

生产构建输出到 `dist/`。

## 项目结构

```text
salmon-digital-platform/
├─ public/          # 公共静态资源
├─ projectFiles/    # 本地 UI 原稿和方案资料（Git 忽略）
├─ docs/            # 当前状态、需求、流程和页面文档
├─ scripts/         # 测试与静态资源检查脚本
├─ src/
│  ├─ components/   # 公共组件
│  ├─ data/         # 共享 Mock 数据
│  ├─ layouts/      # 公共布局
│  ├─ pages/        # 路由页面
│  └─ services/     # Mock API 与未来接口访问层
├─ AGENTS.md        # 项目执行规则和文档路由
└─ README.md        # 项目入口说明
```

当前尚未接入真实后端；演示数据通过 `src/data/` 和 `src/services/` 统一维护。
