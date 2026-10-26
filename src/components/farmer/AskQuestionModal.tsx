import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCategory } from '../../types';
import { CROP_LIST, PROBLEM_CATEGORIES } from '../../data/seedData';
import {
  X,
  HelpCircle,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNavigateToExperts?: (crop: string) => void;
}

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
  onSuccessNavigateToExperts
}) => {
  const { farmer, submitQuestion, setFilterByCrop, setActiveView } = useApp();

  const [cropName, setCropName] = useState('Wheat');
  const [customCrop, setCustomCrop] = useState('');
  const [problemCategory, setProblemCategory] = useState<ProblemCategory>('Fungal / Bacterial Disease');
  const [description, setDescription] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Preset demo crop photo helpers for quick testing
  const samplePhotos = [
    { label: 'Leaf Rust (Wheat)', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600' },
    { label: 'Leaf Curl (Tomato)', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600' },
    { label: 'Bollworm (Cotton)', url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=600' }
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Photo size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const finalCrop = cropName === 'Other Crop' ? customCrop.trim() : cropName;

    if (!finalCrop) {
      setFormError('Please select or specify your crop.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setFormError('Please provide a descriptive explanation of the crop issue (min 10 characters).');
      return;
    }
    if (!symptoms.trim()) {
      setFormError('Please describe the symptoms observed on leaves, stems, or fruits.');
      return;
    }

    const created = submitQuestion({
      cropName: finalCrop,
      problemCategory,
      description: description.trim(),
      symptoms: symptoms.trim(),
      photoUrl: photoUrl || photoPreview || undefined
    });

    if (created) {
      onClose();
      // Prioritize relevant experts for this crop
      setFilterByCrop(finalCrop);
      if (onSuccessNavigateToExperts) {
        onSuccessNavigateToExperts(finalCrop);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <HelpCircle className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Ask an Agricultural Question</h3>
              <p className="text-xs text-emerald-100">
                Describe your crop problem for certified agricultural specialists
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Crop Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Crop Name <span className="text-rose-500">*</span>
            </label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {CROP_LIST.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>

            {cropName === 'Other Crop' && (
              <input
                type="text"
                placeholder="Specify your crop name (e.g. Mustard, Gram, Tea)..."
                value={customCrop}
                onChange={(e) => setCustomCrop(e.target.value)}
                className="mt-2 w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* Problem Category */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Problem Category <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PROBLEM_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setProblemCategory(cat)}
                  className={`text-xs px-2.5 py-2 rounded-xl border text-left font-medium transition-colors ${
                    problemCategory === cat
                      ? 'bg-emerald-800 text-white border-emerald-800 font-bold shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Description of the Problem <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explain how the problem started, crop growth stage, field area affected..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Symptoms Observed */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Symptoms Observed <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Yellowing leaf tips, brown spots, wilting at midday, insect holes..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Optional Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Optional Photo Upload</span>
              <span className="text-stone-400 font-normal lowercase">(helps experts diagnose accurately)</span>
            </label>

            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-emerald-50 p-2 flex items-center gap-3">
                <img
                  src={photoPreview}
                  alt="Crop preview"
                  className="w-16 h-16 object-cover rounded-lg border border-emerald-200 shrink-0"
                />
                <div className="text-xs text-emerald-900 flex-1">
                  <p className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Photo attached
                  </p>
                  <p className="text-stone-500">Ready to submit with question</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    setPhotoUrl('');
                  }}
                  className="p-1 rounded-lg text-stone-400 hover:text-rose-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-stone-50 hover:bg-emerald-50/40 transition-colors">
                  <Upload className="w-6 h-6 text-stone-400 mb-1" />
                  <span className="text-xs font-semibold text-stone-700">Click to upload crop photo</span>
                  <span className="text-[11px] text-stone-400">JPG, PNG up to 2MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                {/* Quick Sample Photo helper */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                  <span>Or use sample:</span>
                  {samplePhotos.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setPhotoUrl(item.url);
                        setPhotoPreview(item.url);
                      }}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-emerald-100 hover:text-emerald-800 text-stone-600 border border-stone-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Submit Question & Match Experts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-stone-400 mt-2">
              Saved in localStorage. Experts will be able to review and post advice.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
