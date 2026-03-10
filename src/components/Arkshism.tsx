'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

// --- ANIMATION VARIANTS ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between the 3 pillar cards
    },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Arkshism() {
  return (
    <section className="py-20 px-4 bg-linear-to-br from-slate-100 to-blue-100 relative overflow-hidden">
      <div className="absolute top-0 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-50 z-0 translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-50 z-0 -translate-x-1/3 translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        {/* Top Card - Scales in on scroll */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="bg-white rounded-2xl shadow-lg p-10 text-center mb-16"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://www.arkshgroup.com/arksh-round.png"
              alt="Arksh Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">Arkshism</h2>

          {/* Underline */}
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded"></div>

          {/* Description */}
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The guiding philosophy behind this identity and visual representation of logo is known
            as Arkshism, a concept rooted in aspiration and stellar excellence.
          </p>
        </motion.div>

        {/* 3 Cards Grid - Staggered Slide Up */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="bg-[#3498DB] text-white p-8 rounded-2xl shadow-lg text-center cursor-pointer
               transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ★
            </div>
            <h3 className="text-xl font-bold mb-3">ARKSH means "Of The Stars"</h3>
            <p className="text-sm leading-relaxed text-blue-100">
              The name "ARKSH" was chosen by the CEO of Arksh Group. The name ARKSH is of Sanskrit
              origin and means "Of The Stars" or "Celestial," representing the group’s aspiration
              for excellence.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="bg-[#3498DB] text-white p-8 rounded-2xl shadow-lg text-center cursor-pointer
               transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              A
            </div>
            <h3 className="text-xl font-bold mb-3">A Legacy in Letters</h3>
            <p className="text-sm leading-relaxed text-blue-100">
              The pronunciation aligns with the initials of our leadership, forming a meaningful and
              deeply connected brand identity.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="bg-[#3498DB] text-white p-8 rounded-2xl shadow-lg text-center cursor-pointer
               transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ⛓
            </div>
            <h3 className="text-xl font-bold mb-3">Interconnections</h3>
            <p className="text-sm leading-relaxed text-blue-100">
              The logo, slogan, and name are interconnected, emphasizing devotion to achieving the
              highest goals and inspiring others.
            </p>
          </motion.div>
        </motion.div>

        {/* Button - Fades in last */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-14"
        >
          <Link href="/arkshism">
            <button
              className="bg-[#3498DB] text-white px-10 py-4 rounded-full font-semibold shadow-lg 
                       hover:bg-[#2357A6] hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Learn More →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
