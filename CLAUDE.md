# CLAUDE.md

## Project Overview

**extended-listbox** is a vanilla JavaScript/TypeScript UI component (v6.0.0) that serves as a customizable alternative to the native HTML `<select>` element. It renders a div-based list structure, supporting single-select and multi-select modes, grouped/hierarchical items, a search bar with filtering, keyboard navigation (arrow keys, Enter), and a full programmatic API for item manipulation. No jQuery or other runtime dependencies are required. Published to npm as `extended-listbox`.

- **Author:** Christian Kotzbauer
- **License:** MIT
- **Repository:** `github.com/ckotzbauer/extended-listbox`
- **npm:** `https://www.npmjs.com/package/extended-listbox`

## Tech Stack

| Category        | Technology                                                  |
|-----------------|-------------------------------------------------------------|
| Language        | TypeScript 5.9, targeting ES2015                            |
| Bundler         | Rollup 4.59 with `@rollup/plugin-typescript`                |
| Minification    | Terser 5.46                                                 |
| Styles          | SCSS (Sass 1.97), PostCSS with Autoprefixer                 |
| Testing         | Jest 29.7 with `ts-jest` and `jest-environment-jsdom`       |
| Linting         | ESLint 8.57 with `@typescript-eslint/parser` + Prettier     |
| Formatting      | Prettier 3.8                                                |
| Task Runner     | npm scripts, `npm-run-all2` for sequential/parallel scripts |
| Build Helpers   | `ts-node` (executes build scripts), `rimraf`, `ncp`         |
| Dependency Mgmt | Renovate (extends `ckotzbauer/renovate-config`)             |

## Project Structure

```
extended-listbox/
├── build/                          # Build orchestration scripts (TypeScript, run via ts-node)
│   ├── build.ts                    # Main build: Rollup bundle, Terser minify, Sass compile, copy SCSS
│   ├── build-post.ts               # Post-build: moves .d.ts files into dist/types/, copies typings.d.ts
│   └── rollup.ts                   # Rollup config: UMD output, TypeScript plugin
├── dist/                           # Build output (committed)
│   ├── extended-listbox.js         # UMD bundle (unminified)
│   ├── extended-listbox.min.js     # UMD bundle (minified)
│   ├── extended-listbox.css        # Compiled CSS (expanded)
│   ├── extended-listbox.min.css    # Compiled CSS (compressed)
│   ├── scss/                       # Raw SCSS source copy for consumers
│   ├── types/                      # TypeScript declaration files
│   └── typings.d.ts                # Main type declaration entry
├── src/
│   ├── index.ts                    # Entry point: `listBox()` factory function (default export)
│   ├── factory.ts                  # `createListBox()` - merges config defaults, instantiates correct class
│   ├── base-list-box.ts            # Abstract base class with all shared DOM logic and public API
│   ├── single-select-list-box.ts   # SingleSelectListBox - single selection behavior
│   ├── multi-select-list-box.ts    # MultiSelectListBox - multi selection with Ctrl+click
│   ├── test-utils.ts               # Shared test helpers (createInstance, click simulation, assertions)
│   ├── typings.d.ts                # Public type re-exports and ListBoxFn declaration
│   ├── tsconfig.json               # Source-specific tsconfig (ES2015 modules, baseUrl: "./")
│   ├── styles/
│   │   └── extended-listbox.scss   # Component styles with configurable SCSS variables
│   ├── types/
│   │   ├── options.ts              # ListBoxOptions interface and defaults
│   │   ├── list-box-item.ts        # ListBoxItem interface
│   │   ├── list-box-event.ts       # ListBoxEvent interface
│   │   ├── instance.ts             # Instance<K> interface (public API), ListBoxNameMap, ListBoxFn
│   │   └── globals.ts              # Global type augmentations (HTMLElement.listBox, etc.)
│   └── __tests__/
│       ├── base-list-box.spec.ts   # Tests for shared functionality (items, searchbar, events, API)
│       ├── single-select-list-box.spec.ts  # Single-select behavior tests
│       └── multi-select-list-box.spec.ts   # Multi-select behavior tests (click, Ctrl+click)
├── doc/pages/                      # Documentation pages (for gh-pages deployment)
├── coverage/                       # Jest coverage output (committed)
├── .github/workflows/
│   ├── main.yml                    # CI: build + lint + test on every push
│   ├── release.yml                 # Release: manual dispatch, npm publish, docs deploy
│   └── update-snyk.yml             # Weekly Snyk security monitoring
├── package.json
├── tsconfig.json                   # Root tsconfig (CommonJS, baseUrl: "src")
├── tsconfig.declarations.json      # Declarations-only build (emits typings.d.ts to dist/)
├── tsconfig.typecheck.json         # Type-checking config (includes all src/**/*.ts)
├── tsconfig.test.json              # (Currently unused - tests use jest.json ts-jest config)
├── jest.json                       # Jest configuration
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc.js                  # Prettier configuration
├── .editorconfig                   # Editor settings
├── renovate.json                   # Renovate bot config
├── deploy-docs.sh                  # Legacy Travis-based docs deployment script
└── .npmignore                      # Excludes build/, src/, config files from npm package
```

