from app import create_app
from models.models import db, Student, Attendance, Assessment, Achievement, Practical

def init_db():
    app = create_app()
    with app.app_context():
        # Drop all tables
        db.drop_all()
        
        # Create all tables
        db.create_all()
        
        # Create a test student
        test_student = Student(
            roll_number='TEST001',
            first_name='Test',
            last_name='Student',
            email='test@example.com',
            department='Computer Science'
        )
        db.session.add(test_student)
        db.session.commit()
        
        # Create sample records for testing
        # Attendance
        attendance = Attendance(
            student_id=test_student.id,
            total_lectures=30,
            attended_lectures=25,
            month='January',
            year=2024,
            remarks='Good attendance'
        )
        db.session.add(attendance)
        
        # Assessment
        assessment = Assessment(
            student_id=test_student.id,
            name='Unit Test 1',
            subject='Mathematics',
            score=85,
            max_score=100,
            date='2024-01-15',
            remarks='Good performance'
        )
        db.session.add(assessment)
        
        # Achievement
        achievement = Achievement(
            student_id=test_student.id,
            title='Science Fair Winner',
            description='First place in regional science fair',
            category='Academic',
            date='2024-01-20',
            recognition='Gold Medal'
        )
        db.session.add(achievement)
        
        # Practical
        practical = Practical(
            student_id=test_student.id,
            name='Programming Lab',
            score=90,
            max_score=100,
            date='2024-01-25',
            skills_demonstrated='Python, Data Structures',
            comments='Excellent implementation'
        )
        db.session.add(practical)
        
        db.session.commit()
        print("Database initialized successfully with test data!")

if __name__ == '__main__':
    init_db() 