import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Loader, Copy, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const AudioToTextTranslate = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [searchTermSource, setSearchTermSource] = useState('');

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

  const filteredSourceLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(searchTermSource.toLowerCase())
  );

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTranscript('');
    }
  };

 const handleTranscribe = async () => {
  if (!file || !sourceLanguage) return;
  setIsProcessing(true);
  setTranscript('');

  const formData = new FormData();
  formData.append('file', file);
  formData.append("target_lang", sourceLanguage); // Match backend

  try {
    const res = await axios.post('http://localhost:8000/audio-to-text/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // ✅ Show translated output (not "transcription" key)
    setTranscript(res.data.translated_text || 'No translation returned.');

  } catch (error) {
    console.error('Transcription failed:', error);
    setTranscript('❌ Error: Could not transcribe or translate audio.');
  } finally {
    setIsProcessing(false);
  }
};


  const handleCopy = async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Audio to Text Translator
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Upload your audio file and get an accurate text transcription
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
              id="audio-upload-text"
            />
            <label
              htmlFor="audio-upload-text"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <Upload className="h-12 w-12 text-gray-400" />
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
              Select Audio Language (for reference)
            </label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-400 rounded-lg">
                <SelectValue placeholder="Choose audio language" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                avoidCollisions={false}
                className={cn(
                  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-black shadow-md'
                )}
              >
                <div className="px-2 py-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTermSource}
                      onChange={(e) => setSearchTermSource(e.target.value)}
                      placeholder="Search language..."
                      className="w-full px-3 py-2 pr-8 text-sm border rounded-md focus:outline-none"
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                {filteredSourceLanguages.length ? (
                  filteredSourceLanguages.map((lang) => (
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

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Loader className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Transcribing your audio...</span>
            </div>
          )}

          {/* Transcribe Button */}
          <Button
            onClick={handleTranscribe}
            disabled={!file || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isProcessing ? 'Transcribing...' : 'Transcribe Audio'}
          </Button>

          {/* Output Text */}
          {transcript && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Transcription Result</label>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={transcript}
                readOnly
                className="min-h-32 resize-none border-2 border-gray-200 bg-gray-50 rounded-lg p-4"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};