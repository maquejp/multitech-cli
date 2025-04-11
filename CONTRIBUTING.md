# How to contribute

First of all, thank you for taking the time to contribute to this project. We've tried to make a stable project and try to fix bugs and add new features continuously. You can help us do more.

## Getting started

### Check out the roadmap

We have some functionalities in mind and we have issued them and there is a _milestone_ label available on the issue. If there is a bug or a feature that is not listed in the **issues** page or there is no one assigned to the issue, feel free to fix/add it! Although it's better to discuss it in the issue or create a new issue for it so there is no conflicting code.

### Writing some code!

Contributing to a project on Github is pretty straightforward. If this is your first time, these are the steps you should take.

- Fork this repo
- Clone your fork locally
- Create a new branch for your feature/fix
- Make your changes
- Run tests to ensure everything works
- Commit your changes with clear commit messages
- Push to your fork
- Create a Pull Request

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make the CLI executable:
   ```bash
   chmod +x cli.js
   ```

3. Link the package locally for development:
   ```bash
   npm link
   ```

### Tests

We've written tests and you can run them to assure the stability of the code:
```bash
npm test
```

If you're adding a new functionality please write a test for it.

### Documentation

Every chunk of code that may be hard to understand has some comments above it. If you write some new code or change some part of the existing code in a way that it would not be functional without changing its usages, it needs to be documented.

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps maintain a clean and consistent git history. Please follow these guidelines strictly:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 🚱 `:non-potable_water:` when plugging memory leaks
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

Example of a good commit message:
```
feat: add new project template for React

- Add React template with TypeScript support
- Include basic project structure
- Add development dependencies
- Add README with setup instructions

Closes #123
```

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots and animated GIFs if possible
- Include the output of any error messages
- Include your operating system and version
- Include the version of Node.js you're using
