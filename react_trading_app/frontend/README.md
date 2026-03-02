# Trading App – Full Stack Project

---

# Introduction

This project is a full-stack Trading Management web application built using React for the frontend and flask for the backend.

The application allows users to manage traders and their accounts. Users can view a list of traders, add new traders, delete traders, navigate to a trader’s account page, and perform deposit or withdrawal operations.

The main goal of this project was to understand how to build and connect a frontend application to a backend REST API using Axios. It demonstrates CRUD operations, routing with URL parameters, form validation, and state management.

Technologies used:

- React
- React Router
- Ant Design
- Axios
- Node.js
- Express
- npm

This project focuses on clean structure, simple architecture, and clear API communication between frontend and backend.

---

# Quick Start

## Requirements

- Node.js (v18+ recommended)
- npm installed

---

## Run Frontend

Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## Run Backend

Go to the backend folder (where your `server.js` file is located):

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

Backend runs at:

```text
http://localhost:8080
```


# Implementation

## Frontend

The frontend was built using React functional components and hooks.

Main pages:

- Dashboard (list of traders)
- Trader Account Page (profile + deposit/withdraw)
- Quotes Page

Key features implemented:

- Routing with React Router
- URL parameter handling using `useParams()`
- Form validation using Ant Design
- API requests using Axios
- State management with `useState` and `useEffect`

The Trader Account page dynamically loads trader data based on the `traderId` in the URL.

---

## Backend

The backend was built using Express.

Implemented REST endpoints:

- `GET /dashboard/traders`
- `POST /trader`
- `DELETE /trader/:id`
- `GET /dashboard/profile/traderId/{traderId}`
- `PUT /trader/deposit/traderId/{traderId}/amount/{amount}`
- `PUT /trader/withdraw/traderId/{traderId}/amount/{amount}`

For simplicity, data is currently stored in memory.

CORS middleware is enabled to allow frontend communication.

---

# Improvements

Future improvements:

- Add a database (PostgreSQL or MongoDB)
- Implement authentication and user roles
- Add pagination and sorting for trader list
