import React, { useState } from 'react';
import axios from 'axios';
import { Download, Loader, Volume2, Search } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TextToAudioTranslate = () => {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
    { value: 'bho', label: 'Bhojpuri' },
    { value: 'bn', label: 'Bengali' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'kn', label: 'Kannada' },
    { value: 'mr', label: 'Marathi' },
  ];

  const filteredLanguages = languages.filter(lang =>
    lang.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerate = async () => {
    if (!text.trim() || !selectedLanguage) return;

    setIsProcessing(true);
    setAudioUrl(null);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('target_lang', selectedLanguage);

    try {
      const response = await axios.post('http://localhost:8000/text-to-speech/', formData, {
        responseType: 'blob',
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (err) {
      console.error('Audio generation failed:', err);
      alert('Failed to generate audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'text-to-speech.mp3';
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Text to Audio Translator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Enter your text and convert it to speech in your desired language
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Enter your text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-32 resize-none border-2 border-gray-200 focus:border-blue-400 rounded-lg p-4"
            />
          </div>

          {/* Language Selection with Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Language/Voice</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-400 rounded-lg">
                <SelectValue placeholder="Choose a language" />
              </SelectTrigger>
              <SelectContent side="bottom" className="bg-white" avoidCollisions={false}>
                {/* Search Input */}
                <div className="px-2 py-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search language..."
                      className="w-full px-3 py-2 pr-8 text-sm border rounded-md focus:outline-none"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Language Options */}
                {filteredLanguages.length ? (
                  filteredLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No languages found</div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Processing Spinner */}
          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Loader className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Generating audio...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleGenerate}
              disabled={!text.trim() || !selectedLanguage || isProcessing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              {isProcessing ? 'Generating...' : 'Generate Audio'}
            </Button>

            <Button
              onClick={handleDownload}
              disabled={!audioUrl}
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </Button>
          </div>

          {/* Audio Preview */}
          {audioUrl && (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
