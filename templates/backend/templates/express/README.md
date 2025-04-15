# {{projectName}}

Simple Express.js backend application.

## Prerequisites

- Node.js (v14 or higher)

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
     npm start
     ```

## Project Structure

```
src/
  ├── controllers/ # Route controllers
  ├── routes/      # Route definitions
  ├── app.js       # Express app setup
  └── server.js    # Server entry point
``` 