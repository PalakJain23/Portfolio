import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const heroSection = pgTable("hero_section", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  resumeUrl: text("resume_url").notNull(),
  roles: text("roles").array().notNull(),
});

export const aboutSection = pgTable("about_section", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  whoIAm: text("who_i_am").notNull(),
  education: text("education").notNull(),
  interests: text("interests").array().notNull(),
  stats: text("stats").notNull(),
});

export const skillsSection = pgTable("skills_section", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categories: text("categories").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  techStack: text("tech_stack").array().notNull(),
  githubUrl: text("github_url").notNull(),
  liveUrl: text("live_url").notNull(),
  featured: boolean("featured").default(false),
});

export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  credentialUrl: text("credential_url").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const contactSection = pgTable("contact_section", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  socialLinks: text("social_links").notNull(),
});

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  date: text("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHeroSchema = createInsertSchema(heroSection);
export const insertAboutSchema = createInsertSchema(aboutSection);
export const insertSkillsSchema = createInsertSchema(skillsSection);
export const insertProjectSchema = createInsertSchema(projects);
export const insertCertificationSchema = createInsertSchema(certifications);
export const insertContactSchema = createInsertSchema(contactSection);
export const insertAchievementSchema = createInsertSchema(achievements);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHero = z.infer<typeof insertHeroSchema>;
export type Hero = typeof heroSection.$inferSelect;

export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type About = typeof aboutSection.$inferSelect;

export type InsertSkills = z.infer<typeof insertSkillsSchema>;
export type Skills = typeof skillsSection.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSection.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