## Architecture & Patterns

### Class Hierarchy

The component uses a **template method / abstract class** pattern:

1. **`BaseListBox<K>`** (`src/base-list-box.ts`) - Abstract generic class parameterized by `K extends keyof ListBoxNameMap` (either `"single"` or `"multi"`). Contains all shared logic:
   - DOM creation (`_createListbox`, `_createSearchbar`, `_createList`)
   - Item management (add, remove, move, locate)
   - Search/filter bar with live filtering
   - Keyboard navigation (arrow up/down, Enter)
   - Event system (`_fireEvent` dispatches to option callbacks)
   - Public API methods: `addItem`, `addItems`, `removeItem`, `removeItems`, `destroy`, `clearSelection`, `getItem`, `getItems`, `moveItemUp`, `moveItemDown`, `moveItemToTop`, `moveItemToBottom`, `enable`, `getSelection`

2. **`SingleSelectListBox`** (`src/single-select-list-box.ts`) - Extends `BaseListBox<"single">`. Selection is `ListBoxItem | null`. Clicking any item deselects the previous one. Filtering auto-selects the first visible item.

3. **`MultiSelectListBox`** (`src/multi-select-list-box.ts`) - Extends `BaseListBox<"multi">`. Selection is `ListBoxItem[]`. Supports Ctrl+click for additive selection; plain click replaces selection.

### Entry Point

`src/index.ts` exports the `listBox` function as the default export. It accepts a CSS selector string, a DOM Node, or a NodeList, plus a mode (`"single"` or `"multi"`) and optional configuration. Internally calls `createListBox()` from `src/factory.ts`.

### Type System

- **`ListBoxNameMap`** maps mode strings to selection types: `single -> ListBoxItem | null`, `multi -> ListBoxItem[]`
- **`Instance<K>`** is the public API interface, generic over the mode
- **`ListBoxFn`** provides overloaded call signatures for the entry point
- **`globals.ts`** augments `HTMLElement`, `NodeList`, `HTMLCollection` with a `listBox` method

### Event System

Custom callback-based events (not DOM CustomEvents). Options like `onValueChanged`, `onFilterChanged`, `onItemsChanged`, `onItemEnterPressed`, `onItemDoubleClicked` are called directly when the corresponding action occurs. Events receive a `ListBoxEvent` object with `eventName`, `target`, and `args`.

### CSS Architecture

SCSS with configurable variables (prefixed `$listbox-`). All CSS classes use a `listbox-` namespace. Key classes defined as static constants on `BaseListBox`:
- `.listbox-root`, `.listbox`, `.listbox-item`, `.listbox-item-selected`, `.listbox-item-disabled`, `.listbox-item-group`, `.listbox-item-child`, `.listbox-searchbar`, `.listbox-searchbar-button`, `.listbox-disabled`

