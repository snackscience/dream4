import React, { useState } from 'react';
import { Search, GraduationCap, ChevronRight, BookOpen, Star } from 'lucide-react';
import { MAJORS_DATABASE } from '../data/careerDatabase';
import { Major, MajorCategory } from '../types/career';
import { MajorDetailModal } from './MajorDetailModal';

const CATEGORIES: Array<'전체' | MajorCategory> = [
  '전체',
  '공학계열',
  '인문사회계열',
  '자연과학계열',
  '의약보건계열',
  '사범교육계열',
  '예체능계열',
  '융합신산업',
];

export const ExploreMajorsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'전체' | MajorCategory>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMajor, setActiveMajor] = useState<Major | null>(null);

  const filteredMajors = MAJORS_DATABASE.filter((m) => {
    const matchesCategory =
      selectedCategory === '전체' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>대학 전공 백과사전</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          대한민국 주요 대학 학과 도감
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          각 학과별 교육 목표, 주요 커리큘럼, 고교 권장 선택과목 및 졸업 후 진로 경로를 탐색해보세요.
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
                  ? 'bg-indigo-600 text-white shadow-xs'
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
            placeholder="학과명 또는 키워드 검색..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Majors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMajors.map((major) => (
          <div
            key={major.id}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <span>{major.category}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  RIASEC {major.riasecPrimary}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                {major.name}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {major.summary}
              </p>

              {/* High School Subjects Snippet */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-4 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  고교 추천 과목:
                </span>
                <div className="flex flex-wrap gap-1">
                  {major.recommendedSubjects.general.slice(0, 3).map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[11px] text-slate-600 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                핵심역량 {major.coreCompetencies.length}개
              </span>
              <button
                type="button"
                onClick={() => setActiveMajor(major)}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
              >
                상세정보 보기
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMajors.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-xs">
          검색 조건에 맞는 학과가 없습니다. 다른 검색어를 입력해보세요.
        </div>
      )}

      {/* Modal */}
      <MajorDetailModal major={activeMajor} onClose={() => setActiveMajor(null)} />
    </div>
  );
};
