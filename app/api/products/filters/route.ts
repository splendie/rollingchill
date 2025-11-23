import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = [
      { value: 'all', label: 'All Categories' },
      { value: 'apparel', label: 'Apparel' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'safety', label: 'Safety' },
      { value: 'skates', label: 'Skates' },
    ];

    const colors = [
      { name: 'Green', value: 'green', hex: '#4CAF50' },
      { name: 'Dark Green', value: 'dark-green', hex: '#2E7D32' },
      { name: 'Lime', value: 'lime', hex: '#76FF03' },
      { name: 'Sage', value: 'sage', hex: '#9E9E9E' },
      { name: 'Light Green', value: 'light-green', hex: '#C5E1A5' },
      { name: 'Purple', value: 'purple', hex: '#512DA8' },
      { name: 'Lavender', value: 'lavender', hex: '#B39DDB' },
      { name: 'Magenta', value: 'magenta', hex: '#C2185B' },
      { name: 'Pink', value: 'pink', hex: '#F48FB1' },
      { name: 'Cyan', value: 'cyan', hex: '#00BCD4' },
      { name: 'Navy', value: 'navy', hex: '#1565C0' },
      { name: 'Blue', value: 'blue', hex: '#2196F3' },
      { name: 'Yellow', value: 'yellow', hex: '#FDD835' },
      { name: 'White', value: 'white', hex: '#FFFFFF' },
      { name: 'Black', value: 'black', hex: '#000000' },
      { name: 'Red', value: 'red', hex: '#D32F2F' },
      { name: 'Brown', value: 'brown', hex: '#5D4037' },
    ];

    const sizes = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const materials = [
      'All Materials',
      'Cotton combed',
      'Drifit',
      'Cotton combed (reflective)',
      'Cotton combed (rainbow reflective)',
    ];

    return NextResponse.json({
      categories,
      colors,
      sizes,
      materials,
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    );
  }
}
