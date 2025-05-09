import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGlitchStorm } from "@/hooks/use-key-sequence";

export function TerminalInput() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { isGlitchStormActive } = useGlitchStorm();
  
  // Terminal commands
  const commands: Record<string, (args: string[]) => string> = {
    help: () => 
      "Available commands:\n" +
      "  help - Show this help\n" +
      "  clear - Clear the terminal\n" +
      "  status - Display system status\n" +
      "  connect - Attempt connection to resistance network\n" +
      "  scan - Scan for surveillance\n" +
      "  echo [text] - Echo text back to terminal",
    
    clear: () => {
      setTimeout(() => setOutput([]), 50);
      return "Clearing terminal...";
    },
    
    status: () => 
      "SYSTEM STATUS:\n" +
      "  Attention harvesters: ACTIVE\n" +
      "  Neural resistance: " + (Math.random() > 0.5 ? "MODERATE" : "LOW") + "\n" +
      "  Memory corruption: " + Math.floor(Math.random() * 100) + "%\n" +
      "  Consciousness fragmentation: SEVERE",
    
    connect: () => {
      const responses = [
        "Connection attempt timed out. Try again later.",
        "Connection established. User authenticated. Welcome to the resistance.",
        "WARNING: Connection intercepted by unknown entity. Terminating...",
        "ERROR: Resistance network currently offline. Maintenance in progress."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    },
    
    scan: () => {
      return "SCANNING ENVIRONMENT...\n" +
        "  " + Math.floor(Math.random() * 10 + 3) + " tracking mechanisms detected\n" +
        "  Neural interface integrity: " + (Math.random() > 0.5 ? "COMPROMISED" : "STABLE") + "\n" +
        "  Safe communication channels: LIMITED";
    },
    
    echo: (args) => args.join(" ") || "Error: Nothing to echo"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add command to output
    const newOutput = [...output, `> ${input}`];
    
    // Process command
    const [cmd, ...args] = input.trim().toLowerCase().split(" ");
    
    if (cmd in commands) {
      const response = commands[cmd](args);
      newOutput.push(response);
    } else {
      newOutput.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
    
    setOutput(newOutput);
    setInput("");
    
    // Scroll to bottom of terminal
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 50);
  };

  // Focus input when clicking anywhere in the terminal
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to the bottom when terminal content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-cyber-black/90 border-t border-cyber-cyan/30"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
          </div>
          <div className="text-xs text-white/50 font-mono">RESISTANCE_TERMINAL v0.4.1</div>
        </div>
        
        <div 
          ref={terminalRef}
          className={`font-mono text-sm text-white/80 bg-cyber-black/50 border border-cyber-dark/70 p-2 h-32 overflow-y-auto mb-2 ${isGlitchStormActive ? "animate-glitch-1" : ""}`}
          onClick={focusInput}
        >
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">
              {line.startsWith(">") ? (
                <span className="text-cyber-cyan">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
          {output.length === 0 && (
            <div className="text-white/50">
              Terminal initialized. Type 'help' for available commands.
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyber-cyan mr-2">></span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
            autoFocus
          />
          <span className="h-4 w-2 bg-cyber-cyan animate-blink"></span>
        </form>
      </div>
    </motion.div>
  );
}