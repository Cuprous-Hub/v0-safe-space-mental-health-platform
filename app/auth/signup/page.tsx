"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react"

type Role = "user" | "listener" | "counselor" | null
type Step = "role-select" | "details" | "complete"

const generatedUsernames = [
  "SilentWarrior2847",
  "HopefulSoul1924",
  "QuietHealer5621",
  "MorningLight3847",
  "BraveHeart1092",
  "PeacefulMind4756",
  "StrongSoul2938",
  "LightBringer5847",
]

export default function SignUpPage() {
  const [role, setRole] = useState<Role>(null)
  const [step, setStep] = useState<Step>("role-select")
  const [showPassword, setShowPassword] = useState(false)
  const [isGeneratedUsername, setIsGeneratedUsername] = useState(false)
  const [generatedUsername, setGeneratedUsername] = useState("")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    username: "",
    agreeToGuidelines: false,
    // Counselor specific fields
    fullName: "",
    licenseNumber: "",
    bio: "",
    rate: "",
    specialties: [] as string[],
    languages: [] as string[],
  })

  const handleGenerateUsername = () => {
    const random = generatedUsernames[Math.floor(Math.random() * generatedUsernames.length)]
    setGeneratedUsername(random)
    setFormData({ ...formData, username: random })
    setIsGeneratedUsername(true)
  }

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole)
    setStep("details")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const specialtiesOptions = ["Depression", "Anxiety", "Trauma", "Family Therapy", "Teen Issues", "Grief Support"]
  const languagesOptions = ["English", "Spanish", "French", "Pidgin", "Hausa", "Yoruba"]

  const handleSignUp = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStep("complete")
  }

  if (step === "complete") {
    return (
      <Card className="w-full max-w-md p-8 border border-border/40">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to SafeSpace!</h2>
          <p className="text-muted-foreground mb-6">
            Your account has been created. Your identity is encrypted on blockchain - even we don't know who you are.
          </p>
          <Link href="/dashboard">
            <Button className="w-full bg-primary hover:bg-primary/90">Go to Dashboard</Button>
          </Link>
        </div>
      </Card>
    )
  }

  if (step === "role-select") {
    return (
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Choose Your Role</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "user" as const,
              title: "User (Seeking Support)",
              description: "Get access to AI companions, communities, and professional counselors",
              icon: "🤝",
            },
            {
              id: "listener" as const,
              title: "Volunteer Listener",
              description: "Support others in our peer communities and make a difference",
              icon: "👂",
            },
            {
              id: "counselor" as const,
              title: "Licensed Counselor",
              description: "Offer professional services to people seeking specialized help",
              icon: "👨‍⚕️",
            },
          ].map((roleOption) => (
            <Card
              key={roleOption.id}
              className="p-6 border border-border/40 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
              onClick={() => handleRoleSelect(roleOption.id)}
            >
              <div className="text-4xl mb-4">{roleOption.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{roleOption.title}</h3>
              <p className="text-muted-foreground text-sm">{roleOption.description}</p>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-lg p-8 border border-border/40">
      {/* Back Button */}
      <button
        onClick={() => setStep("role-select")}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        {role === "user" && "Create Your Account"}
        {role === "listener" && "Become a Volunteer Listener"}
        {role === "counselor" && "Register as a Counselor"}
      </h2>
      <p className="text-muted-foreground mb-6">
        {role === "user" && "Join SafeSpace to access support and find healing."}
        {role === "listener" && "Help others while growing yourself."}
        {role === "counselor" && "Bring your expertise to our platform."}
      </p>

      {/* Email & Password */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-input border border-border/40"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="bg-input border border-border/40"
          />
        </div>
      </div>

      {/* Age Confirmation */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Age (13+)</label>
        <Input
          type="number"
          name="age"
          placeholder="18"
          value={formData.age}
          onChange={handleInputChange}
          className="bg-input border border-border/40"
        />
      </div>

      {/* Anonymous Username */}
      {(role === "user" || role === "listener") && (
        <div className="mb-6 p-4 bg-card border border-border/40 rounded-lg">
          <h3 className="font-semibold text-foreground mb-4">Choose Your Anonymous Username</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Generate a unique name:</div>
              <Button
                variant="outline"
                onClick={handleGenerateUsername}
                className="w-full border border-border/40 hover:bg-primary/5 bg-transparent"
              >
                Generate for Me
              </Button>
              {generatedUsername && (
                <div className="p-2 bg-primary/10 rounded text-center text-sm font-medium text-primary">
                  {generatedUsername}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Or choose your own:</div>
              <Input
                type="text"
                name="username"
                placeholder="MyUsername"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isGeneratedUsername}
                className="bg-input border border-border/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* Counselor Specific Fields */}
      {role === "counselor" && (
        <div className="space-y-4 mb-6 p-4 bg-card border border-border/40 rounded-lg">
          <h3 className="font-semibold text-foreground mb-3">Professional Information</h3>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Legal Name</label>
            <Input
              type="text"
              name="fullName"
              placeholder="Dr. John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-input border border-border/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">License Number</label>
            <Input
              type="text"
              name="licenseNumber"
              placeholder="LIC-123456"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="bg-input border border-border/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Session Rate (₦)</label>
            <Input
              type="number"
              name="rate"
              placeholder="4500"
              value={formData.rate}
              onChange={handleInputChange}
              className="bg-input border border-border/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Specialties</label>
            <div className="flex flex-wrap gap-2">
              {specialtiesOptions.map((spec) => (
                <button
                  key={spec}
                  onClick={() => handleSpecialtyToggle(spec)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.specialties.includes(spec)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {languagesOptions.map((lang) => (
                <button
                  key={lang}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      languages: prev.languages.includes(lang)
                        ? prev.languages.filter((l) => l !== lang)
                        : [...prev.languages, lang],
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.languages.includes(lang)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio/About Me</label>
            <Textarea
              name="bio"
              placeholder="Tell people about your experience and approach..."
              value={formData.bio}
              onChange={handleInputChange}
              className="bg-input border border-border/40 min-h-20"
            />
          </div>

          <div className="p-3 bg-accent/10 rounded text-sm text-accent-foreground">
            Your profile will be public after verification
          </div>
        </div>
      )}

      {/* Agreement */}
      <div className="mb-6 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreeToGuidelines}
            onChange={(e) => setFormData({ ...formData, agreeToGuidelines: e.target.checked })}
            className="mt-1 w-4 h-4 rounded border border-border/40 text-primary"
          />
          <span className="text-sm text-muted-foreground">
            I agree to the community guidelines and terms of service
          </span>
        </label>

        {(role === "user" || role === "listener") && (
          <div className="p-3 bg-primary/10 rounded-lg text-sm text-primary">
            Your identity is encrypted on blockchain. Even we don't know who you are.
          </div>
        )}
      </div>

      {/* Sign Up Button */}
      <Button onClick={handleSignUp} disabled={loading} className="w-full bg-primary hover:bg-primary/90 mb-4">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {role === "counselor" ? "Submit for Verification" : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary hover:text-primary/80">
          Sign In
        </Link>
      </p>
    </Card>
  )
}
