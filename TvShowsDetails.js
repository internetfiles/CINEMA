const posterBig = document.querySelector(".poster_big");
const movieDetailnavContainer = document.querySelector(".movieDetailnavContainer");
const gradient = document.querySelector(".gradient");
const posterBigImg = document.querySelector(".poster_big_img");
const posterBBig = document.querySelector(".posterbig");
const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightArrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const movieDetailsAboutCategoryUl = document.querySelector(".movie_details_about_category_ul");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavChildContainer = document.querySelector(".sidenav_child_container");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const recommendationMoviesDiv = document.querySelector(".recommendation_movies_div");
const SimilarMoviesDiv = document.querySelector(".Similar_movies_div");
const Casdiv = document.querySelector(".Casdiv");
const menuulLI = document.querySelectorAll(".menu_ul li");
const Trailer_section = document.querySelector(".Trailer_section");
const NowPlayingTvShowsDiv = document.querySelector(".Now_playing_tvshows_div"); // Added for TV shows

// Rest of your code remains unchanged...

// Update leftArrow event listener
leftArrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.classList.contains("Now_playing_tvshows")) { // Check if it's for TV shows
      Sidescroll(NowPlayingTvShowsDiv, "left", 2, 500, 15); // Update to NowPlayingTvShowsDiv
    } else { // Otherwise, it's for movies
      Sidescroll(NowPlayingMoviesDiv, "left", 2, 500, 15);
    }
  })
);

// Update rightArrow event listener
rightArrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.classList.contains("Now_playing_tvshows")) { // Check if it's for TV shows
      Sidescroll(NowPlayingTvShowsDiv, "right", 2, 500, 15); // Update to NowPlayingTvShowsDiv
    } else { // Otherwise, it's for movies
      Sidescroll(NowPlayingMoviesDiv, "right", 2, 500, 15);
    }
  })
);

// Update event listener for TV show elements
NowPlayingTvShowsDiv.addEventListener("click", tvShowId);
