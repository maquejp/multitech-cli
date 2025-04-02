# API Platform Template

This directory contains the template for creating API Platform projects using Docker.

## Overview

API Platform is a powerful framework for building web APIs and web applications. This template provides a Docker-based setup that includes all necessary components for a production-ready API Platform application.

## Features

### Core Components
- PHP 8.2 with FPM
- Nginx web server
- Symfony LTS version
- API Platform bundle
- Doctrine ORM
- JWT authentication
- GraphQL support
- REST API support

### Development Tools
- Docker and Docker Compose setup
- Development environment configuration
- Hot-reload support
- Debug tools
- Testing environment

### Security Features
- JWT authentication
- CORS configuration
- Rate limiting
- Input validation
- Security headers
- Error handling

### API Features
- RESTful API endpoints
- GraphQL playground
- API documentation
- Swagger/OpenAPI integration
- Admin interface

## Project Structure

```
apiplatform/
├── api/              # API Platform application
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile        # Docker configuration
├── default.conf      # Nginx configuration
├── supervisord.conf  # Process management
├── setup.sh         # Setup script
└── .env             # Environment variables
```

## Configuration Files

### Docker Compose
- Sets up PHP-FPM and Nginx services
- Configures networking
- Manages volumes and ports
- Handles environment variables

### Dockerfile
- PHP 8.2 with FPM
- Required PHP extensions
- Composer installation
- Symfony CLI installation
- Nginx configuration

### Nginx Configuration
- PHP-FPM integration
- Static file serving
- Security headers
- Error handling

### Supervisor
- Process management
- Service monitoring
- Automatic restarts

## Usage

1. Create a new project:
   ```bash
   node scripts/createBackendProject.js apiplatform my-project
   ```

2. Navigate to the project:
   ```bash
   cd my-project
   ```

3. Start the containers:
   ```bash
   docker compose up --build
   ```

4. Access the API:
   - API: http://localhost:8086
   - Documentation: http://localhost:8086/api
   - GraphQL Playground: http://localhost:8086/graphql
   - Admin Interface: http://localhost:8086/admin

## Development

### Adding New Endpoints
1. Create a new entity:
   ```bash
   symfony console make:entity
   ```

2. Create an API endpoint:
   ```bash
   symfony console make:api-resource
   ```

3. Configure the endpoint in `config/api_platform/resources.yaml`

### Database Management
1. Create migrations:
   ```bash
   symfony console make:migration
   ```

2. Apply migrations:
   ```bash
   symfony console doctrine:migrations:migrate
   ```

### Testing
1. Run tests:
   ```bash
   symfony console phpunit
   ```

2. Create new tests:
   ```bash
   symfony console make:test
   ```

## Best Practices

### API Design
- Follow RESTful principles
- Use proper HTTP methods
- Implement proper status codes
- Version your API
- Document all endpoints

### Security
- Validate all inputs
- Sanitize outputs
- Use proper authentication
- Implement rate limiting
- Regular security audits

### Performance
- Use caching
- Optimize database queries
- Implement pagination
- Monitor response times
- Regular performance testing

### Code Quality
- Follow PSR standards
- Write unit tests
- Use type hints
- Document code
- Regular code reviews

## Troubleshooting

### Common Issues
1. Container won't start
   - Check Docker logs
   - Verify port availability
   - Check environment variables

2. Database connection issues
   - Verify database credentials
   - Check network connectivity
   - Ensure database is running

3. Permission issues
   - Check file permissions
   - Verify user permissions
   - Check volume mounts

### Logs
- Container logs: `docker compose logs`
- PHP logs: `/var/log/php-fpm.log`
- Nginx logs: `/var/log/nginx/error.log`

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details. 