/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ActiveTab, Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ExploreMajorsView } from './components/ExploreMajorsView';
import { ExploreCareersView } from './components/ExploreCareersView';
import { HistoryView } from './components/HistoryView';
import { GuideView } from './components/GuideView';
import { DownloadModal } from './components/DownloadModal';
import { matchProfile } from './utils/matchingEngine';
import {
  deleteDiagnosticResult,
  getDiagnosticHistory,
  getThemePreference,
  setThemePreference,
} from './utils/storage';
import { DiagnosticResult, StudentProfile } from './types/career';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [history, setHistory] = useState<DiagnosticResult[]>([]);
  const [currentResult, setCurrentResult] = useState<DiagnosticResult | null>(null);
  const [pendingProfile, setPendingProfile] = useState<StudentProfile | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);

  // Initialize theme and history on mount
  useEffect(() => {
    const prefersDark = getThemePreference();
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setHistory(getDiagnosticHistory());
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    setThemePreference(nextDark);
  };

  const refreshHistory = () => {
    setHistory(getDiagnosticHistory());
  };

  const handleStartDiagnostic = () => {
    setCurrentTab('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiagnosticComplete = (profile: StudentProfile) => {
    setPendingProfile(profile);
    setCurrentTab('diagnostic'); // will show loading view below
  };

  const handleLoadingFinished = () => {
    if (pendingProfile) {
      const result = matchProfile(pendingProfile);
      setCurrentResult(result);
      setPendingProfile(null);
      setCurrentTab('diagnostic');
      refreshHistory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectHistoryItem = (item: DiagnosticResult) => {
    setCurrentResult(item);
    setCurrentTab('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteDiagnosticResult(id);
    setHistory(updated);
    if (currentResult?.id === id) {
      setCurrentResult(null);
    }
  };

  const handleRestart = () => {
    setCurrentResult(null);
    setPendingProfile(null);
    setCurrentTab('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Bar Contract (3 Zones) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onStartDiagnostic={handleStartDiagnostic}
        onOpenDownloadModal={() => setShowDownloadModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-4 sm:py-6">
        {currentTab === 'home' && (
          <HomeHero
            onStartDiagnostic={handleStartDiagnostic}
            recentHistory={history}
            onSelectHistory={handleSelectHistoryItem}
            onExploreMajors={() => setCurrentTab('majors')}
            onExploreCareers={() => setCurrentTab('careers')}
          />
        )}

        {currentTab === 'diagnostic' && (
          <>
            {pendingProfile ? (
              <LoadingAnalysis onFinished={handleLoadingFinished} />
            ) : currentResult ? (
              <ResultsDashboard
                result={currentResult}
                onRestart={handleRestart}
                onViewHistory={() => setCurrentTab('history')}
              />
            ) : (
              <DiagnosticWizard
                onComplete={handleDiagnosticComplete}
                onCancel={() => setCurrentTab('home')}
              />
            )}
          </>
        )}

        {currentTab === 'majors' && <ExploreMajorsView />}

        {currentTab === 'careers' && <ExploreCareersView />}

        {currentTab === 'history' && (
          <HistoryView
            history={history}
            onSelect={handleSelectHistoryItem}
            onDelete={handleDeleteHistoryItem}
            onNewDiagnostic={handleRestart}
          />
        )}

        {currentTab === 'guide' && <GuideView />}
      </main>

      {/* Clean quiet footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8 no-print transition-colors">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-200">꿈끼나비</span>
            <span>·</span>
            <span>나만의 진로·학과 매칭 내비게이터</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors"
            >
              📥 index.html 파일 다운로드
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('guide')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              이용 안내 & 가이드
            </button>
            <span>·</span>
            <span>2022/2015 개정 교육과정 기준</span>
          </div>
        </div>
      </footer>

      {/* Standalone index.html Download Modal */}
      {showDownloadModal && (
        <DownloadModal onClose={() => setShowDownloadModal(false)} />
      )}
    </div>
  );
}
