import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    id: 'LONG-CHILL-N-ROLL-CAPY-YELLOW',
    name: "Long Chill'n Roll Capybara T-shirt S2",
    price: 130000,
    image: '/images/products/TSS2D4YELLOWCHEESE1L.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['yellow']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'CHILL-N-ROLL-CAPY-WHITE',
    name: "Chill'n Roll Capybara T-shirt S2",
    price: 110000,
    image: '/images/products/TSS2D4WHITE1.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['white']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'ROLLINGCHILL-TSHIRT-BLACK',
    name: 'Rollingchill T-shirt S2',
    price: 115000,
    image: '/images/products/TSS2D3BLACK1.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['black']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'SLEEVE-ROLLINGCHILL-GREEN',
    name: 'Sleeve Rollingchill T-shirt S2',
    price: 115000,
    image: '/images/products/TSS2D3GREENICE1S.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['green', 'sage']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'LONG-CHILLOUT-CAPY-RED',
    name: 'Long Chillout Capybara T-shirt S2',
    price: 130000,
    image: '/images/products/long-chillout-red.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['red']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'CHILLOUT-CAPY-BLACK',
    name: 'Chillout Capybara T-shirt S2',
    price: 110000,
    image: '/images/products/chillout-black.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['black']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'LONG-CHILLPOWER-CAPY-BROWN',
    name: 'Long ChillPower Capybara T-shirt S2',
    price: 130000,
    image: '/images/products/long-chillpower-brown.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['brown']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
  {
    id: 'CHILLPOWER-CAPY-WHITE',
    name: 'ChillPower Capybara T-shirt S2',
    price: 110000,
    image: '/images/products/chillpower-white.webp',
    category: 'apparel',
    inStock: true,
    isNew: true,
    colors: JSON.stringify(['white']),
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    materials: JSON.stringify(['Cotton combed']),
  },
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing products
  await prisma.product.deleteMany();
  
  // Create products
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${created.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
