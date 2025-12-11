"use client"

import { useState } from "react"
import { Users, Search, MessageCircle, ThumbsUp, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const communities = [
  {
    id: 1,
    name: "Depression & Anxiety Support",
    icon: "🌙",
    members: "2.3k",
    description: "A safe space to discuss depression and anxiety",
    active: "42 active now",
  },
  {
    id: 2,
    name: "Family Issues & Home Struggles",
    icon: "👨‍👩‍👧",
    members: "1.8k",
    description: "Support for family relationships and home conflicts",
    active: "28 active now",
  },
  {
    id: 3,
    name: "Academic Pressure & School Stress",
    icon: "📚",
    members: "3.1k",
    description: "Students sharing and supporting each other",
    active: "67 active now",
  },
  {
    id: 4,
    name: "Identity & Self-Discovery",
    icon: "🌈",
    members: "2.9k",
    description: "Exploring identity and personal growth",
    active: "35 active now",
  },
  {
    id: 5,
    name: "Grief & Loss Support",
    icon: "🕊️",
    members: "1.5k",
    description: "Navigating grief and loss together",
    active: "15 active now",
  },
  {
    id: 6,
    name: "Relationship Challenges",
    icon: "💔",
    members: "2.6k",
    description: "Discussing relationship issues and growth",
    active: "31 active now",
  },
  {
    id: 7,
    name: "Suicidal Thoughts Support",
    icon: "💚",
    members: "4.2k",
    description: "Crisis support - National Suicide Prevention Lifeline available",
    active: "89 active now",
  },
  {
    id: 8,
    name: "LGBTQ+ Safe Space",
    icon: "🏳️‍🌈",
    members: "1.9k",
    description: "A welcoming community for LGBTQ+ individuals",
    active: "22 active now",
  },
]

export default function CommunitiesPage() {
  const [search, setSearch] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)

  const filteredCommunities = communities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  if (selectedCommunity) {
    const community = communities.find((c) => c.id === selectedCommunity)!
    return <CommunityChat community={community} onBack={() => setSelectedCommunity(null)} />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Find Your Support Community</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-input border border-border/40"
          />
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <Card
            key={community.id}
            className="p-6 border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedCommunity(community.id)}
          >
            <div className="text-4xl mb-4">{community.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{community.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{community.description}</p>

            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                {community.members} members
              </span>
              <span className="text-green-600 font-medium">{community.active}</span>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">Join Community</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CommunityChat({
  community,
  onBack,
}: {
  community: (typeof communities)[0]
  onBack: () => void
}) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "HopefulSoul",
      timestamp: "2 min ago",
      content: "Just finished my first session with a counselor. Feeling hopeful about my progress!",
      tag: "Victory",
      upvotes: 127,
      replies: 23,
    },
    {
      id: 2,
      username: "QuietWarrior",
      timestamp: "15 min ago",
      content: "Having a really tough day. Anyone else feeling overwhelmed?",
      tag: "Vent",
      upvotes: 45,
      replies: 12,
    },
    {
      id: 3,
      username: "MorningLight",
      timestamp: "1 hour ago",
      content: "What are your favorite coping mechanisms? Looking for new strategies.",
      tag: "Advice Needed",
      upvotes: 89,
      replies: 34,
    },
  ])

  const [newPost, setNewPost] = useState("")
  const [selectedTag, setSelectedTag] = useState("Vent")

  const handlePostAnonymously = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          username: "AnonymousUser",
          timestamp: "now",
          content: newPost,
          tag: selectedTag,
          upvotes: 0,
          replies: 0,
        },
        ...posts,
      ])
      setNewPost("")
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button onClick={onBack} className="text-primary hover:text-primary/80 mb-4 flex items-center gap-2">
          ← Back to Communities
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <span className="text-4xl">{community.icon}</span>
              {community.name}
            </h1>
            <p className="text-muted-foreground">
              {community.members} members • {community.active}
            </p>
          </div>
          <Button variant="outline">Leave Community</Button>
        </div>
      </div>

      {/* New Post Section */}
      <Card className="p-6 border border-border/40 space-y-4">
        <h2 className="font-semibold text-foreground">Share what's on your mind...</h2>
        <textarea
          placeholder="Share your thoughts (Anonymous)"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full bg-input border border-border/40 rounded-lg p-4 text-foreground placeholder-muted-foreground min-h-24 resize-none"
        />

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Tag:</span>
          {["Vent", "Advice Needed", "Victory", "Question"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Voice Note
          </Button>
          <Button onClick={handlePostAnonymously} className="flex-1 bg-primary hover:bg-primary/90">
            Post Anonymously
          </Button>
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-6 border border-border/40 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{post.username}</p>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  post.tag === "Victory"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : post.tag === "Vent"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                }`}
              >
                {post.tag}
              </span>
            </div>

            <p className="text-foreground mb-4">{post.content}</p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{post.upvotes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.replies} replies</span>
              </button>
              <button className="ml-auto p-2 hover:bg-muted rounded-lg transition-colors">
                <Flag className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
