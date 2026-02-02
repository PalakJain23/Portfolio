import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";
import "./types";

const SessionStore = MemoryStore(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session configuration
  app.use(
    session({
      secret: "your-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Only allow specific credentials
      if (username !== "Palak" || password !== "Palak@123") {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if user exists, if not create it
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser({ username, password });
      }

      req.session.userId = user.id;
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user: { id: user.id, username: user.username } });
  });

  // Hero section routes
  app.get("/api/hero", async (req, res) => {
    try {
      const hero = await storage.getHero();
      if (!hero) {
        return res.status(404).json({ message: "Hero section not found" });
      }
      res.json(hero);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/hero", requireAuth, async (req, res) => {
    try {
      const hero = await storage.createHero(req.body);
      res.status(201).json(hero);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/hero/:id", requireAuth, async (req, res) => {
    try {
      const hero = await storage.updateHero(req.params.id, req.body);
      res.json(hero);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/hero/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteHero(req.params.id);
      res.json({ message: "Hero section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // About section routes
  app.get("/api/about", async (req, res) => {
    try {
      const about = await storage.getAbout();
      if (!about) {
        return res.status(404).json({ message: "About section not found" });
      }
      res.json(about);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/about", requireAuth, async (req, res) => {
    try {
      const about = await storage.createAbout(req.body);
      res.status(201).json(about);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/about/:id", requireAuth, async (req, res) => {
    try {
      const about = await storage.updateAbout(req.params.id, req.body);
      res.json(about);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/about/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteAbout(req.params.id);
      res.json({ message: "About section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Skills section routes
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      if (!skills) {
        return res.status(404).json({ message: "Skills section not found" });
      }
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/skills", requireAuth, async (req, res) => {
    try {
      const skills = await storage.createSkills(req.body);
      res.status(201).json(skills);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/skills/:id", requireAuth, async (req, res) => {
    try {
      const skills = await storage.updateSkills(req.params.id, req.body);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/skills/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteSkills(req.params.id);
      res.json({ message: "Skills section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Certifications routes
  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/certifications/:id", async (req, res) => {
    try {
      const certification = await storage.getCertification(req.params.id);
      if (!certification) {
        return res.status(404).json({ message: "Certification not found" });
      }
      res.json(certification);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/certifications", requireAuth, async (req, res) => {
    try {
      const certification = await storage.createCertification(req.body);
      res.status(201).json(certification);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/certifications/:id", requireAuth, async (req, res) => {
    try {
      const certification = await storage.updateCertification(req.params.id, req.body);
      res.json(certification);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/certifications/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteCertification(req.params.id);
      res.json({ message: "Certification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact section routes
  app.get("/api/contact", async (req, res) => {
    try {
      const contact = await storage.getContact();
      if (!contact) {
        return res.status(404).json({ message: "Contact section not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/contact", requireAuth, async (req, res) => {
    try {
      const contact = await storage.createContact(req.body);
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/contact/:id", requireAuth, async (req, res) => {
    try {
      const contact = await storage.updateContact(req.params.id, req.body);
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/contact/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.json({ message: "Contact section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Achievements routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/achievements/:id", async (req, res) => {
    try {
      const achievement = await storage.getAchievement(req.params.id);
      if (!achievement) {
        return res.status(404).json({ message: "Achievement not found" });
      }
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/achievements", requireAuth, async (req, res) => {
    try {
      const achievement = await storage.createAchievement(req.body);
      res.status(201).json(achievement);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/achievements/:id", requireAuth, async (req, res) => {
    try {
      const achievement = await storage.updateAchievement(req.params.id, req.body);
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/achievements/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteAchievement(req.params.id);
      res.json({ message: "Achievement deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
