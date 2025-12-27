
const albums = [

    {
        id: 1,
        title: "Ants From Up There",

        //get rid of artist name
        artist: "Black Country New Road",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg",
        releaseDate: 2022,
        description: "Critially Acclaimed as one of the greatest albums of the 2020s",
        genre: "rock"

    },
    {

        id: 2,
        title: "Imaginal Disk",
        artist: "Magdalena Bay",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/4/4b/Magdalena_Bay_-_Imaginal_Disk.png",
        releaseDate: 2024,
        description: "The creators favorite pop record of all time!",
        genre: "pop"



    },
    {

        id: 3,
        title: "Getting Killed",
        artist: "Geese",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Geese_-_Getting_Killed.jpg/250px-Geese_-_Getting_Killed.jpg",
        releaseDate: 2025,
        description: "The creators favorite album of 2025",
        genre: "rock"
    },
    {

        id: 4,
        title: "Discovery",
        artist: "Daft Punk",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
        releaseDate: 2001,
        description: "Best French House Record of All Time",
        genre: "electronic"

    },
    {

        id: 5,
        title: "To Pimp A Butterfly",
        artist: "Kendrick Lamar",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
        releaseDate: 2015,
        description: "Best Hip-hop record of all time",
        genre: "hip-hop"

    },
    {

        id: 6,
        title: "Abbey Road",
        artist: "The Beatles",
        albumCover: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Beatles_-_Abbey_Road.jpg/960px-Beatles_-_Abbey_Road.jpg",
        releaseDate: 1969,
        description: "Legendary and influential album",
        genre: "pop"


    }






];


//artists array


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
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg",
      bio: "Defying Indie Rock Band",
      genre: ["Rock" , "Indie Rock"]
      

    },

    {

      id: 4,
      name: "Daft Punk",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg",
      bio: "Legendary French Electronic Duo",
      genre: ["Electronic" , "French House"]
      

    },

    {

      id: 5,
      name: "Kendrick Lamar",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg",
      bio: "Upcoming Pop Duo",
      genre: ["Hip-Hop" , "West Coast Hip-Hop"]
      

    },

    {

      id: 6,
      name: "The Beatles",
      artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Magdalena_Bay_%2853775447004%29.jpg/1280px-Magdalena_Bay_%2853775447004%29.jpg",
      bio: "Upcoming Pop Duo",
      genre: ["Pop" , "Rock"]
      

    },

];

//home button

const homeBtn = document.querySelector(".home-btn");

if(homeBtn) {

  homeBtn.addEventListener("click", () => {


    window.location.href = "index.html";
  });

}


//****************************************************** */

//menu buttons

const artistBtn = document.getElementById("artist-menu-btn");
if(artistBtn) {
  artistBtn.addEventListener("click", () => {
    window.location.href = "artistSearch.html";
  });
}

const genreBtn = document.getElementById("genre-menu-btn");
if (genreBtn) {
  genreBtn.addEventListener("click", () => {
    window.location.href = "genreSearch.html";
  });
}

const topRatedBtn = document.getElementById("toprated-menu-btn");
if (topRatedBtn) {
  topRatedBtn.addEventListener("click", () => {
    window.location.href = "toprated.html";
  });
}

const popularBtn = document.getElementById("popular-menu-btn");
if (popularBtn) {
  popularBtn.addEventListener("click", () => {
    window.location.href = "popular.html";
  });
}

const discussionBtn = document.getElementById("discussion-menu-btn");
if (discussionBtn) {
  discussionBtn.addEventListener("click", () => {
    window.location.href = "discussion.html";
  });
}


//****************************************************** */


//showing each album featured

const displayAlbums = () => {
  const albumContainer = document.getElementById("albums");
  if (!albumContainer) return;

  albums.forEach((album) => {
    // wrapper card (NOT a link)
    const card = document.createElement("div");
    card.className = "album-space";

    const saved = JSON.parse(
      localStorage.getItem(`user-review-${album.id}`) || "null"
    );

    const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";

    // ONLY this link is clickable (image + title)

    const artist = artists.find(a => a.name === album.artist);


    card.innerHTML = `
      <a class="album-link" href="album.html?id=${album.id}">
        <img src="${album.albumCover}" alt="${album.title} album cover">
        <h1>${album.title}</h1>
      </a>
    
      <p class="artist-name"><a class="artist-link" href="artist.html?id=${artist.id}">
      ${artist.name}</a></p>
      <span class="rating">${ratingText}</span>
    `;

    albumContainer.appendChild(card);
  });
};




