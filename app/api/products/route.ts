import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const colors = searchParams.get('colors')?.split(',').filter(Boolean);
    const size = searchParams.get('size');
    const material = searchParams.get('material');
    const showNewOnly = searchParams.get('showNewOnly') === 'true';

    // Build where clause
    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (showNewOnly) {
      where.isNew = true;
    }

    // Fetch products
    let products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse JSON fields and filter by colors, sizes, materials
    products = products
      .map((product) => ({
        ...product,
        colors: product.colors ? JSON.parse(product.colors) : [],
        sizes: product.sizes ? JSON.parse(product.sizes) : [],
        materials: product.materials ? JSON.parse(product.materials) : [],
      }))
      .filter((product) => {
        // Filter by colors
        if (colors && colors.length > 0) {
          const hasMatchingColor = product.colors.some((color: string) =>
            colors.includes(color)
          );
          if (!hasMatchingColor) return false;
        }

        // Filter by size
        if (size && size !== 'All Sizes') {
          if (!product.sizes.includes(size)) return false;
        }

        // Filter by material
        if (material && material !== 'All Materials') {
          if (!product.materials.includes(material)) return false;
        }

        return true;
      });

    return NextResponse.json(products);
  } catch (error) {
    // Log the full error for debugging
    console.error('Error fetching products:', error);
    console.error('DATABASE_URL exists:', !!process.env.DATABASE_URL);

    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
