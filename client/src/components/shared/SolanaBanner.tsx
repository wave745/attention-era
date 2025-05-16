import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, DollarSign } from 'lucide-react';
import { GlitchText } from '@/components/ui/glitch-text';
import { Button } from '@/components/ui/button';

export default function SolanaBanner() {
  const [copied, setCopied] = useState(false);
  const solanaAddress = 'EGLzRLKUVJ6Y4ShjKAgFFkd6KZ3pTVn3D5S9JfFmpump';
  const buyLink = 'https://pump.fun/coin/EGLzRLKUVJ6Y4ShjKAgFFkd6KZ3pTVn3D5S9JfFmpump';

  const handleCopy = () => {
    navigator.clipboard.writeText(solanaAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-gradient-to-r from-cyber-dark via-black to-cyber-dark border-b border-cyber-cyan/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-xs md:text-sm">
          <div className="flex flex-wrap items-center justify-center gap-2 text-white/80 mb-2 sm:mb-0">
            <span className="font-mono">Solana:</span>
            <code className="bg-black/30 px-2 py-1 rounded font-mono tracking-tight text-cyber-cyan truncate max-w-[150px] sm:max-w-xs">
              <GlitchText intensity="low">
                {solanaAddress}
              </GlitchText>
            </code>
            <div className="flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded-sm hover:bg-cyber-cyan/20 transition-colors"
                onClick={handleCopy}
                title={copied ? "Copied!" : "Copy address"}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-cyber-cyan/70" />
                )}
              </motion.button>
              
              <motion.a
                href={`https://explorer.solana.com/address/${solanaAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded-sm hover:bg-cyber-cyan/20 transition-colors"
                title="View on Solana Explorer"
              >
                <ExternalLink className="w-4 h-4 text-cyber-cyan/70" />
              </motion.a>
            </div>
          </div>
          
          {/* Buy Now Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="outline"
              className="bg-black border border-cyber-magenta hover:bg-cyber-magenta/20 text-white group transition-all duration-300 shadow-[0_0_10px_rgba(255,0,255,0.3)]"
              size="sm"
            >
              <a 
                href={buyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1"
              >
                <DollarSign className="w-4 h-4 text-cyber-magenta group-hover:text-white transition-colors" />
                <span className="font-bold text-cyber-magenta group-hover:text-white transition-colors">
                  <GlitchText intensity="medium">BUY $ATTENTION</GlitchText>
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}