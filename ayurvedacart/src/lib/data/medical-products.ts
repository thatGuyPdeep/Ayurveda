// Medical Products Database - Based on 17 Medical Specialties
// Generated from comprehensive medical files

import type { Product, Brand, ProductImage } from '@/types'

export interface MedicalCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  subcategories: string[]
}

export const medicalCategories: MedicalCategory[] = [
  {
    id: 'andrology',
    name: 'Andrology',
    slug: 'andrology',
    description: 'Male reproductive health and wellness products',
    icon: 'Male',
    subcategories: ['Spermatorrhea', 'Oligospermia', 'General Wellness', 'Vitalizer', 'Erectile Dysfunction']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Heart health and cardiovascular wellness',
    icon: 'Heart',
    subcategories: ['Hypertension', 'Hyperlipidemia', 'Cardio Protective']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Skin care and dermatological treatments',
    icon: 'Droplets',
    subcategories: ['Blood Purifier', 'Anti Fungal', 'Vitiligo', 'Psoriasis', 'Eczema', 'Urticaria', 'Blemishes', 'Acne']
  },
  {
    id: 'gastrology',
    name: 'Gastroenterology',
    slug: 'gastroenterology',
    description: 'Digestive health and gastrointestinal wellness',
    icon: 'Pill',
    subcategories: ['Haemorrhoids', 'Haemostatic', 'Appetizer', 'Digestive Tonic', 'Hyper Acidity', 'Laxative', 'IBS', 'Diarrhoea', 'Anti Spasmodic', 'Amoebiasis', 'Nausea', 'Carminative']
  },
  {
    id: 'gynaecology',
    name: 'Gynaecology',
    slug: 'gynaecology',
    description: 'Women\'s health and reproductive wellness',
    icon: 'Users',
    subcategories: ['Uterine Tonic', 'PCOS', 'Leucorrhea', 'Amenorrhea', 'Vitalizer', 'Lactation', 'Menopause', 'Dysmenorrhea', 'Vaginitis']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    slug: 'orthopedics',
    description: 'Bone, joint, and muscle health',
    icon: 'Bone',
    subcategories: ['Calcium Supplement', 'Fracture', 'Osteoarthritis', 'Rheumatoid Arthritis', 'Osteoporosis', 'Arthritic Pain', 'Spondylitis & Spondylosis', 'Sciatica', 'Hyperuricemia', 'Topical Analgesic']
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    slug: 'pulmonology',
    description: 'Respiratory health and lung wellness',
    icon: 'Wind',
    subcategories: ['Cough', 'Sore Throat', 'Expectorant', 'Bronchitis']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    slug: 'neurology',
    description: 'Nervous system and brain health',
    icon: 'Brain',
    subcategories: ['Anxiolytic', 'Cognitive Tonic', 'Migraine', 'Insomnia']
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    slug: 'endocrinology',
    description: 'Hormonal and metabolic health',
    icon: 'Activity',
    subcategories: ['Hyperglycemia', 'Thyroid', 'Benign Prostatic Hyperplasia']
  },
  {
    id: 'hepatology',
    name: 'Hepatology',
    slug: 'hepatology',
    description: 'Liver health and detoxification',
    icon: 'Shield',
    subcategories: ['Hepato Protective', 'Liver Cirrhosis', 'Hepatitis', 'Jaundice']
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    slug: 'nephrology',
    description: 'Kidney and urinary system health',
    icon: 'Droplet',
    subcategories: ['Renal Stones', 'Renal Toner', 'Alkalizer', 'UTI']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    slug: 'general-medicine',
    description: 'General health and immunity boosters',
    icon: 'Plus',
    subcategories: ['Immunity Booster', 'Sinusitis', 'Anaemia', 'Obesity', 'Fever', 'Anti Oxidant', 'Platelet', 'Rejuvenator', 'Immunomodulator']
  },
  {
    id: 'classical',
    name: 'Classical Ayurveda',
    slug: 'classical-ayurveda',
    description: 'Traditional Ayurvedic formulations',
    icon: 'Leaf',
    subcategories: ['Asava & Arishta', 'Avaleha Pak', 'Pishti', 'Bhasm', 'Churna', 'Single Herbs', 'Tailam', 'Guggul', 'Kwath Kadha', 'Parpati', 'Lauh Mandur', 'Ras Rasayan', 'Vati Guti', 'Suvarna Yukt']
  },
  {
    id: 'dental',
    name: 'Dental Care',
    slug: 'dental-care',
    description: 'Oral health and dental care',
    icon: 'Smile',
    subcategories: ['Mouth Ulcers', 'Gingivitis', 'Sensitivity', 'Sore Throat', 'Tooth Pain']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    slug: 'ophthalmology',
    description: 'Eye care and vision health',
    icon: 'Eye',
    subcategories: ['Eye Drop', 'Eye Supplement']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Children\'s health and wellness',
    icon: 'Baby',
    subcategories: ['Indigestion', 'Hepato Protective', 'Dysentery', 'Immunity']
  },
  {
    id: 'trichology',
    name: 'Trichology',
    slug: 'trichology',
    description: 'Hair and scalp health',
    icon: 'Scissors',
    subcategories: ['Hair Fall', 'Dandruff']
  }
]

