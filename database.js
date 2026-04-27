const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./physioai.db');

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // User profiles table
  db.run(`CREATE TABLE IF NOT EXISTS user_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    age INTEGER,
    weight_kg REAL,
    injury_area TEXT NOT NULL,
    cause TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Easy',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);

  // Exercise sessions table
  db.run(`CREATE TABLE IF NOT EXISTS exercise_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    exercise_name TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    accuracy_pct INTEGER,
    reps_completed INTEGER,
    wrong_attempts INTEGER,
    pain_events INTEGER,
    fatigue_events INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;