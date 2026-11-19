# TaskFlow – Frontend

## Overview

TaskFlow is a responsive TODO management application built with React and TypeScript. It provides a simple dashboard for managing tasks, tracking progress, and organizing tasks based on their completion status.

The frontend communicates with a Node.js and Express REST API and retrieves task data from MongoDB through the backend.

## Technologies Used

- **React** – UI development
- **TypeScript** – Type-safe JavaScript
- **Vite** – Frontend development server and build tool
- **Tailwind CSS** – Responsive UI styling
- **React Router DOM** – Client-side routing
- **Axios** – HTTP requests and API communication
- **Lucide React** – Icons
- **SweetAlert2** – Confirmation dialogs and notifications

## Features

- Dashboard with task statistics and completion progress.
- View all tasks.
- Filter active and completed tasks.
- Create tasks with a title and optional description.
- Edit existing tasks.
- Mark tasks as completed or active.
- Delete tasks with confirmation.
- Required title and whitespace validation.
- User-friendly API error messages.
- Loading, error, and empty states.
- Retry functionality when API requests fail.
- Responsive design for desktop, tablet, and mobile devices.

## Project Structure

```text
client/
├── public/
├── src/
│   ├── api/
│   │   └── todoApi.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── AllTasks.tsx
│   │   ├── ActiveTasks.tsx
│   │   └── CompletedTasks.tsx
│   ├── types/
│   │   └── todo.ts
│   ├── utils/
│   │   └── apiError.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- A running TaskFlow backend API

## Installation

1. Navigate to the frontend directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal. Open that URL in your browser.

## Backend API Configuration

The frontend communicates with the backend API using Axios.

The API client is configured in:

`src/api/todoApi.ts`

Current API base URL:

```typescript
baseURL: "http://localhost:5000/api/todos"
```

Make sure the backend server is running on port `5000` before using the application.

## Available Pages

| Page            | Route              | Description                                                     |
| --------------- | ------------------ | --------------------------------------------------------------- |
| Dashboard       | `/`                | Displays task statistics, completion progress, and recent tasks |
| All Tasks       | `/tasks`           | Displays and manages all tasks                                  |
| Active Tasks    | `/tasks/active`    | Displays incomplete tasks                                       |
| Completed Tasks | `/tasks/completed` | Displays completed tasks                                        |

## Assumptions and Limitations

- The frontend expects the backend API to be available at `http://localhost:5000/api/todos`.
- Task data is managed and persisted through the backend and MongoDB database.
- The application does not currently include user authentication.
- The application is designed as a single-user TODO management system.
- The development server uses Vite.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Author

TaskFlow – TODO Management Application