
# ✅ School Vaccination Portal – Task Checklist

## 📦 Project Setup
- ✅ Initialize project structure (`/client` for frontend, `/server` for backend)
- ✅ Setup backend with Express.js + TypeScript
- ✅ Setup MongoDB connection and `.env` configuration
- ✅ Setup frontend with React (Vite) + TypeScript + Tailwind CSS
- ✅ Setup React Router DOM for page navigation
- ✅ Create shared constants/config files

---

## 🔐 Authentication (Simulated)
- ✅ Build a hardcoded login (token/email-password)
- ✅ Login page UI (Magic UI + shadcn)
- ✅ Store user state using context/localStorage
- ✅ Redirect to `/dashboard` after login
- ⬜ Implement protected routes for authenticated access

---

## 📊 Dashboard
### Backend
- ⬜ API: Total students count
- ⬜ API: Vaccinated count + percentage
- ⬜ API: Upcoming drives (within 30 days)

### Frontend
- ✅ Display metrics and analytics cards
- ✅ Vaccination coverage chart (pie)
- ✅ Upcoming drives list/table
- ✅ Use `mockDashboardData.ts` for local testing
- ⬜ Handle empty states (e.g., "No upcoming drives")
- ⬜ Add quick links to Students, Drives, Reports

---

## 👨‍🎓 Student Management
### Backend
- ⬜ Define `Student` schema (name, class, ID, vaccination records)
- ⬜ CRUD APIs for student data
- ⬜ API to update vaccination status (per drive)
- ⬜ Prevent duplicate vaccination for same vaccine

### Frontend
- ⬜ Form to add/edit individual student
- ⬜ CSV upload for bulk student import
- ⬜ Table view of students
- ⬜ Filter/search by name, class, status
- ⬜ Button to mark as vaccinated (linked to drive)

---

## 💉 Vaccination Drive Management
### Backend
- ⬜ Define `Drive` schema (vaccine name, date, doses, applicable classes)
- ⬜ Validate date ≥ 15 days ahead
- ⬜ Prevent overlapping drive dates
- ⬜ Disable editing of past drives
- ⬜ CRUD API for drive management

### Frontend
- ⬜ Form to create/edit a drive
- ⬜ Table to view all drives
- ⬜ Edit restriction UI for expired drives

---

## 📈 Reports
### Backend
- ⬜ API to fetch vaccinated students
- ⬜ Support filters: vaccine name, class, date
- ⬜ Pagination for large data

### Frontend
- ⬜ Filter controls UI
- ⬜ Table display with vaccinated students
- ⬜ Pagination component
- ⬜ Export to CSV/Excel/PDF (using jsPDF/xlsx)

---

## 🔄 Integration & UI Feedback
- ✅ Toast notifications using shadcn `use-toast`
- ⬜ Test real API connections from frontend
- ⬜ Handle loading and error states
- ⬜ Responsive design testing
- ⬜ Centralize API functions (e.g., in `api.ts`)

---

## 📄 Documentation & Submission
- ⬜ Create API documentation (Swagger/Postman/Markdown)
- ⬜ System architecture diagram
- ⬜ MongoDB schema diagrams
- ⬜ README.md with setup and run instructions
- ⬜ UI snapshots
- ⬜ API response screenshots
- ⬜ Record and upload demonstration video
- ⬜ ZIP file with:
  - ⬜ Documentation
  - ⬜ Demo video link
  - ⬜ GitHub repo link (README)
