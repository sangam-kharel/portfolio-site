import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  const bootSequence = [
    { text: "BIOS Version 2.4.1 - Sangam OS", delay: 100 },
    { text: "Initializing hardware...", delay: 200 },
    { text: "[  OK  ] Started Device Manager", delay: 150 },
    { text: "[  OK  ] Reached target Local File Systems", delay: 100 },
    { text: "[  OK  ] Started Network Manager", delay: 120 },
    { text: "[  OK  ] Loading kernel modules...", delay: 180 },
    { text: "[  OK  ] Started System Logging Service", delay: 100 },
    { text: "[  OK  ] Reached target Multi-User System", delay: 150 },
    { text: "", delay: 100 },
    { text: "╔══════════════════════════════════════════════════════════╗", delay: 50 },
    { text: "║                                                          ║", delay: 30 },
    { text: "║   ███████╗ █████╗ ███╗   ██╗ ██████╗  █████╗ ███╗   ███╗ ║", delay: 30 },
    { text: "║   ██╔════╝██╔══██╗████╗  ██║██╔════╝ ██╔══██╗████╗ ████║ ║", delay: 30 },
    { text: "║   ███████╗███████║██╔██╗ ██║██║  ███╗███████║██╔████╔██║ ║", delay: 30 },
    { text: "║   ╚════██║██╔══██║██║╚██╗██║██║   ██║██╔══██║██║╚██╔╝██║ ║", delay: 30 },
    { text: "║   ███████║██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║ ║", delay: 30 },
    { text: "║   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ║", delay: 30 },
    { text: "║                                                          ║", delay: 30 },
    { text: "║              [ KHAREL OPERATING SYSTEM ]                 ║", delay: 30 },
    { text: "║                    Version 1.0.0                         ║", delay: 30 },
    { text: "║                                                          ║", delay: 30 },
    { text: "╚══════════════════════════════════════════════════════════╝", delay: 50 },
    { text: "", delay: 100 },
    { text: "[  OK  ] Portfolio loaded successfully", delay: 200 },
    { text: "[  OK  ] Starting graphical interface...", delay: 300 },
    { text: "", delay: 200 },
    { text: "Welcome, User. Launching portfolio...", delay: 400 },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let totalDelay = 0;

    const addLines = () => {
      if (currentIndex < bootSequence.length) {
        const item = bootSequence[currentIndex];
        totalDelay += item.delay;
        
        setTimeout(() => {
          setLines(prev => [...prev, item.text]);
        }, totalDelay);
        
        currentIndex++;
        addLines();
      } else {
        setTimeout(() => {
          setShowCursor(false);
          setTimeout(onComplete, 500);
        }, totalDelay + 500);
      }
    };

    addLines();
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl p-6 font-mono text-sm md:text-base">
        <div className="text-green-500 space-y-1 max-h-[80vh] overflow-y-auto">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className="whitespace-pre"
            >
              {line.includes("[  OK  ]") ? (
                <>
                  <span className="text-green-400">[  OK  ]</span>
                  <span className="text-gray-300">{line.replace("[  OK  ]", "")}</span>
                </>
              ) : line.includes("╔") || line.includes("║") || line.includes("╚") || line.includes("█") || line.includes("╗") ? (
                <span className="text-primary">{line}</span>
              ) : (
                <span className="text-gray-300">{line}</span>
              )}
            </motion.div>
          ))}
          {showCursor && (
            <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
          )}
        </div>
      </div>

      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)"
        }}
      />
    </motion.div>
  );
};

export default BootScreen;
