// Types
export interface KpiSnapshot {
  month: string // "MMM YYYY" e.g. "Apr 2026"
  monthFull: string // "MMMM YYYY" e.g. "April 2026"
  value: number
}

export interface KpiDefinition {
  key: string
  title: string
  format: "integer" | "currency_no_cents" | "percent_whole"
  currentValue: number
  lastYearValue: number
  trend: KpiSnapshot[]
  footerMeta: string[]
}

export interface DashboardSection {
  id: string
  title: string
  description?: string
  kpis: KpiDefinition[]
}

export interface DashboardData {
  selectedMonth: string
  selectedMonthFull: string
  executiveSummary: string
  lastUpdated: string
  sections: DashboardSection[]
}

// Available months for the selector
export const availableMonths = [
  { value: "2026-04", label: "April 2026" },
  { value: "2026-03", label: "March 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-01", label: "January 2026" },
  { value: "2025-12", label: "December 2025" },
  { value: "2025-11", label: "November 2025" },
  { value: "2025-10", label: "October 2025" },
  { value: "2025-09", label: "September 2025" },
  { value: "2025-08", label: "August 2025" },
  { value: "2025-07", label: "July 2025" },
  { value: "2025-06", label: "June 2025" },
  { value: "2025-05", label: "May 2025" },
]

// Helpers
function generateTrend(
  baseValue: number,
  variance: number,
  trend: "up" | "down" | "flat" = "flat"
): KpiSnapshot[] {
  const months = [
    { month: "May 2025", monthFull: "May 2025" },
    { month: "Jun 2025", monthFull: "June 2025" },
    { month: "Jul 2025", monthFull: "July 2025" },
    { month: "Aug 2025", monthFull: "August 2025" },
    { month: "Sep 2025", monthFull: "September 2025" },
    { month: "Oct 2025", monthFull: "October 2025" },
    { month: "Nov 2025", monthFull: "November 2025" },
    { month: "Dec 2025", monthFull: "December 2025" },
    { month: "Jan 2026", monthFull: "January 2026" },
    { month: "Feb 2026", monthFull: "February 2026" },
    { month: "Mar 2026", monthFull: "March 2026" },
    { month: "Apr 2026", monthFull: "April 2026" },
  ]

  return months.map((m, i) => {
    const trendMultiplier =
      trend === "up" ? 1 + (i * 0.015) : trend === "down" ? 1 - (i * 0.01) : 1
    const noise = (Math.sin(i * 2.5) * variance) + (Math.cos(i * 1.3) * variance * 0.5)
    const value = Math.round(baseValue * trendMultiplier + noise)
    return { month: m.month, monthFull: m.monthFull, value }
  })
}

