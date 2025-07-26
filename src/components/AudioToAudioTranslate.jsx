import { useState } from 'react';
import axios from 'axios';
import { Download, Loader, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const AudioToAudioTranslate = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasTranslated, setHasTranslated] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('');
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

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setHasTranslated(false);
      setAudioUrl(null);
    }
  };
  

  const handleTranslate = async () => {
    if (!file || !targetLanguage) return;

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_lang', targetLanguage);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
const res = await axios.post(
  'http://localhost:8000/Audio-to-Audio/',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob', // if you expect an audio file back
  }
);


      clearInterval(interval);
      setProgress(100);
      setIsProcessing(false);
      setHasTranslated(true);

      const blob = new Blob([res.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      alert('Translation failed: ' + (err.response?.data?.message || err.message));
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'translated-audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Audio to Audio Translator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Upload your audio file and get it translated to another language
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <img
                src="/icon/1bdda466-b710-496a-8092-d8dab75dd980.png"
                alt="Upload Icon"
                className="w-[100px] h-[100px] object-contain bg-transparent"
              />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {file ? file.name : 'Upload Your Audio'}
                </p>
                <p className="text-sm text-gray-500">Supports MP3, WAV, M4A files</p>
              </div>
            </label>
          </div>

          {/* Language Selection with Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Target Language
            </label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-purple-600 rounded-lg bg-[#9333ea] text-white">
                <SelectValue placeholder="Select Target Language" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                avoidCollisions={false}
                className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-black shadow-md"
              >
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

          {/* Loader */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Loader className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Translating your audio...</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleTranslate}
              disabled={!file || !targetLanguage || isProcessing}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isProcessing ? 'Translating...' : 'Translate Audio'}
            </Button>

            <Button
              onClick={handleDownload}
              disabled={!hasTranslated || !audioUrl}
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </Button>
          </div>

          {/* Audio Output */}
          {audioUrl && (
            <audio controls className="mt-4 w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
