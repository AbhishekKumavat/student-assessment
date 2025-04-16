from flask import Flask, jsonify, current_app, render_template, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import json
import os
from datetime import datetime

# Import configuration
import config

# Import models
from models.models import db

# Import blueprints
from routes.students import students_bp
from routes.attendance import attendance_bp
from routes.assessments import assessments_bp
from routes.achievements import achievements_bp
from routes.practicals import practicals_bp

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__, static_folder='static')
    
    # Load configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///student_assessment.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['DEBUG'] = config.DEBUG
    app.config['SECRET_KEY'] = config.SECRET_KEY
    
    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(students_bp, url_prefix='/api/students')
    app.register_blueprint(attendance_bp, url_prefix='/api/attendance')
    app.register_blueprint(assessments_bp, url_prefix='/api/assessments')
    app.register_blueprint(achievements_bp, url_prefix='/api/achievements')
    app.register_blueprint(practicals_bp, url_prefix='/api/practicals')
    
    # Home route
    @app.route('/')
    def home():
        return render_template('index.html')
    
    # API status route
    @app.route('/api')
    def api_status():
        return jsonify({
            'message': 'Welcome to the Student Assessment API',
            'endpoints': [
                '/api/students',
                '/api/attendance',
                '/api/assessments',
                '/api/achievements',
                '/api/practicals'
            ]
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'status': 'error',
            'message': 'Resource not found'
        }), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({
            'status': 'error',
            'message': 'Internal server error'
        }), 500
    
    # Create database tables if they don't exist
    if not os.path.exists('backend/instance/student_assessment.db'):
        with app.app_context():
            db.create_all()
            print("Database created successfully!")
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='localhost', port=5000)