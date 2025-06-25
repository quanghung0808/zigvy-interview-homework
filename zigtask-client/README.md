# ZigTask Web Client

## Project Overview
ZigTask Web Client is a modern, responsive task management frontend built with React and TypeScript. It allows users to sign up, sign in, and manage their tasks with real-time updates, drag-and-drop task board, search/filter, and dark mode support. The app communicates with the ZigTask API for all data operations.

## Setup & Run Instructions (Web)

### Prerequisites
- Node.js v20+

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy the example environment file and update the API URL if needed:
```bash
cp .env-example .env
```

### 3. Start the development server
```bash
npm start
```
- The app runs at http://localhost:3001 (or as shown in terminal)

### 4. Run tests
```bash
npm test
```

### 5. Lint & Build
```bash
npm run lint
npm run build
```

## Decisions & Trade-offs
- **State Management:** Chose Zustand for its minimal API, ease of use, and scalability for small-to-medium apps. Zustand provides a simple, boilerplate-free alternative to Redux, making state logic easy to maintain and test.
- **UI Library:** Selected Material UI for its comprehensive component set, accessibility, and rapid development capabilities. It ensures a consistent, modern look and feel with minimal custom CSS.
- **Real-time Updates:** Integrated Socket.IO to enable live task updates and board synchronization, providing a responsive user experience. This was preferred over polling for efficiency and immediacy.
- **Dark Mode:** Implemented a built-in toggle using React context and Material UI theming, allowing users to switch between light and dark modes for better accessibility and comfort.
- **Testing:** Used React Testing Library for component and unit tests, focusing on user-centric testing and reliability.
- **Routing:** Used React Router for client-side navigation, enabling a multi-page feel in a single-page app.
- **Trade-offs:** Opted for Zustand over Redux Toolkit for simplicity, at the cost of some advanced middleware and devtools. Chose Material UI for speed, though it adds bundle size compared to lighter alternatives like Chakra or Tailwind.

