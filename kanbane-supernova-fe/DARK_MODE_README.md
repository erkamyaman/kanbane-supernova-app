# Dark Mode Implementation

This application now includes a comprehensive dark mode/light mode toggle functionality.

## Features

- **Theme Persistence**: User's theme preference is saved in localStorage and persists across browser sessions
- **Smooth Transitions**: All theme changes include smooth CSS transitions for a polished user experience
- **Comprehensive Styling**: Dark mode affects all major components including:
  - Background colors
  - Text colors
  - Border colors
  - Button styles
  - Input fields
  - Popover components
  - Toggle switches

## How to Use

1. **Access the Theme Toggle**: Click on the "KANBANE SUPERNOVA" menu button in the top-left corner
2. **Toggle Dark Mode**: Use the toggle switch labeled "Dark Mode" / "Light Mode"
3. **Visual Feedback**: The toggle shows a sun icon (☀️) for light mode and moon icon (🌙) for dark mode

## Technical Implementation

### Theme Service (`src/app/services/theme.service.ts`)

- Manages theme state using Angular signals
- Handles localStorage persistence
- Applies CSS classes to document root element
- Provides methods for theme switching and retrieval

### CSS Variables

The application uses CSS custom properties for consistent theming:

**Light Theme Variables:**

- `--bg-primary`: #ffffff (white background)
- `--bg-secondary`: #f8f9fa (light gray background)
- `--text-primary`: #212529 (dark text)
- `--border-color`: #dee2e6 (light borders)

**Dark Theme Variables:**

- `--bg-primary`: #1a1a1a (dark background)
- `--bg-secondary`: #2d2d2d (medium dark background)
- `--text-primary`: #ffffff (white text)
- `--border-color`: #404040 (dark borders)

### Component Integration

- **Topbar Component**: Contains the theme toggle switch
- **App Component**: Initializes the theme service
- **Global Styles**: Apply theme variables throughout the application

## Styling Guidelines

When adding new components or styles, use the CSS variables for consistent theming:

```scss
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--hover-bg);
  }
}
```

## Browser Support

- Modern browsers with CSS custom properties support
- localStorage for theme persistence
- CSS transitions for smooth theme switching

## Future Enhancements

- System theme detection (follows OS preference)
- Additional theme options (e.g., high contrast, custom colors)
- Animation improvements for theme transitions
- Theme-aware component library integration
