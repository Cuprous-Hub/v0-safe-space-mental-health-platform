"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Home, Users, Calendar, MessageCircle, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">SafeSpace</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">QW</span>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xs text-muted-foreground">Anonymous User</p>
                <p className="text-sm font-medium text-foreground">QuietWarrior2847</p>
              </div>
            </div>

            <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            <div className="relative group">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border/40 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all p-2 z-40">
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-foreground">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-foreground">
                  Privacy Settings
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-muted rounded text-sm text-destructive">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`border-r border-border/40 bg-card/30 transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <nav className="p-6 space-y-2">
            {[
              { icon: Home, label: "Home", href: "/dashboard" },
              { icon: Users, label: "Communities", href: "/dashboard/communities" },
              { icon: Calendar, label: "My Sessions", href: "/dashboard/sessions" },
              { icon: MessageCircle, label: "AI Chat", href: "/dashboard/chat" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 text-foreground transition-colors group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-6 border-t border-border/40">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <h3 className="font-semibold text-foreground text-sm mb-2">In Crisis?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                We're here to help. Call 911 or text 988 for immediate support.
              </p>
              <Button size="sm" className="w-full bg-destructive hover:bg-destructive/90 text-white">
                Get Help Now
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "" : ""}`}>{children}</main>
      </div>
    </div>
  )
}
