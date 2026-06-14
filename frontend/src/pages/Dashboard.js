import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { 
  Trophy, Flame, Target, BookOpen, 
  TrendingUp, Lightbulb, CheckCircle2,
  ExternalLink
} from "lucide-react";

const Dashboard = ({ 
  data, 
  searchedUser, 
  hasData,
  loading 
}) => {

  const { 
    suggestions = [], 
    history = [], 
    streak = 0, 
    score = 0, 
    level = "", 
    dailyPlan = [], 
    weakTopics = [], 
    recommendations = [], 
    comparison = [], 
    percentile = 0, 
    percentileMessage = "" 
  } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-orange-500";
  };

  const currentStats = history.length > 0 ? history[0] : null;

  if (!hasData) return null;

  return (
    <div id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-[0.16,1,0.3,1]">
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-border/60 gap-4">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 italic">Performance Report</h2>
                  <p className="text-muted-foreground font-medium">Currently analyzing <span className="text-foreground font-bold underline decoration-primary/40 underline-offset-4">@{searchedUser}</span></p>
               </div>
               <div className="px-5 py-2 bg-primary/5 rounded-2xl text-sm font-bold border border-primary/10 tracking-wide shadow-inner inline-block">
                 Percentile: <span className="text-primary">{percentile}%</span>
               </div>
            </div>

            {/* Top Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Score Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white border border-border/80 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group"
                >
                    <div className="flex justify-between items-start mb-6">
                       <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 group-hover:scale-110 transition-transform">
                        <Trophy className={`w-5 h-5 ${getScoreColor(score)}`} />
                       </div>
                       <h3 className="text-muted-foreground font-semibold text-xs uppercase tracking-widest leading-loose">Readiness</h3>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-extrabold tracking-tight">{score}</span>
                        <span className="text-muted-foreground/60 font-bold text-lg">/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${score >= 60 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'}`}></div>
                        <span className="text-sm text-foreground font-bold tracking-tight">{level}</span>
                    </div>
                </motion.div>

                {/* Streak Card */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white border border-border/80 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group"
                >
                    <div className="flex justify-between items-start mb-6">
                       <div className="bg-orange-500/5 p-3 rounded-2xl border border-orange-500/10 group-hover:scale-110 transition-transform">
                        <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500' : 'text-slate-400'}`} />
                       </div>
                       <h3 className="text-muted-foreground font-semibold text-xs uppercase tracking-widest leading-loose">Streak</h3>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-extrabold tracking-tight">{streak}</span>
                        <span className="text-muted-foreground/60 font-bold text-lg">days</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium italic opacity-70">
                        {streak >= 3 ? "Burning bright." : "Keep building."}
                    </p>
                </motion.div>

                {/* Stats Card Expanded */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white border border-border/80 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 lg:col-span-2 group"
                >
                    <div className="flex justify-between items-start mb-6">
                       <div className="bg-secondary p-3 rounded-2xl border border-border/50">
                        <TrendingUp className="w-5 h-5 text-foreground/80" />
                       </div>
                       <h3 className="text-muted-foreground font-semibold text-xs uppercase tracking-widest leading-loose">Task Distribution</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                       <div className="p-4 rounded-3xl bg-slate-50 border border-border/40">
                          <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-1">Solved</p>
                          <p className="text-3xl font-black">{currentStats?.total || 0}</p>
                       </div>
                       <div className="p-4 rounded-3xl bg-emerald-50/40 border border-emerald-100">
                          <p className="text-[10px] uppercase tracking-widest font-black text-emerald-500 mb-1">Easy</p>
                          <p className="text-3xl font-black text-emerald-600">{currentStats?.easy || 0}</p>
                       </div>
                       <div className="p-4 rounded-3xl bg-yellow-50/40 border border-yellow-100">
                          <p className="text-[10px] uppercase tracking-widest font-black text-yellow-500 mb-1">Med</p>
                          <p className="text-3xl font-black text-yellow-600">{currentStats?.medium || 0}</p>
                       </div>
                       <div className="p-4 rounded-3xl bg-red-50/40 border border-red-100">
                          <p className="text-[10px] uppercase tracking-widest font-black text-red-500 mb-1">Hard</p>
                          <p className="text-3xl font-black text-red-600">{currentStats?.hard || 0}</p>
                       </div>
                    </div>
                </motion.div>
            </div>

            {/* Middle Row Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Suggestions & Plan */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Insights */}
                    <div className="bg-white border border-border/80  rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                           <Lightbulb className="w-6 h-6 text-primary" />
                           <h3 className="font-bold text-2xl tracking-tight">Coach Insights</h3>
                        </div>
                        <ul className="space-y-6">
                            {suggestions.map((s, i) => (
                                <li key={i} className="flex gap-4 text-foreground items-start">
                                    <div className="bg-primary/10 w-2 h-2 rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm font-medium leading-relaxed opacity-80">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Daily Plan High Polish */}
                    <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="flex items-center gap-3 mb-8 relative z-10">
                           <CheckCircle2 className="w-6 h-6" />
                           <h3 className="font-bold text-2xl tracking-tight">Daily Regiment</h3>
                        </div>
                        <ul className="space-y-4 relative z-10">
                            {dailyPlan.map((p, i) => (
                                <li key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                                    <span className="bg-white text-primary w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                                    <span className="text-sm font-bold tracking-tight">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Graph & Comparison */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Graph Refined */}
                    <div className="bg-white border border-border/80 rounded-[2.5rem] p-10 shadow-sm w-full max-w-full overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                           <div className="flex items-center gap-3">
                             <TrendingUp className="w-6 h-6 text-primary" />
                             <h3 className="font-bold text-2xl tracking-tight">Growth Trajectory</h3>
                           </div>
                           <div className="flex gap-4">
                              <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div>
                                 <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total</span>
                              </div>
                           </div>
                        </div>
                        <div className="h-[300px] w-full mt-4">
                           <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={[...history].reverse()} margin={{ top: 0, right: 10, bottom: 0, left: -25 }}>
                                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                                <XAxis 
                                  dataKey="date" 
                                  stroke="#94a3b8" 
                                  fontSize={11} 
                                  fontWeight={700}
                                  tickLine={false} 
                                  axisLine={false}
                                  dy={20}
                                  tickFormatter={(val) => {
                                      const date = new Date(val);
                                      return `${date.getMonth() + 1}/${date.getDate()}`;
                                  }}
                                />
                                <YAxis 
                                  stroke="#94a3b8" 
                                  fontSize={11} 
                                  fontWeight={700}
                                  tickLine={false} 
                                  axisLine={false} 
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: '#ffffff', 
                                      border: '1px solid #e2e8f0', 
                                      borderRadius: '16px', 
                                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                      padding: '12px'
                                    }}
                                    itemStyle={{ color: '#000000', fontWeight: 800, fontSize: '14px' }}
                                    labelStyle={{ color: '#64748b', fontWeight: 600, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                    cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="total" 
                                  stroke="#0f172a" 
                                  strokeWidth={4}
                                  dot={{ fill: '#ffffff', stroke: '#0f172a', strokeWidth: 2, r: 5 }}
                                  activeDot={{ r: 8, fill: '#0f172a', strokeWidth: 0 }}
                                />
                              </LineChart>
                           </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Comparison Row */}
                    <div className="bg-slate-50 border border-border/60 rounded-[2.5rem] p-10 shadow-inner group">
                        <div className="flex items-center gap-3 mb-8">
                           <BookOpen className="w-6 h-6 text-foreground/60" />
                           <h3 className="font-bold text-2xl tracking-tight">Peer Benchmarking</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-4">You are in the top</p>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-7xl font-black tracking-tighter text-foreground group-hover:scale-105 transition-transform duration-700 origin-left italic">{percentile}%</span>
                                </div>
                                <p className="text-sm font-bold text-muted-foreground mt-6 leading-relaxed bg-white p-4 rounded-2xl border border-border shadow-sm border-l-4 border-l-primary uppercase tracking-tight">{percentileMessage}</p>
                            </div>
                            <div className="space-y-4 justify-center flex flex-col">
                                {comparison.map((c, i) => (
                                  <div key={i} className="flex items-center gap-4 bg-white/50 border border-border/40 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                     <div className="bg-primary/5 p-2 rounded-xl">
                                      <TrendingUp className="w-4 h-4 text-primary" />
                                     </div>
                                     <span className="text-sm font-black text-foreground opacity-80">{c}</span>
                                  </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Recommendations Refined Layout */}
            {recommendations.length > 0 && (
                <div className="pt-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-orange-500/10 p-2.5 rounded-2xl border border-orange-500/20 shadow-inner">
                          <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="font-black text-3xl tracking-tight italic">Recommended Focus</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendations.slice(0,3).map((r, i) => (
                            <a 
                              key={i} 
                              href={r.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="group block p-8 rounded-[2.5rem] bg-white border border-border/80 shadow-sm hover:shadow-2xl hover:border-primary/20 hover:translate-y-[-4px] transition-all duration-500"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div className="px-3 py-1 bg-orange-50 rounded-full text-[10px] font-black uppercase text-orange-600 tracking-[0.1em] border border-orange-100">Focus Tag</div>
                                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h4 className="text-2xl font-black text-foreground mb-4 group-hover:translate-x-1 transition-transform tracking-tight leading-none">{r.topic}</h4>
                                <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
                                  <span className="text-sm font-black text-primary uppercase tracking-widest">Start solving</span>
                                  <div className="h-[2px] w-4 bg-primary rounded-full group-hover:w-8 transition-all"></div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Dashboard;