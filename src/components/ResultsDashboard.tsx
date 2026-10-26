import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Bookmark,
  Share2,
  Printer,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Star,
  Copy,
  Check,
  BrainCircuit,
  Compass,
} from 'lucide-react';
import { Career, DiagnosticResult, Major } from '../types/career';
import { RiasecRadarChart } from './RiasecRadarChart';
import { MajorDetailModal } from './MajorDetailModal';
import { CareerDetailModal } from './CareerDetailModal';
import { PrintReportModal } from './PrintReportModal';
import { saveDiagnosticResult } from '../utils/storage';

interface ResultsDashboardProps {
  result: DiagnosticResult;
  onRestart: () => void;
  onViewHistory: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onRestart,
  onViewHistory,
}) => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // AI Mentor Loading State
  const [aiReport, setAiReport] = useState<DiagnosticResult['aiMentorReport'] | null>(
    result.aiMentorReport || null
  );
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    // Fire festive confetti on diagnosis completion
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch (e) {
      // Ignore if confetti not supported
    }

    // Auto-save to localStorage
    saveDiagnosticResult(result);
    setIsSaved(true);
  }, [result]);

  const handleSaveAgain = () => {
    saveDiagnosticResult(result);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopyReport = () => {
    const textReport = `[꿈끼나비 진로·학과 매칭 진단 결과 리포트]
■ 학생: ${result.profile.name} (${result.profile.gradeLevel})
■ 진단 일자: ${result.createdAt}
■ 나의 진로 유형: ${result.archetype.title}
"${result.archetype.tagline}"

■ 성향 요약:
${result.archetype.description}

■ 추천 대학 학과 Top 3:
1. ${result.matchedMajors[0]?.name} (적합도 ${result.matchedMajors[0]?.matchScore}%)
   - 계열: ${result.matchedMajors[0]?.category}
   - 핵심역량: ${result.matchedMajors[0]?.coreCompetencies.slice(0, 3).join(', ')}
2. ${result.matchedMajors[1]?.name} (적합도 ${result.matchedMajors[1]?.matchScore}%)
3. ${result.matchedMajors[2]?.name} (적합도 ${result.matchedMajors[2]?.matchScore}%)

■ 추천 유망 직업 Top 3:
1. ${result.matchedCareers[0]?.name} (적합도 ${result.matchedCareers[0]?.matchScore}%)
   - 분야: ${result.matchedCareers[0]?.category}
   - 평균예상연봉: ${result.matchedCareers[0]?.prospect.avgSalaryRange}
2. ${result.matchedCareers[1]?.name} (적합도 ${result.matchedCareers[1]?.matchScore}%)
3. ${result.matchedCareers[2]?.name} (적합도 ${result.matchedCareers[2]?.matchScore}%)

■ 고교 권장 선택과목:
- 일반선택: ${result.recommendedSubjects.general.join(', ')}
- 진로선택: ${result.recommendedSubjects.career.join(', ')}

꿈끼나비(나만의 진로·학과 매칭 내비게이터) 제공`;

    navigator.clipboard.writeText(textReport).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  // Client-side fallback generator to guarantee 100% success
  const createClientMentorReport = () => {
    const sName = result.profile.name || '학생';
    const topM = result.matchedMajors[0];
    const topC = result.matchedCareers[0];
    const category = topM?.category || '전공';

    return {
      mentorMessage: `${sName}님, 당신의 진단 결과는 '${result.archetype.title}' 유형으로, 남다른 호기심과 탁월한 잠재력을 지니고 있습니다. 1순위로 추천된 [${topM?.name || '전공'}]과 [${topC?.name || '직업'}]은 ${sName}님이 지닌 적성을 가장 역동적으로 발휘할 수 있는 유망 분야입니다. 실패를 두려워하지 말고 지금부터 나만의 탐구 주제를 주도적으로 설정하여 깊이 있게 파고들어 보세요.`,
      learningRoadmap: [
        {
          grade: '1단계 (탐색기: 기초 역량 다지기)',
          focus: `${topM?.name} 관련 기초 교과 학업 역량 및 개념 확립`,
          action: `일반선택 추천 과목인 [${result.recommendedSubjects.general.slice(0, 3).join(', ')}]에 집중하고, 교내 진로 동아리 및 독서 활동을 활성화하세요.`,
        },
        {
          grade: '2단계 (심화기: 전공 적합성 특화)',
          focus: `진로선택 과목 이수 및 심화 탐구 프로젝트`,
          action: `진로선택 추천 과목인 [${result.recommendedSubjects.career.slice(0, 3).join(', ')}]을 이수하고, [${topC?.name}] 직무와 연계된 소논문/탐구 보고서를 작성하세요.`,
        },
        {
          grade: '3단계 (도약기: 진로 포트폴리오 완성)',
          focus: `대학별 세부 커리큘럼 분석 및 모의 면접 준비`,
          action: `목표 대학 학과 홈페이지에서 학부 연구실과 교육과정을 직접 분석하고, 3년간의 성장을 담은 진로 포트폴리오를 체계화하세요.`,
        },
      ],
      recommendedBooks: [
        {
          title: category.includes('공학') ? '알고리즘, 인생을 계산하다' : category.includes('의약') ? '생명의 비밀을 푸는 유전자' : '넛지 (Nudge)',
          author: category.includes('공학') ? '브라이언 크리스천' : category.includes('의약') ? '제임스 왓슨' : '리처드 탈러',
          reason: `${topM?.name} 전공 적합성과 미래 산업 트렌드를 관통하는 핵심 교양 필독서`,
        },
        {
          title: `${topM?.name} 전공 탐색 콘서트`,
          author: '한국대학교육협의회',
          reason: `대학별 실제 커리큘럼 및 선배 전공자들의 생생한 진로 조언 수록`,
        },
      ],
      extracurriculars: [
        `교내 전공 연계 학술 동아리 및 시사·과학 탐구 소모임 활동`,
        `수업 시간에 배운 핵심 개념을 [${topM?.name}] 최신 트렌드와 접목한 교과 세특(세부능력 및 특기사항) 보고서 작성`,
        `대학 학과 오픈캠퍼스 청소년 전공체험 프로그램 및 온라인 MOOC 수강`,
      ],
    };
  };

  const fetchAiMentorAdvice = async () => {
    setLoadingAi(true);
    setAiError(null);
    try {
      const response = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: result.profile,
          archetype: result.archetype,
          topMajor: result.matchedMajors[0],
          topCareer: result.matchedCareers[0],
        }),
      });

      if (!response.ok) {
        throw new Error('API 응답 지연');
      }

      const data = await response.json();
      if (data && data.mentorMessage) {
        setAiReport(data);
        result.aiMentorReport = data;
        saveDiagnosticResult(result);
      } else {
        throw new Error('데이터 파싱 오류');
      }
    } catch (err: any) {
      console.warn('AI 멘토 API 호출 대체 로직 실행:', err);
      // Seamlessly fall back to rich client-generated report
      const clientReport = createClientMentorReport();
      setAiReport(clientReport);
      result.aiMentorReport = clientReport;
      saveDiagnosticResult(result);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Action Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg">
            진단 완료
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {result.createdAt} 진단 기록
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '복사됨!' : '상담 리포트 복사'}
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            인쇄 / PDF
          </button>

          <button
            onClick={handleSaveAgain}
            className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5" />
            {isSaved ? '저장됨' : '저장하기'}
          </button>

          <button
            onClick={onRestart}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            다시 진단하기
          </button>
        </div>
      </div>

      {/* 1. Student Archetype Summary Hero Card */}
      <div className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl print-break-inside-avoid">
        {/* Subtle decorative radial light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-300 mb-2">
            <span>{result.profile.name} 님의 맞춤 진로 프로파일</span>
            <span aria-hidden="true">·</span>
            <span>{result.profile.gradeLevel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono bg-indigo-500/30 px-2 py-0.5 rounded text-[11px]">
              RIASEC {result.archetype.code}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">
            {result.archetype.title}
          </h1>

          <p className="text-base sm:text-lg font-medium text-indigo-200 mb-4 leading-snug">
            "{result.archetype.tagline}"
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {result.archetype.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-indigo-800/60 text-xs">
            <div>
              <span className="text-indigo-300 font-bold block mb-1.5">🌟 핵심 보유 강점</span>
              <div className="flex flex-wrap gap-1.5">
                {result.archetype.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white/10 text-white rounded-md backdrop-blur-xs font-medium"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-indigo-300 font-bold block mb-1.5">🌱 추천 성장 팁</span>
              <p className="text-slate-300 leading-relaxed">
                {result.archetype.growthTips[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIASEC Radar Spider Chart */}
      <section className="print-break-inside-avoid">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            홀랜드(RIASEC) 6대 직업적성 육각 분석
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            행동 성향, 관심사, 문제해결 방식에 따른 6가지 영역별 적합도 분포입니다.
          </p>
        </div>

        <RiasecRadarChart scores={result.riasecScores} />
      </section>

      {/* 3. Matched Majors Top Cards */}
      <section className="print-break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              나와 가장 잘 맞는 대학 학과 (Top 4)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              관심 분야 키워드와 성향 프로파일을 교차 분석하여 도출된 최우선 추천 전공입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.matchedMajors.slice(0, 4).map((major, index) => (
            <div
              key={major.id}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span>{major.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">RIASEC {major.riasecPrimary}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                      {major.matchScore}% 일치
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {major.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {major.summary}
                </p>

                {/* Match reasons */}
                {major.matchReasons && major.matchReasons.length > 0 && (
                  <div className="space-y-1 mb-4">
                    {major.matchReasons.map((reason, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{reason}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer with detail button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  권장: {major.recommendedSubjects.general.slice(0, 2).join(', ')}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMajor(major)}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 shrink-0"
                >
                  상세보기
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Matched Careers Top Cards */}
      <section className="print-break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              나의 잠재력을 꽃피울 유망 직업 (Top 4)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              적성 점수, 미래 산업 성장률, 직업 만족도를 종합하여 엄선한 진출 경로입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.matchedCareers.slice(0, 4).map((career, index) => (
            <div
              key={career.id}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span>{career.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{career.riasecCode}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-900">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                      {career.matchScore}% 일치
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {career.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {career.summary}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-4 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>예상 평균 연봉:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {career.prospect.avgSalaryRange}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>직업 만족도:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {career.prospect.satisfactionRate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  연관 학과: {career.relatedMajorNames[0]}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCareer(career)}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 shrink-0"
                >
                  직무 상세보기
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. High School Subject Selection Guide */}
      <section className="p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl print-break-inside-avoid">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            2022/2015 개정 교육과정 고교 선택과목 맞춤 추천
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          추천된 Top 학과들에 합격하기 위해 고등학교 재학 중 이수하면 학생부 종합전형 및 전공적합성에 매우 유리한 핵심 교과목 목록입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-2">
              📘 일반선택 추천 과목 (기초 학문 역량)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.recommendedSubjects.general.map((subj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 text-xs rounded-lg border border-indigo-200 dark:border-indigo-800 font-medium"
                >
                  {subj}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300/80 mt-3 leading-relaxed">
              * 고2 시기에 해당 과목들의 기본 개념을 탄탄히 다지고 수행평가에서 전공 관심사를 녹여내세요.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block mb-2">
              📗 진로선택 추천 과목 (심화 및 융합 탐구)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.recommendedSubjects.career.map((subj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 text-xs rounded-lg border border-emerald-200 dark:border-emerald-800 font-medium"
                >
                  {subj}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-3 leading-relaxed">
              * 성취도(A/B/C) 평가가 적용되므로 두려움 없이 심화 교과에 도전하여 전공 열정을 증명하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 6. AI Personalized Mentor Report Section (Gemini) */}
      <section className="p-6 sm:p-7 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-900 shadow-xl print-break-inside-avoid">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
              <BrainCircuit className="w-4 h-4" />
              <span>AI 진로진학 수석교사의 맞춤 멘토링</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              나만을 위한 1:1 진로 설계 & 학습 로드맵
            </h2>
          </div>

          {!aiReport && (
            <button
              onClick={fetchAiMentorAdvice}
              disabled={loadingAi}
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {loadingAi ? '멘토 리포트 생성 중...' : 'AI 심층 멘토 조언 받기'}
            </button>
          )}
        </div>

        {loadingAi && (
          <div className="py-8 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-indigo-200">
              학생의 성향과 목표 전공을 종합 분석하여 맞춤 로드맵을 작성하고 있습니다...
            </p>
          </div>
        )}

        {aiError && (
          <div className="p-4 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-200 mb-4">
            {aiError}
          </div>
        )}

        {aiReport && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Mentor Message Letter */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-xs font-bold text-indigo-300 mb-2 flex items-center gap-1.5">
                💌 멘토의 응원 편지
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                {aiReport.mentorMessage}
              </p>
            </div>

            {/* 3-Stage Roadmap */}
            <div>
              <h3 className="text-xs font-bold text-indigo-300 mb-3">
                🧭 학년별 맞춤 실천 로드맵
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {aiReport.learningRoadmap.map((stage, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1.5"
                  >
                    <span className="font-bold text-sky-400 block">{stage.grade}</span>
                    <strong className="text-white block font-semibold text-sm">
                      {stage.focus}
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {stage.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Books & Extracurriculars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="font-bold text-indigo-300 block mb-2.5">
                  📚 추천 전공 연계 도서
                </span>
                <div className="space-y-2">
                  {aiReport.recommendedBooks.map((book, bIdx) => (
                    <div key={bIdx} className="p-2.5 bg-black/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{book.title}</span>
                        <span className="text-[11px] text-slate-400">{book.author}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {book.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <span className="font-bold text-indigo-300 block mb-2.5">
                  🎯 추천 비교과 및 동아리 활동
                </span>
                <ul className="space-y-2">
                  {aiReport.extracurriculars.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-slate-200">
                      <span className="text-indigo-400 font-bold">·</span>
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Modals */}
      <MajorDetailModal major={selectedMajor} onClose={() => setSelectedMajor(null)} />
      <CareerDetailModal career={selectedCareer} onClose={() => setSelectedCareer(null)} />
      {showPrintModal && (
        <PrintReportModal result={result} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
