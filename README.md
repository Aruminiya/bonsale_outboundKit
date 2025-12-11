# Bonsale OutboundKit

獨立的外撥系統，支援 Morning Call 等多種外撥功能。

## 專案特色

- 🚀 獨立部署 - 可落地或上雲
- 🔌 靈活整合 - 可透過 iframe 整合到 Bonsale
- 📦 輕量設計 - 解耦合的架構
- 🎯 可擴展 - 支援多種外撥場景

## 技術棧

- React 18 + TypeScript
- Vite
- Material-UI (MUI)
- React Router
- SWR (數據獲取)
- React Hook Form + Zod (表單驗證)

## 開發

### 安裝依賴

```bash
npm install
# or
pnpm install
```

### 啟動開發服務器

```bash
npm run dev
# or
pnpm dev
```

服務器將在 http://localhost:5174 啟動

### 構建生產版本

```bash
npm run build
# or
pnpm build
```

### 預覽生產版本

```bash
npm run preview
# or
pnpm preview
```

## 專案結構

```
src/
├── components/     # 共用組件
├── features/       # 功能模塊
│   └── morningCall/   # Morning Call 功能
├── hooks/          # 自定義 hooks
├── services/       # API 服務
├── types/          # TypeScript 類型定義
├── utils/          # 工具函數
├── locales/        # 國際化文件
├── router/         # 路由配置
└── App.tsx         # 應用主組件
```

## 環境變量

複製 `.env.example` 為 `.env` 並設置：

```
VITE_APP_API_URL=http://your-api-url
```

## 部署

### 落地部署
直接構建後部署到本地服務器

### 雲端部署
構建後可通過 iframe 整合到 Bonsale 系統
