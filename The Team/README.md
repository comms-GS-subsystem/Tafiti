# Tafiti Cubesat User Submission System

A web application for collecting user submissions for the Tafiti Cubesat project. Built with React (Vite) frontend and Django backend.

## Prerequisites

1. Python 3.8+
2. Node.js 14+
3. PostgreSQL

## Setup Instructions

### Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE tafiti_db;
```

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Apply migrations:
```bash
cd backend
python manage.py migrate
```

4. Run the server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/

## Features

- User submission form with fields for:
  - Full Name
  - University
  - Photo upload
- Modern, responsive UI with Material-UI components
- PostgreSQL database for data persistence
- Image storage system
