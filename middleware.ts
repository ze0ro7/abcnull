import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          res.cookies.set({ name, value, ...options })
        },
        remove: (name: string, options: any) => {
          res.cookies.set({ name, value: "", ...options })
        },
      },
    },
  )

  // Touch auth to ensure cookies refresh when needed
  await supabase.auth.getUser().catch(() => {})
  return res
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|images/|public/|api/public).*)"],
}
