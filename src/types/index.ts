export type ConditionRating = 'G' | 'F' | 'P' | null;

export interface InspectionFormData {
  location: string;
  customerFirstName: string;
  customerLastName: string;
  carBrand: string;
  carModel: string;
  color: string;
  year: string;
  licensePlate: string;
  inspectionDate: string;
  mileage: string;
}

export interface ConditionDetail {
  rating: ConditionRating;
  notes?: string;
  photos?: File[];
}

export interface ConditionReport {
  paint: ConditionDetail;
  glass: {
    windshield: ConditionDetail;
    windows: ConditionDetail;
    mirrors: ConditionDetail;
    rearWindow: ConditionDetail;
  };
  tiresAndWheels: {
    tires: ConditionDetail;
    wheels: ConditionDetail;
  };
}

export interface ExportData {
  signature: string | null;
  agreedToTerms: boolean;
}

export interface InspectionState {
  formData: InspectionFormData;
  conditionReport: ConditionReport;
  exportData: ExportData;
  setFormData: (data: Partial<InspectionFormData>) => void;
  setConditionDetail: (category: string, subCategory: string | null, detail: Partial<ConditionDetail>) => void;
  setExportData: (data: Partial<ExportData>) => void;
  resetState: () => void;
}

export type NavigationPage = 'dashboard' | 'inspection' | 'condition' | 'export';