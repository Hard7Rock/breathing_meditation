# 🧘 Breathing Meditation

Мінімалістичний сайт з анімаціями для практики медитативного дихання.

## 🚀 Технології

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (анімації)

## 📦 Встановлення

```bash
npm install
```

## 🏃 Запуск локально

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## 🌐 Деплой на Vercel

### Варіант 1: Через GitHub

1. Завантажте проект на GitHub
2. Зайдіть на [vercel.com](https://vercel.com)
3. Клікніть "Import Project"
4. Виберіть репозиторій
5. Натисніть "Deploy" ✨

### Варіант 2: Через Vercel CLI

```bash
npm i -g vercel
vercel
```

Vercel автоматично визначить Next.js і налаштує все сам.

## 🎨 Техніки дихання

### 1. 4-7-8 (Relaxing Breath)
- Вдих: 4 сек
- Затримка: 7 сек
- Видих: 8 сек

### 2. Box Breathing
- 4-4-4-4 секунди

### 3. Wim Hof Method
- 30-40 глибоких циклів

### 4. Alternate Nostril
- Чергування ніздрів

### 5. Coherent Breathing
- 5-6 сек вдих/видих

## 📁 Структура проекту

```
breathing-meditation/
├── app/
│   ├── page.tsx          # Головна сторінка
│   ├── 4-7-8/
│   │   └── page.tsx      # Сторінка техніки 4-7-8
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── BreathingCircle.tsx  # Анімоване коло
├── public/
│   └── sounds/           # Ambient звуки (додати)
└── package.json
```

## 🔊 Додавання звуків (опціонально)

1. Додайте .mp3 файли в `public/sounds/`
2. Використовуйте HTML Audio API:

```tsx
const audio = new Audio('/sounds/bell.mp3');
audio.play();
```

## 🎯 Наступні кроки

- [ ] Додати інші 4 техніки дихання
- [ ] Ambient звуки та музика
- [ ] Гонг/дзвіночок між фазами
- [ ] Темна/світла тема
- [ ] Налаштування тривалості
- [ ] Статистика практик
- [ ] PWA (offline режим)

## 📝 Ліцензія

MIT
