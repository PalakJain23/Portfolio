import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, User, Calendar } from "lucide-react";

export default function About() {
  const stats = [
    { icon: <Code className="w-5 h-5" />, label: "Interest", value: "Coding & Dev" },
    { icon: <Brain className="w-5 h-5" />, label: "Focus", value: "AI & ML" },
    { icon: <User className="w-5 h-5" />, label: "Trait", value: "Self-Motivated" },
    { icon: <Calendar className="w-5 h-5" />, label: "Education", value: "M.Tech AI" },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am an Integrated M.Tech AI student at VIT Bhopal with a passion for building intelligent systems. 
            My journey bridges the gap between complex algorithms and real-world applications. 
            I thrive in dynamic environments where innovation meets problem-solving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              As an AI/ML enthusiast and software developer, I am constantly exploring new technologies. 
              Whether it's training a deep learning model, building a full-stack web application, or organizing a college event, 
              I bring dedication and creativity to everything I do.
            </p>
            <p className="text-muted-foreground mb-6">
              I believe in the power of technology to solve meaningful problems. My academic background in Artificial Intelligence 
              combined with my practical experience in development allows me to approach challenges from multiple perspectives.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="font-semibold text-sm">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
             <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Education</h4>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">VIT Bhopal University</span>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">2023 - 2028</span>
                </div>
                <p className="text-sm text-muted-foreground">Integrated M.Tech in Artificial Intelligence</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Web Development", "Event Management", "Creative Writing"].map((item) => (
                    <span key={item} className="text-xs font-medium px-3 py-1 bg-secondary rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}