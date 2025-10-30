'use client';

import { useState } from 'react';
import { NavigationPage } from '@/types';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { InspectionFormPage } from '@/features/inspection/InspectionFormPage';
import { ConditionReportPage } from '@/features/condition/ConditionReportPage';
import { ExportPage } from '@/features/export/ExportPage';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'inspection':
        return <InspectionFormPage />;
      case 'condition':
        return <ConditionReportPage />;
      case 'export':
        return <ExportPage />;
      default:
        return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
}