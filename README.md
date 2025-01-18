# Task Management Dashboard

A modern task management system built with Next.js, featuring a Kanban board, WebGL background effects, and dark/light theme support.

## Features

- Responsive Kanban board with drag-and-drop functionality
- Dynamic WebGL background using Three.js
- Dark/light theme support
- Task status management with confirmation dialogs
- Detailed task view pages
- JSON Server backend for task data

## Design Choices

1. **UI Framework**: Used ShadCN UI for consistent, accessible components
2. **State Management**: Implemented Zustand for simple, efficient state management
3. **3D Background**: Added subtle WebGL effects using React Three Fiber for visual interest
4. **Drag and Drop**: Integrated React DND for intuitive task management
5. **Responsive Design**: Utilized Tailwind CSS for flexible, mobile-first layouts

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the JSON Server:
   ```bash
   npm run server
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- Three.js / React Three Fiber
- React DND
- JSON Server
- Zustand