import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating product colors...');
  
  await prisma.product.update({
    where: { id: 'CHILLPOWER-CAPY-WHITE' },
    data: {
      colors: JSON.stringify([
        'black',
        'blue',
        'brown',
        'greeniris',
        'greenneon',
        'grey',
        'orange',
        'pink',
        'purple',
        'red',
        'rosepink',
        'white',
        'yellow',
      ]),
    },
  });
  
  console.log('✅ Product colors updated!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });