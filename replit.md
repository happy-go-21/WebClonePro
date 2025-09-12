# Overview

This is a full-stack marketplace application called "بازار افغانستان" (Afghanistan Market) - an online marketplace for buying and selling various products including real estate, vehicles, electronics, and other goods. The application is built with a modern React frontend and Express.js backend, featuring a Persian/Dari language interface with RTL support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Products, and Post Ad
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Persian/RTL styling and glassmorphism design
- **Language Support**: Persian/Dari with RTL text direction

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints for products, categories, and provinces
- **Data Layer**: In-memory storage implementation with interface-based design for future database integration
- **Build System**: ESBuild for server bundling, supports both development and production modes

## Data Storage Architecture
- **Current Implementation**: Memory-based storage using Maps for products, categories, and provinces
- **Database Schema**: Drizzle ORM schema definitions prepared for PostgreSQL integration
- **Schema Design**: 
  - Products table with fields for title, description, price, category, location, and images
  - Categories table with name, icon, and product count
  - Provinces table with name, icon, and population data

## Component Structure
- **Layout System**: Centralized layout component with top toolbar and main content area
- **Feature Components**: 
  - CategoryCircles: Interactive category selection with visual icons
  - ProvinceCircles: Location-based filtering interface
  - ProductGrid: Responsive product display with search and filter capabilities
  - MainHeader: Search interface with category and location filters
- **UI Components**: Comprehensive shadcn/ui component library with consistent styling

## Development Tools
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: Shared schema validation using Zod for type-safe API communication
- **Development Experience**: Hot reload with Vite, integrated error handling and logging

# External Dependencies

## Frontend Dependencies
- **UI Framework**: Radix UI components for accessible, unstyled components
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS for utility-first styling approach
- **Forms**: React Hook Form with Hookform Resolvers for form validation
- **Icons**: Lucide React for consistent iconography
- **Build Tools**: Vite with React plugin for fast development and building

## Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL (configured but not actively used)
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Validation**: Zod for runtime type validation and schema generation
- **Development**: tsx for TypeScript execution in development

## Build and Deployment
- **Package Manager**: npm with lock file for dependency consistency
- **Build Process**: Vite for frontend bundling, ESBuild for server bundling
- **Environment**: Configured for both development and production deployments
- **Asset Management**: Static file serving with proper routing configuration