const API_KEY = "api_key=fd863caa646e68e5f71dcdb291b41483";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?popular&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const search_URL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsL = document.getElementById("tags");


// https://api.themoviedb.org/3/discover/movie?popular&api_key=fd863caa646e68e5f71dcdb291b41483



// --------------------------Genres ------------------------------------------------
const genre = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
];
var selectedGenre = [];

callGenre();
function callGenre() {
  tagsL.innerHTML = " ";
  genre.forEach(genres => {
    const A = document.createElement("div");
    A.classList.add("tag");
    A.id = genres.id;
    A.innerText = genres.name;
    A.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genres.id);
      } else {
        if (selectedGenre.includes(genres.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genres.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genres.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highLightGenre()
    });
    tagsL.append(A);
  });
}

// -------------------- HighLight SelectedGener -------------------------------------
function highLightGenre(){
  const tags = document.querySelectorAll(".tag");
  tags.forEach(tag => {
    tag.classList.remove("highLight")
  })
  if(selectedGenre.length != 0){
    selectedGenre.forEach(id => {
      const highLightedTag = document.getElementById(id);
      highLightedTag.classList.add("highLight");
    })
  }
}




// ----------------------- Movie Card ---------------------------------------------------
getMovies(API_URL);
function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    console.log(data);
    if(data.results.length !== 0){
      showMovies(data.results);
    }else{
      main.innerHTML=`<h1 class="results">No Results Found</h1>`
    }
  });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
             <img src="${IMG_URL + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Know More</button>
            </div>`;
    main.appendChild(movieEl);
  });
}

// ----------------------- Rating ----------------------------------------------
function getColor(vote){
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


// ----------------------------- Search ------------------------------------------
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(search_URL + "&query=" + searchTerm);
  }
});
