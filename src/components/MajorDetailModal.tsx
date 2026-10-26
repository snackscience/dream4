import React from 'react';
import { X, BookOpen, GraduationCap, CheckCircle2, TrendingUp, Compass, Award } from 'lucide-react';
import { Major } from '../types/career';

interface MajorDetailModalProps {
  major: Major | null;
  onClose: () => void;
}

export const MajorDetailModal: React.FC<MajorDetailModalProps> = ({ major, onClose }) => {
  if (!major) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <span>{major.category}</span>
            <span aria-hidden="true">·</span>
            <span>RIASEC {major.riasecPrimary}</span>
            {major.matchScore && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  적합도 {major.matchScore}%
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            {major.name}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {major.summary}
          </p>
        </div>

        {/* Detailed Description */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {major.description}
        </div>

        {/* High School Recommended Subjects (2022/2015 Revised Curriculum) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              고교 추천 선택과목 가이드 (교육과정 연계)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-1.5">
                일반선택 권장 과목
              </span>
              <div className="flex flex-wrap gap-1.5">
                {major.recommendedSubjects.general.map((subj, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 rounded-md border border-indigo-200 dark:border-indigo-800 font-medium"
                  >
                    {subj}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-1.5">
                진로선택 권장 과목
              </span>
              <div className="flex flex-wrap gap-1.5">
                {major.recommendedSubjects.career.map((subj, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800 font-medium"
                  >
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              대학 및 전공에서 요구하는 핵심 역량
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {major.coreCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Typical University Curriculum */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              주요 대학 개설 교과목 (커리큘럼)
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {major.typicalCurriculum.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Career Tracks & Employment */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              주요 진출 진로 및 유관 취업 분야
            </h3>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-semibold">대표 진로: </strong>
              {major.careerTracks.join(' · ')}
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-100 font-semibold">주요 활동 분야: </strong>
              {major.employmentFields.join(' · ')}
            </p>
          </div>
        </div>

        {/* Bottom Close Action */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
