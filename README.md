# Test Task - Products Table

A Vue 3 application (Composition API) using PrimeVue, Pinia, and TypeScript that displays a table of products with three columns: name, description, and price.

## Technologies

- Vue 3 (Composition API)
- TypeScript
- Pinia for state management
- PrimeVue for UI components

## Installation and Launch

1. Install dependencies:
```bash
npm install
```

2. Run the application in development mode:
```bash
npm run dev
```

3. Open your browser and navigate to the address shown in the terminal (usually http://localhost:5173 or http://localhost:5174)

## Functionality

- Loading product data from API (https://dummyjson.com/products)
- Displaying data in a table with columns: name, description, price
- Pagination for convenient navigation through data
- Sorting by name and price
- Loading indicators and error handling

## Project Structure

- `src/stores/products.ts` - Pinia store for managing product data
- `src/components/ProductsTable.vue` - Products table component
- `src/App.vue` - Root application component
