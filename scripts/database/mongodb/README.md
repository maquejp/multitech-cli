# MongoDB Database Template

This directory contains the template and scripts for creating MongoDB database projects using MultiTech CLI.

## Overview

The MongoDB template provides a production-ready MongoDB database setup with:
- Docker containerization
- Persistent data storage
- Migration system
- Seed data support
- Health checks
- Security best practices
- Network configuration

## Directory Structure

```
mongodb/
├── templates/                    # Template files
│   ├── docker-compose.yml       # Docker Compose configuration
│   └── readmeContent.json       # README template content
├── createMongoDBProject.js      # Project creation script
└── README.md                    # This file
```

## Template Features

### Docker Configuration
- Uses official MongoDB Community Server image
- Configurable through environment variables
- Persistent volume for data storage
- Health checks for container monitoring
- Network integration with other services

### Project Structure
When a new project is created, it includes:
- `data/` - Persistent database storage
- `migrations/` - Database migration files
- `seeds/` - Seed data files
- `config/` - Configuration files
- `scripts/` - Utility scripts
- `docker-compose.yml` - Container configuration
- `.env` - Environment variables
- `README.md` - Project documentation

### Security Features
- Configurable user credentials
- Environment variable management
- Secure defaults
- Health monitoring
- Network isolation

## Usage

The template is used by the main CLI tool when creating a new MongoDB database project:

```bash
node cli.js database mongodb my-database
```

This will:
1. Create a new project directory
2. Set up the Docker configuration
3. Initialize the project structure
4. Create necessary configuration files
5. Generate project documentation

## Configuration

The template supports the following environment variables:
- `MONGODB_INITDB_ROOT_USERNAME` - Root administrator username
- `MONGODB_INITDB_ROOT_PASSWORD` - Root administrator password
- `MONGODB_DATABASE` - Database name
- `MONGODB_PORT` - Database port

## Development

### Adding New Features
1. Update the template files in `templates/`
2. Modify the project creation script if needed
3. Update the README template if documentation changes are required
4. Test the changes with a new project creation

### Testing
To test the template:
1. Create a new project using the CLI
2. Verify the directory structure
3. Check the configuration files
4. Test the database connection
5. Verify health checks

## Best Practices

When using this template:
- Always change default credentials
- Keep `.env` files secure
- Regular database backups
- Monitor container health
- Follow MongoDB best practices for indexing and querying
- Maintain proper documentation

## Contributing

To contribute to this template:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This template is part of the MultiTech CLI project and follows its licensing terms. 