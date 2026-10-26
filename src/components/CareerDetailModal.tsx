import React from 'react';
import { X, Briefcase, TrendingUp, CheckCircle, GraduationCap, DollarSign, Star, Heart } from 'lucide-react';
import { Career } from '../types/career';

interface CareerDetailModalProps {
  career: Career | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({ career, onClose }) => {
  if (!career) return null;

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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <span>{career.category}</span>
            <span aria-hidden="true">·</span>
            <span>RIASEC {career.riasecCode}</span>
            {career.matchScore && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  적합도 {career.matchScore}%
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            {career.name}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {career.summary}
          </p>
        </div>

        {/* Prospect & Market Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
              미래 성장 전망
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < career.prospect.growthRating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              ))}
              <span className="text-xs font-bold ml-1 text-slate-800 dark:text-slate-200">
                {career.prospect.growthRating >= 5 ? '최상위' : '우수'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
              평균 예상 연봉대
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
              {career.prospect.avgSalaryRange}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
              직업 만족도
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {career.prospect.satisfactionRate} (상위권)
            </span>
          </div>
        </div>

        {/* Prospect Insight Text */}
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 mb-6 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <strong className="block font-semibold mb-1">💡 직무 전망 인사이트</strong>
          {career.prospect.prospectText}
        </div>

        {/* Key Duties */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              주요 업무 및 일상적인 직무 활동
            </h3>
          </div>
          <ul className="space-y-2 text-xs">
            {career.duties.map((duty, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-slate-700 dark:text-slate-300"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{duty}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Skills & Related Majors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                필수 직무 스킬 및 역량
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {career.requiredSkills.map((sk, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-100 dark:border-indigo-900 font-medium"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-sky-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                진출에 유리한 대학 학과
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {career.relatedMajorNames.map((maj, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                >
                  {maj}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Personality Match */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              이 직업에 잘 맞는 성격 특성
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {career.personalityMatch.map((pm, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded-md border border-rose-100 dark:border-rose-900/50"
              >
                {pm}
              </span>
            ))}
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
