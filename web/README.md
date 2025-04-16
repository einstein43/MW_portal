# MW Portal - Web Frontend

## Summary of Recent Work
(Updated April 16, 2025)

Recent development on the web frontend has focused on:
- Implementation of the login functionality with form validation
- Creation of a protected route system for authenticated access
- Development of the dashboard interface
- Integration with the backend API for authentication services
- Implementation of the atomic design component structure

This is the frontend web application for the MW Portal project, built with [Next.js](https://nextjs.org), React, and TypeScript.

## Project Overview

This web application serves as the user interface for the MW Portal system. It communicates with the backend API located in the `../api` directory to provide a seamless user experience.

### Technology Stack

- **Next.js**: React framework for production
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **ESLint**: Code linting and quality control

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the application pages and components using the App Router
- `public/`: Static files like images and icons
- `src/`: Source code for the application (components, hooks, utilities)

## Component Architecture: Atomic Design

This project follows the Atomic Design methodology for organizing and structuring the UI components, which can be found in the `/components` directory.

### What is Atomic Design?

Atomic Design is a methodology created by Brad Frost that breaks down interfaces into fundamental building blocks and combines them to create more complex UI components. This methodology helps in creating consistent, maintainable, and scalable design systems.

The component hierarchy consists of:

1. **Atoms** (`/components/atoms`): 
   - The smallest, indivisible UI elements
   - Examples: buttons, inputs, labels, icons
   - These are the foundational building blocks that can't be broken down further

2. **Molecules** (`/components/molecules`): 
   - Simple combinations of atoms that function together as a unit
   - Examples: form fields (label + input), search bars, navigation items
   - These are relatively simple components with limited functionality

3. **Organisms** (`/components/organisms`): 
   - Complex UI components composed of molecules and/or atoms
   - Examples: headers, forms, sidebars, feature sections
   - These are distinctive sections of an interface

4. **Templates** (`/components/templates`): 
   - Page-level structures focusing on the arrangement of components
   - These define content structure without specific content implementation
   - Examples: page layouts, grid systems

By organizing components this way, we achieve:
- Better reusability and consistency
- Clear component hierarchy and relationships
- Easier maintenance and implementation of design systems
- Improved collaboration between designers and developers

### Usage Guidelines

When creating new UI components, consider:
1. Where the component fits in the hierarchy
2. Potential for reuse across the application
3. How the component might be combined with others to form more complex structures

For more information on Atomic Design, refer to [Brad Frost's Atomic Design methodology](https://atomicdesign.bradfrost.com/).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
