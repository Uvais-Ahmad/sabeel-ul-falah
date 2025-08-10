"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"

interface GallerySectionProps {
  language: 'en' | 'ur'
  theme: string | undefined
}

const GalleryItem = ({ 
  src, 
  alt, 
  type = "image",
  delay,
  onClick 
}: { 
  src: string
  alt: string
  type?: "image" | "video"
  delay: number
  onClick: () => void
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
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
        <div className="relative aspect-square">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Play button for videos */}
          {type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
            </div>
          )}
          
          {/* Hover text */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-semibold">{alt}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Modal = ({ 
  isOpen, 
  onClose, 
  currentIndex, 
  images, 
  onPrevious, 
  onNext 
}: { 
  isOpen: boolean
  onClose: () => void
  currentIndex: number
  images: Array<{ src: string, alt: string, type?: string }>
  onPrevious: () => void
  onNext: () => void
}) => {
  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors duration-300"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm rounded-full p-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm rounded-full p-2"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={800}
            height={600}
            className="rounded-2xl shadow-2xl max-h-[80vh] w-auto object-contain"
          />
          
          {/* Image caption */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white font-semibold">{currentImage.alt}</p>
            <p className="text-emerald-200 text-sm mt-1">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ModernGallerySection({ language }: GallerySectionProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryItems = [
    { src: "/library.jpg", alt: "Islamic Library", type: "image" },
    { src: "/madarsa.jpg", alt: "Madrasa Building", type: "image" },
    { src: "/library.jpg", alt: "Students Learning", type: "image" },
    { src: "/madarsa.jpg", alt: "Prayer Hall", type: "image" },
    { src: "/library.jpg", alt: "Quran Class", type: "image" },
    { src: "/madarsa.jpg", alt: "Islamic Calligraphy", type: "image" },
    { src: "/library.jpg", alt: "Study Session", type: "video" },
    { src: "/madarsa.jpg", alt: "Community Event", type: "image" },
    { src: "/library.jpg", alt: "Arabic Class", type: "image" },
    { src: "/madarsa.jpg", alt: "Graduation Ceremony", type: "image" },
    { src: "/library.jpg", alt: "Morning Assembly", type: "image" },
    { src: "/madarsa.jpg", alt: "Achievement Awards", type: "image" }
  ]

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <section className="relative py-20 overflow-hidden" id="gallery">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
          {/* Animated background elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="gallery-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="2" fill="currentColor"/>
                  <rect x="8" y="8" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gallery-pattern)"/>
            </svg>
          </div>
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
                {language === "ur" ? "گیلری" : "Gallery"}
              </span>
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              {language === "ur" 
                ? "ہماری اسلامی تعلیمی سرگرمیوں اور کامیابیوں کی جھلکیاں"
                : "Glimpses of our Islamic educational activities and achievements"
              }
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <GalleryItem
                key={index}
                src={item.src}
                alt={item.alt}
                type={item.type as "image" | "video"}
                delay={index * 0.1}
                onClick={() => openModal(index)}
              />
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
            >
              {language === "ur" ? "مزید دیکھیں" : "View More"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        currentIndex={currentImageIndex}
        images={galleryItems}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  )
}
