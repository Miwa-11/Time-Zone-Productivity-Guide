"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export default function HelpPage() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations].help

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      {/* About Section */}
      <section className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.about.title}</h2>
        <p className="text-slate-600 dark:text-slate-300">{t.about.description}</p>
      </section>

      {/* How to Use Section */}
      <section className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.howTo.title}</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{t.howTo.addMembers.title}</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
              {t.howTo.addMembers.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">{t.howTo.viewDashboard.title}</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
              {t.howTo.viewDashboard.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t.faq.title}</h2>
        
        <div className="space-y-6">
          {t.faq.items.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-2">{item.question}</h3>
              <p className="text-slate-600 dark:text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 