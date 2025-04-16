import os
from pathlib import Path

# Base directory of the application
BASE_DIR = Path(__file__).resolve().parent

# Database configuration
SQLITE_DB_PATH = os.path.join(BASE_DIR, 'student_assessment.db')
SQLALCHEMY_DATABASE_URI = f'sqlite:///{SQLITE_DB_PATH}'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Application configuration
DEBUG = True
SECRET_KEY = 'your-secret-key-for-development'
JWT_SECRET_KEY = 'your-jwt-secret-key-for-development'

# Cross-Origin Resource Sharing (CORS) configuration
CORS_HEADERS = 'Content-Type' 