'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.7 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full border cursor-pointer"
          style={{
            backgroundColor: 'var(--ink-1)',
            borderColor: 'var(--ink-border-strong)',
            transition: 'background-color var(--t-spring), box-shadow var(--t-spring), border-color var(--t-spring)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--gold)'
            e.currentTarget.style.boxShadow = '0 0 20px var(--gold-glow)'
            e.currentTarget.style.borderColor = 'var(--gold)'
            e.currentTarget.querySelector('svg')?.style.setProperty('color', 'white')
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ink-1)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = 'var(--ink-border-strong)'
            e.currentTarget.querySelector('svg')?.style.setProperty('color', 'var(--gold)')
          }}
          aria-label="Back to top"
        >
          <ArrowUp
            size={20}
            strokeWidth={2.5}
            style={{ color: 'var(--gold)', transition: 'color var(--t-spring)' }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
