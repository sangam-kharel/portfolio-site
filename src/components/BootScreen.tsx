import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

// 1. New type definition for sequence items
interface BootScreenItem {
  text: string;
  delay: number;
  mobileOnly?: boolean; // Flag to show only on small screens
  desktopOnly?: boolean; // Flag to show only on medium+ screens
}

const bootSequence: BootScreenItem[] = [
    { text: "BIOS Version 2.4.1 - Sangam OS", delay: 100 },
    { text: "Initializing hardware...", delay: 200 },
    { text: "[  OK  ] Started Device Manager", delay: 150 },
    { text: "[  OK  ] Reached target Local File Systems", delay: 100 },
    { text: "[  OK  ] Started Network Manager", delay: 120 },
    { text: "[  OK  ] Loading kernel modules...", delay: 180 },
    { text: "[  OK  ] Started System Logging Service", delay: 100 },
    { text: "[  OK  ] Reached target Multi-User System", delay: 150 },
    { text: "", delay: 100 },

    // --- LOGO SECTION: CONTENT SWAPPING ---
    
    // NARROW (MOBILE) VERSION: Visible by default, hidden on md+ screens
    { text: "KHAREL OS V 1.0.0", delay: 50, mobileOnly: true },
    { text: "", delay: 50, mobileOnly: true },

    // WIDE (DESKTOP) VERSION: Hidden by default, visible on md+ screens
    { text: "╔══════════════════════════════════════════════════════════╗", delay: 50, desktopOnly: true },
    { text: "║                                                          ║", delay: 30, desktopOnly: true },
    { text: "║  ███████╗ █████╗ ███╗   ██╗ ██████╗  █████╗ ███╗   ███╗ ║", delay: 30, desktopOnly: true },
    { text: "║  ██╔════╝██╔══██╗████╗  ██║██╔════╝ ██╔══██╗████╗ ████║ ║", delay: 30, desktopOnly: true },
    { text: "║  ███████╗███████║██╔██╗ ██║██║ ███╗███████║██╔████╔██║ ║", delay: 30, desktopOnly: true },
    { text: "║  ╚════██║██╔══██║██║╚██╗██║██║   ██║██╔══██║██║╚██╔╝██║ ║", delay: 30, desktopOnly: true },
    { text: "║  ███████║██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║ ║", delay: 30, desktopOnly: true },
    { text: "║  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝ ║", delay: 30, desktopOnly: true },
    { text: "║                                                          ║", delay: 30, desktopOnly: true },
    { text: "║           [ KHAREL OPERATING SYSTEM ]                    ║", delay: 30, desktopOnly: true },
    { text: "║                    Version 1.0.0                         ║", delay: 30, desktopOnly: true },
    { text: "║                                                          ║", delay: 30, desktopOnly: true },
    { text: "╚══════════════════════════════════════════════════════════╝", delay: 50, desktopOnly: true },

    // --- END LOGO SECTION ---

    { text: "", delay: 100 },
    { text: "[  OK  ] Portfolio loaded successfully", delay: 200 },
    { text: "[  OK  ] Starting graphical interface...", delay: 300 },
    { text: "", delay: 200 },
    { text: "Welcome, User. Launching portfolio...", delay: 400 },
];

const BootScreen = ({ onComplete }: BootScreenProps) => {
  // 2. State now stores the item objects
  const [lines, setLines] = useState<BootScreenItem[]>([]); 
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let totalDelay = 0;

    const addLines = () => {
      if (currentIndex < bootSequence.length) {
        const item = bootSequence[currentIndex];
        totalDelay += item.delay;
        
        setTimeout(() => {
          // Push the full item object to state
          setLines(prev => [...prev, item]);
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
      // Full screen container
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden w-screen h-screen"
    >
      <div className="w-full p-4 sm:p-6 md:p-8 font-mono">
        <div className="text-green-500 space-y-0.5 max-h-[90vh] overflow-y-auto text-xs sm:text-sm md:text-base">
          
          {lines.map((item, index) => {
            
            // 3. Conditional Visibility Class
            let visibilityClass = '';
            if (item.mobileOnly) {
              // Show on small screens, hide on medium and up
              visibilityClass = 'md:hidden';
            } else if (item.desktopOnly) {
              // Hide on small screens, show on medium and up
              visibilityClass = 'hidden md:block';
            }
            
            // Render the line with the visibility class applied
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
                // Apply visibility class here
                className={`whitespace-pre ${visibilityClass}`} 
              >
                {/* 4. Color logic using item.text */}
                {item.text.includes("[  OK  ]") ? (
                  <>
                    <span className="text-green-400">[  OK  ]</span>
                    <span className="text-gray-300">{item.text.replace("[  OK  ]", "")}</span>
                  </>
                ) : item.text.includes("╔") || item.text.includes("║") || item.text.includes("╚") || item.text.includes("█") || item.text.includes("╗") ? (
                  <span className="text-green-500">{item.text}</span> 
                ) : (
                  <span className="text-gray-300">{item.text}</span>
                )}
              </motion.div>
            );
          })}
          
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
