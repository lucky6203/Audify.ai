import React, { useState } from 'react';
import { TopNavbar } from '../components/TopNavbar';
import { FeatureNavbar } from '../components/FeatureNavbar';
import { AudioToAudioTranslate } from '../components/AudioToAudioTranslate';
import { TextToAudioTranslate } from '../components/TextToAudioTranslate';
import { AudioToTextTranslate } from '../components/AudioToTextTranslate';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import Footer from '../components/Footer';
import Info from '../components/info'; // Importing the LanguageSupportInfo component


// ✅ Background Video Component
const BackgroundVideo = () => (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
  >
    <source src="/videos/istockphoto-1304421720-640_adpp_is.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState('audio-to-audio');
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null

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

  const renderAuthSection = () => (
    <div className="relative z-10 min-h-screen">
      <TopNavbar
        onLoginClick={() => setAuthMode('login')}
        onSignupClick={() => setAuthMode('signup')}
      />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        {authMode === 'login' && (
          <LoginForm
            onClose={() => setAuthMode(null)}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        )}
        {authMode === 'signup' && (
          <SignupForm
            onClose={() => setAuthMode(null)}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen text-white">
      {authMode ? (
        renderAuthSection()
      ) : (
        <div className="relative z-10">
          {/* ✅ Fixed Top Navbar */}
          <div className="fixed top-0 left-0 right-0 z-20">
            <TopNavbar
              onLoginClick={() => setAuthMode('login')}
              onSignupClick={() => setAuthMode('signup')}
            />
          </div>

          {/* Spacer for fixed navbar */}
          <div className="pt-[80px]">

            {/* ✅ Heading + Paragraph Section */}
            <div className="bg-white text-black text-center py-8 px-4 mt-[60px]">
              <h1 className="text-5xl font-bold text-black-600 mb-4 mt-[20px]" >
                Free Real Time Voice Translated<br/> AI Voice Platform
              </h1>
              <p className="text-lg text-[25px]  font-bold  mt-[60px]">
                Explore Audio to Audio , Text to speech, Audio to Text, and more
              </p>
            </div>

            <FeatureNavbar activeTab={activeTab} onTabChange={setActiveTab} />


            {/* ✅ Main Feature */}
            <div className="container mx-auto px-4 py-8 relative z-10">
                          <BackgroundVideo />
              {renderActiveSection()}
            </div>
            {/* ✅ Language Support Info */}
            <Footer />

          </div>
        </div>
      )}
    </div>
    
  );
};

export default Index;
