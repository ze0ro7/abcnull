"use client"

import Link from "next/link"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
      <p className="text-muted-foreground mt-1">Start practicing PYQs and mocks.</p>

      <SignupForm />

      <p className="text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link className="underline underline-offset-4" href="/auth/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}
