"use client"

import { useRouter } from "next/navigation"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onLogout() {
    setLoading(true)
    try {
      const supabase = getBrowserSupabase()
      await supabase.auth.signOut()
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={onLogout} variant="ghost" className={className} disabled={loading}>
      <LogOut className="mr-2 h-4 w-4" />
      {loading ? "Signing out..." : "Logout"}
    </Button>
  )
}
