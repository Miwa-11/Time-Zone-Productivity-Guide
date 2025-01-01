"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext) 