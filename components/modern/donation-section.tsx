"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { Heart, DollarSign, CreditCard, Smartphone, Building, Gift } from "lucide-react"
import Image from "next/image"

interface DonationSectionProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

const DonationCard = ({ 
  icon: Icon, 
  title, 
  description, 
  amount,
  popular = false,
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  amount: string
  popular?: boolean
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
      className="group relative"
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className={`relative backdrop-blur-md ${popular ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/50' : 'bg-white/10 dark:bg-black/20 border-white/20'} rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu hover:scale-105 hover:-rotate-1 h-full`}>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <h3 className="text-lg font-bold text-yellow-400 mb-3">{title}</h3>
          <p className="text-emerald-100 text-sm leading-relaxed mb-4">{description}</p>
          
          <div className="text-2xl font-bold text-white mb-4">{amount}</div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full px-4 py-2 ${popular ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black' : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'} rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm`}
          >
            Donate Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const PaymentMethod = ({ 
  icon: Icon, 
  name, 
  description, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>
  name: string
  description: string
  delay: number 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h4 className="text-lg font-semibold text-yellow-400 mb-2">{name}</h4>
        <p className="text-emerald-200 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ModernDonationSection({ t, language }: DonationSectionProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [customAmount, setCustomAmount] = useState("")

  const donationTiers = [
    {
      icon: Heart,
      title: t("donation.basic.title") || "Basic Support",
      description: t("donation.basic.desc") || "Help support our daily operations and educational materials.",
      amount: language === "ur" ? "₨5,000" : "$20"
    },
    {
      icon: Gift,
      title: t("donation.standard.title") || "Standard Support",
      description: t("donation.standard.desc") || "Sponsor a student's monthly educational expenses.",
      amount: language === "ur" ? "₨15,000" : "$60",
      popular: true
    },
    {
      icon: Building,
      title: t("donation.premium.title") || "Premium Support",
      description: t("donation.premium.desc") || "Help fund infrastructure and facility improvements.",
      amount: language === "ur" ? "₨50,000" : "$200"
    }
  ]

  const paymentMethods = [
    {
      icon: CreditCard,
      name: t("payment.card") || "Credit Card",
      description: t("payment.card.desc") || "Visa, Mastercard, Amex"
    },
    {
      icon: Smartphone,
      name: t("payment.mobile") || "Mobile Banking",
      description: t("payment.mobile.desc") || "JazzCash, EasyPaisa"
    },
    {
      icon: Building,
      name: t("payment.bank") || "Bank Transfer",
      description: t("payment.bank.desc") || "Direct bank transfer"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden" id="donation">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/madarsa.jpg"
            alt="Donation Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
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
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${language === "ur" ? "font-gulzar" : ""}`}>
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
              {t("donation.title") || "Support Our Mission"}
            </span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-6">
            {t("donation.subtitle") || "Your generous donations help us provide quality Islamic education and support to our students and community."}
          </p>
          
          {/* Quranic Verse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="backdrop-blur-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-300/30 max-w-3xl mx-auto"
          >
            <p className="text-2xl text-yellow-400 font-semibold mb-2" dir={language === "ur" ? "rtl" : "ltr"}>
              {language === "ur" 
                ? "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ"
                : "The example of those who spend their wealth in the way of Allah"
              }
            </p>
            <p className="text-emerald-200 text-sm">
              {language === "ur" 
                ? "سورہ البقرہ، آیت ٢٦١"
                : "Quran 2:261"
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {donationTiers.map((tier, index) => (
            <DonationCard
              key={index}
              {...tier}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Custom Amount */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              {t("donation.custom.title") || "Custom Donation Amount"}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder={language === "ur" ? "رقم درج کریں" : "Enter amount"}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-6 py-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-lg"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-2xl font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300"
              >
                {t("donation.custom.donate") || "Donate Now"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-8">
            {t("donation.payment.title") || "Payment Methods"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <PaymentMethod
                key={index}
                {...method}
                delay={1 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-300/30 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-green-400 mb-4">
              {t("donation.trust.title") || "Your Trust Matters"}
            </h4>
            <p className="text-emerald-100 leading-relaxed mb-6">
              {t("donation.trust.description") || "We are committed to transparency and accountability. All donations are used exclusively for educational purposes and community development."}
            </p>
            <div className="flex justify-center space-x-8 text-sm text-emerald-200">
              <span className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{t("donation.trust.transparent") || "100% Transparent"}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>{t("donation.trust.charity") || "Registered Charity"}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
