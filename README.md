# 🏥 School Vaccination Portal

A full-stack application to manage students, vaccination drives, and vaccination reporting in schools.

---

## Features

- Student registration and bulk CSV upload
- Create/edit vaccination drives
- Assign students to vaccination drives
- Vaccination reporting with filters and CSV export
- Dashboard with real-time stats and pie charts
- MongoDB Is in the Cloud

---

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind + Recharts
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Auth**: Token-based (simulated)
- **Charts**: `recharts`
- **Export**: CSV export with client-side download

---

## Forking the Repository

1. Click the **Fork** button (top-right) on the GitHub repository page
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/school-vaccination-portal.git
   cd school-vaccination-portal
   ```

### USERNAME: admin1
### PASSWORD: pass123

---

## Environment Setup

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- MongoDB (local or Atlas)

### 📁 Project Structure

```
/backend        → Express API
/fsad-client    → React frontend
```

---

## 🖥️ Running the Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vaccination-db
```

Start server:
```bash
npm run dev
```

API will be live at: `http://localhost:5000`

---

## 🌐 Running the Frontend

```bash
cd fsad-client
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start dev server:
```bash
npm run dev
```

App will open at: `http://localhost:5173`

---

## Accessing the App

- Visit `http://localhost:5173`
- Use the login form to access the dashboard
- Upload students, create drives, assign vaccinations, and view reports

---

## Sample Data

- You can upload students using a sample CSV (see `/sample_students.csv`)
- Drives can be created via the UI

---

## Scripts

| Command | Location | Description            |
|---------|----------|------------------------|
| `npm run dev` | both | Starts frontend/backend in dev mode |
| `npm run build` | fsad-client | Builds frontend for production |
| `npm start` | backend | Starts backend (non-dev) |

