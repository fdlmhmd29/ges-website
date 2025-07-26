# PT Greenfield Environment Solution

This repository contains the source code for **PT Greenfield Environment Solution**, a full-stack web application featuring a React frontend and an Express backend. The project powers the company's corporate website, blog, and admin panel for managing content.

## Prerequisites

- **Node.js 20** or later
- **npm** (comes with Node.js)
- Access to a **PostgreSQL** database

## Environment Setup

Create a `.env` file in the project root with the following variable:

```bash
DATABASE_URL=postgres://user:password@host:port/dbname
```

Optionally you can specify a custom `PORT` number if you don't want to use the default `5000`.

## Useful Scripts

- `npm run dev` – start the development server with hot reload
- `npm run db:push` – push the latest database schema using Drizzle
- `npm run seed` – populate the database with sample data

Run these commands from the repository root.
