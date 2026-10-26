import React from 'react';
import { BookOpen, Compass, GraduationCap, CheckCircle2, Lightbulb, Users } from 'lucide-react';

export const GuideView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>진로진학 길라잡이</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          꿈끼나비 활용 & 진로 가이드
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          홀랜드 직업적성 모델(RIASEC)의 이해와 고교학점제 선택과목 설계 꿀팁을 안내합니다.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        {/* Section 1: Holland RIASEC */}
        <section className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="flex items-center gap-2.5 mb-3">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              1. 홀랜드(RIASEC) 6대 직업적성 유형이란?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            미국의 직업심리학자 존 홀랜드(John L. Holland)가 정립한 이론으로, 개인의 성격 특성과 직업 환경을
            6가지 유형으로 분류하여 적합성을 평가하는 세계 표준 진로 진단 모델입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-sky-50/60 dark:bg-sky-950/30 rounded-xl border border-sky-100 dark:border-sky-900/40">
              <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
                R (현실형 / Realistic)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                도구, 기계, 컴퓨터를 직접 다루고 실용적인 결과물을 만드는 것을 선호
              </p>
            </div>

            <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-1">
                I (탐구형 / Investigative)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                과학적 원리를 분석하고 지적 호기심을 바탕으로 복잡한 문제를 해결
              </p>
            </div>

            <div className="p-3 bg-pink-50/60 dark:bg-pink-950/30 rounded-xl border border-pink-100 dark:border-pink-900/40">
              <span className="font-bold text-pink-800 dark:text-pink-300 block mb-1">
                A (예술형 / Artistic)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                자유롭고 창의적인 발상, 디자인, 영상, 문학 등 자신을 표현하기를 즐김
              </p>
            </div>

            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                S (사회형 / Social)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                사람을 돕고 소통하며 가르치고 상담하는 따뜻한 협동 활동 선호
              </p>
            </div>

            <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/40">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                E (진취형 / Enterprising)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                목표를 세우고 사람들을 이끌며 비즈니스, 기획, 설득에 재능을 발휘
              </p>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-300 block mb-1">
                C (관습형 / Conventional)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                체계적인 규칙을 준수하고 데이터와 일정을 꼼꼼하고 정확하게 관리
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: High School Subject Choice */}
        <section className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="flex items-center gap-2.5 mb-3">
            <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              2. 고교학점제 선택과목(일반선택 vs 진로선택) 선택 전략
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold block">
                📌 원칙 1: 지원할 대학 학과의 핵심 권장 과목을 먼저 확인하세요
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                서울대, 연세대, 고려대 등 주요 대학은 학과별로 '핵심 권장과목'과 '권장과목'을 발표하고 있습니다.
                공학·자연계열은 미적분/기하/물리학, 인문경상은 경제/사회문화/확률과통계 이수가 필수 평가 요소입니다.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold block">
                📌 원칙 2: 진로선택과목은 성취도(A/B/C) 평가이므로 과감하게 도전하세요
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                수강 인원이 적더라도 자신의 진로와 직결된 과목(예: 인공지능 수학, 생명과학실험, 고급물리 등)을
                수강하는 것이 학생부 종합전형에서 매우 높은 학업 열정 점수를 받습니다.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold block">
                📌 원칙 3: 수행평가와 세특(세부능력 및 특기사항)을 전공과 연계하세요
              </strong>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                수업 시간에 배운 교과 개념을 관심 학과나 유망 직업의 최신 트렌드와 연결하여 주제 탐구 보고서를 작성하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Teacher / Counselor Tips */}
        <section className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="flex items-center gap-2.5 mb-3">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              3. 진로 교사 및 학부모 상담 활용 안내
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>상담 자료 복사 기능:</strong> 진단 결과 화면의 [상담 리포트 복사] 버튼을 누르면
                학생의 성향, 추천 학과 및 직업, 추천 고교 선택과목이 정리된 텍스트가 클립보드에 복사되어 상담 일지나 메신저에 바로 붙여넣을 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>인쇄 및 PDF 보관:</strong> [인쇄 / PDF] 버튼을 통해 별도의 프로그램 설치 없이 깔끔하게 출력하거나 학부모 상담용 포트폴리오로 보관 가능합니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>기기 내 자동 저장:</strong> 브라우저 LocalStorage에 이전 진단 기록이 보존되므로 여러 번 진단하며 성향 변화를 추적할 수 있습니다.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
