'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticleBackground from '../shared/ParticleBackground'

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20"
      >
        {/* Animated Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden"
          >
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
              {['W', 'O', 'N', 'D', 'E', 'R', 'G', 'L', 'O', 'B', 'E'].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                  className="inline-block bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 40px rgba(251, 146, 60, 0.3)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-2xl md:text-4xl text-gray-300 font-light mb-4"
          >
            Immersive Travel Experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['UX Research', 'Interaction Design', 'Prototyping', '8min Case Study'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-full text-sm text-orange-400 font-medium hover:bg-orange-500/10 hover:border-orange-500/50 transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Video Container with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group perspective-[2000px]"
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_80px_-20px_rgba(251,146,60,0.4)] transform-gpu"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Placeholder for Video */}
            <div className="relative aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20"
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 mb-8 mx-auto rounded-full border-4 border-orange-500/30 border-t-orange-500"
                  />
                  <p className="text-gray-400 text-lg mb-2">8-Minute Prototype Video</p>
                  <p className="text-gray-600 text-sm">(Compressing 759MB video for web...)</p>
                </div>
              </div>

              {/* Animated Corner Accents */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-orange-500/50"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-orange-500/50"
              />
            </div>

            {/* Glassmorphic Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Floating Elements Around Video */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -right-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-bold shadow-lg hidden md:block"
          >
            ⭐ Featured
          </motion.div>

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hidden md:block"
          >
            🎨 Case Study
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-gray-400 text-sm font-medium tracking-wider">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
