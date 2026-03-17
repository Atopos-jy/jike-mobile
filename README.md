# react-jike-mobile 项目说明

## 1. 项目定位

这是一个基于 Vite + React + TypeScript 的移动端资讯浏览 Demo，核心体验为：

- 首页以「频道 Tabs」组织内容
- 频道下展示文章列表，支持上拉加载更多
- 点击列表项进入文章详情页展示富文本内容

## 2. 技术栈与依赖

- 构建：Vite
- 框架：React 18
- 语言：TypeScript
- 路由：react-router-dom（数据路由 `createBrowserRouter`）
- UI：antd-mobile（Tabs、List、Image、NavBar、InfiniteScroll）
- 请求：axios（在 `src/utils/http.ts` 做二次封装）
- 代码质量：ESLint（flat config）+ TypeScript 编译校验

对应依赖可在 [package.json](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/package.json) 查看。

## 3. 目录结构（按职责划分）

```
src/
  api/            # 业务 API（频道/列表/详情）
  assets/         # 静态资源（图片、svg 等）
  hooks/          # 自定义 Hook（频道 Tabs 数据获取）
  pages/          # 页面级组件（Home、Detail）
  router/         # 路由定义
  type/           # 通用类型（API 响应等）
  utils/          # 工具（axios 封装、导出聚合）
  main.tsx        # 应用入口（挂载 RouterProvider）
```

## 4. 路由与页面

路由入口在 [router/index.tsx](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/router/index.tsx#L1-L14)：

- `/`：首页（频道 Tabs + 列表）[Home](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Home/index.tsx)
- `/detail?id=xxx`：详情页（NavBar + 内容渲染）[Detail](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Detail/index.tsx)

应用入口在 [main.tsx](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/main.tsx#L1-L11)，直接使用 `RouterProvider` 渲染数据路由。

## 5. 数据请求与类型约束

### 5.1 axios 封装

`src/utils/http.ts` 将 axios 实例与常用 HTTP 方法统一封装为 `http.get/post/put/delete`，并使用泛型保证返回类型一致：

- 统一 `baseURL`、`timeout`
- 拦截器：可在请求拦截器注入 token；响应拦截器中处理 401（示例逻辑）

入口参考 [http.ts](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/utils/http.ts#L20-L79)。

### 5.2 API 模块

- 频道列表与文章列表：[api/list.ts](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/api/list.ts)
- 文章详情：[api/detail.ts](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/api/detail.ts)

类型统一用 `ApiResponse<T>`（见 [type/api.ts](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/type/api.ts)），保证 `res.data` 的可预测性。

## 6. 首页实现说明

### 6.1 频道 Tabs

首页通过自定义 Hook [useTabs](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/hooks/useTabs.ts) 获取频道列表，并渲染 `antd-mobile` 的 `Tabs.Tab`：

- `channels.map(...)` 动态生成 Tab
- 每个 Tab 内渲染对应频道的文章列表组件 `HomeList`

对应页面代码：[Home](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Home/index.tsx#L1-L29)。

### 6.2 列表与上拉加载

列表组件 [HomeList](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Home/HomeList/index.tsx#L1-L105) 负责：

- 首屏加载：监听 `channelId` 变化重新拉取
- 分页加载：使用 `InfiniteScroll`，基于 `pre_timestamp` 拉取下一页并拼接
- 跳转详情：点击 `List.Item`，导航到 `/detail?id=${art_id}`

## 7. 在页面中引入并展示 image.png（规范写法）

### 7.1 资源位置

图片位于：

`src/assets/images/image.png`

### 7.2 Vite + React 推荐引入方式（ESM 静态资源）

在 TSX 中直接以模块方式导入图片，得到的是构建后的资源 URL，然后传给组件的 `src`：

```tsx
import projectBanner from "@/assets/images/image.png";

<Image src={projectBanner} fit="cover" alt="project banner" />
```

本项目已在首页实际落地：在 [Home](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Home/index.tsx#L1-L29) 的每个 Tab 内容区顶部展示该图片，并配合 [Home/style.css](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/src/pages/Home/style.css#L1-L24) 控制尺寸与圆角效果。

### 7.3 为什么建议用这种方式

- 与 Vite 资源管线一致：会自动处理 hash、缓存与打包路径
- TypeScript 友好：引入即为 `string` 类型的资源 URL
- 不依赖运行时路径拼接，适合组件化复用

## 8. 开发与构建

基于 [package.json](file:///d:/Atopos/software_project/vscode_project/React/react-jike-mobile/package.json#L6-L11)：

```bash
npm run dev
npm run lint
npm run build
```

- `dev`：本地开发预览
- `lint`：ESLint 检查
- `build`：先 TypeScript 构建（`tsc -b`），再 Vite 打包

