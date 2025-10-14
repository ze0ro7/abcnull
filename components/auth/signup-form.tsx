
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

type Exam = "GATE" | "SSC" | "JEE" | "NEET"
const GATE_BRANCHES = ["CE", "CHE", "CSE", "EE", "ECE", "ME"]

export default function SignupForm() {
  const router = useRouter()
  const supabase = getSupabaseBrowser()

  const [loading, setLoading] = React.useState(false)
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [exam, setExam] = React.useState<Exam>("GATE")
  const [branch, setBranch] = React.useState("")
  const [institution, setInstitution] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            (typeof window !== "undefined" ? window.location.origin : undefined),
          data: {
            full_name: fullName,
            exam,
            branch: exam === "GATE" ? branch || null : null,
            institution,
          },
        },
      })
      if (error) throw error

      router.replace("/dashboard")
    } catch (err: any) {
      console.error("[v0] signup error:", err?.message || err)
      alert(err?.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const isGate = exam === "GATE"

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="grid gap-2">
        <Label>Exam</Label>
        <Select value={exam} onValueChange={(v: Exam) => setExam(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GATE">GATE</SelectItem>
            <SelectItem value="SSC">SSC</SelectItem>
            <SelectItem value="JEE">JEE</SelectItem>
            <SelectItem value="NEET">NEET</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isGate && (
        <div className="grid gap-2">
          <Label>Branch (GATE)</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {GATE_BRANCHES.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="institution">School / College / University</Label>
        <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}
