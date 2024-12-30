"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

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

export default function TeamMemberForm() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations].addMember
  const [teamMember, setTeamMember] = useState<TeamMember>({
    id: "",
    name: "",
    location: "",
    workingHours: { start: "09:00", end: "17:00" },
    productivityPeak: "morning",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMember = {
      ...teamMember,
      id: crypto.randomUUID(),
    }

    const existingMembers = JSON.parse(localStorage.getItem("teamMembers") || "[]")
    const updatedMembers = [...existingMembers, newMember]
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers))

    setTeamMember({
      id: "",
      name: "",
      location: "",
      workingHours: { start: "09:00", end: "17:00" },
      productivityPeak: "morning",
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">{t.form.name.label}</Label>
            <Input
              id="name"
              value={teamMember.name}
              onChange={(e) => setTeamMember({ ...teamMember, name: e.target.value })}
              placeholder={t.form.name.placeholder}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">{t.form.location.label}</Label>
            <Select
              value={teamMember.location}
              onValueChange={(value) => setTeamMember({ ...teamMember, location: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.form.location.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (UTC-6)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (UTC-7)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="America/Anchorage">Alaska Time (UTC-9)</SelectItem>
                <SelectItem value="Pacific/Honolulu">Hawaii Time (UTC-10)</SelectItem>
                <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                <SelectItem value="Australia/Sydney">Sydney (UTC+10)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workStart">{t.form.workingHours.start}</Label>
              <Input
                id="workStart"
                type="time"
                value={teamMember.workingHours.start}
                onChange={(e) =>
                  setTeamMember({
                    ...teamMember,
                    workingHours: { ...teamMember.workingHours, start: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="workEnd">{t.form.workingHours.end}</Label>
              <Input
                id="workEnd"
                type="time"
                value={teamMember.workingHours.end}
                onChange={(e) =>
                  setTeamMember({
                    ...teamMember,
                    workingHours: { ...teamMember.workingHours, end: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">
              {t.form.productivityPeak.label}
            </Label>
            <RadioGroup
              value={teamMember.productivityPeak}
              onValueChange={(value: string) => setTeamMember({ ...teamMember, productivityPeak: value })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">{t.form.productivityPeak.options.morning}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">{t.form.productivityPeak.options.afternoon}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="evening" id="evening" />
                <Label htmlFor="evening">{t.form.productivityPeak.options.evening}</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            {t.form.submit}
          </Button>
        </form>
      </div>
    </div>
  )
} 