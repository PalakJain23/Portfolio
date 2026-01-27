import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certifications() {
  const certs = [
    { name: "Cloud Computing", issuer: "NPTEL", date: "2024" },
    { name: "Deep Learning Specialization", issuer: "Coursera", date: "2023" },
    { name: "Python for Data Science", issuer: "IBM", date: "2023" },
    { name: "Full Stack Web Development", issuer: "Udemy", date: "2022" },
  ];

  const achievements = [
    { title: "Hackathon Winner", desc: "1st Place in Smart India Hackathon internal round" },
    { title: "Research Paper", desc: "Published 'Impact of Artificial Intelligence in Everyday Life'" },
    { title: "Event Organizer", desc: "Lead organizer for college technical fest 'Technova'" },
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        
        {/* Certifications */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Certifications</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="hover:border-primary transition-colors cursor-default text-center h-full flex flex-col justify-center py-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div id="achievements">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Achievements</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to know more?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out my detailed resume to see my full professional journey, education details, and comprehensive skill set.
          </p>
          <Button size="lg" className="rounded-full gap-2 shadow-lg hover:shadow-primary/25" asChild>
            <a href="/resume.pdf" target="_blank">
              <FileText className="w-4 h-4" /> Download Resume
            </a>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}