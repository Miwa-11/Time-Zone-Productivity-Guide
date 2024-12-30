"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, Mail } from "lucide-react"

interface CalendarButtonProps {
  startTime: string
  endTime: string
  attendees: string[]
}

export function CalendarButton({ startTime, endTime, attendees }: CalendarButtonProps) {
  const createGoogleCalendarLink = () => {
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    const today = new Date().toISOString().split('T')[0]
    const text = "Team Meeting"
    const details = `Team meeting with: ${attendees.join(", ")}`
    const dates = `${today}T${startTime}:00/${today}T${endTime}:00`
    
    return `${baseUrl}&text=${encodeURIComponent(text)}&details=${encodeURIComponent(details)}&dates=${dates.replace(/[-:]/g, "")}`
  }

  const createOutlookLink = () => {
    const baseUrl = "https://outlook.office.com/calendar/0/deeplink/compose"
    const today = new Date().toISOString().split('T')[0]
    const subject = "Team Meeting"
    const body = `Team meeting with: ${attendees.join(", ")}`
    const start = `${today}T${startTime}`
    const end = `${today}T${endTime}`
    
    return `${baseUrl}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&startdt=${start}&enddt=${end}`
  }

  const createEmailContent = () => {
    const subject = "Team Meeting Invitation"
    const body = `
Hello,

I'd like to schedule a team meeting for ${startTime} - ${endTime}.

Attendees:
${attendees.join("\n")}

Please let me know if this time works for you.

Best regards`

    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Schedule</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Schedule Meeting</AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you would like to schedule this meeting for {startTime} - {endTime}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
          >
            <Calendar className="h-5 w-5" />
            <span>Add to Google Calendar</span>
          </a>
          <a
            href={createOutlookLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
          >
            <Calendar className="h-5 w-5" />
            <span>Add to Outlook Calendar</span>
          </a>
          <a
            href={createEmailContent()}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
          >
            <Mail className="h-5 w-5" />
            <span>Send Email Invitation</span>
          </a>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 