Default dimensions: 170px wide, 300px tall, 5px border-radius.

## Build & Development

### Build Pipeline (`npm run build`)

Runs four sequential steps via `npm-run-all2`:

1. **`build:pre`** - `rimraf dist` (clean output)
2. **`build:build`** - `ts-node --transpile-only build/build.ts`:
   - Rollup bundles `src/index.ts` to `dist/extended-listbox.js` (UMD format, `exports: "default"`)
   - Terser minifies to `dist/extended-listbox.min.js`
   - Sass compiles SCSS to `dist/extended-listbox.css` and `dist/extended-listbox.min.css`
   - Copies raw SCSS to `dist/scss/`
3. **`build:types`** - `tsc -p tsconfig.declarations.json` (emits only `.d.ts` files from `src/typings.d.ts`)
4. **`build:post`** - `ts-node --transpile-only build/build-post.ts` (moves `.d.ts` files into `dist/types/`, copies `src/typings.d.ts` to `dist/typings.d.ts`)

### Output Format

UMD bundle with a default export. Banner includes version and MIT license comment. The `dist/` directory is committed to the repository.

### npm Package Contents

Defined in `package.json` `"files"`: `dist/`, `doc/pages/`, `CHANGELOG.md`, `doc/ROADMAP.md`. The `.npmignore` additionally excludes build scripts, source, and config files.

- **`main`**: `dist/js/extended-listbox.js`
- **`typings`**: `dist/extended-listbox.d.ts`

## Testing

### Framework

Jest 29.7 with `ts-jest` for TypeScript transpilation and `jest-environment-jsdom` for DOM simulation.

### Configuration (`jest.json`)

```json
{
  "preset": "ts-jest",
  "testEnvironment": "jsdom",
  "moduleDirectories": ["node_modules", "src"],
  "transform": { ".ts": ["ts-jest", { "isolatedModules": true }] }
}
```

### Test Structure

Three spec files in `src/__tests__/`:

- **`base-list-box.spec.ts`** (42 tests) - Root/list CSS classes, searchbar creation, watermark, button with icon and callback, item rendering (simple/disabled/selected/header/with-id/with-children), API methods (addItem, addItems, removeItem, removeItems, destroy, clearSelection, getItem, getItems, moveItemUp, moveItemDown, moveItemToBottom, moveItemToTop, enable/disable, getSelection), keyboard events (Enter, ArrowUp, ArrowDown), custom events (valueChanged, itemsChanged, filterChanged, itemDoubleClicked)
- **`single-select-list-box.spec.ts`** (7 tests) - Construction, searchbar, default values, click behavior (single selection only), onValueChanged callback
- **`multi-select-list-box.spec.ts`** (11 tests) - Construction, searchbar, default values, click/Ctrl+click behavior, multi-selection scenarios, onValueChanged callback

### Test Utilities (`src/test-utils.ts`)

Shared helpers:
- `createInstance(mode, options?, items?)` - Creates a DOM fixture and instantiates a listbox
- `beforeEachTest()` / `afterEachTest()` - Manages a `#fixture` div on `document.body`
- `click(element, ctrl?)` - Simulates click events with optional Ctrl key
- `child(element, index?)` / `children(element)` - DOM child accessors
- `elementEquals()` / `itemEquals()` - Assertion helpers comparing data items to DOM elements

## Linting & Code Style

### ESLint (`.eslintrc.js`)

- **Parser:** `@typescript-eslint/parser` (ECMAScript 2018, ES modules)
- **Extends:** `plugin:@typescript-eslint/recommended`, `prettier`
- **Key rules:**
  - `@typescript-eslint/naming-convention`: enforces camelCase for variables
  - Disabled: `no-use-before-define`, `explicit-function-return-type`, `no-explicit-any`, `prefer-interface`, `no-object-literal-type-assertion`
- **Ignores:** `.gitignore` paths, `dist/`, `doc/`

### Prettier (`.prettierrc.js`)

