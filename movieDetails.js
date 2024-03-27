const posterBig = document.querySelector(".poster_big");
const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);
const gradient = document.querySelector(".gradient");
const posterBigImg = document.querySelector(".poster_big_img");
const posterBBig = document.querySelector(".posterbig");
const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const movieDetailsAboutCategoryUl = document.querySelector(
  ".movie_details_about_category_ul"
);
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavChildContainer = document.querySelector(
  ".sidenav_child_container"
);
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const recommendationMoviesDiv = document.querySelector(
  ".recommendation_movies_div"
);
const SimilarMoviesDiv = document.querySelector(".Similar_movies_div");
const Casdiv = document.querySelector(".Casdiv");
const preLoader = document.querySelector(".preloader");
const Trailer_section = document.querySelector(".Trailer_section");
const reccomendation = document.querySelector(".reccomendation");

window.addEventListener("load", function () {
  preLoader.style.display = "none";
});

const Castfun = (castee) => {
  let url = "./personDetail.html?id=" + encodeURIComponent(castee.id);
  return `<div class="Now_playing_movies castdiv" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${castee.id}" src="https://image.tmdb.org/t/p/w500/${castee.profile_path}"
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
         loading="lazy" alt="${castee.original_name}"></a>
        <div class="name_character_container">
         <p class="movie_title">${castee.original_name}</p>
         <div class="date_rating casteecharacter" >
         ${castee.character}
             </div>
             </div>
         </div>`;
};

 // Function to get and set scroll position
    function saveScrollPosition() {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    }

    function restoreScrollPosition() {
      var scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    }

    // Call restoreScrollPosition when the page loads
    restoreScrollPosition();

    // Change iframe source
    function changeSource(sourceUrl) {
      var iframe = document.getElementById('iframe-embed');
      iframe.src = sourceUrl;
      saveScrollPosition(); // Save scroll position before refresh
      var dropdown = document.getElementById("sourceDropdowna");
      dropdown.classList.remove("show"); // Hide dropdown after selecting a source
    }

    // Toggle dropdown visibility
    function toggleDropdown() {
      var dropdown = document.getElementById("sourceDropdowna");
      dropdown.classList.toggle("show");
      if (dropdown.classList.contains('show')) {
        document.getElementById("sourceButtona").addEventListener('click', showSources);
      } else {
        document.getElementById("sourceButtona").removeEventListener('click', showSources);
      }
    }

    // Show dropdown on button click
    function showSources() {
      var dropdown = document.getElementById("sourceDropdowna");
      dropdown.classList.add("show");
      document.getElementById("sourceButtona").removeEventListener('click', showSources);
    }

    // Fetch movie ID from URL
    let url = document.location.href;
    let fetcid = url.slice(url.indexOf("=") + 1);

    // Call the Trailerfunc with the fetched movie ID
    document.write(Trailerfunc(fetcid));

    // Function to embed trailer
    function Trailerfunc(id) {
      return `
        <div style="display:block; margin:0 auto;" class="youtubePlayer" id="iframe-container" style="text-align:center;">
          <div class="dropdown">
            <div style="text-align: center;">
                <button id="sourceButtona" onclick="toggleDropdown()" class="dropbtn">Select Server</button>
            </div>
            <div id="sourceDropdowna" class="dropdown-content">
              <a href="#" onclick="changeSource('https://vidsrc.xyz/embed/movie/${id}?sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en,de')">Server 1</a>
              <a href="#" onclick="changeSource('https://vidsrc.to/embed/movie/${id}')">Server2</a>
            </div>
          </div>
          <iframe style="display:block; margin:0 auto;" id="iframe-embed" width="100%" height="100%" scrolling="no" frameborder="0" class="youtubePlayer" src="https://vidsrc.xyz/embed/movie/${id}?sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en,de" allowfullscreen="true" webkitallowfullscreen="true" referrerpolicy="origin" mozallowfullscreen="true"></iframe>
        </div>
      `;
    }

    // Define the movieLoad function
    const movieLoad = function () {
      let trailerHtml = Trailerfunc(fetcid);
      Trailer_section.innerHTML = trailerHtml;
      CurrMovie(fetcid).then((dat) => {
        let htm = "";
        htm = html2(dat);
        movieDetails.innerHTML = htm;
        let BigPoster = Bigposter(dat);
        posterBBig.innerHTML = BigPoster;
        sectionStory.textContent = dat.overview;
        let castarr = dat.credits.cast;
        if (castarr.length > 10) {
          let NewCastarr = castarr.slice(0, 10);
          NewCastarr.forEach((item) => {
            if (item.profile_path !== null) {
              const castehtml = Castfun(item);
              // Append the castehtml to a container in your HTML
              // For example:
              // containerElement.appendChild(castehtml);
            }
          });
        }
      });
    };

    // Call movieLoad function when the page loads
    window.addEventListener('load', movieLoad);

