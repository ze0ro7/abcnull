import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function getSupabaseServer() {
  const store = cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return store.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        // Next.js supports mutating cookies via headers
        store.set(name, value, options)
      },
      remove(name: string, options: any) {
        store.set(name, "", { ...options, maxAge: 0 })
      },
    },
  })
  return supabase
}

export function getServerSupabase() {
  return getSupabaseServer()
}
