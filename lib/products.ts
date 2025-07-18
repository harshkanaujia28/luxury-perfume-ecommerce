export interface Product {
  id: string
  name: string
  brand: string
  brandimage: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  category: string
  gender: "men" | "women" | "unisex"
  inStock: boolean
  rating: number
  reviews: number
  features: string[]
  specifications: {
    skinType: string
    longevity: string
    sillage: string
    season: string
  }
}

export const products: Product[] = [
  // Men's Perfumes (10 products)
  {
    id: "1",
    name: "Artisan Luxe",
    brand: "Luxe Collection",
    brandimage: "/assets/images (11).jpeg",
    price: 199,
    originalPrice: 249,
    image: "/assets/1.jpg",
    images: ["/assets/1.jpg", "/assets/1.jpg", "/assets/1.jpg"],
    description:
      "A sophisticated blend of amber and vanilla with hints of bergamot. This timeless fragrance embodies luxury and elegance.",
    category: "Luxury",
    gender: "men",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    features: ["Long-lasting", "Premium ingredients", "Elegant packaging"],
    specifications: {
      skinType: "All skin types",
      longevity: "8-10 hours",
      sillage: "Moderate to Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "3",
    name: "Noir Mystique",
    brand: "Dark Collection",
    brandimage: "/assets/download (3).png",
    price: 179,
    image: "/assets/3.jpeg",
    images: ["/assets/3.jpeg", "/assets/3.jpeg", "/assets/3.jpeg"],
    description: "An intense and mysterious fragrance with dark chocolate and coffee notes.",
    category: "Oriental",
    gender: "men",
    inStock: true,
    rating: 4.9,
    reviews: 156,
    features: ["Intense", "Mysterious", "Night wear"],
    specifications: {
      skinType: "All skin types",
      longevity: "10-12 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "6",
    name: "Royal Oud",
    brand: "Premium Oud",
    brandimage: "/assets/Luxury Perfume_ Bottle Logo Design.jpeg",
    price: 299,
    image: "/assets/6.jpeg",
    images: ["/assets/6.jpeg", "/assets/6.jpeg"],
    description: "Authentic oud with rose and saffron, a truly royal fragrance experience.",
    category: "Oud",
    gender: "men",
    inStock: true,
    rating: 4.9,
    reviews: 203,
    features: ["Authentic oud", "Royal", "Premium"],
    specifications: {
      skinType: "All skin types",
      longevity: "12+ hours",
      sillage: "Very Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "10",
    name: "Spice Market",
    brand: "Exotic Collection",
    brandimage: "/assets/download (6).png",
    price: 169,
    image: "/assets/10.jpeg",
    images: ["/assets/10.jpeg", "/assets/10.jpeg", "/assets/10.jpeg"],
    description: "Exotic spices with cardamom, cinnamon, and black pepper.",
    category: "Spicy",
    gender: "men",
    inStock: true,
    rating: 4.7,
    reviews: 124,
    features: ["Exotic", "Spicy", "Unique"],
    specifications: {
      skinType: "All skin types",
      longevity: "8-10 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "12",
    name: "Leather & Wood",
    brand: "Masculine Collection",
    brandimage: "/assets/images (3).png",
    price: 189,
    image: "/assets/12.jpeg",
    images: ["/assets/12.jpeg", "/assets/12.jpeg"],
    description: "Rich leather with cedarwood and tobacco, a masculine masterpiece.",
    category: "Woody",
    gender: "men",
    inStock: true,
    rating: 4.8,
    reviews: 167,
    features: ["Masculine", "Rich", "Sophisticated"],
    specifications: {
      skinType: "All skin types",
      longevity: "9-12 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "15",
    name: "Smoky Nights",
    brand: "Dark Collection",
    brandimage: "/assets/images (1).png",
    price: 199,
    image: "/assets/15.jpeg",
    images: ["/assets/15.jpeg", "/assets/15.jpeg"],
    description: "Smoky incense with dark woods and resins.",
    category: "Oriental",
    gender: "men",
    inStock: true,
    rating: 4.7,
    reviews: 122,
    features: ["Smoky", "Dark", "Mysterious"],
    specifications: {
      skinType: "All skin types",
      longevity: "10-12 hours",
      sillage: "Very Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "17",
    name: "Desert Wind",
    brand: "Arabian Collection",
    brandimage: "/assets/Brasnd.jpeg",
    price: 219,
    image: "/assets/17.jpeg",
    images: ["/assets/17.jpeg", "/assets/17.jpeg"],
    description: "Warm desert sands with frankincense and myrrh.",
    category: "Oriental",
    gender: "men",
    inStock: true,
    rating: 4.8,
    reviews: 143,
    features: ["Warm", "Desert", "Mystical"],
    specifications: {
      skinType: "All skin types",
      longevity: "12-12 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "21",
    name: "Black Diamond",
    brand: "Luxury Collection",
    brandimage: "/assets/download (5).png",
    price: 399,
    image: "/assets/21.jpeg",
    images: ["/assets/21.jpeg", "/assets/21.jpeg"],
    description: "Ultra-luxury fragrance with rare black truffle and diamond dust.",
    category: "Luxury",
    gender: "men",
    inStock: true,
    rating: 5.0,
    reviews: 89,
    features: ["Ultra-luxury", "Rare ingredients", "Limited edition"],
    specifications: {
      skinType: "All skin types",
      longevity: "14+ hours",
      sillage: "Exceptional",
      season: "All seasons",
    },
  },
  {
    id: "24",
    name: "Velvet Nights",
    brand: "Sensual Collection",
    brandimage: "/assets/download (12).png",
    price: 179,
    image: "/assets/24.jpeg",
    images: ["/assets/24.jpeg", "/assets/24.jpeg", "/assets/24.jpeg"],
    description: "Sensual velvet with dark berries and musk.",
    category: "Oriental",
    gender: "men",
    inStock: true,
    rating: 4.7,
    reviews: 126,
    features: ["Sensual", "Dark", "Velvet"],
    specifications: {
      skinType: "All skin types",
      longevity: "9-12 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },
  {
    id: "26",
    name: "Mahogany Wood",
    brand: "Woody Collection",
    brandimage: "/assets/download (9).png",
    price: 169,
    image: "/assets/26.jpeg",
    images: ["/assets/26.jpeg", "/assets/26.jpeg"],
    description: "Rich mahogany with cedar and sandalwood.",
    category: "Woody",
    gender: "men",
    inStock: true,
    rating: 4.6,
    reviews: 108,
    features: ["Rich", "Woody", "Masculine"],
    specifications: {
      skinType: "All skin types",
      longevity: "8-10 hours",
      sillage: "Strong",
      season: "Fall/Winter",
    },
  },

  // Women's Perfumes (10 products)
  {
    id: "2",
    name: "Velvet Bloom",
    brand: "Floral Essence",
    brandimage: "/assets/images (2).png",
    price: 129,
    image: "/assets/2.jpg",
    images: ["/assets/2.jpg", "/assets/2.jpg", "/assets/2.jpg"],
    description: "A delicate floral bouquet with rose petals and jasmine, perfect for romantic evenings.",
    category: "Floral",
    gender: "women",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: ["Romantic", "Floral notes", "Evening wear"],
    specifications: {
      skinType: "Sensitive skin friendly",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Spring/Summer",
    },
  },
  {
    id: "8",
    name: "Midnight Rose",
    brand: "Romantic Collection",
    brandimage: "/assets/download (4).png",
    price: 149,
    image: "/assets/8.jpeg",
    images: ["/assets/8.jpeg", "/assets/8.jpeg"],
    description: "Deep red roses with patchouli and vanilla, perfect for intimate moments.",
    category: "Floral",
    gender: "women",
    inStock: true,
    rating: 4.6,
    reviews: 78,
    features: ["Romantic", "Intimate", "Evening"],
    specifications: {
      skinType: "All skin types",
      longevity: "7-9 hours",
      sillage: "Moderate",
      season: "Fall/Winter",
    },
  },
  {
    id: "9",
    name: "Vanilla Dreams",
    brand: "Sweet Collection",
    brandimage: "/assets/download (5).png",
    price: 129,
    image: "/assets/9.jpeg",
    images: ["/assets/9.jpeg", "/assets/9.jpeg"],
    description: "Creamy vanilla with caramel and tonka bean, a gourmand delight.",
    category: "Gourmand",
    gender: "women",
    inStock: true,
    rating: 4.5,
    reviews: 92,
    features: ["Sweet", "Gourmand", "Comforting"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Fall/Winter",
    },
  },
  {
    id: "14",
    name: "Tropical Paradise",
    brand: "Exotic Collection",
    brandimage: "/assets/download (1).jpeg",
    price: 129,
    image: "/assets/14.jpeg",
    images: ["/assets/14.jpeg", "/assets/14.jpeg"],
    description: "Tropical fruits with coconut and frangipani flowers.",
    category: "Fruity",
    gender: "women",
    inStock: true,
    rating: 4.5,
    reviews: 89,
    features: ["Tropical", "Fruity", "Vacation"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Spring/Summer",
    },
  },
  {
    id: "16",
    name: "Pink Champagne",
    brand: "Celebration Collection",
    brandimage: "/assets/download.png",
    price: 159,
    image: "/assets/16.jpeg",
    images: ["/assets/16.jpeg", "/assets/16.jpeg", "/assets/16.jpeg"],
    description: "Sparkling champagne with pink berries and white flowers.",
    category: "Fruity",
    gender: "women",
    inStock: true,
    rating: 4.6,
    reviews: 95,
    features: ["Sparkling", "Celebratory", "Elegant"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "All seasons",
    },
  },
  {
    id: "22",
    name: "Cherry Blossom",
    brand: "Japanese Collection",
    brandimage: "/assets/download (10).png",
    price: 129,
    image: "/assets/22.jpeg",
    images: ["/assets/22.jpeg", "/assets/22.jpeg", "/assets/22.jpeg"],
    description: "Delicate cherry blossoms with Japanese incense.",
    category: "Floral",
    gender: "women",
    inStock: true,
    rating: 4.6,
    reviews: 94,
    features: ["Delicate", "Japanese", "Spring"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Spring",
    },
  },
  {
    id: "27",
    name: "Lavender Fields",
    brand: "Herbal Collection",
    brandimage: "/assets/images (5).png",
    price: 89,
    image: "/assets/27.jpeg",
    images: ["/assets/27.jpeg", "/assets/27.jpeg", "/assets/27.jpeg", "/assets/27.jpeg"],
    description: "Calming lavender with herbs and countryside air.",
    category: "Herbal",
    gender: "women",
    inStock: true,
    rating: 4.3,
    reviews: 65,
    features: ["Calming", "Herbal", "Natural"],
    specifications: {
      skinType: "Sensitive skin",
      longevity: "4-6 hours",
      sillage: "Light",
      season: "Spring/Summer",
    },
  },
  {
    id: "28",
    name: "Red Velvet",
    brand: "Gourmand Collection",
    brandimage: "/assets/images (1).jpeg",
    price: 129,
    image: "/assets/28.jpeg",
    images: ["/assets/28.jpeg", "/assets/28.jpeg"],
    description: "Decadent red velvet cake with cream and berries.",
    category: "Gourmand",
    gender: "women",
    inStock: true,
    rating: 4.5,
    reviews: 87,
    features: ["Gourmand", "Sweet", "Decadent"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Fall/Winter",
    },
  },
  {
    id: "29",
    name: "Silver Moon",
    brand: "Celestial Collection",
    brandimage: "/assets/images (4).png",
    price: 199,
    image: "/assets/29.jpeg",
    images: ["/assets/29.jpeg", "/assets/29.jpeg", "/assets/29.jpeg"],
    description: "Mystical moonlight with silver iris and night blooming jasmine.",
    category: "Floral",
    gender: "women",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    features: ["Mystical", "Celestial", "Night"],
    specifications: {
      skinType: "All skin types",
      longevity: "8-10 hours",
      sillage: "Strong",
      season: "All seasons",
    },
  },
  {
    id: "30",
    name: "Golden Honey",
    brand: "Sweet Collection",
    brandimage: "/assets/images (3).png",
    price: 129,
    image: "/assets/30.jpg",
    images: ["/assets/30.jpg", "/assets/30.jpg"],
    description: "Pure golden honey with beeswax and wildflowers.",
    category: "Gourmand",
    gender: "women",
    inStock: true,
    rating: 4.4,
    reviews: 76,
    features: ["Sweet", "Natural", "Honey"],
    specifications: {
      skinType: "All skin types",
      longevity: "6-8 hours",
      sillage: "Moderate",
      season: "Spring/Summer",
    },
  },

  // Unisex Perfumes (10 products)
  {
    id: "4",
    name: "Amber Luxe",
    brand: "Golden Series",
    brandimage: "/assets/686e005f-1c27-44df-941e-e8e503278dbb.jpeg",
    price: 159,
    image: "/assets/4.jpeg",
    images: ["/assets/4.jpeg", "/assets/4.jpeg", "/assets/4.jpeg"],
    description: "Warm amber notes with hints of sandalwood and musk, creating a luxurious experience.",
    category: "Amber",
    gender: "unisex",
    inStock: true,
    rating: 4.7,
    reviews: 98,
    features: ["Warm", "Luxurious", "Unisex"],
    specifications: {
      skinType: "All skin types",
      longevity: "8-10 hours",
      sillage: "Moderate",
      season: "All seasons",
    },
  },
  {
    id: "5",
    name: "Ocean Breeze",
    brand: "Fresh Collection",
    brandimage: "/assets/Masterfully Designed Logos for Luxury Entrepreneurs.jpeg",
    price: 99,
    image: "/assets/5.jpeg",
    images: ["/assets/5.jpeg", "/assets/5.jpeg", "/assets/5.jpeg"],
    description: "Fresh aquatic notes with sea salt and citrus, reminiscent of ocean waves.",
    category: "Fresh",
    gender: "unisex",
    inStock: true,
    rating: 4.4,
    reviews: 67,
    features: ["Fresh", "Aquatic", "Daytime"],
    specifications: {
      skinType: "All skin types",
      longevity: "4-6 hours",
      sillage: "Light to Moderate",
      season: "Spring/Summer",
    },
  },
  {
    id: "7",
    name: "Citrus Burst",
    brand: "Zesty Collection",
    brandimage: "/assets/ahh the good life.jpeg",
    price: 89,
    image: "/assets/7.jpeg",
    images: ["/assets/7.jpeg", "/assets/7.jpeg"],
    description: "Energizing citrus blend with lemon, orange, and grapefruit.",
    category: "Citrus",
    gender: "unisex",
    inStock: true,
    rating: 4.3,
    reviews: 45,
    features: ["Energizing", "Fresh", "Morning wear"],
    specifications: {
      skinType: "All skin types",
      longevity: "3-5 hours",
      sillage: "Light",
      season: "Spring/Summer",
    },
  },
  {
    id: "11",
    name: "Garden Party",
    brand: "Fresh Collection",
    brandimage: "/assets/images (2).jpeg",
    price: 109,
    image: "/assets/11.jpeg",
    images: ["/assets/11.jpeg", "/assets/11.jpeg"],
    description: "Fresh garden flowers with green leaves and morning dew.",
    category: "Green",
    gender: "unisex",
    inStock: true,
    rating: 4.4,
    reviews: 56,
    features: ["Fresh", "Green", "Natural"],
    specifications: {
      skinType: "All skin types",
      longevity: "5-7 hours",
      sillage: "Light to Moderate",
      season: "Spring/Summer",
    },
  },
  {
    id: "13",
    name: "Crystal Clear",
    brand: "Pure Collection",
    brandimage: "/assets/images (1).png",
    price: 79,
    image: "/assets/13.jpeg",
    images: ["/assets/13.jpeg", "/assets/13.jpeg"],
    description: "Clean and pure with white musk and lily of the valley.",
    category: "Clean",
    gender: "unisex",
    inStock: true,
    rating: 4.2,
    reviews: 34,
    features: ["Clean", "Pure", "Minimalist"],
    specifications: {
      skinType: "Sensitive skin",
      longevity: "4-6 hours",
      sillage: "Light",
      season: "All seasons",
    },
  },
  {
    id: "18",
    name: "Morning Dew",
    brand: "Fresh Collection",
    brandimage: "/assets/download (5).png",
    price: 89,
    image: "/assets/18.jpeg",
    images: ["/assets/18.jpeg", "/assets/18.jpeg"],
    description: "Fresh morning air with cucumber and green tea.",
    category: "Green",
    gender: "unisex",
    inStock: true,
    rating: 4.3,
    reviews: 67,
    features: ["Fresh", "Morning", "Energizing"],
    specifications: {
      skinType: "All skin types",
      longevity: "4-6 hours",
      sillage: "Light",
      season: "Spring/Summer",
    },
  },
  {
    id: "19",
    name: "Golden Sunset",
    brand: "Warm Collection",
    brandimage: "/assets/download (1).jpeg",
    price: 149,
    image: "/assets/19.jpeg",
    images: ["/assets/12.jpeg", "/assets/19.jpeg"],
    description: "Warm sunset with amber, honey, and golden flowers.",
    category: "Amber",
    gender: "unisex",
    inStock: true,
    rating: 4.5,
    reviews: 78,
    features: ["Warm", "Golden", "Sunset"],
    specifications: {
      skinType: "All skin types",
      longevity: "7-9 hours",
      sillage: "Moderate",
      season: "Fall/Winter",
    },
  },
  {
    id: "20",
    name: "White Tea",
    brand: "Zen Collection",
    brandimage: "/assets/download (7).png",
    price: 99,
    image: "/assets/20.jpeg",
    images: ["/assets/20.jpeg", "/assets/20.jpeg", "/assets/20.jpeg"],
    description: "Serene white tea with bamboo and white flowers.",
    category: "Clean",
    gender: "unisex",
    inStock: true,
    rating: 4.4,
    reviews: 52,
    features: ["Serene", "Clean", "Zen"],
    specifications: {
      skinType: "Sensitive skin",
      longevity: "5-7 hours",
      sillage: "Light to Moderate",
      season: "All seasons",
    },
  },
  {
    id: "23",
    name: "Mint Julep",
    brand: "Fresh Collection",
    brandimage: "/assets/images (2).png",
    price: 79,
    image: "/assets/23.jpeg",
    images: ["/assets/23.jpeg", "/assets/23.jpeg"],
    description: "Cool mint with lime and fresh herbs.",
    category: "Fresh",
    gender: "unisex",
    inStock: true,
    rating: 4.2,
    reviews: 43,
    features: ["Cool", "Refreshing", "Herbal"],
    specifications: {
      skinType: "All skin types",
      longevity: "3-5 hours",
      sillage: "Light",
      season: "Summer",
    },
  },
  {
    id: "25",
    name: "Coconut Beach",
    brand: "Tropical Collection",
    brandimage: "/assets/brand.jpeg",
    price: 109,
    image: "/assets/25.jpeg",
    images: ["/assets/25.jpeg", "/assets/25.jpeg"],
    description: "Tropical coconut with sea breeze and sand.",
    category: "Fresh",
    gender: "unisex",
    inStock: true,
    rating: 4.4,
    reviews: 71,
    features: ["Tropical", "Beach", "Vacation"],
    specifications: {
      skinType: "All skin types",
      longevity: "5-7 hours",
      sillage: "Moderate",
      season: "Summer",
    },
  },
]

export const categories = [
  "All",
  "Luxury",
  "Floral",
  "Oriental",
  "Amber",
  "Fresh",
  "Oud",
  "Citrus",
  "Gourmand",
  "Spicy",
  "Green",
  "Woody",
  "Clean",
  "Fruity",
  "Herbal",
]

export const genders = ["All", "men", "women", "unisex"]

export const brands = [
  "All",
  "Luxe Collection",
  "Floral Essence",
  "Dark Collection",
  "Golden Series",
  "Fresh Collection",
  "Premium Oud",
  "Zesty Collection",
  "Romantic Collection",
  "Sweet Collection",
  "Exotic Collection",
  "Masculine Collection",
  "Pure Collection",
  "Celebration Collection",
  "Arabian Collection",
  "Warm Collection",
  "Zen Collection",
  "Japanese Collection",
  "Sensual Collection",
  "Tropical Collection",
  "Woody Collection",
  "Herbal Collection",
  "Gourmand Collection",
  "Celestial Collection",
]
