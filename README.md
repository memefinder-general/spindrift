<div align="center">

<img src="https://raw.githubusercontent.com/memefinder-general/spindrift/refs/heads/main/misc/image.png" alt="Spindrift logo" width="100" />

# 🌪️ Spindrift

### _Heritable borders for React components that just work_

[![pnpm version](https://badge.fury.io/js/spndrft.svg)](https://badge.fury.io/js/spndrft)
[![pnpm downloads](https://img.shields.io/npm/dm/spndrft.svg)](https://www.npmjs.com/package/spndrft)
[![license](https://img.shields.io/npm/l/spndrft.svg)](https://github.com/memefinder-general/spindrift/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

_A vaguely more tolerable React debugging experience with granular control_

---

</div>

## 🌟 Why Spindrift?

Tired of wrestling with CSS just to debug your component layouts? **Spindrift** gives you laser-focused control over visual debugging borders without the performance overhead of recursive cloning.

You get a brand-new `Div` and `Span` component with rather underwhelming superpowers but hey, if you're anything like me, CSS is a scourge on the face of the earth and is the only thing stopping you from just doing things.

```tsx
<Div from>
  <span>✨ Bordered</span>
  <div>✨ Also bordered</div>
  <Div to>
    <span>🚫 No border</span>
  </Div>
</Div>
```

> **Note:** This is actively being developed. API may change in early versions.

## ✨ Features

<table>
<tr>
<td>

🎯 **CSS-only Performance**
<br/>Zero runtime overhead with pure CSS

</td>
<td>

🔧 **Context-based Control**  
<br/>Global enable/disable and theming

</td>
</tr>
<tr>
<td>

📦 **Tree-shakeable**
<br/>Import only what you need

</td>
<td>

🎨 **Tailwind Integration**
<br/>Built-in plugin for seamless setup

</td>
</tr>
<tr>
<td>

🔒 **TypeScript Native**
<br/>Full type safety with polymorphic components

</td>
<td>

⚡ **Production Ready**
<br/>Auto-disable in production builds

</td>
</tr>
</table>

## 📋 Prerequisites

- ⚛️ React 18+
- 🎨 Tailwind v4

## 📦 Installation

```bash
# npm
npm install spndrft

# pnpm
pnpm add spndrft

# yarn
yarn add spndrft
```

## 🚀 Quick Start

### 1️⃣ Setup Provider

```tsx
import { SpindriftProvider } from "spndrft";

function App() {
  return (
    <SpindriftProvider enabled={process.env.NODE_ENV !== "production"}>
      <YourApp />
    </SpindriftProvider>
  );
}
```

### 2️⃣ Add Styles

```css
/* globals.css */
@import "spndrft/css";
```

### 3️⃣ Use Components

```tsx
import { Div, Span } from "spndrft";

function MyComponent() {
  return (
    <Div from>
      <Span>🎯 This will have borders</Span>
      <Div>🎯 This will also have borders</Div>
      <Div to>
        <Span>⭕ This won't have borders</Span>
        <div>⭕ Neither will this</div>
      </Div>
    </Div>
  );
}
```

## 📖 API Reference

### `SpindriftProvider`

The main provider component for global configuration.

```tsx
interface SpindriftProviderProps {
  enabled?: boolean; // Default: process.env.NODE_ENV !== 'production'
  className?: string; // Default: 'spindrift'
  children: ReactNode;
}
```

### `Div` & `Span`

React elements enhanced with Spindrift capabilities.

```tsx
interface ComponentProps
  extends React.ComponentPropsWithoutRef<"div" | "span"> {
  from?: boolean; // 🟢 Start applying borders from this element
  to?: boolean; // 🔴 Stop applying borders at this element
}
```

## 🎯 Usage Patterns

<details>
<summary><strong>🔥 View Interactive Examples</strong></summary>

Run the full example locally:

```bash
pnpm examples
```

</details>

### 🌟 Basic Usage

```tsx
import { Div } from "spndrft";

// Apply borders to this div and all children
<Div from>
  <div>Child 1 📦</div>
  <div>Child 2 📦</div>
</Div>;
```

### 🎮 Nested Control

```tsx
import { Div } from "spndrft";

<Div from>
  <div>✅ Has border</div>
  <Div to>
    <div>❌ No border</div>
    <Div from>
      <div>✅ Has border again</div>
    </Div>
  </Div>
</Div>;
```

### 🚀 Production Builds

```tsx
// ✅ Always enabled
<SpindriftProvider enabled={true}>

// ❌ Always disabled
<SpindriftProvider enabled={false}>

// 🎯 Custom logic
<SpindriftProvider enabled={isDevelopment || isStorybook}>
```

## 🔧 TypeScript

**Spindrift** comes with comprehensive TypeScript support out of the box. Types are well-defined and provide excellent IntelliSense support.

## ⚡ Performance

| Feature                  | Benefit                                               |
| ------------------------ | ----------------------------------------------------- |
| **Zero cloning**         | Uses CSS selectors instead of recursive React cloning |
| **Constant time**        | O(1) rendering performance regardless of tree depth   |
| **Tree-shakeable**       | Only bundles components you actually use              |
| **Production optimized** | Can be completely removed from production builds      |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**If Spindrift helps you debug faster, consider giving it a ⭐!**

[Report Bug](https://github.com/memefinder-general/spndrft/issues) • [Request Feature](https://github.com/memefinder-general/spndrft/issues) • [Discussions](https://github.com/memefinder-general/spndrft/discussions)

</div>
