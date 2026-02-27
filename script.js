

const APIBASE = "https://music-review-platform.onrender.com/albums";

//load the artists so that they can be used

let artistCache = {};

const loadArtists = () => {

  return fetch(`${APIBASE}/artists`)
  .then(res => {

    if(!res.ok) throw new Error("Could not load artists")

      return res.json();

  })
  .then(list => {

    artistCache = {};
    list.forEach(a => artistCache[a.id] = a);

  })


}

const getArtistById = (artistId) => {
  return artistCache[Number(artistId)] || null;
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

  fetch(`${APIBASE}/albums`)
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

    fetch(`${APIBASE}/albums/${album.id}/review`)
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
  loadArtists().then(displayAlbums).catch(console.error);
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

  loadArtists()
    .then(() => fetch(`${APIBASE}/albums/${id}`))
    .then(res => {
      if (!res.ok) throw new Error("Artist not found");
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

  fetch(`${APIBASE}/artists/${id}`)
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
    fetch(`${APIBASE}/albums/${id}/review`)
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

    fetch(`${APIBASE}/albums/${id}/review`, {
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

    fetch(`${APIBASE}/artists/${id}/review`)
    .then( (res) =>{

      if(!res.ok) return null;

      return res.json();

    })
    .then((saved) => {
    if (!saved) return;
    artistReviewEl.value = saved.artistReview ?? "";
    artistRatingEl.value = saved.artistRating ?? "";
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
      fetch(`${APIBASE}/artists/${id}/review` , {
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

  fetch(`${APIBASE}/artists/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Could not find artist");
      return res.json();
    })
    .then((artist) => {
      return fetch(`${APIBASE}/artists/${id}/albums`)
        .then((res) => {
          if (!res.ok) throw new Error("Could not load albums");
          return res.json();
        })
        .then((albums) => ({ artist, albums }));
    })
    .then(({ artist, albums }) => {
      if (!Array.isArray(albums) || albums.length === 0) {
        albumContainer.innerHTML = `<p>No albums were found</p>`;
        return;
      }

      albums.forEach((album) => {
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

          <span class="rating" id="rating-${album.id}">Not Rated</span>
        `;

        albumContainer.appendChild(card);

   
        fetch(`${APIBASE}/albums/${album.id}/review`)
          .then((res) => (res.ok ? res.json() : null))
          .then((review) => {
            const ratingEl = document.getElementById(`rating-${album.id}`);
            if (!ratingEl) return;

            ratingEl.textContent = review
              ? `★ ${review.userRating}/100`
              : "Not Rated";
          })
          .catch(console.error);
      });
    })
    .catch((err) => {
      console.error(err);
      albumContainer.innerHTML = `<p>Could not load artist albums</p>`;
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


    fetch(`${APIBASE}/albums?genre=${encodeURIComponent(genre)}`)
    .then( (res) => {

      if(!res.ok) throw new Error("Could not load albums")

        return res.json()
    }) 
    .then((genreFilteredAlbums) => {

      albumContainer.innerHTML = "";

      if(!Array.isArray(genreFilteredAlbums) || genreFilteredAlbums.length === 0){

        albumContainer.innerHTML = `<p>No albums were found</p>`;
        return;
      }

      genreFilteredAlbums.forEach((album) => {

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

        <span class="rating" id="rating-${album.id}">Not rated</span>
      `;

      albumContainer.appendChild(card);

      fetch(`${APIBASE}/albums/${album.id}/review`)
      .then((res) => {

        if(!res.ok) return null;

        return res.json();

      })
      .then((review) => {


        const ratingEl = document.getElementById(`rating-${album.id}`);

        if(!ratingEl) return;

        ratingEl.textContent = review
          ? `★ ${review.userRating}/100`
          : "Not rated";
      })
      .catch((err) => console.error(err));


        

      });
    })
    .catch((err) => {
      console.error(err);
      albumContainer.innerHTML = `<p>Could Not Load Albums</p>`
    });

   

  });
};

if (window.location.pathname.endsWith("genreSearch.html")) {
  loadArtists().then(displayGenreAlbums).catch(console.error);
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

fetch(`${APIBASE}/artists?name=${encodeURIComponent(query)}`)
.then((res) => {

  if(!res.ok) throw new Error("Could not find artist");

  return res.json();


})
.then((artistFiltered) => {


  artistContainer.innerHTML = "";

  if(!Array.isArray(artistFiltered) || artistFiltered.length === 0){


    artistContainer.innerHTML = `<p>No artists were found</p>`
    return;
  }


  artistFiltered.forEach((artist) => {

    const card = document.createElement("div");

 card.className = "artist-space";

 card.innerHTML = `
        <a class="artist-link" href="artist.html?id=${artist.id}">
          <img src="${artist.artistImage}" alt="${artist.name}">
          <h1>${artist.name}</h1>
        </a>


        <span class="rating" id="artist-rating-${artist.id}">Not rated</span>
      `;

      artistContainer.appendChild(card);


      fetch(`${APIBASE}/artists/${artist.id}/review`)
      .then((res) => {

        if(!res.ok) return null;

        return res.json();

      })
      .then((review) => {

        const ratingEl = document.getElementById(`artist-rating-${artist.id}`);

        if(!ratingEl) return;


        ratingEl.textContent = review
                ? `★ ${review.artistRating}/100`
                : "Not rated";

      })
      .catch((err) => console.error(err));



  });
})
.catch((err) => {

  console.error(err);

  artistContainer.innerHTML = `<p>Could Not Load Artists</p>`;

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

  fetch(`${APIBASE}/toprated`)
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
  loadArtists().then(displayTopRatedAlbums).catch(console.error);
}






/********************************************************* */

// Discussion (single copy)

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
const submitBtnEl = document.getElementById("submit-discussion-btn");

if (createDiscussionBtnEl && form) {
  createDiscussionBtnEl.addEventListener("click", () => {
    form.style.display = "block";
  });
}

const displayDiscussions = () => {
  const discussionEl = document.getElementById("discussions");
  if (!discussionEl) return;

  discussionEl.innerHTML = "<p>Loading...</p>";

  fetch(`${APIBASE}/discussions`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load discussions");
      return res.json();
    })
    .then((discussions) => {
      discussionEl.innerHTML = "";

      if (!Array.isArray(discussions) || discussions.length === 0) {
        discussionEl.innerHTML = `<p>There are no discussions yet...</p>`;
        return;
      }

      discussions.forEach((d) => {
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
    })
    .catch((err) => {
      console.error(err);
      discussionEl.innerHTML = "<p>Could not load discussions.</p>";
    });
};

if (submitBtnEl && discussionTitleEl && discussionSubjectEl && discussionBodyEl) {
  submitBtnEl.addEventListener("click", (e) => {
    e.preventDefault();

    const title = discussionTitleEl.value.trim();
    const subject = discussionSubjectEl.value.trim();
    const body = discussionBodyEl.value.trim();

    if (!title || !subject || !body) {
      alert("Please fill in Title, Subject, and Body.");
      return;
    }

    fetch(`${APIBASE}/discussions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subject, body }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data?.error || "Failed to create discussion");
          });
        }
        return res.json();
      })
      .then(() => {
        discussionTitleEl.value = "";
        discussionSubjectEl.value = "";
        discussionBodyEl.value = "";
        if (form) form.style.display = "none";
        displayDiscussions();
      })
      .catch((err) => {
        console.error(err);
        alert("Could not create discussion.");
      });
  });
}

if (window.location.pathname.endsWith("discussion.html")) {
  displayDiscussions();
}
