# 📱 Mobile Project Templates

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../../CONTRIBUTING.md)

This directory contains templates for various mobile application frameworks and technologies. See the [main project documentation](../../README.md) for general information about the CLI tool.

<div align="center">
  <h3>Cross-Platform Mobile Development</h3>
  <p>Build powerful mobile applications for iOS and Android with your preferred framework</p>
</div>

## 📚 Available Templates

| Template | Description | Documentation |
|----------|-------------|---------------|
| 🎯 [Flutter](flutter/README.md) | Flutter application with clean architecture and BLoC pattern | [View](flutter/README.md) |
| ⚛️ [React Native](react-native/README.md) | React Native app with TypeScript and modern tooling | [View](react-native/README.md) |
| 🔷 [Ionic](ionic/README.md) | Ionic application with Angular/React/Vue support | [View](ionic/README.md) |

## 📁 Template Structure

Each template follows a consistent structure:

```
template-name/
├── src/              # Source code
├── assets/           # Static assets
├── tests/            # Test files
├── config/           # Configuration files
└── README.md         # Template-specific documentation
```

## ✨ Features

All templates include:
- 📱 Cross-platform support (iOS & Android)
- 🎨 Native UI components
- 🔄 State management setup
- 📱 Platform-specific configurations
- 🧪 Testing framework
- 📦 Build and deployment scripts
- 📚 Documentation

## 💻 Usage

These templates are used by the `createMobileProject.js` script to generate new mobile projects. The script will:
1. Copy the selected template
2. Install dependencies
3. Configure the project
4. Set up initial development environment

## 🔧 Customization

To customize a template:
1. Navigate to the specific template directory
2. Modify the template files
3. Update the corresponding configuration in `createMobileProject.js`
4. Test the template generation

## ✅ Best Practices

- Follow platform-specific design guidelines
- Implement proper error handling
- Use appropriate state management
- Optimize performance
- Include comprehensive testing
- Follow framework-specific best practices

## 🤝 Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details.

---

<div align="center">
  <sub>Part of the <a href="../../README.md">Project CLI</a> ecosystem</sub>
</div> 