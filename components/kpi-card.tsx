"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { KpiDefinition } from "@/lib/dashboard-data"
import { formatChange, formatValue } from "@/lib/dashboard-data"
import { Info } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"

function SparklineTooltipContent({
  active,
  payload,
  format,
}: {
  active?: boolean
  payload?: Array<{ payload: { monthFull: string; value: number } }>
  format: KpiDefinition["format"]
}) {
  if (!active || !payload || payload.length === 0) return null
  const data = payload[0].payload
  return (
    <div className="rounded-md bg-foreground px-3 py-1.5 text-xs text-background">
      {data.monthFull}: {formatValue(data.value, format)}
    </div>
  )
}

export function KpiCard({ kpi }: { kpi: KpiDefinition }) {
  const change = kpi.currentValue - kpi.lastYearValue
  const changeStr = formatChange(kpi.currentValue, kpi.lastYearValue, kpi.format)
  const hasMultiMeta = kpi.footerMeta.length > 1

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="gap-1 px-5 pt-5 pb-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {kpi.title}
          </CardTitle>
          {hasMultiMeta && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="ml-2 shrink-0 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                    aria-label={`More info about ${kpi.title}`}
                  >
                    <Info className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-64">
                  <ul className="flex flex-col gap-1">
                    {kpi.footerMeta.map((meta) => (
                      <li key={meta}>{meta}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5 pt-2 pb-0">
        {/* Primary value */}
        <p className="text-3xl font-semibold tracking-tight text-foreground">
          {formatValue(kpi.currentValue, kpi.format)}
        </p>

        {/* Comparison row */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            Last Year:{" "}
            <span className="font-medium text-foreground">
              {formatValue(kpi.lastYearValue, kpi.format)}
            </span>
          </span>
          <span className="text-muted-foreground">
            Change:{" "}
            <span className="font-medium text-foreground">
              {change > 0 ? "+" : ""}
              {changeStr.replace(/^\+/, "")}
              {change > 0 && changeStr.charAt(0) !== "+" ? "" : ""}
            </span>
          </span>
        </div>

        {/* Sparkline */}
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={kpi.trend}
              margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${kpi.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="oklch(0.398 0.07 227.392)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.398 0.07 227.392)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <RechartsTooltip
                content={({ active, payload }) => (
                  <SparklineTooltipContent
                    active={active}
                    payload={
                      payload as Array<{
                        payload: { monthFull: string; value: number }
                      }>
                    }
                    format={kpi.format}
                  />
                )}
                cursor={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.398 0.07 227.392)"
                strokeWidth={1.5}
                fill={`url(#gradient-${kpi.key})`}
                dot={false}
                activeDot={{
                  r: 3,
                  fill: "oklch(0.398 0.07 227.392)",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-2 pb-4">
        <p className="text-xs text-muted-foreground/70">{kpi.footerMeta[0]}</p>
      </CardFooter>
    </Card>
  )
}
