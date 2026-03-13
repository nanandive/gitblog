# NANANDIVE | Cyber-Terminal Blog

A **cyber-aesthetic** terminal-themed personal blog built with Next.js 16, React 19, and TypeScript.

![Terminal](https://img.shields.io/badge/Theme-Cyberpunk-00f3ff?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- **🖥️ Terminal UI** - Interactive terminal interface with command support
- **🤖 AI Integration** - Gemini AI-powered chat assistant
- **📝 MDX Blog** - Write posts in Markdown with JSX support
- **⚡ SSG** - Static site generation for optimal performance
- **🔒 Rate Limiting** - Protect API endpoints from abuse
- **♿ Accessible** - ARIA labels and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nanandive/terminal-next.git
cd terminal-next

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the terminal interface.

## 📁 Project Structure

```
terminal-next/
├── content/posts/          # MDX blog posts
├── src/
│   ├── app/
│   │   ├── api/ask/        # AI chat endpoint
│   │   ├── blog/           # Blog routes (SSG)
│   │   └── page.tsx        # Main terminal page
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── commands/       # Terminal command handlers
│   │   ├── mdx.ts          # MDX parsing utilities
│   │   ├── rate-limit.ts   # Rate limiting
│   │   └── validation.ts   # Zod schemas
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript types
│   └── views/              # View components
└── package.json
```

## ⌨️ Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `ls` | List all blog posts |
| `cat <id>` | Read a specific post |
| `home` | Go to dashboard |
| `whoami` | Show bio |
| `ask <question>` | Query AI assistant |
| `clear` | Clear terminal |
| `date` | Show current date/time |

## 📝 Adding Blog Posts

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: 'Your Post Title'
date: '2024-12-31'
category: 'Development'
excerpt: 'A brief description of your post'
---

# Your Post Title

Your content here with **Markdown** support.
```

## 🔧 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI**: [Google Gemini](https://ai.google.dev/)
- **Validation**: [Zod](https://zod.dev/)

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nanandive/terminal-next)

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |

## 📄 License

MIT License - feel free to use this for your own blog!

---

Built with 💚 by [NANANDIVE](https://github.com/nanandive)
