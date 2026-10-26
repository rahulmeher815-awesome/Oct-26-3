import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertProfile, ProblemCategory } from '../../types';
import {
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldAlert,
  X,
  Sprout
} from 'lucide-react';
import { CROP_LIST, PROBLEM_CATEGORIES } from '../../data/seedData';

interface ExpertDirectoryProps {
  onOpenFarmerAuth: () => void;
}

export const ExpertDirectory: React.FC<ExpertDirectoryProps> = ({ onOpenFarmerAuth }) => {
  const {
    experts,
    role,
    setSelectedExpertForView,
    setSelectedExpertForBooking,
    filterByCrop,
    setFilterByCrop
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>(filterByCrop || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'fee-low' | 'fee-high' | 'experience'>('recommended');

  // Update selectedCrop if filterByCrop changes externally
  React.useEffect(() => {
    if (filterByCrop) {
      setSelectedCrop(filterByCrop);
    }
  }, [filterByCrop]);

  // Map problem category to keyword in specialization
  const getCategoryKeywords = (category: string): string[] => {
    switch (category) {
      case 'Pest Attack':
        return ['entomology', 'pest', 'ipm', 'insect', 'bollworm'];
      case 'Fungal / Bacterial Disease':
        return ['pathology', 'disease', 'fungal', 'rust', 'blight'];
      case 'Nutrient Deficiency':
      case 'Soil & Irrigation':
        return ['soil', 'fertigation', 'irrigation', 'chemistry', 'nutrition'];
      case 'Weed Management':
      case 'Yield Optimization':
        return ['agronomy', 'horticulture', 'yield', 'cereal', 'precision'];
      default:
        return [];
    }
  };

  // Filter and prioritize
  const filteredExperts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const catKeywords = selectedCategory ? getCategoryKeywords(selectedCategory) : [];

    return experts
      .map((exp) => {
        let matchScore = 0;
        let isDirectCropMatch = false;
        let isDirectCategoryMatch = false;

        // Search text matching
        const matchesQuery =
          !q ||
          exp.fullName.toLowerCase().includes(q) ||
          exp.specialization.toLowerCase().includes(q) ||
          exp.qualification.toLowerCase().includes(q) ||
          exp.crops.some((c) => c.toLowerCase().includes(q));

        if (!matchesQuery) return null;

        // Crop matching
        if (selectedCrop) {
          if (exp.crops.some((c) => c.toLowerCase().includes(selectedCrop.toLowerCase()))) {
            matchScore += 10;
            isDirectCropMatch = true;
          }
        }

        // Category matching
        if (selectedCategory && catKeywords.length > 0) {
          const spec = (exp.specialization + ' ' + exp.bio).toLowerCase();
          const hasKeyword = catKeywords.some((kw) => spec.includes(kw));
          if (hasKeyword) {
            matchScore += 8;
            isDirectCategoryMatch = true;
          }
        }

        return {
          expert: exp,
          matchScore,
          isDirectCropMatch,
          isDirectCategoryMatch
        };
      })
      .filter((item): item is { expert: ExpertProfile; matchScore: number; isDirectCropMatch: boolean; isDirectCategoryMatch: boolean } => item !== null)
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          // highest score first, then experience
          if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
          return b.expert.experienceYears - a.expert.experienceYears;
        } else if (sortBy === 'fee-low') {
          return a.expert.consultationFee - b.expert.consultationFee;
        } else if (sortBy === 'fee-high') {
          return b.expert.consultationFee - a.expert.consultationFee;
        } else if (sortBy === 'experience') {
          return b.expert.experienceYears - a.expert.experienceYears;
        }
        return 0;
      });
  }, [experts, searchQuery, selectedCrop, selectedCategory, sortBy]);

  const handleBook = (expert: ExpertProfile) => {
    if (role !== 'farmer') {
      onOpenFarmerAuth();
      return;
    }
    setSelectedExpertForBooking(expert);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCrop('');
    setSelectedCategory('');
    setFilterByCrop(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Demonstration Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Demonstration Profiles Only
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 mt-2 tracking-tight">
              Agricultural Experts Directory
            </h1>
          </div>
          <div className="text-sm text-stone-500 font-medium">
            Showing <strong className="text-stone-900">{filteredExperts.length}</strong> of {experts.length} Demonstration Specialists
          </div>
        </div>
        <p className="text-sm text-stone-600 max-w-3xl">
          Browse and connect with university researchers, certified plant pathologists, and crop doctors. Filter by your crop or agricultural problem to find prioritized specialist advice.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by name, specialization, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter by Crop */}
          <div className="md:col-span-3">
            <select
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                setFilterByCrop(e.target.value || undefined);
              }}
              className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-stone-700"
            >
              <option value="">All Crops</option>
              {CROP_LIST.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Problem Category */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-stone-700"
            >
              <option value="">All Problems</option>
              {PROBLEM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-stone-700 font-medium"
            >
              <option value="recommended">Best Match</option>
              <option value="experience">Most Experience</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedCrop || selectedCategory || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500 font-medium">Active Filters:</span>
            {selectedCrop && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-semibold">
                Crop: {selectedCrop}
                <button onClick={() => { setSelectedCrop(''); setFilterByCrop(undefined); }}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold">
                Problem: {selectedCategory}
                <button onClick={() => setSelectedCategory('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200 text-stone-800 font-semibold">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-stone-500 hover:text-stone-800 underline ml-2 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Experts Grid */}
      {filteredExperts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-800">No agricultural experts matched your filters</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Try choosing "All Crops" or searching with broader keywords to view the demonstration specialists.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map(({ expert, matchScore, isDirectCropMatch, isDirectCategoryMatch }) => {
            const isPrioritized = matchScore > 0;

            return (
              <div
                key={expert.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 ${
                  isPrioritized
                    ? 'border-emerald-400 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                      Demonstration Expert
                    </span>
                    {isPrioritized && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {isDirectCropMatch ? `${selectedCrop} Specialist` : 'Top Match'}
                      </span>
                    )}
                  </div>

                  {/* Expert Avatar & Name */}
                  <div className="flex items-start gap-4">
                    <img
                      src={expert.avatarUrl}
                      alt={expert.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-stone-900 leading-snug truncate">
                        {expert.fullName}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700 line-clamp-1">
                        {expert.specialization}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                        <span>{expert.experienceYears} Years Exp.</span>
                        <span>•</span>
                        <span className="flex items-center text-amber-600 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {expert.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">{expert.qualification}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {expert.bio}
                  </p>

                  {/* Supported Crops */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                      Crops Supported:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {expert.crops.map((crop) => {
                        const isCropMatch = selectedCrop && crop.toLowerCase().includes(selectedCrop.toLowerCase());
                        return (
                          <span
                            key={crop}
                            className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                              isCropMatch
                                ? 'bg-emerald-700 text-white font-bold'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {crop}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Consultation Fee
                    </span>
                    <span className="text-lg font-extrabold text-stone-900">
                      ₹{expert.consultationFee}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedExpertForView(expert)}
                      className="px-3 py-2 text-xs font-semibold rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBook(expert)}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-sm shadow-emerald-700/20 active:scale-95 flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
