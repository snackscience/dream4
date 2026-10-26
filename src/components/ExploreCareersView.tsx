import React, { useState } from 'react';
import { Search, Briefcase, ChevronRight, Star } from 'lucide-react';
import { CAREERS_DATABASE } from '../data/careerDatabase';
import { Career } from '../types/career';
import { CareerDetailModal } from './CareerDetailModal';

const CATEGORIES = [
  '전체',
  'IT · 미래기술',
  '디자인 · 기획',
  '기계 · 로봇',
  '바이오 · 의료',
  '경영 · 마케팅',
  '의료 · 심리',
  '교육 · 미디어',
  '환경 · 에너지',
];

export const ExploreCareersView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCareer, setActiveCareer] = useState<Career | null>(null);

  const filteredCareers = CAREERS_DATABASE.filter((c) => {
    const matchesCategory =
      selectedCategory === '전체' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.duties.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
          <Briefcase className="w-4 h-4" />
          <span>미래 직업 백과사전</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          미래 유망 직업 도감
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          빠르게 진화하는 미래 산업 생태계에서 주목받는 직무와 요구 역량, 예상 연봉을 확인해보세요.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="직업명, 주요 업무 또는 스킬 검색..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span>{career.category}</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  RIASEC {career.riasecCode}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                {career.name}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {career.summary}
              </p>

              {/* Salary & Satisfaction */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-4 text-xs space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>평균 예상 연봉:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {career.prospect.avgSalaryRange}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>직업 만족도:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {career.prospect.satisfactionRate}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                연관 학과 {career.relatedMajorNames.length}개
              </span>
              <button
                type="button"
                onClick={() => setActiveCareer(career)}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1"
              >
                직무정보 보기
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-xs">
          검색 조건에 맞는 직업이 없습니다. 다른 검색어를 입력해보세요.
        </div>
      )}

      {/* Modal */}
      <CareerDetailModal career={activeCareer} onClose={() => setActiveCareer(null)} />
    </div>
  );
};
