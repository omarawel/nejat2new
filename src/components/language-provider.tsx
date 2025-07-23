"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "de" | "en" | "am" | "tr"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "de",
  setLanguage: () => null,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "de",
  storageKey = "nejat-digital-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const storedLanguage = localStorage.getItem(storageKey) as Language | null
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [storageKey])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(storageKey, language)
  }, [language, storageKey])

  const value = {
    language,
    setLanguage: (newLanguage: Language) => {
      setLanguage(newLanguage)
    },
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)
  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
