'use client'

import { motion } from 'framer-motion'
import ScrollAnimation from '../animations/ScrollAnimation'

export default function Contact() {
  const socialLinks = [
    { name: 'Email', icon: '✉️', href: 'mailto:arun@aruntscaria.com', label: 'arun@aruntscaria.com' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/aruntscaria', label: 'linkedin.com/in/aruntscaria' },
    { name: 'Behance', icon: '🎨', href: 'https://behance.net/aruntscaria', label: 'behance.net/aruntscaria' },
    { name: 'Dribbble', icon: '🏀', href: 'https://dribbble.com/aruntscaria', label: 'dribbble.com/aruntscaria' },
  ]

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <ScrollAnimation>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Let's Create</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and bring your vision to life with exceptional design.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.a
              href="mailto:arun@aruntscaria.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              ✉️ Get in Touch
            </motion.a>
            <motion.a
              href="https://aruntscaria.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-orange-500 text-white font-semibold rounded-full hover:bg-orange-500/10 transition-all"
            >
              🌐 View Full Portfolio
            </motion.a>
          </div>
        </ScrollAnimation>

        {/* Social Links */}
        <ScrollAnimation delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <div className="text-white font-semibold mb-1 group-hover:text-orange-500 transition-colors">
                  {link.name}
                </div>
                <div className="text-gray-400 text-sm truncate">{link.label}</div>
              </motion.a>
            ))}
          </div>
        </ScrollAnimation>

        {/* Footer */}
        <ScrollAnimation delay={0.8}>
          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Arun T Scaria. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Designed & Developed with ❤️ using Next.js, React, and Framer Motion
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
