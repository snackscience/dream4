import React from 'react';
import { History, Trash2, ArrowRight, Compass, Calendar, User } from 'lucide-react';
import { DiagnosticResult } from '../types/career';

interface HistoryViewProps {
  history: DiagnosticResult[];
  onSelect: (result: DiagnosticResult) => void;
  onDelete: (id: string) => void;
  onNewDiagnostic: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelect,
  onDelete,
  onNewDiagnostic,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <History className="w-4 h-4" />
            <span>기기 내 저장된 기록</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            나의 진로 진단 히스토리
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            이전에 진행했던 진단 결과를 다시 불러와 비교하거나 학교 상담 자료로 활용할 수 있습니다.
          </p>
        </div>

        <button
          onClick={onNewDiagnostic}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Compass className="w-4 h-4" />
          새로운 진단 시작
        </button>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <Compass className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            아직 저장된 진단 결과가 없습니다
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            나의 흥미와 성향을 3분 동안 체크하고 맞춤형 대학 학과 및 유망 직업을 진단해보세요.
          </p>
          <button
            onClick={onNewDiagnostic}
            className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            지금 진단 시작하기
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.createdAt}</span>
                  <span aria-hidden="true">·</span>
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {item.profile.name} ({item.profile.gradeLevel})
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {item.archetype.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  추천 1순위: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.matchedMajors[0]?.name}</span> /{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.matchedCareers[0]?.name}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                  title="기록 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  결과 보기
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
