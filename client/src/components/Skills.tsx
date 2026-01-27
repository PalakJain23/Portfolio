import { motion } from "framer-motion";
import { SiPython, SiCplusplus, SiReact, SiDjango, SiMysql, SiGit, SiTensorflow } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database, Server, Terminal, Users, Lightbulb, Mic } from "lucide-react";

export default function Skills() {
  const technicalSkills = [
    { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
    { name: "Java", icon: <FaJava className="text-[#007396]" /> },
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
    { name: "SQL / DBMS", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "ML / DL", icon: <SiTensorflow className="text-[#FF6F00]" /> },
    { name: "Git / GitHub", icon: <SiGit className="text-[#F05032]" /> },
  ];

  const softSkills = [
    { name: "Leadership", icon: <Users /> },
    { name: "Problem Solving", icon: <Terminal /> },
    { name: "Creativity", icon: <Lightbulb /> },
    { name: "Communication", icon: <Mic /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground">My technical toolkit and professional attributes</p>
        </motion.div>

        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-center md:text-left border-b pb-2 inline-block">Technical Expertise</h3>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {technicalSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="group p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-4 text-center"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="font-medium group-hover:text-primary transition-colors">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-8 text-center md:text-left border-b pb-2 inline-block">Soft Skills</h3>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {softSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-6 rounded-xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all flex flex-col items-center justify-center gap-4 text-center"
              >
                <div className="p-3 bg-background rounded-full text-primary shadow-sm">
                  {skill.icon}
                </div>
                <span className="font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}