// Mock data for April 2026
export function getDashboardData(): DashboardData {
  return {
    selectedMonth: "Apr 2026",
    selectedMonthFull: "April 2026",
    executiveSummary:
      "April showed steady attendance with adult attendance tracking slightly above the same month last year. Total giving remained strong at $187,450 across all funds, with the number of active givers holding consistent. Group participation continues its upward trend, reaching 42% of average adult attendance. One baptism was celebrated this month, bringing the rolling 12-month total to 14.",
    lastUpdated: "April 7, 2026",
    sections: [
      {
        id: "attendance",
        title: "Attendance",
        description:
          "Monthly snapshot values with same-month-last-year comparison and rolling 12-month trends.",
        kpis: [
          {
            key: "adult_attendance",
            title: "Adult Attendance",
            format: "integer",
            currentValue: 412,
            lastYearValue: 389,
            trend: generateTrend(395, 18, "up"),
            footerMeta: ["Monthly snapshot"],
          },
          {
            key: "kids_attendance",
            title: "Kids Attendance",
            format: "integer",
            currentValue: 87,
            lastYearValue: 82,
            trend: generateTrend(84, 8, "up"),
            footerMeta: ["Monthly snapshot"],
          },
        ],
      },
      {
        id: "giving",
        title: "Giving",
        kpis: [
          {
            key: "total_giving_all_funds",
            title: "Total Giving (All Funds)",
            format: "currency_no_cents",
            currentValue: 187450,
            lastYearValue: 172300,
            trend: generateTrend(178000, 12000, "up"),
            footerMeta: ["Monthly snapshot"],
          },
          {
            key: "number_of_givers",
            title: "Number of Givers",
            format: "integer",
            currentValue: 198,
            lastYearValue: 185,
            trend: generateTrend(190, 10, "up"),
            footerMeta: ["Monthly snapshot"],
          },
          {
            key: "percent_of_givers",
            title: "Percent of Givers",
            format: "percent_whole",
            currentValue: 48,
            lastYearValue: 48,
            trend: generateTrend(47, 3, "flat"),
            footerMeta: [
              "Monthly snapshot",
              "Based on 4-week average adult attendance",
              "Number of givers divided by 4-week average adult attendance",
            ],
          },
        ],
      },
      {
        id: "engagement",
        title: "Engagement",
        kpis: [
          {
            key: "number_of_volunteers_active_90_days",
            title: "Number of Volunteers (Active 90 Days)",
            format: "integer",
            currentValue: 156,
            lastYearValue: 143,
            trend: generateTrend(148, 8, "up"),
            footerMeta: ["Active in last 90 days (snapshotted monthly)"],
          },
          {
            key: "percent_serving",
            title: "Percent Serving",
            format: "percent_whole",
            currentValue: 38,
            lastYearValue: 37,
            trend: generateTrend(37, 2, "flat"),
            footerMeta: [
              "Based on 4-week average adult attendance",
              "Number of volunteers divided by 4-week average adult attendance",
            ],
          },
          {
            key: "number_in_groups_active_90_days",
            title: "Number in Groups (Active 90 Days)",
            format: "integer",
            currentValue: 173,
            lastYearValue: 152,
            trend: generateTrend(160, 10, "up"),
            footerMeta: ["Active in last 90 days (snapshotted monthly)"],
          },
          {
            key: "percent_in_groups",
            title: "Percent in Groups",
            format: "percent_whole",
            currentValue: 42,
            lastYearValue: 39,
            trend: generateTrend(40, 2, "up"),
            footerMeta: [
              "Based on 4-week average adult attendance",
              "Number in groups divided by 4-week average adult attendance",
            ],
          },
          {
            key: "membership_total",
            title: "Membership (Total)",
            format: "integer",
            currentValue: 287,
            lastYearValue: 274,
            trend: generateTrend(278, 6, "up"),
            footerMeta: [
              "Monthly snapshot",
              "Binary membership status based on completed Belong class and signed covenant",
            ],
          },
          {
            key: "percent_membership",
            title: "Percent Membership",
            format: "percent_whole",
            currentValue: 70,
            lastYearValue: 70,
            trend: generateTrend(69, 3, "flat"),
            footerMeta: [
              "Based on 4-week average adult attendance",
              "Members divided by 4-week average adult attendance",
            ],
          },
        ],
      },
      {
        id: "outcomes",
        title: "Outcomes",
        kpis: [
          {
            key: "baptisms_rolling_12_months",
            title: "Baptisms (Rolling 12 Months)",
            format: "integer",
            currentValue: 14,
            lastYearValue: 11,
            trend: generateTrend(12, 2, "up"),
            footerMeta: ["Rolling 12-month total"],
          },
        ],
      },
    ],
  }
}

// Formatting utilities
export function formatValue(value: number, format: KpiDefinition["format"]): string {
  switch (format) {
    case "currency_no_cents":
      return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 })
    case "percent_whole":
      return value.toLocaleString("en-US", { maximumFractionDigits: 0 }) + "%"
    case "integer":
    default:
      return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
  }
}

export function formatChange(current: number, lastYear: number, format: KpiDefinition["format"]): string {
  const diff = current - lastYear
  const sign = diff > 0 ? "+" : ""
  switch (format) {
    case "currency_no_cents":
      return sign + "$" + Math.abs(diff).toLocaleString("en-US", { maximumFractionDigits: 0 })
    case "percent_whole":
      return sign + diff.toLocaleString("en-US", { maximumFractionDigits: 0 }) + " pts"
    case "integer":
    default:
      return sign + diff.toLocaleString("en-US", { maximumFractionDigits: 0 })
  }
}
