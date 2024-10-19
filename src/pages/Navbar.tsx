import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

const links = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
  { name: 'Student Portal', href: '/student_portal' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full sticky top-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OMCDQzBo11aNK4tpTuOWHEZ69uoEMsR72w&s" 
              alt="Logo" 
              className="h-16"
            />
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}