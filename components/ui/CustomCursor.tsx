'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
        const text = target.getAttribute('data-cursor-text')
        if (text) setCursorText(text)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
          }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: isHovering ? 1.5 : 1,
            }}
            className="w-full h-full rounded-full border-2 border-white bg-white/10 backdrop-blur-sm"
          />
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute text-white text-xs font-bold whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor trail effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 48,
            height: isHovering ? 80 : 48,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 blur-xl"
        />
      </motion.div>
    </>
  )
}
