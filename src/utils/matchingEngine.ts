import {
  CAREERS_DATABASE,
  MAJORS_DATABASE,
} from '../data/careerDatabase';
import {
  Career,
  DiagnosticResult,
  Major,
  RiasecScores,
  StudentProfile,
} from '../types/career';

const ARCHETYPE_MAP: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    strengths: string[];
    growthTips: string[];
  }
> = {
  IR: {
    title: '혁신적인 미래기술 개척자',
    tagline: '원리를 파고들어 현실의 문제를 실질적으로 해결하는 테크놀로지 탐험가',
    description:
      '당신은 사물과 자연의 원리를 끝까지 파고드는 깊은 지적 호기심과, 이를 실제 작동하는 소프트웨어나 기계 장치로 구현해내는 탁월한 실천력을 겸비하고 있습니다. 복잡한 문제를 만났을 때 흥분하며 해결책을 찾아냅니다.',
    strengths: ['시스템적 논리 사고', '기술적 구현력', '고난도 문제 집중력'],
    growthTips: ['팀 프로젝트에서 자신의 아이디어를 비전공자에게도 쉽게 설명하는 연습을 해보세요.'],
  },
  IA: {
    title: '창의적인 지식 융합 설계자',
    tagline: '새로운 시각으로 본질을 통찰하고 혁신적인 아이디어를 조형하는 지식 아티스트',
    description:
      '당신은 기존의 규칙에 얽매이지 않고 남들이 보지 못한 연관성을 찾아내는 독창적인 눈을 지녔습니다. 과학적 탐구심과 예술적 상상력이 결합되어 완전히 새로운 영역을 개척하는 데 큰 강점이 있습니다.',
    strengths: ['독창적 발상력', '융합적 사고', '호기심 기반의 학습 동기'],
    growthTips: ['풍부한 아이디어를 구체적인 결과물로 완성해내는 작은 마감 습관을 길러보세요.'],
  },
  SI: {
    title: '따뜻한 이성의 치유자',
    tagline: '깊은 공감과 객관적 과학 지식으로 사람의 몸과 마음을 어루만지는 멘토',
    description:
      '당신은 타인의 아픔이나 필요를 민감하게 감지하면서도, 감정에 휘둘리지 않고 과학적·이성적 판단으로 실질적인 해결책을 제시할 수 있는 균형 잡힌 인재입니다. 의료, 보건, 심리 상담에 매우 적합합니다.',
    strengths: ['경청과 공감력', '객관적 상황 판단', '신뢰감을 주는 소통'],
    growthTips: ['타인을 돕는 만큼 나 자신의 신체적·정신적 에너지도 충전하는 루틴을 만드세요.'],
  },
  SE: {
    title: '선한 영향력의 휴먼 리더',
    tagline: '사람들의 마음을 움직여 더 나은 사회적 가치를 함께 만들어가는 변화 주도자',
    description:
      '당신은 사람들 사이의 에너지를 북돋우고 공동의 목표를 향해 함께 나아가도록 이끄는 친화력과 리더십이 뛰어납니다. 교육, 복지, 공공 기획, 사회적 비즈니스에서 탁월한 역량을 발휘합니다.',
    strengths: ['탁월한 대인관계', '동기부여 리더십', '설득력 있는 화술'],
    growthTips: ['다양한 사람들의 의견을 조율할 때 객관적인 데이터와 기준을 함께 제시하면 설득력이 배가됩니다.'],
  },
  AE: {
    title: '트렌드를 선도하는 크리에이터',
    tagline: '감각적인 비주얼과 매력적인 스토리로 대중의 마음을 사로잡는 기획자',
    description:
      '당신은 시대의 유행과 사람들의 심리를 빠르게 포착하여 시각적 디자인, 영상, 매력적인 브랜드로 구체화하는 능력이 탁월합니다. 미디어, 콘텐츠, UX 디자인, 광고 분야에서 빛을 발합니다.',
    strengths: ['트렌드 감수성', '스토리텔링 능력', '비주얼 표현력'],
    growthTips: ['화려한 아이디어 뒤에 사용자의 실제 사용 편의성과 기술적 구현성을 함께 점검해보세요.'],
  },
  EC: {
    title: '전략적인 비즈니스 오케스트레이터',
    tagline: '치밀한 계획과 과감한 실행력으로 조직의 성공을 이끄는 전략가',
    description:
      '당신은 목표가 정해지면 가장 효율적인 자원 배분과 데이터 기반의 실행 계획을 세워 성과를 만들어내는 비즈니스 감각을 가지고 있습니다. 경영, 창업, 마케팅, 금융 분석에 최적화되어 있습니다.',
    strengths: ['목표 지향적 추진력', '데이터 기반 의사결정', '조직 조율 및 효율성 극대화'],
    growthTips: ['단기적 효율성뿐 아니라 장기적인 사람의 가치와 창의적 시도에도 유연한 공간을 열어두세요.'],
  },
  RI: {
    title: '정밀하고 집요한 테크니컬 마스터',
    tagline: '손끝과 지성으로 물리적 시스템의 최고 완성도를 만들어내는 장인',
    description:
      '당신은 기계, 장치, 물리적 실험에 몰입하여 끝까지 오차를 줄이고 완성도를 끌어올리는 인내심과 기술적 감각을 지녔습니다. 반도체, 로봇, 항공우주, 정밀기계 분야에서 핵심 인재로 성장합니다.',
    strengths: ['정밀한 도구/기계 제어', '집요한 몰입력', '기술적 신뢰성'],
    growthTips: ['혼자 해결하기 어려운 문제는 주변 전문가나 동료와 적극적으로 지식을 나누어보세요.'],
  },
  SA: {
    title: '창의적인 공감 교육자',
    tagline: '따뜻한 마음과 참신한 방법으로 타인의 잠재력을 피워내는 배움의 동반자',
    description:
      '당신은 타인의 성장을 지켜보는 것에서 깊은 보람을 느끼며, 뻔하지 않은 창의적인 방식으로 지식과 감동을 전달할 줄 압니다. 교육, 청소년 멘토링, 에듀테크 콘텐츠 기획에서 뛰어난 성취를 이룹니다.',
    strengths: ['학습자 중심의 공감', '창의적 교수법', '친근한 소통 능력'],
    growthTips: ['많은 사람의 요구를 다 수용하려다 지치지 않도록 분명한 나의 기준과 경계를 설정하세요.'],
  },
};

