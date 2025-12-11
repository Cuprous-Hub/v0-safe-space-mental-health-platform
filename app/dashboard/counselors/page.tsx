"use client"

import { useState } from "react"
import { Search, Star, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const counselors = [
  {
    id: 1,
    name: "Dr. Amaka Okonkwo",
    specialty: "Depression & Anxiety",
    specialties: ["Depression", "Anxiety", "Trauma"],
    rate: 4500,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?key=j4akt",
    online: true,
    bio: "With over 10 years of clinical experience, I specialize in helping individuals overcome depression and anxiety.",
    languages: ["English", "Yoruba"],
    licenseNumber: "LIC-NG-2024-001",
  },
  {
    id: 2,
    name: "Dr. Chidi Nwankwo",
    specialty: "Family Therapy",
    specialties: ["Family Therapy", "Grief Support", "Life Transitions"],
    rate: 5000,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?key=3d86f",
    online: true,
    bio: "Specializing in family dynamics and relationship healing for 15 years.",
    languages: ["English", "Igbo"],
    licenseNumber: "LIC-NG-2024-002",
  },
  {
    id: 3,
    name: "Fatima Ibrahim",
    specialty: "Teen Issues",
    specialties: ["Teen Issues", "Academic Stress", "Anxiety"],
    rate: 3500,
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg?key=i9mub",
    online: false,
    bio: "Dedicated to supporting teenagers through emotional challenges and academic pressures.",
    languages: ["English", "Hausa"],
    licenseNumber: "LIC-NG-2024-003",
  },
  {
    id: 4,
    name: "Dr. Ayodeji Adeyemi",
    specialty: "Trauma & PTSD",
    specialties: ["Trauma", "PTSD", "Anxiety Disorders"],
    rate: 4800,
    rating: 4.9,
    reviews: 142,
    image: "/placeholder.svg?key=31ta9",
    online: true,
    bio: "Expert in trauma recovery with evidence-based therapeutic approaches.",
    languages: ["English", "Pidgin"],
    licenseNumber: "LIC-NG-2024-004",
  },
  {
    id: 5,
    name: "Zainab Hassan",
    specialty: "Self-Worth & Relationships",
    specialties: ["Depression", "Relationship Issues", "Self-worth"],
    rate: 3800,
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?key=rsxh3",
    online: true,
    bio: "Focused on building self-confidence and healthy relationships.",
    languages: ["English", "Arabic"],
    licenseNumber: "LIC-NG-2024-005",
  },
  {
    id: 6,
    name: "Dr. Emeka Obi",
    specialty: "Career Counseling",
    specialties: ["Career Counseling", "Stress Management", "Work-Life Balance"],
    rate: 4200,
    rating: 4.8,
    reviews: 119,
    image: "/professional-headshot-man-psychologist.jpg",
    online: false,
    bio: "Helping professionals navigate career transitions and workplace stress.",
    languages: ["English", "Igbo"],
    licenseNumber: "LIC-NG-2024-006",
  },
]

export default function CounselorsPage() {
  const [search, setSearch] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null)

  const filteredCounselors = counselors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase()),
  )

  if (selectedCounselor) {
    const counselor = counselors.find((c) => c.id === selectedCounselor)!
    return <CounselorProfile counselor={counselor} onBack={() => setSelectedCounselor(null)} />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Find Your Counselor</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input border border-border/40"
          />
        </div>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounselors.map((counselor) => (
          <Card
            key={counselor.id}
            className="overflow-hidden border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <img
                src={counselor.image || "/placeholder.svg"}
                alt={counselor.name}
                className="w-full h-full object-cover"
              />
              {counselor.online && (
                <div className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
              )}
            </div>

            {/* Content */}
            <div className="p-4" onClick={() => setSelectedCounselor(counselor.id)}>
              <h3 className="font-semibold text-foreground mb-1">{counselor.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{counselor.specialty}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {counselor.rating} ({counselor.reviews} reviews)
                </span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-4">
                {counselor.specialties.slice(0, 2).map((spec) => (
                  <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Rate and Button */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">₦{counselor.rate}/session</span>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCounselor(counselor.id)
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CounselorProfile({
  counselor,
  onBack,
}: {
  counselor: (typeof counselors)[0]
  onBack: () => void
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const availableSlots = ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button onClick={onBack} className="text-primary hover:text-primary/80 flex items-center gap-2">
        ← Back to Counselors
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-8 border border-border/40">
            <div className="flex gap-6 mb-6">
              <img
                src={counselor.image || "/placeholder.svg"}
                alt={counselor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{counselor.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{counselor.specialty}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {counselor.rating} ({counselor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>₦{counselor.rate} per session</span>
                  </div>
                  {counselor.online && (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Currently Online</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            <div className="border-t border-border/40 pt-6">
              <h2 className="font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground">{counselor.bio}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-border/40">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {counselor.specialties.map((spec) => (
                    <span key={spec} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {counselor.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-border/40 pt-6 mt-6">
              <h2 className="font-semibold text-foreground mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Anonymous User",
                    rating: 5,
                    text: "Dr. Amaka is incredibly compassionate and helpful. Highly recommend!",
                  },
                  {
                    name: "Another User",
                    rating: 5,
                    text: "Great listener and provides practical advice. Very professional.",
                  },
                ].map((review, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{review.name}</p>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <Card className="h-fit p-6 border border-border/40 sticky top-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Book a Session</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-input border border-border/40 rounded-lg p-2 text-foreground"
              />
            </div>

            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Available Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      className="px-3 py-2 bg-muted hover:bg-primary/20 text-foreground rounded-lg text-sm transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full bg-primary hover:bg-primary/90">
              {selectedDate ? "Confirm Booking" : "Select a Date"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              ₦{counselor.rate} will be charged for this session
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
