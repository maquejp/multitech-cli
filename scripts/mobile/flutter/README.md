# Flutter Project Generator

This script helps you create a new Flutter project with a clean architecture folder structure and essential configurations.

## Overview

The Flutter project generator creates a new Flutter application with:
- A clean architecture folder structure following best practices
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

The generated project follows a clean architecture approach with the following structure:

```
├── lib/              # Main application code
│   ├── core/        # Core functionality and utilities
│   ├── features/    # Feature-specific code organized by domain
│   └── shared/      # Shared widgets, utilities, and services
├── test/            # Test files mirroring the lib structure
└── assets/          # Static assets like images and fonts
```

### Directory Details

- **lib/**: The main directory containing all Dart code for the application.
- **lib/core/**: Contains core functionality and utilities used throughout the app, such as constants, errors, and network information.
- **lib/features/**: Contains feature-specific code organized by domain. Each feature is self-contained with its own models, repositories, and UI components.
- **lib/shared/**: Contains shared widgets, utilities, and services that are used across multiple features.
- **test/**: Contains test files for the application. Tests are organized to mirror the structure of the lib directory.
- **assets/**: Contains static assets like images, fonts, and other resources used in the application.

## Features

- **Clean Architecture**: Separation of concerns with clear boundaries between layers
- **Feature-First Organization**: Code organized by feature rather than technical function
- **Cross-Platform**: Support for iOS, Android, Web, and Desktop platforms
- **Development Tools**: Hot reload and development server
- **Code Quality**: Linting and formatting configuration for consistent code style

## Dependencies

The project includes essential Flutter dependencies for a robust application:

### Core Dependencies
- `flutter` - The Flutter framework
- `dart` - The Dart programming language

### State Management
- `provider` - Simple state management solution
- `flutter_bloc` - BLoC pattern implementation for state management

### Navigation
- `go_router` - Declarative routing solution

### UI and Animation
- `flutter_svg` - SVG rendering
- `cached_network_image` - Image caching
- `shimmer` - Loading effects

### Network and Data
- `dio` - HTTP client
- `json_serializable` - JSON serialization
- `shared_preferences` - Local storage

### Utilities
- `intl` - Internationalization and localization
- `logger` - Logging utility
- `flutter_dotenv` - Environment variable management

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
flutter build web  # For Web
```

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../../LICENSE.md) for details. 