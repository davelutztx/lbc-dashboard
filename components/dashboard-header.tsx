"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { availableMonths } from "@/lib/dashboard-data"

interface DashboardHeaderProps {
  selectedMonth: string
  onMonthChange: (value: string) => void
}

export function DashboardHeader({
  selectedMonth,
  onMonthChange,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Executive Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Monthly KPIs with rolling 12-month trends
        </p>
      </div>
      <div className="flex flex-col items-start gap-1.5 sm:items-end">
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-48" aria-label="Select month">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {availableMonths.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground/70">
          Snapshots are finalized on the 5th of each month.
        </p>
      </div>
    </header>
  )
}
