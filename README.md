# Spindrift

_Note: This is a work in progress and the API is subject to change._

Spindrift gives you a `Div` and a `Span` that has heritable borders. You have granular control over the borders by using the `from` and `to`.

If you're anything like me, CSS is a scourge on the face of the earth and is the only thing stopping you from just doing things.

## Prerequisites

- React 18+
- Tailwind CSS

## Features

- 🎯 **CSS-only borders** - No performance impact from recursive cloning
- 🔧 **Context-based configuration** - Global enable/disable and theming
- 📦 **Tree-shakeable** - Only import what you need
- 🎨 **Tailwind CSS integration** - Built-in plugin for easy setup
- 🔒 **TypeScript support** - Full type safety with polymorphic components
- ⚡ **Zero runtime overhead** - Can be completely disabled in production

## Installation

```sh
npm install spindrift
# or
pnpm add spindrift
# or
yarn add spindrift
```

## Quick Start

### 1. Setup the Provider

Wrap your app with the `SpindriftProvider`:

```tsx
import { SpindriftProvider } from "spindrift";

function App() {
  return (
    <SpindriftProvider enabled={process.env.NODE_ENV !== "production"}>
      <YourApp />
    </SpindriftProvider>
  );
}
```

### 2. Add Tailwind Plugin

Add the Spindrift plugin to your `tailwind.config.js`:

```js
export default {
  plugins: [
    require("spindrift/plugin"),
    // ... other plugins
  ],
};
```

### 3. Use Spindrift Components

```tsx
import { Div, Span } from "spindrift";

function MyComponent() {
  return (
    <Div from>
      <Span>This will have borders</Span>
      <Div>This will also have borders</Div>
      <Div to>
        <Span>This won't have borders</Span>
      </Div>
    </Div>
  );
}
```

## API Reference

### SpindriftProvider

The main provider component that configures Spindrift globally.

```tsx
interface SpindriftProviderProps {
  enabled?: boolean; // Default: process.env.NODE_ENV !== 'production'
  className?: string; // Default: 'spindrift'
  children: ReactNode;
}
```

### Components

#### Div

A `div` element with Spindrift capabilities.

```tsx
interface DivProps extends React.ComponentPropsWithoutRef<"div"> {
  from?: boolean; // Start applying borders from this element
  to?: boolean; // Stop applying borders at this element
}
```

#### Span

A `span` element with Spindrift capabilities.

```tsx
interface SpanProps extends React.ComponentPropsWithoutRef<"span"> {
  from?: boolean; // Start applying borders from this element
  to?: boolean; // Stop applying borders at this element
}
```

## Usage Patterns

There is a full example in the `examples` folder that you can run by doing `pnpm examples`.

### Basic Usage

```tsx
import { Div } from "spindrift";

// Apply borders to this div and all children
<Div from>
  <div>Child 1</div>
  <div>Child 2</div>
</Div>;
```

### Nested Control

```tsx
import { Div } from "spindrift";

<Div from>
  <div>Has border</div>
  <Div to>
    <div>No border</div>
    <Div from>
      <div>Has border again</div>
    </Div>
  </Div>
</Div>;
```

### Custom Styling

```tsx
import { SpindriftProvider } from "spindrift";

<SpindriftProvider
  enabled={true}
  className="border-2 border-blue-500 border-dotted"
>
  <App />
</SpindriftProvider>;
```

### Production Builds

Spindrift is automatically disabled in production builds, but you can control this:

```tsx
// Always enabled
<SpindriftProvider enabled={true}>

// Always disabled
<SpindriftProvider enabled={false}>

// Custom logic
<SpindriftProvider enabled={isDevelopment || isStorybook}>
```

## CSS Classes

The default Tailwind plugin adds these styles:

```css
.spindrift {
  @apply border border-dashed border-red-500;
}

.spindrift * {
  @apply border border-dashed border-red-500;
}
```

You can customize the styles by providing your own `className` to the provider.

## TypeScript

Types are there, and they're damn near perfect.

## Performance

- **Zero cloning**: Uses CSS descendant selectors instead of recursive React element cloning
- **Constant time**: Rendering performance is O(1) regardless of component tree depth
- **Tree-shakeable**: Only bundles the components you actually use
- **Production optimized**: Can be completely removed from production builds
