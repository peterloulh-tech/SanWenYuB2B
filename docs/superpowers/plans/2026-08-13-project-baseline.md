# Project Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立轻量项目文档、归档视觉资料并完成最小演示开发基线整理。

**Architecture:** 保持现有 React/Vite 页面结构不变；文档按用途拆分，原始大文件仅保存在本地；新增一个 Node 静态资源检查脚本，在构建前验证源码引用的本地图片。

**Tech Stack:** Markdown、React、Vite、Node.js、pnpm、Dashi/taskctl。

## Global Constraints

- 所有新增和修改只保存本地仓库，禁止上传远程。
- 当前只做静态前端演示和简单跳转。
- 不全面重构现有页面。
- 修改后运行静态资源检查和生产构建。

---

### Task 1: 归档资料并建立文档

**Files:**
- Create: `AGENTS.md`
- Create: `docs/PROJECT_OVERVIEW.md`
- Create: `docs/REQUIREMENTS.md`
- Create: `docs/DEMO_GUIDE.md`
- Create: `docs/PAGES_AND_FLOWS.md`
- Create: `docs/UI_REFERENCE.md`
- Create: `docs/CHANGELOG.md`
- Create: `docs/REPORT_TEMPLATE.md`

- [ ] 归档 10 张 UI 原稿与 36 页 PPT。
- [ ] 写入本地-only硬规则和宽松开发约定。
- [ ] 记录 B2B/B2C、全产业链、低滚动和中老年易用性要求。
- [ ] 自查文档没有矛盾、占位内容或超出当前阶段的实现承诺。

### Task 2: 增加静态资源检查

**Files:**
- Create: `scripts/check-static-assets.mjs`
- Modify: `package.json`

- [ ] 编写扫描 `src/` 中绝对图片路径的检查脚本。
- [ ] 增加 `check:assets` 命令并运行，确认它因缺失 Logo 资源失败。
- [ ] 保留清晰的缺失路径输出。

### Task 3: 修复品牌 Logo 引用

**Files:**
- Create: `public/assets/brand/platform-brand-source.png`
- Modify: `src/index.css`

- [ ] 将本地首页 UI 原稿作为品牌区域的临时精确来源复制到公共资源目录。
- [ ] 调整 Logo 背景路径和原稿尺寸参数。
- [ ] 重新运行静态资源检查，预期通过。

### Task 4: 更新入口文档并验证

**Files:**
- Modify: `README.md`

- [ ] 更新项目定位、资料路径、文档入口和当前阶段说明。
- [ ] 运行 `pnpm check:assets`。
- [ ] 运行 `pnpm build`。
- [ ] 检查 Git 状态，确认没有执行远程上传。
- [ ] 将 Dashi 当前任务更新到 `in_review`，等待用户验收。

