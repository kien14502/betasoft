# Frontend Project Manager 🚀

This is a **Next.js 15** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It uses **Turbopack** for blazing-fast builds, **React 19**, and a modern developer experience with TypeScript, ESLint, Prettier, Husky, and lint-staged.

---

## 📦 Tech Stack

- [Next.js 15](https://nextjs.org/) – React framework with App Router  
- [React 19](https://react.dev/) – latest React features  
- [TypeScript](https://www.typescriptlang.org/) – static type checking  
- [Ant Design 5](https://ant.design/) – UI components  
- [TanStack Query](https://tanstack.com/query/v5) – data fetching & caching  
- [Axios](https://axios-http.com/) – HTTP client  
- [Recharts](https://recharts.org/) – charts & data visualization  
- [UUID](https://www.npmjs.com/package/uuid) – unique ID generation  
- [Husky](https://typicode.github.io/husky) & [lint-staged](https://github.com/okonet/lint-staged) – Git hooks & code quality  
- [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) – code formatting & linting  

---

## ⚙️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-org/frontend-project-manager.git
cd frontend-project-manager

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:
```bash
npm run dev
```

## 🛠️ Available Scripts

| Command              | Description                          |
|-----------------------|--------------------------------------|
| `npm run dev`         | Run dev server with Turbopack        |
| `npm run build`       | Create production build              |
| `npm run start`       | Start production server              |
| `npm run api`         | Generate API client via Orval        |
| `npm run lint`        | Run ESLint                           |
| `npm run format`      | Format code with Prettier            |
| `npm run format:check`| Check formatting                     |
| `npm run prepare`     | Setup Git hooks with Husky           |

---

## 🧹 Code Quality

- **Prettier** – enforces consistent code style  
- **ESLint** – detects potential issues (`next lint` rules included)  
- **Husky + lint-staged** – run lint/format automatically before committing  

Lint & format staged files automatically on commit:

```json
"lint-staged": {
  "*.{js,ts,jsx,tsx,json,css,md}": [
    "prettier --write",
    "eslint --fix",
    "git add ."
  ]
}
```

## 📖 Learn More

- Next.js Docs
- React Docs
- Ant Design Docs
- TanStack Query Docs

>>>>>>> 7e5f677 (feat: inital project)
