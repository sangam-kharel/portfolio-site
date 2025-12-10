import { motion } from "framer-motion";
import { Heart, Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-mono text-sm">
              <span className="text-primary">{"<"}</span>
              Sangam Kharel
              <span className="text-primary">{"/>"}</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-secondary fill-secondary" /> and lots of{" "}
            <span className="text-primary">{"<code/>"}</span>
          </p>

          {/* Year */}
          <p className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
