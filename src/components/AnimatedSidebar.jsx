'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COLUMNS = 2;
const ROWS = 3;
const DOT_COUNT = COLUMNS * ROWS;
const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#0EA5E9', // sky
  '#EC4899', // pink
];

export default function AnimatedSidebar() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const dots = useMemo(() => {
    return Array.from({ length: DOT_COUNT }).map((_, i) => {
      const row = Math.floor(i / COLUMNS);
      const col = i % COLUMNS;
      const horizontalDirection = col === 0 ? 1 : -1;
      const verticalDirection = row === 1 ? 0 : row === 0 ? 1 : -1;
      const color = COLORS[i % COLORS.length];
      return {
        id: i,
        dx: horizontalDirection * 8, // increased inward squeeze
        dy: verticalDirection * 8,
        color,
      };
    });
  }, []);

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

  if (!hasMounted) return null;

  return (
    <div className="flex min-h-screen relative">
      {/* Dot grid */}
      <motion.div
        key="dots"
        className="fixed top-1/2 -translate-y-1/2 z-10 cursor-pointer"
        style={{
          left: '2vw', // More padding from the left
          width: '8vw',
          height: '60vh',
          padding: '1vh 0.5vw',
          display: 'grid',
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gap: '1vw',
        }}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="rounded-full"
            style={{
              width: '0.7vw',
              height: '0.7vw',
              backgroundColor: dot.color,
            }}
            animate={{
              x: expanded ? dot.dx : 0,
              y: expanded ? dot.dy : 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Sidebar */}
      {open && (
        <motion.aside
          className="fixed top-0 left-[12vw] h-screen w-64 bg-white shadow-xl z-20 flex flex-col justify-between p-6"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <nav className="space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-gray-500 mt-8">
            © {new Date().getFullYear()} Your Project
          </div>
        </motion.aside>
      )}

      <main className="flex-1 p-6 ml-[12vw]">{/* Page content here */}</main>
    </div>
  );
}
