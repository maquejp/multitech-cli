# Oracle Database Template

This directory contains the template and scripts for creating Oracle database projects using MultiTech CLI.

## Overview

The Oracle template provides a production-ready Oracle database setup with:
- Docker containerization
- Persistent data storage
- Migration system
- Seed data support
- Health checks
- Security best practices
- Network configuration

## Directory Structure

```
oracle/
├── templates/                    # Template files
│   ├── docker-compose.yml       # Docker Compose configuration
│   └── readmeContent.json       # README template content
├── createOracleProject.js       # Project creation script
└── README.md                    # This file
```

## Template Features

### Docker Configuration
- Uses official Oracle Database 19c Enterprise Edition image
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
- Configurable SYS user credentials
- Environment variable management
- Secure defaults
- Health monitoring
- Network isolation
- Pluggable Database (PDB) support

## Usage

The template is used by the main CLI tool when creating a new Oracle database project:

```bash
node cli.js database oracle my-database
```

This will:
1. Create a new project directory
2. Set up the Docker configuration
3. Initialize the project structure
4. Create necessary configuration files
5. Generate project documentation

## Configuration

The template supports the following environment variables:
- `ORACLE_SID` - System Identifier (SID)
- `ORACLE_PDB` - Pluggable Database name
- `ORACLE_PWD` - SYS user password
- `ORACLE_CHARACTERSET` - Database character set (default: AL32UTF8)
- `ORACLE_PORT` - Database port (default: 1521)

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
4. Test the database connection using SQL*Plus
5. Verify health checks

## Best Practices

When using this template:
- Always change default credentials
- Keep `.env` files secure
- Regular database backups
- Monitor container health
- Follow migration best practices
- Maintain proper documentation
- Consider Oracle-specific requirements (memory, disk space)
- Use appropriate character sets for your data

## Important Notes

- Oracle Database containers require significant system resources
- Initial container startup may take several minutes
- Ensure sufficient disk space for the database
- The template uses Oracle Database 19c Enterprise Edition
- SQL*Plus is available for command-line access
- Pluggable Database (PDB) is enabled by default

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details. 