searchbox.addEventListener("click", function () {
  location.replace("./search.html");
});

hamburgerPhone.addEventListener("click", function () {
  sidenavChildContainer.classList.add("sidenav_container_active");
  overlaySideNavabar.classList.add("sidenav_container_active");
  hamburgerPhone.classList.add("hamburgerphonedeactive");
});
overlaySideNavabar.addEventListener("click", function () {
  sidenavChildContainer.classList.remove("sidenav_container_active");
  overlaySideNavabar.classList.remove("sidenav_container_active");
  document.body.classList.remove("minimize_siderbar");
  hamburgerPhone.classList.remove("hamburgerphonedeactive");
});

window.addEventListener("scroll", function () {
  let intiCon = posterBBig.getBoundingClientRect();
  if (window.scrollY > intiCon.height - 150) {
    movieDetailnavContainer.classList.add("bgadd");
  } else {
    movieDetailnavContainer.classList.remove("bgadd");
  }
});

/* Trailer Player */

function openModal() {
  // Extract movie ID from the page URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  // If movie ID exists in the URL
  if (movieId) {
    fetchMovieTrailer(movieId);
    document.getElementById('myModal').style.display = "block"; // Display the modal
  } else {
    document.getElementById('modalMessage').innerText = 'Movie ID not found in the URL.'; // Display message in modal
  }
}

// Function to close the modal
function closeModal() {
  document.getElementById('myModal').style.display = "none"; // Hide the modal
  document.getElementById('myFrame').src = ''; // Reset the iframe src attribute to stop the video
  document.getElementById('modalMessage').innerText = ''; // Clear modal message
}

// Function to fetch movie trailer
function fetchMovieTrailer(movieId) {
  fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=3754bca4db6bbf31b3d71ca72cdd0f2b&append_to_response=videos')
    .then(response => response.json())
    .then(data => {
      const trailer = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        const trailerUrl = 'https://www.youtube.com/embed/' + trailer.key + '?autoplay=1'; // Append autoplay=1 to play the trailer automatically
        document.getElementById('myFrame').src = trailerUrl;
        const trailerTitle = data.title; // Get the title of the trailer
        document.querySelector('.modal-content h2').innerText = trailerTitle; // Set the modal title
      } else {
        document.getElementById('modalMessage').innerText = 'Trailer not found.'; // Display message in modal
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('modalMessage').innerText = 'Error fetching movie data. Please try again later.'; // Display message in modal
    });
}

// Attach the openModal function to the button click event
document.querySelector('.switch-button').addEventListener('click', openModal);



lightDarkmode.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains(`light`)) {
    localStorage.setItem(`theme`, `light`);
  } else {
    localStorage.setItem(`theme`, `dark`);
  }
});

