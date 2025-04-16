# MW Portal - Project Summary

## Overview
(Updated April 16, 2025)

MW Portal is a full-stack web application consisting of a Next.js frontend and an Express.js TypeScript API backend. The application provides a centralized platform for managing resources with secure authentication, user management, and a dashboard interface.

## Recent Development Work

### Port Configuration and Connection Issues Fixed
- Resolved port conflicts between the frontend and API services
- Configured the frontend to consistently run on port 3000
- Set up the API to run on port 3002 to avoid conflicts
- Updated all service references to use consistent port configurations
- Implemented proper CORS setup to allow cross-origin requests between services
- Enhanced the start script to automatically handle port conflicts

### API Backend Development
- Implemented a layered architecture with proper separation of concerns
- Built user authentication system with JWT token-based security
- Created middleware for protecting routes that require authentication
- Developed RESTful endpoints for user management (login, registration, profile)
- Structured the codebase following best practices for maintainability

### Frontend Development
- Created an intuitive user interface using Next.js and React
- Implemented login functionality with proper validation and error handling
- Built a protected route system to secure authenticated-only content
- Integrated with the backend API for seamless data flow
- Organized components using the Atomic Design methodology

## Project Architecture

### System Architecture
The project uses a client-server architecture with:
- **Frontend**: Next.js application serving as the user interface
- **Backend**: Express.js RESTful API handling business logic and data
- **Communication**: HTTP/HTTPS with JWT authentication

### API Architecture (Backend)
The API follows a layered architecture pattern:

1. **Routes/Auth Layer**: Handles routing and authentication
   - Defines available endpoints and protects sensitive operations
   - Manages user authentication state with JWT tokens

2. **Controller Layer**: Manages HTTP requests and responses
   - Processes incoming requests and passes to appropriate service
   - Formats and returns HTTP responses

3. **Service Layer**: Contains business logic
   - Implements core application functionality
   - Performs validation and applies business rules

4. **Repository Layer**: Handles data persistence
   - Abstracts data access operations
   - Currently using a mock implementation for development

### Frontend Architecture
The frontend is structured following the Atomic Design methodology:

1. **Atoms**: Smallest UI components (buttons, inputs)
2. **Molecules**: Simple groups of atoms (login form, navigation items)
3. **Organisms**: Complex UI components (protected route wrapper)
4. **Templates**: Page-level structures and layouts

## Project Structure
```
MW_portal/
├── api/                # Backend API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Authentication middleware
│   │   ├── models/        # Data models
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Main entry point
│   ├── package.json
│   └── tsconfig.json
│
├── web/                # Frontend application
│   ├── app/            # Next.js pages
│   │   ├── dashboard/     # Dashboard pages
│   │   └── login/         # Authentication pages  
│   ├── components/     # UI components
│   │   ├── atoms/         # Basic UI elements
│   │   ├── molecules/     # Composite components
│   │   ├── organisms/     # Complex components
│   │   └── templates/     # Page layouts
│   ├── services/       # API communication
│   │   ├── api.service.ts # API client
│   │   └── auth.service.ts # Authentication service
│   ├── public/         # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── start-dev.bat       # Development startup script
└── summary.md          # This file
```

## Resolved Issues
- Fixed port configuration conflicts between frontend and backend services
- Resolved login functionality issues by ensuring proper API communication
- Implemented proper CORS configuration to allow cross-origin requests
- Enhanced startup script to properly manage service initialization
- Updated all port references across the application to ensure consistency

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup and Installation
1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   cd api && npm install
   cd ../web && npm install
   ```

### Running the Application
Use the start-dev.bat script in the root folder to start both services:
```
./start-dev.bat
```

Or start services individually:

**For the API backend:**
```
cd api
npm run dev
```
The API will be available at http://localhost:3002

**For the Web frontend:**
```
cd web
npm run dev
```
The frontend will be available at http://localhost:3000

### Test Credentials
You can test the login functionality using:
- **Username:** testuser
- **Password:** password123

## Useful Commands
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Run the production build

## Future Development Plans
- Implement user registration functionality
- Expand dashboard features
- Connect to a persistent database
- Add user profile management
- Implement resource management features

## Technologies Used
- **Frontend:** Next.js, React, TypeScript
- **Backend:** Express.js, Node.js, TypeScript
- **Authentication:** JWT (JSON Web Tokens)
- **Development:** ESLint, npm