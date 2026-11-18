# TaskFlow – Backend

REST API for the TaskFlow TODO management application, built with Node.js, Express.js, and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Nodemon
- dotenv
- CORS

## Project Structure

```text
server/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── Routes.js
│   ├── utils/
│   │   └── validateTodo.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## Installation

### 1. Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account

### 2. Install Dependencies

Navigate to the backend directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file inside the `server` directory.

Add the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5174
```

Replace `your_mongodb_atlas_connection_string` with your MongoDB Atlas connection string.

**Important:** Never commit your actual `.env` file or database credentials to GitHub.

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a database cluster.
3. Create a database user with appropriate permissions.
4. Configure Network Access to allow your development environment to connect.
5. Obtain your MongoDB connection string.
6. Add the connection string to `MONGODB_URI` in your `.env` file.

The application connects to MongoDB Atlas through Mongoose.

### 5. Run the Backend

Start the development server:

```bash
npm run dev
```

The server will start at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/
```

Expected response:

```json
{
  "message": "TODO API is running"
}
```

For normal startup without Nodemon:

```bash
npm start
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api/todos
```

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/todos`          | Retrieve all TODOs       |
| POST   | `/api/todos`          | Create a TODO            |
| PUT    | `/api/todos/:id`      | Update a TODO            |
| PATCH  | `/api/todos/:id/done` | Toggle completion status |
| DELETE | `/api/todos/:id`      | Delete a TODO            |

### Create a TODO

**POST** `/api/todos`

Request body:

```json
{
  "title": "Learn React",
  "description": "Build the TaskFlow application"
}
```

### Update a TODO

**PUT** `/api/todos/:id`

Request body:

```json
{
  "title": "Learn React",
  "description": "Complete the TaskFlow application"
}
```

### Toggle TODO Completion

**PATCH** `/api/todos/:id/done`

Toggles the completion status between `true` and `false`.

No request body is required.

### Delete a TODO

**DELETE** `/api/todos/:id`

Deletes the specified TODO.

## Validation and Error Handling

- TODO titles are required and must be non-empty strings.
- Descriptions are optional and must be strings when provided.
- MongoDB ObjectIds are validated for update, toggle, and delete operations.
- Appropriate HTTP status codes are returned for validation errors, missing TODOs, and server errors.
- A reusable validation utility is shared between the create and update controllers.

## Notes

- The backend uses MongoDB Atlas for persistent data storage.
- The frontend and backend run as separate applications during development.
- CORS is configured using the `CLIENT_URL` environment variable.