if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  displayAlbums();
}

    


//****************************************************** */

//individual album pages 

const albumCoverEl = document.getElementById("album-cover");
const albumTitleEl = document.getElementById("album-title");
const albumArtistEl = document.getElementById("artist");
const albumReleaseEl = document.getElementById("release-date");
const albumDescriptionEl = document.getElementById("album-description");

if(albumCoverEl && albumTitleEl && albumArtistEl && albumReleaseEl){


    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    


    const album = albums.find((a) => a.id === id);


    if(!album) {

        albumTitleEl.textContent = "Album Was Not Found";
        albumArtistEl.textContent = "";
        albumCoverEl.alt = "";
        albumCoverEl.src = "";
        albumReleaseEl.textContent = "";
        albumDescriptionEl.textContent = "";


    }else{

        albumTitleEl.textContent = album.title;
        albumArtistEl.textContent = album.artist;
        albumCoverEl.alt = `${album.title} album cover`;
        albumCoverEl.src = album.albumCover;
        albumReleaseEl.textContent = album.releaseDate;
        albumDescriptionEl.textContent = album.description;


    }  



}

//****************************************************** */

//individual artist pages


const artistImageEl = document.getElementById("artist-img");
const artistNameEl = document.getElementById("artist-name");
const artistGenreEl = document.getElementById("artist-genre");
const artistBioEl = document.getElementById("artist-bio");

if(artistImageEl && artistNameEl && artistGenreEl && artistBioEl){

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));


  const artist = artists.find((ar) => ar.id === id);

  if(!artist){


    artistNameEl.textContent = "Artist Was Not Found";
    artistImageEl.src = "";
    artistImageEl.alt = "";
    artistGenreEl.textContent = "";
    artistBioEl.textContent = "";
  }else{

    artistNameEl.textContent = artist.name;
    artistImageEl.src = artist.artistImage;
    artistImageEl.alt = `${artist.name} image`;
    artistGenreEl.textContent = artist.genre.join(", ");
    artistBioEl.textContent = artist.bio;



  }







}


//****************************************************** */

//create the rating mechanism now

const userRatingEl = document.getElementById("user-rating");
const userReviewEl = document.getElementById("user-review");
const saveReviewBtn = document.getElementById("save-review");
const saveMsg = document.getElementById("save-msg");


if(saveReviewBtn && userRatingEl && userReviewEl){

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");


    const saved = JSON.parse(localStorage.getItem(`user-review-${id}`) || "null");

    if(saved){

        userRatingEl.value = saved.userRating;
        userReviewEl.value = saved.userReview;


    }


    saveReviewBtn.addEventListener("click", () =>{

        const userRating = userRatingEl.value;
        const userReview = userReviewEl.value;

        if(userRatingEl.value < 1 || userRatingEl.value > 100 || !userRatingEl.value){

        saveMsg.textContent = "Invalid Rating (Must Be Between 1-100)";

        return;

    }


     //save the object

    localStorage.setItem(`user-review-${id}`, JSON.stringify({userRating, userReview}));

    saveMsg.textContent = "Review Was Successfully Saved!";



    });

    

}


//***************//genre page */

const displayGenreAlbums = () => {
  const albumContainer = document.getElementById("albums");
  const genreSearchTextEl = document.getElementById("genre-search-bar");
  const genreSearchBtn = document.getElementById("genre-search-btn");

  if (!albumContainer || !genreSearchTextEl || !genreSearchBtn) return;

  genreSearchBtn.addEventListener("click", () => {
    const genre = genreSearchTextEl.value.trim().toLowerCase();
    albumContainer.innerHTML = "";

    if (!genre) {
      albumContainer.innerHTML = `<p>Please Enter a genre.</p>`;
      return;
    }

    const genreFilteredAlbums = albums.filter(
      (album) => album.genre.toLowerCase() === genre
    );

    if (genreFilteredAlbums.length === 0) {
      albumContainer.innerHTML = `<p>No albums were found</p>`;
      return;
    }

    genreFilteredAlbums.forEach((album) => {
      const saved = JSON.parse(
        localStorage.getItem(`user-review-${album.id}`) || "null"
      );

      const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";

      const artist = artists.find(a => a.name === album.artist);
      const card = document.createElement("div");
      card.className = "album-space";

      card.innerHTML = `
        <a class="album-link" href="album.html?id=${album.id}">
          <img src="${album.albumCover}" alt="${album.title} album cover">
          <h1>${album.title}</h1>
        </a>

        <p class="artist-name"><a class="artist-link" href="artist.html?id=${artist.id}">
      ${artist.name}</a></p>
        <span class="rating">${ratingText}</span>
      `;

      albumContainer.appendChild(card);
    });
  });
};




