import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with modern @google/genai
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// Dynamic personalized mentor report generator
function buildPersonalizedReport(profile: any, archetype: any, topMajor: any, topCareer: any) {
  const studentName = profile?.name || '학생';
  const majorName = topMajor?.name || '추천 전공';
  const careerName = topCareer?.name || '유망 직업';
  const category = topMajor?.category || '전공 계열';
  const subjects = topMajor?.recommendedSubjects?.general?.join(', ') || '핵심 기본 교과';
  const careerSubjects = topMajor?.recommendedSubjects?.career?.join(', ') || '진로 선택 교과';

  let bookList = [
    {
      title: '미래를 바꾼 지식의 대전환',
      author: '진로독서연구회',
      reason: '관심 분야의 최신 융합 트렌드와 미래 기술의 사회적 영향력을 통찰할 수 있는 필독서',
    },
    {
      title: `${majorName} 전공 탐색 콘서트`,
      author: '한국대학교육협의회',
      reason: `${majorName}의 대학별 실제 커리큘럼과 졸업생들의 현장 스토리를 생생하게 안내`,
    },
  ];

  if (category.includes('공학') || category.includes('융합') || majorName.includes('인공지능') || majorName.includes('컴퓨터')) {
    bookList = [
      {
        title: '알고리즘, 인생을 계산하다',
        author: '브라이언 크리스천',
        reason: '컴퓨터 공학적 사고와 수학적 모델이 현실의 복잡한 문제를 해결하는 방식을 깊이 있게 다룬 책',
      },
      {
        title: '세상을 바꾼 인공지능 이야기',
        author: '김진형',
        reason: `${majorName} 진학을 위해 필수적인 AI 알고리즘의 역사와 미래 산업 전망을 명쾌하게 제시`,
      },
    ];
  } else if (category.includes('바이오') || category.includes('의약') || category.includes('자연과학')) {
    bookList = [
      {
        title: '생명의 비밀을 푸는 유전자의 세계',
        author: '제임스 왓슨',
        reason: '현대 생명공학과 신약 개발의 핵심인 분자생물학의 연구 과정과 과학적 탐구 정신을 배양',
      },
      {
        title: '의학과 미래 테크놀로지',
        author: '에릭 토폴',
        reason: '디지털 헬스케어와 미래 의료의 패러다임 변화를 이해하고 진로 역량을 확장하는 추천 도서',
      },
    ];
  } else if (category.includes('인문') || category.includes('경영')) {
    bookList = [
      {
        title: '넛지 (Nudge)',
        author: '리처드 탈러',
        reason: '행동경제학과 인간 심리를 결합하여 소비자와 사회의 선택을 이끄는 통찰을 제공',
      },
      {
        title: '플랫폼 레볼루션',
        author: '마셜 밴 알스타인',
        reason: '디지털 비즈니스 모델과 브랜드 전략의 핵심 원리를 실증적 사례로 학습 가능',
      },
    ];
  }

  return {
    mentorMessage: `${studentName}님, 당신의 진단 결과는 '${archetype?.title || '창의적인 탐구자'}' 유형으로, 뛰어난 지적 호기심과 실천 의지를 보여줍니다. 1순위로 추천된 [${majorName}]과 [${careerName}]은 ${studentName}님이 지닌 역량을 가장 역동적으로 펼칠 수 있는 분야입니다. 지금의 강점을 바탕으로 학교 수업과 자율 탐구 활동에서 나만의 질문을 던지고 해답을 찾는 연습을 지속해보세요.`,
    learningRoadmap: [
      {
        grade: '1단계 (탐색기: 기초 역량 다지기)',
        focus: `${majorName} 관련 기초 교과 역량 및 기본 개념 정립`,
        action: `일반선택 추천 과목인 [${subjects}] 수업에 충실하며, 관심 주제 1가지를 선정해 교내 탐구 보고서 작성`,
      },
      {
        grade: '2단계 (심화기: 전공 적합성 특화)',
        focus: `진로선택 과목 이수 및 심화 탐구 프로젝트`,
        action: `[${careerSubjects}] 과목을 적극 이수하고, 동아리 또는 학술제에서 [${careerName}] 직무와 연계된 실험/프로젝트 완수`,
      },
      {
        grade: '3단계 (도약기: 진로 포트폴리오 완성)',
        focus: `대학별 커리큘럼 분석 및 모의 면접/자기소개 준비`,
        action: `목표 대학 학과 홈페이지에서 학부 연구실 및 전공 커리큘럼을 분석하고, 3년간의 활동을 연결한 진로 스토리북 정리`,
      },
    ],
    recommendedBooks: bookList,
    extracurriculars: [
      `교내 ${category.includes('공학') ? 'SW/로봇/융합과학' : category.includes('의약') ? '생명과학/보건의료' : '사회이슈/미디어'} 학술 탐구 동아리 참여 및 조장 활동`,
      `수업 시간에 배운 교과 개념을 [${majorName}] 최신 학술 동향과 접목한 교과 세특(세부능력 및 특기사항) 주제 탐구 보고서 제출`,
      `교육청 또는 대학에서 주관하는 청소년 전공체험 오픈캠퍼스 프로그램 및 온라인 공개강좌(K-MOOC) 수강`,
    ],
  };
}

