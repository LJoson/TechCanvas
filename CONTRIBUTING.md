# Contributing to TechCanvas 🎨

Thank you for your interest in contributing to TechCanvas! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **🐛 Bug Reports** - Report bugs and issues
- **✨ Feature Requests** - Suggest new features
- **📝 Documentation** - Improve documentation
- **🎨 UI/UX Improvements** - Enhance user interface
- **⚡ Performance Optimizations** - Improve performance
- **🧪 Tests** - Add or improve tests
- **🔧 Code Improvements** - Refactor and optimize code

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/techcanvas.git
   cd techcanvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript** - All code must be written in TypeScript
- **ESLint** - Follow ESLint rules and configurations
- **Prettier** - Use Prettier for code formatting
- **Conventional Commits** - Use conventional commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build process or auxiliary tool changes

**Examples:**
```
feat(components): add new animation component
fix(blog): resolve pagination issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a descriptive PR title**
2. **Provide a detailed description** of your changes
3. **Include screenshots** for UI changes
4. **Add tests** for new features
5. **Update documentation** if needed
6. **Ensure all tests pass**
7. **Request review** from maintainers

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🎨 Component Development

### Creating New Components

1. **Create component file**
   ```typescript
   // components/ui/NewComponent.tsx
   import React from 'react'
   import { ComponentProps } from '@/types'

   interface NewComponentProps extends ComponentProps {
     // Add your props here
   }

   export const NewComponent: React.FC<NewComponentProps> = ({
     children,
     className,
     ...props
   }) => {
     return (
       <div className={className} {...props}>
         {children}
       </div>
     )
   }
   ```

2. **Add TypeScript types**
   ```typescript
   // types/components.ts
   export interface NewComponentProps {
     // Define your component props
   }
   ```

3. **Add to component index**
   ```typescript
   // components/ui/index.ts
   export { NewComponent } from './NewComponent'
   ```

### Animation Components

When creating animation components:

```typescript
// components/animations/NewAnimation.tsx
import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface NewAnimationProps {
  duration?: number
  delay?: number
  easing?: string
}

export const NewAnimation: React.FC<NewAnimationProps> = ({
  duration = 1000,
  delay = 0,
  easing = 'easeInOutQuad'
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      anime({
        targets: elementRef.current,
        // Add your animation properties
        duration,
        delay,
        easing
      })
    }
  }, [duration, delay, easing])

  return <div ref={elementRef} className="new-animation" />
}
```

## 🎭 Theme Development

### Creating New Themes

1. **Create theme configuration**
   ```typescript
   // config/themes/new-theme.ts
   export const newTheme = {
     name: 'New Theme',
     colors: {
       primary: '#your-color',
       secondary: '#your-color',
       // ... other colors
     },
     fonts: {
       heading: 'Your Font',
       body: 'Your Font',
       code: 'Your Code Font'
     },
     animationStyle: 'smooth',
     layout: 'centered'
   }
   ```

2. **Add to theme registry**
   ```typescript
   // config/themes/index.ts
   export { newTheme } from './new-theme'
   ```

## 📚 Documentation

### Writing Documentation

- Use clear and concise language
- Include code examples
- Add screenshots for UI components
- Follow the existing documentation structure
- Use proper Markdown formatting

### Documentation Structure

```
docs/
├── getting-started.md
├── customization.md
├── components/
│   ├── ui.md
│   ├── animations.md
│   └── three.md
├── themes/
│   ├── built-in.md
│   └── custom.md
└── api/
    ├── components.md
    └── utilities.md
```

## 🐛 Bug Reports

### Before Submitting

1. **Check existing issues** - Search for similar issues
2. **Reproduce the bug** - Ensure it's reproducible
3. **Check environment** - Verify your setup

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 120, Firefox 119]
- Node.js: [e.g., 18.17.0]
- TechCanvas: [e.g., 1.0.0]

## Additional Information
Screenshots, error messages, etc.
```

## ✨ Feature Requests

### Feature Request Template

```markdown
## Feature Description
Brief description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should work

## Alternatives Considered
Other approaches you considered

## Additional Information
Mockups, examples, etc.
```

## 🏷️ Labels

We use the following labels to categorize issues and PRs:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue
- `status: blocked` - Blocked by other issues
- `status: in progress` - Currently being worked on
- `type: breaking` - Breaking change

## 📞 Getting Help

- **GitHub Issues** - For bug reports and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Discord** - For real-time chat and support
- **Documentation** - Check our comprehensive docs

## 🎉 Recognition

Contributors will be recognized in:

- **README.md** - Contributors section
- **Release notes** - For significant contributions
- **Documentation** - For documentation contributions
- **Community highlights** - Featured in community updates

## 📄 License

By contributing to TechCanvas, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TechCanvas! 🎨

*Every developer is an artist, every contribution is a masterpiece*
