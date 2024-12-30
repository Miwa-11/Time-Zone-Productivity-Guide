"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, BarChart2, Settings, HelpCircle } from "lucide-react"
import { translations } from "@/lib/translations"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

const getNavItems = (lang: string) => [
  { name: lang === "ja" ? "チーム情報" : "Team Info", href: "/", icon: Users },
  { name: lang === "ja" ? "ダッシュボード" : "Dashboard", href: "/dashboard", icon: BarChart2 },
  { name: lang === "ja" ? "設定" : "Settings", href: "/settings", icon: Settings },
  { name: lang === "ja" ? "ヘルプ" : "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const { language } = useLanguage()
  const pathname = usePathname()
  
  return (
    <div className="w-64 bg-card text-card-foreground shadow-md">
      <div className="p-4">
        <h1 className="text-xl font-bold">
          Time Zone Guide
        </h1>
      </div>
      <nav className="mt-4">
        {getNavItems(language).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 hover:bg-muted/50 ${
              pathname === item.href
                ? "bg-muted font-medium"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="ml-2">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 