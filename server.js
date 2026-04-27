const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIX 1: correct static path (NO change in logic)
app.use(express.static(path.join(__dirname)));

// ✅ FIX 2: root route (ONLY missing part)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


/* ================= SIGNUP ================= */
app.post('/api/signup', async (req, res) => {
  const { username, email, phone, password, first_name, last_name } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, email, phone, password_hash, first_name, last_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, phone, hash, first_name, last_name],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          id: this.lastID,
          username,
          email,
          message: 'User created'
        });
      }
    );

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ================= LOGIN ================= */
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  db.get(
    `SELECT * FROM users WHERE email = ? OR username = ?`,
    [identifier, identifier],
    async (err, user) => {

      if (err) return res.status(500).json({ error: err.message });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      delete user.password_hash;

      res.json(user);
    }
  );
});


/* ================= SAVE PROFILE ================= */
app.post('/api/profile', (req, res) => {
  const { user_id, age, weight_kg, injury_area, cause, difficulty } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID required' });
  }

  db.run(
    `INSERT OR REPLACE INTO user_profiles 
     (user_id, age, weight_kg, injury_area, cause, difficulty)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, age, weight_kg, injury_area, cause, difficulty],
    function (err) {

      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: 'Profile saved successfully' });
    }
  );
});


/* ================= GET PROFILE ================= */
app.get('/api/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  db.get(
    `SELECT * FROM user_profiles WHERE user_id = ?`,
    [userId],
    (err, row) => {

      if (err) return res.status(500).json({ error: err.message });

      if (!row) return res.json({});

      res.json(row);
    }
  );
});


/* ================= SERVER ================= */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});