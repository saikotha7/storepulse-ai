'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    AlertTriangle,
    MessageCircle,
    RotateCcw,
    ChevronRight,
    TrendingDown,
    TrendingUp,
    ExternalLink,
    ShieldCheck,
    Calendar,
    Share2,
    BarChart3,
    UserCheck,
    PhoneCall,
    CheckCircle2,
    BotOff
} from 'lucide-react';

export default function StoreDetail() {
    const params = useParams();
    const id = params?.id;
    const [store, setStore] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!id) return;
            try {
                const locRes = await fetch(`http://localhost:8000/locations/1`); // Using 1 for spectrum demo logic
                const locs = await locRes.json();
                const currentStore = locs.find((l: any) => l.id.toString() === id);
                setStore(currentStore);

                const revRes = await fetch(`http://localhost:8000/reviews/${id}`);
                const revData = await revRes.json();
                setReviews(revData);
                setLoading(false);
            } catch (e) {
                console.error("Fetch error:", e);
            }
        };
        fetchStoreData();
    }, [id]);
    return (
        <div className="min-h-screen bg-[#fbfbfd] dark:bg-black p-6 md:p-12 selection:bg-blue-500/30 font-[-apple-system]">
            <div className="max-w-[1100px] mx-auto">
                {/* Navigation & Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-5">
                        <Link href="/dashboard" className="w-10 h-10 glass rounded-[14px] flex items-center justify-center text-zinc-600 hover:scale-[1.05] transition-all">
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="flex items-center gap-2 text-[14px] font-semibold">
                            <Link href="/dashboard" className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Dashboard</Link>
                            <ChevronRight size={14} className="text-zinc-300" />
                            <span className="text-slate-900 dark:text-zinc-100">Store Precision View</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 glass rounded-[14px] flex items-center justify-center text-zinc-400 hover:text-blue-500 transition-colors">
                            <Share2 size={16} />
                        </button>
                        <button className="w-10 h-10 glass rounded-[14px] flex items-center justify-center text-zinc-400 hover:text-blue-500 transition-colors">
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* Global Store Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 mb-10 overflow-hidden relative"
                >
                    {!store ? (
                        <div className="h-40 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                            <div>
                                {reviews.some(r => r.urgency_flag === 'CRITICAL') && (
                                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-[11px] font-[800] uppercase tracking-wider mb-6 shadow-lg shadow-red-500/20 animate-pulse">
                                        <AlertTriangle size={12} />
                                        Critical Escalation Required
                                    </div>
                                )}
                                <h1 className="text-[44px] md:text-[56px] font-[800] tracking-[-0.04em] leading-[1] text-slate-900 dark:text-white mb-4">{store.address.split(',')[0]}</h1>
                                <p className="text-[17px] text-zinc-500 font-medium flex items-center gap-2">
                                    {store.address}
                                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                    <span className="text-zinc-400 italic font-normal text-[15px]">{store.city}, {store.state}</span>
                                </p>

                                <div className="flex items-center gap-10 mt-10">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest mb-1">Index Grade</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[28px] font-[800]">{store.rating}</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className={i < Math.floor(store.rating) ? "text-blue-500 fill-blue-500" : "text-zinc-200 dark:text-zinc-800 fill-current"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-black/[0.05] dark:bg-white/[0.08]"></div>
                                    <div className="flex flex-col">
                                        <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest mb-1">Pulse Trend</span>
                                        <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                                            <TrendingUp size={20} className="stroke-[3px] text-blue-500" />
                                            <span className="text-[28px] font-[800]">{store.review_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-initial btn-primary px-10 py-4 text-[16px]">
                                    Export Intelligence
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Subtle Aesthetic Accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 blur-3xl -z-0" />
                </motion.div>

                {/* Detailed Intelligence Analysis */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        <h3 className="text-[20px] font-bold text-slate-900 dark:text-white px-2 mt-4">Operational Incidents</h3>

                        {reviews.length === 0 && !loading && (
                            <div className="glass-card p-12 text-center">
                                <CheckCircle2 className="mx-auto text-blue-500 mb-4" size={32} />
                                <p className="text-zinc-500 font-bold">No negative incidents reported recently.</p>
                            </div>
                        )}

                        {reviews.map((incident, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className={`glass-card p-8 group transition-colors ${incident.urgency_flag === 'CRITICAL' ? 'border-red-500/20' : 'hover:border-blue-500/20'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-[16px] flex items-center justify-center font-[800] text-[15px] text-zinc-500 uppercase">
                                            {incident.reviewer_name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[17px] tracking-tight">{incident.reviewer_name}</h4>
                                            <div className="flex items-center gap-2 text-[11px] font-[800] text-zinc-400 tracking-widest uppercase">
                                                <Calendar size={12} />
                                                {new Date(incident.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-[800] uppercase tracking-widest border ${incident.urgency_flag === 'CRITICAL' ? 'bg-red-500 text-white border-transparent shadow-lg shadow-red-500/20' : 'bg-amber-500/10 text-amber-600 border-transparent'
                                            }`}>
                                            {incident.urgency_flag}
                                        </span>
                                        <span className="bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-[800] uppercase tracking-widest">
                                            {incident.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-zinc-50/50 dark:bg-zinc-900/30 p-6 rounded-[22px] mb-8 italic">
                                    <p className="text-[17px] text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">"{incident.text}"</p>
                                </div>

                                <div className="glass shadow-none bg-blue-50/10 dark:bg-blue-900/10 rounded-[28px] p-8 relative overflow-hidden">
                                    <div className="flex items-center gap-2 mb-6 text-blue-600 dark:text-blue-400 font-[800] text-[13px] uppercase tracking-widest">
                                        {incident.status === 'BOT_FAILED' ? <BotOff size={18} /> : <ShieldCheck size={18} />}
                                        {incident.status === 'BOT_FAILED' ? 'Bot Failure Alert: Critical Human Takeover' : (incident.status === 'ESCALATED' ? 'Escalation Alert: Human Intervention Needed' : 'Intelligence Response Unit')}
                                    </div>
                                    <p className="text-[16px] text-zinc-600 dark:text-zinc-400 font-medium leading-[1.6] mb-8">
                                        {incident.status === 'BOT_FAILED' ? 'The AI Engine has determined it cannot safely or effectively resolve this complex issue without making the frustration worse. Management intervention is required immediately.' : incident.ai_reply}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        {incident.status === 'ESCALATED' || incident.status === 'BOT_FAILED' ? (
                                            <button className={`${incident.status === 'BOT_FAILED' ? 'bg-red-600' : 'bg-amber-600'} text-white px-8 py-3 rounded-2xl font-bold text-[14px] hover:opacity-90 active:scale-95 transition-all flex items-center gap-2`}>
                                                <PhoneCall size={16} />
                                                Call Customer Now
                                            </button>
                                        ) : (
                                            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-2xl font-bold text-[14px] hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                                                <UserCheck size={16} />
                                                Approve Draft
                                            </button>
                                        )}
                                        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                            <RotateCcw size={18} />
                                        </button>
                                    </div>

                                    {/* Confidence Grade */}
                                    <div className="absolute top-8 right-8 text-right hidden md:block">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Emotion Detect</span>
                                        <span className={`text-[19px] font-[900] ${incident.urgency_flag === 'CRITICAL' ? 'text-red-500' : 'text-blue-500'}`}>{incident.emotion}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 lg:pt-16">
                        <div className="glass-card bg-zinc-950 p-8 text-white relative h-96 flex flex-col">
                            <h3 className="text-[18px] font-bold mb-10 flex items-center gap-2 text-zinc-400">
                                <BarChart3 size={18} />
                                Friction Points
                            </h3>
                            <div className="flex-1 relative flex items-end justify-between gap-2 px-2">
                                {[65, 42, 85, 30, 50, 90, 45].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: 1 + i * 0.1, duration: 1, ease: "circOut" }}
                                        className={`w-full rounded-t-lg ${i === 5 ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-zinc-800'}`}
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-between items-end">
                                <div>
                                    <span className="text-[34px] font-[900] block leading-none tracking-tighter">74%</span>
                                    <span className="text-[10px] font-[800] text-zinc-500 uppercase tracking-widest mt-2 block">Peak Friction</span>
                                </div>
                                <button className="text-[12px] font-[800] text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                                    Full Analysis
                                </button>
                            </div>
                        </div>

                        <div className="glass-card p-8 bg-white dark:bg-zinc-900/50">
                            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Lead Performance</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-[18px] bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-[800] text-[18px] text-zinc-400">
                                    AM
                                </div>
                                <div>
                                    <h4 className="font-bold text-[17px] tracking-tight">Alex Monroe</h4>
                                    <p className="text-[13px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">Store Director</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Sync Rate', value: '92.4%', color: 'text-emerald-500' },
                                    { label: 'Latency', value: '4.2h', color: 'text-blue-500' },
                                    { label: 'Escalations', value: '12', color: 'text-red-500' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-black/[0.03] dark:border-white/[0.03] last:border-0">
                                        <span className="text-[14px] font-medium text-zinc-500">{stat.label}</span>
                                        <span className={`text-[15px] font-[800] ${stat.color}`}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
