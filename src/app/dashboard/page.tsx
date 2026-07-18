import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Scholar Dashboard",
  description: "Track your progress as a quantum workforce scholar.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
