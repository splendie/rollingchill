'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { Product } from '../types/product';

interface FilterData {
  categories: { value: string; label: string }[];
  colors: { name: string; value: string; hex: string }[];
  sizes: string[];
  materials: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    categories: [],
    colors: [],
    sizes: [],
    materials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [showNewOnly, setShowNewOnly] = useState(false);

  // Fetch filters on mount
  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await fetch('/api/products/filters');
        if (!response.ok) throw new Error('Failed to fetch filters');
        const data = await response.json();
        setFilters(data);
      } catch (err) {
        console.error('Error fetching filters:', err);
        setError('Failed to load filters');
      }
    }
    fetchFilters();
  }, []);

  // Fetch products based on filters
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedColors.length > 0) params.append('colors', selectedColors.join(','));
        if (selectedSize) params.append('size', selectedSize);
        if (selectedMaterial) params.append('material', selectedMaterial);
        if (showNewOnly) params.append('showNewOnly', 'true');

        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory, selectedColors, selectedSize, selectedMaterial, showNewOnly]);

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Yellow Header Banner */}
      <div className="bg-yellow-400 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Our Products</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <ProductFilters
                categories={filters.categories}
                colors={filters.colors}
                sizes={filters.sizes}
                materials={filters.materials}
                selectedCategory={selectedCategory}
                selectedColors={selectedColors}
                selectedSize={selectedSize}
                selectedMaterial={selectedMaterial}
                showNewOnly={showNewOnly}
                onCategoryChange={setSelectedCategory}
                onColorToggle={handleColorToggle}
                onSizeChange={setSelectedSize}
                onMaterialChange={setSelectedMaterial}
                onShowNewOnlyChange={setShowNewOnly}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Count */}
            <div className="mb-6">
              {loading ? (
                <div className="h-8 bg-gray-200 animate-pulse rounded w-48"></div>
              ) : (
                <p className="text-gray-900 font-semibold text-lg">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
