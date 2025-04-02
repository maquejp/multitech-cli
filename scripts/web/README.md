# Web Project Templates

This directory contains templates for various web application frameworks and technologies.

## Available Templates

### React
- Modern React application setup
- Includes TypeScript support
- Configured with Vite for fast development
- Includes common development tools and configurations

### Vue
- Vue.js application template
- Supports Vue 3 with Composition API
- Includes TypeScript configuration
- Pre-configured with Vue Router and Pinia

### Angular
- Full-featured Angular application
- Includes Angular Material
- Configured with NgRx for state management
- Includes testing setup with Jasmine and Karma

### Svelte
- Svelte application template
- Includes SvelteKit for full-stack development
- Configured with TypeScript
- Includes common Svelte utilities and components

### Astro
- Astro-based static site generator
- Supports multiple UI frameworks
- Includes content collections setup
- Configured for optimal performance

## Template Structure

Each template follows a consistent structure:
```
template-name/
├── src/              # Source code
├── public/           # Static assets
├── tests/            # Test files
├── config/           # Configuration files
└── README.md         # Template-specific documentation
```

## Features

All templates include:
- Modern development setup
- TypeScript configuration
- Testing framework
- Code formatting and linting
- Build and deployment scripts
- Documentation

## Usage

These templates are used by the `createWebProject.js` script to generate new web projects. The script will:
1. Copy the selected template
2. Install dependencies
3. Configure the project
4. Set up initial development environment

## Customization

To customize a template:
1. Navigate to the specific template directory
2. Modify the template files
3. Update the corresponding configuration in `createWebProject.js`
4. Test the template generation

## Best Practices

- Keep templates lightweight and focused
- Include clear documentation
- Maintain consistent structure across templates
- Regular updates for security and performance
- Follow framework-specific best practices

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details. 