'use client';

import { generatePDF } from '@/lib/pdfGenerator';
import { useInspectionStore } from '@/store/inspectionStore';
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  CheckCircleIcon,
  DocumentCheckIcon,
  PencilIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

const TERMS_AND_CONDITIONS = [
  'Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.',
  'Status cat kendaraan (repaint/original) tidak dapat dipastikan, risiko ditanggung pemilik.',
  'Penambahan jarak tempuh (mileage) bisa terjadi, dan bukan tanggung jawab Wrap Station.',
  'Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami.',
  'Kerusakan akibat pembongkaran aksesori oleh pihak lain bukan tanggung jawab kami.',
  'Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraan.',
  'Wrap Station berhak melakukan tindakan teknis bila diperlukan dan disetujui sebelumnya.',
  'Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.',
  'Penurunan baterai EV adalah kondisi alami, bukan tanggung jawab kami.',
  'Estimasi pengerjaan dapat berubah. Keterlambatan akan diinformasikan ke pelanggan.',
];

export function ExportPage() {
  const { formData, conditionReport, exportData, setExportData } = useInspectionStore();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleClearSignature = () => {
    signatureRef.current?.clear();
    setExportData({ signature: null });
  };

  const handleSubmit = async () => {
    if (!exportData.agreedToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    if (signatureRef.current?.isEmpty()) {
      alert('Please provide your signature');
      return;
    }

    setIsGenerating(true);
    try {
      const signatureData = signatureRef.current?.toDataURL();
      setExportData({ signature: signatureData || null });
      await generatePDF({
        formData,
        conditionReport,
        signature: signatureData || '',
      });
      alert('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 xl:p-10 mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mr-40 xl:ml-40">
      <div className="flex items-center space-x-3 mb-6">
        <DocumentCheckIcon className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Generate Inspection Report</h2>
      </div>
      <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <PencilIcon className="w-5 h-5 text-yellow-500 mr-2" /> Inspection Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
          <div>
            <span className="font-medium">Customer:</span>
            <p>{formData.customerFirstName} {formData.customerLastName}</p>
          </div>
          <div>
            <span className="font-medium">Vehicle:</span>
            <p>{formData.carBrand} {formData.carModel} ({formData.year})</p>
          </div>
          <div>
            <span className="font-medium">License Plate:</span>
            <p>{formData.licensePlate}</p>
          </div>
          <div>
            <span className="font-medium">Date:</span>
            <p>{formData.inspectionDate}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="w-5 h-5 text-yellow-500 mr-2" /> Terms & Conditions
        </h3>
        <div className="max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200">
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {TERMS_AND_CONDITIONS.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
        </div>
        <label className="flex items-start space-x-3 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={exportData.agreedToTerms}
            onChange={(e) => setExportData({ agreedToTerms: e.target.checked })}
            className="mt-1 w-5 h-5 text-yellow-500 rounded focus:ring-2 focus:ring-yellow-400"
          />
          <span className="text-sm text-gray-700">
            Saya telah membaca dan menyetujui Syarat dan Ketentuan di atas.
          </span>
        </label>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2" /> Signature
        </h3>
        <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: 'w-full h-48 bg-white',
            }}
            onEnd={() => {
              const data = signatureRef.current?.toDataURL();
              setExportData({ signature: data || null });
            }}
          />
        </div>
        <button
          onClick={handleClearSignature}
          className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Clear Signature
        </button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={isGenerating || !exportData.agreedToTerms}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          isGenerating || !exportData.agreedToTerms
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-900'
        }`}
      >
        {isGenerating ? 'Generating PDF...' : 'Generate PDF Report'}
      </button>
    </div>
  );
}
