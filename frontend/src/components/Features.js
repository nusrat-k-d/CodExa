import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Trophy, Flame } from 'lucide-react';

const features = [
  {
    title: 'Precision Scoring',
    description: 'Our proprietary algorithm analyzes your problem difficulty distribution and volume to give you a real-world placement readiness score.',
    icon: Trophy,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Weak Spot Detection',
    description: 'We scan your tag distributions and identify precisely which topics need more focus to round out your technical expertise.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Performance History',
    description: 'Visualize your growth over time with high-quality activity graphs and historical tracking of your solved problems.',
    icon: TrendingUp,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    title: 'Streak Monitoring',
    description: 'Maintain your consistency with our intelligent streak tracking engine that helps you build a lasting coding habit.',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/40 border-y border-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Precision insights for high-performers.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We focus on the metrics that actually matter for your technical interviews and long-term skill acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group"
            >
              <div className={`${feature.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium opacity-80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
