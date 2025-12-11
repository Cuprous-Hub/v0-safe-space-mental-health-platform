import type React from "react"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 py-4 px-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">SafeSpace</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">{children}</div>

      {/* Footer */}
      <div className="border-t border-border/40 py-4 px-4 text-center text-sm text-muted-foreground">
        <p>
          Crisis? Call <span className="font-semibold">911</span> or text <span className="font-semibold">988</span>
        </p>
      </div>
    </div>
  )
}
