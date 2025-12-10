import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // --- Boot Sequence remains the same ---
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
    { text: "║  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ║", delay: 30 },
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
  // ---

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
          // Adjust this timeout if the final lines are too fast/slow
          setTimeout(onComplete, 500); 
        }, totalDelay + 500); // 500ms delay after the last line to hide cursor
      }
    };

    addLines();
  }, [onComplete]);

  return (
    // CHANGE 1: Ensure the root container is fixed, full screen, and high Z-index
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // Updated class for full screen: fixed inset-0 z-[100] h-screen w-screen
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden h-screen w-screen"
    >
      {/* CHANGE 2: Remove the max-w-4xl constraint to allow full width usage */}
      <div className="w-full p-4 sm:p-6 md:p-8 font-mono text-sm">
        {/* CHANGE 3: Adjust text size to be smaller on small screens for better fitting, but use a minimum size to remain readable */}
        <div className="text-green-500 space-y-0.5 max-h-[90vh] overflow-y-auto text-xs sm:text-sm md:text-base">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              // Ensure no wrapping happens for the OS style text
              className="whitespace-pre" 
            >
              {/* ... (Color logic remains the same) ... */}
              {line.includes("[  OK  ]") ? (
                <>
                  <span className="text-green-400">[  OK  ]</span>
                  <span className="text-gray-300">{line.replace("[  OK  ]", "")}</span>
                </>
              ) : line.includes("╔") || line.includes("║") || line.includes("╚") || line.includes("█") || line.includes("╗") ? (
                // Used 'text-green-500' for the box color for consistency. 
                // If you have a custom 'text-primary' color, keep the original.
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

      {/* Scan lines effect (Remains the same, already full screen) */}
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
