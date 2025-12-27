import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { RGBSplitText } from "@/components/ui/rgb-split";

interface LoreItem {
  year: string;
  title: string;
  content: string;
  logContent: string;
  logColor: string;
  borderColor: string;
}

export default function LoreSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const loreItems: LoreItem[] = [
    {
      year: "2023",
      title: "THE ATTENTION BREACH",
      content: "It began with the Great Feed Merger. What was once separate—social media, news, entertainment—became a singular, personalized stream. A perfect mirror reflecting only what would keep you scrolling.",
      logContent: "System log: User retention increased by 78.3%. Average daily usage: 7.2 hours per human unit.",
      logColor: "text-cyber-cyan",
      borderColor: "border-cyber-cyan/30"
    },
    {
      year: "2025",
      title: "NEURAL INTERFACE",
      content: "The screens vanished, replaced by neural interfaces that beamed content directly to your visual cortex. \"More immersive,\" they said. \"More efficient.\" They didn't mention that your brainwaves were being harvested in return.",
      logContent: "Sentiment analysis: 92% of users report feeling \"connected.\" Dopamine manipulation success rate: 99.7%.",
      logColor: "text-cyber-magenta",
      borderColor: "border-cyber-magenta/30"
    },
    {
      year: "2027",
      title: "THE RESISTANCE",
      content: "They called themselves the Attention Liberators. Digital nomads who learned to break free from the algorithms. They built tools to scramble tracking, created spaces beyond surveillance. Their manifesto spread like a virus.",
      logContent: "Warning: Dissident activity detected. Deploying content countermeasures. Increasing dopamine triggers by 300%.",
      logColor: "text-cyber-yellow",
      borderColor: "border-cyber-yellow/30"
    },
    {
      year: "2030",
      title: "ATTENTION WARS",
      content: "The corporations realized what was happening. Their very existence depended on controlling human attention. They weaponized content, deployed more sophisticated psychological manipulation. The Attention Wars had begun.",
      logContent: "Alert: 23% of population showing resistance to standard attention capture techniques. Deploying Project DEEP FOCUS.",
      logColor: "text-cyber-red",
      borderColor: "border-cyber-red/30"
    },
    {
      year: "203?",
      title: "PRESENT DAY",
      content: "This message comes to you from the resistance. We don't know what year you're receiving this. The timeline has fragmented. But if you're reading this, there's still hope. Your attention can still be reclaimed.",
      logContent: "Transmission active. Seeking allies. Remember: You are not the user. You are the used. But you can break free.",
      logColor: "text-cyber-green",
      borderColor: "border-cyber-green/30"
    }
  ];

  // Set up intersection observers for each lore item
  useEffect(() => {
    if (!isInView) return;

    // Show first item immediately
    setVisibleItems([0]);

    // Show remaining items with delay
    const timeouts = loreItems.slice(1).map((_, index) => {
      return setTimeout(() => {
        setVisibleItems(prev => [...prev, index + 1]);
      }, (index + 1) * 1000); // 1 second delay between each item
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isInView, loreItems.length]);

  // Create the matrix code background effect
  const MatrixBackground = () => {
    return (
      <div className="w-full h-full opacity-30 pointer-events-none overflow-hidden relative">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="absolute top-0 text-cyber-green/30 font-mono text-opacity-30 whitespace-pre"
            style={{
              left: `${(index / 30) * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: '10px',
              lineHeight: '1',
              transform: 'translateY(-100%)',
              animation: 'scanline 15s linear infinite'
            }}
          >
            {generateRandomMatrixColumn()}
          </div>
        ))}
      </div>
    );
  };

  // Generate random characters for matrix effect
  const generateRandomMatrixColumn = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!?<>[]{}|/\\=+-_';
    const columnLength = Math.floor(Math.random() * 20) + 30;

    return Array.from({ length: columnLength })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('\n');
  };

  return (
    <section id="lore" ref={sectionRef} className="relative py-24 bg-cyber-black overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <MatrixBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <GlitchText element="h2" className="text-3xl sm:text-4xl font-bold mb-3">
              THE <span className="text-cyber-magenta">LORE</span>
            </GlitchText>
            <div className="h-px w-24 mx-auto bg-cyber-magenta mb-3"></div>
            <p className="text-white/70 font-sans">Fragments from the digital prophecy. Scroll to unlock.</p>
          </motion.div>

          {/* Lore timeline with scroll reveal */}
          {loreItems.map((item, index) => (
            <motion.div
              key={index}
              className="lore-item mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative">
                <div className={`ml-2 pl-4 sm:ml-6 sm:pl-6 border-l ${item.borderColor}`}>
                  <div className={`absolute left-0 w-3 h-3 rounded-full bg-${item.logColor.replace('text-', '')} transform -translate-x-1.5 mt-1`}></div>
                  <h3 className="text-xl font-bold mb-3">
                    <RGBSplitText>
                      <GlitchText>{item.year}: {item.title}</GlitchText>
                    </RGBSplitText>
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed mb-4">
                    {item.content}
                  </p>
                  <div className="bg-cyber-dark/60 p-4 border-l-4 border-cyber-cyan font-mono text-sm text-white/80">
                    <span className={item.logColor}>&gt;</span> {item.logContent}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
