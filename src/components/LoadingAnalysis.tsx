import React, { useEffect, useState } from 'react';

interface LoadingAnalysisProps {
  onFinished: () => void;
}

const STEPS = [
  '학생의 관심 키워드와 흥미 데이터베이스 대조 중...',
  '홀랜드(RIASEC) 6대 직업적성 육각 프로파일 연산 중...',
  '전국 대학 주요 학과 및 2022/2015 개정 고교 과목 매칭 중...',
  '최적의 유망 직업군 및 맞춤형 진로 나침반 완성 단계...',
];

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ onFinished }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 400);
          return 100;
        }
        return prev + 22;
      });
    }, 450);

    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 550);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [onFinished]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 text-center animate-in fade-in duration-300">
      {/* Animated Butterfly Icon & Wings */}
      <div className="relative mb-8 w-28 h-28 flex items-center justify-center">
        {/* Soft pulsing glow aura */}
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />

        {/* Flying Butterfly SVG with fluttering wing keyframes */}
        <div className="relative z-10 transition-transform duration-500 hover:scale-105">
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-indigo-600 dark:text-indigo-400 drop-shadow-md"
            fill="currentColor"
          >
            {/* Left Wing with subtle flutter scale animation */}
            <g className="origin-center animate-[spin_4s_ease-in-out_infinite] [transform-box:fill-box]">
              <path
                d="M 50 50 C 35 15, 10 25, 20 60 C 25 75, 45 65, 50 50 Z"
                className="fill-indigo-500/80"
              />
              <path
                d="M 50 55 C 38 65, 25 80, 35 90 C 45 95, 48 70, 50 55 Z"
                className="fill-sky-400/80"
              />
            </g>

            {/* Right Wing with subtle flutter scale animation */}
            <g className="origin-center animate-[spin_4s_ease-in-out_infinite_reverse] [transform-box:fill-box]">
              <path
                d="M 50 50 C 65 15, 90 25, 80 60 C 75 75, 55 65, 50 50 Z"
                className="fill-indigo-600"
              />
              <path
                d="M 50 55 C 62 65, 75 80, 65 90 C 55 95, 52 70, 50 55 Z"
                className="fill-sky-500"
              />
            </g>

            {/* Center Butterfly Body */}
            <ellipse cx="50" cy="54" rx="3.5" ry="18" className="fill-slate-900 dark:fill-white" />
            <circle cx="50" cy="34" r="4.5" className="fill-slate-900 dark:fill-white" />
            {/* Antennae */}
            <path
              d="M 48 31 Q 40 20 38 18 M 52 31 Q 60 20 62 18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="text-slate-900 dark:text-white"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
        꿈끼나비가 맞춤형 진로를 탐색하고 있습니다
      </h2>

      {/* Dynamic current step ticker */}
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 h-6 mb-6 transition-all duration-300">
        {STEPS[stepIndex]}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3 border border-slate-200 dark:border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500 tabular-nums">
        {Math.min(100, progress)}%
      </span>
    </div>
  );
};
