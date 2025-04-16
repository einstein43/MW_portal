# API Folder - Express.js with TypeScript

This directory contains an Express.js API built with TypeScript.

## Setup Summary

The API was configured with the following components and features:

- **Express.js**: Web framework for Node.js
- **TypeScript**: Static type-checking and modern JavaScript features
- **Configuration**: TypeScript compiler options optimized for Node.js backend

## Project Structure

```
api/
├── dist/           # Compiled JavaScript output
├── node_modules/   # Dependencies
├── src/            # TypeScript source files
│   └── index.ts    # Main application entry point
├── package.json    # Project configuration and dependencies
├── tsconfig.json   # TypeScript configuration
└── README.md       # This file
```

## Available Scripts

- `npm start`: Run the compiled JavaScript application
- `npm run dev`: Run the TypeScript application with ts-node (development)
- `npm run build`: Compile TypeScript to JavaScript
- `npm run watch`: Watch for changes and recompile automatically

## Dependencies

- express: ^5.1.0
- typescript: ^5.8.3
- @types/express: ^5.0.1
- @types/node: ^22.14.1
- ts-node: ^10.9.2

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Access the API at:
   ```
   http://localhost:3000
   ```

## Production Deployment

For production deployment:

1. Build the application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

## Date Implemented: April 16, 2025