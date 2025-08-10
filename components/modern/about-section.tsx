"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BookOpen, Heart, Users, Award, Star, Globe } from "lucide-react"
import Image from "next/image"

interface AboutSectionProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  delay: number 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-emerald-100 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ModernAboutSection({ t, language }: AboutSectionProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const features = [
    {
      icon: BookOpen,
      title: t("features.education.title") || "Quality Education",
      description: t("features.education.desc") || "Comprehensive Islamic education following traditional methods with modern teaching techniques."
    },
    {
      icon: Heart,
      title: t("features.character.title") || "Character Building",
      description: t("features.character.desc") || "Developing strong moral character and spiritual growth in our students."
    },
    {
      icon: Users,
      title: t("features.community.title") || "Community Support",
      description: t("features.community.desc") || "Building a strong, supportive community of learners and families."
    },
    {
      icon: Award,
      title: t("features.excellence.title") || "Academic Excellence",
      description: t("features.excellence.desc") || "Maintaining high standards of academic achievement and scholarly pursuit."
    },
    {
      icon: Star,
      title: t("features.values.title") || "Islamic Values",
      description: t("features.values.desc") || "Instilling authentic Islamic values and teachings in daily life."
    },
    {
      icon: Globe,
      title: t("features.global.title") || "Global Perspective",
      description: t("features.global.desc") || "Preparing students to be responsible global citizens while maintaining their Islamic identity."
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl lg:text-6xl font-bold mb-6 ${language === "ur" ? "font-gulzar" : ""}`}>
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
              {t("about.title") || "About Us"}
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-emerald-100 leading-relaxed mb-6">
              {t("about.description1") || "Sabeel ul Falah is dedicated to providing comprehensive Islamic education that nurtures both spiritual and academic growth."}
            </p>
            <p className="text-lg text-emerald-200 leading-relaxed">
              {t("about.description2") || "Our mission is to create a learning environment where students develop strong Islamic character while achieving academic excellence."}
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl p-12 border border-emerald-300/30">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                  {t("mission.title") || "Our Mission"}
                </h3>
                <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                  {t("mission.description") || "To provide authentic Islamic education that develops knowledgeable, righteous, and contributing members of society who embody the teachings of Islam in their daily lives."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-2xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                >
                  {t("mission.learn_more") || "Learn More"}
                </motion.button>
              </div>
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/library.jpg"
                    alt="Islamic Education"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
