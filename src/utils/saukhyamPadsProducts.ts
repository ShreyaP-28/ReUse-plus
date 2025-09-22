// Saukhyam Pads Product Catalog
// Based on sustainable menstrual products from saukhyampads.org

export interface SaukhyamProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  type: 'reusable' | 'organic' | 'cloth' | 'cup' | 'accessories';
  features: string[];
  sustainability: {
    biodegradable: boolean;
    reusable: boolean;
    plastic_free: boolean;
    organic: boolean;
    lifespan?: string;
    environmental_impact: string;
  };
  rating: number;
  reviews: number;
  availability: 'in_stock' | 'limited' | 'out_of_stock';
  stock: number;
  brand: 'Saukhyam' | 'EcoFemme' | 'Boondh' | 'Natural';
  imageUrl?: string;
  variants?: {
    size?: string[];
    color?: string[];
    absorbency?: string[];
  };
}

export const saukhyamProducts: SaukhyamProduct[] = [
  {
    id: 'saukhyam_cloth_pads_regular',
    name: 'Saukhyam Cloth Pads - Regular Flow',
    description: 'Super-soft organic cotton cloth pads with bamboo absorbent core. Leak-proof, breathable and reusable for up to 3-5 years.',
    price: 299,
    originalPrice: 399,
    category: 'pads',
    type: 'reusable',
    features: [
      'Organic cotton top layer',
      'Bamboo fiber absorbent core',
      '8-hour protection',
      'Snap closure wings',
      'Machine washable'
    ],
    sustainability: {
      biodegradable: true,
      reusable: true,
      plastic_free: true,
      organic: true,
      lifespan: '3-5 years',
      environmental_impact: 'Replaces 200+ disposable pads'
    },
    rating: 4.7,
    reviews: 328,
    availability: 'in_stock',
    stock: 45,
    brand: 'Saukhyam',
    variants: {
      size: ['Small', 'Medium', 'Large'],
      absorbency: ['Light', 'Regular', 'Heavy']
    }
  },
  {
    id: 'ecofemme_night_pads',
    name: 'EcoFemme Night Pads - Heavy Flow',
    description: 'Extra-long organic cotton cloth pads specially designed for night use. Superior absorption with zero plastic and chemicals.',
    price: 349,
    originalPrice: 449,
    category: 'pads',
    type: 'reusable',
    features: [
      'Extra length for night protection',
      'Certified organic cotton',
      'PUL leak-proof backing',
      'Curved design for comfort',
      'Stain-resistant fabric'
    ],
    sustainability: {
      biodegradable: true,
      reusable: true,
      plastic_free: false, // PUL backing
      organic: true,
      lifespan: '5+ years',
      environmental_impact: 'Saves ₹15,000+ in disposable costs'
    },
    rating: 4.8,
    reviews: 189,
    availability: 'in_stock',
    stock: 32,
    brand: 'EcoFemme'
  },
  {
    id: 'boondh_menstrual_cup',
    name: 'Boondh Menstrual Cup - Medical Grade',
    description: 'FDA-approved medical grade silicone menstrual cup. 12-hour protection with zero waste generation for 10+ years.',
    price: 599,
    originalPrice: 799,
    category: 'cups',
    type: 'cup',
    features: [
      'Medical grade silicone',
      'FDA approved',
      '12-hour protection',
      'Leak-free design',
      'Multiple sizes available'
    ],
    sustainability: {
      biodegradable: false,
      reusable: true,
      plastic_free: true,
      organic: false,
      lifespan: '10+ years',
      environmental_impact: 'Replaces 11,000+ tampons/pads'
    },
    rating: 4.6,
    reviews: 542,
    availability: 'in_stock',
    stock: 78,
    brand: 'Boondh',
    variants: {
      size: ['Small', 'Medium', 'Large'],
      color: ['Clear', 'Pink', 'Purple']
    }
  },
  {
    id: 'saukhyam_panty_liners',
    name: 'Saukhyam Organic Panty Liners',
    description: 'Ultra-thin reusable panty liners made from organic cotton. Perfect for daily use and light flow days.',
    price: 199,
    originalPrice: 249,
    category: 'pads',
    type: 'reusable',
    features: [
      'Ultra-thin design',
      'Organic cotton surface',
      'Breathable bamboo core',
      'Mini wing snaps',
      'Daily use comfort'
    ],
    sustainability: {
      biodegradable: true,
      reusable: true,
      plastic_free: true,
      organic: true,
      lifespan: '2-3 years',
      environmental_impact: 'Saves 500+ disposable panty liners'
    },
    rating: 4.5,
    reviews: 156,
    availability: 'in_stock',
    stock: 67,
    brand: 'Saukhyam'
  },
  {
    id: 'cloth_pad_starter_kit',
    name: 'Cloth Pad Starter Kit (Set of 6)',
    description: 'Complete starter kit with 2 light, 2 regular, and 2 heavy flow cloth pads. Includes wash bag and care instructions.',
    price: 899,
    originalPrice: 1199,
    category: 'reusable',
    type: 'reusable',
    features: [
      '6 pads of different flows',
      'Free wash bag included',
      'Care instruction guide',
      'Mix of day and night pads',
      '30-day money back guarantee'
    ],
    sustainability: {
      biodegradable: true,
      reusable: true,
      plastic_free: true,
      organic: true,
      lifespan: '3-5 years',
      environmental_impact: 'Complete sustainable period solution'
    },
    rating: 4.9,
    reviews: 412,
    availability: 'in_stock',
    stock: 28,
    brand: 'Saukhyam'
  },
  {
    id: 'period_underwear_cotton',
    name: 'Organic Cotton Period Underwear',
    description: 'Revolutionary period underwear with built-in absorbent layers. No pads needed - just wear and go.',
    price: 799,
    originalPrice: 999,
    category: 'underwear',
    type: 'reusable',
    features: [
      'Built-in absorbent layers',
      '8-hour protection',
      'Organic cotton blend',
      'Anti-microbial treatment',
      'Various sizes available'
    ],
    sustainability: {
      biodegradable: false,
      reusable: true,
      plastic_free: false,
      organic: true,
      lifespan: '2-3 years',
      environmental_impact: 'Replaces pads entirely for light-medium days'
    },
    rating: 4.4,
    reviews: 267,
    availability: 'limited',
    stock: 15,
    brand: 'EcoFemme',
    variants: {
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: ['Black', 'Beige', 'Navy']
    }
  },
  {
    id: 'menstrual_hygiene_kit',
    name: 'Complete Menstrual Hygiene Kit',
    description: 'All-in-one sustainable period care kit: menstrual cup, cloth pads, period underwear, and care accessories.',
    price: 1499,
    originalPrice: 1999,
    category: 'accessories',
    type: 'reusable',
    features: [
      '1 Menstrual cup',
      '4 Cloth pads (varied flows)',
      '2 Period underwear',
      'Sterilizing cup',
      'Storage pouch',
      'Care guide & tips'
    ],
    sustainability: {
      biodegradable: true,
      reusable: true,
      plastic_free: false,
      organic: true,
      lifespan: '5+ years',
      environmental_impact: 'Complete zero-waste period solution'
    },
    rating: 4.8,
    reviews: 89,
    availability: 'in_stock',
    stock: 22,
    brand: 'Saukhyam'
  },
  {
    id: 'herbal_period_pain_relief',
    name: 'Natural Period Pain Relief Blend',
    description: 'Ayurvedic herbal blend for natural period pain relief. Made with traditional herbs like ginger, turmeric, and fennel.',
    price: 249,
    originalPrice: 299,
    category: 'supplements',
    type: 'organic',
    features: [
      'Natural pain relief',
      'Ayurvedic formulation',
      'No side effects',
      'Organic ingredients',
      '30-day supply'
    ],
    sustainability: {
      biodegradable: true,
      reusable: false,
      plastic_free: true,
      organic: true,
      environmental_impact: 'Eco-friendly packaging'
    },
    rating: 4.3,
    reviews: 145,
    availability: 'in_stock',
    stock: 54,
    brand: 'Natural'
  }
];

