# Flutter Project Generator

This script helps you create a new Flutter project with a clean architecture folder structure and essential configurations.

## Overview

The Flutter project generator creates a new Flutter application with:
- A feature-based architecture for better organization and maintainability
- Essential dependencies pre-configured
- Basic app setup with Material Design
- Common utilities and helpers
- Testing setup

## Usage

The script is automatically called when you use the main CLI with the following command:

```bash
cli create mobile --technology flutter --name YourProjectName
```

## Project Structure

The generated project follows a feature-based architecture with the following structure:

```
├── lib/                    # Main application code
│   ├── core/              # Core functionality and utilities
│   │   ├── errors/        # Error handling and failures
│   │   └── usecases/      # Base usecase definitions
│   ├── data/              # Data layer
│   │   ├── models/        # Data models
│   │   ├── repositories/  # Repository implementations
│   │   └── sources/       # Data sources (remote, local)
│   ├── domain/            # Domain layer
│   │   ├── entities/      # Business entities
│   │   ├── repositories/  # Repository interfaces
│   │   └── usecases/      # Business logic usecases
│   └── presentation/      # Presentation layer
│       └── bloc/          # BLoC state management
├── test/                  # Test files mirroring the lib structure
└── assets/               # Static assets (images, icons, fonts)
    ├── images/          # Image assets
    ├── icons/           # Icon assets
    └── fonts/           # Font files
```

### Directory Details

- **lib/**: The main directory containing all Dart code for the application.
  - **core/**: Contains core functionality, error handling, and base classes.
  - **data/**: Implements the data layer with models, repositories, and data sources.
  - **domain/**: Contains business logic, entities, and repository interfaces.
  - **presentation/**: Contains UI components and state management.
- **test/**: Contains test files for the application.
- **assets/**: Contains static assets organized by type.

## Features

- **Feature-Based Architecture**: Clear separation of concerns with data, domain, and presentation layers
- **BLoC Pattern**: State management using the BLoC (Business Logic Component) pattern
- **Clean Code**: Well-organized codebase with clear dependencies
- **Error Handling**: Centralized error handling with custom failures
- **Cross-Platform**: Support for iOS and Android platforms
- **Development Tools**: Hot reload and debugging support

## Dependencies

The project includes essential Flutter dependencies:

### Core Dependencies
- `flutter_bloc`: ^8.1.3 - BLoC pattern implementation
- `equatable`: ^2.0.5 - Value equality
- `get_it`: ^7.6.0 - Service locator
- `dio`: ^5.3.2 - HTTP client
- `dartz`: ^0.10.1 - Functional programming
- `shared_preferences`: ^2.2.0 - Local storage

### Development Dependencies
- `mockito`: ^5.4.2 - Mocking for tests

## Development

To modify the project structure or add new features:

1. Edit `flutterFolderStructure.json` to modify the folder structure
2. Update `createFlutterProject.js` to add new configurations or dependencies
3. Test the changes by creating a new project

## Running the Project

After creating the project, you can run it using the following commands:

```bash
# Get dependencies
flutter pub get

# Run the app (make sure you have an emulator running or device connected)
flutter run

# Run tests
flutter test

# Build for release
flutter build apk  # For Android
flutter build ios  # For iOS
```

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../../LICENSE.md) for details. 