export function calculateRiasecScores(profile: StudentProfile): RiasecScores {
  const scores: RiasecScores = { R: 20, I: 20, A: 20, S: 20, E: 20, C: 20 };

  // 1. Process personality traits
  profile.personalityTraits.forEach((trait) => {
    if (trait.includes('분석') || trait.includes('호기심')) scores.I += 16;
    if (trait.includes('창의') || trait.includes('발상') || trait.includes('유연')) scores.A += 16;
    if (trait.includes('공감') || trait.includes('경청') || trait.includes('돕고')) scores.S += 16;
    if (trait.includes('손재주') || trait.includes('기계') || trait.includes('끈기')) scores.R += 16;
    if (trait.includes('리더십') || trait.includes('추진력') || trait.includes('설득')) scores.E += 16;
    if (trait.includes('계획') || trait.includes('정밀') || trait.includes('마감')) scores.C += 16;
  });

  // 2. Process sliders (0 to 100)
  // workStyle: 0 (독립적/I,R) <-> 100 (사교적/S,E)
  scores.I += Math.round((100 - profile.sliders.workStyle) * 0.25);
  scores.R += Math.round((100 - profile.sliders.workStyle) * 0.15);
  scores.S += Math.round(profile.sliders.workStyle * 0.3);
  scores.E += Math.round(profile.sliders.workStyle * 0.15);

  // thinkingStyle: 0 (논리/I,C) <-> 100 (창의/A)
  scores.I += Math.round((100 - profile.sliders.thinkingStyle) * 0.3);
  scores.C += Math.round((100 - profile.sliders.thinkingStyle) * 0.15);
  scores.A += Math.round(profile.sliders.thinkingStyle * 0.4);

  // actionStyle: 0 (체계/C) <-> 100 (도전/E,A)
  scores.C += Math.round((100 - profile.sliders.actionStyle) * 0.35);
  scores.E += Math.round(profile.sliders.actionStyle * 0.2);
  scores.A += Math.round(profile.sliders.actionStyle * 0.15);

  // roleStyle: 0 (리더십/E) <-> 100 (서포트/S,C)
  scores.E += Math.round((100 - profile.sliders.roleStyle) * 0.35);
  scores.S += Math.round(profile.sliders.roleStyle * 0.2);
  scores.C += Math.round(profile.sliders.roleStyle * 0.15);

  // 3. Process favorite activities
  profile.favoriteActivities.forEach((act) => {
    if (act.includes('코딩') || act.includes('컴퓨터')) {
      scores.I += 12;
      scores.R += 8;
    }
    if (act.includes('조립') || act.includes('수리') || act.includes('생태')) {
      scores.R += 14;
      scores.I += 8;
    }
    if (act.includes('글') || act.includes('그림') || act.includes('디자인')) {
      scores.A += 16;
    }
    if (act.includes('토론') || act.includes('발표') || act.includes('리더')) {
      scores.E += 14;
      scores.S += 8;
    }
    if (act.includes('고민') || act.includes('도움')) {
      scores.S += 16;
    }
    if (act.includes('정리') || act.includes('일정표')) {
      scores.C += 16;
    }
    if (act.includes('수학') || act.includes('실험') || act.includes('도서')) {
      scores.I += 14;
    }
  });

  // 4. Normalize to range 25~95
  const maxScore = Math.max(...Object.values(scores), 1);
  const normalized: RiasecScores = {
    R: Math.min(95, Math.max(25, Math.round((scores.R / maxScore) * 85 + 10))),
    I: Math.min(95, Math.max(25, Math.round((scores.I / maxScore) * 85 + 10))),
    A: Math.min(95, Math.max(25, Math.round((scores.A / maxScore) * 85 + 10))),
    S: Math.min(95, Math.max(25, Math.round((scores.S / maxScore) * 85 + 10))),
    E: Math.min(95, Math.max(25, Math.round((scores.E / maxScore) * 85 + 10))),
    C: Math.min(95, Math.max(25, Math.round((scores.C / maxScore) * 85 + 10))),
  };

  return normalized;
}

