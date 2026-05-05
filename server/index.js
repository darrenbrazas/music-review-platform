const path = require("path");
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://darrenbrazas.github.io"
  ]
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ---- Helpers ----

const toInt = (value) => {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
};

const clampRating = (n) => Number.isFinite(n) && n >= 1 && n <= 100;

const toAlbum = (row) => ({
  id: row.id,
  title: row.title,
  artistId: row.artist_id,
  albumCover: row.album_cover,
  releaseDate: row.release_date,
  description: row.description,
  genre: row.genre,
});

const toArtist = (row) => ({
  id: row.id,
  name: row.name,
  artistImage: row.artist_image,
  bio: row.bio,
  genre: row.genre,
});

const findAlbum = async (id) => {
  const { rows } = await pool.query("SELECT * FROM albums WHERE id = $1", [id]);
  return rows[0] ? toAlbum(rows[0]) : null;
};

const findArtist = async (id) => {
  const { rows } = await pool.query("SELECT * FROM artists WHERE id = $1", [id]);
  return rows[0] ? toArtist(rows[0]) : null;
};

// ---- Auth ----

const DEV_EMAIL    = "dev@reviewmu.com";
const DEV_PASSWORD = "reviewmu123";
const activeSessions = new Set();

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// ---- Temporary in-memory review + discussion storage ----

const albumReviews = {};
const artistReviews = {};
const discussions = [];

