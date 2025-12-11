"use client"

import { useState } from "react"
import { MessageCircle, Users, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const moods = [
  { emoji: "😢", label: "Sad", value: 1 },
  { emoji: "😟", label: "Anxious", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😊", label: "Great", value: 5 },
]

const mockCounselors = [
  {
    id: 1,
    name: "Dr. Amaka Okonkwo",
    specialty: "Depression & Anxiety",
    rate: "₦4,500",
    rating: 4.8,
    image: "/professional-headshot-woman-therapist.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Dr. Chidi Nwankwo",
    specialty: "Family Therapy",
    rate: "₦5,000",
    rating: 4.9,
    image: "/professional-headshot-man-counselor.jpg",
    online: true,
  },
  {
    id: 3,
    name: "Fatima Ibrahim",
    specialty: "Teen Issues",
    rate: "₦3,500",
    rating: 4.7,
    image: "/professional-headshot-woman-counselor.jpg",
    online: false,
  },
  {
    id: 4,
    name: "Dr. Ayodeji Adeyemi",
    specialty: "Trauma & PTSD",
    rate: "₦4,800",
    rating: 4.9,
    image: "/professional-headshot-man-therapist.jpg",
    online: true,
  },
]

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Hello QuietWarrior2847</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      {/* Mood Check-in */}
      <Card className="p-8 border border-border/40 bg-gradient-to-br from-primary/5 to-accent/5">
        <h2 className="text-xl font-semibold text-foreground mb-6">Daily Mood Check-in</h2>
        <div className="flex justify-between items-center max-w-md">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                selectedMood === mood.value
                  ? "bg-primary/20 scale-110"
                  : "hover:bg-primary/10 opacity-70 hover:opacity-100"
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs text-muted-foreground font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="mt-4 text-sm text-primary">Thank you for checking in. Remember, it's okay to feel this way.</p>
        )}
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: MessageCircle,
            title: "Talk to AI",
            description: "Chat with our empathetic companion",
            href: "/dashboard/chat",
            color: "from-primary/10 to-primary/5",
            iconColor: "text-primary",
          },
          {
            icon: Users,
            title: "Join Community",
            description: "Connect with others on similar journeys",
            href: "/dashboard/communities",
            color: "from-secondary/10 to-secondary/5",
            iconColor: "text-secondary",
          },
          {
            icon: Calendar,
            title: "Book Counselor",
            description: "Schedule a session with a professional",
            href: "/dashboard/counselors",
            color: "from-accent/10 to-accent/5",
            iconColor: "text-accent",
          },
          {
            icon: AlertCircle,
            title: "Crisis Support",
            description: "Get immediate emergency help",
            href: "#",
            color: "from-destructive/10 to-destructive/5",
            iconColor: "text-destructive",
          },
        ].map((action, index) => {
          const Icon = action.icon
          return (
            <Link href={action.href} key={index}>
              <Card
                className={`p-6 border border-border/40 bg-gradient-to-br ${action.color} hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer h-full`}
              >
                <Icon className={`w-8 h-8 ${action.iconColor} mb-3`} />
                <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Featured Counselors Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Featured Counselors</h2>
          <Link href="/dashboard/counselors">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCounselors.map((counselor) => (
            <Card
              key={counselor.id}
              className="p-4 border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative mb-3">
                  <img
                    src={counselor.image || "/placeholder.svg"}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  {counselor.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{counselor.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{counselor.specialty}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{counselor.rating}</span>
                </div>
                <p className="text-sm font-semibold text-foreground mb-3">{counselor.rate}/session</p>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Wellness Tips */}
      <Card className="p-6 border border-border/40 bg-card/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Today's Wellness Tip</h2>
        <p className="text-muted-foreground mb-4">
          "Taking just 5 minutes to practice deep breathing can significantly reduce anxiety. Try breathing in for 4
          counts, holding for 4, and breathing out for 4."
        </p>
        <Button variant="outline">Learn More</Button>
      </Card>
    </div>
  )
}
