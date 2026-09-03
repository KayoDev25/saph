import { Bell, Search } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { RiskMap } from "@/components/dashboard/risk-map"
import { ReportsTable } from "@/components/dashboard/reports-table"

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground text-balance">
              Sistema de Alerta y Prevención Hídrica
            </h1>
            <p className="text-xs text-muted-foreground">Panel de gestión municipal · Datos en tiempo real</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar barrio o reporte..."
                aria-label="Buscar"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="button"
              aria-label="Notificaciones"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-card" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">
            <KpiCards />
            <div className="grid gap-6 xl:grid-cols-2">
              <RiskMap />
              <ReportsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
