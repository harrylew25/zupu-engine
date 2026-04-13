# Zupu Engine 🧬

A high-performance kinship resolution engine built with TypeScript, designed to resolve complex Chinese kinship relations using **Directed Acyclic Graph (DAG) Traversal**.

## 🚀 Tech Stack

- **Language:** [TypeScript 6.0+](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Package Manager:** [pnpm 10+](https://pnpm.io/)
- **Compiler:** `tsc` (Target: ESNext)

## 🏗️ Core Architecture: DAG Traversal

The engine treats kinship as a **Directed Acyclic Graph**. Unlike traditional tree structures that fail at marriage (cycles) or complex cross-lineage paths, `ZupuEngine` utilizes a "Directive Traversal" approach:

1.  **Nodes:** Represent individuals or relationship states (e.g., "Father", "Wife").
2.  **Edges:** Represent relationship transitions (e.g., `+f` for father, `+w` for wife).
3.  **Traversal:** The `resolve()` method takes a `RelationStep[]` path and reduces it by looking up edge transitions in a pre-computed `rules` dictionary.
4.  **Generational Delta:** Each edge carries a `gen` value (e.g., Father = +1, Son = -1), allowing the engine to calculate the precise generational distance from the "Ego" (the starting person).

### Sample Input

The engine resolves relationship paths defined as an array of `RelationStep` objects. Each step represents a single link in the kinship chain.

```typescript
import { RelationStep } from './src/types.js';

// Path for: "Wife's Father's 2nd Younger Brother"
const samplePath: RelationStep[] = [
  { rel: 'w' },             // Wife
  { rel: 'f' },             // Father
  { rel: 'lb', index: 2 }   // 2nd Younger Brother
];
```

## 📂 Project Structure

```text
zupu-engine/
├── dist/                # Compiled output (organized into src/ and types/)
├── src/                 # Core engine and dictionary logic
│   ├── dictionary.ts    
│   ├── index.ts         # Library Entry Point (Crucial for exports)
│   ├── sandbox.ts       
│   └── zupuEngine.ts    
├── tests/               # All unit tests
│   └── zupuEngine.test.ts 
├── types/               # Shared type definitions
│   └── index.ts
├── package.json         
├── tsconfig.json        
└── pnpm-lock.yaml       
```

## 🛠️ Getting Started

### Installation

```bash
pnpm install
```

### Local Development

To run the engine directly from source (using `tsx`):

```bash
pnpm start
```

### Build & Test

The project uses **Vitest** for unit testing and **tsc** for building the distribution:

```bash
pnpm test          # Run all unit tests
pnpm test:watch    # Run tests in watch mode
pnpm build         # Compile to dist/ for production
```

## 📦 Library Usage (React / React Native)

This engine is optimized for use in modern frontend frameworks like **React** (Vite/Webpack) and **React Native** (Metro).

### 1. Link Locally (for development)
In the `zupu-engine` directory:
```bash
pnpm link --global
```
In your React project:
```bash
pnpm link --global @harrylew/zupu-engine
```

### 2. Integration
```typescript
import { ZupuEngine, dictionary } from '@harrylew/zupu-engine';

const engine = new ZupuEngine(dictionary, 'm');
const result = engine.resolve([{ rel: 'f' }, { rel: 'f' }]);
console.log(result.title); // "祖父"
```

## 📜 Features

- **Polygamy Support:** Detects `Shu` (庶) vs `Di` (嫡) lineage status via index tracking.
- **Seniority Mapping:** Automatically applies seniority titles (e.g., "大", "二") based on relation indices.
- **Deep Lineage:** Fallback logic for ancestors/descendants beyond the 10th generation.
- **ESM Native:** Fully compatible with modern Node.js module resolution.
