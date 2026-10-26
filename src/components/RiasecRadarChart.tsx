import React from 'react';
import { RiasecScores } from '../types/career';

interface RiasecRadarChartProps {
  scores: RiasecScores;
}

const AXIS_CONFIG = [
  { key: 'R', label: '현실형 (R)', sub: '기계·실용·실행', color: '#0284c7' },
  { key: 'I', label: '탐구형 (I)', sub: '학문·분석·원리', color: '#6366f1' },
  { key: 'A', label: '예술형 (A)', sub: '창의·표현·감각', color: '#ec4899' },
  { key: 'S', label: '사회형 (S)', sub: '소통·공감·협력', color: '#10b981' },
  { key: 'E', label: '진취형 (E)', sub: '리더십·기획·추진', color: '#f59e0b' },
  { key: 'C', label: '관습형 (C)', sub: '체계·정확·관리', color: '#64748b' },
];

export const RiasecRadarChart: React.FC<RiasecRadarChartProps> = ({ scores }) => {
  const size = 320;
  const center = size / 2;
  const radius = 110;
  const levels = [0.25, 0.5, 0.75, 1];

  // Calculate coordinates for a 6-pointed polygon
  const angleStep = (Math.PI * 2) / 6;
  const startAngle = -Math.PI / 2; // Start from top

  const getCoordinates = (value: number, index: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = AXIS_CONFIG.map((axis, i) => {
    const val = scores[axis.key as keyof RiasecScores] || 30;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
      {/* SVG Spider Chart */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric grid circles/polygons */}
          {levels.map((lvl, idx) => {
            const gridPoints = AXIS_CONFIG.map((_, i) => {
              const angle = startAngle + i * angleStep;
              const r = radius * lvl;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={idx}
                points={gridPoints}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
                strokeDasharray={idx === levels.length - 1 ? undefined : '3 3'}
              />
            );
          })}

          {/* Radial Axis lines */}
          {AXIS_CONFIG.map((_, i) => {
            const angle = startAngle + i * angleStep;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled radar area */}
          <polygon
            points={points}
            fill="rgba(99, 102, 241, 0.22)"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Data point dots and text labels */}
          {AXIS_CONFIG.map((axis, i) => {
            const val = scores[axis.key as keyof RiasecScores] || 30;
            const { x, y } = getCoordinates(val, i);

            // Label coordinate slightly outside
            const labelAngle = startAngle + i * angleStep;
            const labelR = radius + 24;
            const lx = center + labelR * Math.cos(labelAngle);
            const ly = center + labelR * Math.sin(labelAngle);

            return (
              <g key={axis.key}>
                <circle cx={x} cy={y} r="4.5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[11px] font-semibold fill-slate-700 dark:fill-slate-300"
                >
                  {axis.key} ({val}점)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Axis detail breakdown list */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AXIS_CONFIG.map((axis) => {
          const val = scores[axis.key as keyof RiasecScores] || 0;
          return (
            <div
              key={axis.key}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800/80"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {axis.label}
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {val}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${val}%`,
                    backgroundColor: axis.color,
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 truncate">
                {axis.sub}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
