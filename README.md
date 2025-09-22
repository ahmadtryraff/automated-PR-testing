# 🌐 Next.js  App

A modern web application built with **Next.js 13+**, **Redux Toolkit**, **TypeScript**, and **Tailwind CSS**, designed with a clean and scalable folder structure for real-world applications.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v23)
* npm (v8+)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Raff-Platform/raff-admin-panel
cd your-nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Folder Structure

```
├── app/
│   ├── [locale]/                    # Internationalization with locale routing
│   │   ├── (auth)/                  # Auth route group (login, register, etc.)
│   │   │   ├── layout.tsx           # Auth layout with carousel
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login page
│   │   │   ├── header.tsx           # Auth header component
│   │   │   ├── footer.tsx           # Auth footer with language select
│   │   │   └── auth-slider.tsx      # Auth carousel component
│   │   ├── (main)/                  # Main app route group (dashboard, etc.)
│   │   │   ├── layout.tsx           # Main layout with sidebar
│   │   │   ├── page.tsx             # Dashboard home page
│   │   │   ├── loading.tsx          # Skeleton loader for main pages
│   │   │   ├── orders/
│   │   │   │   └── page.tsx         # Orders page
│   │   │   └── chat/
│   │   │       └── page.tsx         # Chat page
│   │   ├── layout.tsx               # Root locale layout
│   │   ├── rtl-handler.tsx          # RTL support for Arabic
│   │   └── locale-auth-guard.tsx    # Authentication guard
│   ├── (main)/                      # Shared main components
│   │   ├── header.tsx               # Main header component
│   │   ├── sidebar.tsx              # Navigation sidebar
│   │   ├── actions.ts               # Server actions
│   │   └── loading.tsx              # Loading component
│   └── layout.tsx                   # Root app layout
├── components/
│   ├── ui/                          # Reusable UI components
│   │   ├── skeleton.tsx             # Skeleton loader components
│   │   └── message-display.tsx      # Message/toast component
│   ├── dashboard/
│   │   └── DashboardHome.tsx        # Dashboard home component
│   └── language-select.tsx          # Language selector
├── src/
│   ├── components/                  # Legacy components
│   ├── features/
│   │   └── service-name/
│   │       ├── authSlice.ts         # Redux slice for managing auth state
│   │       └── authService.ts       # API calls related to auth
│   ├── types/
│   │   └── types.ts                 # TypeScript interfaces and type definitions
│   └── utils/
│       └── auth.ts                  # Utility functions like getToken, setToken, etc.
├── messages/                        # Internationalization messages
│   ├── en.json                      # English translations
│   └── ar.json                      # Arabic translations
├── public/                          # Static files and assets
├── .env.local                       # Environment variables (excluded from Git)
├── .gitignore                       # Ignore rules for Git
├── README.md                        # Project documentation
└── package.json                     # Project config and dependencies
```

---

## 🌍 Internationalization (i18n) Structure

The app uses **Next.js App Router** with **next-intl** for internationalization:

### Locale Routing
- **URL Structure**: `/[locale]/page` (e.g., `/en/dashboard`, `/ar/login`)
- **Supported Locales**: English (`en`) and Arabic (`ar`)
- **RTL Support**: Automatic RTL layout for Arabic locale

### Route Groups
- **`(auth)`**: Authentication pages (login, register, forgot password)
- **`(main)`**: Main application pages (dashboard, orders, chat)
- **Shared Layouts**: Common components across route groups

### Key Components
- **`rtl-handler.tsx`**: Handles RTL text direction for Arabic
- **`locale-auth-guard.tsx`**: Authentication protection for routes
- **`loading.tsx`**: Skeleton loaders for each route group
- **`language-select.tsx`**: Language switcher component

---

## 🧠 Architecture Overview

* **Routing**: Handled by the `app/[locale]/` directory using Next.js App Router with internationalization.
* **State Management**: Uses Redux Toolkit slices under `src/features/`.
* **API Layer**: Encapsulated inside `authService.ts` and similar files.
* **UI Components**: Placed under `components/` for reusability.
* **Utilities**: Common logic (e.g., auth helpers) in `src/utils/`.
* **Types**: Centralized type definitions under `src/types/`.
* **Internationalization**: Messages in `messages/` directory with next-intl.

---

## 🧪 Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Build the app for production |
| `npm run lint`  | Run ESLint on the codebase   |

---

## 📦 Environment Setup

Use a `.env.local` file to set your environment variables:

```env
NEXT_PUBLIC_BASE_URL=https://api.example.com
```

> 🔐 Do **not** commit `.env.local` to Git.

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push the branch: `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
# automated-PR-testing
