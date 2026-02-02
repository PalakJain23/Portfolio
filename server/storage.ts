import { 
  type User, type InsertUser,
  type Hero, type InsertHero,
  type About, type InsertAbout,
  type Skills, type InsertSkills,
  type Project, type InsertProject,
  type Certification, type InsertCertification,
  type Contact, type InsertContact,
  type Achievement, type InsertAchievement
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hero section operations
  getHero(): Promise<Hero | undefined>;
  createHero(hero: InsertHero): Promise<Hero>;
  updateHero(id: string, hero: Partial<InsertHero>): Promise<Hero>;
  deleteHero(id: string): Promise<void>;
  
  // About section operations
  getAbout(): Promise<About | undefined>;
  createAbout(about: InsertAbout): Promise<About>;
  updateAbout(id: string, about: Partial<InsertAbout>): Promise<About>;
  deleteAbout(id: string): Promise<void>;
  
  // Skills section operations
  getSkills(): Promise<Skills | undefined>;
  createSkills(skills: InsertSkills): Promise<Skills>;
  updateSkills(id: string, skills: Partial<InsertSkills>): Promise<Skills>;
  deleteSkills(id: string): Promise<void>;
  
  // Projects operations
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Certifications operations
  getCertifications(): Promise<Certification[]>;
  getCertification(id: string): Promise<Certification | undefined>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification>;
  deleteCertification(id: string): Promise<void>;
  
  // Contact section operations
  getContact(): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
  
  // Achievements operations
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: string): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: string, achievement: Partial<InsertAchievement>): Promise<Achievement>;
  deleteAchievement(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private heroData: Map<string, Hero>;
  private aboutData: Map<string, About>;
  private skillsData: Map<string, Skills>;
  private projectsData: Map<string, Project>;
  private certificationsData: Map<string, Certification>;
  private contactData: Map<string, Contact>;
  private achievementsData: Map<string, Achievement>;

  constructor() {
    this.users = new Map();
    this.heroData = new Map();
    this.aboutData = new Map();
    this.skillsData = new Map();
    this.projectsData = new Map();
    this.certificationsData = new Map();
    this.contactData = new Map();
    this.achievementsData = new Map();
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize hero section
    const defaultHero: Hero = {
      id: randomUUID(),
      title: "Hi, I'm Palak Jain",
      subtitle: "Software Developer",
      description: "Welcome to my portfolio",
      avatarUrl: "/assets/avatar-placeholder.png",
      resumeUrl: "/resume.pdf",
      roles: ["Software Developer", "AI/ML Enthusiast", "Problem Solver"]
    };
    this.heroData.set(defaultHero.id, defaultHero);

    // Initialize about section
    const defaultAbout: About = {
      id: randomUUID(),
      title: "About Me",
      description: "I am an Integrated M.Tech AI student at VIT Bhopal with a passion for building intelligent systems.",
      whoIAm: "As an AI/ML enthusiast and software developer, I am constantly exploring new technologies.",
      education: "Integrated M.Tech in Artificial Intelligence at VIT Bhopal University (2023 - 2028)",
      interests: JSON.stringify(["Machine Learning", "Web Development", "Event Management", "Creative Writing"]),
      stats: JSON.stringify([
        { icon: "Code", label: "Interest", value: "Coding & Dev" },
        { icon: "Brain", label: "Focus", value: "AI & ML" },
        { icon: "User", label: "Trait", value: "Self-Motivated" },
        { icon: "Calendar", label: "Education", value: "M.Tech AI" }
      ])
    };
    this.aboutData.set(defaultAbout.id, defaultAbout);

    // Initialize skills section
    const defaultSkills: Skills = {
      id: randomUUID(),
      title: "Skills",
      description: "Technical skills and expertise",
      categories: JSON.stringify({
        "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java"],
        "Frontend": ["React", "Vue.js", "HTML", "CSS", "Tailwind CSS"],
        "Backend": ["Node.js", "Express", "PostgreSQL", "MongoDB"],
        "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"]
      })
    };
    this.skillsData.set(defaultSkills.id, defaultSkills);

    // Initialize contact section
    const defaultContact: Contact = {
      id: randomUUID(),
      title: "Get In Touch",
      description: "Feel free to reach out for collaborations or just a friendly hello!",
      email: "jainpalak1617@gmail.com",
      phone: "+91 1234567890",
      socialLinks: JSON.stringify([
        { platform: "GitHub", url: "https://github.com/PalakJain23" },
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/palak-jain-3706b0311/" },
        { platform: "Twitter", url: "https://twitter.com/palakjain" }
      ])
    };
    this.contactData.set(defaultContact.id, defaultContact);

    // Initialize achievements
    const defaultAchievements: Achievement[] = [
      {
        id: randomUUID(),
        title: "Hackathon Winner",
        description: "1st Place in Smart India Hackathon internal round",
        icon: "Trophy",
        date: "2024"
      },
      {
        id: randomUUID(),
        title: "Research Paper",
        description: "Published 'Impact of Artificial Intelligence in Everyday Life'",
        icon: "Award",
        date: "2023"
      },
      {
        id: randomUUID(),
        title: "Event Organizer",
        description: "Lead organizer for college technical fest 'Technova'",
        icon: "Award",
        date: "2023"
      }
    ];
    defaultAchievements.forEach(achievement => {
      this.achievementsData.set(achievement.id, achievement);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Hero section operations
  async getHero(): Promise<Hero | undefined> {
    return Array.from(this.heroData.values())[0];
  }

  async createHero(hero: InsertHero): Promise<Hero> {
    const id = randomUUID();
    const heroData: Hero = { ...hero, id };
    this.heroData.set(id, heroData);
    return heroData;
  }

  async updateHero(id: string, hero: Partial<InsertHero>): Promise<Hero> {
    const existing = this.heroData.get(id);
    if (!existing) throw new Error("Hero section not found");
    const updated = { ...existing, ...hero };
    this.heroData.set(id, updated);
    return updated;
  }

  async deleteHero(id: string): Promise<void> {
    this.heroData.delete(id);
  }

  // About section operations
  async getAbout(): Promise<About | undefined> {
    return Array.from(this.aboutData.values())[0];
  }

  async createAbout(about: InsertAbout): Promise<About> {
    const id = randomUUID();
    const aboutData: About = { ...about, id };
    this.aboutData.set(id, aboutData);
    return aboutData;
  }

  async updateAbout(id: string, about: Partial<InsertAbout>): Promise<About> {
    const existing = this.aboutData.get(id);
    if (!existing) throw new Error("About section not found");
    const updated = { ...existing, ...about };
    this.aboutData.set(id, updated);
    return updated;
  }

  async deleteAbout(id: string): Promise<void> {
    this.aboutData.delete(id);
  }

  // Skills section operations
  async getSkills(): Promise<Skills | undefined> {
    return Array.from(this.skillsData.values())[0];
  }

  async createSkills(skills: InsertSkills): Promise<Skills> {
    const id = randomUUID();
    const skillsData: Skills = { ...skills, id };
    this.skillsData.set(id, skillsData);
    return skillsData;
  }

  async updateSkills(id: string, skills: Partial<InsertSkills>): Promise<Skills> {
    const existing = this.skillsData.get(id);
    if (!existing) throw new Error("Skills section not found");
    const updated = { ...existing, ...skills };
    this.skillsData.set(id, updated);
    return updated;
  }

  async deleteSkills(id: string): Promise<void> {
    this.skillsData.delete(id);
  }

  // Projects operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsData.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projectsData.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const projectData: Project = { ...project, id };
    this.projectsData.set(id, projectData);
    return projectData;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const existing = this.projectsData.get(id);
    if (!existing) throw new Error("Project not found");
    const updated = { ...existing, ...project };
    this.projectsData.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    this.projectsData.delete(id);
  }

  // Certifications operations
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certificationsData.values());
  }

  async getCertification(id: string): Promise<Certification | undefined> {
    return this.certificationsData.get(id);
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    const id = randomUUID();
    const certificationData: Certification = { ...certification, id };
    this.certificationsData.set(id, certificationData);
    return certificationData;
  }

  async updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification> {
    const existing = this.certificationsData.get(id);
    if (!existing) throw new Error("Certification not found");
    const updated = { ...existing, ...certification };
    this.certificationsData.set(id, updated);
    return updated;
  }

  async deleteCertification(id: string): Promise<void> {
    this.certificationsData.delete(id);
  }

  // Contact section operations
  async getContact(): Promise<Contact | undefined> {
    return Array.from(this.contactData.values())[0];
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contactData: Contact = { ...contact, id };
    this.contactData.set(id, contactData);
    return contactData;
  }

  async updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact> {
    const existing = this.contactData.get(id);
    if (!existing) throw new Error("Contact section not found");
    const updated = { ...existing, ...contact };
    this.contactData.set(id, updated);
    return updated;
  }

  async deleteContact(id: string): Promise<void> {
    this.contactData.delete(id);
  }

  // Achievements operations
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievementsData.values());
  }

  async getAchievement(id: string): Promise<Achievement | undefined> {
    return this.achievementsData.get(id);
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievementData: Achievement = { ...achievement, id };
    this.achievementsData.set(id, achievementData);
    return achievementData;
  }

  async updateAchievement(id: string, achievement: Partial<InsertAchievement>): Promise<Achievement> {
    const existing = this.achievementsData.get(id);
    if (!existing) throw new Error("Achievement not found");
    const updated = { ...existing, ...achievement };
    this.achievementsData.set(id, updated);
    return updated;
  }

  async deleteAchievement(id: string): Promise<void> {
    this.achievementsData.delete(id);
  }
}

export const storage = new MemStorage();
