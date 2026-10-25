"use client"
import { useEffect, useState } from "react"

export default function SessionsPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/counselors/bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setBookings([]))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Sessions</h1>
      {bookings.length === 0 ? (
        <p className="text-muted-foreground">You have no booked sessions yet.</p>
      ) : (
        bookings.map((b: any) => (
          <div key={b.id} className="border p-4 rounded mb-3">
            <p>Counselor ID: {b.counselor_id}</p>
            <p>Date: {new Date(b.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  )
}