import type { Product } from '@/types'

export const sampleProducts: Product[] = [
  // Classical Ayurveda Products
  {
    id: '1',
    sku: 'AYU-CLA-001',
    name: 'Chyawanprash Premium - Immunity Booster',
    slug: 'chyawanprash-premium-immunity-booster',
    short_description: 'Traditional Ayurvedic immunity booster with 40+ herbs',
    description: `**Ancient Immunity Formula**
    
Our premium Chyawanprash is a time-tested Ayurvedic formulation containing over 40 precious herbs including Amla, Ashwagandha, and Giloy. This ancient recipe boosts immunity, enhances energy levels, and promotes overall wellness.

**Key Benefits:**
• Strengthens immune system naturally
• Rich in Vitamin C and antioxidants
• Improves respiratory health
• Enhances energy and vitality
• Supports digestive function
• Anti-aging properties

**Traditional Uses:**
In Ayurveda, Chyawanprash is considered a "Rasayana" (rejuvenative tonic) that helps maintain optimal health across all age groups. Originally formulated by Sage Chyawan, this recipe has been used for over 5000 years.

**Clinical Studies:**
Modern research shows that regular consumption of Chyawanprash can improve immunity markers by 30-40% and reduce the frequency of respiratory infections.`,
    type: 'classical',
    form: 'paste',
    base_price: 899,
    selling_price: 749,
    discount_percentage: 17,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 150,
    low_stock_threshold: 20,
    ingredients: ['Amla (Vitamin C - 500mg per serving)', 'Ashwagandha (100mg)', 'Giloy', 'Brahmi', 'Shankhpushpi', 'Honey', 'Ghee', 'Dashmoola', 'Bala', 'Pippali'],
    indications: ['Low immunity', 'Frequent infections', 'General weakness', 'Seasonal allergies', 'Respiratory issues', 'Low energy'],
    contraindications: ['Diabetes (consult doctor)', 'High blood sugar', 'Acute fever'],
    dosage_instructions: 'Adults: 1-2 teaspoons twice daily with warm milk or water. Children (5-12 years): 1/2 teaspoon twice daily. Best taken on empty stomach in morning and evening.',
    pack_size: '500g (50 servings)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.8,
    review_count: 1247,
    constitution: ['vata', 'pitta', 'kapha'],
    images: [
      {
        id: 'img-1',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Chyawanprash Premium bottle front view',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
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
    id: '2',
    sku: 'AYU-CAR-002',
    name: 'Arjunarishta - Heart Health Tonic',
    slug: 'arjunarishta-heart-health-tonic',
    short_description: 'Natural heart tonic for cardiovascular wellness',
    description: `**Cardio-Protective Ayurvedic Formula**
    
Arjunarishta is a classical Ayurvedic formulation specifically designed for heart health. Made with Arjuna bark and other cardio-protective herbs, it helps strengthen the heart muscle, regulate blood pressure, and improve overall cardiovascular function.

**Key Benefits:**
• Strengthens heart muscle naturally
• Helps regulate blood pressure
• Improves cardiovascular circulation
• Reduces cholesterol levels
• Anti-arrhythmic properties
• Supports overall cardiac wellness

**Scientific Research:**
Clinical studies show that Arjuna bark contains compounds like arjunolic acid and arjunetin that provide significant cardio-protective benefits. Regular use can improve heart function by 25-30%.

**Ayurvedic Perspective:**
According to Ayurveda, Arjunarishta pacifies both Vata and Pitta doshas, which are responsible for heart rhythm irregularities and inflammation respectively.`,
    type: 'cardiology',
    form: 'liquid',
    base_price: 650,
    selling_price: 650,
    discount_percentage: 0,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 89,
    low_stock_threshold: 15,
    ingredients: ['Arjuna bark (500mg per 15ml)', 'Madhuka flowers', 'Draksha (grapes)', 'Natural jaggery', 'Purified water'],
    indications: ['High blood pressure', 'Heart palpitations', 'Chest discomfort', 'Cardiovascular weakness', 'High cholesterol', 'Irregular heartbeat'],
    contraindications: ['Severe heart conditions (consult cardiologist)', 'Pregnancy without medical supervision', 'Hypotension'],
    dosage_instructions: 'Take 15-30ml twice daily after meals with equal amount of water. For best results, take consistently for 3-6 months. Shake well before use.',
    pack_size: '450ml (30 servings)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.6,
    review_count: 892,
    constitution: ['pitta', 'vata'],
    images: [
      {
        id: 'img-2',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Arjunarishta bottle with measurement cup',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-10').toISOString(),
    updated_at: new Date('2024-01-18').toISOString()
  },
  {
    id: '3',
    sku: 'AYU-DER-003',
    name: 'Kumkumadi Tailam - Radiant Skin Oil',
    slug: 'kumkumadi-tailam-radiant-skin-oil',
    short_description: 'Premium face oil for glowing and youthful skin',
    description: `**Golden Elixir for Radiant Skin**
    
Kumkumadi Tailam is a luxurious Ayurvedic face oil containing saffron and 16 precious herbs. This golden elixir helps reduce dark spots, fine lines, and blemishes while promoting natural skin radiance and anti-aging benefits.

**Key Benefits:**
• Reduces dark spots and pigmentation
• Minimizes fine lines and wrinkles
• Improves skin texture and elasticity
• Provides natural glow and radiance
• Evens skin tone naturally
• Anti-aging and rejuvenating properties

**Premium Ingredients:**
Contains genuine Kashmiri saffron worth ₹2000 per gram, making this one of the most precious skincare formulations in Ayurveda.

**Usage Timeline:**
Week 1-2: Skin feels softer and moisturized
Week 3-4: Visible reduction in dark spots
Week 5-8: Improved skin tone and texture
Week 9-12: Significant anti-aging benefits`,
    type: 'dermatology',
    form: 'oil',
    base_price: 1299,
    selling_price: 1099,
    discount_percentage: 15,
    tax_rate: 18,
    track_inventory: true,
    stock_quantity: 67,
    low_stock_threshold: 10,
    ingredients: ['Kashmiri Saffron (50mg)', 'Manjistha', 'Yashtimadhu (Licorice)', 'Sesame oil base', 'Goat milk', 'Lotus petals', 'Sandalwood', 'Nagkesar'],
    indications: ['Dark spots', 'Uneven skin tone', 'Fine lines', 'Dull skin', 'Acne marks', 'Premature aging'],
    contraindications: ['Open wounds', 'Active skin infections', 'Known allergies to saffron'],
    dosage_instructions: 'Apply 2-3 drops on clean face at night. Gently massage in upward circular motions. Leave overnight. Use consistently for 3 months for best results. Patch test recommended.',
    pack_size: '12ml (3 months supply)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.9,
    review_count: 2156,
    constitution: ['vata', 'pitta'],
    images: [
      {
        id: 'img-3',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Kumkumadi Tailam golden oil bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-12').toISOString(),
    updated_at: new Date('2024-01-22').toISOString()
  },
  {
    id: '4',
    sku: 'AYU-GYN-004',
    name: 'Ashokarishta - Women\'s Health Tonic',
    slug: 'ashokarishta-womens-health-tonic',
    short_description: 'Traditional tonic for women\'s reproductive health',
    description: `**Women's Wellness Formula**
    
Ashokarishta is a classical Ayurvedic formulation specifically designed for women's health. It helps regulate menstrual cycles, reduces menstrual discomfort, and supports overall reproductive wellness using time-tested herbs.

**Key Benefits:**
• Regulates menstrual cycles naturally
• Reduces menstrual pain and cramps
• Controls heavy bleeding
• Supports hormonal balance
• Improves reproductive health
• Strengthens uterine muscles

**Traditional Significance:**
Named after the Ashoka tree (Saraca asoca), this formulation has been used for centuries to support women's health. The word "Ashoka" means "without sorrow," reflecting its ability to provide relief from women's health issues.

**Clinical Evidence:**
Studies show 80% improvement in menstrual irregularities and 60% reduction in menstrual pain within 3 months of regular use.`,
    type: 'gynecology',
    form: 'liquid',
    base_price: 580,
    selling_price: 495,
    discount_percentage: 15,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 124,
    low_stock_threshold: 25,
    ingredients: ['Ashoka bark (750mg per 15ml)', 'Dhataki flowers', 'Musta', 'Haritaki', 'Natural jaggery', 'Kumari (Aloe vera)'],
    indications: ['Irregular periods', 'Menstrual pain', 'Heavy bleeding', 'PCOS symptoms', 'Hormonal imbalance', 'Reproductive weakness'],
    contraindications: ['Pregnancy', 'Breastfeeding (consult doctor)', 'Severe bleeding disorders'],
    dosage_instructions: 'Take 15-30ml twice daily after meals with equal amount of water. Continue for 3-6 months for optimal results. Best started after menstrual cycle ends.',
    pack_size: '450ml (30 servings)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.7,
    review_count: 1834,
    constitution: ['pitta', 'kapha'],
    images: [
      {
        id: 'img-4',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Ashokarishta bottle for women\'s health',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-08').toISOString(),
    updated_at: new Date('2024-01-25').toISOString()
  },
  {
    id: '5',
    sku: 'AYU-GAS-005',
    name: 'Hingwashtak Churna - Digestive Powder',
    slug: 'hingwashtak-churna-digestive-powder',
    short_description: 'Powerful digestive aid for better gut health',
    description: `**Eight-Herb Digestive Formula**
    
Hingwashtak Churna is a potent Ayurvedic digestive formula containing eight powerful herbs including Hing (Asafoetida). It helps improve digestion, reduces gas and bloating, and enhances appetite naturally.

**Key Benefits:**
• Improves digestive fire (Agni)
• Reduces gas, bloating, and flatulence
• Enhances appetite naturally
• Relieves abdominal discomfort
• Supports healthy gut bacteria
• Improves nutrient absorption

**The Science of Eight:**
Each of the eight ingredients has a specific role in digestion - from stimulating digestive enzymes to reducing inflammation and supporting gut health.

**Usage Guidelines:**
Best taken 15-30 minutes before meals to prepare the digestive system. Can also be taken after meals if experiencing digestive discomfort.`,
    type: 'gastroenterology',
    form: 'powder',
    base_price: 320,
    selling_price: 275,
    discount_percentage: 14,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 198,
    low_stock_threshold: 30,
    ingredients: ['Hing (Asafoetida) 200mg', 'Sonth (Dry Ginger) 150mg', 'Kala Jeera (Black Cumin)', 'Safed Jeera (Cumin)', 'Ajwain (Carom Seeds)', 'Kala Namak (Black Salt)', 'Pippali (Long Pepper)', 'Maricha (Black Pepper)'],
    indications: ['Indigestion', 'Gas and bloating', 'Loss of appetite', 'Abdominal discomfort', 'Slow digestion', 'Flatulence'],
    contraindications: ['Hyperacidity', 'Peptic ulcers', 'Pregnancy (high doses)'],
    dosage_instructions: 'Take 1/4 to 1/2 teaspoon with warm water before meals. Can be mixed with buttermilk or taken with honey. Start with smaller dose and increase gradually.',
    pack_size: '100g (100 servings)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.5,
    review_count: 756,
    constitution: ['vata', 'kapha'],
    images: [
      {
        id: 'img-5',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Hingwashtak Churna powder jar',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-14').toISOString(),
    updated_at: new Date('2024-01-21').toISOString()
  },
  {
    id: '6',
    sku: 'AYU-NEU-006',
    name: 'Brahmi Ghrita - Memory Enhancer',
    slug: 'brahmi-ghrita-memory-enhancer',
    short_description: 'Medicated ghee for brain health and memory',
    description: `**Brain-Boosting Medicated Ghee**
    
Brahmi Ghrita is a classical Ayurvedic preparation that combines the brain-boosting properties of Brahmi with pure cow ghee. It enhances memory, improves concentration, and supports overall cognitive function.

**Key Benefits:**
• Enhances memory and recall
• Improves concentration and focus
• Supports cognitive function
• Reduces mental fatigue
• Promotes neural health
• Helps with stress and anxiety

**Ghee as Medicine Carrier:**
In Ayurveda, ghee is considered the best carrier for herbal medicines as it can cross the blood-brain barrier and deliver nutrients directly to brain cells.

**Research Insights:**
Studies show that Brahmi (Bacopa monnieri) can improve memory formation by 25% and reduce anxiety levels significantly when taken regularly for 12 weeks.`,
    type: 'neurology',
    form: 'ghee',
    base_price: 850,
    selling_price: 765,
    discount_percentage: 10,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 45,
    low_stock_threshold: 8,
    ingredients: ['Brahmi extract (500mg per tsp)', 'Pure cow ghee', 'Mandukaparni', 'Shankhpushpi', 'Vacha (Calamus)', 'Jatamansi'],
    indications: ['Memory loss', 'Poor concentration', 'Mental fatigue', 'Stress', 'Anxiety', 'Learning difficulties'],
    contraindications: ['High cholesterol', 'Obesity', 'Lactose intolerance'],
    dosage_instructions: 'Take 1/2 to 1 teaspoon twice daily with warm milk on empty stomach. Best taken in morning and evening. Can be taken with warm water if lactose intolerant.',
    pack_size: '200g (40 servings)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.4,
    review_count: 423,
    constitution: ['vata', 'pitta'],
    images: [
      {
        id: 'img-6',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Brahmi Ghrita jar with traditional design',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-16').toISOString(),
    updated_at: new Date('2024-01-23').toISOString()
  },
  {
    id: '7',
    sku: 'AYU-PUL-007',
    name: 'Sitopaladi Churna - Respiratory Support',
    slug: 'sitopaladi-churna-respiratory-support',
    short_description: 'Classical formula for cough, cold and respiratory health',
    description: `**Traditional Respiratory Formula**
    
Sitopaladi Churna is a time-tested Ayurvedic formulation for respiratory health. This sweet-tasting powder helps clear airways, soothes throat irritation, and supports lung function naturally.

**Key Benefits:**
• Relieves cough and throat irritation
• Supports healthy respiratory function
• Boosts immunity against infections
• Improves lung capacity
• Reduces inflammation in airways
• Sweet taste makes it suitable for children

**Classical Reference:**
Mentioned in ancient Ayurvedic texts like Sharangdhara Samhita, this formula has been used for over 1000 years for respiratory ailments.`,
    type: 'pulmonology',
    form: 'powder',
    base_price: 280,
    selling_price: 240,
    discount_percentage: 14,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 175,
    low_stock_threshold: 25,
    ingredients: ['Mishri (Rock Sugar) 2 parts', 'Vanshlochan (Bamboo Silica) 1 part', 'Pippali (Long Pepper) 1 part', 'Ela (Green Cardamom) 1 part', 'Tvak (Cinnamon) 1 part'],
    indications: ['Cough', 'Cold', 'Bronchitis', 'Asthma', 'Throat irritation', 'Low immunity'],
    contraindications: ['Diabetes (contains sugar)', 'Severe respiratory distress'],
    dosage_instructions: 'Adults: 1/2 to 1 teaspoon with honey 3 times daily. Children: 1/4 teaspoon with honey twice daily. Take after meals.',
    pack_size: '100g (50 servings)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.6,
    review_count: 1234,
    constitution: ['kapha', 'vata'],
    images: [
      {
        id: 'img-7',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Sitopaladi Churna powder jar',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-18').toISOString(),
    updated_at: new Date('2024-01-28').toISOString()
  },
  {
    id: '8',
    sku: 'AYU-ORT-008',
    name: 'Yogaraja Guggulu - Joint Health Support',
    slug: 'yogaraja-guggulu-joint-health-support',
    short_description: 'Premium formula for joint pain and arthritis relief',
    description: `**Advanced Joint Support Formula**
    
Yogaraja Guggulu is a powerful Ayurvedic formulation combining 28 herbs with purified Guggulu resin. It provides comprehensive support for joint health, reduces inflammation, and improves mobility.

**Key Benefits:**
• Reduces joint pain and stiffness
• Improves joint mobility and flexibility
• Anti-inflammatory properties
• Supports healthy cartilage
• Reduces morning stiffness
• Strengthens bones and joints

**Clinical Evidence:**
Studies show significant improvement in joint pain scores and mobility within 8-12 weeks of regular use.`,
    type: 'orthopedics',
    form: 'tablet',
    base_price: 650,
    selling_price: 550,
    discount_percentage: 15,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 85,
    low_stock_threshold: 15,
    ingredients: ['Guggulu Shuddha 250mg', 'Chitrak', 'Plash', 'Pippali', 'Maricha', 'Sonth', 'Haritaki', 'Bibhitaki', 'Amalaki', 'Vidanga', 'Ajmod'],
    indications: ['Arthritis', 'Joint pain', 'Rheumatism', 'Gout', 'Sciatica', 'Frozen shoulder'],
    contraindications: ['Pregnancy', 'Severe kidney disease', 'Acute inflammatory conditions'],
    dosage_instructions: 'Take 2 tablets twice daily with warm water after meals. Continue for minimum 3 months for best results.',
    pack_size: '100 tablets (25 days supply)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.5,
    review_count: 987,
    constitution: ['vata', 'kapha'],
    images: [
      {
        id: 'img-8',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Yogaraja Guggulu tablet bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-20').toISOString(),
    updated_at: new Date('2024-01-30').toISOString()
  },
  {
    id: '9',
    sku: 'AYU-END-009',
    name: 'Chandraprabha Vati - Metabolic Support',
    slug: 'chandraprabha-vati-metabolic-support',
    short_description: 'Comprehensive formula for diabetes and metabolic health',
    description: `**Metabolic Health Formula**
    
Chandraprabha Vati is a classical Ayurvedic formulation containing 23 precious herbs. It supports healthy blood sugar levels, improves metabolism, and promotes overall endocrine health.

**Key Benefits:**
• Supports healthy blood sugar levels
• Improves insulin sensitivity
• Promotes healthy weight management
• Supports kidney and urinary health
• Enhances metabolism
• Reduces sugar cravings

**Traditional Significance:**
Named after the moon (Chandra), this formulation is believed to provide cooling and balancing effects on the body's metabolic processes.`,
    type: 'endocrinology',
    form: 'tablet',
    base_price: 480,
    selling_price: 420,
    discount_percentage: 13,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 156,
    low_stock_threshold: 20,
    ingredients: ['Shilajit 50mg', 'Guggulu 100mg', 'Mustak', 'Haridra', 'Amalaki', 'Haritaki', 'Bibhitaki', 'Chitrak', 'Danti', 'Pippali', 'Maricha'],
    indications: ['Pre-diabetes', 'Type 2 diabetes support', 'Metabolic syndrome', 'Urinary disorders', 'Obesity', 'PCOS'],
    contraindications: ['Type 1 diabetes', 'Severe kidney disease', 'Pregnancy'],
    dosage_instructions: 'Take 2 tablets twice daily with warm water before meals. Monitor blood sugar regularly if diabetic.',
    pack_size: '120 tablets (30 days supply)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.3,
    review_count: 765,
    constitution: ['kapha', 'pitta'],
    images: [
      {
        id: 'img-9',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Chandraprabha Vati bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-22').toISOString(),
    updated_at: new Date('2024-02-01').toISOString()
  },
  {
    id: '10',
    sku: 'AYU-TRI-010',
    name: 'Bhringraj Oil - Hair Growth Elixir',
    slug: 'bhringraj-oil-hair-growth-elixir',
    short_description: 'Premium hair oil for hair growth and scalp health',
    description: `**Hair Growth & Scalp Health Formula**
    
Bhringraj Oil is a potent Ayurvedic hair oil containing the "King of Hair Herbs" - Bhringraj. This therapeutic oil promotes hair growth, prevents premature graying, and nourishes the scalp.

**Key Benefits:**
• Promotes natural hair growth
• Prevents hair fall and breakage
• Reduces premature graying
• Nourishes scalp and hair follicles
• Improves hair texture and shine
• Reduces dandruff and scalp irritation

**Research Findings:**
Clinical studies show 40% reduction in hair fall and 25% improvement in hair density within 12 weeks of regular use.`,
    type: 'trichology',
    form: 'oil',
    base_price: 390,
    selling_price: 350,
    discount_percentage: 10,
    tax_rate: 18,
    track_inventory: true,
    stock_quantity: 92,
    low_stock_threshold: 12,
    ingredients: ['Bhringraj extract 500mg/ml', 'Coconut oil base', 'Amla', 'Fenugreek', 'Curry leaves', 'Neem', 'Rosemary essential oil'],
    indications: ['Hair fall', 'Premature graying', 'Thin hair', 'Dandruff', 'Scalp dryness', 'Alopecia'],
    contraindications: ['Known allergies to coconut', 'Active scalp infections'],
    dosage_instructions: 'Massage gently into scalp and hair 2-3 times weekly. Leave for at least 1 hour or overnight. Wash with mild herbal shampoo.',
    pack_size: '200ml (2 months supply)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.7,
    review_count: 1456,
    constitution: ['vata', 'pitta'],
    images: [
      {
        id: 'img-10',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Bhringraj Hair Oil bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-24').toISOString(),
    updated_at: new Date('2024-02-03').toISOString()
  },
  {
    id: '11',
    sku: 'AYU-NEP-011',
    name: 'Gokshuradi Guggulu - Kidney Support',
    slug: 'gokshuradi-guggulu-kidney-support',
    short_description: 'Specialized formula for kidney and urinary health',
    description: `**Kidney & Urinary Health Formula**
    
Gokshuradi Guggulu is a classical Ayurvedic formulation specifically designed for kidney and urinary system health. It helps maintain healthy kidney function and supports the urinary tract.

**Key Benefits:**
• Supports healthy kidney function
• Promotes urinary tract health
• Helps maintain normal urine flow
• Reduces urinary discomfort
• Supports healthy prostate function
• Natural diuretic properties

**Traditional Use:**
Used for centuries in Ayurveda for maintaining kidney health and treating urinary disorders.`,
    type: 'nephrology',
    form: 'tablet',
    base_price: 420,
    selling_price: 380,
    discount_percentage: 10,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 124,
    low_stock_threshold: 18,
    ingredients: ['Gokshura 200mg', 'Guggulu Shuddha 150mg', 'Triphala', 'Trikatu', 'Musta', 'Pippali'],
    indications: ['Kidney stones', 'UTI prevention', 'Prostate health', 'Urinary retention', 'Kidney weakness'],
    contraindications: ['Severe kidney disease', 'Acute UTI', 'Pregnancy'],
    dosage_instructions: 'Take 2 tablets twice daily with warm water after meals. Drink plenty of water throughout the day.',
    pack_size: '100 tablets (25 days supply)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.4,
    review_count: 567,
    constitution: ['vata', 'kapha'],
    images: [
      {
        id: 'img-11',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Gokshuradi Guggulu tablet bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-26').toISOString(),
    updated_at: new Date('2024-02-05').toISOString()
  },
  {
    id: '12',
    sku: 'AYU-HEP-012',
    name: 'Arogyavardhini Vati - Liver Detox',
    slug: 'arogyavardhini-vati-liver-detox',
    short_description: 'Classical liver detox and digestive health formula',
    description: `**Liver Health & Detox Formula**
    
Arogyavardhini Vati is a time-tested Ayurvedic formulation for liver health and detoxification. This classical medicine supports healthy liver function, improves digestion, and promotes overall metabolic health.

**Key Benefits:**
• Supports healthy liver function
• Promotes natural detoxification
• Improves digestive health
• Supports healthy metabolism
• Helps maintain healthy cholesterol levels
• Reduces oxidative stress

**Name Meaning:**
"Arogyavardhini" literally means "enhancer of health" - reflecting its comprehensive benefits for overall wellness.`,
    type: 'hepatology',
    form: 'tablet',
    base_price: 360,
    selling_price: 320,
    discount_percentage: 11,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 168,
    low_stock_threshold: 22,
    ingredients: ['Kutki 100mg', 'Chitrak 75mg', 'Parad Shuddha 50mg', 'Gandhak Shuddha 50mg', 'Loha Bhasma 25mg', 'Abhraka Bhasma 25mg', 'Tamra Bhasma 25mg'],
    indications: ['Liver disorders', 'Poor digestion', 'High cholesterol', 'Obesity', 'Skin problems', 'Metabolic disorders'],
    contraindications: ['Pregnancy', 'Severe liver disease', 'Heavy metal sensitivity'],
    dosage_instructions: 'Take 1-2 tablets twice daily with warm water after meals. Best taken under medical supervision.',
    pack_size: '100 tablets (25-50 days supply)',
    is_featured: false,
    is_prescription_required: true,
    status: 'active',
    average_rating: 4.2,
    review_count: 445,
    constitution: ['kapha', 'pitta'],
    images: [
      {
        id: 'img-12',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Arogyavardhini Vati bottle',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-28').toISOString(),
    updated_at: new Date('2024-02-07').toISOString()
  },
  {
    id: '13',
    sku: 'AYU-DEN-013',
    name: 'Dantdhavan Powder - Oral Care',
    slug: 'dantdhavan-powder-oral-care',
    short_description: 'Natural tooth powder for complete oral hygiene',
    description: `**Complete Oral Care Formula**
    
Dantdhavan Powder is a traditional Ayurvedic tooth powder made with carefully selected herbs and minerals. It provides comprehensive oral care, strengthens gums, and maintains dental health naturally.

**Key Benefits:**
• Strengthens teeth and gums
• Prevents cavities and decay
• Reduces gum bleeding and inflammation
• Freshens breath naturally
• Removes plaque and tartar
• Whitens teeth naturally

**Traditional Practice:**
Used in Ayurveda for over 2000 years, this powder maintains the ancient tradition of natural oral care without harmful chemicals.`,
    type: 'dental',
    form: 'powder',
    base_price: 180,
    selling_price: 155,
    discount_percentage: 14,
    tax_rate: 18,
    track_inventory: true,
    stock_quantity: 245,
    low_stock_threshold: 35,
    ingredients: ['Neem powder', 'Babul bark', 'Tomar seeds', 'Majuphal', 'Khadir bark', 'Saindhav namak', 'Camphor'],
    indications: ['Gum disease', 'Tooth decay', 'Bad breath', 'Plaque buildup', 'Gum bleeding', 'Tooth sensitivity'],
    contraindications: ['Oral wounds', 'Severe gum disease', 'Allergy to ingredients'],
    dosage_instructions: 'Use small amount on finger or soft brush. Massage gently on teeth and gums for 2-3 minutes. Rinse thoroughly. Use twice daily.',
    pack_size: '100g (3 months supply)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.5,
    review_count: 823,
    constitution: ['vata', 'kapha'],
    images: [
      {
        id: 'img-13',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Dantdhavan tooth powder container',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-01-30').toISOString(),
    updated_at: new Date('2024-02-09').toISOString()
  },
  {
    id: '14',
    sku: 'AYU-OPH-014',
    name: 'Triphala Ghrita - Eye Care',
    slug: 'triphala-ghrita-eye-care',
    short_description: 'Medicated ghee for eye health and vision support',
    description: `**Eye Health & Vision Support**
    
Triphala Ghrita is a classical Ayurvedic preparation combining the vision-supporting properties of Triphala with pure cow ghee. It nourishes the eyes, improves vision, and supports overall ocular health.

**Key Benefits:**
• Improves vision clarity
• Reduces eye strain and fatigue
• Supports retinal health
• Prevents age-related eye disorders
• Soothes dry and irritated eyes
• Strengthens eye muscles

**Ancient Wisdom:**
Referenced in classical texts like Sushruta Samhita for maintaining healthy vision and treating various eye disorders.`,
    type: 'ophthalmology',
    form: 'ghee',
    base_price: 720,
    selling_price: 650,
    discount_percentage: 10,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 67,
    low_stock_threshold: 10,
    ingredients: ['Triphala extract (Amalaki, Bibhitaki, Haritaki)', 'Pure cow ghee', 'Honey', 'Yashti madhu'],
    indications: ['Poor vision', 'Eye strain', 'Dry eyes', 'Night blindness', 'Eye fatigue', 'Computer vision syndrome'],
    contraindications: ['Active eye infections', 'Severe diabetes', 'Lactose intolerance'],
    dosage_instructions: 'For internal use: 1/2 teaspoon with warm milk before bed. For external use: Apply small amount around eyes (not in eyes) before sleep.',
    pack_size: '150g (30 servings)',
    is_featured: false,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.3,
    review_count: 356,
    constitution: ['vata', 'pitta'],
    images: [
      {
        id: 'img-14',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Triphala Ghrita jar for eye care',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-1',
      name: 'Kottakkal Arya Vaidya Sala',
      slug: 'kottakkal',
      description: 'Authentic Ayurvedic medicines since 1902',
      logo_url: '/brands/kottakkal-logo.jpg',
      established_year: 1902,
      country: 'India',
      certifications: ['ISO 9001:2015', 'GMP Certified', 'AYUSH Approved'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-02-01').toISOString(),
    updated_at: new Date('2024-02-11').toISOString()
  },
  {
    id: '15',
    sku: 'AYU-AND-015',
    name: 'Ashwagandha Churna - Men\'s Vitality',
    slug: 'ashwagandha-churna-mens-vitality',
    short_description: 'Premium adaptogen for strength, stamina and male wellness',
    description: `**Men's Strength & Vitality Formula**
    
Pure Ashwagandha Churna is a potent adaptogenic herb known for enhancing male vitality, strength, and stamina. This premium quality powder supports physical performance, reduces stress, and promotes overall men's health.

**Key Benefits:**
• Enhances physical strength and stamina
• Supports healthy testosterone levels
• Reduces stress and anxiety
• Improves sleep quality
• Boosts energy and endurance
• Supports muscle growth and recovery

**Scientific Backing:**
Clinical studies show significant improvements in muscle mass, strength, and testosterone levels with regular Ashwagandha supplementation.`,
    type: 'andrology',
    form: 'powder',
    base_price: 450,
    selling_price: 395,
    discount_percentage: 12,
    tax_rate: 12,
    track_inventory: true,
    stock_quantity: 134,
    low_stock_threshold: 20,
    ingredients: ['Ashwagandha root powder (Withania somnifera) 500mg per serving', 'No additives or preservatives'],
    indications: ['Low energy', 'Stress', 'Poor stamina', 'Muscle weakness', 'Sleep issues', 'Low testosterone'],
    contraindications: ['Pregnancy', 'Autoimmune disorders', 'Thyroid medications'],
    dosage_instructions: 'Take 1/2 to 1 teaspoon with warm milk or water twice daily. Best taken on empty stomach in morning and before bed.',
    pack_size: '100g (100 servings)',
    is_featured: true,
    is_prescription_required: false,
    status: 'active',
    average_rating: 4.6,
    review_count: 1123,
    constitution: ['vata', 'kapha'],
    images: [
      {
        id: 'img-15',
        image_url: '/placeholder-product.jpg',
        alt_text: 'Ashwagandha Churna powder jar',
        is_primary: true,
        sort_order: 1
      }
    ],
    brand: {
      id: 'brand-2',
      name: 'Kerala Ayurveda',
      slug: 'kerala-ayurveda',
      description: 'Premium Ayurvedic products from Kerala',
      logo_url: '/brands/kerala-ayurveda-logo.jpg',
      established_year: 1945,
      country: 'India',
      certifications: ['Organic Certified', 'AYUSH Licensed', 'Fair Trade'],
      is_active: true,
      created_at: new Date('2024-01-01').toISOString(),
      updated_at: new Date('2024-01-01').toISOString()
    },
    created_at: new Date('2024-02-03').toISOString(),
    updated_at: new Date('2024-02-13').toISOString()
  }
]

export function getProductsByType(type: string): Product[] {
  return sampleProducts.filter(product => product.type === type)
}

export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter(product => product.is_featured)
}

export function getProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find(product => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find(product => product.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return sampleProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    (product.description && product.description.toLowerCase().includes(lowercaseQuery)) ||
    (product.short_description && product.short_description.toLowerCase().includes(lowercaseQuery)) ||
    product.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery)) ||
    product.indications.some(indication => indication.toLowerCase().includes(lowercaseQuery))
  )
} 