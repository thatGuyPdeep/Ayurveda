import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account - AyuraVeda Royale',
  description: 'Manage your account, view orders, and update your profile.',
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-charcoal mb-8 font-display">
            My Account
          </h1>
          
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <p className="text-charcoal/70 text-center py-12">
              Account management features coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 