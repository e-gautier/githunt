# AGENTS.md

## Project Overview

Githunt is a browser extension (Chrome and Firefox) that replaces the new tab page with a list of trending GitHub repositories. It supports light/dark themes, configurable time periods, language filtering, and optional GitHub personal access token authentication for higher API rate limits.

- **Version**: Defined in both `package.json` and `public/manifest.json` (keep in sync).
- **License**: MIT
- **Extension manifest**: Manifest V3, supporting both Chrome and Firefox (gecko settings included).

## Tech Stack

- **React 17** (class components, no hooks) bootstrapped with Create React App (`react-scripts` 5.x)
- **Redux 4** with `redux-actions`, `redux-thunk`, `redux-persist` (localStorage), `redux-logger` (dev only)
- **Bootstrap 5** for layout and UI components
- **FontAwesome 6** for icons (`@fortawesome/react-fontawesome`)
- **Sass** (`.scss` files compiled to `.css` in-place under `src/assets/scss/`)
- **dayjs** for date manipulation
- **react-responsive-modal** for the settings dialog
- **patch-package** to patch `react-scripts` and `react-dev-utils` (see `patches/`)

## Project Structure

```
githunt/
  public/
    manifest.json       # Extension manifest (Manifest V3), copied to build/
    index.html           # HTML template
    favicon.ico
  src/
    index.js             # Entry point: Redux store setup, redux-persist, React render
    App.test.js          # Single smoke test
    actions/
      settings.js        # Actions: theme, period, language, repoPoolSize, accessToken
      repos.js           # Actions: fetchRepos (thunk), setRepos, tryAgain, etc.
    reducers/
      index.js           # Root reducer with redux-persist configs for settings and repos
      settings.js        # Settings state: theme, period, language, repoAmount, accessToken
      repos.js           # Repos state: fetching, error, repos array, cacheDate
    middlewares/
      github.js          # GitHub API client: fetchRepos(), isAccessTokenValid()
    components/
      app.js             # Main app: infinite scroll, repo list, date headers
      header.js          # Header bar: period select, language select, refresh, settings icon
      settings.js        # Settings modal: theme, token, pool size, links, reset
      tokenForm.js       # Token input with debounced validation against GitHub API
      repo.js            # Single repo card
      date.js            # Date range label
      languageForm.js    # Language dropdown
      errorBoundary.js   # Error boundary wrapper
    assets/
      img/               # Icons (icon16/48/128.png), logo, screenshots, store tiles
      scss/              # SCSS source files (app, header, repo, date, settings)
  patches/
    react-scripts+5.0.1.patch       # Fixes deprecated webpack-dev-server middleware API
    react-dev-utils+12.0.1.patch    # Fixes fs.F_OK -> fs.constants.F_OK
  .env                   # Build-time env vars (no secrets)
  package.json
  package-lock.json
```

## Build and Packaging

### npm Scripts

| Command                  | Description                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `npm start`              | Dev server: watches SCSS and starts react-scripts dev server                                           |
| `npm run build`          | Production build: compiles SCSS, runs react-scripts build, copies manifest.json and icons to `build/`  |
| `npm run package`        | Runs `build`, then zips `build/` into `githunt-<version>.zip` (extension archive for store submission) |
| `npm run package:source` | Zips the project source into `githunt-<version>-source.zip` (source archive for addon review)          |
| `npm run package:all`    | Runs both `package` and `package:source`                                                               |
| `npm test`               | Runs the test suite (single smoke test)                                                                |
| `npm run deploy`         | Deploys `build/` to GitHub Pages via `gh-pages`                                                        |
| `npm run lint`           | Formats source with Prettier                                                                           |

### Build Pipeline Details

1. `rm -rf build` removes stale output.
2. `npm run build-css` compiles `src/assets/scss/*.scss` to `.css` files in-place.
3. `npm run build-js` runs `react-scripts build` (webpack production bundle), then copies `src/assets/img/icon*` to `build/static/media/`.
4. `cp public/manifest.json build` places the extension manifest in the build root.
5. The `package` script then zips the entire `build/` directory.

### Source Archive

The `package:source` script creates a source code archive for addon store review (required by Firefox AMO when submitting minified/bundled code). It includes all files needed to reproduce the build and excludes:

- `.git/` -- version control history
- `node_modules/` -- installed dependencies (reproducible via `npm install`)
- `build/` -- generated output (reproducible via `npm run build`)
- `*.zip` -- previously generated archives
- `src/assets/scss/*.css` and `*.css.map` -- generated from SCSS
- `.github/` -- not needed for build

A reviewer can reproduce the build with:

```
npm install     # triggers postinstall -> patch-package
npm run build
```

### Important Build Configuration

- `.env` sets `GENERATE_SOURCEMAP=false` (no source maps) and `INLINE_RUNTIME_CHUNK=false` (required for extension CSP compliance).
- `package.json` `"homepage": "."` ensures assets use relative paths.
- `postinstall` runs `patch-package` to apply patches under `patches/`.

## State Management

Redux store has two persisted slices:

### `settings` (persisted to localStorage)

- `theme`: `"LIGHT"` | `"DARK"`
- `period`: `"DAILY"` | `"WEEKLY"` | `"MONTHLY"` | `"YEARLY"`
- `language`: string (empty = all languages)
- `repoAmount`: `3` | `12` | `30` | `60`
- `accessToken`: string (GitHub personal access token)

### `repos` (persisted to localStorage, `error` and `fetching` blacklisted)

- `repos`: array of `{ items, since, to }` objects
- `fetching`: boolean
- `error`: string | null
- `cacheDate`: dayjs instance (cache invalidated after 12 hours)

## API Integration

The GitHub API client is in `src/middlewares/github.js`. It uses the GitHub Search API (`/search/repositories`) with optional Bearer token auth. The token is validated by making a request to the GitHub API root.

## Extension Manifest

The extension uses Manifest V3 with:

- Permissions: `tabs`, `storage`, `webNavigation`
- Host permissions: `https://api.github.com/*`
- New tab override: `index.html`
- Firefox gecko ID: `{e65b64ad-4343-44eb-8163-1f83ad706344}`
- Firefox minimum version: `109.0`

## Development Notes

- All components are **class components** (React 17, no hooks). Follow this pattern for consistency.
- SCSS files are compiled in-place; generated `.css` and `.css.map` files under `src/assets/scss/` are gitignored.
- The `build/` directory and `node_modules/` are gitignored. Zip files created by packaging scripts are not gitignored.
- There are no CI/CD workflows (`.github/workflows/` is empty).
- The single test in `src/App.test.js` is a smoke test that mounts the App component with a Redux store.

## Coding Conventions

- **Linting**: Run `npm run lint` before committing. It runs Prettier (120 print width, single quotes) over all `src/**/*.{js,jsx,json,scss}` files. Pre-commit hooks via `husky` + `lint-staged` enforce this automatically.
- Imports use relative paths within `src/`.
- Redux actions are created with `redux-actions` `createActions()`.
- Reducers use `redux-actions` `handleActions()`.
- Async actions (thunks) are plain functions returning `(dispatch) => { ... }`.
- CSS class names use Bootstrap 5 utility classes combined with custom SCSS.

## Version Bumping

When updating the version, it must be changed in **two places**:

1. `package.json` (`"version"` field)
2. `public/manifest.json` (`"version"` field)

These must always match.
