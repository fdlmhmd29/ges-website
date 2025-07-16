import { users, blogPosts, type User, type InsertUser, type BlogPost, type InsertBlogPost, type UpdateBlogPost } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<UpdateBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private currentUserId: number;
  private currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    
    // Create default admin user
    this.users.set(1, {
      id: 1,
      username: "admin",
      password: "greenfield2023"
    });
    this.currentUserId = 2;
    
    // Create some sample blog posts
    this.createInitialBlogPosts();
  }

  private createInitialBlogPosts() {
    const posts = [
      {
        title: "Implementasi Green Building di Indonesia: Peluang dan Tantangan",
        content: "Green building atau bangunan hijau merupakan konsep pembangunan berkelanjutan yang semakin penting di Indonesia. Dengan iklim tropis dan kepadatan penduduk yang tinggi, implementasi green building menjadi solusi untuk mengurangi dampak lingkungan dari sektor konstruksi...",
        excerpt: "Explore bagaimana konsep green building dapat diterapkan di Indonesia dengan mempertimbangkan iklim tropis dan regulasi lokal",
        author: "Dr. Sarah Putri",
        category: "Green Building",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-15"),
        updatedAt: new Date("2023-12-15"),
      },
      {
        title: "Strategi Pengelolaan Limbah B3 untuk Industri Manufaktur",
        content: "Limbah Bahan Berbahaya dan Beracun (B3) memerlukan penanganan khusus dalam industri manufaktur. Artikel ini membahas strategi komprehensif untuk mengelola limbah B3 sesuai dengan regulasi yang berlaku di Indonesia...",
        excerpt: "Panduan komprehensif untuk mengelola limbah berbahaya dan beracun (B3) sesuai dengan regulasi yang berlaku di Indonesia",
        author: "Ir. Bambang Sutrisno",
        category: "Waste Management",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-12"),
        updatedAt: new Date("2023-12-12"),
      },
      {
        title: "Teknologi IoT untuk Monitoring Lingkungan Real-time",
        content: "Internet of Things (IoT) membuka peluang baru dalam monitoring lingkungan secara real-time. Teknologi ini memungkinkan pengumpulan data lingkungan yang akurat dan kontinyu untuk berbagai parameter...",
        excerpt: "Bagaimana teknologi Internet of Things (IoT) dapat meningkatkan efektivitas monitoring lingkungan dalam berbagai industri",
        author: "Dr. Ahmad Firdaus",
        category: "Monitoring",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        published: true,
        createdAt: new Date("2023-12-10"),
        updatedAt: new Date("2023-12-10"),
      },
    ];

    posts.forEach(post => {
      const blogPost: BlogPost = {
        id: this.currentBlogPostId++,
        ...post,
      };
      this.blogPosts.set(blogPost.id, blogPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      id,
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, updates: Partial<UpdateBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
