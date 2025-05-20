// shared/ui/charts/LineChart.tsx

"use client";

import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { ko } from "date-fns/locale";
import { format, parseISO } from "date-fns";

// Chart.js 등록
Chart.register(...registerables);

interface LineChartProps {
  data: Array<{ date: string; value: number }>;
  label: string;
  color: string;
  borderColor: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  height?: number;
  showValues?: boolean;
}

export function LineChart({
  data,
  label,
  color,
  borderColor,
  xAxisTitle,
  yAxisTitle,
  height = 300,
  showValues = true,
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 기존 차트 삭제
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // 새 차트 생성
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((item) => {
          // 날짜 형식인지 확인
          if (item.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return format(parseISO(item.date), "M/d (E)", { locale: ko });
          }
          // 날짜 형식이 아니면 그대로 반환 (주차 표시 등)
          return item.date;
        }),
        datasets: [
          {
            label,
            data: data.map((item) => item.value),
            backgroundColor: color,
            borderColor: borderColor,
            borderWidth: 2,
            tension: 0.1,
            fill: false,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `${label}: ${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: !!xAxisTitle,
              text: xAxisTitle,
            },
          },
          y: {
            title: {
              display: !!yAxisTitle,
              text: yAxisTitle,
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, label, color, borderColor, xAxisTitle, yAxisTitle, showValues]);

  return (
    <div style={{ height: `${height}px`, width: "100%" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
