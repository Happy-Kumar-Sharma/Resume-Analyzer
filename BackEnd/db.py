import mysql.connector
from config import settings

def get_db_connection():
    return mysql.connector.connect(
        host=settings.MYSQL_HOST,
        user=settings.MYSQL_USER,
        password=settings.MYSQL_PASSWORD,
        database=settings.MYSQL_DB
    )


def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Resume table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS resumes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(50),
            skills TEXT,
            education TEXT,
            experience TEXT,
            score FLOAT,
            filename VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    # User table (for future authentication, analytics, etc.)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            name VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    # Job matches table (for tracking recommendations)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS job_matches (
            id INT AUTO_INCREMENT PRIMARY KEY,
            resume_id INT,
            job_title VARCHAR(255),
            company VARCHAR(255),
            match_score FLOAT,
            link VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
        )
    ''')
    conn.commit()
    print("All tables created successfully.")
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_tables()