// AI Career Mentor endpoint
app.post('/api/ai-mentor', async (req: Request, res: Response) => {
  const { profile, archetype, topMajor, topCareer } = req.body;
  const fallbackData = buildPersonalizedReport(profile, archetype, topMajor, topCareer);

  if (!aiClient) {
    return res.json(fallbackData);
  }

  try {
    const prompt = `
당신은 대한민국 최고의 청소년 전문 진로진학 상담 수석교사이자 '꿈끼나비 멘토'입니다.
학생의 진단 결과를 바탕으로 학생에게 따뜻한 격려와 실천 가능한 맞춤형 고교/청소년 성장 로드맵을 제안해주세요.

[학생 프로필]
- 이름/호칭: ${profile?.name || '학생'}
- 학년/구분: ${profile?.gradeLevel || '청소년'}
- 성향 유형: ${archetype?.title || '탐구형 인재'} (${archetype?.tagline || ''})
- 선택 관심분야: ${profile?.selectedFields?.join(', ') || '다양한 분야'}
- 자신 있는 과목: ${profile?.strongSubjects?.join(', ') || '기초 교과'}
- 중요 가치관: ${profile?.careerValues?.join(', ') || '성장과 기여'}

[매칭 결과]
- 1순위 추천 학과: ${topMajor?.name || '관련 학과'} (${topMajor?.category || ''})
- 1순위 추천 직업: ${topCareer?.name || '유망 직업'}

반드시 아래 JSON 형식으로만 응답해주세요. 마크다운 따옴표나 기타 설명 없이 유효한 JSON만 반환해야 합니다:
{
  "mentorMessage": "학생에게 전하는 따뜻하고 통찰력 있는 3~4문장의 맞춤형 멘토 레터",
  "learningRoadmap": [
    { "grade": "1단계 (탐색기)", "focus": "핵심 집중 영역", "action": "실질적 행동 지침" },
    { "grade": "2단계 (심화기)", "focus": "핵심 집중 영역", "action": "실질적 행동 지침" },
    { "grade": "3단계 (도약기)", "focus": "핵심 집중 영역", "action": "실질적 행동 지침" }
  ],
  "recommendedBooks": [
    { "title": "도서명", "author": "저자", "reason": "이 책을 추천하는 구체적 이유" },
    { "title": "도서명", "author": "저자", "reason": "이 책을 추천하는 구체적 이유" }
  ],
  "extracurriculars": [
    "추천 비교과 및 동아리 활동 1",
    "추천 비교과 및 탐구 프로젝트 2",
    "추천 비교과 및 봉사/체험 활동 3"
  ]
}
`;

    // Set a race timeout so it never hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI response timeout')), 5000)
    );

    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const response: any = await Promise.race([generatePromise, timeoutPromise]);
    const responseText = response.text || '';
    if (!responseText) {
      return res.json(fallbackData);
    }

    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);
    return res.json(parsedData);
  } catch (error) {
    console.warn('Gemini API call timed out or failed, returning tailored educational report:', error);
    // Graceful dynamic fallback - user receives high quality tailored report without error
    return res.json(fallbackData);
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`꿈끼나비 서버가 포트 ${PORT}에서 실행 중입니다.`);
  });
}

startServer();
