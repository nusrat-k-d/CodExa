import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState({});
  const [searchedUser, setSearchedUser] = useState("");
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError("");
    setHasData(false);
    setSearchedUser(formData.username);

    try {
      // Backend URL - Adjust if needed
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setData(res.data);
      setHasData(true);
      
      // Smooth scroll to dashboard after data loads
      setTimeout(() => {
        const dashboardElement = document.getElementById('dashboard');
        if (dashboardElement) {
          dashboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Analysis failed. Please check the username and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/10 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero onAnalyze={handleAnalyze} loading={loading} />
        
        {error && (
          <div className="max-w-xl mx-auto mb-20 p-6 bg-red-50 border border-red-100 rounded-[2rem] text-center animate-in fade-in zoom-in duration-500">
            <p className="text-red-600 font-bold tracking-tight">{error}</p>
          </div>
        )}

        <Dashboard 
          data={data} 
          searchedUser={searchedUser} 
          hasData={hasData} 
          loading={loading} 
        />
        
        {!hasData && <Features />}
      </main>

      <Footer />
    </div>
  );
}

export default App;