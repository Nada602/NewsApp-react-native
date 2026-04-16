# 📰 Briefly — Stories That Matter to You, Every Day

A mobile news aggregator app built with React Native that delivers personalized news across multiple categories with search, filtering, and authentication features.

---

## 📱 Screenshots

| Login | Sign Up | Home | Search | Filter | Filter Results |
|-------|---------|------|--------|--------|----------------|
| ![Login](./assets/loginScreen.jfif) | ![Sign Up](./assets/signUp.jfif) | ![Home](./assets/home.jfif) | ![Search](./assets/search.jfif) | ![Filter](./assets/filter.jfif) | ![Filter Results](./assets/filterResult.jfif) |

---

## ✨ Features

- **Authentication** — Login and registration screens with email/password and "Remember me" support
- **News Feed** — Browse news articles grouped by category (General, Entertainment, Health, Science, Business, Politics, Technology, Sports, World)
- **Category Tabs** — Horizontal scrollable tabs to quickly switch between news categories
- **Search** — Full-text search across all news articles with live result count
- **Filters** — Filter news by category and sort order (Latest First, etc.)
- **Theme Toggle** — Light/dark mode switcher in the top navigation bar
- **Logout** — Quick access logout button in the app header

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native |
| State Management | Redux / Redux Toolkit |
| Backend / Auth / DB | Supabase |
| API | REST API (News API) |
| Navigation | React Navigation |




## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI or React Native CLI
- A [Supabase](https://supabase.com) project
- A [News API](https://newsapi.org) key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/briefly.git
cd briefly
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root of the project:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEWS_API_KEY=your_news_api_key
NEWS_API_BASE_URL=https://newsapi.org/v2
```

4. **Run the app**

```bash
# For Expo
npx expo start

# For React Native CLI
npx react-native run-android
npx react-native run-ios
```

---

## 🔐 Authentication (Supabase)

Authentication is handled via Supabase Auth. The app supports:

- Email & password sign-up and login
- Session persistence with "Remember me"
- Secure logout

```js
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
```

---

## 📡 REST API Integration

News articles are fetched from a REST API (e.g., NewsAPI.org). Requests are managed through Redux async thunks.

```js
// store/slices/ArticleSlice.ts
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, query }) => {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/top-headlines?category=${category}&q=${query}&apiKey=${NEWS_API_KEY}`
    );
    return response.json();
  }
);
```

---

## 🗃️ Redux Store

The app uses Redux Toolkit to manage global state across three slices:

| Slice | File | Responsibility |
|-------|------|---------------|
| `ArticleSlice` | `store/slices/ArticleSlice.ts` | News articles, loading state, search & filter |
| `AuthSlices` | `store/slices/AuthSlices.ts` | User session, login/logout, registration |

---

## 📋 News Categories

Politics · Technology · Sports · Entertainment · Business · Health · Science · World · General

