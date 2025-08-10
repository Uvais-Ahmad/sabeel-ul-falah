"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"
import { BookOpen, Users, Heart, Award } from "lucide-react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

interface HeroSectionProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl p-6 border border-white/20 shadow-2xl"
  >
    {children}
  </motion.div>
)

const StatsCard = ({ icon: Icon, number, label, delay }: { 
  icon: React.ComponentType<{ className?: string }>, 
  number: number, 
  label: string, 
  delay: number 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="backdrop-blur-md bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-xl p-4 border border-emerald-300/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <Icon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
        <div className="text-2xl font-bold text-white mb-1">
          {inView && <CountUp end={number} duration={2.5} />}+
        </div>
        <p className="text-emerald-100 text-xs">{label}</p>
      </div>
    </motion.div>
  )
}

export default function ModernHeroSection({ t, language }: HeroSectionProps) {
  useEffect(() => {
    // Add floating animation to background elements
    const floatingElements = document.querySelectorAll('.floating-element')
    
    floatingElements.forEach((element) => {
      const randomDelay = Math.random() * 2
      const randomDuration = 3 + Math.random() * 2
      
      element.animate([
        { transform: 'translateY(0px) rotate(0deg)' },
        { transform: `translateY(-20px) rotate(${5 + Math.random() * 10}deg)` },
        { transform: 'translateY(0px) rotate(0deg)' }
      ], {
        duration: randomDuration * 1000,
        delay: randomDelay * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
      })
    })
  }, [])

  const stats = [
    { icon: Users, number: 500, label: t("stats.students") || "Students" },
    { icon: BookOpen, number: 50, label: t("stats.teachers") || "Teachers" },
    { icon: Heart, number: 1000, label: "Donations" },
    { icon: Award, number: 15, label: "Years" }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        {/* Floating geometric shapes */}
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-40 right-10 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
        
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="islamic-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3"/>
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative mx-auto lg:mx-0 w-80 h-24 mb-6">
                <Image
                  src="/kalma.png"
                  alt={t("siteName")}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-3xl lg:text-5xl font-bold mb-6 ${language === "ur" ? "font-gulzar" : ""}`}
            >
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text drop-shadow-lg">
                {t("hero.welcome") || "Welcome to"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 text-transparent bg-clip-text">
                {t("siteName") || "Sabeel ul Falah"}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg lg:text-xl text-emerald-100 mb-8 leading-relaxed"
            >
              {t("tagline") || "Nurturing Islamic Education and Character Building"}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
              >
                {t("hero.explore") || "Explore Programs"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 backdrop-blur-md bg-white/10 text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {t("hero.donate") || "Make Donation"}
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                delay={0.9 + index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Bottom Islamic Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <FloatingCard delay={1.5}>
            <p className={`text-2xl text-emerald-100 ${language === "ur" ? "font-gulzar" : ""}`}>
              {/* Islamic date will be inserted here */}
              اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ
            </p>
            <p className="text-sm text-emerald-200 mt-2">
              &quot;O Allah, send prayers and peace upon our Prophet Muhammad&quot;
            </p>
          </FloatingCard>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
