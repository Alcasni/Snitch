'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex items-center bg-white">
        {/* Left side: Text content */}
        <div className="w-[30vw] flex flex-col justify-center">
          <motion.h1
            className="text-6xl font-extrabold tracking-wider bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            Take Back Your Data
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-gray-700 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
          >
            Find who has your info and send a <span className="font-bold">removal request</span> — fast, simple, no login.
          </motion.p>
        </div>

        {/* Right side: Video or Image placeholder */}
        <div className="w-[50vw] h-[70vh] flex items-center justify-center">
          <div className="w-full h-full bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-gray-400 text-2xl">
            Video or Image Here
          </div>
        </div>
      </div>
    </>
  );
}
