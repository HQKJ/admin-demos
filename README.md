# DTC Admin Demos

DTC 运营管理后端原型 demo 项目。技术栈为 React、Vite、TypeScript、React Router。

## 本地运行

```bash
npm install
npm run dev
```

## 当前路由

- `/`：退换货管理

## 新增原型页面

1. 在 `src/pages.tsx` 或 `src/pages/` 中新增页面组件。
2. 在 `src/demoRegistry.tsx` 中注册路由、标题、描述和图标。
3. 运行 `npm run build` 验证构建。

## GitHub Pages

项目已按 `/admin-demos/` 路径配置 Vite base，构建时会复制 `dist/index.html` 为 `dist/404.html`，支持 Pages 子路由刷新。
