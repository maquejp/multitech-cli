/**
 * Express project template
 * This is a dummy script that will be replaced with actual project generation logic
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createExpressProject(projectName) {
    const projectPath = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
        console.error(`Error: Directory ${projectName} already exists`);
        process.exit(1);
    }

    try {
        // Create project directory
        fs.mkdirSync(projectPath);
        process.chdir(projectPath);

        // Initialize npm project
        console.log('Initializing npm project...');
        execSync('npm init -y', { stdio: 'inherit' });

        // Install dependencies
        console.log('Installing dependencies...');
        execSync('npm install express cors dotenv', { stdio: 'inherit' });
        execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

        // Create project structure
        console.log('Creating project structure...');
        const directories = [
            'src',
            'src/routes',
            'src/controllers'
        ];

        directories.forEach(dir => {
            fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
        });

        // Create basic files
        const files = {
            '.env': `PORT=3000
NODE_ENV=development`,
            '.env.example': `PORT=3000
NODE_ENV=development`,
            '.gitignore': `node_modules/
.env
.DS_Store`,
            'src/app.js': `const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ${projectName} API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;`,
            'src/server.js': `const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});`,
            'package.json': `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "Express.js backend application",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`,
            'README.md': `# ${projectName}

Simple Express.js backend application.

## Prerequisites

- Node.js (v14 or higher)

## Setup Instructions

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a .env file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Run the application:
   - Development mode:
     \`\`\`bash
     npm run dev
     \`\`\`
   - Production mode:
     \`\`\`bash
     npm start
     \`\`\`

## Project Structure

\`\`\`
src/
  ├── controllers/ # Route controllers
  ├── routes/      # Route definitions
  ├── app.js       # Express app setup
  └── server.js    # Server entry point
\`\`\`
`
        };

        // Write files
        Object.entries(files).forEach(([filename, content]) => {
            fs.writeFileSync(path.join(projectPath, filename), content);
        });

        console.log('\nExpress.js project created successfully! 🚀');
        console.log('\nNext steps:');
        console.log(`1. cd ${projectName}`);
        console.log('2. npm install');
        console.log('3. cp .env.example .env');
        console.log('4. npm run dev');

    } catch (error) {
        console.error('Error creating Express.js project:', error);
        process.exit(1);
    }
}

module.exports = createExpressProject; 