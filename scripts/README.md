# Project Generation Scripts

This directory contains the core scripts responsible for generating different types of projects.

## Directory Structure

```
scripts/
├── web/              # Web project templates and configurations
├── backend/          # Backend project templates and configurations
├── mobile/           # Mobile project templates and configurations
├── database/         # Database project templates and configurations
├── createWebProject.js
├── createBackendProject.js
├── createMobileProject.js
└── createDatabaseProject.js
```

## Scripts Overview

### Web Projects
- `createWebProject.js`: Generates web application projects
- Supports various frameworks and technologies
- Includes frontend boilerplate and configuration

### Backend Projects
- `createBackendProject.js`: Creates backend service projects
- Supports multiple server frameworks
- Includes API structure and basic setup

### Mobile Projects
- `createMobileProject.js`: Scaffolds mobile application projects
- Supports cross-platform development
- Includes mobile-specific configurations

### Database Projects
- `createDatabaseProject.js`: Sets up database-related projects
- Supports various database types
- Includes connection and migration setup

## Usage

These scripts are automatically called by the main CLI tool (`cli.js`) based on user selection. They handle:
- Project structure creation
- Template file copying
- Configuration file generation
- Dependency setup
- Initial project setup

## Adding New Templates

To add a new project template:
1. Create a new directory in the appropriate category folder
2. Add your template files
3. Update the corresponding creation script
4. Test the template generation

## Development Guidelines

- Keep templates up to date with latest best practices
- Document any special configuration requirements
- Include clear setup instructions in generated projects
- Maintain consistent structure across templates

## Contributing

Please read the main project's [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../LICENSE.md) for details. 

---

<div align="center">
  <sub>Part of the <a href="../README.md">Project CLI</a> ecosystem</sub>
</div> 