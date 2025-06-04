'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TemplatePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('Singtel');
  const [requestType, setRequestType] = useState('access');
  const [reason, setReason] = useState('');
  const [dsarLetter, setDsarLetter] = useState('');
  const [error, setError] = useState('');
  const letterRef = useRef(null); // ✅ JS-compatible ref

  const generateLetter = () => {
    if (!name || !email || !mobile || !company) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    const actionText =
      requestType === 'access'
        ? 'access to'
        : requestType === 'correction'
        ? 'correction of'
        : 'deletion of';
    const reasonText = reason ? `Reason: ${reason}` : '';

    const letter = `To: dop@${company.toLowerCase()}.com

Subject: Data Subject Access Request – ${requestType.charAt(0).toUpperCase() + requestType.slice(1)} Request

Dear ${company},

I am writing to formally request the ${actionText} my personal data under the Singapore Personal Data Protection Act (PDPA).

Full Name: ${name}
Email: ${email}
Mobile Number: ${mobile}
${reasonText}

Please confirm receipt of this request and respond within the required timeframe.

Thank you.

Best regards,
${name}`;

    setDsarLetter(letter);

    setTimeout(() => {
        if (letterRef.current) {
          const offsetTop = letterRef.current.getBoundingClientRect().top + window.pageYOffset + 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
      
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dsarLetter);
  };
  const closeLetter =() =>{
    setDsarLetter(null);
  }
  return (
    <div className="min-h-screen px-6 pt-[100px] flex flex-col items-center justify-center text-center ml-[12vw] overflow-y-auto">
      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-gray-900 mb-10 font-[var(--font-title)]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Generate your DSAR letter in seconds
      </motion.h1>

      {error && (
        <p className="text-red-500 font-medium text-sm mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name *"
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number *"
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (e.g., Singtel) *"
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="access">Access</option>
          <option value="correction">Correction</option>
          <option value="deletion">Deletion</option>
        </select>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional Reason"
          className="w-full py-3 px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={generateLetter}
        className="mb-6 bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition"
      >
        Generate Letter
      </button>


      {dsarLetter && (
        <div
          ref={letterRef}
          className="max-w-3xl w-full bg-white shadow-md rounded-xl p-6 text-left mb-10"
        >
          <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">{dsarLetter}</pre>
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white py-2 px-5 rounded-full hover:bg-blue-700 text-sm"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={closeLetter}
            className="bg-red-600 text-white py-2 ml-2 px-5 rounded-full hover:bg-red-700 text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
