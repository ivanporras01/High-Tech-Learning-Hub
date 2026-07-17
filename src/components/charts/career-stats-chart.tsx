"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { CAREER_PATHS, WORKFORCE_STATS } from "@/lib/data/workforce";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function CareerSalaryChart() {
  const data = {
    labels: CAREER_PATHS.map((p) => p.title.replace("Quantum ", "")),
    datasets: [
      {
        label: "Min Salary (USD)",
        data: CAREER_PATHS.map((p) => p.salaryRange.min / 1000),
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
      {
        label: "Max Salary (USD)",
        data: CAREER_PATHS.map((p) => p.salaryRange.max / 1000),
        backgroundColor: "rgba(34, 211, 238, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Quantum Role Salary Ranges (USD thousands / year)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "$ thousands" },
      },
    },
  };

  return (
    <div className="h-72 w-full" role="img" aria-label="Bar chart of quantum career salary ranges">
      <Bar data={data} options={options} />
    </div>
  );
}

export function WorkforceGrowthChart() {
  const data = {
    labels: ["Software", "Applications", "Cloud/DevOps", "Architecture", "Security"],
    datasets: [
      {
        label: "Estimated Open Roles",
        data: [3200, 2100, 1400, 900, 900],
        backgroundColor: [
          "rgba(124, 58, 237, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 211, 238, 0.8)",
          "rgba(217, 70, 239, 0.8)",
        ],
      },
    ],
  };

  return (
    <div className="h-64 w-full" role="img" aria-label="Doughnut chart of quantum role distribution">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `~${WORKFORCE_STATS.openRolesEstimate.toLocaleString()} Global Open Roles (Est.)`,
            },
          },
        }}
      />
    </div>
  );
}
