"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    window.location.href = "/dashboard"
  }

  return (
    <Card className="w-full max-w-md p-8 border border-border/40">
      <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
      <p className="text-muted-foreground mb-6">Sign in to your SafeSpace account</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input border border-border/40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <Link href="#" className="text-xs text-primary hover:text-primary/80">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border border-border/40 pr-10"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button onClick={handleSignIn} disabled={loading} className="w-full bg-primary hover:bg-primary/90 mb-4">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:text-primary/80">
          Sign Up
        </Link>
      </p>

      <div className="border-t border-border/40 mt-6 pt-6">
        <p className="text-xs text-center text-muted-foreground mb-4">
          Crisis? Call <span className="font-semibold">911</span> or text <span className="font-semibold">988</span>
        </p>
      </div>
    </Card>
  )
}
