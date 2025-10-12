"use client"

import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | undefined

export function getSupabaseBrowser() {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  client = createBrowserClient(url, anon)
  return client
}

export function getBrowserSupabase() {
  return getSupabaseBrowser()
}
