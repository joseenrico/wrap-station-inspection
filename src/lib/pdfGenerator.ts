import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InspectionFormData, ConditionReport } from '@/types';

interface PDFData {
  formData: InspectionFormData;
  conditionReport: ConditionReport;
  signature: string;
}

export async function generatePDF(data: PDFData) {
  const doc = new jsPDF();
  let yPosition = 20;
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('WrapStation Inspection Report', 105, yPosition, { align: 'center' });
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Vehicle Information', 20, yPosition);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const vehicleInfo = [
    ['Location', data.formData.location],
    ['Customer Name', `${data.formData.customerFirstName} ${data.formData.customerLastName}`],
    ['Vehicle', `${data.formData.carBrand} ${data.formData.carModel}`],
    ['Year', data.formData.year],
    ['License Plate', data.formData.licensePlate],
    ['Inspection Date', data.formData.inspectionDate],
    ['Mileage', `${data.formData.mileage} km`],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: vehicleInfo,
    theme: 'plain',
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 120 },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;
  doc.setFillColor(data.formData.color);
  doc.rect(20, yPosition, 15, 8, 'F');
  doc.text(`Vehicle Color: ${data.formData.color}`, 40, yPosition + 6);
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Condition Report', 20, yPosition);
  yPosition += 8;

  const getRatingText = (rating: string | null) => {
    if (rating === 'G') return 'Good';
    if (rating === 'F') return 'Fair';
    if (rating === 'P') return 'Poor';
    return 'Not Rated';
  };
  const conditionData = [
    ['Paint', getRatingText(data.conditionReport.paint.rating)],
    ['Windshield', getRatingText(data.conditionReport.glass.windshield.rating)],
    ['Windows', getRatingText(data.conditionReport.glass.windows.rating)],
    ['Mirrors', getRatingText(data.conditionReport.glass.mirrors.rating)],
    ['Rear Window', getRatingText(data.conditionReport.glass.rearWindow.rating)],
    ['Tires', getRatingText(data.conditionReport.tiresAndWheels.tires.rating)],
    ['Wheels', getRatingText(data.conditionReport.tiresAndWheels.wheels.rating)],
  ];
  autoTable(doc, {
    startY: yPosition,
    head: [['Component', 'Rating']],
    body: conditionData,
    theme: 'striped',
    headStyles: { fillColor: [66, 139, 202] },
  });
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  const poorConditions = [];
  if (data.conditionReport.paint.rating === 'P' && data.conditionReport.paint.notes) {
    poorConditions.push(['Paint', data.conditionReport.paint.notes]);
  }
  Object.entries(data.conditionReport.glass).forEach(([key, value]) => {
    if (value.rating === 'P' && value.notes) {
      poorConditions.push([key.charAt(0).toUpperCase() + key.slice(1), value.notes]);
    }
  });
  Object.entries(data.conditionReport.tiresAndWheels).forEach(([key, value]) => {
    if (value.rating === 'P' && value.notes) {
      poorConditions.push([key.charAt(0).toUpperCase() + key.slice(1), value.notes]);
    }
  });
  if (poorConditions.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Issues Noted', 20, yPosition);
    yPosition += 8;
    autoTable(doc, {
      startY: yPosition,
      head: [['Component', 'Notes']],
      body: poorConditions,
      theme: 'striped',
      headStyles: { fillColor: [220, 53, 69] },
      styles: { fontSize: 9 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }
  if (data.signature && yPosition < 250) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Signature', 20, yPosition);
    yPosition += 5;

    try {
      doc.addImage(data.signature, 'PNG', 20, yPosition, 60, 30);
    } catch (error) {
      console.error('Error adding signature:', error);
    }
  }
  const fileName = `WrapStation_Inspection_${data.formData.licensePlate}_${data.formData.inspectionDate}.pdf`;
  doc.save(fileName);
}