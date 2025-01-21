"use client"

import Image from 'next/image'
import { CroissantIcon as Crescent, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/lib/language-context'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const IslamicCalendar = () => {
  const [date, setDate] = useState('')
  const { language } = useLanguage()

  useEffect(() => {
    setDate(language === 'ur' ? '15 رمضان 1445' : '15 Ramadan 1445')
  }, [language])

  return (
    <div className="text-center mt-4">
      <p className={`text-lg ${language === 'ur' ? 'font-gulzar' : ''}`}>{date}</p>
    </div>
  )
}

const MadrasaStats = () => {
  const { t, language } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {[
        { label: t('stats.students'), value: '500+' },
        { label: t('stats.teachers'), value: '50+' },
        { label: t('stats.expenses'), value: language === 'ur' ? '10,00,000 روپے' : '1,000,000 PKR' },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="bg-neutral-800 p-4 rounded-lg text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className={`text-xl font-bold mb-2 ${language === 'ur' ? 'font-gulzar' : ''} gradient-text`}>{stat.label}</h3>
          <p className="text-2xl text-emerald-400">{stat.value}</p>
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

const FatwaForm = () => {
  const {  language } = useLanguage()

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
      <h3 className={`text-2xl font-bold mb-4 ${language === 'ur' ? 'font-gulzar' : ''} gradient-text`}>
        {language === 'ur' ? 'آن لائن فتویٰ یا مسئلہ' : 'Online Fatwa or Question'}
      </h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            {language === 'ur' ? 'ای میل' : 'Email'}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            {language === 'ur' ? 'فون نمبر' : 'Phone Number'}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
            {language === 'ur' ? 'سوال' : 'Question'}
          </label>
          <textarea
            id="question"
            name="question"
            rows={4}
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 px-4 rounded-md hover:from-emerald-600 hover:to-green-700 transition duration-300 shadow-md"
        >
          {language === 'ur' ? 'سوال جمع کرائیں' : 'Submit Question'}
        </button>
      </form>
    </div>
  )
}

export default function Home() {
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
    { href: "#about", label: t('nav.about') },
    { href: "#programs", label: t('nav.programs') },
    { href: "#fatwa", label: language === 'ur' ? 'فتویٰ' : 'Fatwa' },
    { href: "#contact", label: t('nav.contact') },
  ]

  return (
    <div className={`min-h-screen bg-black text-gray-100 ${language === 'ur' ? 'font-gulzar' : ''}`}>
      <IslamicPattern />
      <header className="bg-neutral-900 text-white py-4 relative z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Crescent className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl logo-text">{t('siteName')}</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="hover:text-yellow-400">{item.label}</a>
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
            className="md:hidden bg-neutral-900 py-4"
          >
            <nav className="flex flex-col items-center space-y-4">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="hover:text-yellow-400" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
              ))}
              <LanguageToggle />
              <ThemeToggle />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('hero.welcome')}
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('tagline')}
            </motion.p>
            <IslamicCalendar />
            <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="./placeholder.svg?height=450&width=800"
                alt={t('siteName')}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-neutral-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">{t('about.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4">
                  {t('about.description1')}
                </p>
                <p>
                  {t('about.description2')}
                </p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">{t('about.values.title')}</h3>
                <ul className="list-disc list-inside">
                  {/* update the details */}
                  {t('about.values.items').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">{t('programs.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t('programs.items').map((program, index) => (
                <motion.div 
                  key={index} 
                  className="bg-neutral-800 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-2 gradient-text">{program}</h3>
                  <p>{t('programs.description')}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <IslamicCalendar />
              <MadrasaStats />
            </div>
          </div>
        </section>

        <section id="fatwa" className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
              {language === 'ur' ? 'آن لائن فتویٰ یا مسئلہ' : 'Online Fatwa or Question'}
            </h2>
            <div className="max-w-2xl mx-auto">
              <FatwaForm />
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-neutral-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 gradient-text">{t('contact.title')}</h2>
            <p className="text-xl mb-4">{t('contact.description')}</p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:info@sabeelulfalah.com" className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 px-6 rounded text-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition duration-300 shadow-md">
                {t('contact.button')}
              </a>
              <motion.button
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-6 rounded text-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('contact.donate')}
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-black to-neutral-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">{t('siteName')}</h3>
              <p>{t('footer.description')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">{t('footer.location')}</h3>
              <p>{t('footer.address.street')}</p>
              <p>{t('footer.address.city')}</p>
              <p>{t('footer.address.country')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 gradient-text">{t('footer.contact')}</h3>
              <p>{t('footer.phone')}</p>
              <p>{t('footer.email')}</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-2xl hover:text-yellow-400"><FaFacebook /></a>
                <a href="#" className="text-2xl hover:text-yellow-400"><FaInstagram /></a>
                <a href="#" className="text-2xl hover:text-yellow-400"><FaYoutube /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-yellow-400">
            <p>&copy; {new Date().getFullYear()} {t('siteName')}. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

