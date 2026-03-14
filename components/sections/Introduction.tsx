'use client'

import { motion } from 'framer-motion'
import ScrollAnimation from '../animations/ScrollAnimation'

export default function Introduction() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 blur-3xl transform -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <ScrollAnimation>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              UI/UX Designer
            </span>
            <br />
            <span className="text-white">crafting digital experiences</span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating user-centered designs that blend aesthetics with functionality.
            Specialized in mobile apps, dashboards, and immersive experiences.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              View Work
            </motion.a>
            <motion.a
              href="/resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-orange-500 text-white font-semibold rounded-full hover:bg-orange-500/10 transition-all"
            >
              Download Resume
            </motion.a>
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '7+', label: 'Projects' },
              { value: '3+', label: 'Years Experience' },
              { value: '100%', label: 'User-Centered' },
              { value: '∞', label: 'Creativity' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all overflow-hidden group"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.1), transparent 70%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Expertise Tags */}
        <ScrollAnimation delay={0.8}>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {[
              'User Research',
              'Wireframing',
              'Prototyping',
              'Mobile UI',
              'Dashboard Design',
              'Design Systems',
              'React & Next.js',
              'Figma',
              'Adobe XD',
            ].map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 rounded-full text-gray-300 text-sm hover:border-orange-500/50 hover:text-white transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
