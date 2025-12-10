import { motion } from "framer-motion";
import {
  Database,
  Globe,
  Server,
  Smartphone,
  Box,
  GitBranch,
  Terminal,
  Layers,
  Code2,
  Workflow,
  Cloud,
  FileCode,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import TechStackCard from "./TechStackCard";

const SkillsSection = () => {
  const categories = [
    {
      title: "Frontend",
      color: "primary",
      skills: [
        { name: "React", icon: Box },
        { name: "TypeScript", icon: FileCode },
        { name: "Next.js", icon: Globe },
        { name: "Tailwind CSS", icon: Layers },
        { name: "HTML/CSS", icon: Code2 },
        { name: "JavaScript", icon: Terminal },
      ],
    },
    {
      title: "Backend",
      color: "secondary",
      skills: [
        { name: "Node.js", icon: Server },
        { name: "Express", icon: Workflow },
        { name: "Python", icon: Terminal },
        { name: "Django", icon: Server },
        { name: "REST APIs", icon: Cloud },
        { name: "GraphQL", icon: Workflow },
      ],
    },
    {
      title: "Database & Tools",
      color: "accent",
      skills: [
        { name: "MongoDB", icon: Database },
        { name: "PostgreSQL", icon: Database },
        { name: "MySQL", icon: Database },
        { name: "Git", icon: GitBranch },
        { name: "Docker", icon: Box },
        { name: "Linux", icon: Terminal },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Tech Stack"
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        <div className="space-y-16 max-w-5xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-primary text-sm">{"0" + (categoryIndex + 1) + "."}</span>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <TechStackCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    category={category.title}
                    delay={skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <span className="font-mono text-muted-foreground text-sm">
            {"// Always learning, always growing"}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
