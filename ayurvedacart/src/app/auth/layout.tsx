import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication | AyuraVeda Royale - Premium Ayurvedic Wellness',
  description: 'Sign in or create your AyuraVeda Royale account to access premium Ayurvedic products, personalized consultations, and exclusive wellness benefits.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-sage-light to-pale-sage">
      {children}
    </div>
  )
} 