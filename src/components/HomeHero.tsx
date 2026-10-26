import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass, Award, History, GraduationCap, Briefcase } from 'lucide-react';
import { DiagnosticResult } from '../types/career';

interface HomeHeroProps {
  onStartDiagnostic: () => void;
  recentHistory: DiagnosticResult[];
  onSelectHistory: (item: DiagnosticResult) => void;
  onExploreMajors: () => void;
  onExploreCareers: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartDiagnostic,
  recentHistory,
  onSelectHistory,
  onExploreMajors,
  onExploreCareers,
}) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* 2-Column Split Hero with Generated Visual */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-3.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>나만의 진로·학과 매칭 내비게이터</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15] mb-5">
                나의 흥미와 성격으로 찾는 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500">
                  맞춤형 대학 학과 & 유망 직업
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
                막연했던 진로 고민을 명쾌하게 풀어냅니다. 좋아하는 활동과 타고난 성향을 입력하면,
                홀랜드(RIASEC) 적성 알고리즘을 기반으로 최적의 대학 전공과 고교 선택과목 로드맵을 한눈에 제시합니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStartDiagnostic}
                  className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2.5 active:scale-98"
                >
                  <Compass className="w-5 h-5" />
                  <span>진로 진단 시작하기 (3분 소요)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreMajors}
                  className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-2xl transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  <span>학과 도감 둘러보기</span>
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
                <span>✓ 별도 회원가입 없이 즉시 진단</span>
                <span aria-hidden="true">·</span>
                <span>✓ 2022/2015 개정 교육과정 반영</span>
                <span aria-hidden="true">·</span>
                <span>✓ 기기 내 안전 저장</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/images/hero_career_butterfly_1793044894092.jpg"
              alt="꿈끼나비 진로 내비게이터 안내 일러스트"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center lg:absolute inset-0"
              onError={(e) => {
                // Styled fallback container if image fails
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.classList.add('bg-gradient-to-br', 'from-indigo-600', 'to-sky-700');
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Proof & Scale Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <div className="text-center md:border-r border-slate-100 dark:border-slate-800 last:border-none p-2">
          <span className="block text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            50+
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            전국 주요 대학 표준 학과
          </span>
        </div>

        <div className="text-center md:border-r border-slate-100 dark:border-slate-800 last:border-none p-2">
          <span className="block text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            60+
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            미래 유망 직업군 DB
          </span>
        </div>

        <div className="text-center md:border-r border-slate-100 dark:border-slate-800 last:border-none p-2">
          <span className="block text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            6대
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            홀랜드(RIASEC) 적성 모델
          </span>
        </div>

        <div className="text-center p-2">
          <span className="block text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
            100%
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            고교 선택과목 가이드 연계
          </span>
        </div>
      </section>

      {/* Recent Diagnostics Quick Access (if any exists) */}
      {recentHistory.length > 0 && (
        <section className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                최근 저장된 나의 진단 기록
              </h2>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400">
              총 {recentHistory.length}건 보관 중
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recentHistory.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectHistory(item)}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{item.createdAt}</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {item.profile.name}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  {item.archetype.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                  추천 학과: {item.matchedMajors[0]?.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3-Step Guided Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            꿈끼나비는 어떻게 나만의 진로를 찾아줄까요?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            직관적인 3단계 입력 과정을 통해 객관적인 데이터와 과학적 심리 적성 모델을 매칭합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2 block">
              01. 관심사 탐색
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              흥미 & 키워드 선택
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              IT, 바이오, 경영, 미디어 등 8대 대표 계열의 세부 태그를 선택하거나 내가 열정을 느끼는 키워드를 자유롭게 입력합니다.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2 block">
              02. 성향 & 스타일
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              행동 슬라이더 & 강점
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              사교형 vs 독립형, 논리분석형 vs 감각창의형 등 4대 밸런스 슬라이더를 통해 나의 고유한 일하는 방식을 진단합니다.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2 block">
              03. 학과 & 직업 나침반
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              맞춤 결과 & 고교 과목
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              매칭 적합도(%)가 높은 상위 대학 학과와 유망 직업군, 그리고 고등학교에서 필수 이수해야 할 일반/진로선택 과목을 안내합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
