import { KpiCard } from "@/components/kpi-card"
import type { DashboardSection } from "@/lib/dashboard-data"

export function KpiSection({ section }: { section: DashboardSection }) {
  return (
    <section aria-labelledby={`section-${section.id}`}>
      <div className="flex flex-col gap-1 mb-4">
        <h2
          id={`section-${section.id}`}
          className="text-lg font-semibold text-foreground"
        >
          {section.title}
        </h2>
        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {section.kpis.map((kpi) => (
          <KpiCard key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </section>
  )
}
