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
    { text: "║  ███████╗ █████╗ ███╗   ██╗ ██████╗  █████╗ ███╗   ███╗ ║", delay: 30 },
    { text: "║  ██╔════╝██╔══██╗████╗  ██║██╔════╝ ██╔══██╗████╗ ████║ ║", delay: 30 },
    { text: "║  ███████╗███████║██╔██╗ ██║██║ ███╗███████║██╔████╔██║ ║", delay: 30 },
    { text: "║  ╚════██║██╔══██║██║╚██╗██║██║   ██║██╔══██║██║╚██╔╝██║ ║", delay: 30 },
    { text: "║  ███████║██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║ ║", delay: 30 },
    { text: "║  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══╝  ╚═╝╚═╝     ╚═╝ ║", delay: 30 },
    { text: "║                                                          ║", delay: 30 },
    { text: "║           [ KHAREL OPERATING SYSTEM ]                    ║", delay: 30 },
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
        
        // Use a single setTimeout to prevent potential race conditions
        setTimeout(() => {
          setLines(prev => [...prev, item.text]);
        }, totalDelay);
        
        currentIndex++;
        addLines(); // Recursive call for the next item
      } else {
        // Finalize sequence
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
      // Ensures the component is fixed, full screen (w-screen h-screen)
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden w-screen h-screen"
    >
      {/* OPTIMIZATION: 
        1. Reduced padding (p-1) on small screens for maximum width.
        2. Removed 'max-w-4xl' constraint.
      */}
      <div className="w-full p-1 sm:p-4 md:p-6 font-mono">
        {/* CRITICAL OPTIMIZATION for ASCII box: 
          1. Apply the smallest font size by default (text-xs is usually ~12px).
          2. Allow horizontal scrolling (overflow-x-auto) as a safety net.
        */}
        <div className="text-green-500 space-y-0.5 max-h-[90vh] overflow-y-auto overflow-x-auto text-xs sm:text-sm md:text-base">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              // 'whitespace-pre' is essential to keep ASCII art columns aligned
              className="whitespace-pre" 
            >
              {line.includes("[  OK  ]") ? (
                <>
                  <span className="text-green-400">[  OK  ]</span>
                  <span className="text-gray-300">{line.replace("[  OK  ]", "")}</span>
                </>
              ) : line.includes("╔") || line.includes("║") || line.includes("╚") || line.includes("█") || line.includes("╗") ? (
                <span className="text-green-500">{line}</span> 
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

      {/* Scan lines effect (already full screen) */}
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
