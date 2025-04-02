# PostgreSQL Database Template

This directory contains the template and scripts for creating PostgreSQL database projects using MultiTech CLI.

## Overview

The PostgreSQL template provides a production-ready PostgreSQL database setup with:
- Docker containerization
- Persistent data storage
- Migration system
- Seed data support
- Health checks
- Security best practices
- Network configuration

## Directory Structure

```
postgresql/
├── templates/                    # Template files
│   ├── docker-compose.yml       # Docker Compose configuration
│   └── readmeContent.json       # README template content
├── createPostgreSQLProject.js   # Project creation script
└── README.md                    # This file
```

## Template Features

### Docker Configuration
- Uses official PostgreSQL image
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

The template is used by the main CLI tool when creating a new PostgreSQL database project:

```bash
node cli.js database postgresql my-database
```

This will:
1. Create a new project directory
2. Set up the Docker configuration
3. Initialize the project structure
4. Create necessary configuration files
5. Generate project documentation

## Configuration

The template supports the following environment variables:
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name
- `POSTGRES_PORT` - Database port

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
- Follow migration best practices
- Maintain proper documentation

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details. 