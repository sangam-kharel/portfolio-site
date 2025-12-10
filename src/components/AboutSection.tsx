import { motion } from "framer-motion";
import { Code2, Cpu, Database, Palette } from "lucide-react";
import SectionTitle from "./SectionTitle";

const AboutSection = () => {
  const highlights = [
    {
      icon: Database,
      title: "Backend",
      description: "Building robust APIs and server-side logic",
    },
    {
      icon: Palette,
      title: "Frontend",
      description: "Creating responsive and interactive UIs",
    },
    {
      icon: Cpu,
      title: "Problem Solver",
      description: "Tackling complex challenges with elegant solutions",
    },
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="About Me"
          subtitle="A passionate developer on a journey to master the art of building software"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Hey there! I'm <span className="text-primary font-semibold">Sangam Kharel</span>, 
                a first-year BCA student with an insatiable curiosity for technology and software development.
              </p>
              <p>
                My journey into programming started with a simple "Hello World" and has since evolved 
                into a passion for building full-stack applications. I love the challenge of turning 
                complex problems into simple, elegant solutions.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or diving deep into documentation to learn something new.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent" />
              <span className="font-mono text-primary text-sm">{"// Learning never stops"}</span>
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card p-5 rounded-xl group"
              >
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
