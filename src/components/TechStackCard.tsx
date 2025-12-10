import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechStackCardProps {
  name: string;
  icon: LucideIcon;
  category: string;
  delay?: number;
}

const TechStackCard = ({ name, icon: Icon, category, delay = 0 }: TechStackCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-4 rounded-xl flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_10px_hsl(174_100%_50%)] transition-all duration-300" />
      </div>
      <span className="font-mono text-sm text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{category}</span>
    </motion.div>
  );
};

export default TechStackCard;
