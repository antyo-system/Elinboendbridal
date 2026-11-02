import { Product, CategorySlide, Article } from '../types'

export const CATEGORY_SLIDES: CategorySlide[] = [
  // By Silhouette
  {
    value: 'ballgown',
    label: 'Grand Ballgown',
    description: 'Dramatic voluminous skirts and structured corsets for grand royal entrances.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80',
    type: 'silhouette',
  },
  {
    value: 'a-line',
    label: 'A-Line Princess',
    description: 'Timeless balanced silhouette universally flattering for ceremonies and receptions.',
    image: 'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=600&q=80',
    type: 'silhouette',
  },
  {
    value: 'mermaid',
    label: 'Mermaid Couture',
    description: 'Form-fitting curves flared at the knee with cascading Spanish lace trains.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    type: 'silhouette',
  },
  {
    value: 'sheath',
    label: 'Modern Sheath',
    description: 'Sleek, fluid silk silhouettes tailored for intimate and destination celebrations.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    type: 'silhouette',
  },

  // By Occasion
  {
    value: 'holy-matrimony',
    label: 'Holy Matrimony / Akad',
    description: 'Modest elegance, ethereal high necklines, and sacred cathedral-length veils.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    type: 'occasion',
  },
  {
    value: 'reception',
    label: 'Wedding Reception',
    description: 'Glittering Swarovski beadwork and statement trains that shimmer under chandeliers.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    type: 'occasion',
  },
  {
    value: 'evening-gala',
    label: 'Evening Party & Gala',
    description: 'Bold jewel-tone velvet and satin gowns designed to command attention.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80',
    type: 'occasion',
  },
  {
    value: 'bridesmaid',
    label: 'Bridesmaids & Family',
    description: 'Harmonious pastel shades and comfortable luxury chiffon dresses.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    type: 'occasion',
  },
]

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'eb-001',
    title: 'The Aurelia French Lace Ballgown',
    slug: 'the-aurelia-french-lace-ballgown',
    product_type: 'wedding_gown',
    silhouette: 'Ballgown',
    occasion: 'Holy Matrimony',
    color_name: 'Ivory & Warm Champagne',
    color_hex: '#F5EDE6',
    fabric: 'French Chantilly Lace & Silk Organza',
    rental_price: 6500000,
    original_rental_price: 8500000,
    purchase_price: 24000000,
    original_purchase_price: 28000000,
    security_deposit: 1500000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: true,
    flash_sale_discount_percent: 24,
    flash_sale_stock: 1,
    badge_label: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Handcrafted with delicate French Chantilly lace over sparkling organza, The Aurelia features an internal sweetheart corset and a cathedral train that floats down the aisle.',
    rating: 5.0,
    reviews_count: 18,
    sizes_available: ['XS', 'S', 'M', 'Custom'],
  },
  {
    id: 'eb-002',
    title: 'Seraphina Crystalline Mermaid Gown',
    slug: 'seraphina-crystalline-mermaid-gown',
    product_type: 'wedding_gown',
    silhouette: 'Mermaid',
    occasion: 'Wedding Reception',
    color_name: 'Pure White',
    color_hex: '#FFFFFF',
    fabric: 'Crepe Silk & Swarovski Beads',
    rental_price: 5200000,
    original_rental_price: 6500000,
    purchase_price: 19500000,
    original_purchase_price: 22000000,
    security_deposit: 1200000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: true,
    flash_sale_discount_percent: 20,
    flash_sale_stock: 2,
    badge_label: 'Haute Couture',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'A sculptural masterpiece hugging every curve before cascading into a flared godet train encrusted with hand-sewn micro crystals.',
    rating: 4.9,
    reviews_count: 14,
    sizes_available: ['S', 'M', 'L'],
  },
  {
    id: 'eb-003',
    title: 'Elysian Minimalist Mikado Sheath',
    slug: 'elysian-minimalist-mikado-sheath',
    product_type: 'wedding_gown',
    silhouette: 'Sheath / Column',
    occasion: 'Holy Matrimony',
    color_name: 'Lustrous Pearl',
    color_hex: '#FAF8F5',
    fabric: 'Heavy Japanese Mikado Silk',
    rental_price: 4200000,
    original_rental_price: 5000000,
    purchase_price: 15500000,
    original_purchase_price: 18000000,
    security_deposit: 1000000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: false,
    badge_label: 'Modern Bride',
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'For the contemporary bride who values clean lines and architectural drapery. Includes a detachable dramatic back bow with floor-sweeping ties.',
    rating: 4.8,
    reviews_count: 9,
    sizes_available: ['XS', 'S', 'M', 'L', 'Custom'],
  },
  {
    id: 'eb-004',
    title: 'Nocturne Emerald Velvet Evening Gown',
    slug: 'nocturne-emerald-velvet-evening-gown',
    product_type: 'party_dress',
    silhouette: 'Mermaid',
    occasion: 'Evening Gala',
    color_name: 'Deep Emerald',
    color_hex: '#0A3B2A',
    fabric: 'Silk Stretch Velvet & Gold Thread',
    rental_price: 2800000,
    original_rental_price: 3500000,
    purchase_price: 9800000,
    original_purchase_price: 12000000,
    security_deposit: 800000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: true,
    flash_sale_discount_percent: 20,
    flash_sale_stock: 1,
    badge_label: 'Party Exclusive',
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Luxurious deep emerald stretch velvet featuring an asymmetric off-shoulder neckline and a sensual high leg slit. Perfect for galas and black-tie affairs.',
    rating: 4.9,
    reviews_count: 22,
    sizes_available: ['S', 'M', 'L'],
  },
  {
    id: 'eb-005',
    title: 'Celeste Starlight A-Line Gown',
    slug: 'celeste-starlight-a-line-gown',
    product_type: 'wedding_gown',
    silhouette: 'A-Line',
    occasion: 'Wedding Reception',
    color_name: 'Blush & Silver Shimmer',
    color_hex: '#FCEEE9',
    fabric: 'Glitter Tulle & 3D Floral Appliques',
    rental_price: 5800000,
    original_rental_price: 7200000,
    purchase_price: 21000000,
    original_purchase_price: 25000000,
    security_deposit: 1500000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: false,
    badge_label: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Soft blush undertones overlaid with celestial star-dusted tulle and botanical 3D blossoms trickling down from bodice to hem.',
    rating: 5.0,
    reviews_count: 31,
    sizes_available: ['XS', 'S', 'M', 'XL', 'Custom'],
  },
  {
    id: 'eb-006',
    title: 'Genevieve Champagne Draped Satin Dress',
    slug: 'genevieve-champagne-draped-satin-dress',
    product_type: 'party_dress',
    silhouette: 'Sheath / Column',
    occasion: 'Evening Gala',
    color_name: 'Warm Champagne',
    color_hex: '#DFCCAF',
    fabric: 'Heavy Duchess Satin',
    rental_price: 2400000,
    original_rental_price: 3000000,
    purchase_price: 8500000,
    original_purchase_price: 10500000,
    security_deposit: 700000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: false,
    badge_label: 'Popular Rental',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Impeccably draped cowl neckline with open back detailing, tailored to move like liquid gold under evening lights.',
    rating: 4.7,
    reviews_count: 11,
    sizes_available: ['S', 'M'],
  },
  {
    id: 'eb-007',
    title: 'Adelaide Modern Heritage Kebaya Pengantin',
    slug: 'adelaide-modern-heritage-kebaya-pengantin',
    product_type: 'wedding_gown',
    silhouette: 'Modern Kebaya',
    occasion: 'Holy Matrimony',
    color_name: 'Broken White & Gold Lace',
    color_hex: '#F9F6F0',
    fabric: 'French Corded Lace & Songket Accent',
    rental_price: 4900000,
    original_rental_price: 6000000,
    purchase_price: 18000000,
    security_deposit: 1200000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: true,
    flash_sale_discount_percent: 18,
    flash_sale_stock: 1,
    badge_label: 'Heritage Couture',
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'A refined fusion of traditional Indonesian kebaya silhouette with contemporary haute couture corsetry and floor-length trailing lace train.',
    rating: 5.0,
    reviews_count: 27,
    sizes_available: ['S', 'M', 'Custom'],
  },
  {
    id: 'eb-008',
    title: 'Rosalind Pastel Rose Bridesmaid Gown',
    slug: 'rosalind-pastel-rose-bridesmaid-gown',
    product_type: 'party_dress',
    silhouette: 'A-Line',
    occasion: 'Bridesmaid',
    color_name: 'Dusty Rose',
    color_hex: '#E2B2B8',
    fabric: 'Italian Chiffon & Pleated Bodice',
    rental_price: 1800000,
    original_rental_price: 2200000,
    purchase_price: 5500000,
    security_deposit: 500000,
    is_rental_available: true,
    is_purchase_available: true,
    is_flash_sale: false,
    badge_label: 'Bridesmaid Favorite',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Airy and romantic, Rosalind is designed for bridesmaids who desire elegance with effortless comfort throughout a full wedding celebration.',
    rating: 4.8,
    reviews_count: 19,
    sizes_available: ['XS', 'S', 'M', 'L', 'XL'],
  },
]

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-001',
    title: 'The Ultimate Guide to Choosing Your Dream Wedding Gown Silhouette',
    slug: 'ultimate-guide-choosing-wedding-gown-silhouette',
    category: 'Silhouette Guide',
    excerpt:
      'From grand ballgowns to architectural column sheaths, learn how neckline, train, and corset geometry complement your unique body proportions.',
    content: `
### Finding the Silhouette That Tells Your Love Story

Every bride arrives at our atelier with a vision. Yet, discovering the wedding dress that truly takes your breath away is often a journey of exploring how fabric architecture interacts with your body geometry.

#### 1. The Timeless Ballgown
If you have envisioned a fairytale grand entrance under chandelier lighting, the ballgown remains unrivaled. Featuring a structured bodice that cinches at the natural waist before dramatically cascading into layers of organza and tulle, this silhouette creates the classic hourglass proportion.

#### 2. The Universally Flattering A-Line
The A-line is celebrated as fashion's most forgiving and versatile silhouette. Gently widening from the bust downwards without dramatic volume at the hips, it offers supreme comfort for long ceremony rituals and outdoor garden receptions.

#### 3. The Sculptural Mermaid & Trumpet
Designed for confident brides who wish to accentuate their natural curves. A well-constructed mermaid gown hugs the torso, waist, and hips before flaring outward at the mid-thigh or knee. Our atelier integrates flexible French boning to ensure full ease of movement during your first dance.

#### 4. The Modern Minimalist Sheath
For intimate celebrations or destination ceremonies, heavy layers can feel overwhelming. Fluid Japanese Mikado silk or bias-cut satin sheaths offer clean, sculptural elegance that moves like water.
    `,
    cover_image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    author: 'Elin Boend, Lead Designer',
    date: 'Oct 28, 2026',
    read_time: '5 min read',
  },
  {
    id: 'art-002',
    title: 'Wedding Gown Rental vs. Custom Made: Which One Fits Your Wedding Budget?',
    slug: 'wedding-gown-rental-vs-custom-made-budget-guide',
    category: 'Bridal Budget',
    excerpt:
      'Compare the benefits of couture rental with bespoke purchase to maximize your wedding budget without sacrificing luxury craftsmanship.',
    content: `
### Making the Right Investment for Your Special Day

One of the first questions brides ask during our private consultations is whether they should rent an existing couture gown or commission a bespoke made-to-measure piece.

#### The Advantages of Couture Rental
- **Significant Cost Savings**: Luxury designer gowns with retail values exceeding Rp 25.000.000 can be rented for Rp 4.500.000 - Rp 7.000.000.
- **Zero Preservation Hassle**: You avoid the burden of dry cleaning, acid-free storage boxes, and long-term humidity protection.
- **Included Alterations**: At Elinboend Bridal, every rental gown includes complimentary custom fitting to ensure a glove-like fit.

#### When to Choose Custom Made-to-Measure
- **Unique Proportions**: If standard dress sizes require extreme alterations.
- **Heirloom Sentiment**: If you intend to pass your dress down to future generations or transform it into baptism robes.
- **Exact Design Vision**: When you desire custom beadwork monogramming, custom embroidery, or specific family heirloom fabrics.
    `,
    cover_image:
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    author: 'Clarissa Ward, Bridal Concierge',
    date: 'Oct 15, 2026',
    read_time: '4 min read',
  },
  {
    id: 'art-003',
    title: 'Bridal Fitting Etiquette: 5 Things to Prepare Before Your Fitting Session',
    slug: 'bridal-fitting-etiquette-5-things-to-prepare',
    category: 'Fitting & Care',
    excerpt:
      'Maximize your 1-on-1 atelier fitting session with these essential preparations: undergarment selection, heel height, and guest etiquette.',
    content: `
### Preparing for Your Private Atelier Fitting

Your private fitting is an intimate milestone where sketches and silhouettes transform into your reality. Here is how to prepare:

1. **Bring Your Wedding Day Shoes or Exact Heel Height**: The hemline alteration depends entirely on heel height. Even a 2cm variance can cause train bunching.
2. **Wear Seamless Nude Undergarments**: Bright or textured undergarments distort the transparency and drape of sheer illusion lace.
3. **Limit Your Entourage to 2 Trusted Voices**: Too many conflicting opinions create unnecessary stress for the bride. Bring only those whose emotional support anchors you.
4. **Take Photos in Natural and Ambient Lighting**: See how the beading catches both daylight and evening room chandeliers.
    `,
    cover_image:
      'https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=800&q=80',
    author: 'Elin Boend, Lead Designer',
    date: 'Sep 30, 2026',
    read_time: '4 min read',
  },
]

