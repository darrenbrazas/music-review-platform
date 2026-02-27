const express = require("express");
const cors = require("cors");

const app = express();

///////////////////////////////////////////////
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://darrenbrazas.github.io"
  ]
}));

app.use(express.json());
///////////////////////////////////////////////

//We use albums array before using dedicated postgreSQL database just for functionality for now

const albums = [
  {
    id: 1,
    title: "Ants From Up There",
    artistId: 1,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg",
    releaseDate: 2022,
    description: "Critially Acclaimed as one of the greatest albums of the 2020s",
    genre: "rock"
  },
  {
    id: 2,
    title: "Imaginal Disk",
    artistId: 2,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/4/4b/Magdalena_Bay_-_Imaginal_Disk.png",
    releaseDate: 2024,
    description: "The creators favorite pop record of all time!",
    genre: "pop"
  },
  {
    id: 3,
    title: "Getting Killed",
    artistId: 3,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Geese_-_Getting_Killed.jpg/250px-Geese_-_Getting_Killed.jpg",
    releaseDate: 2025,
    description: "The creators favorite album of 2025",
    genre: "rock"
  },
  {
    id: 4,
    title: "Discovery",
    artistId: 4,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
    releaseDate: 2001,
    description: "Best French House Record of All Time",
    genre: "electronic"
  },
  {
    id: 5,
    title: "To Pimp A Butterfly",
    artistId: 5,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
    releaseDate: 2015,
    description: "Best Hip-hop record of all time",
    genre: "hip-hop"
  },
  {
    id: 6,
    title: "Abbey Road",
    artistId: 6,
    albumCover: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Beatles_-_Abbey_Road.jpg/960px-Beatles_-_Abbey_Road.jpg",
    releaseDate: 1969,
    description: "Legendary and influential album",
    genre: "pop"
  },
  {
    id: 7,
    title: "DAMN.",
    artistId: 5,
    albumCover: "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
    releaseDate: 2017,
    description: "One of Kendrick's Bests Conceptual Albums",
    genre: "hip-hop"
  }


];

const artists = [

    {

      id: 1,
      name: "Black Country New Road",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Black_Country%2C_New_Road_at_O2_Shepherd%27s_Bush_Empire.png",
      bio: "British Post-Rock Band",
      genre: ["Rock", "Pop"]
      

    },

    {

      id: 2,
      name: "Magdalena Bay",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg",
      bio: "Upcoming Pop Duo",
      genre: ["Pop" , "Neo-Psychedelia"]
      

    },

    {

      id: 3,
      name: "Geese",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Geese_%28Band%29_Philadelphia_August_2024.jpg/1280px-Geese_%28Band%29_Philadelphia_August_2024.jpg",
      bio: "Defying Indie Rock Band",
      genre: ["Rock" , "Indie Rock"]
      

    },

    {

      id: 4,
      name: "Daft Punk",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Daft_Punk_in_2013_2-_centered.jpg/1280px-Daft_Punk_in_2013_2-_centered.jpg",
      bio: "Legendary French Electronic Duo",
      genre: ["Electronic" , "French House"]
      

    },

    {

      id: 5,
      name: "Kendrick Lamar",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/KendrickSZASPurs230725-144_%28cropped%29.jpg/960px-KendrickSZASPurs230725-144_%28cropped%29.jpg",
      bio: "Era Defining Rapper",
      genre: ["Hip-Hop" , "West Coast Hip-Hop"]
      

    },

    {

      id: 6,
      name: "The Beatles",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Beatles_1963_Dezo_Hoffman_Capitol_Records_press_photo_4-3_crop.jpg/1280px-The_Beatles_1963_Dezo_Hoffman_Capitol_Records_press_photo_4-3_crop.jpg",
      bio: "Influential Band",
      genre: ["Pop" , "Rock"]
      

    },

    

];


//Temporary Database

const albumReviews =  {};

const artistReviews = {};

const discussions = [];


const toInt = (value) => {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
};

const clampRating = (n) => Number.isFinite(n) && n >= 1 && n <= 100;

const findAlbum = (id) => albums.find((a) => a.id === id) || null;
const findArtist = (id) => artists.find((a) => a.id === id) || null;


//USE GET FOR ALBUMS

app.get("/albums", (req, res) => {
    

    const {genre} = req.query;

    if(genre){
        const g = String(genre).trim().toLowerCase();
        const filtered = albums.filter((a) => a.genre.toLowerCase() == g);

        return res.json(filtered);


    }

    res.json(albums);


});

