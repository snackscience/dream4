export type GradeLevel = '중학생' | '고등학교 1~2학년' | '고등학교 3학년' | '대학생 / 청년';

export interface RiasecScores {
  R: number; // Realistic 현실형
  I: number; // Investigative 탐구형
  A: number; // Artistic 예술형
  S: number; // Social 사회형
  E: number; // Enterprising 진취형
  C: number; // Conventional 관습형
}

export interface StudentProfile {
  name: string;
  gradeLevel: GradeLevel;
  selectedFields: string[];
  customKeywords: string[];
  personalityTraits: string[];
  sliders: {
    workStyle: number; // 0: 독립적 탐구 <-> 100: 사교적 협력
    thinkingStyle: number; // 0: 논리적 분석 <-> 100: 직관적 창의
    actionStyle: number; // 0: 체계적 계획 <-> 100: 유연한 도전
    roleStyle: number; // 0: 리더십/주도 <-> 100: 전문 지원/서포트
  };
  favoriteActivities: string[];
  strongSubjects: string[];
  careerValues: string[];
}

export type MajorCategory =
  | '공학계열'
  | '인문사회계열'
  | '자연과학계열'
  | '의약보건계열'
  | '사범교육계열'
  | '예체능계열'
  | '융합신산업';

export interface Major {
  id: string;
  name: string;
  category: MajorCategory;
  summary: string;
  description: string;
  riasecPrimary: string; // 예: "IR", "AS", "EI"
  keywords: string[];
  recommendedSubjects: {
    general: string[]; // 일반선택
    career: string[];  // 진로선택
  };
  coreCompetencies: string[];
  careerTracks: string[];
  typicalCurriculum: string[];
  employmentFields: string[];
  futureOutlook: number;
  matchScore?: number;
  matchReasons?: string[];
}

export interface Career {
  id: string;
  name: string;
  category: string;
  summary: string;
  duties: string[];
  relatedMajorNames: string[];
  requiredSkills: string[];
  riasecCode: string;
  prospect: {
    growthRating: number; // 1~5
    prospectText: string;
    avgSalaryRange: string;
    satisfactionRate: string;
  };
  personalityMatch: string[];
  matchScore?: number;
  matchReasons?: string[];
}

export interface DiagnosticResult {
  id: string;
  createdAt: string;
  profile: StudentProfile;
  archetype: {
    code: string;
    title: string;
    tagline: string;
    description: string;
    strengths: string[];
    growthTips: string[];
  };
  riasecScores: RiasecScores;
  matchedMajors: Major[];
  matchedCareers: Career[];
  recommendedSubjects: {
    general: string[];
    career: string[];
  };
  aiMentorReport?: {
    mentorMessage: string;
    learningRoadmap: { grade: string; focus: string; action: string }[];
    recommendedBooks: { title: string; author: string; reason: string }[];
    extracurriculars: string[];
  };
}
