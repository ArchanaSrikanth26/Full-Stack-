const categories = ['flowers', 'bouquets', 'toys', 'cosmetics']

const categoryTitles = {
  flowers: 'Flowers',
  bouquets: 'Bouquets',
  toys: 'Toys',
  cosmetics: 'Cosmetics',
}

const categoryProducts = {
  flowers: [
    'Rose Glow Arrangement',
    'Garden Whisper Bouquet',
    'Blush Harmony Stems',
    'Pearl Petals Box',
    'Sunlit Floral Mix',
    'Velvet Bloom Bundle',
    'Morning Dew Bouquet',
    'Luxe Stem Circle',
    'Pure Romance Florals',
    'Soft Serenity Basket',
    'Golden Hour Petals',
    'Fresh Meadow Bunch',
    'Pastel Charm Flowers',
    'Elegant Aura Bouquet',
    'Royal Blossom Set',
  ],
  bouquets: [
    'Velvet Celebration Bouquet',
    'Moonlit Rose Wrap',
    'Classic Love Bouquet',
    'Blush Signature Bundle',
    'Premium Petal Box',
    'Honey Dew Bouquet',
    'Grand Bloom Wrap',
    'Modern Romance Basket',
    'Luxury Gift Bouquet',
  ],
  toys: [
    'Cuddle Bear Plush',
    'Happy Elephant Buddy',
    'Dreamy Teddy Companion',
    'Tiny Joy Toy Set',
    'Soft Hug Bunny',
    'Playtime Friend Plush',
    'Cozy Kid Surprise',
    'Sweet Snuggle Bear',
  ],
  cosmetics: [
    'Glow Ritual Kit',
    'Soft Glam Essentials',
    'Luxe Beauty Edit',
    'Radiance Skin Box',
    'Velvet Makeup Set',
    'Morning Dew Skincare',
    'Golden Hour Palette',
    'Fresh Finish Kit',
    'Pure Polish Collection',
  ],
}

const categoryBadges = {
  flowers: ['Fresh cut', 'Best seller', 'Gift ready', 'Classic'],
  bouquets: ['Premium', 'Popular', 'Romantic', 'Gift box'],
  toys: ['Soft touch', 'Kids pick', 'New', 'Cuddle'],
  cosmetics: ['Trending', 'Luxury', 'Glow up', 'Beauty edit'],
}

const categoryDescriptions = {
  flowers: [
    'A fresh floral arrangement for everyday gifting.',
    'Elegant blooms styled with a soft premium finish.',
    'A graceful bunch that feels warm and thoughtful.',
    'A refined flower set for birthdays and celebrations.',
  ],
  bouquets: [
    'Layered wrapping and a polished presentation.',
    'Made for anniversaries, surprises, and special moments.',
    'A boutique style bouquet with a premium feel.',
    'Soft colors and a classic gifting look.',
  ],
  toys: [
    'A soft and friendly plush for gifting and comfort.',
    'Cute, cozy, and perfect for surprise presents.',
    'A cheerful toy with a premium stitched finish.',
    'Designed to feel warm, playful, and gift ready.',
  ],
  cosmetics: [
    'A clean beauty set for a polished routine.',
    'Warm tones and a premium skincare finish.',
    'A modern cosmetic edit for everyday glam.',
    'Elegant beauty basics in a compact set.',
  ],
}

const categoryPriceBase = {
  flowers: 699,
  bouquets: 999,
  toys: 549,
  cosmetics: 1199,
}

const categoryPriceStep = {
  flowers: 70,
  bouquets: 90,
  toys: 60,
  cosmetics: 110,
}

const rawAssets = Object.entries(
  import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
  }),
)

const assetLibrary = rawAssets
  .map(([path, image]) => {
    const relativePath = path.replace('../assets/', '')
    const [category, ...rest] = relativePath.split('/')

    return {
      category,
      fileName: rest.join('/'),
      image,
    }
  })
  .filter((asset) => categories.includes(asset.category))
  .sort((left, right) => {
    const categoryOrder = categories.indexOf(left.category) - categories.indexOf(right.category)

    return categoryOrder !== 0
      ? categoryOrder
      : left.fileName.localeCompare(right.fileName)
  })

const heroImage = assetLibrary[0]?.image

const products = categories.flatMap((category) =>
  assetLibrary
    .filter((asset) => asset.category === category)
    .map((asset, index) => ({
      id: `${category}-${index + 1}`,
      category,
      categoryLabel: categoryTitles[category],
      image: asset.image,
      name: categoryProducts[category][index] ?? `${categoryTitles[category]} Item ${index + 1}`,
      description:
        categoryDescriptions[category][index % categoryDescriptions[category].length],
      badge: categoryBadges[category][index % categoryBadges[category].length],
      price: categoryPriceBase[category] + categoryPriceStep[category] * index,
    })),
)

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const initialCustomer = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pinCode: '',
  paymentMethod: 'Card',
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export {
  categories,
  categoryTitles,
  currency,
  formatDate,
  heroImage,
  initialCustomer,
  products,
}
