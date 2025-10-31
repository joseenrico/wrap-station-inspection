'use client';

import { useInspectionStore } from '@/store/inspectionStore';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export function InspectionFormPage() {
  const { formData, setFormData } = useInspectionStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'licensePlate') {
      value = value.replace(/\s/g, '').toUpperCase();
    }
    setFormData({ [field]: value });
  };

  const fields = [
    { label: 'Location', key: 'location', type: 'text', placeholder: 'e.g., Wrap Station Medan' },
    { label: 'Customer First Name', key: 'customerFirstName', type: 'text', placeholder: 'First name' },
    { label: 'Customer Last Name', key: 'customerLastName', type: 'text', placeholder: 'Last name' },
    { label: 'Customer Phone Number', key: 'customerPhone', type: 'tel', placeholder: '+62 xxx' },
    { label: 'Car Brand', key: 'carBrand', type: 'text', placeholder: 'e.g., Toyota' },
    { label: 'Car Model', key: 'carModel', type: 'text', placeholder: 'e.g., Camry' },
    { label: 'Year', key: 'year', type: 'number', placeholder: '2025' },
    { label: 'License Plate (No Spacing)', key: 'licensePlate', type: 'text', placeholder: 'BTEST111' },
    { label: 'Inspection Date', key: 'inspectionDate', type: 'date', placeholder: '' },
    { label: 'Mileage (Kilometer)', key: 'mileage', type: 'number', placeholder: '12345' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 xl:p-10 mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mr-40 xl:ml-40">
      <div className="flex items-center space-x-3 mb-6">
        <PencilSquareIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vehicle Inspection Form</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {fields.map((field) => (
          <div key={field.key} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.key as keyof typeof formData] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white text-sm sm:text-base"
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between text-gray-900 hover:bg-gray-50 text-sm sm:text-base"
            >
              <span>Select color</span>
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: formData.color }}
              />
            </button>
          </div>
          {showColorPicker && (
            <div className="mt-3 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="flex justify-center">
                <HexColorPicker
                  color={formData.color}
                  onChange={(color) => setFormData({ color })}
                />
              </div>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ color: e.target.value })}
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-center text-gray-900 uppercase text-sm sm:text-base"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 sm:mt-5 lg:mt-6 p-3 sm:p-4 bg-black/5 border border-yellow-400 rounded-lg flex items-center space-x-2">
        <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-gray-800">
          Form data is automatically saved. You can continue to the next step.
        </p>
      </div>
    </div>
  );
}