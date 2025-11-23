'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { products, categories, availableColors, availableSizes, availableMaterials } from '../data/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [showNewOnly, setShowNewOnly] = useState(false);

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Color filter
      const matchesColor =
        selectedColors.length === 0 ||
        (product.colors && product.colors.some((color) => selectedColors.includes(color)));

      // Size filter
      const matchesSize =
        selectedSize === 'All Sizes' ||
        (product.sizes && product.sizes.includes(selectedSize));

      // Material filter
      const matchesMaterial =
        selectedMaterial === 'All Materials' ||
        (product.materials && product.materials.includes(selectedMaterial));

      // New products filter
      const matchesNew = !showNewOnly || product.isNew;

      return matchesCategory && matchesColor && matchesSize && matchesMaterial && matchesNew;
    });
  }, [selectedCategory, selectedColors, selectedSize, selectedMaterial, showNewOnly]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Products Section with Sidebar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <ProductFilters
                categories={categories}
                colors={availableColors}
                sizes={availableSizes}
                materials={availableMaterials}
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
              <p className="text-gray-900 font-semibold text-lg">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
}
