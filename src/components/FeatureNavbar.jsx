import React from 'react';
import { Mic, FileText, Headphones } from 'lucide-react';

export const FeatureNavbar = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'audio-to-audio',
      label: 'Audio to Audio Translate',
      icon: Headphones,
    },
    {
      id: 'text-to-audio',
      label: 'Text to Audio Translate',
      icon: FileText,
    },
    {
      id: 'audio-to-text',
      label: 'Audio to Text Translate',
      icon: Mic,
    },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
