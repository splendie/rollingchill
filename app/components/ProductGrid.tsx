'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group cursor-pointer"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            
            {/* NEW Badge */}
            {product.isNew && (
              <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded text-xs font-bold">
                NEW
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            
            <div className="mt-auto">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