if(window.location.pathname.endsWith("genreSearch.html")){
  
  
  displayGenreAlbums();

}




//***********// top rated page******** */


const displayTopRatedAlbums = () => {
  const albumContainer = document.getElementById("albums");
  if (!albumContainer) return;

  albumContainer.innerHTML = "";

  const ratedAlbums = albums
    .map((album) => {
      const saved = JSON.parse(
        localStorage.getItem(`user-review-${album.id}`) || "null"
      );

      const ratingNumber = saved ? Number(saved.userRating) : 0;

      return { album, saved, ratingNumber };
    })
    .filter((item) => item.ratingNumber > 0)
    .sort((a, b) => b.ratingNumber - a.ratingNumber);

  ratedAlbums.forEach((item) => {
    const album = item.album;
    const saved = item.saved;

    const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";

    const artist = artists.find(a => a.name === album.artist);

    
    const card = document.createElement("div");
    card.className = "album-space";

  
    card.innerHTML = `
      <a class="album-link" href="album.html?id=${album.id}">
        <img src="${album.albumCover}" alt="${album.title} album cover">
        <h1>${album.title}</h1>
      </a>

      <p class="artist-name"><a class="artist-link" href="artist.html?id=${artist.id}">
      ${artist.name}</a></p>
      <span class="rating">${ratingText}</span>
    `;

    albumContainer.appendChild(card);
  });
};





// only run on toprated.html
if (window.location.pathname.endsWith("toprated.html")) {
  displayTopRatedAlbums();
}





/********************************************************* */

//Discussion

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[ch]));
}

const form = document.getElementById("create-discussion-form");
const createDiscussionBtnEl = document.getElementById("discussion-create-btn");
const discussionTitleEl = document.getElementById("discussion-title");
const discussionSubjectEl = document.getElementById("discussion-subject");
const discussionBodyEl = document.getElementById("discussion-body");


if (createDiscussionBtnEl && form) {
  createDiscussionBtnEl.addEventListener("click", () => {
    form.style.display = "block";
  });
}

if (discussionTitleEl && discussionSubjectEl && discussionBodyEl) {


  const savedDiscussions = JSON.parse(localStorage.getItem("discussionsContainer") || "[]");

  const submitBtnEl = document.getElementById("submit-discussion-btn");

  if (submitBtnEl) {
    submitBtnEl.addEventListener("click", (e) => {
      e.preventDefault(); 

      const discussionTitle = discussionTitleEl.value.trim();
      const discussionSubject = discussionSubjectEl.value.trim();
      const discussionBody = discussionBodyEl.value.trim();

      if (!discussionTitle || !discussionSubject || !discussionBody) {
        alert("Please fill in Title, Subject, and Body.");
        return;
      }

      savedDiscussions.push({
        title: discussionTitle,
        subject: discussionSubject,
        body: discussionBody,
        createdAt: Date.now()
      });

      localStorage.setItem("discussionsContainer", JSON.stringify(savedDiscussions));

      form.style.display = "none";

      displayDiscussions();
    });
  }
}

//somehow tell the html to display all the existing discussions and also implement a create discussion

const displayDiscussions = () => {


  const discussionEl = document.getElementById("discussions");
  if (!discussionEl) return;

  const discussions = JSON.parse(localStorage.getItem("discussionsContainer") || "[]");

  discussionEl.innerHTML = "";

  if (discussions.length === 0) {
    discussionEl.innerHTML = `<p>There are no discussions yet, please create one!</p>`;
    return;
  }

  discussions.slice().reverse().forEach((d) => {
    const card = document.createElement("div");
    card.className = "discussion-card";

    card.innerHTML = `
      <h3>${escapeHTML(d.title)}</h3>
      <p><strong>${escapeHTML(d.subject)}</strong></p>
      <p>${escapeHTML(d.body)}</p>
      <small>${new Date(d.createdAt).toLocaleString()}</small>
    `;

    
    discussionEl.appendChild(card);
  });
}


if (window.location.pathname.endsWith("discussion.html")) {
  displayDiscussions();
}
