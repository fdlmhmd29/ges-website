import {
  users,
  blogPosts,
  categories,
  services,
  projects,
  clientLogos,
  contactSubmissions,
  type User,
  type InsertUser,
  type InviteUser,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type Category,
  type InsertCategory,
  type Service,
  type InsertService,
  type Project,
  type InsertProject,
  type ClientLogo,
  type InsertClientLogo,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getUsersByRole(role: string): Promise<User[]>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(
    id: number,
    category: Partial<InsertCategory>
  ): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Blog post operations
  getBlogPosts(
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ): Promise<BlogPost[]>;
  getPublishedBlogPosts(
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(
    id: number,
    post: Partial<UpdateBlogPost>
  ): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  getBlogPostsByCategory(categoryId: number): Promise<BlogPost[]>;
  getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]>;

  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(
    id: number,
    service: Partial<InsertService>
  ): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Project operations
  getProjects(sortBy?: string, sortOrder?: "asc" | "desc"): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(
    id: number,
    project: Partial<InsertProject>
  ): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  getProjectsByService(serviceId: number): Promise<Project[]>;

  // Client logo operations
  getClientLogos(): Promise<ClientLogo[]>;
  getClientLogo(id: number): Promise<ClientLogo | undefined>;
  createClientLogo(logo: InsertClientLogo): Promise<ClientLogo>;
  updateClientLogo(
    id: number,
    logo: Partial<InsertClientLogo>
  ): Promise<ClientLogo | undefined>;
  deleteClientLogo(id: number): Promise<boolean>;

  // Contact submission operations
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    const newUser = Array.isArray(result) ? result[0] : undefined;
    return newUser;
  }

  async updateUser(
    id: number,
    user: Partial<InsertUser>
  ): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...user, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.count > 0;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, role));
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.name));
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateCategory(
    id: number,
    category: Partial<InsertCategory>
  ): Promise<Category | undefined> {
    const [updatedCategory] = await db
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.count > 0;
  }

  // Blog post operations
  async getBlogPosts(
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc"
  ): Promise<BlogPost[]> {
    const orderByClause =
      sortOrder === "asc"
        ? asc(blogPosts[sortBy as keyof typeof blogPosts])
        : desc(blogPosts[sortBy as keyof typeof blogPosts]);
    return await db.select().from(blogPosts).orderBy(orderByClause);
  }

  async getPublishedBlogPosts(
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc"
  ): Promise<BlogPost[]> {
    const orderByClause =
      sortOrder === "asc"
        ? asc(blogPosts[sortBy as keyof typeof blogPosts])
        : desc(blogPosts[sortBy as keyof typeof blogPosts]);
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(orderByClause);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(
    id: number,
    post: Partial<UpdateBlogPost>
  ): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.count > 0;
  }

  async getBlogPostsByCategory(categoryId: number): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.categoryId, categoryId))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostsByAuthor(authorId: number): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, authorId))
      .orderBy(desc(blogPosts.createdAt));
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.name));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(
    id: number,
    service: Partial<InsertService>
  ): Promise<Service | undefined> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.count > 0;
  }

  // Project operations
  async getProjects(
    sortBy: string = "completedAt",
    sortOrder: "asc" | "desc" = "desc"
  ): Promise<Project[]> {
    const orderByClause =
      sortOrder === "asc"
        ? asc(projects[sortBy as keyof typeof projects])
        : desc(projects[sortBy as keyof typeof projects]);
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(orderByClause);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(
    id: number,
    project: Partial<InsertProject>
  ): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.count > 0;
  }

  async getProjectsByService(serviceId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.serviceId, serviceId), eq(projects.isActive, true))
      )
      .orderBy(desc(projects.completedAt));
  }

  // Client logo operations
  async getClientLogos(): Promise<ClientLogo[]> {
    return await db
      .select()
      .from(clientLogos)
      .where(eq(clientLogos.isActive, true))
      .orderBy(asc(clientLogos.sortOrder));
  }

  async getClientLogo(id: number): Promise<ClientLogo | undefined> {
    const [logo] = await db
      .select()
      .from(clientLogos)
      .where(eq(clientLogos.id, id));
    return logo;
  }

  async createClientLogo(logo: InsertClientLogo): Promise<ClientLogo> {
    const [newLogo] = await db.insert(clientLogos).values(logo).returning();
    return newLogo;
  }

  async updateClientLogo(
    id: number,
    logo: Partial<InsertClientLogo>
  ): Promise<ClientLogo | undefined> {
    const [updatedLogo] = await db
      .update(clientLogos)
      .set({ ...logo, updatedAt: new Date() })
      .where(eq(clientLogos.id, id))
      .returning();
    return updatedLogo;
  }

  async deleteClientLogo(id: number): Promise<boolean> {
    const result = await db.delete(clientLogos).where(eq(clientLogos.id, id));
    return result.count > 0;
  }

  // Contact submission operations
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(
    id: number
  ): Promise<ContactSubmission | undefined> {
    const [submission] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return submission;
  }

  async createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const result = await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
    return result.count > 0;
  }
}

export const storage = new DatabaseStorage();
