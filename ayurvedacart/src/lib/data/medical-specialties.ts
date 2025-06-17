export interface MedicalSpecialty {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  productCount: number
  featured: boolean
  conditions: string[]
  benefits: string[]
}

export const medicalSpecialties: MedicalSpecialty[] = [
  {
    id: 'classical',
    name: 'Classical Ayurveda',
    slug: 'classical',
    description: 'Traditional Ayurvedic formulations based on ancient texts like Charaka Samhita and Sushruta Samhita',
    icon: '🏛️',
    color: 'emerald',
    productCount: 200,
    featured: true,
    conditions: ['General wellness', 'Immunity', 'Digestive health', 'Mental clarity'],
    benefits: ['Holistic healing', 'Natural immunity', 'Balanced doshas', 'Long-term wellness']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Heart and cardiovascular health solutions using time-tested Ayurvedic medicines',
    icon: '❤️',
    color: 'red',
    productCount: 120,
    featured: true,
    conditions: ['High blood pressure', 'Heart palpitations', 'Cholesterol management', 'Circulation issues'],
    benefits: ['Heart strengthening', 'Blood pressure regulation', 'Improved circulation', 'Stress reduction']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Natural skin care and treatment solutions for various dermatological conditions',
    icon: '🌿',
    color: 'green',
    productCount: 85,
    featured: true,
    conditions: ['Eczema', 'Psoriasis', 'Acne', 'Skin allergies', 'Hair loss'],
    benefits: ['Clear skin', 'Natural glow', 'Hair growth', 'Reduced inflammation']
  },
  {
    id: 'gynecology',
    name: 'Gynecology',
    slug: 'gynecology',
    description: 'Women\'s reproductive health and wellness with specialized Ayurvedic treatments',
    icon: '🌸',
    color: 'pink',
    productCount: 95,
    featured: true,
    conditions: ['Menstrual disorders', 'PCOS', 'Fertility issues', 'Menopause symptoms'],
    benefits: ['Hormonal balance', 'Regular cycles', 'Fertility support', 'Reduced discomfort']
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    slug: 'gastroenterology',
    description: 'Digestive system health and gastrointestinal disorder treatments',
    icon: '🫁',
    color: 'blue',
    productCount: 110,
    featured: false,
    conditions: ['IBS', 'Acid reflux', 'Constipation', 'Bloating', 'Ulcers'],
    benefits: ['Better digestion', 'Reduced acidity', 'Regular bowel movements', 'Gut health']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'Common health conditions and general wellness maintenance',
    icon: '⚕️',
    color: 'purple',
    productCount: 150,
    featured: false,
    conditions: ['Fever', 'Cold & cough', 'Headaches', 'Body pain', 'Fatigue'],
    benefits: ['Quick relief', 'Natural healing', 'Immunity boost', 'Energy restoration']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    slug: 'neurology',
    description: 'Nervous system health and neurological condition management',
    icon: '🧠',
    color: 'indigo',
    productCount: 75,
    featured: false,
    conditions: ['Anxiety', 'Depression', 'Insomnia', 'Memory issues', 'Stress'],
    benefits: ['Mental clarity', 'Better sleep', 'Stress relief', 'Improved memory']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    slug: 'orthopedics',
    description: 'Bone, joint, and musculoskeletal health solutions',
    icon: '🦴',
    color: 'gray',
    productCount: 90,
    featured: false,
    conditions: ['Arthritis', 'Joint pain', 'Back pain', 'Muscle stiffness', 'Bone weakness'],
    benefits: ['Pain relief', 'Improved mobility', 'Stronger bones', 'Reduced inflammation']
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    slug: 'endocrinology',
    description: 'Hormonal balance and endocrine system health',
    icon: '⚖️',
    color: 'teal',
    productCount: 65,
    featured: false,
    conditions: ['Diabetes', 'Thyroid disorders', 'Hormonal imbalance', 'Weight issues'],
    benefits: ['Blood sugar control', 'Thyroid regulation', 'Weight management', 'Energy balance']
  },
  {
    id: 'hepatology',
    name: 'Hepatology',
    slug: 'hepatology',
    description: 'Liver health and detoxification treatments',
    icon: '🫀',
    color: 'red',
    productCount: 55,
    featured: false,
    conditions: ['Fatty liver', 'Hepatitis', 'Liver detox', 'Jaundice'],
    benefits: ['Liver cleansing', 'Improved metabolism', 'Better digestion', 'Toxin removal']
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    slug: 'nephrology',
    description: 'Kidney and urinary system health maintenance',
    icon: '🫘',
    color: 'yellow',
    productCount: 70,
    featured: false,
    conditions: ['Kidney stones', 'UTI', 'Kidney dysfunction', 'Water retention'],
    benefits: ['Kidney cleansing', 'Better urination', 'Stone prevention', 'Fluid balance']
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    slug: 'pulmonology',
    description: 'Respiratory system health and breathing disorders',
    icon: '🫁',
    color: 'sky',
    productCount: 80,
    featured: false,
    conditions: ['Asthma', 'Bronchitis', 'Cough', 'Breathing difficulties'],
    benefits: ['Better breathing', 'Lung cleansing', 'Reduced cough', 'Improved oxygen flow']
  },
  {
    id: 'immunology',
    name: 'Immunology',
    slug: 'immunology',
    description: 'Immune system strengthening and autoimmune condition support',
    icon: '🛡️',
    color: 'emerald',
    productCount: 60,
    featured: false,
    conditions: ['Low immunity', 'Frequent infections', 'Allergies', 'Autoimmune disorders'],
    benefits: ['Stronger immunity', 'Disease resistance', 'Allergy relief', 'Better recovery']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Children\'s health and development support',
    icon: '👶',
    color: 'orange',
    productCount: 45,
    featured: false,
    conditions: ['Growth issues', 'Digestive problems', 'Immunity', 'Sleep disorders'],
    benefits: ['Healthy growth', 'Better appetite', 'Strong immunity', 'Peaceful sleep']
  },
  {
    id: 'geriatrics',
    name: 'Geriatrics',
    slug: 'geriatrics',
    description: 'Elder care and age-related health management',
    icon: '👴',
    color: 'slate',
    productCount: 50,
    featured: false,
    conditions: ['Age-related weakness', 'Memory decline', 'Joint problems', 'Chronic conditions'],
    benefits: ['Healthy aging', 'Better mobility', 'Mental sharpness', 'Quality of life']
  },
  {
    id: 'oncology',
    name: 'Oncology Support',
    slug: 'oncology',
    description: 'Supportive care and wellness during cancer treatment',
    icon: '🎗️',
    color: 'purple',
    productCount: 35,
    featured: false,
    conditions: ['Cancer support', 'Treatment side effects', 'Immunity boost', 'Recovery support'],
    benefits: ['Better tolerance', 'Immunity support', 'Faster recovery', 'Quality of life']
  },
  {
    id: 'psychiatry',
    name: 'Mental Wellness',
    slug: 'psychiatry',
    description: 'Mental health and emotional wellness support',
    icon: '🧘',
    color: 'violet',
    productCount: 40,
    featured: false,
    conditions: ['Stress', 'Anxiety', 'Depression', 'Sleep disorders', 'Mental fatigue'],
    benefits: ['Stress relief', 'Emotional balance', 'Better sleep', 'Mental clarity']
  }
]

export function getFeaturedSpecialties(): MedicalSpecialty[] {
  return medicalSpecialties.filter(specialty => specialty.featured)
}

export function getSpecialtyBySlug(slug: string): MedicalSpecialty | undefined {
  return medicalSpecialties.find(specialty => specialty.slug === slug)
}

export function getSpecialtyById(id: string): MedicalSpecialty | undefined {
  return medicalSpecialties.find(specialty => specialty.id === id)
}

export function getSpecialtiesByCategory(category: string): MedicalSpecialty[] {
  // This could be expanded to filter by categories if needed
  return medicalSpecialties
}

export function searchSpecialties(query: string): MedicalSpecialty[] {
  const lowercaseQuery = query.toLowerCase()
  return medicalSpecialties.filter(specialty =>
    specialty.name.toLowerCase().includes(lowercaseQuery) ||
    specialty.description.toLowerCase().includes(lowercaseQuery) ||
    specialty.conditions.some(condition => condition.toLowerCase().includes(lowercaseQuery)) ||
    specialty.benefits.some(benefit => benefit.toLowerCase().includes(lowercaseQuery))
  )
} 