import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogPostSchema, 
  updateBlogPostSchema,
  insertCategorySchema,
  insertServiceSchema,
  insertProjectSchema,
  insertClientLogoSchema,
  insertContactSubmissionSchema,
  inviteUserSchema
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const posts = await storage.getPublishedBlogPosts(sortBy as string, sortOrder as string);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        message: "Login successful", 
        user: { 
          id: user.id, 
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.get("/api/admin/blog/posts", async (req, res) => {
    try {
      const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const posts = await storage.getBlogPosts(sortBy as string, sortOrder as string);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog/posts", async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/admin/blog/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const postData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(id, postData);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.delete("/api/admin/blog/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      
      if (!success) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/admin/categories", async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  app.put("/api/admin/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.updateCategory(id, categoryData);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  app.delete("/api/admin/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCategory(id);
      
      if (!success) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.post("/api/admin/services", async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });

  app.put("/api/admin/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.updateService(id, serviceData);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: "Invalid service data" });
    }
  });

  app.delete("/api/admin/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteService(id);
      
      if (!success) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { sortBy = 'completedAt', sortOrder = 'desc' } = req.query;
      const projects = await storage.getProjects(sortBy as string, sortOrder as 'asc' | 'desc');
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/admin/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/admin/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(id, projectData);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Client logo routes
  app.get("/api/client-logos", async (req, res) => {
    try {
      const logos = await storage.getClientLogos();
      res.json(logos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch client logos" });
    }
  });

  app.post("/api/admin/client-logos", async (req, res) => {
    try {
      const logoData = insertClientLogoSchema.parse(req.body);
      const logo = await storage.createClientLogo(logoData);
      res.status(201).json(logo);
    } catch (error) {
      res.status(400).json({ message: "Invalid client logo data" });
    }
  });

  app.put("/api/admin/client-logos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const logoData = insertClientLogoSchema.parse(req.body);
      const logo = await storage.updateClientLogo(id, logoData);
      
      if (!logo) {
        return res.status(404).json({ message: "Client logo not found" });
      }
      
      res.json(logo);
    } catch (error) {
      res.status(400).json({ message: "Invalid client logo data" });
    }
  });

  app.delete("/api/admin/client-logos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteClientLogo(id);
      
      if (!success) {
        return res.status(404).json({ message: "Client logo not found" });
      }
      
      res.json({ message: "Client logo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete client logo" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json({ message: "Pesan berhasil dikirim. Kami akan menghubungi Anda segera." });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengirim pesan" });
    }
  });

  app.get("/api/admin/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.put("/api/admin/contact-submissions/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markContactSubmissionAsRead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Contact submission not found" });
      }
      
      res.json({ message: "Contact submission marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark contact submission as read" });
    }
  });

  // User management routes
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getUsersByRole("admin");
      const editors = await storage.getUsersByRole("editor");
      const viewers = await storage.getUsersByRole("viewer");
      
      const allUsers = [...users, ...editors, ...viewers].map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }));
      
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", async (req, res) => {
    try {
      const userData = inviteUserSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash("password123", 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
        isActive: true
      });
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.put("/api/admin/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { password, ...updateData } = req.body;
      
      const userData = password ? 
        { ...updateData, password: await bcrypt.hash(password, 10) } : 
        updateData;
      
      const user = await storage.updateUser(id, userData);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteUser(id);
      
      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