export function matchProfile(profile: StudentProfile): DiagnosticResult {
  const riasec = calculateRiasecScores(profile);

  // Find top 2 RIASEC letters
  const sortedRiasec = (Object.keys(riasec) as Array<keyof RiasecScores>).sort(
    (a, b) => riasec[b] - riasec[a]
  );
  const primaryCode = sortedRiasec[0] + sortedRiasec[1];
  const reverseCode = sortedRiasec[1] + sortedRiasec[0];

  const archetypeInfo =
    ARCHETYPE_MAP[primaryCode] ||
    ARCHETYPE_MAP[reverseCode] ||
    ARCHETYPE_MAP['IR'];

  // Score majors
  const scoredMajors: Major[] = MAJORS_DATABASE.map((major) => {
    let score = 50;
    const reasons: string[] = [];

    // RIASEC affinity
    const p1 = major.riasecPrimary[0] as keyof RiasecScores;
    const p2 = major.riasecPrimary[1] as keyof RiasecScores;
    const riasecMatchVal = (riasec[p1] || 50) * 0.3 + (riasec[p2] || 50) * 0.2;
    score += riasecMatchVal * 0.35;

    // Field & Keyword matching
    const allInputKeywords = [
      ...profile.selectedFields,
      ...profile.customKeywords,
      ...profile.strongSubjects,
      ...profile.favoriteActivities,
    ];

    let keywordHits = 0;
    major.keywords.forEach((kw) => {
      const match = allInputKeywords.some((input) =>
        input.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(input.toLowerCase())
      );
      if (match) keywordHits++;
    });

    if (keywordHits > 0) {
      score += Math.min(25, keywordHits * 7);
      reasons.push(`선택하신 관심 키워드(${major.keywords.slice(0, 2).join(', ')})와 높은 연관성`);
    }

    // Strong subjects match
    const subjMatch = major.recommendedSubjects.general.some((subj) =>
      profile.strongSubjects.some((s) => s.includes(subj) || subj.includes(s.split(' ')[0]))
    );
    if (subjMatch) {
      score += 8;
      reasons.push('자신 있는 과목 및 고교 추천 이수 과목 일치');
    }

    // Top RIASEC alignment reason
    if (major.riasecPrimary.includes(sortedRiasec[0])) {
      score += 7;
      reasons.push(`최우수 성향(${sortedRiasec[0]}형)과 핵심 학문 특성 부합`);
    }

    const finalScore = Math.min(98, Math.max(68, Math.round(score)));

    return {
      ...major,
      matchScore: finalScore,
      matchReasons: reasons.slice(0, 3),
    };
  });

  scoredMajors.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Score careers
  const scoredCareers: Career[] = CAREERS_DATABASE.map((career) => {
    let score = 52;
    const reasons: string[] = [];

    // Match with top majors
    const matchesTopMajor = scoredMajors
      .slice(0, 3)
      .some((m) => career.relatedMajorNames.includes(m.name));
    if (matchesTopMajor) {
      score += 18;
      reasons.push(`추천 1순위 학과(${career.relatedMajorNames[0]})와 직결된 유망 진출 경로`);
    }

    // Personality match
    let traitHits = 0;
    career.personalityMatch.forEach((pm) => {
      if (profile.personalityTraits.includes(pm)) {
        traitHits++;
      }
    });
    if (traitHits > 0) {
      score += traitHits * 8;
      reasons.push(`보유하신 핵심 성격 강점과 완벽 매칭`);
    }

    // Values match
    if (
      career.prospect.growthRating >= 5 &&
      profile.careerValues.some((v) => v.includes('성장') || v.includes('전문성'))
    ) {
      score += 6;
      reasons.push('지속적인 전문성 성장과 높은 비전 일치');
    }

    // RIASEC match
    if (career.riasecCode.includes(sortedRiasec[0])) {
      score += 8;
    }

    const finalScore = Math.min(99, Math.max(70, Math.round(score)));

    return {
      ...career,
      matchScore: finalScore,
      matchReasons: reasons.slice(0, 3),
    };
  });

  scoredCareers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  // Aggregate recommended high school subjects from top 3 majors
  const top3Majors = scoredMajors.slice(0, 3);
  const generalSet = new Set<string>();
  const careerSet = new Set<string>();

  top3Majors.forEach((m) => {
    m.recommendedSubjects.general.forEach((s) => generalSet.add(s));
    m.recommendedSubjects.career.forEach((s) => careerSet.add(s));
  });

  return {
    id: 'diag_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    createdAt: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    profile,
    archetype: {
      code: primaryCode,
      ...archetypeInfo,
    },
    riasecScores: riasec,
    matchedMajors: scoredMajors,
    matchedCareers: scoredCareers,
    recommendedSubjects: {
      general: Array.from(generalSet),
      career: Array.from(careerSet),
    },
  };
}