// ---- DB init ----

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS artists (
      id           SERIAL  PRIMARY KEY,
      name         TEXT    NOT NULL,
      artist_image TEXT,
      bio          TEXT,
      genre        TEXT[]
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS albums (
      id           SERIAL  PRIMARY KEY,
      title        TEXT    NOT NULL,
      artist_id    INTEGER NOT NULL REFERENCES artists(id),
      album_cover  TEXT,
      release_date INTEGER,
      description  TEXT,
      genre        TEXT
    )
  `);

  const { rows: artistCount } = await pool.query("SELECT COUNT(*) FROM artists");
  if (parseInt(artistCount[0].count) === 0) {
    await pool.query(`
      INSERT INTO artists (id, name, artist_image, bio, genre) VALUES
      (1, 'Black Country New Road', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Black_Country%2C_New_Road_at_O2_Shepherd%27s_Bush_Empire.png', 'British Post-Rock Band',         ARRAY['Rock', 'Pop']),
      (2, 'Magdalena Bay',          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg',           'Upcoming Pop Duo',               ARRAY['Pop', 'Neo-Psychedelia']),
      (3, 'Geese',                  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Geese_%28Band%29_Philadelphia_August_2024.jpg/1280px-Geese_%28Band%29_Philadelphia_August_2024.jpg', 'Defying Indie Rock Band', ARRAY['Rock', 'Indie Rock']),
      (4, 'Daft Punk',              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Daft_Punk_in_2013_2-_centered.jpg/1280px-Daft_Punk_in_2013_2-_centered.jpg',             'Legendary French Electronic Duo', ARRAY['Electronic', 'French House']),
      (5, 'Kendrick Lamar',         'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/KendrickSZASPurs230725-144_%28cropped%29.jpg/960px-KendrickSZASPurs230725-144_%28cropped%29.jpg', 'Era Defining Rapper',  ARRAY['Hip-Hop', 'West Coast Hip-Hop']),
      (6, 'The Beatles',            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Beatles_1963_Dezo_Hoffman_Capitol_Records_press_photo_4-3_crop.jpg/1280px-The_Beatles_1963_Dezo_Hoffman_Capitol_Records_press_photo_4-3_crop.jpg', 'Influential Band', ARRAY['Pop', 'Rock'])
    `);
    await pool.query("SELECT setval('artists_id_seq', (SELECT MAX(id) FROM artists))");
  }

  const { rows: albumCount } = await pool.query("SELECT COUNT(*) FROM albums");
  if (parseInt(albumCount[0].count) === 0) {
    await pool.query(`
      INSERT INTO albums (id, title, artist_id, album_cover, release_date, description, genre) VALUES
      (1, 'Ants From Up There',  1, 'https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg',                                                                                                            2022, 'Critically acclaimed as one of the greatest albums of the 2020s', 'rock'),
      (2, 'Imaginal Disk',       2, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Magdalena_Bay_-_Imaginal_Disk.png',                                                                                                                              2024, 'The creator''s favorite pop record of all time!',               'pop'),
      (3, 'Getting Killed',      3, 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Geese_-_Getting_Killed.jpg/250px-Geese_-_Getting_Killed.jpg',                                                                                              2025, 'The creator''s favorite album of 2025',                         'rock'),
      (4, 'Discovery',           4, 'https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png',                                                                                                                                      2001, 'Best French House Record of All Time',                          'electronic'),
      (5, 'To Pimp A Butterfly', 5, 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png',                                                                                                                       2015, 'Best Hip-hop record of all time',                               'hip-hop'),
      (6, 'Abbey Road',          6, 'https://i0.wp.com/www.printmag.com/wp-content/uploads/2010/12/2a34d8_69a99099c2bf48bca36bf9c92253cb0bmv2.jpg?resize=500%2C500&quality=89&ssl=1',                                                                1969, 'Legendary and influential album',                                'pop'),
      (7, 'DAMN.',               5, 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png',                                                                                                                                      2017, 'One of Kendrick''s best conceptual albums',                     'hip-hop')
    `);
    await pool.query("SELECT setval('albums_id_seq', (SELECT MAX(id) FROM albums))");
  }
};

// ---- Auth routes ----

app.post("/login", (req, res) => {
  const email    = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");

  if (email !== DEV_EMAIL || password !== DEV_PASSWORD) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  activeSessions.add(token);
  res.json({ token });
});

app.post("/logout", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) activeSessions.delete(token);
  res.json({ ok: true });
});

// ---- Album routes ----

app.get("/albums", async (req, res) => {
  try {
    const { genre } = req.query;
    let result;

    if (genre) {
      const g = String(genre).trim().toLowerCase();
      result = await pool.query("SELECT * FROM albums WHERE LOWER(genre) = $1", [g]);
    } else {
      result = await pool.query("SELECT * FROM albums ORDER BY id");
    }

    res.json(result.rows.map(toAlbum));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/albums/:id", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id" });

    const album = await findAlbum(id);
    if (!album) return res.status(404).json({ error: "Album not found" });

    res.json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/albums", requireAuth, async (req, res) => {
  try {
    const title       = String(req.body?.title ?? "").trim();
    const artistId    = toInt(req.body?.artistId);
    const albumCover  = String(req.body?.albumCover ?? "").trim();
    const releaseDate = toInt(req.body?.releaseDate);
    const description = String(req.body?.description ?? "").trim();
    const genre       = String(req.body?.genre ?? "").trim().toLowerCase();

    if (!title)           return res.status(400).json({ error: "Title is required" });
    if (artistId === null) return res.status(400).json({ error: "Valid artist is required" });
    if (!(await findArtist(artistId))) return res.status(400).json({ error: "Artist not found" });

    const { rows } = await pool.query(
      `INSERT INTO albums (title, artist_id, album_cover, release_date, description, genre)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, artistId, albumCover || null, releaseDate, description || null, genre || null]
    );

    res.status(201).json(toAlbum(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/albums/:id/review", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id" });

    if (!(await findAlbum(id))) return res.status(404).json({ error: "Album not found" });

    res.json(albumReviews[id] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/albums/:id/review", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id" });
    if (!(await findAlbum(id))) return res.status(404).json({ error: "Album not found" });

    const userRating = Number(req.body?.userRating);
    const userReview = String(req.body?.userReview ?? "").trim();

    if (!clampRating(userRating)) {
      return res.status(400).json({ error: "Invalid Rating (Must Be Between 1-100)" });
    }

    albumReviews[id] = { userRating, userReview, updatedAt: Date.now() };
    res.status(201).json(albumReviews[id]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---- Artist routes ----

app.get("/artists", async (req, res) => {
  try {
    const { name } = req.query;
    let result;

    if (name) {
      const n = String(name).trim().toLowerCase();
      result = await pool.query("SELECT * FROM artists WHERE LOWER(name) LIKE $1 ORDER BY id", [`%${n}%`]);
    } else {
      result = await pool.query("SELECT * FROM artists ORDER BY id");
    }

    res.json(result.rows.map(toArtist));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/artists/:id", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid artist id" });

    const artist = await findArtist(id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    res.json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/artists/:id/albums", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid artist id" });
    if (!(await findArtist(id))) return res.status(404).json({ error: "Artist not found" });

    const { rows } = await pool.query("SELECT * FROM albums WHERE artist_id = $1 ORDER BY id", [id]);
    res.json(rows.map(toAlbum));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/artists/:id/review", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid artist id" });
    if (!(await findArtist(id))) return res.status(404).json({ error: "Artist not found" });

    res.json(artistReviews[id] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/artists/:id/review", async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid artist id" });
    if (!(await findArtist(id))) return res.status(404).json({ error: "Artist not found" });

    const artistRating = Number(req.body?.artistRating);
    const artistReview = String(req.body?.artistReview ?? "").trim();

    if (!clampRating(artistRating)) {
      return res.status(400).json({ error: "Invalid Rating (Must Be Between 1-100)" });
    }

    artistReviews[id] = { artistRating, artistReview, updatedAt: Date.now() };
    res.status(201).json(artistReviews[id]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---- Popular ----

const FAKE_LISTENERS = {
  7: 2847293,
  5: 2341108,
  4: 1893445,
  6: 1654221,
  2:  987332,
  1:  743891,
  3:  412547,
};
const DEFAULT_LISTENERS = 50000;

app.get("/popular", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM albums ORDER BY id");
    const withStats = rows
      .map((row) => ({
        ...toAlbum(row),
        weeklyListeners: FAKE_LISTENERS[row.id] ?? DEFAULT_LISTENERS,
      }))
      .sort((a, b) => b.weeklyListeners - a.weeklyListeners);

    res.json(withStats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---- Top rated ----

app.get("/toprated", async (req, res) => {
  try {
    const entries = await Promise.all(
      Object.entries(albumReviews).map(async ([albumId, review]) => {
        const album = await findAlbum(Number(albumId));
        return album ? { album, review } : null;
      })
    );

    res.json(entries.filter(Boolean).sort((a, b) => b.review.userRating - a.review.userRating));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---- Discussion routes ----

app.get("/discussions", (req, res) => {
  res.json([...discussions].sort((a, b) => b.createdAt - a.createdAt));
});

app.post("/discussions", (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  const subject = String(req.body?.subject ?? "").trim();
  const body = String(req.body?.body ?? "").trim();

  if (!title || !subject || !body) {
    return res.status(400).json({ error: "Please fill in Title, Subject, and Body." });
  }

  const discussion = { id: Date.now(), title, subject, body, createdAt: Date.now() };
  discussions.push(discussion);
  res.status(201).json(discussion);
});

// ---- Start ----

const PORT = process.env.PORT || 5000;

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err.message);
    process.exit(1);
  });
