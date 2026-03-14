'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import ScrollAnimation from '@/components/animations/ScrollAnimation'

const ease = [0.16, 1, 0.3, 1] as const

function ScreenCard({ src, label, desc, index }: { src: string; label: string; desc: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <ScrollAnimation delay={index * 0.12}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-2 md:p-3 transition-all duration-500 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10">
          {/* Spotlight effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.08), transparent 60%)`,
            }}
          />
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white font-semibold text-lg">{label}</p>
              <p className="text-gray-300 text-sm mt-1">{desc}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollAnimation>
  )
}

export default function Wonderglobe() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 1000], [0, 200])
  const orb2Y = useTransform(scrollY, [0, 1000], [0, -150])
  const orb3Y = useTransform(scrollY, [0, 2000], [0, -300])

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0])

  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "center center"]
  })
  const videoScale = useTransform(videoScrollProgress, [0, 1], [0.8, 1])
  const videoBorderRadius = useTransform(videoScrollProgress, [0, 1], [48, 16])

  useEffect(() => {
    setHeroLoaded(true)
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

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

  const processSteps = [
    { num: '01', title: 'Research', desc: 'User interviews, competitive analysis, and persona development' },
    { num: '02', title: 'Define', desc: 'Problem framing, user flows, and information architecture' },
    { num: '03', title: 'Design', desc: 'Wireframes, visual design system, and interaction patterns' },
    { num: '04', title: 'Prototype', desc: 'High-fidelity interactive prototype with micro-interactions' },
    { num: '05', title: 'Test', desc: 'Usability testing, iteration, and final refinements' },
  ]

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Parallax orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: orb1Y }} className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/8 to-amber-500/8 rounded-full blur-[120px]" />
        <motion.div style={{ y: orb2Y }} className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-orange-400/6 to-yellow-500/6 rounded-full blur-[100px]" />
        <motion.div style={{ y: orb3Y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/4 to-orange-600/4 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="https://aruntscaria.com" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:via-amber-500/20 hover:to-yellow-500/20 backdrop-blur-sm border border-white/30 rounded-full p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="hidden md:inline text-sm text-gray-300 group-hover:text-orange-400 transition-colors duration-300 font-medium">Back to Home</span>
            </a>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div className="text-xl font-bold text-white">WONDERGLOBE</div>
            </div>

            <div className="w-24 hidden md:block"></div>
          </div>
        </div>
      </nav>

      {/* Hero — Cinematic */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/images/projects/wonderglobe/homepage.png"
            alt="WONDERGLOBE"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 text-xs tracking-[0.3em] uppercase font-medium">UX Case Study</span>
          </motion.div>

          {/* Title with staggered reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 120 }}
              animate={heroLoaded ? { y: 0 } : {}}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
              className="text-[clamp(2.5rem,10vw,8rem)] lg:text-9xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent block sm:inline">WONDER</span>
              <span className="text-white block sm:inline">GLOBE</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Immersive VR Travel Experience
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-12"
          >
            Explore London landmarks through interactive worlds — from research to high-fidelity prototype
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {['UX Research', 'VR Design', 'Interaction Design', 'User Flows', 'Prototyping', 'Figma', 'Usability Testing'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-sm text-gray-200 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], height: [6, 10, 6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-orange-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { value: 'VR / Mobile', label: 'Platform' },
              { value: '12 Weeks', label: 'Duration' },
              { value: 'Figma & Miro', label: 'Tools' },
              { value: 'UX Designer', label: 'Role' },
            ].map((stat, i) => (
              <ScrollAnimation key={stat.label} delay={i * 0.1}>
                <div className="py-8 md:py-12 px-6 md:px-10 text-center group hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors duration-500">{stat.value}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showreel */}
      <section ref={videoSectionRef} className="relative px-4 md:px-8 py-16 md:py-24 z-10">
        <ScrollAnimation>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-4">Prototype Video</p>
            <h2 className="text-4xl md:text-5xl font-bold">Full Interactive Demo</h2>
          </div>
        </ScrollAnimation>

        <motion.div
          style={{ scale: videoScale, borderRadius: videoBorderRadius }}
          className="relative overflow-hidden bg-zinc-900 aspect-video max-w-[1400px] mx-auto group"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/projects/wonderglobe/homepage.png"
          >
            <source src="/videos/wonderglobe-cloud.mp4" type="video/mp4" />
          </video>

          {/* Video controls — always visible */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2 md:gap-3">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:border-orange-500/50 transition-colors text-xs md:text-sm"
            >
              {isPlaying ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 backdrop-blur-md border rounded-full text-xs md:text-sm transition-all duration-300 ${
                isMuted
                  ? 'bg-orange-500/90 border-orange-400 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-black/60 border-white/20 text-white hover:border-orange-500/50'
              }`}
            >
              {isMuted ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  <span className="hidden sm:inline font-medium">Unmute</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span className="hidden sm:inline">Sound On</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 pointer-events-none">
            <p className="text-orange-400 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-3">8-Minute Walkthrough</p>
            <h3 className="text-lg md:text-4xl font-bold mb-1 md:mb-2">WONDERGLOBE Prototype</h3>
            <p className="text-gray-400 text-xs md:text-base max-w-lg hidden sm:block">Complete interactive prototype demo with audio narration</p>
          </div>
        </motion.div>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      {/* Project Overview */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-start">
            <div className="md:col-span-7">
              <ScrollAnimation>
                <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-6">Overview</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                  Bringing London to{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">life</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  WONDERGLOBE is an immersive VR travel application that lets users explore iconic London landmarks through interactive virtual worlds. The project was designed from the ground up with a user-centered approach.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  From initial user research and competitive analysis to wireframing, user flows, and high-fidelity prototyping — every decision was informed by real user needs and validated through testing.
                </p>
              </ScrollAnimation>
            </div>

            <div className="md:col-span-5">
              <ScrollAnimation delay={0.2}>
                <div className="space-y-4">
                  {[
                    { label: 'Challenge', value: 'Making virtual travel feel tangible and educational' },
                    { label: 'Solution', value: 'Interactive VR worlds with gamified exploration' },
                    { label: 'Outcome', value: 'Full prototype with validated usability' },
                  ].map((item) => (
                    <div key={item.label} className="p-5 border border-white/5 rounded-xl bg-white/[0.02] hover:border-orange-500/20 transition-colors duration-500">
                      <div className="text-orange-400 text-xs uppercase tracking-wider mb-2 font-medium">{item.label}</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{item.value}</div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Timeline */}
      <section className="py-20 md:py-28 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimation>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-4">Methodology</p>
              <h2 className="text-4xl md:text-5xl font-bold">Design Process</h2>
            </div>
          </ScrollAnimation>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px bg-gradient-to-b from-orange-500/50 via-amber-500/30 to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-0">
              {processSteps.map((step, i) => (
                <ScrollAnimation key={step.num} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <div className={`p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-orange-500/20 transition-all duration-500 group hover:bg-white/[0.04] ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} md:max-w-md`}>
                        <span className="text-orange-500/60 text-5xl font-bold leading-none block mb-3">{step.num}</span>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#050505] z-10 mt-10" />

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      {/* UI Screens Gallery */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimation>
            <div className="mb-16 md:mb-20">
              <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-4">High-Fidelity Screens</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Interfaces</h2>
              <p className="text-gray-500 text-lg max-w-xl">Hover and interact with the screens to explore the design details</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { src: '/images/projects/wonderglobe/homepage.png', label: 'Homepage — World Selection', desc: 'Christmas market scene with immersive world cards for exploration' },
              { src: '/images/projects/wonderglobe/trafalgar.png', label: 'Trafalgar Square — Landing', desc: 'Landmark exploration entry with ambient visuals and navigation' },
              { src: '/images/projects/wonderglobe/world.png', label: 'World Exploration View', desc: 'Interactive 3D environment with navigation points and discovery' },
              { src: '/images/projects/wonderglobe/question.png', label: 'Interactive Quiz Screen', desc: 'Gamified knowledge checks embedded within the VR experience' },
            ].map((screen, i) => (
              <ScreenCard key={screen.label} {...screen} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* UX Artifacts */}
      <section className="py-24 md:py-32 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimation>
            <div className="mb-16 md:mb-20">
              <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-4">UX Artifacts</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Research & Architecture</h2>
              <p className="text-gray-500 text-lg max-w-xl">The structural foundation that informed every design decision</p>
            </div>
          </ScrollAnimation>

          <div className="space-y-16">
            {[
              { src: '/images/projects/wonderglobe/userflow.jpg', label: 'User Flow', desc: 'Complete user journey mapping from onboarding through world exploration to quiz completion' },
              { src: '/images/projects/wonderglobe/taskflow.jpg', label: 'Task Flow', desc: 'Detailed task analysis showing key interaction paths and decision points' },
              { src: '/images/projects/wonderglobe/sitemap.jpg', label: 'Sitemap', desc: 'Information architecture outlining the full application structure and navigation hierarchy' },
            ].map((artifact, i) => (
              <ScrollAnimation key={artifact.label} delay={i * 0.1}>
                <div className="group">
                  {/* Label above */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-orange-500/60 text-sm font-mono">0{i + 1}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-white font-semibold text-lg">{artifact.label}</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                    <span className="text-orange-500/60 text-sm font-mono">0{i + 1}</span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 md:p-5 transition-all duration-500 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10">
                    <Image
                      src={artifact.src}
                      alt={artifact.label}
                      width={1400}
                      height={900}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-4 text-center">{artifact.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-zinc-900 to-black text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Let&apos;s Create Something Amazing
          </h3>
          <p className="text-xl mb-8 text-gray-300">Available for UX design opportunities in the UK and remote projects worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:aruntharappel95@gmail.com" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all">Get in Touch</a>
            <a href="https://aruntscaria.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all">View Portfolio</a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">&copy; 2025 WONDERGLOBE. Crafted with passion for exceptional user experiences.</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25" aria-label="Back to top">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      )}
    </div>
  )
}
