# Contributing to Isoflow

Thank you for your interest in contributing to Isoflow! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat everyone with respect. No harassment, discrimination, or inappropriate behavior.
- **Be collaborative**: Work together to resolve conflicts and assume good intentions.
- **Be patient**: Remember that everyone has different levels of experience.
- **Be welcoming**: Help new contributors feel welcome and supported.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Quick Start

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/isoflow.git
   cd isoflow
   ```
3. Install dependencies:
   ```bash
   cd isoflow
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser

## Development Setup

### IDE Setup (VS Code)

Recommended extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

### Environment Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Available scripts**:
   ```bash
   npm start          # Start development server
   npm run dev        # Watch mode for library development
   npm run build      # Production build
   npm test           # Run tests
   npm run lint       # Check for linting errors
   npm run lint:fix   # Auto-fix linting errors
   ```

## Project Structure

For detailed project structure, see [ISOFLOW_ENCYCLOPEDIA.md](./ISOFLOW_ENCYCLOPEDIA.md). Key directories:

```
isoflow/
├── src/
│   ├── components/     # React components
│   ├── stores/        # State management (Zustand)
│   ├── hooks/         # Custom React hooks
│   ├── interaction/   # User interaction handling
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── docs/              # Documentation site
└── webpack/           # Build configurations
```

## How to Contribute

### Finding Issues to Work On

1. Check the [Issues](https://github.com/stan-smith/isoflow/issues) page
2. Look for issues labeled:
   - `good first issue` - Great for newcomers
   - `help wanted` - Community help needed
   - `bug` - Bug fixes
   - `enhancement` - New features

3. Check [ISOFLOW_TODO.md](./ISOFLOW_TODO.md) for prioritized tasks

### Types of Contributions

We welcome all types of contributions:

- **Bug fixes**: Help us squash bugs
- **Features**: Implement new functionality
- **Documentation**: Improve docs, add examples
- **Tests**: Increase test coverage
- **UI/UX improvements**: Make Isoflow better to use
- **Performance**: Optimize code for better performance

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Your Changes

- Write clean, readable code
- Follow existing patterns in the codebase
- Add comments for complex logic
- Update tests if needed
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run linting
npm run lint

# Test in development
npm start
```

### 4. Commit Your Changes

We follow conventional commits:

```bash
git commit -m "feat: add undo/redo functionality"
git commit -m "fix: prevent menu from opening during drag"
git commit -m "docs: update installation instructions"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types
- Define interfaces for component props
- Use meaningful variable and function names

Example:
```typescript
interface NodeProps {
  id: string;
  position: { x: number; y: number };
  icon: IconType;
  isSelected?: boolean;
}

const Node: React.FC<NodeProps> = ({ id, position, icon, isSelected = false }) => {
  // Component implementation
};
```

### React

- Use functional components with hooks
- Keep components focused and small
- Use custom hooks for reusable logic
- Memoize expensive computations

### State Management

- Use Zustand stores appropriately:
  - `modelStore`: Business data
  - `sceneStore`: Visual state
  - `uiStateStore`: UI state
- Keep actions pure and predictable

### Styling

- Use Material-UI components when possible
- Follow existing styling patterns
- Use theme variables for colors
- Ensure responsive design

## Testing

### Running Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
```

### Writing Tests

- Write tests for new features
- Update tests when changing existing code
- Test edge cases and error scenarios
- Use meaningful test descriptions

Example:
```typescript
describe('useIsoProjection', () => {
  it('should convert tile coordinates to screen coordinates', () => {
    const { tileToScreen } = useIsoProjection();
    const result = tileToScreen({ x: 1, y: 1 });
    expect(result).toEqual({ x: 100, y: 50 });
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update your fork**:
   ```bash
   git remote add upstream https://github.com/markmanx/isoflow.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Go to GitHub and create a PR from your branch
   - Fill out the PR template
   - Link related issues
   - Add screenshots/GIFs for UI changes

### PR Title Format

Follow the same convention as commits:
- `feat: Add undo/redo functionality`
- `fix: Prevent menu from opening during drag`

### PR Description Template

```markdown
## Description
Brief description of changes

## Related Issue
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots or GIFs here
```

### Code Review

- Be open to feedback
- Respond to review comments
- Make requested changes promptly
- Ask questions if something is unclear

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Code Encyclopedia**: See [ISOFLOW_ENCYCLOPEDIA.md](./ISOFLOW_ENCYCLOPEDIA.md)
- **TODO List**: See [ISOFLOW_TODO.md](./ISOFLOW_TODO.md)

### Communication Guidelines

- Be clear and concise
- Provide context and examples
- Search existing issues before creating new ones
- Use issue templates when available

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- Contributors list on GitHub

## License

By contributing to Isoflow, you agree that your contributions will be licensed under the Unlicense License.

---

Thank you for contributing to OpenFLOW! Your efforts help make this project better for everyone. If you have any questions, don't hesitate to ask in the issues or discussions.

-S