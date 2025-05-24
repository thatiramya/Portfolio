
import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const { ref, controls, variants } = useScrollAnimation();

  const experiences: ExperienceItem[] = [
    {
      title: "Research Intern",
      company: "Indian Institute of Science Campus-National Institute of Advanced Studies",
      location: "Bangalore",
      period: "Aug 2024 - Sep 2024",
      description: [
        "Performed analysis of remote sensing data and satellite imagery to detect rubber plantations, including estimating their age across various regions.",
        "Collaborated with a multidisciplinary team to integrate environmental data with machine learning models."
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="relative z-10"
        >
          <h2 className="section-heading text-center">Professional Experience</h2>
          
          <div className="max-w-3xl mx-auto mt-16">
            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.2 * index,
                      },
                    },
                  }}
                >
                  <div className="glass rounded-xl p-6 ml-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-foreground/70 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-foreground/60 text-sm font-mono">
                        {exp.period}
                      </div>
                    </div>
                    
                    <p className="text-foreground/60 text-sm mb-4">{exp.location}</p>
                    
                    <ul className="text-foreground/80 space-y-2">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
