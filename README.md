# server-table-pagination

A server-side pagination component for Angular applications. This component utilizes Tailwind CSS for styling, ensure you have it installed in your project.

## Version
1.0.5

[![npm](https://img.shields.io/npm/v/server-table-pagination)](https://www.npmjs.com/package/server-table-pagination)

## Dependencies
- Angular: ^16.2.0
- tslib: ^2.3.0
- Tailwind CSS

## Installation
```bash
npm install server-table-pagination
```
Ensure you have [Tailwind CSS](https://tailwindcss.com/docs/installation) installed and configured in your project.

```bash
npm install tailwindcss
```

## Usage

Import `ServerTablePaginationModule` in your app module:

```typescript
import { ServerTablePaginationModule } from 'server-table-pagination';

@NgModule({
  imports: [ ServerTablePaginationModule ]
})
export class AppModule { }
```

Use the `server-table-pagination` component in your template:

```html
<lib-server-table-pagination
  [limit]="10"
  [offset]="0"
  [count]="100"
  [inputPlaceHolderText]="'Search'"
  [showInputSearch]="true"
  (filterSearchChanged)="onFilterSearchChanged($event)">
</lib-server-table-pagination>
```

## Events

- `filterSearchChanged`: Emitted when pagination controls are interacted or search text is changed.

## Local Development

To test changes locally before publishing, follow these steps:

### 1. Symlink dependencies

The library needs Angular and other peer dependencies to compile. Symlink the consuming project's `node_modules`:

```bash
ln -s /path/to/your-angular-app/node_modules /path/to/server-table-pagination/node_modules
```

### 2. Build the library

Use `ng-packagr` (matching your Angular major version) to build:

```bash
cd server-table-pagination
npx ng-packagr@18 -p ng-package.json
```

This outputs the compiled library to the `dist/` folder.

### 3. Link to your project

Register the built library globally, then link it into your Angular app:

```bash
cd server-table-pagination/dist
npm link

cd /path/to/your-angular-app
npm link server-table-pagination --legacy-peer-deps
```

### 4. Enable preserveSymlinks

Add `"preserveSymlinks": true` to your `angular.json` build options so Angular resolves the symlinked library correctly:

```json
"architect": {
  "build": {
    "options": {
      "preserveSymlinks": true
    }
  }
}
```

### 5. Start the dev server

Run `ng serve` as usual. Changes to the library require rebuilding (step 2) and restarting the dev server.

### Cleanup

After testing, to revert to the published npm version:

```bash
cd /path/to/your-angular-app
npm unlink server-table-pagination
npm install
```

Remove `"preserveSymlinks": true` from `angular.json` if no longer needed.
