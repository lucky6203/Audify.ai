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
    <div className="flex justify-center py-4">
      <div className="bg-white shadow-md border border-gray-100 rounded-full px-4 flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-200 font-medium text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
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
  );
};