// Helper functions for product management
export const getProductsByCategory = (category: string) => {
  return saukhyamProducts.filter(product => product.category === category);
};

export const getProductsByType = (type: string) => {
  return saukhyamProducts.filter(product => product.type === type);
};

export const getReusableProducts = () => {
  return saukhyamProducts.filter(product => product.sustainability.reusable);
};

export const getOrganicProducts = () => {
  return saukhyamProducts.filter(product => product.sustainability.organic);
};

export const getProductsInStock = () => {
  return saukhyamProducts.filter(product => product.availability === 'in_stock');
};

export const calculateSustainabilityScore = (product: SaukhyamProduct): number => {
  let score = 0;
  if (product.sustainability.biodegradable) score += 20;
  if (product.sustainability.reusable) score += 30;
  if (product.sustainability.plastic_free) score += 25;
  if (product.sustainability.organic) score += 25;
  return score;
};

// Product categories for filtering
export const productCategories = [
  { value: 'pads', label: 'Cloth Pads', count: getProductsByCategory('pads').length },
  { value: 'cups', label: 'Menstrual Cups', count: getProductsByCategory('cups').length },
  { value: 'underwear', label: 'Period Underwear', count: getProductsByCategory('underwear').length },
  { value: 'reusable', label: 'Reusable Kits', count: getProductsByCategory('reusable').length },
  { value: 'supplements', label: 'Health & Wellness', count: getProductsByCategory('supplements').length },
  { value: 'accessories', label: 'Complete Kits', count: getProductsByCategory('accessories').length }
];

export const sustainabilityBenefits = {
  cost_savings: {
    cloth_pads: '₹15,000+ over 5 years',
    menstrual_cup: '₹30,000+ over 10 years',
    period_underwear: '₹8,000+ over 3 years'
  },
  environmental_impact: {
    disposable_pads_replaced: '11,000+ over lifetime',
    plastic_waste_avoided: '45kg+ per person',
    co2_reduction: '5.3kg annually'
  },
  health_benefits: [
    'Chemical-free materials',
    'Reduced risk of infections',
    'Better pH balance',
    'No synthetic fragrances',
    'Breathable organic fabrics'
  ]
};