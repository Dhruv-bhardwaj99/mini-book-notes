# Mini Book Notes

A full-stack book notes application built with React, GraphQL, Firebase Authentication, Redis, MongoDB, and Docker.

## Tech Stack

### Frontend
- React
- Vite
- Apollo Client
- Firebase Auth
- React Router
- Bootstrap
- React Toastify

### Backend
- Node.js
- Express
- Apollo Server
- GraphQL
- Firebase Admin SDK
- MongoDB
- Mongoose
- Redis

### DevOps
- Docker
- Docker Compose

## Features

- User login with Firebase Authentication
- Persistent login after refresh
- Protected GraphQL mutations
- Create, read, update, and delete book notes
- User-specific books
- Redis caching
- MongoDB persistence
- Bootstrap UI
- Toast notifications
- React Router navigation

## Project Structure

```txt
mini-book-notes/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── schema/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── graphql/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│
├── docker-compose.yml
└── README.md