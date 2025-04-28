# 卡片系統

這是一個使用 Next.js 和 TypeScript 開發的卡片系統。

## 部署信息

- 部署網址：https://ts-card-system.vercel.app
- GitHub 倉庫：https://github.com/tsamcservice/ts-card-system
- Vercel 專案：https://vercel.com/tsamcservice/ts-card-system

## 開發注意事項

1. 配置相關：
   - 使用 `next.config.ts` 而不是 `next.config.js`
   - 不要使用已棄用的 `swcMinify` 選項
   - 確保 TypeScript 和 ESLint 配置正確

2. 部署流程：
   - 推送到 main 分支會自動觸發部署
   - 部署狀態可以在 GitHub Actions 和 Vercel 儀表板查看
   - 部署完成後可以通過 Vercel 網址訪問

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 啟動生產服務器
npm start
```

## 技術棧

- Next.js 15.3.1
- TypeScript
- Tailwind CSS
- ESLint

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
