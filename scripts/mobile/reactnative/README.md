# React Native Project Generator

This script helps you create a new React Native project with a well-organized folder structure and essential configurations.

## Overview

The React Native project generator creates a new React Native application with:
- A clean and scalable folder structure
- Essential dependencies pre-configured
- Basic navigation setup
- Common utilities and helpers
- TypeScript support
- ESLint and Prettier configuration

## Usage

The script is automatically called when you use the main CLI with the following command:

```bash
cli create mobile --technology reactnative --name YourProjectName
```

## Project Structure

The generated project follows a modern React Native architecture with the following structure:

```
├── app/              # App's navigation (file-based routing)
│   └── (tabs)/      # Tab-based navigation structure
├── assets/          # App icons and splash screen images
├── components/      # Reusable React Native components
├── constants/       # App-wide constants and configurations
├── hooks/          # Custom React Hooks
└── scripts/        # Utility scripts
```

### Directory Details

- **app/**: Contains the app's navigation using file-based routing. The structure determines the app's navigation flow.
- **assets/**: Contains app icons for both Android and iOS, splash screen images, and browser favicon.
- **components/**: Houses reusable React Native components, including themed components that support light/dark modes.
- **constants/**: Contains app-wide constants like color schemes and other configuration values.
- **hooks/**: Contains custom React Hooks for sharing common behavior between components.
- **scripts/**: Contains utility scripts like reset-project.js for project management.

## Features

- **Expo Framework**: Modern React Native development with Expo
- **TypeScript Support**: Full TypeScript configuration for better type safety
- **Navigation**: File-based routing with tab navigation support
- **Cross-Platform**: Support for iOS, Android, and Web platforms
- **Development Tools**: Hot reloading and development server
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## Dependencies

The project is created using Expo, which provides a modern development environment for React Native. Key dependencies include:

### Core Dependencies
- `expo` - The core Expo framework
- `react` - React core
- `react-native` - React Native framework
- `react-dom` - React for web
- `react-native-web` - React Native web support

### Navigation
- `expo-router` - File-based routing
- `@react-navigation/native` - Core navigation library
- `@react-navigation/bottom-tabs` - Bottom tab navigation
- `react-native-screens` - Native navigation container
- `react-native-safe-area-context` - Safe area handling

### UI and Animation
- `@expo/vector-icons` - Icon library
- `expo-blur` - Blur effects
- `expo-symbols` - Symbol icons
- `react-native-reanimated` - Advanced animations
- `react-native-gesture-handler` - Gesture handling

### System and Platform
- `expo-constants` - App constants
- `expo-linking` - Deep linking
- `expo-splash-screen` - Splash screen
- `expo-status-bar` - Status bar management
- `expo-system-ui` - System UI
- `expo-web-browser` - Web browser integration
- `react-native-webview` - Web view component

### Utilities
- `expo-font` - Custom font loading
- `expo-haptics` - Haptic feedback

## Development

To modify the project structure or add new features:

1. Edit `reactNativeFolderStructure.json` to modify the folder structure
2. Update `createReactNativeProject.js` to add new configurations or dependencies
3. Test the changes by creating a new project

## Running the Project

After creating the project, you can run it using the following commands:

```bash
# Start the development server
bun start

# Run on iOS
bun run ios

# Run on Android
bun run android

# Run on Web
bun run web
```

## Contributing

Please read the main project's [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../../LICENSE.md) for details. 