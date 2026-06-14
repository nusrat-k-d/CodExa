import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

function InputForm({ onAnalyze, authLoading }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
        onAnalyze({ username: username.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto relative group">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10 transition-transform group-focus-within:scale-110">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          className="w-full bg-white/40 backdrop-blur-xl border border-black/5 text-foreground pl-14 pr-32 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-2xl shadow-black/5 font-semibold placeholder:text-muted-foreground/40 text-lg hover:bg-white/60 focus:bg-white/80"
          placeholder="LeetCode username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={authLoading}
        />
        <div className="absolute right-3">
          <button
            disabled={authLoading || username.trim() === ""}
            className="bg-primary text-primary-foreground font-black px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 hover:translate-x-1 disabled:opacity-30 disabled:translate-x-0 disabled:cursor-not-allowed shadow-lg shadow-primary/20 text-sm tracking-widest uppercase active:scale-95"
          >
            {authLoading ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default InputForm;