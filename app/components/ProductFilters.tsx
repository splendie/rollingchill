'use client';

import { Check } from 'lucide-react';

interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

interface ProductFiltersProps {
  categories: Array<{ value: string; label: string }>;
  colors: ColorOption[];
  sizes: string[];
  materials: string[];
  selectedCategory: string;
  selectedColors: string[];
  selectedSize: string;
  selectedMaterial: string;
  showNewOnly: boolean;
  onCategoryChange: (category: string) => void;
  onColorToggle: (color: string) => void;
  onSizeChange: (size: string) => void;
  onMaterialChange: (material: string) => void;
  onShowNewOnlyChange: (checked: boolean) => void;
}

export default function ProductFilters({
  categories,
  colors,
  sizes,
  materials,
  selectedCategory,
  selectedColors,
  selectedSize,
  selectedMaterial,
  showNewOnly,
  onCategoryChange,
  onColorToggle,
  onSizeChange,
  onMaterialChange,
  onShowNewOnlyChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {categories.map((cat) => (
            <option 
              key={cat.value} 
              value={cat.value}
              className={cat.value === 'all' ? 'font-extrabold text-black' : 'font-normal text-gray-700'}
            >
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.value);
            return (
              <button
                key={color.value}
                onClick={() => onColorToggle(color.value)}
                className="relative w-10 h-10 rounded-full border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: color.hex,
                  borderColor: isSelected ? '#000' : color.hex === '#FFFFFF' ? '#E5E7EB' : color.hex,
                }}
                title={color.name}
                aria-label={color.name}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check
                      size={20}
                      className={color.hex === '#FFFFFF' || color.hex === '#FDD835' ? 'text-gray-900' : 'text-white'}
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {sizes.map((size) => (
            <option 
              key={size} 
              value={size}
              className={size === 'All Sizes' ? 'font-extrabold text-black' : 'font-normal text-gray-700'}
            >
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Material Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Material</h3>
        <select
          value={selectedMaterial}
          onChange={(e) => onMaterialChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {materials.map((material) => (
            <option 
              key={material} 
              value={material} 
              className={material === 'All Materials' ? 'font-extrabold text-black' : 'font-normal text-gray-700'}
            >
              {material}
            </option>
          ))}
        </select>
      </div>

      {/* Show New Products Only */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showNewOnly}
            onChange={(e) => onShowNewOnlyChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
          />
          <span className="text-sm text-gray-700">Show New Products Only</span>
        </label>
      </div>
    </div>
  );
}
