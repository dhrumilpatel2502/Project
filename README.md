# Restoroll

Restoroll is a dual-sided platform where users discover short food videos and restaurant partners showcase dishes to promote their venue.

## Overview
- Users browse a feed of food/recipe videos and save favorites.
- Restaurant partners upload and manage promotional food videos.
- Built as a MERN app with a React (Vite) frontend and an Express/MongoDB backend.

## Features
- User authentication
- Partner onboarding
- Video browsing and saved list
- Responsive UI for desktop and mobile

## Tech Stack
- Frontend: React, Vite, React Router, Axios, CSS
- Backend: Node.js, Express, Mongoose, JWT, Multer
- Database: MongoDB
- Storage: Local uploads (plus external storage via ImageKit)

## Architecture
- `frontend/` is a React SPA powered by Vite.
- `backend/` exposes REST APIs under `/api/*`.
- `backend/src/models/` contains Mongoose schemas.
- `backend/src/controllers/` handles request logic.
- `backend/src/routes/` wires routes to controllers.

## Folder Structure
```
./
  backend/
    src/
      controllers/
      db/
      middlewares/
      models/
      routes/
      services/
    server.js
  frontend/
    src/
      components/
      context/
      pages/
      routes/
      styles/
  Video/
```

## Getting Started

### Backend
```
cd backend
npm install
node server.js
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `backend/.env` file with your values. Typical keys used by the backend include:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`

## Notes
- Frontend dev server is expected at `http://localhost:5173` (CORS allowlist in backend).
- Backend default port is `3000`.

## License
ISC
