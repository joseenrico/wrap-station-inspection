'use client';

import { useInspectionStore } from '@/store/inspectionStore';
import { ConditionRating } from '@/types';
import { useState } from 'react';
import {
  DocumentIcon,
  PaintBrushIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

interface ConditionItemProps {
  label: string;
  category: string;
  subCategory?: string;
}

function ConditionItem({ label, category, subCategory }: ConditionItemProps) {
  const { conditionReport, setConditionDetail } = useInspectionStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getCondition = () => {
    if (category === 'paint') return conditionReport.paint;
    if (category === 'glass' && subCategory) {
      return conditionReport.glass[subCategory as keyof typeof conditionReport.glass];
    }
    if (category === 'tiresAndWheels' && subCategory) {
      return conditionReport.tiresAndWheels[subCategory as keyof typeof conditionReport.tiresAndWheels];
    }
    return { rating: null, notes: '', photos: [] };
  };

  const condition = getCondition();
  const ratings: { value: ConditionRating; label: string; color: string }[] = [
    { value: 'G', label: 'G', color: 'bg-green-600 text-white' },
    { value: 'F', label: 'F', color: 'bg-yellow-500 text-white' },
    { value: 'P', label: 'P', color: 'bg-red-500 text-white' },
  ];

  const handleRatingChange = (rating: ConditionRating) => {
    setConditionDetail(category, subCategory || null, { rating });
  };

  const handleNotesChange = (notes: string) => {
    setConditionDetail(category, subCategory || null, { notes });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setConditionDetail(category, subCategory || null, { photos: [file] });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">{label}</h4>
        <div className="flex space-x-2">
          {ratings.map((rating) => (
            <button
              key={rating.value}
              onClick={() => handleRatingChange(rating.value)}
              className={`w-10 h-10 rounded font-bold transition-colors ${
                condition.rating === rating.value
                  ? rating.color
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {rating.label}
            </button>
          ))}
        </div>
      </div>
      {condition.rating === 'P' && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Catatan untuk {label})
            </label>
            <textarea
              value={condition.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={`Catatan untuk ${label}...`}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 max-w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ConditionReportPage() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 xl:p-10 mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mr-40 xl:ml-40">
      <div className="flex items-center space-x-3 mb-6">
        <DocumentIcon className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Condition Report</h2>
      </div>
      <p className="text-gray-600 mb-6">
        G = Good | F = Fair | P = Poor
      </p>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <PaintBrushIcon className="w-6 h-6 text-yellow-500 mr-2" /> Paint
          </h3>
          <ConditionItem label="Paint" category="paint" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Squares2X2Icon className="w-6 h-6 text-yellow-500 mr-2" /> Glass
          </h3>
          <div className="space-y-3">
            <ConditionItem label="Windshield" category="glass" subCategory="windshield" />
            <ConditionItem label="Windows" category="glass" subCategory="windows" />
            <ConditionItem label="Mirrors" category="glass" subCategory="mirrors" />
            <ConditionItem label="Rear Window" category="glass" subCategory="rearWindow" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Cog6ToothIcon className="w-6 h-6 text-yellow-500 mr-2" /> Tires and Wheels
          </h3>
          <div className="space-y-3">
            <ConditionItem label="Tires" category="tiresAndWheels" subCategory="tires" />
            <ConditionItem label="Wheels" category="tiresAndWheels" subCategory="wheels" />
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-black/5 border border-yellow-400 rounded-lg flex items-center space-x-2">
        <LightBulbIcon className="w-5 h-5 text-yellow-500" />
        <p className="text-sm text-gray-800">
          Select "P" (Poor) for any item that needs attention to add notes and photos.
        </p>
      </div>
    </div>
  );
}
