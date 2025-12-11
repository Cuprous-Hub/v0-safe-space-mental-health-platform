"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const initialMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hello! I'm SafeSpace's AI companion. I'm here to listen and support you. How are you feeling today?",
  },
  {
    id: 2,
    sender: "user",
    text: "I've been feeling really stressed about work lately. It's hard to focus.",
  },
  {
    id: 3,
    sender: "ai",
    text: "Work stress is something many people struggle with. It sounds like this is weighing on you. Can you tell me what specifically about work is causing the most stress? Is it deadlines, relationships with colleagues, or something else?",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { id: messages.length + 1, sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 800))

    const aiResponses = [
      "That sounds challenging. Have you tried breaking your tasks into smaller, more manageable pieces?",
      "It's important to acknowledge what you're feeling. Would you like to try a stress-relief technique together?",
      "I appreciate you sharing that with me. Remember, it's okay to ask for help when you need it.",
      "That's a great insight about yourself. What small step could you take today to address this?",
    ]

    const aiMessage = {
      id: messages.length + 2,
      sender: "ai",
      text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
    }

    setMessages((prev) => [...prev, aiMessage])
    setLoading(false)
  }

  const handleVoiceNote = () => {
    setIsRecording(!isRecording)
    // Simulate voice note transcription
    if (isRecording) {
      setTimeout(() => {
        setInput("This is a transcribed voice note about my feelings today")
        setIsRecording(false)
      }, 2000)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Companion Chat</h1>
        <p className="text-muted-foreground">Available 24/7 for support and guidance</p>
      </div>

      {/* Messages Area */}
      <Card className="flex-1 p-6 border border-border/40 mb-6 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* Input Area */}
      <Card className="p-4 border border-border/40 space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-input border border-border/40"
          />
          <Button
            onClick={handleVoiceNote}
            variant="outline"
            className={isRecording ? "bg-destructive text-white border-destructive" : ""}
          >
            <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`} />
          </Button>
          <Button onClick={handleSendMessage} disabled={loading} className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {isRecording && (
          <div className="p-3 bg-accent/10 rounded-lg text-sm text-accent-foreground flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Recording... (simulated)
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">Press Enter to send or click the send button</p>
      </Card>
    </div>
  )
}
