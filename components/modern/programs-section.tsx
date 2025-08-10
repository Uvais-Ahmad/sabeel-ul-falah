"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Users, Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"

interface ProgramsSectionProps {
  t: (key: string) => string | string[]
  language: 'en' | 'ur'
  theme: string | undefined
}

const ProgramCard = ({ 
  title, 
  description, 
  duration, 
  students, 
  level,
  imageUrl,
  delay 
}: { 
  title: string
  description: string
  duration: string
  students: string
  level: string
  imageUrl: string
  delay: number 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group perspective-1000"
    >
      <div className="relative backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu hover:scale-105 hover:rotate-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold rounded-full">
              {level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-emerald-100 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-1 text-emerald-200">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-200">
              <Users className="h-4 w-4" />
              <span>{students}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="text-sm font-semibold">Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ModernProgramsSection({ t, language }: ProgramsSectionProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const programs = [
    {
      title: "Hifz-ul-Quran",
      description: "Complete memorization of the Holy Quran with proper Tajweed and understanding of meanings.",
      duration: "3-5 Years",
      students: "150+ Students",
      level: "Advanced",
      imageUrl: "/library.jpg"
    },
    {
      title: "Quranic Studies",
      description: "In-depth study of Quranic interpretation, Arabic language, and Islamic sciences.",
      duration: "2 Years",
      students: "200+ Students", 
      level: "Intermediate",
      imageUrl: "/madarsa.jpg"
    },
    {
      title: "Islamic Jurisprudence",
      description: "Comprehensive study of Islamic law (Fiqh) and its practical applications.",
      duration: "4 Years",
      students: "80+ Students",
      level: "Advanced",
      imageUrl: "/library.jpg"
    },
    {
      title: "Arabic Language",
      description: "Master classical Arabic language for better understanding of Islamic texts.",
      duration: "1-2 Years",
      students: "300+ Students",
      level: "Beginner",
      imageUrl: "/madarsa.jpg"
    },
    {
      title: "Hadith Studies",
      description: "Study of Prophetic traditions and their authentication methods.",
      duration: "3 Years",
      students: "120+ Students",
      level: "Advanced",
      imageUrl: "/library.jpg"
    },
    {
      title: "Children's Program",
      description: "Basic Islamic education and Quran reading for young children.",
      duration: "Ongoing",
      students: "400+ Students",
      level: "Beginner",
      imageUrl: "/madarsa.jpg"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden" id="programs">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="programs-pattern" patternUnits="userSpaceOnUse" width="30" height="30">
                <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.3"/>
                <path d="M15,5 L25,15 L15,25 L5,15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#programs-pattern)"/>
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl lg:text-6xl font-bold mb-6 ${language === "ur" ? "font-gulzar" : ""}`}>
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
              {t("programs.title") || "Our Programs"}
            </span>
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {t("programs.subtitle") || "Comprehensive Islamic education programs designed to nurture spiritual growth, academic excellence, and character development."}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              {...program}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl p-12 border border-yellow-300/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              {t("programs.cta.title") || "Ready to Begin Your Journey?"}
            </h3>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("programs.cta.description") || "Join thousands of students who have transformed their lives through authentic Islamic education. Start your journey today."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
              >
                {t("programs.cta.enroll") || "Enroll Now"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 backdrop-blur-md bg-white/10 text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {t("programs.cta.info") || "Request Information"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
