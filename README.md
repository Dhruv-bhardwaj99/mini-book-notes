# Book Notes Manager

A full-stack book notes application built with React, GraphQL, Firebase Authentication, Redis, MongoDB, and Docker.

---

## Tech Stack

### Frontend

* React
* Vite
* Apollo Client
* Firebase Authentication
* React Router
* Bootstrap
* React Toastify

### Backend

* Node.js
* Express
* Apollo Server
* GraphQL
* Firebase Admin SDK
* MongoDB
* Mongoose
* Redis

### DevOps

* Docker
* Docker Compose

---

## Features

* User login with Firebase Authentication
* Persistent login after page refresh
* Protected GraphQL mutations
* Create, Read, Update, and Delete (CRUD) book notes
* User-specific books
* Redis caching
* MongoDB persistence
* Bootstrap UI
* Toast notifications
* React Router navigation
* Dockerized development environment

---

## Architecture

```txt
React Frontend
       │
       ▼
Apollo Client
       │
       ▼
GraphQL API
       │
       ▼
Apollo Server
       │
 ┌─────┴─────┐
 ▼           ▼
Redis      MongoDB
(Cache)   (Persistence)
       ▲
       │
Firebase Authentication
```

---

## Run Full Application with Docker

From the project root:

```bash
docker compose up --build
```

Frontend:

```txt
http://localhost:5174
```

Backend GraphQL Playground:

```txt
http://localhost:4000/graphql
```

MongoDB Compass:

```txt
mongodb://localhost:27018
```

Redis:

```txt
localhost:6380
```

Stop all containers:

```bash
docker compose down
```

---

## Local Development Setup

### Start Docker Services

```bash
docker compose up -d
```

### Start Backend

```bash
cd backend
npm install
npm run dev
```

### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:4000/graphql
```

---

## Project Structure

```txt
mini-book-notes/
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── redisClient.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   └── Book.js
│   │
│   ├── schema/
│   │   ├── resolvers.js
│   │   └── typeDefs.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBookForm.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── EditBookForm.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── config/
│   │   │   ├── apolloClient.js
│   │   │   └── firebase.js
│   │   │
│   │   ├── graphql/
│   │   │   ├── bookQueries.js
│   │   │   └── bookMutations.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Books.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── AddBook.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docker-compose.yml
├── .env
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=4000
REDIS_HOST=localhost
REDIS_PORT=6380
MONGO_URI=mongodb://localhost:27018/mini_book_notes
```

---

## Firebase Setup

### Frontend

Add your Firebase configuration to:

```txt
frontend/src/config/firebase.js
```

### Backend

Place your Firebase Admin SDK service account file inside:

```txt
backend/firebase-service-account.json
```

Make sure this file is included in:

```gitignore
.gitignore
```

and never committed to GitHub.

---

## GraphQL API

### Get All Books

```graphql
query {
  books {
    _id
    title
    author
    notes
    userId
  }
}
```

### Add Book

```graphql
mutation {
  addBook(
    title: "Atomic Habits"
    author: "James Clear"
    notes: "Small habits compound over time"
  ) {
    _id
    title
    author
    notes
  }
}
```

### Update Book

```graphql
mutation {
  updateBook(
    id: "BOOK_ID"
    title: "Updated Title"
    author: "Updated Author"
    notes: "Updated Notes"
  ) {
    _id
    title
    author
    notes
  }
}
```

### Delete Book

```graphql
mutation {
  deleteBook(id: "BOOK_ID") {
    _id
    title
  }
}
```

---

## Authentication Flow

```txt
User Login
    │
    ▼
Firebase Authentication
    │
    ▼
Firebase ID Token
    │
    ▼
Stored in Local Storage
    │
    ▼
Apollo Client Authorization Header
    │
    ▼
Backend Middleware
    │
    ▼
Firebase Admin Verification
    │
    ▼
Protected GraphQL Resolver
```

---

## Redis Caching Strategy

* Books are cached in Redis after the first database query.
* Cache expires automatically after 60 seconds.
* Cache is cleared whenever:

  * A book is added
  * A book is updated
  * A book is deleted

Benefits:

* Faster reads
* Reduced MongoDB queries
* Better scalability

---

## Learning Outcomes

This project demonstrates:

* Full-stack application architecture
* React and Vite development
* GraphQL API design
* Apollo Client and Apollo Server integration
* Firebase Authentication
* Firebase Admin SDK validation
* Protected GraphQL resolvers
* MongoDB and Mongoose
* Redis caching
* CRUD operations
* React Router navigation
* Docker containerization
* State management with React Hooks
* Component-based frontend design
* Secure user-specific data access

---

## Future Enhancements

* Dark Mode
* Search Books
* Book Categories
* Pagination
* GraphQL Subscriptions
* Real-time Notifications
* File Uploads
* AI-generated Book Summaries
* Deployment to Firebase Hosting + Render
* CI/CD with GitHub Actions

---

## Author

Dhruv Bhardwaj

Built as a full-stack learning project using React, GraphQL, Firebase, Redis, MongoDB, and Docker.
