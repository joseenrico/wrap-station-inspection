import { create } from 'zustand';
import { InspectionState, ConditionDetail } from '@/types';
import { format } from 'date-fns';

const initialConditionDetail: ConditionDetail = {
  rating: null,
  notes: '',
  photos: [],
};

const initialState = {
  formData: {
    location: '',
    customerFirstName: '',
    customerLastName: '',
    carBrand: '',
    carModel: '',
    color: '#000000',
    year: '',
    licensePlate: '',
    inspectionDate: format(new Date(), 'yyyy-MM-dd'),
    mileage: '',
  },
  conditionReport: {
    paint: { ...initialConditionDetail },
    glass: {
      windshield: { ...initialConditionDetail },
      windows: { ...initialConditionDetail },
      mirrors: { ...initialConditionDetail },
      rearWindow: { ...initialConditionDetail },
    },
    tiresAndWheels: {
      tires: { ...initialConditionDetail },
      wheels: { ...initialConditionDetail },
    },
  },
  exportData: {
    signature: null,
    agreedToTerms: false,
  },
};

export const useInspectionStore = create<InspectionState>((set) => ({
  ...initialState,

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setConditionDetail: (category, subCategory, detail) =>
    set((state) => {
      const newReport = { ...state.conditionReport };

      if (category === 'paint') {
        newReport.paint = { ...newReport.paint, ...detail };
      } else if (category === 'glass' && subCategory) {
        newReport.glass = {
          ...newReport.glass,
          [subCategory]: { ...newReport.glass[subCategory as keyof typeof newReport.glass], ...detail },
        };
      } else if (category === 'tiresAndWheels' && subCategory) {
        newReport.tiresAndWheels = {
          ...newReport.tiresAndWheels,
          [subCategory]: { ...newReport.tiresAndWheels[subCategory as keyof typeof newReport.tiresAndWheels], ...detail },
        };
      }

      return { conditionReport: newReport };
    }),

  setExportData: (data) =>
    set((state) => ({
      exportData: { ...state.exportData, ...data },
    })),

  resetState: () => set(initialState),
}));