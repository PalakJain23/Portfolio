import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Folder, Edit, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    techStack: [] as string[],
    githubUrl: "",
    liveUrl: "",
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchProjects();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`/api/projects/${editingProject?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchProjects();
        resetForm();
        setIsDialogOpen(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error("Failed to delete project:", error);
      }
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditForm({
      title: "",
      description: "",
      imageUrl: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      featured: false
    });
    setEditingProject(null);
  };

  const addTechStack = () => {
    const tech = prompt("Enter technology:");
    if (tech) {
      setEditForm(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech]
      }));
    }
  };

  const removeTechStack = (tech: string) => {
    setEditForm(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Featured Projects</h2>
            {user && (
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProject ? "Update your project details" : "Create a new project for your portfolio"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-image">Image URL</Label>
                      <Input
                        id="project-image"
                        value={editForm.imageUrl}
                        onChange={(e) => setEditForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Tech Stack</Label>
                        <Button onClick={addTechStack} size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Tech
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {editForm.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="cursor-pointer">
                            {tech}
                            <button
                              onClick={() => removeTechStack(tech)}
                              className="ml-2 text-xs hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-github">GitHub URL</Label>
                        <Input
                          id="project-github"
                          value={editForm.githubUrl}
                          onChange={(e) => setEditForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-live">Live Demo URL</Label>
                        <Input
                          id="project-live"
                          value={editForm.liveUrl}
                          onChange={(e) => setEditForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="project-featured"
                        checked={editForm.featured}
                        onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, featured: !!checked }))}
                      />
                      <Label htmlFor="project-featured">Featured Project</Label>
                    </div>
                    <Button onClick={editingProject ? handleUpdateProject : handleCreateProject} className="w-full">
                      {editingProject ? "Update Project" : "Create Project"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground">A showcase of my technical projects and experiments</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {user && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <Button
                    onClick={() => openEditDialog(project)}
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteProject(project.id)}
                    variant="destructive"
                    size="sm"
                    className="bg-background/80 backdrop-blur"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Folder className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.featured && (
                    <Badge variant="secondary" className="w-fit">Featured</Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" className="w-full gap-2" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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