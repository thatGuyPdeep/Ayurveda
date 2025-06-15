# AyurvedaCart - Project Setup Guide

## Prerequisites

Before setting up the AyurvedaCart project, ensure you have the following installed on your system:

### Required Software
- **Node.js**: Version 18.17.0 or higher (LTS recommended)
- **pnpm**: Version 8.0.0 or higher (Package manager)
- **Git**: Latest version for version control
- **VS Code**: Recommended IDE with extensions

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-typescript.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one"
  ]
}
```

### System Requirements
- **RAM**: Minimum 8GB (16GB recommended for optimal development experience)
- **Storage**: At least 5GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

## Initial Setup

### 1. Clone the Repository
```bash
# Clone the repository
git clone https://github.com/your-org/ayurvedacart.git
cd ayurvedacart

# Or if starting from scratch
mkdir ayurvedacart
cd ayurvedacart
git init
```

### 2. Install Package Manager
```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Verify installation
pnpm --version
```

### 3. Create Project Structure
```bash
# Create directory structure
mkdir -p src/{app,components,lib,store,types,styles}
mkdir -p src/components/{ui,forms,layout,product,cart,auth}
mkdir -p src/lib/{services,hooks,utils,validations}
mkdir -p src/app/{api,\(auth\),\(shop\),account,admin}
mkdir -p public/{images,icons}
mkdir -p __tests__/{components,lib,api}
mkdir -p docs
```

## Environment Configuration

### 1. Environment Variables Setup
Create environment files for different environments:

#### `.env.local` (Development)
```bash
# Database Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Payment Gateways
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# External Services
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
RESEND_API_KEY=your-resend-api-key

# Redis Cache
REDIS_URL=redis://localhost:6379

# Analytics and Monitoring
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
SENTRY_DSN=your-sentry-dsn

# File Upload
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### `.env.production` (Production)
```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://ayurvedacart.com

# Use production URLs and keys for all services
# Never commit this file to version control
```

#### `.env.example` (Template)
```bash
# Copy this file to .env.local and fill in your values

# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Payment Gateways
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# External Services
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
RESEND_API_KEY=

# Redis Cache
REDIS_URL=

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
SENTRY_DSN=

# File Upload
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Project Initialization

### 1. Initialize Next.js Project
```bash
# Initialize package.json
pnpm init

# Install Next.js and core dependencies
pnpm add next@14 react@18 react-dom@18

# Install TypeScript and types
pnpm add -D typescript @types/react @types/node @types/react-dom

# Install Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Next.js
Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 3. Configure TypeScript
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. Configure Tailwind CSS
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## Dependencies Installation

### 1. Core Dependencies
```bash
# UI and Styling
pnpm add @headlessui/react @heroicons/react
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react
pnpm add framer-motion

# State Management
pnpm add zustand @tanstack/react-query

# Forms and Validation
pnpm add react-hook-form @hookform/resolvers zod

# Backend Integration
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react

# Payment Processing
pnpm add razorpay stripe

# Utilities
pnpm add date-fns
pnpm add axios
pnpm add lodash @types/lodash

# Notifications
pnpm add sonner react-hot-toast
```

### 2. Development Dependencies
```bash
# Linting and Formatting
pnpm add -D eslint eslint-config-next @typescript-eslint/eslint-plugin
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
pnpm add -D @typescript-eslint/parser

# Testing
pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test

# Development Tools
pnpm add -D @types/jest
pnpm add -D husky lint-staged
pnpm add -D @next/bundle-analyzer
```

### 3. Package.json Scripts
Update `package.json`:
```json
{
  "name": "ayurvedacart",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "ANALYZE=true next build",
    "db:generate-types": "supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/types/supabase.ts"
  }
}
```

## Database Setup

### 1. Supabase Project Setup
```bash
# Install Supabase CLI (optional for local development)
npm install -g supabase

# Initialize Supabase project (if using local development)
supabase init

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Database Schema Creation
Run the database setup scripts from `DATABASE_SETUP_GUIDE.MD`:

```sql
-- Create core tables
-- (Copy the SQL from DATABASE_SETUP_GUIDE.MD)
```

### 3. Generate TypeScript Types
```bash
# Generate types from Supabase schema
pnpm run db:generate-types
```

## Development Tools Configuration

### 1. ESLint Configuration
Create `.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

### 2. Prettier Configuration
Create `.prettierrc`:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 3. Git Configuration
Create `.gitignore`:
```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
/dist

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/settings.json
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Temporary files
*.tmp
*.temp

# Database
*.db
*.sqlite
```

### 4. Husky and Lint-staged Setup
```bash
# Initialize Husky
npx husky-init && pnpm install
npx husky add .husky/pre-commit "npx lint-staged"
```

Create `.lintstagedrc.js`:
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
}
```

## Testing Setup

### 1. Jest Configuration
Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    })),
  },
}))
```

### 2. Playwright Configuration
Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## Initial File Structure

### 1. Create Basic App Structure
```bash
# Create root layout
touch src/app/layout.tsx
touch src/app/page.tsx
touch src/app/globals.css

# Create API routes
touch src/app/api/health/route.ts

# Create components
touch src/components/ui/Button.tsx
touch src/components/ui/Input.tsx
touch src/components/layout/Header.tsx
touch src/components/layout/Footer.tsx

# Create utilities
touch src/lib/utils.ts
touch src/lib/supabase.ts
```

### 2. Basic Layout Setup
Create `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AyurvedaCart - Authentic Ayurvedic Products',
  description: 'Shop authentic Ayurvedic medicines and wellness products online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

Create `src/app/page.tsx`:
```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to AyurvedaCart</h1>
      <p className="text-lg text-gray-600">
        Your trusted source for authentic Ayurvedic products
      </p>
    </main>
  )
}
```

### 3. Global Styles
Create `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 142 76% 36%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 142 76% 36%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 142 76% 36%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 142 76% 36%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Running the Development Server

### 1. Start Development
```bash
# Install all dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Start the development server
pnpm dev
```

### 2. Verify Installation
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

### 3. Run Tests
```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run linting
pnpm lint

# Check TypeScript
pnpm type-check
```

## Troubleshooting

### Common Issues

#### 1. Node.js Version Issues
```bash
# Check Node.js version
node --version

# Install correct version using nvm
nvm install 18.17.0
nvm use 18.17.0
```

#### 2. Package Installation Issues
```bash
# Clear package manager cache
pnpm store prune

# Delete node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 3. Environment Variable Issues
- Ensure all required environment variables are set in `.env.local`
- Restart the development server after changing environment variables
- Check that variable names are correct (especially `NEXT_PUBLIC_` prefix for client-side variables)

#### 4. Database Connection Issues
- Verify Supabase URL and keys are correct
- Check Supabase project status in dashboard
- Ensure database schema is properly created

#### 5. TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate types
pnpm run db:generate-types

# Restart TypeScript service in VS Code
# Command Palette -> TypeScript: Restart TS Server
```

## Next Steps

After completing the setup:

1. **Review Documentation**: Read through all the generated documentation files
2. **Database Schema**: Implement the database schema from `DATABASE_SETUP_GUIDE.MD`
3. **Authentication**: Set up authentication flows
4. **Product Catalog**: Implement product management features
5. **Shopping Cart**: Build cart functionality
6. **Payment Integration**: Configure payment gateways
7. **Testing**: Write comprehensive tests
8. **Deployment**: Set up production deployment

The project is now ready for development! Start by implementing the core features as outlined in the project plan and architecture documentation. 