import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ExecutiveSummaryProps {
  summary: string
  lastUpdated: string
}

export function ExecutiveSummary({
  summary,
  lastUpdated,
}: ExecutiveSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Executive Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground">{summary}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground/70">
          Last updated: {lastUpdated}
        </p>
      </CardFooter>
    </Card>
  )
}
