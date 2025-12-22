
const albums = [

    {
        id: 1,
        title: "Ants From Up There",
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

    }






];


//****************************************************** */

//menu buttons

const genreBtn = document.getElementById("genre-menu-btn");
if (genreBtn) {
  genreBtn.addEventListener("click", () => {
    window.location.href = "genre.html";
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

if(albumContainer){

    albums.forEach( (album) => {


    //when linked is pressed
    const card = document.createElement("a");
    card.className = "album-space";
    card.href = `album.html?id=${album.id}`;

    //For actual album cover now

   const saved = JSON.parse(
  localStorage.getItem(`user-review-${album.id}`) || "null"
);

    const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";


    card.innerHTML = `
    
        <img src = "${album.albumCover}" alt = "${album.title} album cover">
        <h1>${album.title}</h1>
        <p>${album.artist}</p>
        <span class="rating">${ratingText}</span>
        
    `;



    albumContainer.appendChild(card);



    
    })





}




}

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









//***********// top rated page******** */


const displayTopRatedAlbums = () => {
  const albumContainer = document.getElementById("albums");
  
  if (!albumContainer) return;

  albumContainer.innerHTML = "";

  // 1) Build a new list that includes each album's saved review + numeric rating
  const ratedAlbums = albums
    .map((album) => {
      const saved = JSON.parse(
        localStorage.getItem(`user-review-${album.id}`) || "null"
      );

      const ratingNumber = saved ? Number(saved.userRating) : 0;

      return { album, saved, ratingNumber };
    })
    // 2) Only keep albums that have a real rating
    .filter((item) => item.ratingNumber > 0)
    // 3) Sort highest -> lowest
    .sort((a, b) => b.ratingNumber - a.ratingNumber);

  // 4) Render cards (same as your displayAlbums style)
  ratedAlbums.forEach((item) => {
    const album = item.album;
    const saved = item.saved;

    const card = document.createElement("a");
    card.className = "album-space";
    card.href = `album.html?id=${album.id}`;

    const ratingText = saved ? `★ ${saved.userRating}/100` : "Not rated";

    card.innerHTML = `
      <img src="${album.albumCover}" alt="${album.title} album cover">
      <h1>${album.title}</h1>
      <p>${album.artist}</p>
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

// ✅ guard so it doesn't crash on other pages
if (createDiscussionBtnEl && form) {
  createDiscussionBtnEl.addEventListener("click", () => {
    form.style.display = "block";
  });
}

if (discussionTitleEl && discussionSubjectEl && discussionBodyEl) {

  // ✅ FIX: plural name + consistent use
  const savedDiscussions = JSON.parse(localStorage.getItem("discussionsContainer") || "[]");

  const submitBtnEl = document.getElementById("submit-discussion-btn");

  if (submitBtnEl) {
    submitBtnEl.addEventListener("click", (e) => {
      e.preventDefault(); // ✅ prevents refresh if inside form

      const discussionTitle = discussionTitleEl.value.trim();
      const discussionSubject = discussionSubjectEl.value.trim();
      const discussionBody = discussionBodyEl.value.trim();

      // ✅ FIX: check all 3 values (you only checked 2, and checked .value wrong)
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

  // ✅ FIX: your HTML id is "discussions"
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

    // ✅ FIX: append to discussionEl (container didn't exist)
    discussionEl.appendChild(card);
  });
}

// ✅ call it on load (your filename check is okay if the file is truly discussion.html)
if (window.location.pathname.endsWith("discussion.html")) {
  displayDiscussions();
}
