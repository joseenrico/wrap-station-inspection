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
    <div className="bg-white rounded-2xl shadow-lg p-10 mr-40 ml-40">
      <div className="flex items-center space-x-3 mb-6">
        <PencilSquareIcon className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Inspection Form</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.key as keyof typeof formData] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between text-gray-900 hover:bg-gray-50"
            >
              <span>Select color</span>
              <div
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: formData.color }}
              />
            </button>
          </div>
          {showColorPicker && (
            <div className="mt-3 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
              <HexColorPicker
                color={formData.color}
                onChange={(color) => setFormData({ color })}
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ color: e.target.value })}
                className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-center text-gray-900 uppercase"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 p-4 bg-black/5 border border-yellow-400 rounded-lg flex items-center space-x-2">
        <CheckCircleIcon className="w-5 h-5 text-yellow-500" />
        <p className="text-sm text-gray-800">
          Form data is automatically saved. You can continue to the next step.
        </p>
      </div>
    </div>
  );
}
