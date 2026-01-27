import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Software Developer", "AI/ML Enthusiast", "Problem Solver"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background/90 dark:bg-background/80 z-10" />
        <img 
          src="/assets/hero-bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50 dark:opacity-40"
        />
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Welcome to my portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight">
            Hi, I'm <span className="text-gradient">Palak Jain</span>
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground font-mono mb-8 h-[60px] flex items-center">
            I am a{" "}
            <span className="text-foreground font-bold ml-2">
              {roles[textIndex]}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2 text-base" asChild>
              <a href="#contact">
                Contact Me <Mail className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2 text-base" asChild>
              <a href="/resume.pdf" target="_blank">
                Download Resume <Download className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-500 blur-2xl opacity-50 animate-pulse" />
            <img
              src="/assets/avatar-placeholder.png"
              alt="Palak Jain"
              className="w-full h-full object-cover rounded-full border-4 border-background relative z-10 shadow-xl"
            />
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-card p-3 rounded-xl shadow-lg border border-border z-20"
            >
              <span className="text-2xl">🤖</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-card p-3 rounded-xl shadow-lg border border-border z-20"
            >
              <span className="text-2xl">💻</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}