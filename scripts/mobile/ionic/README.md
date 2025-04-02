# Ionic Project Generator

This script helps you create a new Ionic project with a well-organized folder structure and essential configurations.

## Overview

The Ionic project generator creates a new cross-platform mobile application with:
- A clean and scalable folder structure
- Essential dependencies pre-configured
- Basic navigation setup
- Common utilities and helpers
- TypeScript support
- ESLint and Prettier configuration
- Capacitor integration for native platforms

## Usage

The script is automatically called when you use the main CLI with the following command:

```bash
cli create mobile --technology ionic --name YourProjectName
```

## Project Structure

The generated project follows a modern Ionic architecture with the following structure:

```
src/
├── app/                    # Application source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # Business logic and data operations
│   ├── guards/           # Route guards
│   ├── interfaces/       # TypeScript interfaces
│   ├── models/           # Data models
│   ├── utils/            # Utility functions
│   ├── constants/        # Application constants
│   ├── pipes/            # Angular pipes
│   ├── directives/       # Custom directives
│   ├── resolvers/        # Route resolvers
│   ├── store/            # State management
│   ├── animations/       # Animation definitions
│   ├── validators/       # Form validators
│   ├── interceptors/     # HTTP interceptors
│   ├── error-handlers/   # Error handling
│   └── translations/     # i18n files
├── assets/               # Static assets
├── theme/                # Theme customization
└── environments/         # Environment configurations
```

## Features

- **Ionic Framework**: Modern UI components and native functionality
- **Angular**: Robust application architecture
- **TypeScript**: Full TypeScript configuration for better type safety
- **Capacitor**: Native platform integration
- **Cross-Platform**: Support for iOS, Android, and Web platforms
- **Development Tools**: Hot reloading and development server
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## Dependencies

The project is created using the Ionic CLI with Angular and Capacitor. Key dependencies include:

### Core Dependencies
- `@ionic/angular` - Ionic Framework for Angular
- `@angular/core` - Angular core
- `@capacitor/core` - Capacitor core
- `@capacitor/cli` - Capacitor CLI
- `@capacitor/ios` - iOS platform support
- `@capacitor/android` - Android platform support

### UI and Animation
- `@ionic/core` - Ionic core components
- `@angular/animations` - Angular animations
- `@angular/forms` - Angular forms
- `@angular/router` - Angular routing

### System and Platform
- `@capacitor/app` - App API
- `@capacitor/haptics` - Haptic feedback
- `@capacitor/keyboard` - Keyboard API
- `@capacitor/status-bar` - Status bar API
- `@capacitor/storage` - Storage API

### Utilities
- `rxjs` - Reactive programming library
- `zone.js` - Angular's execution context
- `tslib` - TypeScript runtime library

## Development

To modify the project structure or add new features:

1. Edit `ionicFolderStructure.json` to modify the folder structure
2. Update `createIonicProject.js` to add new configurations or dependencies
3. Test the changes by creating a new project

## Running the Project

After creating the project, you can run it using the following commands:

```bash
# Start the development server
ionic serve

# Build for production
ionic build

# Add Android platform
ionic capacitor add android

# Add iOS platform
ionic capacitor add ios

# Copy web assets to native platforms
ionic capacitor copy

# Open native projects
ionic capacitor open android
ionic capacitor open ios
```

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../../LICENSE.md) for details. 