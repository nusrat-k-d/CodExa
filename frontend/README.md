# Codexa — AI-Powered Coding Coach

Codexa is a premium, AI-powered coding coach that analyzes your LeetCode profile to deliver precision insights, progress tracking, and personalized recommendations to help you ace technical interviews.

## Features

- **Precision Scoring** — Proprietary placement readiness score based on difficulty distribution
- **Weak Spot Detection** — Identifies topics that need more focus from your tag data
- **Performance History** — Visual growth graphs with historical problem-solving data
- **Streak Monitoring** — Intelligent streak tracking to build consistent coding habits
- **Peer Benchmarking** — See how you rank against top candidates

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Data Source:** LeetCode GraphQL API

## Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`.

## Project Structure

```
codexa/
├── backend/
│   ├── models/User.js
│   ├── routes/analyze.js
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── Hero.js
        │   ├── Features.js
        │   ├── InputForm.js
        │   └── Footer.js
        └── pages/
            └── Dashboard.js
```

© 2026 Codexa. Built for high-performers.
