# Mobile Project Templates

This directory contains templates for various mobile application frameworks and technologies. See the [main project documentation](../../README.md) for general information about the CLI tool.

## Available Templates

### [Flutter](flutter/README.md)
- Cross-platform mobile application
- Feature-based architecture
- BLoC pattern for state management
- Clean code organization
- Error handling with custom failures
- Testing with mockito
- Dependency injection with get_it
- HTTP client with dio
- Local storage with shared_preferences

### [React Native](reactnative/README.md)
- Cross-platform mobile application
- TypeScript support
- Navigation setup
- State management configuration
- Native module integration
- Testing environment

### [Ionic](ionic/README.md)
- Hybrid mobile application
- Angular/React/Vue support
- Capacitor integration
- Native plugin setup
- UI component library
- Platform-specific features

## Template Structure

Each template follows a consistent structure:
```
template-name/
├── templates/        # Template files for code generation
├── README.md         # Template-specific documentation
└── createProject.js  # Project generation script
```

## Features

All templates include:
- Cross-platform support
- State management setup
- Project structure setup
- Testing configuration
- Development tools
- Build configuration

## Usage

These templates are used by the CLI to generate new mobile projects. The process:
1. Select a mobile technology (Flutter, React Native, or Ionic)
2. Provide a project name
3. The appropriate script will:
   - Create a new project
   - Set up the project structure
   - Add necessary dependencies
   - Configure the development environment

## Platform Support

Each template supports:
- iOS development
- Android development
- Platform-specific features
- Native module integration
- Development tools integration

## Best Practices

Each template follows these best practices:
- Clear project structure
- Proper code organization
- State management patterns
- Error handling
- Testing setup
- Documentation
- Development workflow

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details. 