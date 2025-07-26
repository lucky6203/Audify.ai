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
  { value: 'zh', label: 'Chinese' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
  { value: 'ru', label: 'Russian' },
  { value: 'ko', label: 'Korean' },
  { value: 'fr', label: 'French' },
  { value: 'ja', label: 'Japanese' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'tr', label: 'Turkish' },
  { value: 'pl', label: 'Polish' },
  { value: 'ca', label: 'Catalan' },
  { value: 'nl', label: 'Dutch' },
  { value: 'ar', label: 'Arabic' },
  { value: 'sv', label: 'Swedish' },
  { value: 'it', label: 'Italian' },
  { value: 'id', label: 'Indonesian' },
  { value: 'hi', label: 'Hindi' },
  { value: 'fi', label: 'Finnish' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'he', label: 'Hebrew' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'el', label: 'Greek' },
  { value: 'ms', label: 'Malay' },
  { value: 'cs', label: 'Czech' },
  { value: 'ro', label: 'Romanian' },
  { value: 'da', label: 'Danish' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'ta', label: 'Tamil' },
  { value: 'no', label: 'Norwegian' },
  { value: 'th', label: 'Thai' },
  { value: 'ur', label: 'Urdu' },
  { value: 'hr', label: 'Croatian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'la', label: 'Latin' },
  { value: 'mi', label: 'Maori' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'cy', label: 'Welsh' },
  { value: 'sk', label: 'Slovak' },
  { value: 'te', label: 'Telugu' },
  { value: 'fa', label: 'Persian' },
  { value: 'lv', label: 'Latvian' },
  { value: 'bn', label: 'Bengali' },
  { value: 'sr', label: 'Serbian' },
  { value: 'az', label: 'Azerbaijani' },
  { value: 'sl', label: 'Slovenian' },
  { value: 'kn', label: 'Kannada' },
  { value: 'et', label: 'Estonian' },
  { value: 'mk', label: 'Macedonian' },
  { value: 'br', label: 'Breton' },
  { value: 'eu', label: 'Basque' },
  { value: 'is', label: 'Icelandic' },
  { value: 'hy', label: 'Armenian' },
  { value: 'ne', label: 'Nepali' },
  { value: 'mn', label: 'Mongolian' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'kk', label: 'Kazakh' },
  { value: 'sq', label: 'Albanian' },
  { value: 'sw', label: 'Swahili' },
  { value: 'gl', label: 'Galician' },
  { value: 'mr', label: 'Marathi' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'si', label: 'Sinhala' },
  { value: 'km', label: 'Khmer' },
  { value: 'sn', label: 'Shona' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'so', label: 'Somali' },
  { value: 'af', label: 'Afrikaans' },
  { value: 'oc', label: 'Occitan' },
  { value: 'ka', label: 'Georgian' },
  { value: 'be', label: 'Belarusian' },
  { value: 'tg', label: 'Tajik' },
  { value: 'sd', label: 'Sindhi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'am', label: 'Amharic' },
  { value: 'yi', label: 'Yiddish' },
  { value: 'lo', label: 'Lao' },
  { value: 'uz', label: 'Uzbek' },
  { value: 'fo', label: 'Faroese' },
  { value: 'ht', label: 'Haitian Creole' },
  { value: 'ps', label: 'Pashto' },
  { value: 'tk', label: 'Turkmen' },
  { value: 'nn', label: 'Nynorsk' },
  { value: 'mt', label: 'Maltese' },
  { value: 'sa', label: 'Sanskrit' },
  { value: 'my', label: 'Burmese' },
  { value: 'bo', label: 'Tibetan' },
  { value: 'tl', label: 'Tagalog' },
  { value: 'mg', label: 'Malagasy' },
  { value: 'as', label: 'Assamese' },
  { value: 'tt', label: 'Tatar' },
  { value: 'haw', label: 'Hawaiian' },
  { value: 'ln', label: 'Lingala' },
  { value: 'ha', label: 'Hausa' },
  { value: 'ba', label: 'Bashkir' },
  { value: 'jw', label: 'Javanese' },
  { value: 'su', label: 'Sundanese' },
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
              className="min-h-32 resize-none border-2 border-gray-200 focus:border-blue-400 rounded-lg p-4 text-black"
            />
          </div>

          {/* Language Selection with Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Language/Voice</label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-purple-600 rounded-lg bg-[#9333ea] text-white">
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
