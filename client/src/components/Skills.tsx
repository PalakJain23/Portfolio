import { motion } from "framer-motion";
import { SiPython, SiCplusplus, SiReact, SiDjango, SiMysql, SiGit, SiTensorflow } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database, Server, Terminal, Users, Lightbulb, Mic, Edit, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface SkillsData {
  id: string;
  title: string;
  description: string;
  categories: Record<string, string[]>;
}

export default function Skills() {
  const { user } = useAuth();
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    categories: {} as Record<string, string[]>
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      if (response.ok) {
        const data = await response.json();
        setSkillsData(data);
        setEditForm({
          title: data.title,
          description: data.description,
          categories: JSON.parse(data.categories)
        });
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    }
  };

  const handleUpdateSkills = async () => {
    try {
      const response = await fetch(`/api/skills/${skillsData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          categories: JSON.stringify(editForm.categories)
        }),
      });

      if (response.ok) {
        fetchSkills();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  };

  const addCategory = () => {
    const categoryName = prompt("Enter category name:");
    if (categoryName) {
      setEditForm(prev => ({
        ...prev,
        categories: { ...prev.categories, [categoryName]: [] }
      }));
    }
  };

  const addSkillToCategory = (category: string) => {
    const skillName = prompt(`Enter skill for ${category}:`);
    if (skillName) {
      setEditForm(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: [...(prev.categories[category] || []), skillName]
        }
      }));
    }
  };

  const removeSkillFromCategory = (category: string, skill: string) => {
    setEditForm(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: prev.categories[category].filter(s => s !== skill)
      }
    }));
  };

  const removeCategory = (category: string) => {
    setEditForm(prev => {
      const newCategories = { ...prev.categories };
      delete newCategories[category];
      return { ...prev, categories: newCategories };
    });
  };

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

  const getIconForSkill = (skillName: string) => {
    const skillLower = skillName.toLowerCase();
    if (skillLower.includes("python")) return <SiPython className="text-[#3776AB]" />;
    if (skillLower.includes("java")) return <FaJava className="text-[#007396]" />;
    if (skillLower.includes("c++")) return <SiCplusplus className="text-[#00599C]" />;
    if (skillLower.includes("react")) return <SiReact className="text-[#61DAFB]" />;
    if (skillLower.includes("django")) return <SiDjango className="text-[#092E20]" />;
    if (skillLower.includes("sql") || skillLower.includes("dbms")) return <SiMysql className="text-[#4479A1]" />;
    if (skillLower.includes("ml") || skillLower.includes("tensorflow")) return <SiTensorflow className="text-[#FF6F00]" />;
    if (skillLower.includes("git") || skillLower.includes("github")) return <SiGit className="text-[#F05032]" />;
    return <Terminal className="text-primary" />;
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
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              {skillsData?.title || "My Skills"}
            </h2>
            {user && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Skills</DialogTitle>
                    <DialogDescription>Update your skills categories and items</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skills-title">Title</Label>
                      <Input
                        id="skills-title"
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="skills-description">Description</Label>
                      <Textarea
                        id="skills-description"
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Categories</Label>
                        <Button onClick={addCategory} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Category
                        </Button>
                      </div>
                      {Object.entries(editForm.categories).map(([category, skills]) => (
                        <Card key={category} className="mb-4">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{category}</CardTitle>
                              <Button
                                onClick={() => removeCategory(category)}
                                variant="destructive"
                                size="sm"
                              >
                                Remove
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="cursor-pointer">
                                  {skill}
                                  <button
                                    onClick={() => removeSkillFromCategory(category, skill)}
                                    className="ml-2 text-xs hover:text-destructive"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <Button
                              onClick={() => addSkillToCategory(category)}
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Skill
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button onClick={handleUpdateSkills} className="w-full">
                      Update Skills
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-muted-foreground">{skillsData?.description || "My technical toolkit and professional attributes"}</p>
        </motion.div>

        {skillsData && Object.entries(JSON.parse(skillsData.categories)).map(([category, skills], categoryIdx) => (
          <div key={category} className="mb-16">
            <h3 className="text-xl font-bold mb-8 text-center md:text-left border-b pb-2 inline-block">{category}</h3>
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {(skills as string[]).map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={item}
                  className="group p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {getIconForSkill(skill)}
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}