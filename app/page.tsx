"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Users, Stethoscope, AlertCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const mockCounselors = [
  {
    id: 1,
    name: "Dr. Amaka Okonkwo",
    specialty: ["Depression", "Anxiety", "Trauma"],
    rate: "₦4,500",
    rating: 4.8,
    reviews: 124,
    image: "/professional-headshot-woman-therapist.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Dr. Chidi Nwankwo",
    specialty: ["Family Therapy", "Grief Support", "Life Transitions"],
    rate: "₦5,000",
    rating: 4.9,
    reviews: 156,
    image: "/professional-headshot-man-counselor.jpg",
    online: true,
  },
  {
    id: 3,
    name: "Fatima Ibrahim",
    specialty: ["Teen Issues", "Academic Stress", "Anxiety"],
    rate: "₦3,500",
    rating: 4.7,
    reviews: 98,
    image: "/professional-headshot-woman-counselor.jpg",
    online: false,
  },
  {
    id: 4,
    name: "Dr. Ayodeji Adeyemi",
    specialty: ["Trauma", "PTSD", "Anxiety Disorders"],
    rate: "₦4,800",
    rating: 4.9,
    reviews: 142,
    image: "/professional-headshot-man-therapist.jpg",
    online: true,
  },
  {
    id: 5,
    name: "Zainab Hassan",
    specialty: ["Depression", "Relationship Issues", "Self-worth"],
    rate: "₦3,800",
    rating: 4.6,
    reviews: 87,
    image: "/professional-headshot-woman-psychologist.jpg",
    online: true,
  },
  {
    id: 6,
    name: "Dr. Emeka Obi",
    specialty: ["Career Counseling", "Stress Management", "Work-Life Balance"],
    rate: "₦4,200",
    rating: 4.8,
    reviews: 119,
    image: "/professional-headshot-man-psychologist.jpg",
    online: false,
  },
]

const trustIndicators = [
  { icon: AlertCircle, label: "Blockchain-Protected Privacy", color: "text-purple-600" },
  { icon: Clock, label: "24/7 AI Support", color: "text-teal-600" },
  { icon: CheckCircle, label: "Licensed Professionals", color: "text-blue-600" },
]

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export default function LandingPage() {
  const [hoveredCounselor, setHoveredCounselor] = useState<number | null>(null)

  return (
    <div className="w-full bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">SafeSpace</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Your Safe Space to Heal,{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Anonymously
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Connect with AI companions, supportive communities, and licensed counselors. Your journey to wellness
              starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
              >
                <AlertCircle className="w-4 h-4 mr-2" />I Need Help Now
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border/40 hover:border-border/60 transition-colors"
                >
                  <Icon className={`w-5 h-5 ${indicator.color}`} />
                  <span className="text-sm font-medium text-foreground">{indicator.label}</span>
                </div>
              )
            })}
          </div>

          {/* Floating Chatbot Icon */}
          <div className="fixed bottom-8 right-8 z-40">
            <button className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors animate-gentle-pulse">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Support System Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Three-Tier Support System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "AI Companion",
                description: "Chat with an empathetic AI available 24/7 for immediate support and coping strategies.",
              },
              {
                icon: Users,
                title: "Peer Community",
                description: "Connect with others on similar journeys, share experiences, and find belonging.",
              },
              {
                icon: Stethoscope,
                title: "Licensed Counselors",
                description: "Book sessions with verified professionals specializing in your specific concerns.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-8 border border-border/40 hover:border-primary/40 transition-colors">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Counselors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Featured Licensed Counselors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCounselors.map((counselor) => (
              <Card
                key={counselor.id}
                className="p-6 border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all"
                onMouseEnter={() => setHoveredCounselor(counselor.id)}
                onMouseLeave={() => setHoveredCounselor(null)}
              >
                {/* Profile Image */}
                <div className="relative mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={counselor.image || "/placeholder.svg"}
                      alt={counselor.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                    />
                    {counselor.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                </div>

                {/* Counselor Info */}
                <h3 className="text-lg font-semibold text-foreground text-center mb-1">{counselor.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-3">{counselor.specialty[0]}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {counselor.rating} ({counselor.reviews})
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {counselor.specialty.slice(0, 2).map((spec, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Rate */}
                <p className="text-lg font-semibold text-foreground text-center mb-4">{counselor.rate}/session</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Profile
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90">Book Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Healing Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands who've found support, hope, and healing on SafeSpace.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Create Your Account Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">SafeSpace</span>
              </div>
              <p className="text-sm text-muted-foreground">Your safe space to heal, anonymously.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Counselors", "Communities", "Pricing"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Resources", links: ["Crisis Help", "FAQ", "Privacy", "Terms"] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 SafeSpace. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0">
              If you're in crisis, please call <span className="font-semibold">911</span> or text{" "}
              <span className="font-semibold">988</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
