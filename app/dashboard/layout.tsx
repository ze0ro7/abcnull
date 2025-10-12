import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerSupabase } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = getServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  // Pass basic user info to topbar
  const displayName = user.user_metadata?.full_name || user.email || "User"

  return (
    <div className="min-h-dvh grid grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Topbar name={displayName} />
      <main className="col-start-2 row-start-2 p-4 md:p-8">{children}</main>
    </div>
  )
}
