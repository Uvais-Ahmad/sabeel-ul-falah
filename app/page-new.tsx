"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

// Modern Components
import ModernNavbar from "@/components/modern/navbar"
import ModernHeroSection from "@/components/modern/hero-section"
import ModernAboutSection from "@/components/modern/about-section"
import ModernProgramsSection from "@/components/modern/programs-section"
import ModernGallerySection from "@/components/modern/gallery-section"
import ModernContactSection from "@/components/modern/contact-section"
import ModernFooter from "@/components/modern/footer"
import SearchForm from "@/components/search-form"

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 flex items-center justify-center z-50">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"
      />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-yellow-400"
      >
        سبیل الفلاح
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-emerald-200 mt-2"
      >
        Loading...
      </motion.p>
    </div>
  </div>
)

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { t, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <LoadingScreen />
  }

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <div className={`min-h-screen ${language === "ur" ? "font-gulzar" : ""}`}>
          {/* Navbar */}
          <ModernNavbar t={t} language={language} theme={theme} />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <ModernHeroSection t={t} language={language} theme={theme} />

            {/* About Section */}
            <ModernAboutSection t={t} language={language} theme={theme} />

            {/* Programs Section */}
            <ModernProgramsSection t={t} language={language} theme={theme} />

            {/* Gallery Section */}
            <ModernGallerySection language={language} theme={theme} />

            {/* Search Form (keeping the existing one for now) */}
            <SearchForm />

            {/* Contact Section */}
            <ModernContactSection t={t} language={language} theme={theme} />
          </main>

          {/* Footer */}
          <ModernFooter t={t} language={language} theme={theme} />
        </div>
      )}
    </>
  )
}
