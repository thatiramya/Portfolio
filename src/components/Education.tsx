
import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  courses?: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  date?: string;
}

const Education = () => {
  const { ref, controls, variants } = useScrollAnimation();

  const educations: EducationItem[] = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "B V Raju Institute of Technology",
      location: "Narsapur, Telangana",
      period: "2022 - Present",
      gpa: "9.3/10",
      courses: [
        "Database Management Systems",
        "Computer Networks",
        "Operating Systems",
        "Object-Oriented-Programming (OOPS)",
        "Data Structures and Algorithms"
      ],
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Narayana Junior College",
      location: "Mallampet",
      period: "2020 - 2022",
      gpa: "9.8 GPA",
    },
    {
      degree: "Secondary School",
      institution: "GDR High School",
      location: "",
      period: "2020",
      gpa: "100%",
    },
  ];

  const certifications: CertificationItem[] = [
    {
      title: "Java Developer Certification",
      issuer: "Infosys Springboard",
    },
    {
      title: "Database Programming with SQL",
      issuer: "Oracle Academy",
    },
    {
      title: "Python Certification",
      issuer: "Cisco Networking",
    },
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="section-heading text-center">Education & Certifications</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-foreground/90">Education</h3>
              
              <div className="space-y-8">
                {educations.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="glass rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.1 * index,
                        },
                      },
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{edu.degree}</h4>
                        <p className="text-foreground/70 font-medium">
                          {edu.institution}
                          {edu.location && `, ${edu.location}`}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-foreground/60 text-sm font-mono flex flex-col items-start sm:items-end">
                        <span>{edu.period}</span>
                        {edu.gpa && <span className="text-primary font-medium mt-1">CGPA: {edu.gpa}</span>}
                      </div>
                    </div>
                    
                    {edu.courses && (
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold mb-2 text-foreground/80">Relevant Coursework</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, i) => (
                            <span key={i} className="text-xs py-1 px-2 rounded-full bg-muted text-foreground/80">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground/90">Certifications</h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="glass rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.5 + 0.1 * index,
                        },
                      },
                    }}
                  >
                    <h4 className="font-bold">{cert.title}</h4>
                    <p className="text-foreground/70">{cert.issuer}</p>
                    {cert.date && <p className="text-foreground/60 text-sm">{cert.date}</p>}
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="glass rounded-xl p-5 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.8,
                    },
                  },
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-foreground/90">Achievements</h3>
                <ul className="text-foreground/80 space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Selected as the best project of the year at the Prelims of IEEE YESIST'12 'KAUSHALY' open house expo 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Awarded first prize in the 'TECHSURGE-2K24 'Prasrushti' Idea Pitching event held at BVRIT, Narsapur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Published insights in IEEE ICCPCT Kerala, emphasizing data-driven strategies to address climate risks</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
