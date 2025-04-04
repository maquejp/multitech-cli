# 🚀 Project CLI

[![npm version](https://badge.fury.io/js/@maquestiaux-devs%2Fmultitech-cli.svg)](https://badge.fury.io/js/@maquestiaux-devs%2Fmultitech-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/maquejp/multitech-cli/graphs/commit-activity)
[![GitHub stars](https://img.shields.io/github/stars/maquejp/multitech-cli.svg?style=social)](https://github.com/maquejp/multitech-cli/stargazers)

> A powerful command-line interface tool for generating various types of projects with different technologies and frameworks.

<div align="center">
  <img src="https://raw.githubusercontent.com/maquejp/multitech-cli/main/assets/cli-logo.png" alt="Project CLI Logo" width="200"/>
  
  <p>
    <b>Project CLI</b> - Your all-in-one solution for project scaffolding
  </p>
</div>

## 📋 Overview

This CLI tool helps developers quickly scaffold new projects across different categories:

| Category | Technologies | Documentation |
|----------|--------------|---------------|
| 🌐 [Web Applications](scripts/web/README.md) | React, Vue, Svelte, Astro | [View](scripts/web/README.md) |
| 🔧 [Backend Services](scripts/backend/README.md) | Node.js, Python, Go | [View](scripts/backend/README.md) |
| 📱 [Mobile Applications](scripts/mobile/README.md) | Flutter, React Native, Ionic | [View](scripts/mobile/README.md) |
| 💾 [Database Projects](scripts/database/README.md) | MongoDB, PostgreSQL, MySQL | [View](scripts/database/README.md) |

## 🚀 Installation

```bash
npm install -g @maquestiaux-devs/multitech-cli
```

## 💻 Usage

```bash
cli create <category> --technology <tech> --name <project-name>
```

### 📝 Example:
```bash
cli create mobile --technology flutter --name my-awesome-app
```

### 📚 Categories:
- `web` - [Web applications](scripts/web/README.md)
- `backend` - [Backend services](scripts/backend/README.md)
- `mobile` - [Mobile applications](scripts/mobile/README.md)
- `database` - [Database projects](scripts/database/README.md)

## ✨ Features

- **📦 Project Templates**: Pre-configured templates for various technologies
  - [Web Templates](scripts/web/README.md)
  - [Backend Templates](scripts/backend/README.md)
  - [Mobile Templates](scripts/mobile/README.md)
  - [Database Templates](scripts/database/README.md)
- **✅ Best Practices**: Each template follows industry best practices
- **🔧 Customization**: Flexible project configuration
- **📚 Documentation**: Comprehensive documentation for each template
- **🔄 Cross-Platform**: Works on Windows, macOS, and Linux
- **🛠️ Development Tools**: Includes essential development tools and configurations

## 📁 Project Structure

The project follows this directory structure:

```
multitech-cli/
├── cli.js              # Main CLI entry point
├── scripts/            # Project generation scripts
│   ├── web/            # Web project templates
│   │   ├── react/      # React project template
│   │   ├── vue/        # Vue project template
│   │   ├── svelte/     # Svelte project template
│   │   └── astro/      # Astro project template
│   ├── backend/        # Backend project templates
│   │   ├── node/       # Node.js project template
│   │   ├── python/     # Python project template
│   │   └── go/         # Go project template
│   ├── mobile/         # Mobile project templates
│   │   ├── flutter/    # Flutter project template
│   │   ├── reactnative/# React Native project template
│   │   └── ionic/      # Ionic project template
│   └── database/       # Database project templates
│       ├── mongodb/    # MongoDB project template
│       ├── postgresql/ # PostgreSQL project template
│       └── mysql/      # MariaDB project template
└── package.json        # Project dependencies and metadata
```

### 📚 Documentation Structure

Each component has its own documentation:

- **🌐 Web Templates**:
  - [Overview](scripts/web/README.md)
    - [React](scripts/web/react/README.md)
    - [Vue](scripts/web/vue/README.md)
    - [Svelte](scripts/web/svelte/README.md)
    - [Astro](scripts/web/astro/README.md)

- **🔧 Backend Templates**:
  - [Overview](scripts/backend/README.md)
    - [Express.js](scripts/backend/express/README.md)
    - [Spring Boot](scripts/backend/springboot/README.md)
    - [API Platform](scripts/backend/apiplatform/README.md)

- **📱 Mobile Templates**:
  - [Overview](scripts/mobile/README.md)
    - [Flutter](scripts/mobile/flutter/README.md)
    - [React Native](scripts/mobile/reactnative/README.md)
    - [Ionic](scripts/mobile/ionic/README.md)

- **💾 Database Templates**:
  - [Overview](scripts/database/README.md)
    - [MongoDB](scripts/database/mongodb/README.md)
    - [PostgreSQL](scripts/database/postgresql/README.md)
    - [MariaDB](scripts/database/mariadb/README.md)
    - [Oracle](scripts/database/oracle/README.md)

## 👩‍💻 Development

To contribute to this project:

1. Clone the repository:
   ```bash
   git clone https://github.com/maquejp/multitech-cli.git
   cd multitech-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and test them:
   ```bash
   npm test
   ```

5. Submit a pull request

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) for details.

## 👤 Author

**Jean-Philippe Maquestiaux**
- 📧 Email: maquejp@gmail.com
- 🌐 GitHub: [maquejp](https://github.com/maquejp/multitech-cli)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/maquejp">Jean-Philippe Maquestiaux</a></sub>
</div> 