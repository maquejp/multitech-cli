# MariaDB Database Template

This directory contains the template and scripts for creating MariaDB database projects using MultiTech CLI.

## Overview

The MariaDB template provides a production-ready MariaDB database setup with:
- Docker containerization
- Persistent data storage
- Migration system
- Seed data support
- Health checks
- Security best practices
- Network configuration

## Directory Structure

```
mariadb/
├── templates/                    # Template files
│   ├── docker-compose.yml       # Docker Compose configuration
│   └── readmeContent.json       # README template content
├── createMariaDBProject.js      # Project creation script
└── README.md                    # This file
```

## Template Features

### Docker Configuration
- Uses official MariaDB image
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
- Configurable root and user credentials
- Environment variable management
- Secure defaults
- Health monitoring
- Network isolation
- User privilege management

## Usage

The template is used by the main CLI tool when creating a new MariaDB database project:

```bash
node cli.js database mariadb my-database
```

This will:
1. Create a new project directory
2. Set up the Docker configuration
3. Initialize the project structure
4. Create necessary configuration files
5. Generate project documentation

## Configuration

The template supports the following environment variables:
- `MARIADB_ROOT_PASSWORD` - Root user password
- `MARIADB_USER` - Database user
- `MARIADB_PASSWORD` - Database user password
- `MARIADB_DATABASE` - Database name
- `MARIADB_PORT` - Database port (default: 3306)

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
- Use appropriate character sets for your data
- Implement proper user privileges

## Important Notes

- MariaDB is a drop-in replacement for MySQL
- Supports all major MySQL features
- Compatible with MySQL clients and tools
- Built-in performance optimizations
- Regular security updates
- Active community support

## Contributing

To contribute to this template:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This template is part of the MultiTech CLI project and follows its licensing terms. 