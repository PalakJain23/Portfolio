import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, LogOut, Lock } from "lucide-react";
import { useLocation } from "wouter";

interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  avatarUrl: string;
  resumeUrl: string;
  roles: string[];
}

interface AboutData {
  id: string;
  title: string;
  description: string;
  whoIAm: string;
  education: string;
  interests: string[];
  stats: Array<{ icon: string; label: string; value: string }>;
}

interface SkillsData {
  id: string;
  title: string;
  description: string;
  categories: Record<string, string[]>;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}

interface ContactData {
  id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  socialLinks: Array<{ platform: string; url: string }>;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [hero, setHero] = useState<HeroData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [contact, setContact] = useState<ContactData | null>(null);

  // Redirect to home if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please login to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setLocation("/")} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fetchData = async () => {
    try {
      const [heroRes, aboutRes, skillsRes, projectsRes, certsRes, contactRes] = await Promise.all([
        fetch("/api/hero"),
        fetch("/api/about"),
        fetch("/api/skills"),
        fetch("/api/projects"),
        fetch("/api/certifications"),
        fetch("/api/contact")
      ]);

      const heroData = await heroRes.json();
      const aboutData = await aboutRes.json();
      const skillsData = await skillsRes.json();
      const projectsData = await projectsRes.json();
      const certsData = await certsRes.json();
      const contactData = await contactRes.json();

      setHero(heroData);
      setAbout(aboutData);
      setSkills(skillsData);
      setProjects(projectsData);
      setCertifications(certsData);
      setContact(contactData);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
    }
  };

  useState(() => {
    fetchData();
  });

  const handleHeroUpdate = async (data: Partial<HeroData>) => {
    try {
      const response = await fetch(`/api/hero/${hero?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Hero section updated" });
        fetchData();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update hero", variant: "destructive" });
    }
  };

  const handleProjectCreate = async (data: Omit<ProjectData, "id">) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Project created" });
        fetchData();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
    }
  };

  const handleProjectDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({ title: "Success", description: "Project deleted" });
        fetchData();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Logged in as {user.username}</span>
            <Button onClick={() => setLocation("/")} variant="outline" size="sm">
              View Portfolio
            </Button>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certs</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Update your hero section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      value={hero?.title || ""}
                      onChange={(e) => setHero(hero ? { ...hero, title: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={hero?.subtitle || ""}
                      onChange={(e) => setHero(hero ? { ...hero, subtitle: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={hero?.description || ""}
                    onChange={(e) => setHero(hero ? { ...hero, description: e.target.value } : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero-avatar">Avatar URL</Label>
                    <Input
                      id="hero-avatar"
                      value={hero?.avatarUrl || ""}
                      onChange={(e) => setHero(hero ? { ...hero, avatarUrl: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-resume">Resume URL</Label>
                    <Input
                      id="hero-resume"
                      value={hero?.resumeUrl || ""}
                      onChange={(e) => setHero(hero ? { ...hero, resumeUrl: e.target.value } : null)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleHeroUpdate(hero!)}>Update Hero</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex gap-2 mt-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleProjectDelete(project.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription>Create a new project for your portfolio</DialogDescription>
                      </DialogHeader>
                      <ProjectForm onSubmit={handleProjectCreate} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectForm({ onSubmit }: { onSubmit: (data: Omit<ProjectData, "id">) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    techStack: [] as string[],
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="project-title">Title</Label>
        <Input
          id="project-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="project-description">Description</Label>
        <Textarea
          id="project-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="project-image">Image URL</Label>
        <Input
          id="project-image"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="project-tech">Tech Stack (comma-separated)</Label>
        <Input
          id="project-tech"
          value={formData.techStack.join(", ")}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(", ").filter(Boolean) })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="project-github">GitHub URL</Label>
          <Input
            id="project-github"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="project-live">Live URL</Label>
          <Input
            id="project-live"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="project-featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
        />
        <Label htmlFor="project-featured">Featured Project</Label>
      </div>
      <Button type="submit">Create Project</Button>
    </form>
  );
}
