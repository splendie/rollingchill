'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Ruler } from 'lucide-react';
import { Product } from '@/app/types/product';
import Image from 'next/image';

// Color mapping for display
const colorMap: Record<string, { name: string; hex: string }> = {
  yellow: { name: 'Yellow', hex: '#FDD835' },
  white: { name: 'White', hex: '#FFFFFF' },
  black: { name: 'Black', hex: '#000000' },
  blue: { name: 'Blue Sky', hex: '#87CEEB' },
  brown: { name: 'Brown', hex: '#8B4513' },
  greeniris: { name: 'Green Iris', hex: '#90EE90' },
  greenneon: { name: 'Green Neon', hex: '#39FF14' },
  grey: { name: 'Grey', hex: '#808080' },
  orange: { name: 'Orange', hex: '#FF8C00' },
  pink: { name: 'Pink', hex: '#FFB6C1' },
  purple: { name: 'Purple', hex: '#9370DB' },
  red: { name: 'Red', hex: '#DC143C' },
  rosepink: { name: 'Rose Pink', hex: '#FF66B2' },
};

interface ProductImage {
  id: string;
  color: string;
  colorName: string;
  frontImageUrl: string;
  backImageUrl: string;
  displayOrder: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        
        // Fetch product images
        const imagesResponse = await fetch(`/api/products/${params.id}/images`);
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          setProductImages(imagesData);
          
          // Set default color to first available image color
          if (imagesData.length > 0) {
            setSelectedColor(imagesData[0].color);
          }
        }
        
        // Set default selections
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get current image based on selected color and view side
  const getCurrentImage = () => {
    const colorImage = productImages.find((img) => img.color === selectedColor);
    if (colorImage) {
      return viewSide === 'front' ? colorImage.frontImageUrl : colorImage.backImageUrl;
    }
    return product?.image || '';
  };

  // Get thumbnail images for current color
  const getThumbnails = () => {
    const colorImage = productImages.find((img) => img.color === selectedColor);
    if (colorImage) {
      return [
        { side: 'front' as const, url: colorImage.frontImageUrl },
        { side: 'back' as const, url: colorImage.backImageUrl },
      ];
    }
    return [{ side: 'front' as const, url: product?.image || '' }];
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <div className="text-center py-12">
            <p className="text-xl text-red-600 mb-4">{error || 'Product not found'}</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/products">Products</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8">
            {/* Main Image */}
            <div className="relative aspect-square mb-4">
              <Image
                src={getCurrentImage()}
                alt={`${product.name} - ${viewSide}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
            
            {/* Thumbnail Images (Front/Back) */}
            <div className="flex gap-3 mt-4">
              {getThumbnails().map((thumbnail) => (
                <button
                  key={thumbnail.side}
                  onClick={() => setViewSide(thumbnail.side)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    viewSide === thumbnail.side
                      ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={thumbnail.url}
                    alt={`${thumbnail.side} view`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Color: {colorMap[selectedColor]?.name || selectedColor}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => {
                    const colorInfo = colorMap[color] || { name: color, hex: '#CCCCCC' };
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-yellow-400 ring-2 ring-yellow-400 ring-offset-2'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: colorInfo.hex }}
                        title={colorInfo.name}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Materials</h3>
                <div className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full">
                  {product.materials[0]}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                  <button className="flex items-center text-sm text-yellow-600 hover:text-yellow-700">
                    <Ruler className="w-4 h-4 mr-1" />
                    Size Chart
                  </button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:relative lg:border-0 lg:p-0">
              <button
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  alert(`Added ${product.name} (${selectedSize}, ${selectedColor}) to cart!`);
                }}
              >
                🛒 Add to Cart - {formatPrice(product.price)}
              </button>
              
              {/* WhatsApp Order Button */}
              <button
                className="w-full mt-3 bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  const message = `Hi! I'm interested in ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}). Price: ${formatPrice(product.price)}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                💬 Order by WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
