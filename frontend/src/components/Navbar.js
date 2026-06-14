import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between backdrop-blur-md bg-background/60 border-b border-border/40 rounded-b-2xl px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              CodExa
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">LeetCode</a>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
