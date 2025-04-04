# Project CLI

A powerful command-line interface tool for generating various types of projects with different technologies and frameworks.

## Overview

This CLI tool helps developers quickly scaffold new projects across different categories:
- [Web Applications](scripts/web/README.md) (React, Vue, Svelte, Astro)
- [Backend Services](scripts/backend/README.md) (Node.js, Python, Go)
- [Mobile Applications](scripts/mobile/README.md) (Flutter, React Native, Ionic)
- [Database Projects](scripts/database/README.md) (MongoDB, PostgreSQL, MySQL)

## Installation

```bash
npm install -g @maquestiaux/project-cli
```

## Usage

```bash
cli create <category> --technology <tech> --name <project-name>
```

Example:
```bash
cli create mobile --technology flutter --name my-awesome-app
```

Categories:
- `web` - [Web applications](scripts/web/README.md)
- `backend` - [Backend services](scripts/backend/README.md)
- `mobile` - [Mobile applications](scripts/mobile/README.md)
- `database` - [Database projects](scripts/database/README.md)

## Features

- **Project Templates**: Pre-configured templates for various technologies
  - [Web Templates](scripts/web/README.md)
  - [Backend Templates](scripts/backend/README.md)
  - [Mobile Templates](scripts/mobile/README.md)
  - [Database Templates](scripts/database/README.md)
- **Best Practices**: Each template follows industry best practices
- **Customization**: Flexible project configuration
- **Documentation**: Comprehensive documentation for each template
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Development Tools**: Includes essential development tools and configurations

## Project Structure

```
project-cli/
├── cli.js              # Main CLI entry point
├── scripts/            # Project generation scripts
│   ├── web/            # [Web project templates](scripts/web/README.md)
│   │   ├── react/      # [React project template](scripts/web/react/README.md)
│   │   ├── vue/        # [Vue project template](scripts/web/vue/README.md)
│   │   ├── svelte/     # [Svelte project template](scripts/web/svelte/README.md)
│   │   └── astro/      # [Astro project template](scripts/web/astro/README.md)
│   ├── backend/        # [Backend project templates](scripts/backend/README.md)
│   │   ├── node/       # [Express.js project template](scripts/backend/express/README.md)
│   │   ├── python/     # Python project template
│   │   └── go/         # Go project template
│   ├── mobile/         # [Mobile project templates](scripts/mobile/README.md)
│   │   ├── flutter/    # [Flutter project template](scripts/mobile/flutter/README.md)
│   │   ├── reactnative/# React Native project template
│   │   └── ionic/      # [Ionic project template](scripts/mobile/ionic/README.md)
│   └── database/       # [Database project templates](scripts/database/README.md)
│       ├── mongodb/    # [MongoDB project template](scripts/database/mongodb/README.md)
│       ├── postgresql/ # [PostgreSQL project template](scripts/database/postgresql/README.md)
│       └── mysql/      # [MariaDB project template](scripts/database/mariadb/README.md)
└── package.json        # Project dependencies and metadata
```

## Development

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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) for details.

## Author

Jean-Philippe Maquestiaux
- Email: maquestiaux.jp@gmail.com
- GitHub: [maquejp](https://github.com/maquejp/multitech-cli) 