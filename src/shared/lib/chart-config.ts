// shared/lib/chart-config.ts

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// 모든 필요한 컴포넌트와 플러그인 등록
Chart.register(...registerables, ChartDataLabels);
