
import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Skill {
  name: string;
  category: string;
  color: string;
}

const Skills = () => {
  const { ref, controls, variants } = useScrollAnimation();
  
  const skills: Skill[] = [
    { name: "Python", category: "Languages", color: "#3776AB" },
    { name: "JavaScript", category: "Languages", color: "#F7DF1E" },
    { name: "TypeScript", category: "Languages", color: "#3178C6" },
    { name: "Java", category: "Languages", color: "#007396" },
    { name: "SQL", category: "Languages", color: "#336791" },
    { name: "HTML/CSS", category: "Languages", color: "#E34F26" },
    { name: "React", category: "Frontend", color: "#61DAFB" },
    { name: "Node.js", category: "Backend", color: "#339933" },
    { name: "Express", category: "Backend", color: "#000000" },
    { name: "MySQL", category: "Database", color: "#4479A1" },
    { name: "Machine Learning", category: "AI", color: "#FF6F00" },
    { name: "Computer Vision", category: "AI", color: "#5C3EE8" },
    { name: "GANs", category: "AI", color: "#9B59B6" },
    { name: "TensorFlow", category: "AI", color: "#FF6F00" },
    { name: "Git/GitHub", category: "Tools", color: "#F05032" },
    { name: "Figma", category: "Tools", color: "#F24E1E" },
    { name: "Postman", category: "Tools", color: "#FF6C37" },
    { name: "RESTful APIs", category: "Backend", color: "#0096D6" },
  ];
  
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="relative z-10"
        >
          <h2 className="section-heading text-center">Technical Skills</h2>
          
          <div className="mt-16 space-y-16">
            {categories.map((category, index) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: 0.2 * index
                    }
                  }
                }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-transparent to-primary/50 flex-grow"></div>
                  <h3 className="text-2xl font-bold text-foreground/90 px-4 py-2 backdrop-blur-sm glass rounded-full">{category}</h3>
                  <div className="h-px bg-gradient-to-l from-transparent to-accent/50 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * skillIndex, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="glass p-4 rounded-xl backdrop-blur-lg text-center"
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{ backgroundColor: skill.color }}
                          animate={{ 
                            boxShadow: [
                              `0 0 0px ${skill.color}80`,
                              `0 0 15px ${skill.color}40`,
                              `0 0 0px ${skill.color}80`
                            ]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 2 + (skillIndex % 3),
                          }}
                        >
                          <span className="text-lg font-bold text-white opacity-90">
                            {skill.name.charAt(0)}
                          </span>
                        </motion.div>
                        <h4 className="text-base font-medium">{skill.name}</h4>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="max-w-2xl mx-auto glass px-6 py-4 rounded-xl text-foreground/80">
              Constantly learning and expanding my technical toolkit. Currently exploring deep learning frameworks and WebGL/Three.js for advanced visualization projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
