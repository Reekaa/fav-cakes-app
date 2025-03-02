# Fav Cakes App

Fav Cakes App is a full-stack web application where users can view, add, update, and delete their favorite cakes. The app is built with React for the frontend and Express for the backend. It uses SQLite for the database to store cake data.

## Features

- View a list of all cakes
- View details of a specific cake
- Add a new cake to the collection
- Update details of an existing cake
- Delete a cake from the collection

## Tech Stack

- **Frontend**: React, Vite, Material UI
- **Backend**: Express, SQLite
- **Database**: SQLite
- **Testing**: Jest

## Running the App Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps to Run the Backend

1. **Navigate to the server folder**:

   ```bash
   cd server
   ```

2. **Install the server dependencies**:

   Run the following command to install the required packages for the backend.

   ```bash
   npm install
   ```

3. **Start the server**:

   You can run the server in development mode using nodemon (for auto-reloading) or in regular mode.

   Development mode:

   ```bash
   npm run server:dev
   ```

   The server will start on http://localhost:3002.

### Steps to Run the Frontend

1. **Install the frontend dependencies**:

   Run the following command to install the required packages for the frontend.

   ```bash
   npm install
   ```

2. **Start the frontend**:

   You can run the frontend in development mode using Vite:

   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5173

## Database Setup

The app uses an SQLite database. When the backend starts, it will automatically initialize the cakes table if it doesn't already exist.

- The database file is located at `./database/cakes.sqlite`.
- If you need to reset the database, simply delete the cakes.sqlite file and the server will recreate it when it starts.


## Testing

To run the tests for the app (frontend or backend), you can use the following commands:

- Frontend tests:

  ```bash
  npm test
  ```

## ToDo

1. Reusable Components (Frontend)
Goal: Refactor frontend components into reusable, modular pieces.

2. Testing the Backend
Goal: Implement tests for the backend to ensure reliability.

3. Error Handling (Backend)
Goal: Improve error handling and validation in backend APIs.

4. Frontend Testing
Goal: Write more testing for frontend components.

5. Deployment
Goal: Deploy the app.


