import { motion } from "framer-motion";
import profileImage from "@/assets/profile.png";

const ProfileImage = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-70 blur-sm" />
        
        {/* Animated border */}
        <div className="relative p-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary">
          {/* Inner dark ring */}
          <div className="p-1 rounded-full bg-background">
            {/* Image container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="Sangam Kharel - Full Stack Developer"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Floating decoration elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(174_100%_50%)]" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_hsl(280_100%_65%)]" />
        </motion.div>
      </motion.div>

      {/* Status indicator - below photo */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 mt-4 rounded-full glass-card border border-primary/30">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-primary">Available for Work</span>
      </div>
    </div>
  );
};

export default ProfileImage;
