'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  TrendingUp,
  Shield,
  BarChart3,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Command,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      const busId = 1; // Spectrum Mobile demo
      const res = await fetch(`http://localhost:8000/process/${busId}?query=${encodeURIComponent(searchQuery)}`, {
        method: 'POST'
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] dark:bg-black selection:bg-blue-500/30">
      {/* Precision Navigation */}
      <nav className="nav-blur px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-black dark:bg-white rounded-[7px] flex items-center justify-center">
            <TrendingUp size={18} className="text-white dark:text-black" />
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">StorePulse AI</span>
        </motion.div>

        <div className="flex gap-8 items-center">
          <div className="hidden md:flex gap-8">
            {['Product', 'Intelligence', 'Security'].map((item) => (
              <a key={item} href="#" className="text-[13px] font-medium text-slate-500 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>
          <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-[14px]">
            Dashboard
            <ChevronRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero: The Big Reveal */}
      <section className="relative pt-32 pb-20 px-6 max-w-[1240px] mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full text-[12px] font-semibold mb-10 tracking-wide text-zinc-500 dark:text-zinc-400">
            <Sparkles size={12} className="text-blue-500" />
            EVOLVING OPERATIONAL INTELLIGENCE
          </div>

          <h1 className="text-[56px] md:text-[84px] font-[700] leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white mb-10">
            Intelligence that <br />
            <span className="text-zinc-400 dark:text-zinc-600">scales with your business.</span>
          </h1>

          <p className="text-[19px] md:text-[22px] text-zinc-500 dark:text-zinc-400 max-w-[700px] mx-auto mb-16 font-medium leading-[1.45]">
            Aggregate location data, automate sentiment analysis, and uncover <br className="hidden md:block" />
            evidence-backed operational insights in real-time.
          </p>

          {/* Premium Search Experience */}
          <form onSubmit={handleSearch} className="relative max-w-[640px] mx-auto mb-24">
            <div className={`
                relative flex items-center p-2 rounded-[22px] transition-all duration-500
                ${isFocused ? 'bg-white dark:bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.12)]' : 'bg-zinc-100/80 dark:bg-zinc-900/50'}
                border ${isFocused ? 'border-blue-500/20' : 'border-black/[0.03] dark:border-white/[0.03]'}
              `}>
              <div className="flex-1 flex items-center pl-6">
                <Search className={`transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-zinc-400'}`} size={22} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter store or business name..."
                  className="w-full py-5 px-4 text-[17px] bg-transparent outline-none placeholder:text-zinc-400 font-medium text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`
                    flex items-center gap-2 px-8 py-4 rounded-[16px] font-bold transition-all duration-500
                    ${searchQuery && !loading ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-100' : 'bg-black dark:bg-zinc-800 text-zinc-500 scale-[0.98] opacity-50'}
                  `}
              >
                {loading ? 'Processing...' : 'Search'}
                <Command size={16} />
              </button>
            </div>

            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-4 glass-card p-4 z-50 overflow-hidden"
                >
                  <p className="text-[12px] font-bold text-zinc-400 dark:text-zinc-500 mb-4 px-2 uppercase tracking-widest">Suggested Trends</p>
                  <div className="space-y-1">
                    {['Spectrum Mobile NY', 'AT&T Dallas', 'Verizon Los Angeles'].map((s) => (
                      <button key={s} className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group">
                        <span className="text-[15px] font-medium text-slate-700 dark:text-zinc-300">{s}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Dynamic Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 max-w-[1100px] mx-auto">
          {[
            {
              title: 'Sentiment Core',
              desc: 'Deep linguistic analysis to detect frustration before it turns into churn.',
              icon: BarChart3,
              accent: 'bg-blue-500'
            },
            {
              title: 'Risk Guard',
              desc: 'Automated legal and urgency monitoring for critical store incidents.',
              icon: Shield,
              accent: 'bg-indigo-500'
            },
            {
              title: 'AI Synthesis',
              desc: 'High-fidelity response generation tailored to your brand voice.',
              icon: MessageSquare,
              accent: 'bg-zinc-900'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-10 group hover:scale-[1.02] transition-all duration-500"
            >
              <div className={`w-10 h-10 ${feature.accent} rounded-[10px] flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/10`}>
                <feature.icon size={20} />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-4 tracking-[-0.01em]">{feature.title}</h3>
              <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section >

      {/* Decorative Background Glows */}
      < div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-900/20 blur-[120px] -z-10 rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-900/20 blur-[120px] -z-10 rounded-full" />
    </div >
  );
}
