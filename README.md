# server-table-pagination

A server-side pagination component for Angular applications. This component utilizes Tailwind CSS for styling, ensure you have it installed in your project.

## Version
1.0.3

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
