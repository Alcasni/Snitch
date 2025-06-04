'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => {
      setResults({
        companies: ['ShopNow SG', 'FoodFast', 'MyTelco'],
        actions: ['Access Request', 'Erasure Request'],
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen px-6 flex flex-col items-center justify-center text-center ml-[12vw]">
      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 font-[var(--font-title)]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Find out who has your data<br />and what you can do about it
      </motion.h1>

      <div className="relative w-full max-w-xl mb-10">
        <input
          type="email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your email (e.g. you@example.com)"
          className="w-full py-4 pl-6 pr-32 rounded-full text-base shadow-sm border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
        />
        <button
          onClick={handleSearch}
          disabled={!query || loading}
          className="absolute right-2 top-2 bottom-2 px-5 bg-zinc-700 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Try me'}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mb-12">
        <div className="bg-white shadow-md rounded-xl p-5 w-64 h-36 flex flex-col justify-center items-start text-left">
          <h4 className="font-semibold mb-2 text-sm text-zinc-900">Know Your Rights</h4>
          <p className="text-sm text-zinc-500">Learn how Singapore's PDPA protects your personal data.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 w-64 h-36 flex flex-col justify-center items-start text-left">
          <h4 className="font-semibold mb-2 text-sm text-zinc-900">Who Has Your Data</h4>
          <p className="text-sm text-zinc-500">Search for organizations that may store your information.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 w-64 h-36 flex flex-col justify-center items-start text-left">
          <h4 className="font-semibold mb-2 text-sm text-zinc-900">Take Action</h4>
          <p className="text-sm text-zinc-500">Generate access or deletion requests in one click.</p>
        </div>
      </div>

      <p className="max-w-xl text-zinc-400 mb-6 text-sm">
        Your personal data is scattered across countless digital services. Snitch helps you find it and assert your rights—no account, no tracking, no nonsense.
      </p>

      <button className="bg-black text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-gray-800">
        Get a demo
      </button>
    </div>
  );
}
