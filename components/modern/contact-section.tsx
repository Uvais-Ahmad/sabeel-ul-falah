"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from "lucide-react"
import Image from "next/image"

interface ContactSectionProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

const ContactInfo = ({ 
  icon: Icon, 
  title, 
  content, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  content: string, 
  delay: number 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">{title}</h3>
            <p className="text-emerald-100 leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const InputField = ({ 
  icon: Icon, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  isTextArea = false 
}: { 
  icon: React.ComponentType<{ className?: string }>
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  isTextArea?: boolean
}) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-emerald-100 font-medium">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {required && <span className="text-red-400">*</span>}
    </label>
    {isTextArea ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
      />
    )}
  </div>
)

export default function ModernContactSection({ t, language }: ContactSectionProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
    
    setIsSubmitting(false)
    alert(t("contact.success") || "Message sent successfully!")
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.address.title") || "Address",
      content: `${t("footer.address.street")}, ${t("footer.address.city")}, ${t("footer.address.country")}` || "Karachi, Pakistan"
    },
    {
      icon: Phone,
      title: t("contact.phone.title") || "Phone",
      content: t("footer.phone") || "+92 XXX XXXXXXX"
    },
    {
      icon: Mail,
      title: t("contact.email.title") || "Email",
      content: t("footer.email") || "info@sabeelulfalah.com"
    },
    {
      icon: Clock,
      title: t("contact.hours.title") || "Office Hours",
      content: language === "ur" ? "صبح 8 بجے سے شام 5 بجے تک" : "Monday - Friday: 8:00 AM - 5:00 PM"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/quranAyat1.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
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
              {t("contact.title") || "Contact Us"}
            </span>
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {t("contact.subtitle") || "Get in touch with us for admissions, inquiries, or to learn more about our programs."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-8">
                {t("contact.info.title") || "Get In Touch"}
              </h3>
              <p className="text-emerald-100 text-lg leading-relaxed mb-8">
                {t("contact.info.description") || "We're here to help you on your journey of Islamic education. Reach out to us through any of the following channels."}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactInfo
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <h4 className="text-yellow-400 font-semibold mb-4">
                {t("contact.map.title") || "Find Us"}
              </h4>
              <div className="w-full h-48 bg-emerald-800/30 rounded-xl flex items-center justify-center">
                <MapPin className="h-12 w-12 text-emerald-400" />
              </div>
              <p className="text-emerald-200 text-sm mt-3">
                {t("contact.map.description") || "Interactive map will be available here"}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-yellow-400 mb-8">
                {t("contact.form.title") || "Send Message"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label={t("contact.form.name") || "Full Name"}
                    placeholder={t("contact.form.name_placeholder") || "Enter your full name"}
                    value={formData.name}
                    onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                    required
                  />
                  
                  <InputField
                    icon={Mail}
                    label={t("contact.form.email") || "Email"}
                    type="email"
                    placeholder={t("contact.form.email_placeholder") || "Enter your email"}
                    value={formData.email}
                    onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    icon={Phone}
                    label={t("contact.form.phone") || "Phone"}
                    type="tel"
                    placeholder={t("contact.form.phone_placeholder") || "Enter your phone number"}
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  />
                  
                  <InputField
                    icon={MessageSquare}
                    label={t("contact.form.subject") || "Subject"}
                    placeholder={t("contact.form.subject_placeholder") || "Message subject"}
                    value={formData.subject}
                    onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                    required
                  />
                </div>

                <InputField
                  icon={MessageSquare}
                  label={t("contact.form.message") || "Message"}
                  placeholder={t("contact.form.message_placeholder") || "Write your message here..."}
                  value={formData.message}
                  onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
                  required
                  isTextArea
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{t("contact.form.submit") || "Send Message"}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
