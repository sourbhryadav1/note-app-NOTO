# Noto - MERN Notes App

A minimalist, responsive note-taking app built with MongoDB, Express, React (Vite), and Node. Includes rate limiting, toast notifications, and a light/dark minimalist theme with a persistent toggle.

## Features
- CRUD notes (title, content)
- Responsive UI with TailwindCSS + daisyUI
- Minimalist themes: `min` (light) and `min-dark` (dark)
- Theme toggle with localStorage persistence
- Global toast feedback (success/error)
- Axios instance with env-driven API base URL
- Basic rate limiting on backend

## Tech Stack
- Frontend: React 19, Vite, TailwindCSS, daisyUI, Axios, React Router
- Backend: Node, Express, MongoDB (Mongoose), dotenv, cors, helmet

---

## Getting Started (Development)

### Prerequisites
- Node.js >= 18
- MongoDB running locally (or a MongoDB Atlas connection string)

### 1) Clone and install
```bash
git clone https://github.com/sourbhryadav1/note-app-NOTO.git
cd "mern/note app"
```

#### Backend
```bash
cd backend
npm install
```
Create `.env` in `backend/` (see Environment section below), then:
```bash
npm run dev
```
Backend runs on http://localhost:5001 by default.

#### Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173.

---

## Environment

### Backend `.env`
```
NODE_ENV= (development/production)
PORT= ---
MONGODB_URI= ---
CORS_ORIGIN= ---
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## Scripts

### Backend
- `npm run dev` - start with nodemon
- `npm start` - start production server

### Frontend
- `npm run dev` - Vite dev server
- `npm run build` - build production assets
- `npm run preview` - preview the production build

---

## Production Build & Deployment

### 1) Configure environment
- Set proper values for `MONGODB_URI`, `PORT`, and `CORS_ORIGIN` on the server.
- Set `VITE_API_BASE_URL` for the frontend build to point to your backend (e.g., `https://api.example.com/api`).

### 2) Build frontend
```bash
cd frontend
VITE_API_BASE_URL=https://your-backend.example.com/api npm run build
```
This outputs static assets to `frontend/dist`.

### 3) Serve frontend (option A: from backend)
- The backend is already configured to serve `frontend/dist` in production (`NODE_ENV=production`).
- Copy the build to the backend host if building elsewhere.
- Start backend:
```bash
cd backend
NODE_ENV=production PORT=80 CORS_ORIGIN=https://your-frontend.example.com npm start
```

### 4) Reverse proxy (recommended)
Use Nginx/Apache/Caddy to:
- Serve the frontend on `https://your-frontend.example.com`
- Proxy API requests to `http://localhost:5001`
- Ensure proper headers and SSL.

---

## Theming
- Minimalist themes are defined in `frontend/tailwind.config.js` under daisyUI themes `min` and `min-dark`.
- The Navbar includes a theme toggle; the active theme is stored under `localStorage.theme` and applied to `html[data-theme]`.

---

## Notes
- If you see CORS errors in development, ensure backend `CORS_ORIGIN` matches the Vite origin (default `http://localhost:5173`).
- For production, set strict origins and consider additional security controls.

---

## License
MIT
