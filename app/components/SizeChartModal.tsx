'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">Size Chart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* T-shirt Image */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-full max-w-[250px] relative aspect-[3/4] bg-white">
                <Image
                  src="/images/size-chart-tshirt.png"
                  alt="T-shirt measurement guide"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Size Table */}
            <div className="md:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2">
                        Width (cm)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2">
                        Length (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {[
                      { size: 'S', width: 47, length: 67 },
                      { size: 'M', width: 50, length: 70 },
                      { size: 'L', width: 53, length: 73 },
                      { size: 'XL', width: 56, length: 75 },
                      { size: '2XL', width: 59, length: 77 },
                      { size: '3XL', width: 62, length: 80 },
                    ].map((item) => (
                      <tr key={item.size} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                          {item.size}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{item.width}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{item.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">📏 Measurement Guide:</span> All measurements are in centimeters. 
                  Width is measured across the chest, and length is measured from shoulder to hem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}