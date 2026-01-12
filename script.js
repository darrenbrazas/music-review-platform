
const APIBASE = "http://localhost:3000";
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

const getArtistById = (artistId) => {
  return artists.find(a => a.id === Number(artistId)) || null;
};





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

const displayAlbums = () => {
  const albumContainer = document.getElementById("albums");
  if (!albumContainer) return;

  fetch("http://localhost:5000/albums")
  .then(res => res.json())
  .then(albums => {
    
    albums.forEach((album) => {
    const card = document.createElement("div");
    card.className = "album-space";


    const artist = getArtistById(album.artistId);

    card.innerHTML = `
      <a class="album-link" href="album.html?id=${album.id}">
        <img src="${album.albumCover}" alt="${album.title} album cover">
        <h1>${album.title}</h1>
      </a>

      <p class="artist-name">
        ${
          artist
            ? `<a class="artist-link" href="artist.html?id=${artist.id}">${artist.name}</a>`
            : `<span class="artist-link">Unknown Artist</span>`
        }
      </p>

      <span class="rating" id="rating-${album.id}">Not Rated</span>
    `;

    albumContainer.appendChild(card);

    fetch(`http://localhost:5000/albums/${album.id}/review`)
    .then((res) => {

      if(!res.ok) return null;

      return res.json();

    })
    .then((review) => {

      const ratingEl = document.getElementById(`rating-${album.id}`);
            if (!ratingEl) return;

            ratingEl.textContent = review ? `★ ${review.userRating}/100` : "Not rated";

    })
    .catch( (err) => {

      console.error(err);
    })
  });

})
.catch((err) => {

  console.error(err);
  albumContainer.innerHTML = `<p>Could Not Load Albums</p>`;

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

if (albumCoverEl && albumTitleEl && albumArtistEl && albumReleaseEl) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  // Fetch from backend API instead of local array
  fetch(`http://localhost:5000/albums/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Album not found");
      return res.json();
    })
    .then(album => {
      const artist = getArtistById(album.artistId);

      albumTitleEl.textContent = album.title;
      albumArtistEl.textContent = artist ? artist.name : "Unknown Artist";
      albumCoverEl.alt = `${album.title} album cover`;
      albumCoverEl.src = album.albumCover;
      albumReleaseEl.textContent = album.releaseDate;
      albumDescriptionEl.textContent = album.description;
    })
    .catch(err => {
      albumTitleEl.textContent = "Album Was Not Found";
      albumArtistEl.textContent = "";
      albumCoverEl.alt = "";
      albumCoverEl.src = "";
      albumReleaseEl.textContent = "";
      albumDescriptionEl.textContent = "";
      console.error(err);
    });
}




//****************************************************** */

//individual artist pages


//individual artist pages

const artistImageEl = document.getElementById("artist-img");
const artistNameEl = document.getElementById("artist-name");
const artistGenreEl = document.getElementById("artist-genre");
const artistBioEl = document.getElementById("artist-bio");

if (artistImageEl && artistNameEl && artistGenreEl && artistBioEl) {

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  //const artist = getArtistById(id);

  fetch(`http://localhost:5000/artists/${id}`)
    .then(res => {

      if (!res.ok) throw new Error("Album Not Found");
      return res.json();

    })
    .then(artist => {

    artistNameEl.textContent = artist.name;
    artistImageEl.src = artist.artistImage;
    artistImageEl.alt = `${artist.name} image`;
    artistGenreEl.textContent = artist.genre.join(", ");
    artistBioEl.textContent = artist.bio;



    })
    .catch(err => {

    artistNameEl.textContent = "Artist Was Not Found";
    artistImageEl.src = "";
    artistImageEl.alt = "";
    artistGenreEl.textContent = "";
    artistBioEl.textContent = "";
    console.error(err)



    });

}



//****************************************************** */

//create the album rating mechanism now

const userRatingEl = document.getElementById("user-rating");
const userReviewEl = document.getElementById("user-review");
const saveReviewBtn = document.getElementById("save-review");
const saveMsg = document.getElementById("save-msg");


if(saveReviewBtn && userRatingEl && userReviewEl){

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");



    //load saved data
    fetch(`http://localhost:5000/albums/${id}/review`)
    .then((res) =>{
        if(!res.ok) return null;

        return res.json();

    })
    .then((saved) => {
      if(saved){

        userRatingEl.value = saved.userRating ?? "";
        userReviewEl.value = saved.userReview ?? "";

      }


    })
    .catch((err) => {

      console.error(err);

    });


    saveReviewBtn.addEventListener("click", () =>{

        const userRating = userRatingEl.value;
        const userReview = userReviewEl.value;

        if(userRatingEl.value < 1 || userRatingEl.value > 100 || !userRatingEl.value){

        saveMsg.textContent = "Invalid Rating (Must Be Between 1-100)";

        return;

    }


     //save the object

    fetch(`http://localhost:5000/albums/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userRating, userReview }),
    })
    .then((res) => {

      if(!res.ok) {

        return res.json().then((data) => {

          throw new Error("Failed to save review.");
        });


      }

      return res.json();

    })
    .then(() => {
      saveMsg.textContent = "Review Was Successfully Saved!";
    })
    .catch((err) => {

      console.error(err);
      saveMsg.textContent = "Review Was Not Saved!";
    })


    });

    

}

//****************************************************** */

//create artist rating mechanism now

const artistRatingEl = document.getElementById("artist-rating");
const artistReviewEl = document.getElementById("artist-review");
const saveArtistReviewBtn = document.getElementById("save-artist-review");
const saveArtistReviewMsg = document.getElementById("save-artist-msg");


if(artistRatingEl && artistReviewEl && saveArtistReviewBtn){

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`http://localhost/artist/${id}/review`)
    .then( (res) =>{

      if(!res.ok) return null;

      return res.json();

    })
    .then((saved) => {


      artistReviewEl.value = saved.userReview ?? "";
      artistRatingEl.value = saved.userRating ?? "";
    })
    .catch((err) => {

      console.error(err);

    })



    saveArtistReviewBtn.addEventListener("click", () => {

      const artistRating = artistRatingEl.value;
      const artistReview = artistReviewEl.value;

      if(artistRatingEl.value < 1 || artistRatingEl.value > 100){

        saveArtistReviewMsg.textContent = "Invalid Rating (Must Be Between 1-100)";

        return;
      }


      //save the data
      fetch(`http://localhost/artist/${id}/review` , {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({artistRating, artistReview})
      })
      .then((res) => {

        if(!res.ok){

          return res.json().then((data) => {

          throw new Error("Failed to save review.");
        });

        }

        return res.json();

      })
      .then(() => {

        saveArtistReviewMsg.textContent = "Review Was Successfully Saved!";

      })
      .catch((err) => {

        console.error(err);
        saveArtistReviewMsg.textContent = "Review Was Not Saved!";
      });
    });


}

//****************************************************** */

//displaying albums on artist page

//displaying albums on artist page

const displayArtistAlbums = () => {
  const albumContainer = document.getElementById("artist-albums");
  if (!albumContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  albumContainer.innerHTML = "";

  if (!id) {
    albumContainer.innerHTML = `<p>Artist was not found.</p>`;
    return;
  }

  const artist = getArtistById(id);

  if (!artist) {
    albumContainer.innerHTML = `<p>Artist was not found.</p>`;
    return;
  }

  const artistFilteredAlbums = albums.filter(
    (album) => album.artistId === artist.id
  );

  if (artistFilteredAlbums.length === 0) {
    albumContainer.innerHTML = `<p>No albums were found</p>`;
    return;
  }

  artistFilteredAlbums.forEach((album) => {
    const saved = JSON.parse(
      localStorage.getItem(`user-review-${album.id}`) || "null"
    );

    const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";

    const card = document.createElement("div");
    card.className = "artist-album-space";



    card.innerHTML = `
      
      <a class="album-link" href="album.html?id=${album.id}">
        <img src="${album.albumCover}" alt="${album.title} album cover">
        <h1>${album.title}</h1>
      </a>

      <p class="artist-name">
        <a class="artist-link" href="artist.html?id=${artist.id}">
          ${artist.name}
        </a>
      </p>

      <span class="rating">${ratingText}</span>
    `;

    albumContainer.appendChild(card);
  });
};

if (window.location.pathname.endsWith("artist.html")) {
  displayArtistAlbums();
}




//****************************************************** */




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

      const artist = getArtistById(album.artistId);

      const card = document.createElement("div");
      card.className = "album-space";

      card.innerHTML = `
        <a class="album-link" href="album.html?id=${album.id}">
          <img src="${album.albumCover}" alt="${album.title} album cover">
          <h1>${album.title}</h1>
        </a>

        <p class="artist-name">
          ${
            artist
              ? `<a class="artist-link" href="artist.html?id=${artist.id}">${artist.name}</a>`
              : `<span class="artist-link">Unknown Artist</span>`
          }
        </p>

        <span class="rating">${ratingText}</span>
      `;

      albumContainer.appendChild(card);
    });
  });
};

if (window.location.pathname.endsWith("genreSearch.html")) {
  displayGenreAlbums();
}

//****************************************************** */


//***************//artist search page 

const displayArtists = () => {

const artistContainer = document.getElementById("artist");
const artistSearchEl = document.getElementById("artist-search-bar");
const artistSearchBtn = document.getElementById("artist-search-btn");

if(!artistContainer || !artistSearchEl || !artistSearchBtn) return;

artistSearchBtn.addEventListener("click", () => {

  const query = artistSearchEl.value.trim().toLowerCase();
  artistContainer.innerHTML = "";

  if (!query) {
  artistContainer.innerHTML = `<p>Please Enter An Artist Name</p>`;
  return;
}


 const artistFiltered = artists.filter((a) => a.name.toLowerCase() === query);

if(artistFiltered.length === 0){

artistContainer.innerHTML = `<p>No Artists Were Found</p>`;

  return;
}

artistFiltered.forEach((artist) => {

 const saved = JSON.parse(localStorage.getItem(`artist-review-${artist.id}`) || "null");

 const ratingText = saved ? `★ ${saved.artistRating}/100` : "Not rated";

 const card = document.createElement("div");

 card.className = "artist-space";

 card.innerHTML = `
        <a class="artist-link" href="artist.html?id=${artist.id}">
          <img src="${artist.artistImage}" alt="${artist.name}">
          <h1>${artist.name}</h1>
        </a>


        <span class="rating">${ratingText}</span>
      `;

      artistContainer.appendChild(card);

});


});

}

if (window.location.pathname.endsWith("artistSearch.html")){

  displayArtists();
}



//***********// top rated page******** */


const displayTopRatedAlbums = () => {
  const albumContainer = document.getElementById("albums");
  if (!albumContainer) return;

  albumContainer.innerHTML = "";

  fetch(`http://localhost:5000/toprated`)
  .then((res) => {

      if (!res.ok) throw new Error("Album Not Found");
      return res.json();

  })
  .then((ratedAlbums) => {
      if (!Array.isArray(ratedAlbums) || ratedAlbums.length === 0) {
        albumContainer.innerHTML = `<p>No rated albums yet.</p>`;
        return;
      }

      ratedAlbums.forEach((item) => {
    const album = item.album;
    const review = item.review;

    const ratingText = review ? `★ ${review.userRating}/100` : "Not rated";

    const artist = getArtistById(album.artistId);

    const card = document.createElement("div");
    card.className = "album-space";

    card.innerHTML = `
      <a class="album-link" href="album.html?id=${album.id}">
        <img src="${album.albumCover}" alt="${album.title} album cover">
        <h1>${album.title}</h1>
      </a>

      <p class="artist-name">
        ${
          artist
            ? `<a class="artist-link" href="artist.html?id=${artist.id}">${artist.name}</a>`
            : `<span class="artist-link">Unknown Artist</span>`
        }
      </p>

      <span class="rating">${ratingText}</span>
    `;

    albumContainer.appendChild(card);

  });

  
  })
  .catch((err) => {

    console.error(err);
    albumContainer.innerHTML = `<p>Could Not Load Top Rated Albums</p>`;


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
