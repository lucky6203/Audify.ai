
import React, { useState } from 'react';
import { TopNavbar } from '../components/TopNavbar';
import { FeatureNavbar } from '../components/FeatureNavbar';
import { AudioToAudioTranslate } from '../components/AudioToAudioTranslate';
import { TextToAudioTranslate } from '../components/TextToAudioTranslate';
import { AudioToTextTranslate } from '../components/AudioToTextTranslate';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('audio-to-audio');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'audio-to-audio':
        return <AudioToAudioTranslate />;
      case 'text-to-audio':
        return <TextToAudioTranslate />;
      case 'audio-to-text':
        return <AudioToTextTranslate />;
      default:
        return <AudioToAudioTranslate />;
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopNavbar 
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowSignup(true)}
        />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <LoginForm 
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </div>
      </div>
    );
  }

  if (showSignup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TopNavbar 
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowSignup(true)}
        />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <SignupForm 
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <TopNavbar 
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <FeatureNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="container mx-auto px-4 py-8">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Index;
