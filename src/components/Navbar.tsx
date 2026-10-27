import { Moon, Sun, Compass, Download } from 'lucide-react';

export type ActiveTab = 'home' | 'diagnostic' | 'majors' | 'careers' | 'history' | 'guide';

interface NavbarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onStartDiagnostic: () => void;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  onStartDiagnostic,
  onOpenDownloadModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 inline-block" />
          <span>꿈끼나비</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('home')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600' : ''
            }`}
          >
            홈
          </button>

          <button
            onClick={() => onSelectTab('majors')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentTab === 'majors' ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600' : ''
            }`}
          >
            학과 도감
          </button>

          <button
            onClick={() => onSelectTab('careers')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentTab === 'careers' ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600' : ''
            }`}
          >
            직업 도감
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentTab === 'history' ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600' : ''
            }`}
          >
            진단 기록
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentTab === 'guide' ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600' : ''
            }`}
          >
            활용 가이드
          </button>
        </nav>

        {/* Zone 3: 1 primary action (+ subtle theme toggle + download) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenDownloadModal}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="단일 배포용 index.html 파일 다운로드"
            aria-label="index.html 다운로드"
          >
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">index.html 다운로드</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            aria-label="테마 전환"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onStartDiagnostic}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>진단 시작하기</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 dark:border-slate-800/80 px-2 py-2 overflow-x-auto text-[11px] font-medium text-slate-600 dark:text-slate-400">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
        >
          홈
        </button>
        <button
          onClick={() => onSelectTab('majors')}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'majors' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
        >
          학과도감
        </button>
        <button
          onClick={() => onSelectTab('careers')}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'careers' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
        >
          직업도감
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'history' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
        >
          진단기록
        </button>
        <button
          onClick={() => onSelectTab('guide')}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'guide' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
        >
          가이드
        </button>
      </div>
    </header>
  );
};
