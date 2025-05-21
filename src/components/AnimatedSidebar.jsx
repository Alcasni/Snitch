'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const DOT_COUNT = 30;
const SPREAD_DISTANCE = 50;

export default function AnimatedSidebar() {
  const [open, setOpen] = useState(false);

  const dots = useMemo(() => {
    return Array.from({ length: DOT_COUNT }).map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));
  }, []);

  const containerVariants = {
    rest: {},
    hover: {}
  };

  const dotVariants = {
    rest: (custom) => ({
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 12 }
    }),
    hover: (custom) => ({
      x: Math.cos(custom.angle) * SPREAD_DISTANCE,
      y: Math.sin(custom.angle) * SPREAD_DISTANCE,
      scale: 1.3,
      transition: { type: 'spring', stiffness: 200, damping: 12 }
    })
  };

  const navItems = [
    { label: 'FOR WHAT', href: '#what' },
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'FUNCTIONAL', href: '#functionality' },
    { label: 'INTERFACE', href: '#interface' },
    { label: 'BENEFITS', href: '#benefits' },
    { label: 'PRICES', href: '#prices' },
    { label: 'PRODUCTS', href: '#products' },
    { label: 'SOLUTIONS', href: '#solutions' },
    { label: 'NEWS', href: '#news' },
    { label: 'ABOUT', href: '#about' },
  ];

  return (
    <div className="flex relative">
      <AnimatePresence>
        {!open ? (
          <motion.div
            key="dots-closed"
            className="grid grid-cols-2 gap-4 p-8 cursor-pointer z-10"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            variants={containerVariants}
            initial="rest"
            whileHover="hover"
          >
            {dots.map(dot => (
              <motion.div
                key={dot.id}
                custom={dot}
                variants={dotVariants}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: dot.color }}
              />
            ))}
          </motion.div>
        ) : (
          <>
            <motion.div
              key="dots-open"
              className="grid grid-cols-2 gap-4 p-8 cursor-pointer z-10"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={containerVariants}
              initial="rest"
              whileHover="hover"
            >
              {dots.map(dot => (
                <motion.div
                  key={dot.id}
                  custom={dot}
                  variants={dotVariants}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dot.color }}
                />
              ))}
            </motion.div>

            <motion.aside
              key="sidebar"
              className="ml-[112px] w-64 h-screen bg-gray-100 flex flex-col justify-between p-6 fixed top-0 left-0 z-20 shadow-xl"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              {/* Sidebar content remains the same */}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main page content */}
      <main className="flex-1 p-6">{/* Page content here */}</main>
    </div>
  );
}
