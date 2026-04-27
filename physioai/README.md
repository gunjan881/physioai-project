# PhysioAI — AI Physiotherapy Web App
** GPNV Creations**

---

## 📁 Project Structure

```
physioai/
│
├── index.html              ← Landing page (open this first)
│
├── css/
│   └── style.css           ← All shared styles
│
├── js/
│   ├── data.js             ← Full exercise database (all causes + YouTube links)
│   ├── session.js          ← AI session engine (camera, ghost, pose, detections)
│   └── app.js              ← Shared utilities
│
└── pages/
    ├── login.html          ← Login page
    ├── signup.html         ← Sign up page
    ├── profile.html        ← Profile setup (injury, cause, age, weight)
    ├── dashboard.html      ← Main dashboard (exercises, history, stats)
    ├── demo.html           ← Demo video page (watch before each exercise)
    ├── session.html        ← AI session (live camera + ghost + pose tracking)
    └── complete.html       ← Session complete / report
```

---

## 🚀 How to Open in VS Code

1. Open the `physioai/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. The app opens at `http://127.0.0.1:5500`

> ⚠️ **Do NOT open HTML files by double-clicking** (file:// protocol).
> Always use Live Server — camera and MediaPipe require `http://localhost`.

---

## 📱 User Flow

```
index.html (Landing)
    ↓
pages/signup.html  OR  pages/login.html
    ↓
pages/profile.html  (set injury, cause, difficulty)
    ↓
pages/dashboard.html  (see exercise plan, start session)
    ↓
pages/demo.html  (watch YouTube demo for Exercise 1)
    ↓
pages/session.html  (AI ghost + live camera + pose tracking)
    ↓
pages/demo.html  (watch demo for Exercise 2)
    ↓
pages/session.html  (do Exercise 2)
    ↓  ... repeats for all exercises in the cause ...
    ↓
pages/complete.html  (session summary + download CSV)
```

---

## 🏥 Supported Injury Types & Causes

| Injury | Causes |
|--------|--------|
| Shoulder Pain | Frozen Shoulder, Calcific Tendinopathy, Shoulder Osteoarthritis, Rotator Cuff, AC Joint |
| Neck Pain | Muscle Strain, Cervical Spondylosis, Herniated Disc, Cervical Stenosis, Whiplash |
| Back Pain | Muscle Strain/Sprain, Herniated Disc, Spinal Stenosis, Spondylolisthesis |
| Leg Pain | Muscle Strain, Shin Splints, Patellofemoral Pain, Sciatica |
| Ankle/Foot Pain | Ankle Sprain, Achilles Tendinopathy, Ankle Osteoarthritis, Gout |
| Foot Pain | Plantar Fasciitis, Achilles Tendinitis |
| Knee Pain | Patellofemoral Pain, Meniscus Tear, IT Band Syndrome, Osteoarthritis |
| Hip Pain | Hip Flexor Strain, Bursitis, Hip Impingement |
| Elbow/Wrist Pain | Tennis Elbow, Golfer's Elbow, Carpal Tunnel, De Quervain's |

---

## 🤖 AI Features

- **Ghost Skeleton** — Teal animated skeleton demonstrates each exercise angle
- **Live Camera** — Webcam shown behind transparent canvas; user sees themselves + ghost
- **Pose Tracking** — MediaPipe Pose detects 33 body landmarks in real time
- **Alignment Feedback** — Skeleton turns green ✓ (aligned) or red ✗ (off)
- **Pain Detection** — FaceMesh detects brow furrow + grimace → triggers auto rest
- **Shiver/Fatigue** — Wrist velocity variance detects trembling → auto rest
- **Voice Guidance** — Web Speech API speaks instructions hands-free

---

## 🛠 Technologies

- HTML5 / CSS3 / Vanilla JavaScript
- [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) — body landmark detection
- [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh) — facial expression analysis
- Web Speech API — text-to-speech guidance
- localStorage — user data and session history

---

## 📋 Data Storage

All data is stored in `localStorage` (browser only, no server needed):
- `pu` — user profile (name, email, injury, cause, difficulty)
- `ps` — session history array (date, exercise, accuracy, reps, pain, fatigue)
- `currentExIdx` — which exercise is currently active

---

*Built by Gunjan Malhotra*
