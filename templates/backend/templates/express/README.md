# {{projectName}}

TypeScript Express.js backend application.

## Prerequisites

- Node.js (v14 or higher)
- TypeScript

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a .env file:
   ```bash
   cp .env.example .env
   ```

3. Run the application:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm start
     ```

## Available Scripts

- `npm run dev`: Start the server in development mode with hot reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the server in production mode
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Project Structure

```
src/
  ├── controllers/ # Route controllers
  ├── routes/      # Route definitions
  ├── app.ts       # Express app setup
  └── server.ts    # Server entry point
``` 