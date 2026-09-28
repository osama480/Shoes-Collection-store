# Sole Collection - E-Commerce Shoe Store

A modern, high-performance full-stack Shoe Store web application featuring a **NestJS REST API Backend** and a **Next.js 14 App Router Frontend**.

---

## 📁 Repository Structure

```
Sole Collection/
├── backend/                  # NestJS REST API Server
│   ├── src/
│   │   ├── main.ts           # API Entrypoint (CORS, Validation, Global Interceptors)
│   │   ├── app.module.ts     # Root Module
│   │   ├── common/           # Decorators, Guards (JWT & Roles), Filters & DTOs
│   │   └── modules/          # Domain Feature Modules
│   │       ├── auth/         # Login, Register & JWT Authentication Strategy
│   │       ├── users/        # User profiles & RBAC roles
│   │       ├── products/     # Shoe catalog, inventory, sizes, brands, filters
│   │       ├── cart/         # Shopping cart state & user cart persistence
│   │       ├── orders/       # Order management & checkout workflows
│   │       └── payments/     # Payment gateway processing skel
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Next.js 14 App Router Frontend
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   │   ├── layout.tsx    # Root layout with Navbar, Footer & Global Providers
│   │   │   ├── page.tsx      # Home Page (Hero banner, Hot Drops, Benefits)
│   │   │   ├── products/     # Shoe catalog search & live size/brand filters
│   │   │   ├── checkout/     # Order placement & shipping form
│   │   │   ├── account/      # Customer login & register forms
│   │   │   └── admin/        # Admin panel metrics overview
│   │   ├── components/       # Layout, Product Grid/Cards, SizeSelector, CartDrawer
│   │   ├── lib/              # API Client (connecting to NestJS API) & Contexts
│   │   ├── styles/           # Global CSS design system & custom glassmorphism
│   │   └── types/            # TypeScript domain interfaces
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🚀 Running the Applications

### 1. Running the NestJS Backend (`backend/`)
```bash
cd backend
npm install
npm run start:dev
```
> The API server starts on **http://localhost:8000/api/v1**.

### 2. Running the Next.js Frontend (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```
> The Web Application runs on **http://localhost:3000**.
