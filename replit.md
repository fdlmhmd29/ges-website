# Replit.md - PT Greenfield Environment Solution

## Overview

This is a full-stack web application for PT Greenfield Environment Solution, an environmental consulting company. The application is built with a React frontend and Express backend, featuring a corporate website with blog functionality and an admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Rich Text Editor**: TipTap with extensions for tables, images, links, and placeholders
- **Carousel**: Embla Carousel for client logos and image galleries

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Employee-only login with bcrypt password hashing
- **API**: RESTful endpoints for all content management operations
- **Security**: Role-based access control (admin, editor, viewer)
- **Email**: NodeMailer with Gmail SMTP integration planned

### Key Components

#### Database Schema
- `users` table: Employee management with roles (admin, editor, viewer), full names, email, password hashing
- `categories` table: Blog post categories with slugs and descriptions
- `blog_posts` table: Blog content with foreign key relationships to users and categories
- `services` table: Company services with features, descriptions, and slugs
- `projects` table: Project portfolio with client information, service relationships, and detailed project data
- `client_logos` table: Client logo carousel with sorting and active status
- `contact_submissions` table: Contact form submissions with read status tracking

#### API Endpoints
- **Public Routes**:
  - `GET /api/blog/posts` - Fetch published blog posts with sorting
  - `GET /api/blog/posts/:id` - Fetch specific blog post
  - `GET /api/categories` - Fetch all blog categories
  - `GET /api/services` - Fetch all services
  - `GET /api/services/:slug` - Fetch service by slug
  - `GET /api/projects` - Fetch all projects with sorting
  - `GET /api/projects/:id` - Fetch specific project
  - `GET /api/client-logos` - Fetch client logos for carousel
  - `POST /api/contact` - Submit contact form
- **Admin Routes**:
  - `POST /api/admin/login` - Employee authentication
  - User management (CRUD operations for employee accounts)
  - Blog post management with category relationships
  - Category management (CRUD operations)
  - Service management (CRUD operations)
  - Project management (CRUD operations)
  - Client logo management (CRUD operations)
  - Contact submission management (view, mark as read)

#### Frontend Pages
- **Public Pages**:
  - Home page with hero, services, about, blog preview, and contact sections
  - Blog listing page
  - Individual blog post pages
- **Admin Pages**:
  - Admin login page
  - Admin dashboard with blog management

## Data Flow

1. **Public Content**: Blog posts are fetched from the backend API and cached using React Query
2. **Admin Authentication**: Simple username/password login stored in localStorage
3. **Content Management**: Admin can create, edit, and delete blog posts through the admin panel
4. **Real-time Updates**: React Query handles cache invalidation and updates after admin actions

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui
- **Styling**: Tailwind CSS with custom green theme variables
- **Forms**: React Hook Form with Zod schema validation
- **HTTP Client**: Fetch API with custom wrapper functions
- **Icons**: Lucide React icons

### Backend Dependencies
- **Database**: 
  - Drizzle ORM for type-safe database operations
  - Neon Database serverless PostgreSQL
  - Connection pooling with `connect-pg-simple`
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations in `migrations` folder

### Environment Configuration
- Development server runs on Express with Vite middleware
- Production serves static files from Express
- Database connection via `DATABASE_URL` environment variable
- Replit-specific development tools integrated

### Key Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run db:push` - Database schema synchronization

## Development Notes

- The application uses a monorepo structure with shared types in the `shared` folder
- TypeScript configuration supports both client and server code
- Tailwind configuration is set up for the shadcn/ui design system
- The database uses in-memory storage for development with sample data
- Admin authentication is basic and intended for single-user scenarios
- The green theme reflects the environmental focus of the company

## Database Considerations

The application currently uses Drizzle ORM with PostgreSQL configuration. The connection is set up for Neon Database, but the code agent may need to ensure proper database provisioning and connection setup during deployment.