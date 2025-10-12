"use client"

import Link from "next/link"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="text-muted-foreground mt-1">Sign in to continue your preparation.</p>

      <LoginForm />

      <p className="text-sm text-muted-foreground mt-4">
        New to Qprep?{" "}
        <Link className="underline underline-offset-4" href="/auth/signup">
          Create an account
        </Link>
      </p>
    </div>
  )
}
