'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  BarChart3,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Search,
  ChevronRight,
  MoreHorizontal,
  Bell,
  Command,
  ChevronDown,
  CheckCircle2,
  Clock,
  PhoneCall,
  BotOff
} from 'lucide-react';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [locations, setLocations] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      try {
        const busId = 1; // Spectrum Mobile demo
        const stateRes = await fetch(`http://localhost:8000/states/${busId}`);
        const statesData = await stateRes.json();
        setStates(['All States', ...statesData]);

        const locUrl = selectedState === 'All States'
          ? `http://localhost:8000/locations/${busId}`
          : `http://localhost:8000/locations/${busId}?state=${selectedState}`;

        const locRes = await fetch(locUrl);
        const locData = await locRes.json();
        setLocations(locData);

        const ticketRes = await fetch(`http://localhost:8000/tickets/${busId}`);
        const ticketData = await ticketRes.json();
        setTickets(ticketData);

        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };
    fetchData();
  }, [selectedState]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] dark:bg-black flex selection:bg-blue-500/30">
      {/* Precision Sidebar */}
      <aside className="w-72 nav-blur h-screen flex flex-col p-6 sticky top-0 hidden lg:flex">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-9 h-9 bg-black dark:bg-white rounded-[8px] flex items-center justify-center">
            <TrendingUp size={20} className="text-white dark:text-black" />
          </div>
          <h1 className="text-[19px] font-bold tracking-tight">StorePulse</h1>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Locations', icon: MapPin },
            { name: 'Intelligence', icon: BarChart3 },
            { name: 'Escalations', icon: AlertCircle },
          ].map((nav) => (
            <button
              key={nav.name}
              onClick={() => setSelectedTab(nav.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] font-semibold text-[14px] transition-all duration-300 ${selectedTab === nav.name
                ? 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white'
                : 'text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30'
                }`}
            >
              <nav.icon size={18} />
              {nav.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/[0.05] dark:border-white/[0.08]">
          <div className="flex items-center justify-between px-2 group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900 flex items-center justify-center font-bold text-[12px]">SK</div>
              <div>
                <p className="text-[14px] font-semibold">Saidharkotha</p>
                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Pro Tier</p>
              </div>
            </div>
            <MoreHorizontal size={16} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>

      {/* Main Orchestration Layer */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-[34px] font-bold tracking-tight text-slate-900 dark:text-white mb-2">Regional Operations</h2>
            <div className="flex items-center gap-2 text-zinc-500 font-medium text-[15px]">
              <span>Analyzing {locations.length} key locations</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
              <span className="text-blue-500 font-bold">{tickets.filter(t => t.status === 'OPEN').length} Urgent Alerts</span>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Precision State Selector */}
            <div className="relative">
              <button
                onClick={() => setIsStateOpen(!isStateOpen)}
                className="apple-input flex items-center gap-3 px-6 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="text-[14px] font-bold">{selectedState}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isStateOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isStateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-2 glass-card p-2 z-50 min-w-[180px] origin-top"
                  >
                    {states.map(s => (
                      <button
                        key={s}
                        onClick={() => { setSelectedState(s); setIsStateOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${selectedState === s ? 'bg-blue-500 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={17} />
              <input
                type="text"
                placeholder="Find a store..."
                className="apple-input pl-11 pr-4 w-full md:w-64"
              />
            </div>
            <button className="bg-zinc-100 dark:bg-zinc-900 w-11 h-11 flex items-center justify-center rounded-2xl relative hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              <Bell size={19} />
              {tickets.length > 0 && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#fbfbfd] dark:border-black"></span>
              )}
            </button>
          </div>
        </header>

        {/* Global Key Metrics */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Active Locations', value: locations.length.toString(), sub: `Operational in ${states.length - 1} states`, icon: MapPin, color: 'text-zinc-900 dark:text-white', bg: 'bg-zinc-100 dark:bg-zinc-900' },
            { label: 'Avg Rating', value: (locations.reduce((acc, l) => acc + l.rating, 0) / (locations.length || 1)).toFixed(1), sub: 'Across selected region', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
            { label: 'Critical Cases', value: tickets.filter(t => t.status === 'OPEN').length.toString().padStart(2, '0'), sub: 'Tickets requiring call', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
            { label: 'Intelligence Cap', value: '82%', sub: 'Accurate categorization', icon: BarChart3, color: 'text-zinc-900 dark:text-white', bg: 'bg-zinc-100 dark:bg-zinc-900' },
          ].map((stat, i) => (
            <motion.div key={i} variants={item} className="glass-card p-6 flex flex-col justify-between h-44 hover:scale-[1.01] transition-transform">
              <div className="flex justify-between items-start">
                <div className={`${stat.bg} ${stat.color} p-2.5 rounded-[12px]`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-[32px] font-bold tracking-tight text-slate-900 dark:text-white leading-none mb-2">{stat.value}</h3>
                <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                <p className="text-[12px] text-zinc-400 mt-1 font-medium">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Intelligence Orchestration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass-card p-8"
          >
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight text-zinc-800">Performance Distribution</h3>
              <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
                {['Live', 'History'].map(v => (
                  <button key={v} className={`px-4 py-1.5 rounded-lg text-[12px] font-extrabold transition-all ${v === 'Live' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-400'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {selectedTab === 'Escalations' ? (
                /* Ticket View */
                tickets.map((ticket, i) => (
                  <div key={i} className={`group flex items-center justify-between p-4 rounded-2xl border mb-2 transition-all ${ticket.priority === 'CRITICAL'
                      ? 'bg-red-50/30 dark:bg-red-900/10 border-red-500/20'
                      : 'bg-amber-50/30 dark:bg-amber-900/10 border-amber-500/10'
                    }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${ticket.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {ticket.priority === 'CRITICAL' ? <BotOff size={18} /> : <AlertCircle size={18} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[15px]">Ticket #{ticket.id}</h4>
                          {ticket.priority === 'CRITICAL' && (
                            <span className="bg-red-500 text-white text-[9px] font-[900] px-2 py-0.5 rounded-full uppercase tracking-tighter">Bot Failed</span>
                          )}
                        </div>
                        <p className="text-[12px] text-zinc-500 font-medium">{ticket.notes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={`text-[13px] font-bold ${ticket.priority === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'}`}>{ticket.priority} PRIORITY</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                          {ticket.priority === 'CRITICAL' ? 'Immediate Action' : 'Escalated'}
                        </p>
                      </div>
                      <button className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-2 ${ticket.priority === 'CRITICAL'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80'
                        }`}>
                        {ticket.priority === 'CRITICAL' ? <PhoneCall size={14} /> : null}
                        {ticket.priority === 'CRITICAL' ? 'Call Customer Now' : 'Assign Manager'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                /* Location View */
                locations.map((loc, i) => (
                  <div
                    key={i}
                    onClick={() => window.location.href = `/store/${loc.id}`}
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div>
                        <h4 className="font-bold text-[15px] group-hover:translate-x-1 transition-transform">{loc.address.split(',')[0]}</h4>
                        <p className="text-[12px] text-zinc-400 font-medium">{loc.city}, {loc.state}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="hidden md:flex flex-col items-end">
                        <span className="text-[15px] font-bold">{loc.rating}</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Rating</span>
                      </div>
                      <div className="w-32 hidden md:block">
                        <div className="flex justify-between mb-1.5 px-0.5">
                          <span className="text-[9px] font-bold text-zinc-400">PULSE</span>
                          <span className="text-[9px] font-bold text-zinc-400">{loc.review_count}</span>
                        </div>
                        <div className="h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((loc.review_count / 100) * 100, 100)}%` }}></div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-zinc-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
              {locations.length === 0 && !loading && (
                <div className="text-center py-20">
                  <p className="text-zinc-400 font-bold">No locations found in this region.</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1 glass-card p-8 flex flex-col"
          >
            <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Intelligence Categories</h3>

            <div className="flex-1 flex flex-col justify-center items-center relative mb-12">
              {/* Simulated concentric pulse pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                <div className="w-64 h-64 border-[12px] border-blue-500 rounded-full"></div>
                <div className="absolute w-48 h-48 border-[12px] border-blue-500/60 rounded-full"></div>
              </div>
              <div className="z-10 text-center">
                <p className="text-[44px] font-[900] tracking-tighter leading-none">82%</p>
                <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mt-2">Accuracy Grade</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { label: 'Billing Discrepancy', value: '42%', color: 'bg-blue-600' },
                { label: 'Threshold Delay', value: '28%', color: 'bg-zinc-900 dark:bg-white' },
                { label: 'Protocol Friction', value: '18%', color: 'bg-zinc-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-help">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                    <span className="text-[14px] text-zinc-500 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <span className="text-[14px] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
