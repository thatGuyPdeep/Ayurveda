# AyuraVeda Royale 🌿

A modern, full-featured e-commerce platform for Ayurvedic medicines and wellness products built with Next.js 15, TypeScript, and Supabase.

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse 500+ authentic Ayurvedic medicines across 17 medical specialties
- **Shopping Cart**: Add, remove, and manage products with real-time updates
- **Checkout System**: Secure multi-step checkout process
- **Order Management**: Track orders and view order history
- **Wishlist**: Save favorite products for later

### 🔐 Authentication & User Management
- **User Registration/Login**: Secure authentication with Supabase
- **User Profiles**: Manage personal information and preferences
- **Account Dashboard**: View orders, wishlist, and account settings

### 🎨 Modern UI/UX
- **Royal Ayurvedic Theme**: Elegant design with emerald and saffron colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Smooth Animations**: Framer Motion powered interactions

### 🏥 Medical Specialties
- Andrology, Cardiology, Classical Medicine
- Dental, Dermatology, Endocrinology
- Gastroenterology, General Medicine, Gynecology
- Hepatology, Nephrology, Neurology
- Ophthalmology, Orthopedics, Pediatrics
- Pulmonology, Trichology

### 👨‍💼 Admin Features
- Product management and inventory tracking
- Order processing and status updates
- User management and analytics
- Content management system

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: Zustand, React Query
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI, Radix UI
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ayurveda-royale.git
cd ayurveda-royale/ayurvedacart
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the `ayurvedacart` directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Set up Supabase Database**
- Create a new project on [Supabase](https://supabase.com)
- Run the SQL scripts from the setup documentation
- Configure authentication settings

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
ayurvedacart/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   └── checkout/          # Checkout process
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── product/           # Product-specific components
│   ├── lib/                   # Utilities and configurations
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Helper functions
│   ├── store/                 # State management
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── docs/                      # Documentation
└── meds/                      # Medical data and content
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The application is ready for deployment on platforms like:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Digital Ocean App Platform**

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:
- [Project Setup](docs/PROJECT_SETUP.MD)
- [API Reference](docs/API_REFERENCE.md)
- [Supabase Integration](docs/SUPABASE_INTEGRATION_PLAN.MD)
- [Theme Guide](docs/THEME.MD)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for the Ayurvedic community
- Special thanks to all contributors and testers
- Inspired by traditional Ayurvedic wisdom and modern technology

---

**AyuraVeda Royale** - Where Ancient Wisdom Meets Modern Technology 🌿✨ 