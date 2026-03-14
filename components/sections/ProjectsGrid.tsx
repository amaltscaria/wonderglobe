'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ScrollAnimation from '../animations/ScrollAnimation'
import { projects, type Project } from '@/lib/projects-data'

// Creative project card with unique hover effects
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovering(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${project.gridSpan === 'large' ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <motion.div
        className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/5"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(800px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(251, 146, 60, 0.08), transparent 50%)`,
          }}
        />

        {/* Dynamic light beam effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          animate={{
            opacity: isHovering ? [0, 0.5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovering ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            background: `linear-gradient(${(x.get() + y.get()) * 180}deg, transparent, rgba(251, 146, 60, 0.1), transparent)`,
          }}
        />

        {/* Project Image/Thumbnail Area */}
        <div className="relative h-64 overflow-hidden">
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-6 right-6 z-10 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg"
            >
              ⭐ Featured Project
            </motion.div>
          )}

          {/* Creative gradient placeholder */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-8xl"
              >
                {project.category === 'Mobile' ? '📱' : project.category === 'Dashboard' ? '📊' : '🎨'}
              </motion.span>
            </div>

            {/* Morphing shapes */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"
              animate={{
                x: isHovering ? [0, 100, 0] : 0,
                y: isHovering ? [0, 50, 0] : 0,
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl"
              animate={{
                x: isHovering ? [0, -80, 0] : 0,
                y: isHovering ? [0, -60, 0] : 0,
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Scan line effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ y: '-100%' }}
            animate={{ y: isHovering ? '200%' : '-100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(251, 146, 60, 0.2), transparent)',
              height: '30%',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative p-8" style={{ transform: 'translateZ(50px)' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3
                className="text-3xl font-bold mb-2"
                whileHover={{ x: 5 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-orange-400 bg-clip-text text-transparent">
                  {project.title}
                </span>
              </motion.h3>
              <p className="text-gray-400 font-medium">{project.role}</p>
            </div>
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full border border-orange-500/30"
            >
              {project.category}
            </motion.span>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">{project.description}</p>

          {/* Tags with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded-full border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CTA with magnetic effect */}
          {project.link && (
            <motion.a
              href={project.link}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-full text-orange-400 font-semibold hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
              whileHover={{ x: 5 }}
              data-cursor-text="View"
            >
              <span>Explore Case Study</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          )}
        </div>

        {/* Glowing border effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            opacity: isHovering ? [0, 0.5, 0] : 0,
          }}
          transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
          style={{
            boxShadow: `0 0 60px 10px rgba(251, 146, 60, 0.3)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<'All' | Project['category']>('All')

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter)

  const categories = ['All', 'Mobile', 'Web', 'Dashboard', 'Case Study'] as const

  return (
    <section id="projects" className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Selected Work
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Crafting digital experiences with a focus on user-centered design and creative innovation
            </motion.p>
          </div>
        </ScrollAnimation>

        {/* Category Filter with unique styling */}
        <ScrollAnimation delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-3 rounded-full font-semibold transition-all overflow-hidden ${
                  filter === category
                    ? 'text-white'
                    : 'text-gray-400 border border-white/10 hover:border-orange-500/50'
                }`}
                data-cursor-text={category}
              >
                {filter === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Bento-style Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
