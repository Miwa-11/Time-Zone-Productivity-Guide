"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Bell, BellOff, Globe } from "lucide-react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { Label } from "@/components/ui/label";

interface Language {
  code: string;
  name: string;
  localName: string;
}

interface TimeZone {
  value: string;
  label: string;
  offset: string;
}

const languages: Language[] = [
  { code: "en", name: "English", localName: "English" },
  { code: "ja", name: "Japanese", localName: "日本語" },
];

const timeZones: TimeZone[] = [
  { value: "UTC", label: "UTC", offset: "+00:00" },
  { value: "America/New_York", label: "Eastern Time", offset: "-05:00" },
  { value: "America/Los_Angeles", label: "Pacific Time", offset: "-08:00" },
  { value: "Europe/London", label: "London", offset: "+00:00" },
  { value: "Europe/Paris", label: "Paris", offset: "+01:00" },
  { value: "Asia/Tokyo", label: "Tokyo", offset: "+09:00" },
  { value: "Asia/Shanghai", label: "Shanghai", offset: "+08:00" },
  { value: "Australia/Sydney", label: "Sydney", offset: "+11:00" },
];

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = translations[language as keyof typeof translations].settings;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      {/* Language Settings Section */}
      <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t.language.title}</h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">{t.language.label}</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.localName} ({lang.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {t.language.description}
            </p>
          </div>
        </div>
      </div>

      {/* Timezone Settings Section */}
      <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t.timezone.title}</h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-primary" />
              <label className="text-sm font-medium">{t.timezone.label}</label>
            </div>
            <Select value={localStorage.getItem("timezone") || "UTC"} onValueChange={(value) => {
              localStorage.setItem("timezone", value);
              const selectedZone = timeZones.find((tz) => tz.value === value);
             
            }}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label} (UTC{tz.offset})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500">
              {new Date() && (
                <p>Current time: {format(new Date(), "yyyy-MM-dd HH:mm:ss zzz")}</p>
              )}
              <p className="mt-1">
                {t.timezone.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings Section */}
      <section className="bg-card text-card-foreground rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.theme.title}</h2>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme">{t.theme.label}</Label>
            <p className="text-sm text-muted-foreground">{t.theme.description}</p>
          </div>
          <Switch
            id="theme"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </section>
    </div>
  );
}
