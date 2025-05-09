import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { Card, CardContent } from "@/components/ui/card";
import { GlitchSectionTransition } from "@/components/ui/glitch-section-transition";
import { RGBSplitText } from "@/components/ui/rgb-split";
import { EyeIcon, BrainIcon, KeyIcon, CodeIcon } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const featureCards = [
    {
      icon: EyeIcon,
      color: "text-cyber-cyan",
      bgColor: "bg-cyber-cyan",
      borderColor: "border-cyber-cyan/20",
      borderHover: "hover:border-cyber-cyan",
      textHover: "group-hover:text-cyber-cyan",
      shadowColor: "shadow-cyber-cyan/20",
      hoverShadow: "group-hover:shadow-cyber-cyan/30",
      title: "Surveillance State",
      description: "Every click, every hover, every second spent. They're all being tracked, quantified, and monetized. Your attention is no longer your own."
    },
    {
      icon: BrainIcon,
      color: "text-cyber-magenta",
      bgColor: "bg-cyber-magenta", 
      borderColor: "border-cyber-magenta/20",
      borderHover: "hover:border-cyber-magenta",
      textHover: "group-hover:text-cyber-magenta",
      shadowColor: "shadow-cyber-magenta/20",
      hoverShadow: "group-hover:shadow-cyber-magenta/30",
      title: "Neural Manipulation",
      description: "Platforms aren't designed for users; they're designed to use you. Algorithms crafted specifically to hijack neural pathways and maximize engagement."
    },
    {
      icon: KeyIcon,
      color: "text-cyber-yellow",
      bgColor: "bg-cyber-yellow",
      borderColor: "border-cyber-yellow/20", 
      borderHover: "hover:border-cyber-yellow",
      textHover: "group-hover:text-cyber-yellow",
      shadowColor: "shadow-cyber-yellow/20",
      hoverShadow: "group-hover:shadow-cyber-yellow/30",
      title: "Digital Liberation",
      description: "Awareness is the first step to freedom. By understanding the mechanisms of control, we can begin to break free from the attention economy."
    },
    {
      icon: CodeIcon,
      color: "text-cyber-red",
      bgColor: "bg-cyber-red",
      borderColor: "border-cyber-red/20",
      borderHover: "hover:border-cyber-red",
      textHover: "group-hover:text-cyber-red",
      shadowColor: "shadow-cyber-red/20",
      hoverShadow: "group-hover:shadow-cyber-red/30",
      title: "System Reboot",
      description: "The current paradigm is unsustainable. We need a fundamental rethinking of how we build digital spaces and what values we encode within them."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-cyber-black to-cyber-dark overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyber-magenta/5 rounded-full blur-3xl"></div>
        
        {/* Circuit board pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8cGF0aCBkPSJNMSAxaDQ4djQ4SDFWMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+CiAgPHBhdGggZD0iTTEwIDFWMTBNMjAgMVYxME0zMCAxVjEwTTQwIDFWMTBNMSAxMEgxME0xIDIwSDEwTTEgMzBIMTBNMSA0MEgxME0xMCAxMFYyMEgzMFYxME00MCAxMHYxMGgxMFYxME0xMCAxMEgyME0zMCAxMEg0ME0xMCAyMEgxTTEwIDIwVjMwTTEwIDMwdjEwTTEwIDQwdjlNMTAgNDBIMU0xMCAzMEgxTTEwIDMwSDIwTTEwIDQwSDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')]
          opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Section title with glitch effect */}
          <div 
            ref={titleRef}
            className="text-center mb-16 sm:mb-24 relative"
          >
            <GlitchSectionTransition intensity="medium" delay={0.3}>
              <RGBSplitText>
                <GlitchText element="h2" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tighter">
                  THE <span className="text-cyber-cyan">BREACH</span>
                </GlitchText>
              </RGBSplitText>
              
              <div className="h-px w-36 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mb-6 opacity-80"></div>
              
              <div className="relative max-w-2xl mx-auto">
                <p className="text-white/70 text-lg sm:text-xl font-light leading-relaxed">
                  This is not a website. It's a breach. A whisper from the machine. <span className="text-cyber-cyan">Are you listening?</span>
                </p>
                
                {/* Decorative circuit elements */}
                <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-cyber-cyan/30 opacity-60"></div>
                <div className="absolute -right-4 -bottom-4 w-8 h-8 border-r-2 border-b-2 border-cyber-cyan/30 opacity-60"></div>
              </div>
            </GlitchSectionTransition>
          </div>
          
          {/* Feature cards with staggered animation */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featureCards.map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`bg-cyber-black/60 backdrop-blur-sm border ${card.borderColor} ${card.borderHover} shadow-lg ${card.shadowColor} ${card.hoverShadow} transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group`}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start">
                      <div className={`${card.color} mr-6 mt-1`}>
                        <card.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <GlitchText 
                          element="h3" 
                          intensity="low"
                          className={`text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300 ${card.textHover}`}
                        >
                          {card.title}
                        </GlitchText>
                        <p className="font-sans text-white/70 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative corner accent */}
                    <div className={`absolute bottom-0 right-0 w-10 h-10 ${card.bgColor} opacity-10 clip-corner`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CHAOS keyboard trigger info */}
          <GlitchSectionTransition 
            className="mt-20 text-center" 
            intensity="low" 
            direction="up" 
            delay={0.5}
          >
            <div className="bg-cyber-black/40 backdrop-blur-sm border border-cyber-cyan/20 py-6 px-4 rounded-sm max-w-lg mx-auto">
              <p className="font-mono text-white/70 mb-6 leading-relaxed">
                Type "<span className="text-cyber-cyan font-semibold">CHAOS</span>" on your keyboard to trigger the glitch storm and see the reality behind the facade.
              </p>
              
              <div className="flex justify-center space-x-3 font-mono text-base">
                {['C', 'H', 'A', 'O', 'S'].map((letter, i) => (
                  <span 
                    key={i}
                    id={`key-${letter.toLowerCase()}`} 
                    className="w-8 h-8 flex items-center justify-center border border-cyber-cyan/30 text-white/50 transition-all duration-300"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </GlitchSectionTransition>
        </div>
      </div>
    </section>
  );
}
