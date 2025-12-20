
const albums = [

    {
        id: 1,
        title: "Ants From Up There",
        artist: "Black Country New Road",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg",
        releaseDate: 2022,
        description: "Critially Acclaimed as one of the greatest albums of the 2020s"


    },
    {

        id: 2,
        title: "Imaginal Disk",
        artist: "Magdalena Bay",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/4/4b/Magdalena_Bay_-_Imaginal_Disk.png",
        releaseDate: 2024,
        description: "The creators favorite pop record of all time!"



    },
    {

        id: 3,
        title: "Getting Killed",
        artist: "Geese",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Geese_-_Getting_Killed.jpg/250px-Geese_-_Getting_Killed.jpg",
        releaseDate: 2025,
        description: "The creators favorite album of 2025"

    },
    {

        id: 4,
        title: "Discovery",
        artist: "Daft Punk",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
        releaseDate: 2001,
        description: "Best French House Record of All Time"


    },
    {

        id: 5,
        title: "To Pimp A Butterfly",
        artist: "Kendrick Lamar",
        albumCover: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
        releaseDate: 2015,
        description: "Best Hip-hop record of all time"


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

displayAlbums();
    


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


//****************************************************** */

//genre page 





//****************************************************** */



