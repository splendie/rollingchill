import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productImages = [
  {
    productId: 'CHILLPOWER-CAPY-WHITE',
    images: [
      {
        color: 'black',
        colorName: 'Black',
        frontImageUrl: '/images/products/TSS2D1BLACK1.webp',
        backImageUrl: '/images/products/TSS2D1BLACK2.webp',
        displayOrder: 0,
      },
      {
        color: 'blue',
        colorName: 'Blue Sky',
        frontImageUrl: '/images/products/TSS2D1BLUESKY1.webp',
        backImageUrl: '/images/products/TSS2D1BLUESKY2.webp',
        displayOrder: 1,
      },
      {
        color: 'brown',
        colorName: 'Brown',
        frontImageUrl: '/images/products/TSS2D1BROWN1.webp',
        backImageUrl: '/images/products/TSS2D1BROWN1.webp', // Only one image available
        displayOrder: 2,
      },
      {
        color: 'greeniris',
        colorName: 'Green Iris',
        frontImageUrl: '/images/products/TSS2D1GREENIRIS1.webp',
        backImageUrl: '/images/products/TSS2D1GREENIRIS2.webp',
        displayOrder: 3,
      },
      {
        color: 'greenneon',
        colorName: 'Green Neon',
        frontImageUrl: '/images/products/TSS2D1GREENNEON1.webp',
        backImageUrl: '/images/products/TSS2D1GREENNEON2.webp',
        displayOrder: 4,
      },
      {
        color: 'grey',
        colorName: 'Grey',
        frontImageUrl: '/images/products/TSS2D1GREY1.webp',
        backImageUrl: '/images/products/TSS2D1GREY2.webp',
        displayOrder: 5,
      },
      {
        color: 'orange',
        colorName: 'Orange',
        frontImageUrl: '/images/products/TSS2D1ORANGE1.webp',
        backImageUrl: '/images/products/TSS2D1ORANGE2.webp',
        displayOrder: 6,
      },
      {
        color: 'pink',
        colorName: 'Pink',
        frontImageUrl: '/images/products/TSS2D1PINK1.webp',
        backImageUrl: '/images/products/TSS2D1PINK2.webp',
        displayOrder: 7,
      },
      {
        color: 'purple',
        colorName: 'Purple',
        frontImageUrl: '/images/products/TSS2D1PURPLE1.webp',
        backImageUrl: '/images/products/TSS2D1PURPLE2.webp',
        displayOrder: 8,
      },
      {
        color: 'red',
        colorName: 'Red',
        frontImageUrl: '/images/products/TSS2D1RED1.webp',
        backImageUrl: '/images/products/TSS2D1RED2.webp',
        displayOrder: 9,
      },
      {
        color: 'rosepink',
        colorName: 'Rose Pink',
        frontImageUrl: '/images/products/TSS2D1ROSEPINK1.webp',
        backImageUrl: '/images/products/TSS2D1ROSEPINK2.webp',
        displayOrder: 10,
      },
      {
        color: 'white',
        colorName: 'White',
        frontImageUrl: '/images/products/TSS2D1WHITE1.webp',
        backImageUrl: '/images/products/TSS2D1WHITE2.webp',
        displayOrder: 11,
      },
      {
        color: 'yellow',
        colorName: 'Yellow',
        frontImageUrl: '/images/products/TSS2D1YELLOW1.webp',
        backImageUrl: '/images/products/TSS2D1YELLOW2.webp',
        displayOrder: 12,
      },
    ],
  },
];

async function main() {
  console.log('Start seeding product images...');
  
  for (const productData of productImages) {
    console.log(`Processing product: ${productData.productId}`);
    
    // Delete existing images for this product
    await prisma.productImage.deleteMany({
      where: { productId: productData.productId },
    });
    console.log(`Deleted existing images for ${productData.productId}`);
    
    // Create new images
    for (const imgData of productData.images) {
      await prisma.productImage.create({
        data: {
          productId: productData.productId,
          color: imgData.color,
          colorName: imgData.colorName,
          frontImageUrl: imgData.frontImageUrl,
          backImageUrl: imgData.backImageUrl,
          displayOrder: imgData.displayOrder,
        },
      });
      console.log(`✓ Created images for ${imgData.colorName}`);
    }
  }
  
  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });