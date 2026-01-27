import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Folder } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "AI Image Captioning",
      description: "A deep learning model that generates descriptive captions for images using CNN-LSTM architecture.",
      tags: ["Python", "TensorFlow", "Deep Learning"],
      github: "#",
      demo: "#",
    },
    {
      title: "Smart Portfolio Generator",
      description: "A web application that helps users build professional portfolios instantly with customizable templates.",
      tags: ["React", "Tailwind", "Node.js"],
      github: "#",
      demo: "#",
    },
    {
      title: "Sentiment Analysis Tool",
      description: "NLP-based tool to analyze customer feedback and classify sentiments as positive, neutral, or negative.",
      tags: ["Python", "NLTK", "Scikit-learn"],
      github: "#",
      demo: null,
    },
    {
      title: "E-Commerce Recommendation",
      description: "Product recommendation engine using collaborative filtering to suggest items to users.",
      tags: ["Python", "Pandas", "ML"],
      github: "#",
      demo: "#",
    },
    {
      title: "Event Management System",
      description: "A comprehensive platform to manage college events, registrations, and feedback.",
      tags: ["Django", "SQL", "Bootstrap"],
      github: "#",
      demo: null,
    },
    {
      title: "Maze Solver Bot",
      description: "An algorithmic bot that finds the shortest path in a maze using A* search algorithm.",
      tags: ["C++", "DSA", "Algorithms"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground">A showcase of my technical projects and experiments</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Folder className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" className="w-full gap-2" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}