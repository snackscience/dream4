import React from 'react';
import { X, Download, FileCode, CheckCircle2, Globe, Laptop, ArrowRight } from 'lucide-react';

interface DownloadModalProps {
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ onClose }) => {
  const handleDownload = () => {
    // Trigger download via anchor
    const link = document.createElement('a');
    link.href = '/api/download/index.html';
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
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

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              단일 배포용 index.html 다운로드
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              HTML, CSS, JS가 모두 하나로 합쳐진 무설치 단일 파일
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6 text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span>
              <strong>무설치 오프라인 구동:</strong> 다운로드한 <code>index.html</code> 파일을 컴퓨터에서 더블 클릭하기만 하면 인터넷 연결 없이도 즉시 실행됩니다.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span>
              <strong>GitHub Pages 즉시 배포:</strong> 깃허브 저장소(Repository)에 이 파일 하나만 업로드하면 무료 웹사이트로 전 세계 어디서든 접속 가능합니다.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <span>
              <strong>전체 기능 포함:</strong> 50여 개 학과 DB, 60여 개 직업 DB, 홀랜드 RIASEC 적성 매칭 엔진, 결과 저장 및 인쇄 기능이 전부 내장되어 있습니다.
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownload}
            className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>index.html 파일 다운로드 (~490KB)</span>
          </button>
        </div>

        {/* Quick Guide */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            💡 활용 방법:
          </span>
          <p>
            1. 다운로드 받은 <code>index.html</code>을 크롬이나 엣지 브라우저로 열기<br />
            2. 또는 학교 홈페이지, 수업용 클라우드 드라이브, 깃허브에 업로드하여 활용
          </p>
        </div>
      </div>
    </div>
  );
};
