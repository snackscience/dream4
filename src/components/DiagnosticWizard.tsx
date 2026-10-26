import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Sliders,
  Compass,
  Check,
  Tag,
  BookMarked,
  Heart,
  User,
} from 'lucide-react';
import {
  CAREER_VALUES,
  FAVORITE_ACTIVITIES,
  INTEREST_FIELDS,
  PERSONALITY_TRAIT_OPTIONS,
  STRONG_SUBJECTS,
} from '../data/careerDatabase';
import { GradeLevel, StudentProfile } from '../types/career';

interface DiagnosticWizardProps {
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
}

const GRADE_LEVELS: GradeLevel[] = [
  '중학생',
  '고등학교 1~2학년',
  '고등학교 3학년',
  '대학생 / 청년',
];

export const DiagnosticWizard: React.FC<DiagnosticWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('고등학교 1~2학년');
  const [selectedFields, setSelectedFields] = useState<string[]>(['인공지능', '소프트웨어']);
  const [customInput, setCustomInput] = useState('');
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);

  // Step 2 State
  const [sliders, setSliders] = useState({
    workStyle: 40, // 0: 독립적 탐구 <-> 100: 사교적 협력
    thinkingStyle: 35, // 0: 논리적 분석 <-> 100: 직관적 창의
    actionStyle: 45, // 0: 체계적 계획 <-> 100: 유연한 도전
    roleStyle: 50, // 0: 리더십/주도 <-> 100: 전문 지원/서포트
  });
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([
    '논리적이고 객관적인 분석력',
    '원리를 파고드는 왕성한 지적 호기심',
  ]);

  // Step 3 State
  const [favoriteActivities, setFavoriteActivities] = useState<string[]>([
    '컴퓨터로 코딩하거나 디지털 도구 활용하기',
    '복잡한 수학 문제나 과학 현상의 규칙 발견하기',
  ]);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([
    '수학 (대수/기하/미적분)',
    '정보 / 컴퓨터',
  ]);
  const [careerValues, setCareerValues] = useState<string[]>([
    '자율성과 독립성 (내 방식대로 일하기)',
    '전문성 성장과 지적 만족',
  ]);

  // Tag helper
  const toggleFieldTag = (tag: string) => {
    setSelectedFields((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomKeyword = () => {
    const trimmed = customInput.trim();
    if (trimmed && !customKeywords.includes(trimmed) && !selectedFields.includes(trimmed)) {
      setCustomKeywords((prev) => [...prev, trimmed]);
      setCustomInput('');
    }
  };

  const removeCustomKeyword = (tag: string) => {
    setCustomKeywords((prev) => prev.filter((t) => t !== tag));
  };

  const togglePersonalityTrait = (traitLabel: string) => {
    setPersonalityTraits((prev) =>
      prev.includes(traitLabel)
        ? prev.filter((t) => t !== traitLabel)
        : [...prev, traitLabel]
    );
  };

  const toggleFavoriteActivity = (actLabel: string) => {
    setFavoriteActivities((prev) =>
      prev.includes(actLabel)
        ? prev.filter((a) => a !== actLabel)
        : [...prev, actLabel]
    );
  };

  const toggleStrongSubject = (subj: string) => {
    setStrongSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const toggleCareerValue = (valLabel: string) => {
    setCareerValues((prev) =>
      prev.includes(valLabel)
        ? prev.filter((v) => v !== valLabel)
        : [...prev, valLabel]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const profile: StudentProfile = {
        name: name.trim() || '진로탐색자',
        gradeLevel,
        selectedFields,
        customKeywords,
        personalityTraits,
        sliders,
        favoriteActivities,
        strongSubjects,
        careerValues,
      };
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              진로 역량 진단 위저드 · Step {currentStep} / 3
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              {currentStep === 1 && '흥미 및 관심 분야 선택'}
              {currentStep === 2 && '성격 및 행동 성향 체크'}
              {currentStep === 3 && '선호 활동 및 진로 가치관'}
            </h1>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            진단 취소
          </button>
        </div>

        {/* Progress track */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-indigo-600 dark:bg-indigo-500'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Basic Info & Interests */}
      {currentStep === 1 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* User Profile Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              기본 프로필 입력
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  이름 또는 닉네임 (선택)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김진로, 꿈나비"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  현재 학년 / 신분
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {GRADE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interest Fields Grid */}
          <div>
            <div className="mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                관심 있는 분야와 키워드를 자유롭게 선택하세요
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                태그를 클릭하여 활성화하거나 아래에서 나만의 키워드를 직접 추가할 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INTEREST_FIELDS.map((field) => (
                <div
                  key={field.id}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {field.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {field.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {field.tags.map((tag) => {
                      const isSelected = selectedFields.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleFieldTag(tag)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Keywords Input */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
              직접 추가하고 싶은 관심사나 꿈꾸는 직무 키워드
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomKeyword();
                  }
                }}
                placeholder="예: 드론레이싱, 퀀트투자, 메타버스, 유전체지도"
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={addCustomKeyword}
                className="px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                추가
              </button>
            </div>

            {/* Custom tags list */}
            {customKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {customKeywords.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs rounded-lg font-medium"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomKeyword(tag)}
                      className="hover:text-indigo-950 dark:hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Personality & Behavioral Sliders */}
      {currentStep === 2 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Dual Sliders Card */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                나의 행동 및 사고 스타일 슬라이더
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              슬라이더를 좌우로 움직여 평소 내가 더 편안하게 느끼는 쪽에 가깝게 조절해보세요.
            </p>

            <div className="space-y-6">
              {/* Slider 1: Work Style */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span
                    className={
                      sliders.workStyle < 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    독립적 심층 탐구 (I / 혼자 집중)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    {sliders.workStyle}%
                  </span>
                  <span
                    className={
                      sliders.workStyle > 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    사교적 팀 협력 (S / 함께 소통)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.workStyle}
                  onChange={(e) =>
                    setSliders({ ...sliders, workStyle: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Thinking Style */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span
                    className={
                      sliders.thinkingStyle < 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    논리적 원리 분석 (I, R / 근거 중심)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    {sliders.thinkingStyle}%
                  </span>
                  <span
                    className={
                      sliders.thinkingStyle > 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    직관적 창의 발상 (A / 감각 중심)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.thinkingStyle}
                  onChange={(e) =>
                    setSliders({ ...sliders, thinkingStyle: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Action Style */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span
                    className={
                      sliders.actionStyle < 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    체계적 계획 관리 (C / 안정과 절차)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    {sliders.actionStyle}%
                  </span>
                  <span
                    className={
                      sliders.actionStyle > 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    유연한 도전 실행 (E, A / 자율과 모험)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.actionStyle}
                  onChange={(e) =>
                    setSliders({ ...sliders, actionStyle: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: Role Style */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span
                    className={
                      sliders.roleStyle < 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    리더십과 목표 주도 (E / 지휘와 설득)
                  </span>
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    {sliders.roleStyle}%
                  </span>
                  <span
                    className={
                      sliders.roleStyle > 50
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-500'
                    }
                  >
                    전문 서포트 및 조화 (S, R / 묵묵한 지원)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders.roleStyle}
                  onChange={(e) =>
                    setSliders({ ...sliders, roleStyle: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Personality Strengths Multi-select */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              자신에게 해당한다고 느끼는 성격 강점을 골라주세요
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              다중 선택이 가능합니다 (권장: 3~6개)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERSONALITY_TRAIT_OPTIONS.map((trait) => {
                const isSelected = personalityTraits.includes(trait.label);
                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() => togglePersonalityTrait(trait.label)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{trait.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Favorite Activities, Subjects & Values */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Favorite Activities */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                시간 가는 줄 모르고 즐겁게 몰입하는 활동
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              평소 취미나 동아리 활동, 자유시간에 즐겨하는 것을 선택하세요 (다중 선택)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FAVORITE_ACTIVITIES.map((act) => {
                const isSelected = favoriteActivities.includes(act.label);
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => toggleFavoriteActivity(act.label)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strong / Favorite School Subjects */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                자신 있거나 배우는 것이 흥미로운 학교 과목
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              대학 학과의 고교 필수 이수과목 매칭에 중요한 기준이 됩니다.
            </p>

            <div className="flex flex-wrap gap-2">
              {STRONG_SUBJECTS.map((subj) => {
                const isSelected = strongSubjects.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleStrongSubject(subj)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {subj}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Career Values */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-rose-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                장래 직업을 선택할 때 가장 중요하게 여기는 가치관
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              내가 일터에서 보람을 느끼는 핵심 기준을 2~4개 선택해주세요.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CAREER_VALUES.map((val) => {
                const isSelected = careerValues.includes(val.label);
                return (
                  <button
                    key={val.id}
                    type="button"
                    onClick={() => toggleCareerValue(val.label)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-left text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{val.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleBack}
          className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentStep === 1 ? '처음으로' : '이전 단계'}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-7 py-3 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all flex items-center gap-2"
        >
          {currentStep === 3 ? (
            <>
              <Sparkles className="w-4 h-4" />
              진로 나침반 분석 시작하기
            </>
          ) : (
            <>
              다음 단계 ({currentStep + 1}/3)
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
