import React from 'react';
import { motion } from 'framer-motion';
import InputForm from './InputForm';

const Hero = ({ onAnalyze, loading }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full blur-3xl opacity-10 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 mb-6 font-medium text-primary bg-primary/10 rounded-full text-xs tracking-wider uppercase border border-primary/20">
            Powered by AI · LeetCode GraphQL
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground max-w-4xl mx-auto">
            Your personal <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">coding coach.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
            Analyze your LeetCode profile instantly. Track your progress with high-precision metrics, visual graphs, and actionable insights.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <InputForm onAnalyze={onAnalyze} authLoading={loading} />
          <p className="text-xs text-muted-foreground mt-4 font-medium opacity-60">
            Try entering your username to see the magic happen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
