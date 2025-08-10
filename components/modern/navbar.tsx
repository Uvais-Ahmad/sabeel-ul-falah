"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import Image from "next/image"

interface ModernNavbarProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

export default function ModernNavbar({ t, language }: ModernNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: t("nav.about") || "About" },
    { href: "#programs", label: t("nav.programs") || "Programs" },
    { href: "#gallery", label: language === "ur" ? "گیلری" : "Gallery" },
    { href: "#contact", label: t("nav.contact") || "Contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-xl bg-white/10 dark:bg-black/20 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/kalma.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className={`text-xl font-bold ${language === "ur" ? "font-gulzar" : ""}`}>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                  {t("siteName") || "Sabeel ul Falah"}
                </span>
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="relative text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              <div className="flex items-center space-x-4 ml-8">
                <LanguageToggle />
                <ThemeToggle />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("nav.donate") || "Donate"}
                </motion.button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 lg:hidden"
            style={{ marginTop: '80px' }}
          >
            <div className="backdrop-blur-xl bg-black/90 border-b border-white/10">
              <nav className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      className="text-white hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mx-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-semibold shadow-lg"
                  >
                    {t("nav.donate") || "Donate"}
                  </motion.button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