//USE GET FOR INDIVIDUAL ALBUMS

app.get("/albums/:id", (req, res) => {

    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id" });

    const album = findAlbum(id);
    if (!album) return res.status(404).json({ error: "Album not found" });

    res.json(album);

});

//USE GET FOR INDIVIDUAL ALBUM REVIEWS

app.get("/albums/:id/review", (req, res) => {

    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id"});

    if (!findAlbum(id)) return res.status(404).json({ error: "Album not found" });

    res.json(albumReviews[id] || null);

});

//USE POST FOR INDIVIDUAL ALBUM REVIEWS

app.post("/albums/:id/review", (req, res) => {

    const id = toInt(req.params.id);
    if (id === null) return res.status(400).json({ error: "Invalid album id"});
    if (!findAlbum(id)) return res.status(404).json({ error: "Album not found" });

    const userRating = Number(req.body?.userRating);
    const userReview = String(req.body?.userReview).trim();

    if (!clampRating(userRating)) {
    return res.status(400).json({ error: "Invalid Rating (Must Be Between 1-100)" });
    }


    albumReviews[id] = {
        userRating,
        userReview,
        updatedAt: Date.now(),

    };

    res.status(201).json(albumReviews[id]);


});

//FOR ARTISTS

app.get("/artists", (req, res) => {

  const {name} = req.query;

  if(name){


    const n = String(name).trim().toLowerCase();
    const filtered = artists.filter((a) => a.name.toLowerCase().includes(n));

    return res.json(filtered);
  }

  res.json(artists);

});

//FOR INDIVIDUAL ARTIST ID USE GET

app.get("/artists/:id", (req, res) => {

  const id = toInt(req.params.id);
  if(id === null) return res.status(400).json({ error: "Invalid artist id"});

  const artist = findArtist(id);
  if(!artist) return res.status(404).json({ error: "Artist not Found"});

  res.json(artist);


});

//USE GET FOR ARTIST ALBUMS

app.get("/artists/:id/albums", (req, res) => {

  const id = toInt(req.params.id);
  if(id === null) return res.status(400).json({ error: "Invalid artist id"});
  
  if(!findArtist(id)) return res.status(404).json({ error: "Artist not Found"});

  const filtered = albums.filter((a) => a.artistId === id);
  res.json(filtered);

});

//USE GET FOR ARTIST REVIEWS

app.get("/artists/:id/review", (req, res) => {

  const id = toInt(req.params.id);
  if(id === null) return res.status(400).json({ error: "Invalid artist id"});

  if(!findArtist(id)) return res.status(404).json({ error: "Artist not Found"});

  res.json(artistReviews[id] || null);

});

app.post("/artists/:id/review", (req, res) => {


  const id = toInt(req.params.id);

  if(id === null) return res.status(400).json({ error: "Invalid artist id"});
  
  if(!findArtist(id)) return res.status(404).json({ error: "Artist not Found"});

  const artistRating = Number(req.body?.artistRating);
  const artistReview = String(req.body?.artistReview);

  if(!clampRating(artistRating)) return res.status(400).json({ error: "Invalid Rating (Must Be Between 1-100)"});


  artistReviews[id] = {

    artistRating,
    artistReview,
    updatedAt: Date.now(),
  }

  res.status(201).json(artistReviews[id]);



});

app.get("/toprated", (req, res) => {

  const rated = Object.entries(albumReviews).map(([albumId, review]) => {

    const album = findAlbum(Number(albumId));
    if(!album){

      return null;
    } 
    return {album, review};
  }).filter(Boolean).sort((a, b) => 


    b.review.userRating - a.review.userRating
  );

  res.json(rated);

});

// ---- Discussions ----

// GET /discussions
app.get("/discussions", (req, res) => {
  // newest first to match your UI behavior
  res.json([...discussions].sort((a, b) => b.createdAt - a.createdAt));
});

// POST /discussions
app.post("/discussions", (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  const subject = String(req.body?.subject ?? "").trim();
  const body = String(req.body?.body ?? "").trim();

  if (!title || !subject || !body) {
    return res.status(400).json({ error: "Please fill in Title, Subject, and Body." });
  }

  const discussion = {
    id: Date.now(),
    title,
    subject,
    body,
    createdAt: Date.now(),
  };

  discussions.push(discussion);
  res.status(201).json(discussion);
});


  








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});