import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, FileText, Edit, Plus, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  date?: string;
}

export default function Certifications() {
  const { user } = useAuth();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    date: "",
    credentialUrl: "",
    imageUrl: ""
  });
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    icon: "Trophy",
    date: ""
  });

  useEffect(() => {
    fetchCertifications();
    fetchAchievements();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch("/api/certifications");
      if (response.ok) {
        const data = await response.json();
        setCertifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements");
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    }
  };

  const handleCreateCertification = async () => {
    try {
      const response = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certForm),
      });

      if (response.ok) {
        fetchCertifications();
        resetCertForm();
        setIsCertDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create certification:", error);
    }
  };

  const handleUpdateCertification = async () => {
    try {
      const response = await fetch(`/api/certifications/${editingCert?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certForm),
      });

      if (response.ok) {
        fetchCertifications();
        resetCertForm();
        setIsCertDialogOpen(false);
        setEditingCert(null);
      }
    } catch (error) {
      console.error("Failed to update certification:", error);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      try {
        const response = await fetch(`/api/certifications/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchCertifications();
        }
      } catch (error) {
        console.error("Failed to delete certification:", error);
      }
    }
  };

  const openEditCertDialog = (cert: Certification) => {
    setEditingCert(cert);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      credentialUrl: cert.credentialUrl,
      imageUrl: cert.imageUrl
    });
    setIsCertDialogOpen(true);
  };

  const resetCertForm = () => {
    setCertForm({
      title: "",
      issuer: "",
      date: "",
      credentialUrl: "",
      imageUrl: ""
    });
    setEditingCert(null);
  };

  const handleCreateAchievement = async () => {
    try {
      const response = await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementForm),
      });

      if (response.ok) {
        fetchAchievements();
        setAchievementForm({ title: "", description: "", icon: "Trophy", date: "" });
        setIsAchievementDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create achievement:", error);
    }
  };

  const handleUpdateAchievement = async () => {
    try {
      const response = await fetch(`/api/achievements/${editingAchievement?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementForm),
      });

      if (response.ok) {
        fetchAchievements();
        setAchievementForm({ title: "", description: "", icon: "Trophy", date: "" });
        setIsAchievementDialogOpen(false);
        setEditingAchievement(null);
      }
    } catch (error) {
      console.error("Failed to update achievement:", error);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        const response = await fetch(`/api/achievements/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchAchievements();
        }
      } catch (error) {
        console.error("Failed to delete achievement:", error);
      }
    }
  };

  const openEditAchievementDialog = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm({
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon || "Trophy",
      date: achievement.date || ""
    });
    setIsAchievementDialogOpen(true);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Trophy": return <Trophy className="w-6 h-6" />;
      case "Award": return <Award className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

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
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Certifications</h2>
              {user && (
                <Dialog open={isCertDialogOpen} onOpenChange={(open) => {
                  setIsCertDialogOpen(open);
                  if (!open) resetCertForm();
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Certification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingCert ? "Edit Certification" : "Add New Certification"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingCert ? "Update your certification details" : "Add a new certification to your portfolio"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cert-title">Certification Name</Label>
                        <Input
                          id="cert-title"
                          value={certForm.title}
                          onChange={(e) => setCertForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cert-issuer">Issuing Organization</Label>
                        <Input
                          id="cert-issuer"
                          value={certForm.issuer}
                          onChange={(e) => setCertForm(prev => ({ ...prev, issuer: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cert-date">Date</Label>
                        <Input
                          id="cert-date"
                          value={certForm.date}
                          onChange={(e) => setCertForm(prev => ({ ...prev, date: e.target.value }))}
                          placeholder="e.g., 2024, March 2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cert-credential">Credential URL</Label>
                        <Input
                          id="cert-credential"
                          value={certForm.credentialUrl}
                          onChange={(e) => setCertForm(prev => ({ ...prev, credentialUrl: e.target.value }))}
                          placeholder="Link to certificate or credential"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cert-image">Image URL</Label>
                        <Input
                          id="cert-image"
                          value={certForm.imageUrl}
                          onChange={(e) => setCertForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="Certificate image URL"
                        />
                      </div>
                      <Button onClick={editingCert ? handleUpdateCertification : handleCreateCertification} className="w-full">
                        {editingCert ? "Update Certification" : "Add Certification"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {user && (
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <Button
                      onClick={() => openEditCertDialog(cert)}
                      variant="outline"
                      size="sm"
                      className="bg-background/80 backdrop-blur"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteCertification(cert.id)}
                      variant="destructive"
                      size="sm"
                      className="bg-background/80 backdrop-blur"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <Card className="hover:border-primary transition-colors cursor-default text-center h-full flex flex-col justify-center py-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
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
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Achievements</h2>
              {user && (
                <Dialog open={isAchievementDialogOpen} onOpenChange={(open) => {
                  setIsAchievementDialogOpen(open);
                  if (!open) {
                    setAchievementForm({ title: "", description: "", icon: "Trophy", date: "" });
                    setEditingAchievement(null);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingAchievement ? "Update your achievement details" : "Add a new achievement to your portfolio"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="achievement-title">Title</Label>
                        <Input
                          id="achievement-title"
                          value={achievementForm.title}
                          onChange={(e) => setAchievementForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="achievement-description">Description</Label>
                        <Textarea
                          id="achievement-description"
                          value={achievementForm.description}
                          onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="achievement-date">Date</Label>
                        <Input
                          id="achievement-date"
                          value={achievementForm.date || ""}
                          onChange={(e) => setAchievementForm(prev => ({ ...prev, date: e.target.value }))}
                          placeholder="e.g., 2024, March 2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="achievement-icon">Icon</Label>
                        <select
                          id="achievement-icon"
                          value={achievementForm.icon}
                          onChange={(e) => setAchievementForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Trophy">🏆 Trophy</option>
                          <option value="Award">🎖️ Award</option>
                          <option value="Star">⭐ Star</option>
                          <option value="Medal">🥇 Medal</option>
                        </select>
                      </div>
                      <Button onClick={editingAchievement ? handleUpdateAchievement : handleCreateAchievement} className="w-full">
                        {editingAchievement ? "Update Achievement" : "Add Achievement"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group"
              >
                {user && (
                  <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" className="bg-background/80 backdrop-blur">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getIcon(item.icon || "Award")}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                    {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
                  </div>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full gap-2 shadow-lg hover:shadow-primary/25" asChild>
              <a href="/RESUME.pdf" target="_blank" download="Palak-Jain-Resume.pdf">
                <FileText className="w-4 h-4" /> Download Resume
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2" asChild>
              <a href="/resume.html" target="_blank">
                <FileText className="w-4 h-4" /> View HTML
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2" asChild>
              <a href="/resume.txt" target="_blank">
                <FileText className="w-4 h-4" /> View Text
              </a>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}