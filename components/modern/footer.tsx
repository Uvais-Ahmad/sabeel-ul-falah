"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Heart } from "lucide-react"
import Image from "next/image"

interface ModernFooterProps {
  t: (key: string) => string
  language: 'en' | 'ur'
  theme: string | undefined
}

const ContactItem = ({ 
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
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex items-start space-x-4 group"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h4 className="text-yellow-400 font-semibold mb-1">{title}</h4>
        <p className="text-emerald-100 text-sm leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
}

const SocialLink = ({ 
  icon: Icon, 
  href, 
  label, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  href: string, 
  label: string, 
  delay: number 
}) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="group relative"
    aria-label={label}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
      <Icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {label}
    </div>
  </motion.a>
)

export default function ModernFooter({ t, language }: ModernFooterProps) {
  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const contactInfo = [
    {
      icon: MapPin,
      title: t("footer.location") || "Address",
      content: `${t("footer.address.street")}, ${t("footer.address.city")}, ${t("footer.address.country")}` || "Karachi, Pakistan"
    },
    {
      icon: Phone,
      title: t("footer.phone_title") || "Phone",
      content: t("footer.phone") || "+92 XXX XXXXXXX"
    },
    {
      icon: Mail,
      title: t("footer.email_title") || "Email",
      content: t("footer.email") || "info@sabeelulfalah.com"
    },
    {
      icon: Clock,
      title: t("footer.hours") || "Office Hours",
      content: language === "ur" ? "صبح 8 بجے سے شام 5 بجے تک" : "8:00 AM - 5:00 PM"
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/footer2.jpg"
            alt="Footer Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/80"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* About Section */}
            <motion.div
              ref={footerRef}
              initial={{ opacity: 0, y: 50 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/kalma.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className={`text-2xl font-bold ${language === "ur" ? "font-gulzar" : ""}`}>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                    {t("siteName") || "Sabeel ul Falah"}
                  </span>
                </h3>
              </div>

              <p className="text-emerald-100 leading-relaxed text-sm">
                {t("footer.description") || "Dedicated to providing authentic Islamic education and nurturing the spiritual, moral, and intellectual development of our students."}
              </p>

              {/* Mission Statement */}
              <div className="backdrop-blur-md bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-300/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Our Mission</h4>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  {t("footer.mission") || "To be a beacon of Islamic knowledge and character, guiding students towards spiritual excellence and worldly success."}
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-8">
                {t("footer.contact") || "Contact Information"}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <ContactItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Links & Social */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Quick Links */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                  {t("footer.quick_links") || "Quick Links"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { href: "#about", label: t("nav.about") || "About" },
                    { href: "#programs", label: t("nav.programs") || "Programs" },
                    { href: "#gallery", label: language === "ur" ? "گیلری" : "Gallery" },
                    { href: "#contact", label: t("nav.contact") || "Contact" },
                    { href: "#donation", label: t("nav.donation") || "Donation" },
                    { href: "#fatwa", label: language === "ur" ? "فتویٰ" : "Fatwa" }
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={footerInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-emerald-200 hover:text-yellow-400 transition-colors duration-300 text-sm group"
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-6">
                  {t("footer.social") || "Follow Us"}
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={index}
                      icon={social.icon}
                      href={social.href}
                      label={social.label}
                      delay={0.7 + index * 0.1}
                    />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="backdrop-blur-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-300/30">
                <h4 className="text-yellow-400 font-semibold mb-3">
                  {t("footer.newsletter") || "Stay Updated"}
                </h4>
                <p className="text-emerald-100 text-sm mb-4">
                  {t("footer.newsletter_desc") || "Subscribe to receive updates about our programs and events."}
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t("footer.email_placeholder") || "Your email"}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-l-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-r-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300">
                    {t("footer.subscribe") || "Subscribe"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-emerald-800/50 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-emerald-200 text-sm flex items-center">
                <span>© {new Date().getFullYear()} {t("siteName") || "Sabeel ul Falah"}. </span>
                <span className="mx-2">Made with</span>
                <Heart className="h-4 w-4 text-red-500 mx-1" />
                <span>for the Ummah</span>
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-emerald-200">
                <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
                  {t("footer.privacy") || "Privacy Policy"}
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
                  {t("footer.terms") || "Terms of Service"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
