import React from 'react';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-60">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              Codexa
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium opacity-60">
            © 2026 Codexa. All rights reserved. Built for professionals.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Github</a>
            <a href="https://twitter.com" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
