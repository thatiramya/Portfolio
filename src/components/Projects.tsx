import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  achievements: string[];
  image: string;
  links: {
    demo?: string;
    github?: string;
    publication?: string;
  };
}

const Projects = () => {
  const { ref, controls, variants } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Brain Tumor Detection via GANs",
      description: "A machine learning system for improved brain tumor detection using Generative Adversarial Networks (GANs) to enhance accuracy and reduce diagnosis time.",
      techStack: ["Flask", "GANs", "Python", "HTML", "CSS", "VGGD19"],
      achievements: [
        "Leveraged GANs and VGGD19 to improve brain tumor detection, aiming for improved diagnosis and potentially reducing diagnosis time by 80%",
        "TensorFlow and Keras were implemented to train and deploy deep learning models, resulting in a reduction of 25% false negative detections"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      links: {
        github: "https://github.com/",
        publication: "https://example.com/publication",
      }
    },
    {
      id: 2,
      title: "EventPulse- Event Booking Platform",
      description: "A full-stack event booking platform with real-time features, seat selection system, and user-friendly interface.",
      techStack: ["React", "Tailwind CSS", "Node.js", "MySQL"],
      achievements: [
        "Developed a full-stack event booking platform using React, TypeScript, Node.js, and MySQL with real-time seat selection",
        "Enabled live chat support and instant booking updates, improving user engagement by 40%"
      ],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      links: {
        demo: "https://example.com/demo",
        github: "https://github.com/",
      }
    },
    {
      id: 3,
      title: "AI-Driven Adaptation for Climate Change",
      description: "Research project focused on developing AI-driven frameworks for climate adaptation, contributing to models with high forecast accuracy.",
      techStack: ["Python", "Machine Learning", "Data Analysis"],
      achievements: [
        "Researched AI-driven frameworks for climate adaptation, contributing to models with up to 70% forecast accuracy",
        "Leveraged machine learning algorithms to enhance decision-making, improving real-time data integration by 40%"
      ],
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      links: {
        publication: "https://example.com/publication",
      }
    },
  ];

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-heading text-center">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.1 * index,
                    },
                  },
                }}
              >
                <div
                  className="h-48 bg-gray-800 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs py-1 px-2 rounded-full bg-primary/20 text-primary-foreground/80 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs py-1 px-2 rounded-full bg-primary/20 text-primary-foreground/80 backdrop-blur-sm">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-foreground/70 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Learn more
                    </button>
                    
                    <div className="flex space-x-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                          </svg>
                        </a>
                      )}
                      
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-foreground/70 hover:text-foreground p-2 z-10"
                onClick={handleCloseProject}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div
                className="h-56 sm:h-64 bg-gray-800 relative"
                style={{
                  backgroundImage: `url(${selectedProject.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs py-1 px-3 rounded-full bg-primary/10 text-primary-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-foreground/80 mb-6">{selectedProject.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Key Achievements</h4>
                  <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                    {selectedProject.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground/80 hover:bg-secondary/80 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                      </svg>
                      GitHub Repository
                    </a>
                  )}
                  
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  
                  {selectedProject.links.publication && (
                    <a
                      href={selectedProject.links.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-foreground/80 hover:bg-accent/30 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Publication
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
