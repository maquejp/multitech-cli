# 🔧 Backend Project Templates

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../../CONTRIBUTING.md)

This directory contains templates for various backend application frameworks and technologies. See the [main project documentation](../../README.md) for general information about the CLI tool.

<div align="center">
  <h3>Robust Backend Development</h3>
  <p>Build scalable and maintainable backend services with your preferred technology stack</p>
</div>

## 📚 Available Templates

| Template | Description | Documentation |
|----------|-------------|---------------|
| ⚡ [Node.js](nodejs/README.md) | Express.js application with TypeScript | [View](nodejs/README.md) |
| 🐍 [Python](python/README.md) | FastAPI application with async support | [View](python/README.md) |
| 🦀 [Go](go/README.md) | Go application with Gin framework | [View](go/README.md) |

## 📁 Template Structure

Each template follows a consistent structure:

```
template-name/
├── src/              # Source code
├── tests/            # Test files
├── config/           # Configuration files
├── docs/             # Documentation
└── README.md         # Template-specific documentation
```

## ✨ Features

All templates include:
- 🚀 Modern framework setup
- 📝 TypeScript/Python/Go configuration
- 🧪 Testing framework
- 🔍 Code formatting and linting
- 📦 Build and deployment scripts
- 📚 API documentation
- 🔐 Authentication setup
- 🗄️ Database integration

## 💻 Usage

These templates are used by the `createBackendProject.js` script to generate new backend projects. The script will:
1. Copy the selected template
2. Install dependencies
3. Configure the project
4. Set up initial development environment

## 🔧 Customization

To customize a template:
1. Navigate to the specific template directory
2. Modify the template files
3. Update the corresponding configuration in `createBackendProject.js`
4. Test the template generation

## ✅ Best Practices

- Follow RESTful API design principles
- Implement proper error handling
- Use appropriate authentication methods
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