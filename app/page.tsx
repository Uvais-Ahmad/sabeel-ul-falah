"use client"

import Image from "next/image"
import { CroissantIcon as Crescent, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import moment from 'moment-hijri'

const IslamicCalendar = ({ language }: {language: string}) => {
  const [date, setDate] = useState("")

  useEffect(() => {
    let date;
    if(language === "ur") {
      date = moment().format();
    } else {
      date = moment().format('iD-iMMM-iYYYY هـ | D/MMM/YYYY');
    }
    setDate(date);
  }, [language])

  return (
    <div className="text-center mt-4">
      <p className={`text-3xl ${language === "ur" ? "font-gulzar" : ""}`}>{date}</p>
    </div>
  )
}

const MadrasaStats = ({ t, language, theme }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {[
        { label: t("stats.students"), value: "500+" },
        { label: t("stats.teachers"), value: "50+" },
        { label: t("stats.expenses"), value: language === "ur" ? "10,00,000 روپے" : "1,000,000 PKR" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className={`${theme === "dark" ? "bg-neutral-800" : "bg-white"} p-4 rounded-lg text-center shadow-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3
            className={`text-xl font-bold mb-2 ${language === "ur" ? "font-gulzar" : ""} ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}
          >
            {stat.label}
          </h3>
          <p className={`text-2xl ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}

const IslamicPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 z-0 opacity-10">
    <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 0L0 10L10 20L20 10Z" fill="currentColor" />
      <path d="M0 10L10 0L20 10L10 20Z" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
  </svg>
)

const FatwaForm = ({ language, theme }) => {
  return (
    <div 
      className={`${theme === "dark" ? "bg-neutral-800" : "bg-white"
        } p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
      <h3
        className={`text-2xl font-bold mb-6 ${language === "ur" ? "font-gulzar" : ""} ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}
      >
        {language === "ur" ? "آن لائن فتویٰ یا مسئلہ" : "Online Fatwa or Question"}
      </h3>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
          >
            {language === "ur" ? "ای میل" : "Email"}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-4 py-3 ${theme === "dark" ? "bg-neutral-700 border-neutral-600" : "bg-gray-100 border-gray-300"} border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300`}
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
          >
            {language === "ur" ? "فون نمبر" : "Phone Number"}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full px-3 py-2 ${theme === "dark" ? "bg-neutral-700 border-neutral-600" : "bg-gray-100 border-gray-300"} border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300`}
            required
          />
        </div>
        <div>
          <label
            htmlFor="question"
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
          >
            {language === "ur" ? "سوال" : "Question"}
          </label>
          <textarea
            id="question"
            name="question"
            rows={4}
            className={`w-full px-4 py-3 ${theme === "dark" ? "bg-neutral-700 border-neutral-600" : "bg-gray-100 border-gray-300"} border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300`}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full ${theme === "dark" ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-emerald-600"} text-white py-2 px-4 rounded-md hover:from-emerald-600 hover:to-green-700 transition duration-300 shadow-md  transform hover:scale-105`}
        >
          {language === "ur" ? "سوال جمع کرائیں" : "Submit Question"}
        </button>
      </form>
    </div>
  )
}

const HeroSection = ({ t, language, theme }) => (
  <section className="py-20 text-center h-screen">
    <div className="relative mx-auto w-[300px] h-[100px]">
        <Image
          src="/kalma.png"
          alt={t("siteName")}
          width={300}
          height={100}
          className="w-full h-full object-contain"
          style={{ background: 'transparent' }}
        />
      </div>
    <div className="container mx-auto px-4">
      <motion.h2
        className={`text-4xl font-bold mb-4 p-4 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("hero.welcome")}
      </motion.h2>
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("tagline")}
      </motion.p>
      <IslamicCalendar language={language} />
    </div>
  </section>
)

const AboutSection = ({ t, language, theme }) => (
  <section id="about" className={`py-16 ${theme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
        {t("about.title")}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <p className="mb-4">{t("about.description1")}</p>
          <p>{t("about.description2")}</p>
        </div>
        <div className={`md:w-1/2 ${theme === "dark" ? "bg-neutral-800" : "bg-white"} p-6 rounded-lg shadow-lg`}>
          <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
            {t("about.values.title")}
          </h3>
          <ul className="list-disc list-inside">
            {t("about.values.items").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
)

const ProgramsSection = ({ t, language, theme }) => (
  <section id="programs" className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
        {t("programs.title")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {t("programs.items").map((program, index) => (
          <motion.div
            key={index}
            className={`${theme === "dark" ? "bg-neutral-800" : "bg-gray-100"} p-6 rounded-lg shadow-md`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
              {program}
            </h3>
            <p>{t("programs.description")}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const GallerySection = ({ language, theme }) => (
  <section id="gallery" className={`py-16 ${theme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
        {language === "ur" ? "گیلری" : "Gallery"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={`/library.jpg`}
              alt={`Gallery Image ${item}`}
              width={150}
              height={150}
              className="w-full h-auto image-hover"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
)

const StatsSection = ({ t, language, theme }) => (
  <section className={`py-16 ${theme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <IslamicCalendar language={language} />
        <MadrasaStats t={t} language={language} theme={theme} />
      </div>
    </div>
  </section>
)

const FatwaSection = ({ t, language, theme }) => (
  <section id="fatwa" className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-8 text-center ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
        {language === "ur" ? "آن لائن فتویٰ یا مسئلہ" : "Online Fatwa or Question"}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:order-2">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Fatwa"
            alt="Fatwa"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:order-1">
          <FatwaForm language={language} theme={theme} />
        </div>
      </div>
    </div>
  </section>
)

const ContactSection = ({ t, language, theme }) => (
  <section id="contact" className={`py-16 ${theme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
    <div className="container mx-auto px-4 text-center">
      <h2 className={`text-3xl font-bold mb-8 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
        {t("contact.title")}
      </h2>
      <p className="text-xl mb-4">{t("contact.description")}</p>
      <div className="flex justify-center space-x-4">
        <a
          href="mailto:info@sabeelulfalah.com"
          className={`inline-block ${theme === "dark" ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-emerald-600"} text-white py-2 px-6 rounded text-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition duration-300 shadow-md`}
        >
          {t("contact.button")}
        </a>
        <motion.button
          className={`inline-block ${theme === "dark" ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-yellow-500"} text-black py-2 px-6 rounded text-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition duration-300 shadow-md`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("contact.donate")}
        </motion.button>
      </div>
    </div>
  </section>
)

const Footer = ({ t, language, theme }) => (
  <footer className={`${theme === "dark" ? "bg-gradient-to-b from-black to-neutral-900" : "bg-gray-200"} py-16 relative overflow-hidden min-h-[70vh] flex items-center`}>
    <div className="footer-bg-image absolute inset-0 opacity-20"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
            {t("siteName")}
          </h3>
          <p className="text-lg">{t("footer.description")}</p>
        </div>
        <div className="space-y-4">
          <h3 className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
            {t("footer.location")}
          </h3>
          <p className="text-lg">{t("footer.address.street")}</p>
          <p className="text-lg">{t("footer.address.city")}</p>
          <p className="text-lg">{t("footer.address.country")}</p>
        </div>
        <div className="space-y-4">
          <h3 className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "gradient-text" : "text-emerald-600"}`}>
            {t("footer.contact")}
          </h3>
          <p className="text-lg">{t("footer.phone")}</p>
          <p className="text-lg">{t("footer.email")}</p>
          <div className="mt-8 flex space-x-6">
            <a href="#" className={`text-3xl hover:text-yellow-400 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}>
              <FaFacebook />
            </a>
            <a href="#" className={`text-3xl hover:text-yellow-400 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}>
              <FaInstagram />
            </a>
            <a href="#" className={`text-3xl hover:text-yellow-400 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-black"}`}>
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-yellow-400 text-lg">
          &copy; {new Date().getFullYear()} {t("siteName")}. {t("footer.rights")}
        </p>
      </div>
    </div>
  </footer>
)

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#programs", label: t("nav.programs") },
    { href: "#gallery", label: language === "ur" ? "گیلری" : "Gallery" },
    { href: "#fatwa", label: language === "ur" ? "فتویٰ" : "Fatwa" },
    { href: "#contact", label: t("nav.contact") },
  ]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-gray-100" : "bg-white text-gray-900"} ${language === "ur" ? "font-gulzar" : ""}`}
    >
      <div className="bg-image fixed inset-0 z-0"></div>
      <div className="content-overlay relative z-10">
        <header
          className={`fixed w-full z-50 ${theme === "dark" ? "bg-black bg-opacity-10" : "bg-white bg-opacity-30"} backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Crescent className={`h-8 w-8 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`} />
              <h1 className={`text-2xl logo-text ${theme === "dark" ? "text-white" : "text-black"}`}>
                {t("siteName")}
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`hover-dim ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  {item.label}
                </a>
              ))}
              <LanguageToggle />
              <ThemeToggle />
            </nav>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden ${theme === "dark" ? "bg-black" : "bg-white"} py-4 fixed top-16 left-0 right-0 z-40`}
            >
              <nav className="flex flex-col items-center space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`hover-dim ${theme === "dark" ? "text-white" : "text-black"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <LanguageToggle />
                <ThemeToggle />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-20">
          <HeroSection t={t} language={language} theme={theme} />
          <AboutSection t={t} language={language} theme={theme} />
          <ProgramsSection t={t} language={language} theme={theme} />
          <GallerySection language={language} theme={theme} />
          <StatsSection t={t} language={language} theme={theme} />
          <FatwaSection t={t} language={language} theme={theme} />
          <ContactSection t={t} language={language} theme={theme} />
        </main>

        <Footer t={t} language={language} theme={theme} />
      </div>
    </div>
  )
}

