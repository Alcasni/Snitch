'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COLUMNS = 2;
const ROWS = 3;
const DOT_COUNT = COLUMNS * ROWS;

const GRADIENT_COLORS = [
  '#FBBF24',
  '#F59E0B',
  '#EC4899',
  '#A855F7',
  '#8B5CF6',
  '#7C3AED',
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
  { label: 'Template', href: '/template' },
  { label: 'Communities', href: '/communities' },
  { label: 'Information', href: '/info' },
];

export default function AnimatedSidebar() {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const visited = localStorage.getItem('hasVisited');
    if (!visited) {
      setShowHint(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const dots = useMemo(() => {
    return Array.from({ length: DOT_COUNT }).map((_, i) => {
      const row = Math.floor(i / COLUMNS);
      const col = i % COLUMNS;
      const horizontalDirection = col === 0 ? 1 : -1;
      const verticalDirection = row === 1 ? 0 : row === 0 ? 1 : -1;
      const color = GRADIENT_COLORS[i];
      return {
        id: i,
        dx: horizontalDirection * 8,
        dy: verticalDirection * 8,
        color,
      };
    });
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* HEADER */}
      {/* <header className="w-full flex justify-between items-center pl-30 pr-6 py-5 bg-white z-0 fixed top-0 left-0">
        <h1 className="text-4xl font-extrabold text-black font-mono">Snitch</h1>
        <div className="text-black mr-10 px-15 py-3 rounded-xl text-xl font-bold border-black border-solid border-2 cursor-pointer hover:underline transition">
          <a href='/search'>Go</a>
        </div>
      </header> */}
      <header className="w-full flex justify-between items-center pl-10 pr-6 py-5 bg-white z-0 fixed top-0 left-0">
  <div className="flex items-center gap-3">
    <img
      src="/project/spying.png" // 🔁 Replace with your actual logo URL
      alt="Logo"
      className="h-20 w-20 object-contain"
    />
    <h1 className="text-4xl px-15 font-extrabold text-black tracking-wider"><a href='/'>Snitch</a></h1>
  </div>
  <div className="text-black mr-10 px-15 py-3 rounded-xl text-xl font-bold border-black border-solid border-2 cursor-pointer  hover:underline transition">
    <a href="/search">Go</a>
  </div>
</header>


      <div className="h-[72px]" />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Black background */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed top-0 left-0 h-screen z-[5] bg-black"
              initial={{ width: 0 }}
              animate={{ width: 'calc(10vw + 14rem)' }}
              exit={{ width: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Grey overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed top-0 right-0 h-screen z-[15]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 'calc(100vw - 10vw)',
                backgroundColor: '#927c78',
              }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Dot Grid */}
        <motion.div
          className="fixed top-3/5 -translate-y-1/2 z-10 cursor-pointer"
          style={{
            left: '2vw',
            width: '8vw',
            height: '60vh',
            padding: '1vh 0.5vw',
            display: 'grid',
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            gap: '1.2vw',
          }}
          onClick={() => {
            setOpen(!open);
            setShowHint(false);
          }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {/* Tooltip bubble */}
          {showHint && (
            <div className="absolute -top-10 left-0 text-xs text-black bg-white px-3 py-1 rounded shadow z-50 animate-bounce">
              💡 Click the dots to explore
            </div>
          )}

          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className={`rounded-full ${
                showHint ? 'animate-pulse' : ''
              }`}
              style={{
                width: '0.7vw',
                height: '0.7vw',
                backgroundColor: dot.color,
              }}
              animate={{
                x: expanded ? dot.dx : 0,
                y: expanded ? dot.dy : 0,
              }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        {/* Sidebar */}
        <AnimatePresence>
          {open && (
            <motion.aside
              className="fixed top-0 left-[10vw] h-screen w-56 bg-black text-white z-20 flex flex-col p-6 pt-24"
              style={{
                boxShadow: '10px 0 10px rgba(0, 0, 0, 0.4), 6px 0 15px rgba(0,0,0,0.2)',
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.nav
                className="flex flex-col justify-center items-start gap-6 flex-grow font-rajdhani"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className="hover:text-blue-400 transition-colors duration-200 text-lg"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Your Project
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <main className="flex-1 p-6 ml-[12vw]">{/* Page content here */}</main>
      </div>
    </div>
  );
}
