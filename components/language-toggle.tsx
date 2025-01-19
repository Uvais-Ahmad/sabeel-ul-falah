"use client"

import { useLanguage } from '@/lib/language-context'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm"
    >
      {language === 'ur' ? 'English' : 'اردو'}
    </button>
  )
}

