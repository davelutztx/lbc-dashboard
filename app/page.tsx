"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ExecutiveSummary } from "@/components/executive-summary"
import { KpiSection } from "@/components/kpi-section"
import { getDashboardData } from "@/lib/dashboard-data"

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-04")
  const data = getDashboardData()

  return (
    <div className="min-h-screen bg-muted/40">
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8">
          <DashboardHeader
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          <ExecutiveSummary
            summary={data.executiveSummary}
            lastUpdated={data.lastUpdated}
          />

          {data.sections.map((section) => (
            <KpiSection key={section.id} section={section} />
          ))}
        </div>
      </main>
    </div>
  )
}
