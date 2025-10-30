'use client';

import { NavigationPage } from '@/types';
import {
  ClipboardDocumentListIcon,
  ClipboardIcon,
  ArrowDownTrayIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface DashboardPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const cards = [
    {
      title: 'Inspection Form',
      description: 'Fill in vehicle and customer information',
      icon: ClipboardDocumentListIcon,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      page: 'inspection' as NavigationPage,
    },
    {
      title: 'Condition Report',
      description: 'Assess vehicle condition across categories',
      icon: ClipboardIcon,
      color: 'bg-gray-900 hover:bg-black',
      page: 'condition' as NavigationPage,
    },
    {
      title: 'Generate Report',
      description: 'Review and export PDF report',
      icon: ArrowDownTrayIcon,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      page: 'export' as NavigationPage,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            WrapStation Form
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Build detailed, professional inspection reports with a modern workflow.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.page}
              onClick={() => onNavigate(card.page)}
              className="group bg-white/30 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-left border border-white/20 hover:border-yellow-400/50 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600">
                {card.title}
              </h3>
              <p className="text-gray-700">{card.description}</p>
              <div className="mt-4 flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform">
                Get Started →
              </div>
            </button>
          );
        })}
      </div>
      <div className="bg-white/30 backdrop-blur-sm border border-yellow-300/50 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
            <BoltIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Quick Start Guide</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, text: 'Fill out the inspection form with vehicle details' },
            { step: 2, text: 'Complete the condition report for all components' },
            { step: 3, text: 'Review and sign the terms & conditions' },
            { step: 4, text: 'Generate and download your PDF report' },
          ].map((item) => (
            <div key={item.step} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {item.step}
              </div>
              <p className="text-gray-800 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-yellow-600 mb-2">15+</div>
          <div className="text-gray-700">Inspection Categories</div>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
          <div className="text-gray-700">Professional Reports</div>
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-3xl font-bold text-yellow-600 mb-2">PDF</div>
          <div className="text-gray-700">Export Ready</div>
        </div>
      </div>
    </div>
  );
}