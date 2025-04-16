# Student Term Work Assessment System

A comprehensive web application for automated assessment of student term work based on multiple parameters including:
- Daily attendance tracking
- Unit test and preliminary exam performance
- Student achievements and extracurricular activities
- Mock practical assessments

## Features

- **Dashboard**: Overview of student performance metrics
- **Attendance Tracker**: Record and analyze daily attendance
- **Assessment Management**: Input and evaluate test scores
- **Achievement Registry**: Document student accomplishments
- **Practical Assessment**: Evaluate hands-on skills
- **Reporting**: Generate comprehensive term work reports

## Tech Stack

- **Frontend**: React with Material-UI for a responsive, modern interface
- **Backend**: Flask (Python) API
- **Database**: SQLite for development (can be scaled to PostgreSQL)

## Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- pip

### Setup Instructions

1. Clone the repository
2. Set up backend:
   ```
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   flask run
   ```

3. Set up frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

4. Navigate to `http://localhost:3000` in your browser

## Project Structure

```
student-assessment-system/
├── backend/                 # Flask API
│   ├── app.py               # Main application file
│   ├── config.py            # Configuration settings
│   ├── models/              # Database models
│   ├── routes/              # API endpoints
│   └── requirements.txt     # Python dependencies
│
├── frontend/                # React application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── pages/           # Page layouts
│   │   ├── services/        # API services
│   │   └── styles/          # CSS styles
│   └── package.json         # Node dependencies
│
└── README.md                # Project documentation
``` 