# AyuraVeda Royale

A premium e-commerce platform for authentic Ayurvedic products and royal wellness consultations. Experience the finest in traditional Ayurvedic medicine with modern luxury and convenience.

## Features

- 🌿 Premium Ayurvedic products and medicines
- 👑 Royal wellness consultations with certified practitioners
- 🛒 Modern e-commerce experience with secure payments
- 📱 Responsive design for all devices
- 🔐 Secure user authentication and profiles
- 💎 Luxury shopping experience with Ayurvedic theming

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

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

## Environment Setup

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom Ayurvedic theme
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **UI Components**: Custom components with Radix UI
- **Icons**: Lucide React
- **Fonts**: Playfair Display & Inter

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and configurations
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Supabase](https://supabase.com/docs) - open source Firebase alternative
- [Zustand](https://github.com/pmndrs/zustand) - state management solution

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
