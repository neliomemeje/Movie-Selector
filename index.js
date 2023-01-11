const searchFormEl= document.getElementById("searchForm");
const searchTextEl= document.getElementById("searchText");
const moviesEl = document.getElementById("movies")
const movieEl= document.getElementById("movie")

const KEY= "&apikey=4e9738ad";

window.onload = init();
function init(){
	fetch("https://www.omdbapi.com/?s=home"+KEY)
	.then(response => response.json())
	.then(data => {
		const movies= data.Search;		
		movies.forEach((movie) => {
			const movieDiv= document.createElement("div");

			movieDiv.classList.add("col-md-3")
			movieDiv.innerHTML = `	
					<div class="well text-center">
						<img src=${movie.Poster} alt=${movie.Title}>
						<h5>${movie.Title}</h5>
						<a href="#" onclick="movieSelected('${movie.imdbID
}')" class="btn btn-info">Movie Details</a>
					</div>	
			`
			moviesEl.appendChild(movieDiv)

		})	
	})
	.catch(err => console.log(err))
}

searchFormEl.addEventListener("submit", (e) => {
	const searchText = searchTextEl.value;
	getMovies(searchText)
	e.preventDefault();
})

function getMovies(searchText){
	fetch("https://www.omdbapi.com/?s="+searchText+KEY)
	.then(response => response.json())
	.then(data => {
		const movies= data.Search;
		moviesEl.innerHTML= "";
		movies.forEach(movie => {
			const movieDiv= document.createElement("div");
			movieDiv.classList.add("col-md-3")
			movieDiv.innerHTML = `	
						<div class="well text-center">
							<img src=${movie.Poster} alt=${movie.Title}>
							<h5>${movie.Title}</h5>
							<a href="#" onclick="movieSelected('${movie.imdbID
}')" class="btn btn-info">Movie Details</a>
						</div>	
			`
			moviesEl.appendChild(movieDiv)

		})	
		searchTextEl.value= "";
	})
	.catch(err => {
		console.log(err);
		moviesEl.innerHTML= "No match for the selected movie"
	})
}

function movieSelected(id) {
	sessionStorage.setItem("movieId", id)
	window.location= "movie.html"
	return false;
}

function getMovie() {
	const movieId= sessionStorage.getItem("movieId");

	fetch("https://www.omdbapi.com/?i="+movieId+KEY)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		const movieDiv= document.createElement("div");
		
		movieDiv.innerHTML= `
		<div class="row">
			<div class="col-md-4">
				<img src=${data.Poster} class="thumbnail" alt=${data.Title}>
				<p>${data.Plot}</p>
			</div>
			<div class="col-md-8">
				<h2>${data.Title}</h2>
				<ul class="list-group">
					<li class="list-group-item"><strong>Genre: </strong><em>${data.Genre}</em></li>
					<li class="list-group-item"><strong>Released: </strong><em>${data.Released}</em></li>
					<li class="list-group-item"><strong>Rated: </strong><em>${data.Rated}</em></li>
					<li class="list-group-item"><strong>imdbRating: </strong><em>${data.imdbRating}</em></li>
					<li class="list-group-item"><strong>Actors: </strong><em>${data.Actors}</em></li>
					<li class="list-group-item"><strong>Director: </strong><em>${data.Director}</li>
				</ul>

				<div class="row">
					<div class="well">
						<a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-success">View IMdb</a>
						<a href="index.html" class="btn btn-primary">Back To Search</a>
					</div>
				</div>
			</div>
		</div>	

		`
		movieEl.appendChild(movieDiv)
	})
	.catch(err => console.log(err))
}