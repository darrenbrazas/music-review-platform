# ReviewMu

A full-stack music review platform where you can browse albums and artists, leave ratings and reviews, search by genre, and discuss music.

## Tech Stack

- **Frontend** — HTML, CSS, Vanilla JavaScript
- **Backend** — Node.js, Express.js
- **Database** — PostgreSQL
- **Containerization** — Docker, Docker Compose
- **API Testing** — Postman

## Features

- Browse albums and artists pulled from a PostgreSQL database
- Rate and review albums and artists (1–100 scale)
- Search albums by genre
- Search artists by name
- Popular Right Now chart with weekly listener counts
- Top Rated page ranked by user ratings
- Community discussions board
- Token-based authentication with a protected Add Album route
- Admins can add new albums through the UI after logging in

## Running Locally with Docker

Make sure Docker Desktop is running, then:

```bash
docker compose up --build
```

Open `http://localhost:5000` in your browser. The database tables are created and seeded automatically on first boot.

```bash
docker compose down        # stop containers
docker compose down -v     # stop and wipe the database
docker compose up --build  # rebuild after code changes
```

## Running Without Docker

1. Install Node.js and PostgreSQL locally
2. Create a database:
```bash
psql -U postgres -c "CREATE DATABASE reviewmu;"
```
3. Create `server/.env` using `server/.env.example` as a template
4. Start the server:
```bash
cd server
node index.js
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/albums` | No | All albums (optional `?genre=` filter) |
| GET | `/albums/:id` | No | Single album |
| POST | `/albums` | Yes | Add a new album |
| GET | `/albums/:id/review` | No | Get album review |
| POST | `/albums/:id/review` | No | Save album review |
| GET | `/artists` | No | All artists (optional `?name=` search) |
| GET | `/artists/:id` | No | Single artist |
| GET | `/artists/:id/albums` | No | Albums by artist |
| GET | `/artists/:id/review` | No | Get artist review |
| POST | `/artists/:id/review` | No | Save artist review |
| GET | `/popular` | No | Albums ranked by weekly listeners |
| GET | `/toprated` | No | Albums ranked by user rating |
| GET | `/discussions` | No | All discussions |
| POST | `/discussions` | No | Create a discussion |
| POST | `/login` | No | Get auth token |
| POST | `/logout` | Yes | Invalidate token |

## Dev Login

```
Email:    dev@reviewmu.com
Password: reviewmu123
```

## Project Structure

```
ReviewMu/
├── server/
│   ├── index.js       # Express server, all routes
│   ├── db.js          # PostgreSQL connection pool
│   └── package.json
├── script.js          # All frontend logic
├── validation.js      # Login/signup form validation
├── style.css
├── index.html
├── album.html
├── artist.html
├── artistSearch.html
├── genreSearch.html
├── toprated.html
├── popular.html
├── discussion.html
├── addAlbum.html
├── login.html
├── signup.html
├── Dockerfile
└── docker-compose.yml
```
