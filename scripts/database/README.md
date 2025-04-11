# 🗄️ Database Project Templates

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../../CONTRIBUTING.md)

This directory contains templates for various database technologies and configurations. See the [main project documentation](../../README.md) for general information about the CLI tool.

<div align="center">
  <h3>Database Management Made Simple</h3>
  <p>Set up and manage your databases with best practices and modern tools</p>
</div>

## 📚 Available Templates

| Template | Description | Documentation |
|----------|-------------|---------------|
| 🍃 [MongoDB](mongodb/README.md) | MongoDB setup with Mongoose ODM | [View](mongodb/README.md) |
| 🐘 [PostgreSQL](postgresql/README.md) | PostgreSQL with TypeORM integration | [View](postgresql/README.md) |
| 🐬 [MySQL](mysql/README.md) | MySQL with Sequelize ORM | [View](mysql/README.md) |

## 📁 Template Structure

Each template follows a consistent structure:

```
template-name/
├── migrations/       # Database migrations
├── models/          # Data models
├── seeds/           # Seed data
├── config/          # Configuration files
└── README.md        # Template-specific documentation
```

## ✨ Features

All templates include:
- 🚀 Modern database setup
- 📝 Schema definitions
- 🔄 Migration scripts
- 🌱 Seed data
- 🔍 Query optimization
- 📊 Indexing strategies
- 🔐 Security configurations
- 📚 Documentation

## 💻 Usage

These templates are used by the `createDatabaseProject.js` script to generate new database projects. The script will:
1. Copy the selected template
2. Install dependencies
3. Configure the database
4. Set up initial development environment

## 🔧 Customization

To customize a template:
1. Navigate to the specific template directory
2. Modify the template files
3. Update the corresponding configuration in `createDatabaseProject.js`
4. Test the template generation

## ✅ Best Practices

- Follow database normalization principles
- Implement proper indexing
- Use appropriate data types
- Optimize query performance
- Include comprehensive testing
- Follow database-specific best practices

## 🤝 Contributing

Please read the main project's [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the main project's [LICENSE.md](../../../LICENSE.md) for details.

---

<div align="center">
  <sub>Part of the <a href="../../README.md">Project CLI</a> ecosystem</sub>
</div> 