'use client';

import { ReactNode } from 'react';
import { NavigationPage } from '@/types';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: ReactNode;
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const navigationItems = [
    { id: 'dashboard' as NavigationPage, label: 'Dashboard', icon: HomeIcon },
    { id: 'inspection' as NavigationPage, label: 'Inspection Form', icon: ClipboardDocumentListIcon },
    { id: 'condition' as NavigationPage, label: 'Condition Report', icon: DocumentTextIcon },
    { id: 'export' as NavigationPage, label: 'Generate Report', icon: CheckCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-black to-yellow-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <WrenchScrewdriverIcon className="h-9 w-9 text-yellow-300" />
            <h1 className="text-2xl font-extrabold tracking-tight">WrapStation Inspection</h1>
          </div>
        </div>
      </header>
      <nav className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 py-3 overflow-x-auto whitespace-nowrap"> 
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm sm:text-base ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-yellow-300' : 'text-black'}`} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      <main className="relative">
        <div
        className="bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat p-8 shadow-lg"
            >
              {children}\
              <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-white-500 text-md">
                    © 2025 Wrap Station Group. All rights reserved.
              </footer>
            </div>
      </main>
    </div>
  );
}
