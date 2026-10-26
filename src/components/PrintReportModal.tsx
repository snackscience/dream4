import React, { useRef } from 'react';
import { X, Printer, Download, FileText, ExternalLink, Check, Copy, Sparkles, BookOpen } from 'lucide-react';
import { DiagnosticResult } from '../types/career';

interface PrintReportModalProps {
  result: DiagnosticResult;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const topMajor = result.matchedMajors[0];
  const topCareer = result.matchedCareers[0];

  // Generate complete self-contained A4-printable HTML document
  const generatePrintableHtml = () => {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>꿈끼나비 진로·학과 매칭 진단 결과 리포트 - ${result.profile.name}</title>
  <style>
    @page { size: A4; margin: 18mm 15mm; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      margin: 0;
      padding: 20px;
      background: #ffffff;
      font-size: 13px;
    }
    .header {
      border-bottom: 3px double #4338ca;
      padding-bottom: 14px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .title {
      font-size: 22px;
      font-weight: 800;
      color: #1e1b4b;
      margin: 0 0 6px 0;
    }
    .subtitle {
      font-size: 13px;
      color: #4f46e5;
      font-weight: 600;
      margin: 0;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .meta-table th, .meta-table td {
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      text-align: left;
    }
    .meta-table th {
      background-color: #f1f5f9;
      font-weight: bold;
      color: #334155;
      width: 18%;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #312e81;
      border-left: 4px solid #4f46e5;
      padding-left: 8px;
      margin: 18px 0 10px 0;
    }
    .card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      background: #fafafa;
    }
    .card h4 {
      margin: 0 0 6px 0;
      font-size: 14px;
      color: #0f172a;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
      background: #e0e7ff;
      color: #3730a3;
      margin-right: 4px;
      margin-bottom: 4px;
    }
    .badge-green {
      background: #dcfce7;
      color: #166534;
    }
    .riasec-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      margin-bottom: 16px;
      text-align: center;
    }
    .riasec-box {
      border: 1px solid #cbd5e1;
      padding: 8px 4px;
      border-radius: 6px;
      background: #f8fafc;
    }
    .riasec-val {
      font-size: 16px;
      font-weight: bold;
      color: #4f46e5;
      display: block;
    }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">꿈끼나비 진로·학과 적성 진단 종합 보고서</h1>
      <p class="subtitle">나의 흥미와 성격으로 찾는 맞춤형 대학 학과 & 유망 직업 내비게이터</p>
    </div>
    <div style="text-align: right; font-size: 11px; color: #64748b;">
      발행일시: ${result.createdAt}<br>
      관리번호: ${result.id}
    </div>
  </div>

  <table class="meta-table">
    <tr>
      <th>학생 성명</th>
      <td><strong>${result.profile.name}</strong> (${result.profile.gradeLevel})</td>
      <th>진로 성향 유형</th>
      <td><strong>${result.archetype.title}</strong> (RIASEC: ${result.archetype.code})</td>
    </tr>
    <tr>
      <th>선택 관심 분야</th>
      <td>${result.profile.selectedFields.join(', ')}</td>
      <th>자신 있는 과목</th>
      <td>${result.profile.strongSubjects.join(', ')}</td>
    </tr>
    <tr>
      <th>성향 슬로건</th>
      <td colspan="3">"${result.archetype.tagline}" - ${result.archetype.description}</td>
    </tr>
  </table>

  <div class="section-title">1. 홀랜드(RIASEC) 6대 직업적성 영역별 점수 분포</div>
  <div class="riasec-grid">
    <div class="riasec-box"><small>현실형(R)</small><span class="riasec-val">${result.riasecScores.R}%</span></div>
    <div class="riasec-box"><small>탐구형(I)</small><span class="riasec-val">${result.riasecScores.I}%</span></div>
    <div class="riasec-box"><small>예술형(A)</small><span class="riasec-val">${result.riasecScores.A}%</span></div>
    <div class="riasec-box"><small>사회형(S)</small><span class="riasec-val">${result.riasecScores.S}%</span></div>
    <div class="riasec-box"><small>진취형(E)</small><span class="riasec-val">${result.riasecScores.E}%</span></div>
    <div class="riasec-box"><small>관습형(C)</small><span class="riasec-val">${result.riasecScores.C}%</span></div>
  </div>

  <div class="section-title">2. 적합도 1순위 추천 대학 학과: ${topMajor?.name} (적합도 ${topMajor?.matchScore}%)</div>
  <div class="card" style="margin-bottom: 14px;">
    <h4>${topMajor?.name} (${topMajor?.category})</h4>
    <p style="margin: 4px 0 8px 0; color: #475569;">${topMajor?.description}</p>
    <div style="font-size: 12px; margin-bottom: 6px;">
      <strong>📘 고교 권장 일반선택:</strong>
      ${topMajor?.recommendedSubjects.general.map((s) => `<span class="badge">${s}</span>`).join('')}
    </div>
    <div style="font-size: 12px; margin-bottom: 6px;">
      <strong>📗 고교 권장 진로선택:</strong>
      ${topMajor?.recommendedSubjects.career.map((s) => `<span class="badge badge-green">${s}</span>`).join('')}
    </div>
    <div style="font-size: 12px;">
      <strong>🎯 필수 핵심 역량:</strong> ${topMajor?.coreCompetencies.join(', ')}
    </div>
  </div>

  <div class="section-title">3. 적합도 1순위 추천 유망 직업: ${topCareer?.name} (적합도 ${topCareer?.matchScore}%)</div>
  <div class="card" style="margin-bottom: 14px;">
    <h4>${topCareer?.name} (${topCareer?.category})</h4>
    <p style="margin: 4px 0 6px 0; color: #475569;">${topCareer?.summary}</p>
    <div style="font-size: 12px; margin-bottom: 4px;">
      <strong>💰 예상 평균 연봉대:</strong> ${topCareer?.prospect.avgSalaryRange} &nbsp;|&nbsp;
      <strong>⭐ 직업 만족도:</strong> ${topCareer?.prospect.satisfactionRate} &nbsp;|&nbsp;
      <strong>📈 성장 전망:</strong> ${topCareer?.prospect.prospectText}
    </div>
    <div style="font-size: 12px;">
      <strong>💼 주요 수행 업무:</strong> ${topCareer?.duties.slice(0, 3).join(' / ')}
    </div>
  </div>

  <div class="section-title">4. 2022/2015 개정 교육과정 고교 선택과목 맞춤 이수 로드맵</div>
  <table class="meta-table">
    <tr>
      <th style="width: 25%;">일반선택 추천 과목</th>
      <td>${result.recommendedSubjects.general.join(', ')}</td>
    </tr>
    <tr>
      <th>진로선택 추천 과목</th>
      <td>${result.recommendedSubjects.career.join(', ')}</td>
    </tr>
  </table>

  ${
    result.aiMentorReport
      ? `
  <div class="section-title">5. AI 진로진학 수석 멘토 맞춤 조언</div>
  <div class="card">
    <p style="margin: 0 0 8px 0; font-style: italic;">"${result.aiMentorReport.mentorMessage}"</p>
    <div style="font-size: 12px;">
      <strong>📚 추천 연계 도서:</strong>
      ${result.aiMentorReport.recommendedBooks.map((b) => `${b.title}(${b.author})`).join(', ')}
    </div>
  </div>
  `
      : ''
  }

  <div class="footer">
    본 리포트는 교육부 2022/2015 개정 교육과정 및 홀랜드 직업적성(RIASEC) 이론을 바탕으로 꿈끼나비 내비게이터에서 발행되었습니다.
  </div>
</body>
</html>`;
  };

  // Direct Browser Print (works in standard browsers)
  const handleDirectPrint = () => {
    try {
      window.print();
    } catch (e) {
      handleOpenInNewWindow();
    }
  };

  // Standalone Popup Window Print (Bypasses iframe sandbox restrictions completely!)
  const handleOpenInNewWindow = () => {
    const htmlContent = generatePrintableHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    } else {
      // If popup blocked, download as file
      handleDownloadHtml();
    }
  };

  // Download printable HTML file
  const handleDownloadHtml = () => {
    const htmlContent = generatePrintableHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `꿈끼나비_진단결과_${result.profile.name || '학생'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download plain text report
  const handleDownloadTxt = () => {
    const textReport = `=====================================================
[꿈끼나비 진로·학과 적성 진단 종합 보고서]
=====================================================
발행일시: ${result.createdAt}
학생 성명: ${result.profile.name} (${result.profile.gradeLevel})
진로 유형: ${result.archetype.title} (RIASEC: ${result.archetype.code})
슬로건: "${result.archetype.tagline}"

[성향 설명]
${result.archetype.description}

[홀랜드 RIASEC 6대 적성 백분율]
- 현실형(R): ${result.riasecScores.R}%
- 탐구형(I): ${result.riasecScores.I}%
- 예술형(A): ${result.riasecScores.A}%
- 사회형(S): ${result.riasecScores.S}%
- 진취형(E): ${result.riasecScores.E}%
- 관습형(C): ${result.riasecScores.C}%

[추천 대학 학과 Top 3]
1. ${result.matchedMajors[0]?.name} (${result.matchedMajors[0]?.category}) - 적합도 ${result.matchedMajors[0]?.matchScore}%
   - 개요: ${result.matchedMajors[0]?.summary}
   - 고교 일반선택: ${result.matchedMajors[0]?.recommendedSubjects.general.join(', ')}
   - 고교 진로선택: ${result.matchedMajors[0]?.recommendedSubjects.career.join(', ')}
   - 핵심역량: ${result.matchedMajors[0]?.coreCompetencies.join(', ')}
2. ${result.matchedMajors[1]?.name} - 적합도 ${result.matchedMajors[1]?.matchScore}%
3. ${result.matchedMajors[2]?.name} - 적합도 ${result.matchedMajors[2]?.matchScore}%

[추천 유망 직업 Top 3]
1. ${result.matchedCareers[0]?.name} (${result.matchedCareers[0]?.category}) - 적합도 ${result.matchedCareers[0]?.matchScore}%
   - 요약: ${result.matchedCareers[0]?.summary}
   - 평균 연봉: ${result.matchedCareers[0]?.prospect.avgSalaryRange}
   - 만족도: ${result.matchedCareers[0]?.prospect.satisfactionRate}
2. ${result.matchedCareers[1]?.name} - 적합도 ${result.matchedCareers[1]?.matchScore}%
3. ${result.matchedCareers[2]?.name} - 적합도 ${result.matchedCareers[2]?.matchScore}%

[2022/2015 개정 교육과정 고교 권장 과목]
- 일반선택: ${result.recommendedSubjects.general.join(', ')}
- 진로선택: ${result.recommendedSubjects.career.join(', ')}

${
  result.aiMentorReport
    ? `[AI 멘토 조언]
${result.aiMentorReport.mentorMessage}

[추천 도서]
${result.aiMentorReport.recommendedBooks.map((b) => `- ${b.title} (${b.author}): ${b.reason}`).join('\n')}
`
    : ''
}
꿈끼나비 (나만의 진로·학과 매칭 내비게이터)
=====================================================`;

    const blob = new Blob([textReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `꿈끼나비_진단결과_${result.profile.name || '학생'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50 dark:bg-slate-800/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Printer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              진단 결과 인쇄 및 PDF 저장
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              학교 상담 자료, 학부모 상담용 포트폴리오로 인쇄하거나 파일로 다운로드할 수 있습니다.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons Bar */}
        <div className="px-6 py-3 bg-indigo-50/70 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDirectPrint}
              className="px-3.5 py-1.5 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              브라우저 인쇄
            </button>

            <button
              onClick={handleOpenInNewWindow}
              className="px-3.5 py-1.5 font-semibold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 border border-indigo-200 dark:border-indigo-800 rounded-xl transition-colors flex items-center gap-1.5"
              title="아이프레임 제약 없이 독립 새 탭에서 즉시 인쇄"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              새 탭에서 인쇄 (권장)
            </button>

            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-1.5 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              A4 서식 HTML 다운로드
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              텍스트 다운로드
            </button>
          </div>
        </div>

        {/* Printable Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-100 dark:bg-slate-950">
          <div
            ref={reportRef}
            className="max-w-2xl mx-auto p-6 sm:p-8 bg-white text-slate-900 rounded-2xl shadow-sm border border-slate-200 text-xs"
          >
            {/* Report Header */}
            <div className="border-b-2 border-indigo-900 pb-3 mb-5 flex justify-between items-end">
              <div>
                <h1 className="text-xl font-extrabold text-indigo-950 tracking-tight">
                  꿈끼나비 진로·학과 적성 진단 종합 보고서
                </h1>
                <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                  나의 흥미와 성격으로 찾는 맞춤형 대학 학과 & 유망 직업 내비게이터
                </p>
              </div>
              <div className="text-right text-[10px] text-slate-400">
                발행일시: {result.createdAt}<br />
                발행인: 꿈끼나비
              </div>
            </div>

            {/* Profile Meta Table */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 text-[11px]">
              <div>
                <span className="text-slate-500 font-semibold">학생 성명: </span>
                <strong className="text-slate-900">{result.profile.name}</strong> ({result.profile.gradeLevel})
              </div>
              <div>
                <span className="text-slate-500 font-semibold">진로 유형: </span>
                <strong className="text-indigo-700">{result.archetype.title}</strong> (RIASEC {result.archetype.code})
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200/60 text-slate-700">
                <span className="text-slate-500 font-semibold">성향 슬로건: </span>
                "{result.archetype.tagline}" - {result.archetype.description}
              </div>
            </div>

            {/* RIASEC Grid */}
            <div className="mb-5">
              <h2 className="text-xs font-bold text-indigo-900 mb-2 border-l-3 border-indigo-600 pl-2">
                1. 홀랜드 6대 직업적성 영역별 점수
              </h2>
              <div className="grid grid-cols-6 gap-1.5 text-center">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">현실(R)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.R}%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">탐구(I)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.I}%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">예술(A)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.A}%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">사회(S)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.S}%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">진취(E)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.E}%</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">관습(C)</span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">{result.riasecScores.C}%</span>
                </div>
              </div>
            </div>

            {/* Matched Major */}
            <div className="mb-5">
              <h2 className="text-xs font-bold text-indigo-900 mb-2 border-l-3 border-indigo-600 pl-2">
                2. 1순위 추천 대학 학과: {topMajor?.name} (적합도 {topMajor?.matchScore}%)
              </h2>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                <p className="text-slate-700">{topMajor?.description}</p>
                <div>
                  <strong className="text-indigo-900">📘 권장 일반선택:</strong> {topMajor?.recommendedSubjects.general.join(', ')}
                </div>
                <div>
                  <strong className="text-emerald-900">📗 권장 진로선택:</strong> {topMajor?.recommendedSubjects.career.join(', ')}
                </div>
                <div>
                  <strong className="text-slate-900">🎯 핵심 역량:</strong> {topMajor?.coreCompetencies.join(' · ')}
                </div>
              </div>
            </div>

            {/* Matched Career */}
            <div className="mb-5">
              <h2 className="text-xs font-bold text-indigo-900 mb-2 border-l-3 border-indigo-600 pl-2">
                3. 1순위 추천 유망 직업: {topCareer?.name} (적합도 {topCareer?.matchScore}%)
              </h2>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                <p className="text-slate-700">{topCareer?.summary}</p>
                <div className="text-slate-600">
                  <strong>예상 평균 연봉:</strong> {topCareer?.prospect.avgSalaryRange} &nbsp;|&nbsp;
                  <strong>만족도:</strong> {topCareer?.prospect.satisfactionRate}
                </div>
                <div className="text-slate-600">
                  <strong>주요 업무:</strong> {topCareer?.duties.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>

            {/* High school roadmap */}
            <div className="mb-5">
              <h2 className="text-xs font-bold text-indigo-900 mb-2 border-l-3 border-indigo-600 pl-2">
                4. 고교학점제 선택과목 종합 권장표
              </h2>
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px] space-y-1">
                <div>
                  <strong>일반선택 추천:</strong> {result.recommendedSubjects.general.join(', ')}
                </div>
                <div>
                  <strong>진로선택 추천:</strong> {result.recommendedSubjects.career.join(', ')}
                </div>
              </div>
            </div>

            {/* AI Mentor Advice snippet if present */}
            {result.aiMentorReport && (
              <div className="mb-4">
                <h2 className="text-xs font-bold text-indigo-900 mb-2 border-l-3 border-indigo-600 pl-2">
                  5. AI 진로진학 수석 멘토 종합 소견
                </h2>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1.5">
                  <p className="italic text-slate-700">"{result.aiMentorReport.mentorMessage}"</p>
                  <div>
                    <strong>추천 도서:</strong> {result.aiMentorReport.recommendedBooks.map((b) => `${b.title}(${b.author})`).join(', ')}
                  </div>
                </div>
              </div>
            )}

            <div className="text-center pt-3 border-t border-slate-200 text-[10px] text-slate-400">
              꿈끼나비 (나만의 진로·학과 매칭 내비게이터) · 대한민국 교육부 2022/2015 개정 교육과정 기준
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