- `trailingComma: "es5"`
- `printWidth: 130`

### EditorConfig (`.editorconfig`)

- Line endings: LF
- Indent: 4 spaces (2 for JSON)
- Charset: UTF-8 BOM
- Trailing whitespace: trimmed
- Final newline: inserted

### TypeScript Strictness

- `strict: true` across all tsconfig files
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `noImplicitAny: true` (root tsconfig)
- Target: ES2015
- Libs: `es2015`, `dom`, `es2017.object`, `esnext.asynciterable`

## CI/CD

### Build Workflow (`.github/workflows/main.yml`)

- **Trigger:** Push to any branch
- **Reusable workflow:** `ckotzbauer/actions-toolkit/.github/workflows/toolkit-build-test.yml@0.52.0`
- **Steps:** `npm ci` -> `npm run build` -> `npm run lint` -> `npm test`
- **Coverage:** Reports `coverage/lcov.info` (likely to Codecov)

### Release Workflow (`.github/workflows/release.yml`)

- **Trigger:** Manual `workflow_dispatch` with a `version` input
- **Reusable workflow:** `ckotzbauer/actions-toolkit/.github/workflows/toolkit-release-nodejs.yml@0.52.0`
- **Steps:** Build, test, publish to npm, create GitHub release with `dist/` as artifact
- **Secrets:** `GITHUB_TOKEN`, `REPO_ACCESS` (PAT), `NPM_TOKEN`
- **Post-release:** Triggers a separate `deploy-docs` workflow on main

### Snyk Workflow (`.github/workflows/update-snyk.yml`)

- **Trigger:** Weekly schedule (Monday 12:00 UTC) or manual dispatch
- **Action:** Runs `snyk monitor` for vulnerability tracking

### Dependency Updates

Renovate bot configured via `renovate.json`, extending shared presets from `ckotzbauer/renovate-config` (default + weekly schedule).

## Key Commands

| Command            | Description                                           |
|--------------------|-------------------------------------------------------|
| `npm run build`    | Full build: clean, bundle JS (Rollup+Terser), compile SCSS, emit types |
| `npm test`         | Run type-checking (`tsc --noEmit`) then Jest unit tests with coverage |
| `npm run test:unit`| Run Jest tests only with coverage                     |
| `npm run test:typecheck` | TypeScript type-checking only (no emit)         |
| `npm run lint`     | Run ESLint on all `.ts` files                         |
| `npm run format`   | Run Prettier on all `.ts` files (write mode)          |

## Important Conventions

- **No runtime dependencies.** The package has zero production dependencies; everything is in `devDependencies`.
- **UMD output.** The bundle uses UMD format with a default export, consumable via script tag, CommonJS `require`, or ES module import.
- **Dist is committed.** The `dist/` directory is checked into version control.
- **Variable naming.** ESLint enforces camelCase for all variable-like identifiers via `@typescript-eslint/naming-convention`.
- **CSS class constants.** All CSS class names are defined as `public static` string constants on `BaseListBox` (e.g., `BaseListBox.LIST_ITEM_CLASS`). Always reference these constants rather than using string literals in source code.
- **Event naming convention.** Internal event names are camelCase strings (e.g., `"valueChanged"`). The corresponding option callback is `"on"` + PascalCase (e.g., `onValueChanged`). The mapping is done dynamically in `_fireEvent`.
- **Generic mode typing.** The `"single"` / `"multi"` mode string is a generic parameter `K extends keyof ListBoxNameMap` threading through the entire type hierarchy, providing type-safe selection return types.
- **Test isolation.** Each test creates a fresh DOM fixture via `beforeEachTest()` and tears it down via `afterEachTest()`. Tests use `jsdom` -- there is no browser-based test runner.
- **SCSS variables are `!default`.** Consumers can override all style variables (colors, dimensions, border-radius) before importing the SCSS source from `dist/scss/`.
- **Releases are manual.** The release workflow requires a manual `workflow_dispatch` with a version string; there is no automated semantic release.