// Sample brands for medical products
export const medicalBrands: Brand[] = [
  {
    id: 'baidyanath',
    name: 'Baidyanath',
    slug: 'baidyanath',
    description: 'Traditional Ayurvedic medicines since 1917',
    logo_url: '/brands/baidyanath.jpg',
    website_url: 'https://baidyanath.com',
    established_year: 1917,
    country: 'India',
    certifications: ['GMP', 'ISO 9001', 'AYUSH'],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'himalaya',
    name: 'Himalaya',
    slug: 'himalaya',
    description: 'Natural wellness solutions for over 90 years',
    logo_url: '/brands/himalaya.jpg',
    website_url: 'https://himalaya.com',
    established_year: 1930,
    country: 'India',
    certifications: ['GMP', 'WHO-GMP', 'USDA Organic'],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const medicalProducts: Product[] = [
  // CARDIOLOGY PRODUCTS
  {
    id: 'arjin-tablets-alarsin',
    sku: 'AYU-ALR-001',
    name: 'Arjin Tablets',
    slug: 'arjin-tablets-hypertension',
    short_description: 'Ayurvedic tablets for hypertension management',
    description: 'Arjin tablets by Alarsin are specifically formulated for managing hypertension and cardiovascular health. This traditional Ayurvedic formulation helps in maintaining healthy blood pressure levels naturally.',
    type: 'cardiology',
    form: 'tablet',
    base_price: 285,
    selling_price: 245,
    discount_percentage: 14,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 75,
    low_stock_threshold: 10,
    pack_size: '100 tablets',
    ingredients: ['Arjuna', 'Pushkarmool', 'Jatamansi', 'Shankhpushpi'],
    indications: ['Hypertension', 'High blood pressure', 'Heart palpitations', 'Cardiovascular weakness'],
    contraindications: ['Pregnancy', 'Severe cardiac conditions'],
    dosage_instructions: 'Take 1-2 tablets twice daily with water after meals or as directed by physician',
    constitution: ['vata', 'pitta'],
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.3,
    review_count: 156,
    brand: {
      id: 'alarsin',
      name: 'Alarsin',
      slug: 'alarsin',
      description: 'Trusted Ayurvedic pharmaceuticals',
      established_year: 1973,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-20').toISOString()
  },
  {
    id: 'serpina-himalaya',
    sku: 'AYU-HIM-002',
    name: 'Serpina Tablets',
    slug: 'serpina-tablets-himalaya',
    short_description: 'Natural hypertension management tablets',
    description: 'Himalaya Serpina is a natural antihypertensive formulation that helps manage high blood pressure and promotes cardiovascular health through traditional Ayurvedic ingredients.',
    type: 'cardiology',
    form: 'tablet',
    base_price: 160,
    selling_price: 135,
    discount_percentage: 16,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 120,
    low_stock_threshold: 15,
    pack_size: '100 tablets',
    ingredients: ['Sarpagandha', 'Jatamansi', 'Shankhpushpi'],
    indications: ['Hypertension', 'Anxiety', 'Insomnia', 'Stress'],
    contraindications: ['Hypotension', 'Depression', 'Pregnancy'],
    dosage_instructions: 'Take 1 tablet twice daily with water after meals',
    constitution: ['vata', 'pitta'],
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.5,
    review_count: 89,
    brand: {
      id: 'himalaya',
      name: 'Himalaya Drug Company',
      slug: 'himalaya',
      description: 'Leading herbal healthcare company',
      established_year: 1930,
      country: 'India',
      certifications: ['WHO-GMP', 'ISO 14001', 'AYUSH Licensed'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-10').toISOString(),
    updated_at: new Date('2024-01-18').toISOString()
  },
  // DERMATOLOGY PRODUCTS
  {
    id: 'purim-himalaya',
    sku: 'AYU-HIM-003',
    name: 'Purim Tablets',
    slug: 'purim-tablets-blood-purifier',
    short_description: 'Natural blood purifier for healthy skin',
    description: 'Himalaya Purim is a comprehensive blood purifier that helps maintain clear, healthy skin. This Ayurvedic formulation combines potent herbs that detoxify blood and support skin health from within.',
    brand_id: 'himalaya',
    type: 'tablet',
    form: 'tablet',
    base_price: 185,
    selling_price: 155,
    discount_percentage: 16,
    tax_rate: 0.12,
    weight: 90,
    pack_size: '60 tablets',
    track_inventory: true,
    stock_quantity: 95,
    low_stock_threshold: 15,
    dosage_form: 'Tablet',
    ingredients: ['Neem', 'Turmeric', 'Manjistha', 'Chirayta', 'Guduchi'],
    indications: ['Acne', 'Pimples', 'Skin infections', 'Blood purification', 'Eczema'],
    contraindications: ['Pregnancy', 'Lactation', 'Children under 12'],
    dosage_instructions: '1-2 tablets twice daily with water after meals',
    constitution: ['pitta', 'kapha'],
    meta_title: 'Purim Tablets - Natural Blood Purifier for Clear Skin',
    meta_description: 'Himalaya Purim tablets for natural blood purification and healthy skin. Effective against acne and skin problems.',
    search_keywords: 'purim, blood purifier, acne, skin problems, himalaya, neem',
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    average_rating: 4.2,
    review_count: 203,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    images: [
      {
        id: 'img-purim-1',
        product_id: 'purim-himalaya',
        image_url: '/products/dermatology/purim-tablets.jpg',
        alt_text: 'Himalaya Purim Blood Purifier Tablets - 60 tablets',
        sort_order: 0,
        is_primary: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  // GASTROENTEROLOGY PRODUCTS
  {
    id: 'pilex-himalaya',
    sku: 'AYU-HIM-004',
    name: 'Pilex Tablets',
    slug: 'pilex-tablets-hemorrhoids',
    short_description: 'Ayurvedic treatment for hemorrhoids and piles',
    description: 'Himalaya Pilex is a comprehensive herbal formulation for the management of hemorrhoids (piles). It provides relief from bleeding, pain, and inflammation associated with piles while promoting healing.',
    brand_id: 'himalaya',
    type: 'tablet',
    form: 'tablet',
    base_price: 195,
    selling_price: 165,
    discount_percentage: 15,
    tax_rate: 0.12,
    weight: 90,
    pack_size: '60 tablets',
    track_inventory: true,
    stock_quantity: 80,
    low_stock_threshold: 12,
    dosage_form: 'Tablet',
    ingredients: ['Nagkesar', 'Haritaki', 'Guggulu', 'Shallaki', 'Nimba'],
    indications: ['Hemorrhoids', 'Piles', 'Bleeding piles', 'Anal fissures', 'Constipation'],
    contraindications: ['Pregnancy', 'Lactation', 'Inflammatory bowel disease'],
    dosage_instructions: '2 tablets twice daily with water after meals or as directed by physician',
    constitution: ['vata', 'pitta'],
    meta_title: 'Pilex Tablets - Natural Hemorrhoids Treatment | Himalaya',
    meta_description: 'Himalaya Pilex tablets for effective hemorrhoids treatment. Natural relief from piles, bleeding, and inflammation.',
    search_keywords: 'pilex, hemorrhoids, piles, himalaya, anal fissures',
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    average_rating: 4.4,
    review_count: 178,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    images: [
      {
        id: 'img-pilex-1',
        product_id: 'pilex-himalaya',
        image_url: '/products/gastroenterology/pilex-tablets.jpg',
        alt_text: 'Himalaya Pilex Tablets for Hemorrhoids - 60 tablets',
        sort_order: 0,
        is_primary: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  // CLASSICAL AYURVEDA PRODUCTS
  {
    id: 'ashwagandharishta-baidyanath',
    sku: 'AYU-BAID-005',
    name: 'Ashwagandharishta',
    slug: 'ashwagandharishta-nervine-tonic',
    short_description: 'Classical Ayurvedic nervine tonic and adaptogen',
    description: 'Baidyanath Ashwagandharishta is a traditional Ayurvedic fermented preparation that serves as a potent nervine tonic and adaptogen. It helps combat stress, anxiety, and fatigue while boosting overall vitality.',
    brand_id: 'baidyanath',
    type: 'liquid',
    form: 'arishta',
    base_price: 145,
    selling_price: 125,
    discount_percentage: 14,
    tax_rate: 0.12,
    weight: 450,
    pack_size: '450ml',
    track_inventory: true,
    stock_quantity: 65,
    low_stock_threshold: 10,
    dosage_form: 'Liquid',
    ingredients: ['Ashwagandha', 'Kharjura', 'Draksha', 'Madhuka', 'Jaggery'],
    indications: ['Stress', 'Anxiety', 'Fatigue', 'Insomnia', 'General weakness', 'Nervine disorders'],
    contraindications: ['Diabetes (contains jaggery)', 'Pregnancy', 'Children under 12'],
    dosage_instructions: '15-30ml twice daily with equal quantity of water after meals',
    constitution: ['vata', 'pitta'],
    meta_title: 'Ashwagandharishta - Classical Nervine Tonic | Baidyanath',
    meta_description: 'Baidyanath Ashwagandharishta - Traditional Ayurvedic nervine tonic for stress relief and vitality.',
    search_keywords: 'ashwagandharishta, nervine tonic, adaptogen, stress relief, baidyanath',
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    average_rating: 4.6,
    review_count: 134,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    images: [
      {
        id: 'img-ashwa-1',
        product_id: 'ashwagandharishta-baidyanath',
        image_url: '/products/classical/ashwagandharishta.jpg',
        alt_text: 'Baidyanath Ashwagandharishta - 450ml bottle',
        sort_order: 0,
        is_primary: true,
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  },
  // ANDROLOGY PRODUCTS
  {
    id: 'swapn-dosh-hari-tab',
    sku: 'AYU-BAID-001',
    name: 'Swapn Dosh Hari Tablets',
    slug: 'swapn-dosh-hari-tablets',
    short_description: 'Ayurvedic tablets for spermatorrhea treatment',
    description: 'Traditional Ayurvedic formulation for treating spermatorrhea and nocturnal emissions. Helps in strengthening reproductive health.',
    brand_id: 'baidyanath',
    type: 'tablet',
    form: 'tablet',
    base_price: 220,
    selling_price: 185,
    discount_percentage: 16,
    tax_rate: 18,
    weight: 50,
    track_inventory: true,
    stock_quantity: 50,
    low_stock_threshold: 10,
    dosage_form: 'tablet',
    pack_size: '60 tablets',
    ingredients: ['Swarna Bhasma', 'Abhrak Bhasma', 'Lauh Bhasma'],
    indications: ['Spermatorrhea', 'Nocturnal emissions', 'Reproductive weakness'],
    contraindications: ['Pregnancy', 'Children under 12'],
    dosage_instructions: 'Take 1-2 tablets twice daily with milk or as directed by physician',
    constitution: ['vata', 'pitta'],
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    average_rating: 4.2,
    review_count: 18,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    images: [
      {
        id: 'img1',
        product_id: 'swapn-dosh-hari-tab',
        image_url: '/placeholder-product.svg',
        alt_text: 'Swapn Dosh Hari Tablets',
        sort_order: 1,
        is_primary: true,
        created_at: '2024-01-15T00:00:00Z'
      }
    ]
  },
  {
    id: 'speman-himalaya',
    sku: 'AYU-HIM-002',
    name: 'Speman Tablets',
    slug: 'speman-tablets-himalaya',
    short_description: 'Natural male fertility enhancer',
    description: 'Himalaya Speman is a natural formulation that improves male fertility and reproductive health. Helps increase sperm count and motility.',
    brand_id: 'himalaya',
    type: 'tablet',
    form: 'tablet',
    base_price: 200,
    selling_price: 180,
    discount_percentage: 10,
    tax_rate: 18,
    weight: 60,
    track_inventory: true,
    stock_quantity: 75,
    low_stock_threshold: 15,
    dosage_form: 'tablet',
    pack_size: '60 tablets',
    ingredients: ['Kapikachchu', 'Shveta jeera', 'Makandi'],
    indications: ['Oligospermia', 'Male infertility', 'Low sperm count'],
    contraindications: ['Severe cardiac conditions'],
    dosage_instructions: 'Take 2 tablets twice daily after meals',
    constitution: ['vata', 'kapha'],
    status: 'active',
    is_featured: true,
    is_prescription_required: false,
    average_rating: 4.5,
    review_count: 32,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    images: [
      {
        id: 'img2',
        product_id: 'speman-himalaya',
        image_url: '/placeholder-product.svg',
        alt_text: 'Speman Tablets by Himalaya',
        sort_order: 1,
        is_primary: true,
        created_at: '2024-01-10T00:00:00Z'
      }
    ]
  },
  {
    id: 'semento-aimil',
    name: 'Semento Capsules',
    slug: 'semento-capsules-aimil',
    description: 'Aimil Semento is specifically formulated for oligospermia treatment. Improves sperm quality and quantity naturally.',
    short_description: 'Capsules for oligospermia treatment',
    sku: 'AYU-AIM-003',
    selling_price: 320,
    base_price: 380,
    stock_quantity: 30,
    category: 'Andrology',
    subcategory: 'Oligospermia',
    brand: 'Aimil',
    unit_size: '20 Capsules',
    is_featured: false,
    status: 'active',
    tags: ['oligospermia', 'sperm quality', 'male fertility'],
    ingredients: ['Ashwagandha', 'Safed Musli', 'Shilajit'],
    indications: ['Oligospermia', 'Asthenospermia', 'Male subfertility'],
    contraindications: ['Hypersensitivity to ingredients'],
    dosage: 'Take 1 capsule twice daily with milk',
    images: [
      {
        id: 'img3',
        image_url: '/products/semento-aimil.jpg',
        alt_text: 'Semento Capsules by Aimil',
        is_primary: true
      }
    ],
    average_rating: 4.1,
    review_count: 15,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z'
  },

  // CARDIOLOGY PRODUCTS
  {
    id: 'arjin-alarsin',
    name: 'Arjin Tablets',
    slug: 'arjin-tablets-alarsin',
    description: 'Alarsin Arjin is a cardioprotective formulation containing Arjuna extract. Helps manage hypertension and supports heart health.',
    short_description: 'Cardioprotective tablets for hypertension',
    sku: 'AYU-ALA-004',
    selling_price: 145,
    base_price: 170,
    stock_quantity: 60,
    category: 'Cardiology',
    subcategory: 'Hypertension',
    brand: 'Alarsin',
    unit_size: '100 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['hypertension', 'heart health', 'blood pressure'],
    ingredients: ['Arjuna', 'Punarnava', 'Garlic'],
    indications: ['Hypertension', 'Cardiac weakness', 'High blood pressure'],
    contraindications: ['Severe hypotension', 'Pregnancy'],
    dosage: 'Take 2 tablets twice daily before meals',
    images: [
      {
        id: 'img4',
        image_url: '/products/arjin-alarsin.jpg',
        alt_text: 'Arjin Tablets by Alarsin',
        is_primary: true
      }
    ],
    average_rating: 4.3,
    review_count: 28,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z'
  },
  {
    id: 'serpina-himalaya',
    name: 'Serpina Tablets',
    slug: 'serpina-tablets-himalaya',
    description: 'Himalaya Serpina is a natural antihypertensive that helps maintain normal blood pressure levels. Contains Sarpagandha as main ingredient.',
    short_description: 'Natural antihypertensive tablets',
    sku: 'AYU-HIM-005',
    selling_price: 160,
    base_price: 185,
    stock_quantity: 80,
    category: 'Cardiology',
    subcategory: 'Hypertension',
    brand: 'Himalaya',
    unit_size: '100 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['blood pressure', 'hypertension', 'sarpagandha'],
    ingredients: ['Sarpagandha', 'Jatamansi', 'Shankhpushpi'],
    indications: ['Mild to moderate hypertension', 'Anxiety related hypertension'],
    contraindications: ['Severe bradycardia', 'Depression'],
    dosage: 'Take 1 tablet twice daily or as directed',
    images: [
      {
        id: 'img5',
        image_url: '/products/serpina-himalaya.jpg',
        alt_text: 'Serpina Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.4,
    review_count: 45,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },

  // DERMATOLOGY PRODUCTS
  {
    id: 'purim-himalaya',
    name: 'Purim Tablets',
    slug: 'purim-tablets-himalaya',
    description: 'Himalaya Purim is a blood purifier that helps treat various skin conditions. Natural detoxification for healthy skin.',
    short_description: 'Natural blood purifier for skin health',
    sku: 'AYU-HIM-006',
    selling_price: 140,
    base_price: 165,
    stock_quantity: 90,
    category: 'Dermatology',
    subcategory: 'Blood Purifier',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['blood purifier', 'skin health', 'detox'],
    ingredients: ['Neem', 'Turmeric', 'Rubia cordifolia'],
    indications: ['Acne', 'Eczema', 'Skin allergies', 'Boils'],
    contraindications: ['Pregnancy', 'Lactation'],
    dosage: 'Take 2 tablets twice daily after meals',
    images: [
      {
        id: 'img6',
        image_url: '/products/purim-himalaya.jpg',
        alt_text: 'Purim Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.2,
    review_count: 38,
    created_at: '2024-01-18T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z'
  },

  // GASTROENTEROLOGY PRODUCTS
  {
    id: 'gasex-himalaya',
    name: 'Gasex Tablets',
    slug: 'gasex-tablets-himalaya',
    description: 'Himalaya Gasex provides relief from gas, bloating, and abdominal discomfort. Natural carminative and digestive aid.',
    short_description: 'Natural gas relief and digestive tablets',
    sku: 'AYU-HIM-007',
    selling_price: 95,
    base_price: 110,
    stock_quantity: 100,
    category: 'Gastroenterology',
    subcategory: 'Carminative',
    brand: 'Himalaya',
    unit_size: '100 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['gas relief', 'bloating', 'digestive health'],
    ingredients: ['Hingvastak', 'Shunthi', 'Maricha'],
    indications: ['Flatulence', 'Bloating', 'Abdominal discomfort'],
    contraindications: ['Inflammatory bowel disease'],
    dosage: 'Take 2 tablets twice daily before meals',
    images: [
      {
        id: 'img7',
        image_url: '/products/gasex-himalaya.jpg',
        alt_text: 'Gasex Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.3,
    review_count: 52,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z'
  },

  // GYNAECOLOGY PRODUCTS
  {
    id: 'evecare-himalaya',
    name: 'Evecare Capsules',
    slug: 'evecare-capsules-himalaya',
    description: 'Himalaya Evecare is a comprehensive uterine tonic that regulates menstrual cycles and supports women\'s reproductive health.',
    short_description: 'Comprehensive uterine tonic for women',
    sku: 'AYU-HIM-008',
    selling_price: 180,
    base_price: 210,
    stock_quantity: 65,
    category: 'Gynaecology',
    subcategory: 'Uterine Tonic',
    brand: 'Himalaya',
    unit_size: '30 Capsules',
    is_featured: true,
    status: 'active',
    tags: ['women health', 'menstrual health', 'uterine tonic'],
    ingredients: ['Ashoka', 'Lodhra', 'Shatavari'],
    indications: ['Irregular menstruation', 'Menstrual disorders', 'Leucorrhea'],
    contraindications: ['Pregnancy', 'Severe uterine bleeding'],
    dosage: 'Take 1 capsule twice daily with water',
    images: [
      {
        id: 'img8',
        image_url: '/products/evecare-himalaya.jpg',
        alt_text: 'Evecare Capsules by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.1,
    review_count: 29,
    created_at: '2024-01-22T00:00:00Z',
    updated_at: '2024-01-22T00:00:00Z'
  },

  // ORTHOPEDICS PRODUCTS
  {
    id: 'rumalaya-forte-himalaya',
    name: 'Rumalaya Forte Tablets',
    slug: 'rumalaya-forte-tablets-himalaya',
    description: 'Himalaya Rumalaya Forte provides effective relief from joint pain and inflammation. Supports healthy joints and mobility.',
    short_description: 'Joint pain relief and anti-inflammatory tablets',
    sku: 'AYU-HIM-009',
    selling_price: 265,
    base_price: 310,
    stock_quantity: 45,
    category: 'Orthopedics',
    subcategory: 'Arthritic Pain',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['joint pain', 'arthritis', 'inflammation'],
    ingredients: ['Boswellia', 'Guggulu', 'Alpinia galanga'],
    indications: ['Osteoarthritis', 'Rheumatoid arthritis', 'Joint pain'],
    contraindications: ['Severe cardiac conditions', 'Pregnancy'],
    dosage: 'Take 1 tablet twice daily after meals',
    images: [
      {
        id: 'img9',
        image_url: '/products/rumalaya-forte-himalaya.jpg',
        alt_text: 'Rumalaya Forte Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.4,
    review_count: 41,
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z'
  },

  // PULMONOLOGY PRODUCTS
  {
    id: 'koflet-himalaya',
    name: 'Koflet Syrup',
    slug: 'koflet-syrup-himalaya',
    description: 'Himalaya Koflet is an effective cough syrup that provides relief from both dry and productive cough. Natural expectorant.',
    short_description: 'Natural cough syrup for all types of cough',
    sku: 'AYU-HIM-010',
    selling_price: 85,
    base_price: 100,
    stock_quantity: 85,
    category: 'Pulmonology',
    subcategory: 'Cough',
    brand: 'Himalaya',
    unit_size: '100 ml',
    is_featured: true,
    status: 'active',
    tags: ['cough', 'cold', 'respiratory health'],
    ingredients: ['Honey', 'Vasaka', 'Tulsi'],
    indications: ['Dry cough', 'Productive cough', 'Throat irritation'],
    contraindications: ['Diabetes (contains sugar)', 'Children under 2 years'],
    dosage: 'Take 1-2 teaspoons 3 times daily',
    images: [
      {
        id: 'img10',
        image_url: '/products/koflet-himalaya.jpg',
        alt_text: 'Koflet Syrup by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.2,
    review_count: 67,
    created_at: '2024-01-28T00:00:00Z',
    updated_at: '2024-01-28T00:00:00Z'
  },

  // ENDOCRINOLOGY PRODUCTS
  {
    id: 'diabecon-himalaya',
    name: 'Diabecon Tablets',
    slug: 'diabecon-tablets-himalaya',
    description: 'Himalaya Diabecon helps maintain healthy blood sugar levels naturally. Supports pancreatic function and glucose metabolism.',
    short_description: 'Natural blood sugar management tablets',
    sku: 'AYU-HIM-011',
    selling_price: 185,
    base_price: 220,
    stock_quantity: 70,
    category: 'Endocrinology',
    subcategory: 'Hyperglycemia',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['diabetes', 'blood sugar', 'glucose management'],
    ingredients: ['Gymnema', 'Meshashringi', 'Pitasara'],
    indications: ['Type 2 diabetes', 'Prediabetes', 'Glucose intolerance'],
    contraindications: ['Type 1 diabetes', 'Severe hypoglycemia'],
    dosage: 'Take 2 tablets twice daily before meals',
    images: [
      {
        id: 'img11',
        image_url: '/products/diabecon-himalaya.jpg',
        alt_text: 'Diabecon Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.0,
    review_count: 34,
    created_at: '2024-01-30T00:00:00Z',
    updated_at: '2024-01-30T00:00:00Z'
  },

  // HEPATOLOGY PRODUCTS
  {
    id: 'liv52-himalaya',
    name: 'Liv.52 Tablets',
    slug: 'liv52-tablets-himalaya',
    description: 'Himalaya Liv.52 is a comprehensive hepatoprotective formulation that supports liver health and detoxification.',
    short_description: 'Comprehensive liver health tablets',
    sku: 'AYU-HIM-012',
    selling_price: 155,
    base_price: 180,
    stock_quantity: 120,
    category: 'Hepatology',
    subcategory: 'Hepato Protective',
    brand: 'Himalaya',
    unit_size: '100 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['liver health', 'hepatoprotective', 'detox'],
    ingredients: ['Himsra', 'Kasani', 'Mandur Bhasma'],
    indications: ['Hepatitis', 'Fatty liver', 'Liver damage', 'Alcoholic liver disease'],
    contraindications: ['Severe liver cirrhosis'],
    dosage: 'Take 2 tablets twice daily after meals',
    images: [
      {
        id: 'img12',
        image_url: '/products/liv52-himalaya.jpg',
        alt_text: 'Liv.52 Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.5,
    review_count: 89,
    created_at: '2024-02-02T00:00:00Z',
    updated_at: '2024-02-02T00:00:00Z'
  },

  // NEUROLOGY PRODUCTS
  {
    id: 'mentat-himalaya',
    name: 'Mentat Tablets',
    slug: 'mentat-tablets-himalaya',
    description: 'Himalaya Mentat is a cognitive tonic that enhances memory, concentration, and mental clarity. Supports brain health naturally.',
    short_description: 'Natural cognitive enhancer and brain tonic',
    sku: 'AYU-HIM-013',
    selling_price: 165,
    base_price: 195,
    stock_quantity: 55,
    category: 'Neurology',
    subcategory: 'Cognitive Tonic',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['memory', 'concentration', 'brain health'],
    ingredients: ['Brahmi', 'Mandukaparni', 'Shankhpushpi'],
    indications: ['Memory loss', 'Poor concentration', 'Mental fatigue'],
    contraindications: ['Severe depression', 'Bipolar disorder'],
    dosage: 'Take 1 tablet twice daily with water',
    images: [
      {
        id: 'img13',
        image_url: '/products/mentat-himalaya.jpg',
        alt_text: 'Mentat Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.1,
    review_count: 27,
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z'
  },

  // NEPHROLOGY PRODUCTS
  {
    id: 'cystone-himalaya',
    name: 'Cystone Tablets',
    slug: 'cystone-tablets-himalaya',
    description: 'Himalaya Cystone helps prevent and treat kidney stones naturally. Supports kidney health and urinary tract function.',
    short_description: 'Natural kidney stone prevention tablets',
    sku: 'AYU-HIM-014',
    selling_price: 145,
    base_price: 170,
    stock_quantity: 75,
    category: 'Nephrology',
    subcategory: 'Renal Stones',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['kidney stones', 'urinary health', 'kidney support'],
    ingredients: ['Pashanabheda', 'Gokshura', 'Punarnava'],
    indications: ['Kidney stones', 'Urinary tract infections', 'Dysuria'],
    contraindications: ['Severe renal failure'],
    dosage: 'Take 2 tablets twice daily with plenty of water',
    images: [
      {
        id: 'img14',
        image_url: '/products/cystone-himalaya.jpg',
        alt_text: 'Cystone Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.3,
    review_count: 36,
    created_at: '2024-02-08T00:00:00Z',
    updated_at: '2024-02-08T00:00:00Z'
  },

  // GENERAL MEDICINE PRODUCTS
  {
    id: 'septillin-himalaya',
    name: 'Septillin Tablets',
    slug: 'septillin-tablets-himalaya',
    description: 'Himalaya Septillin is a powerful immunity booster that helps build the body\'s natural defense system against infections.',
    short_description: 'Natural immunity booster tablets',
    sku: 'AYU-HIM-015',
    selling_price: 125,
    base_price: 150,
    stock_quantity: 95,
    category: 'General Medicine',
    subcategory: 'Immunity Booster',
    brand: 'Himalaya',
    unit_size: '60 Tablets',
    is_featured: true,
    status: 'active',
    tags: ['immunity', 'infection protection', 'natural defense'],
    ingredients: ['Guduchi', 'Shigru', 'Licorice'],
    indications: ['Recurrent infections', 'Low immunity', 'Respiratory infections'],
    contraindications: ['Autoimmune disorders'],
    dosage: 'Take 2 tablets twice daily before meals',
    images: [
      {
        id: 'img15',
        image_url: '/products/septillin-himalaya.jpg',
        alt_text: 'Septillin Tablets by Himalaya',
        is_primary: true
      }
    ],
    average_rating: 4.4,
    review_count: 58,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  }
]

// Utility functions for product management
export function getProductsByCategory(category: string): Product[] {
  return medicalProducts.filter(product => {
    // Match against product type or a category field if we add it
    return product.type?.toLowerCase().includes(category.toLowerCase()) ||
           product.name.toLowerCase().includes(category.toLowerCase())
  })
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return medicalProducts.filter(product => 
    product.subcategory?.toLowerCase() === subcategory.toLowerCase()
  )
}

export function getFeaturedProducts(): Product[] {
  return medicalProducts.filter(product => product.is_featured)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return medicalProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery) ||
    product.ingredients?.some(ingredient => 
      ingredient.toLowerCase().includes(lowerQuery)
    ) ||
    product.indications?.some(indication => 
      indication.toLowerCase().includes(lowerQuery)
    )
  )
}

export function getProductBySlug(slug: string): Product | undefined {
  return medicalProducts.find(product => product.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return medicalProducts
    .filter(p => 
      p.id !== product.id && 
      p.type === (product.type || 'general')
    )
    .slice(0, limit)
}

// Helper functions
export function getMedicalProductsBySpecialty(specialty: string): Product[] {
  return medicalProducts.filter(product => 
        product.type === specialty ||
    (specialty === 'classical' && product.type === 'classical') ||
    (!product.type && specialty === 'general')
  )
}

export function getFeaturedMedicalProducts(): Product[] {
  return medicalProducts.filter(product => product.is_featured)
}

export function getMedicalProductBySlug(slug: string): Product | undefined {
  return medicalProducts.find(product => product.slug === slug)
}

export function getMedicalProductById(id: string): Product | undefined {
  return medicalProducts.find(product => product.id === id)
}

export function searchMedicalProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return medicalProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description?.toLowerCase().includes(lowercaseQuery) ||
    product.short_description?.toLowerCase().includes(lowercaseQuery) ||
    product.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(lowercaseQuery)
    ) ||
    product.indications.some(indication => 
      indication.toLowerCase().includes(lowercaseQuery)
    )
  )
} 