function settheme() {
  let currtheme = localStorage.getItem("theme");
  if (currtheme == "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

settheme();

arrowLeft.addEventListener("click", function () {
  document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
  document.body.classList.add("minimize_siderbar");
});

const myApi = "6b2dec73b6697866a50cdaef60ccffcb";

const NowPlaying = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=1`
  );
  const data = await res.json();
  const NowPlayingmovies = data.results;
  return NowPlayingmovies;
};

//<a class="posterlink" href="./movieDetail.html"></a>//
const NowPlayingfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="Now_playing_movies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
         loading="lazy"  alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${
               movie.vote_average
             }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

const dateFormatter = function (date) {
  let currdate = date;
  const newDate = currdate.slice(0, 4);
  return newDate;
};

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

NowPlaying().then((movies) => {
  movies.forEach((moviee) => {
    const htmll = NowPlayingfun(moviee);
    NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
  NowPlayingMovies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

const Sidescroll = function (element, direction, speed, distance, step) {
  scrollAmount = 0;
  let slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
};

leftArrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplayin") {
      Sidescroll(NowPlayingMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "recommenn") {
      Sidescroll(recommendationMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "Similarovie") {
      Sidescroll(SimilarMoviesDiv, "left", 2, 500, 15);
    }
    if (item.parentElement.id == "cast_con") {
      Sidescroll(Casdiv, "left", 2, 500, 15);
    }
  })
);

rightarrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplayin") {
      Sidescroll(NowPlayingMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "recommenn") {
      Sidescroll(recommendationMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "Similarovie") {
      Sidescroll(SimilarMoviesDiv, "right", 2, 500, 15);
    }
    if (item.parentElement.id == "cast_con") {
      Sidescroll(Casdiv, "right", 2, 500, 15);
    }
  })
);

/* MOVIE CLCIKED*/

const html2 = function (moviee) {
  document.title = `${
    moviee.title +
    " " +
    "(" +
    dateFormatter(moviee.release_date) +
    ")" +
    " " +
    "|" +
    " " +
    "Munowatch"
  }`;

  let cate = "";
  moviee.genres.forEach((item) => {
    cate += `<li class="movie_details_category_ul_li">${item.name}</li>`;
  });
  return `<div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w500/${
      moviee.poster_path
    }"
    onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
     alt="title">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${moviee.title}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
            ${cate}
            </ul>
        </div>
        <div class="date_rating">
            <p class="time">${
              moviee.runtime
            } minutes</p><span class="dot dot2"></span>
            <p class="date">${
              moviee.release_date
            }</p><span class="dot dot2"></span>
            <p class="rating">${averagVoteformat(
              moviee.vote_average
            )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
                
            <div class="playButtonContainer"> 
            <span > <a class="GoogleButton" href="https://damagecontributionexcessive.com/ku0a4f9m8?key=b9efe2a691b31ec00526f1c2d77da2e2" >Fast Download</a> </span> 
            </div>
            
             <div class="playButtonContainer"> <span> <a class="GoogleButton" href='https://t.me/SweetMoviePirate'>Join Telegram</a></span> 
            </div>                       
</div>

</div> `;
};

const Bigposter = function (movieee) {
  return `<img class="poster_big_img" src="https://image.tmdb.org/t/p/original/${movieee.backdrop_path}" alt="">`;
};

const CurrMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=680c99274ddab12ffac27271d9445d45&append_to_response=credits`
  );

  const data = await res.json();
  return data;
};

movieLoad();

const recomMOvie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${myApi}`
  );
  const data = await res.json();
  const recommendationMovies = data.results;

  return recommendationMovies;
};

const SimilarMOvie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${myApi}`
  );
  const data = await res.json();
  const SimilarMovies = data.results;
  return SimilarMovies;
};

const recommMovieFun = (mov) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(mov.id);
  return `<div class="Now_playing_movies recommenMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    mov.id
  }" src="https://image.tmdb.org/t/p/w500/${mov.poster_path}" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
        loading="lazy" alt="${mov.title}"></a>
         <p class="movie_title">${mov.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               mov.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(
               mov.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

const simimarMoviefun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="Now_playing_movies similarMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
        onerror="this.onerror=null;this.src='./resources/D moviesand tv show.png';"
        loading="lazy" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};

recomMOvie(fetcid).then((movies) => {
  if (movies.length == 0) {
    reccomendation.style.display = "none";
  } else {
    movies.forEach((moviee) => {
      const html3 = recommMovieFun(moviee);
      recommendationMoviesDiv.insertAdjacentHTML("beforeend", html3);
    });

    const recommenMovies = document.querySelectorAll(".recommenMovies");
    recommenMovies.forEach(
      (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );
  }
});

SimilarMOvie(fetcid).then((movies) => {
  movies.forEach((moviee) => {
    const htmll = simimarMoviefun(moviee);
    SimilarMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const similarMovies = document.querySelectorAll(".similarMovies");
  similarMovies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

const movieId = function (e) {
  let ele = e.target;
  if (ele.classList.contains("poster")) {
    let id = ele.dataset.id;
    CurrMovie(id).then((dat) => {
      let htm = "";
      htm = html2(dat);
      movieDetails.innerHTML = htm;
      let BigPoster = Bigposter(dat);
      posterBBig.innerHTML = BigPoster;
      sectionStory.textContent = dat.overview;
    });
  }
};

