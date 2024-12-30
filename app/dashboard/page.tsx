"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarButton } from "@/components/ui/calendar-button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TeamMember {
  id: string
  name: string
  location: string
  workingHours: {
    start: string
    end: string
  }
  productivityPeak: string
}

interface MeetingSlot {
  startTime: string
  endTime: string
  availableMembers: string[]
}

export default function DashboardPage() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]
  const dashboardT = t.dashboard
  const formT = t.addMember.form
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [meetingDuration, setMeetingDuration] = useState("60")
  const [recommendedSlots, setRecommendedSlots] = useState<MeetingSlot[]>([])
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    // Load team members from local storage
    const savedMembers = localStorage.getItem("teamMembers")
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers))
    }

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Recalculate recommended slots when team members change
    calculateRecommendedSlots()
  }, [teamMembers])

  const calculateRecommendedSlots = () => {
    if (teamMembers.length === 0) return

    const slots: MeetingSlot[] = []
    const duration = parseInt(meetingDuration)
    
    // Generate slots in 30-minute intervals from 9:00 to 17:00
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const endHour = minute + duration >= 60 ? hour + 1 : hour
        const endMinute = (minute + duration) % 60
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`

        const availableMembers = teamMembers.filter(member => {
          const memberStart = member.workingHours.start
          const memberEnd = member.workingHours.end
          return startTime >= memberStart && endTime <= memberEnd
        })

        if (availableMembers.length > teamMembers.length / 2) {
          slots.push({
            startTime,
            endTime,
            availableMembers: availableMembers.map(m => m.name)
          })
        }
      }
    }

    setRecommendedSlots(slots)
  }

  const formatTimeInZone = (time: string, timeZone: string) => {
    try {
      const [hours, minutes] = time.split(":")
      const date = new Date()
      date.setHours(parseInt(hours))
      date.setMinutes(parseInt(minutes))
      const zonedTime = toZonedTime(date, timeZone)
      return format(zonedTime, "HH:mm")
    } catch (error) {
      return time
    }
  }

  const isWorkingHours = (member: TeamMember) => {
    const now = new Date()
    const [startHour, startMinute] = member.workingHours.start.split(":")
    const [endHour, endMinute] = member.workingHours.end.split(":")
    
    const workStart = new Date()
    workStart.setHours(parseInt(startHour), parseInt(startMinute))
    
    const workEnd = new Date()
    workEnd.setHours(parseInt(endHour), parseInt(endMinute))
    
    return now >= workStart && now <= workEnd
  }

  const handleDeleteMember = (member: TeamMember) => {
    const updatedMembers = teamMembers.filter(m => m.id !== member.id)
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers))
    setTeamMembers(updatedMembers)
    setMemberToDelete(null)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
  }

  const handleUpdateMember = (updatedMember: TeamMember) => {
    const updatedMembers = teamMembers.map(m => 
      m.id === updatedMember.id ? updatedMember : m
    )
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers))
    setTeamMembers(updatedMembers)
    setEditingMember(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{dashboardT.title}</h1>
      
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{dashboardT.meetingRecommendations.title}</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dashboardT.meetingRecommendations.duration.label}
            </label>
            <Select value={meetingDuration} onValueChange={(value) => {
              setMeetingDuration(value)
              calculateRecommendedSlots()
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(dashboardT.meetingRecommendations.duration.options).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          {recommendedSlots.map((slot, index) => (
            <div
              key={index}
              className="flex items-center justify-between border dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <div>
                <h3 className="font-medium">
                  {slot.startTime} - {slot.endTime}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {slot.availableMembers.length} team members available
                </p>
              </div>
              <CalendarButton
                startTime={slot.startTime}
                endTime={slot.endTime}
                attendees={slot.availableMembers}
              />
            </div>
          ))}
          
          {recommendedSlots.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              {dashboardT.meetingRecommendations.noSlots}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-slate-700">
                {Object.values(dashboardT.teamMembers.columns).map((column, index) => (
                  <th key={index} className="text-left p-4">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td className="p-4">{member.name}</td>
                  <td className="p-4">{member.location}</td>
                  <td className="p-4">
                    {formatTimeInZone(member.workingHours.start, member.location)} - 
                    {formatTimeInZone(member.workingHours.end, member.location)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isWorkingHours(member)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isWorkingHours(member) ? "Working" : "Off Hours"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="capitalize">{member.productivityPeak}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMemberToDelete(member)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{dashboardT.teamMembers.deleteDialog.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {dashboardT.teamMembers.deleteDialog.description.replace('{name}', member.name)}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{dashboardT.teamMembers.deleteDialog.cancel}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMember(member)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {dashboardT.teamMembers.deleteDialog.confirm}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {teamMembers.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              {dashboardT.teamMembers.noMembers}
            </p>
          )}
        </div>
      </div>

      {editingMember && (
        <AlertDialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>{dashboardT.teamMembers.editDialog.title}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="py-4">
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdateMember(editingMember)
              }} className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">{formT.name.label}</Label>
                  <Input
                    id="edit-name"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      name: e.target.value
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-location">{formT.location.label}</Label>
                  <Select
                    value={editingMember.location}
                    onValueChange={(value) => setEditingMember({
                      ...editingMember,
                      location: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formT.location.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Same timezone options as in add form */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-workStart">{formT.workingHours.start}</Label>
                    <Input
                      id="edit-workStart"
                      type="time"
                      value={editingMember.workingHours.start}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        workingHours: {
                          ...editingMember.workingHours,
                          start: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-workEnd">{formT.workingHours.end}</Label>
                    <Input
                      id="edit-workEnd"
                      type="time"
                      value={editingMember.workingHours.end}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        workingHours: {
                          ...editingMember.workingHours,
                          end: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label>{formT.productivityPeak.label}</Label>
                  <RadioGroup
                    value={editingMember.productivityPeak}
                    onValueChange={(value: string) => setEditingMember({
                      ...editingMember,
                      productivityPeak: value
                    })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="morning" id="edit-morning" />
                      <Label htmlFor="edit-morning">{formT.productivityPeak.options.morning}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="afternoon" id="edit-afternoon" />
                      <Label htmlFor="edit-afternoon">{formT.productivityPeak.options.afternoon}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="evening" id="edit-evening" />
                      <Label htmlFor="edit-evening">{formT.productivityPeak.options.evening}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>{dashboardT.teamMembers.editDialog.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleUpdateMember(editingMember)}>
                {dashboardT.teamMembers.editDialog.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
} 