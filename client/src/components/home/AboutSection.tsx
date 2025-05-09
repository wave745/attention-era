import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const featureCards = [
    {
      icon: "fa-eye",
      color: "text-cyber-cyan",
      borderHover: "hover:border-cyber-cyan/30",
      textHover: "group-hover:text-cyber-cyan",
      title: "Surveillance State",
      description: "Every click, every hover, every second spent. They're all being tracked, quantified, and monetized. Your attention is no longer your own."
    },
    {
      icon: "fa-brain",
      color: "text-cyber-magenta",
      borderHover: "hover:border-cyber-magenta/30",
      textHover: "group-hover:text-cyber-magenta",
      title: "Neural Manipulation",
      description: "Platforms aren't designed for users; they're designed to use you. Algorithms crafted specifically to hijack neural pathways and maximize engagement."
    },
    {
      icon: "fa-key",
      color: "text-cyber-yellow",
      borderHover: "hover:border-cyber-yellow/30",
      textHover: "group-hover:text-cyber-yellow",
      title: "Digital Liberation",
      description: "Awareness is the first step to freedom. By understanding the mechanisms of control, we can begin to break free from the attention economy."
    },
    {
      icon: "fa-code",
      color: "text-cyber-red",
      borderHover: "hover:border-cyber-red/30",
      textHover: "group-hover:text-cyber-red",
      title: "System Reboot",
      description: "The current paradigm is unsustainable. We need a fundamental rethinking of how we build digital spaces and what values we encode within them."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 bg-cyber-dark overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyber-magenta/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
              THE <span className="text-cyber-cyan">BREACH</span>
            </GlitchText>
            <div className="h-px w-24 mx-auto bg-cyber-cyan mb-3"></div>
            <p className="text-white/70 font-sans">This is not a website. It's a breach. A whisper from the machine.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featureCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`bg-cyber-black/40 border-cyber-dark/70 ${card.borderHover} transition-colors duration-300 transform hover:-translate-y-1 group`}>
                  <CardContent className="p-6">
                    <div className={`${card.color} mb-4`}>
                      <i className={`fas ${card.icon} text-3xl`}></i>
                    </div>
                    <GlitchText element="h3" className={`text-xl font-bold mb-3 transition-colors ${card.textHover}`}>
                      {card.title}
                    </GlitchText>
                    <p className="font-sans text-white/70 leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="font-sans text-white/50 text-sm mb-6 max-w-xl mx-auto">
              Type "<span className="text-cyber-cyan">CHAOS</span>" on your keyboard to trigger the glitch storm and see the reality behind the facade.
            </p>
            
            <div id="key-display" className="flex justify-center space-x-3 font-mono text-white/30">
              <span id="key-c">C</span>
              <span id="key-h">H</span>
              <span id="key-a">A</span>
              <span id="key-o">O</span>
              <span id="key-s">S</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
