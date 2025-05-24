import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About = () => {
  const { ref, controls, variants } = useScrollAnimation();

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <motion.h2 
            className="section-heading text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="glass rounded-2xl p-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-72 h-72 mx-auto rounded-xl overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 mix-blend-overlay"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)',
                      'linear-gradient(45deg, rgba(236, 72, 153, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)',
                      'linear-gradient(45deg, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 100%)'
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
                <img 
                  src="/profile-photo.jpg" 
                  alt="Thati Ramya" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                  Full Stack Web Developer
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </motion.div>
              
              <motion.p 
                className="text-lg text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'm a Computer Science student at B V Raju Institute of Technology with a passion for full-stack development and creating impactful web applications. I specialize in building modern, responsive, and user-friendly web solutions.
              </motion.p>
              
              <motion.p 
                className="text-lg text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                I've developed a full-stack event booking platform that enhanced user engagement by 40% and created various web applications focusing on solving real-world problems. My focus is on building technology that makes a difference while constantly expanding my technical expertise.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="skill-badge hover:scale-105 transition-transform">
                  <span className="text-primary">•</span> Frontend Development
                </div>
                <div className="skill-badge hover:scale-105 transition-transform">
                  <span className="text-accent">•</span> Backend Development
                </div>
                <div className="skill-badge hover:scale-105 transition-transform">
                  <span className="text-primary">•</span> Full-stack Development
                </div>
                <div className="skill-badge hover:scale-105 transition-transform">
                  <span className="text-accent">•</span> UI/UX Design
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="pt-4"
              >
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
