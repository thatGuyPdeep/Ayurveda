import { Metadata } from 'next'
import { ConsultationPageClient } from './ConsultationPageClient'

export const metadata: Metadata = {
  title: 'Ayurvedic Consultation - Expert Doctors | AyuraVeda Royale',
  description: 'Book personalized Ayurvedic consultations with certified doctors. Get expert guidance for your health concerns with traditional Ayurvedic treatments.',
}

export default function ConsultationPage() {
  return <ConsultationPageClient />
} 