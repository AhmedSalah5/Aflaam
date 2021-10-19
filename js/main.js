var apiKey = "XRBvYpDb7tGHvehBfI9gC9kqxwtPh664";

let movieList = document.querySelector('#movie-list1')
let movieList2 = document.querySelector('#movie-list2')
let cartMovies = []

function getMovies(searchText) {
    var url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchText}&api-key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {

            let movies = data.results
            for (var i = 0; i < movies.length; i++) {
                movieList.innerHTML += `
                        <div class="movie">
                            <img src="${movies[i].multimedia.src}" alt="">
                            <div class="title">${movies[i].display_title}</div>
                            <div class="info">
                                <h3>Movie Info</h3>
                                <p>${movies[i].summary_short}</p>
                                <p style="margin-top:20px">Price : $<span class="price">200</span></p>
                            </div>
                            <div class="show-time">
                                <h5>Show Time</h5>  
                                <p>Publication date:${movies[i].publication_date}</p> 
                                <p>Opening date:${movies[i].opening_date}</p> 
                            </div>
                            <div class="actions">
                            <a class="add-to-cart" onclick="addMovie('${encodeURIComponent(JSON.stringify(movies[i]))}')">Add to Cart</a>
                            </div>
                        </div>
                        `
                if (i >= 3) {
                    break;
                }
            }
        });
}

function getMovies2(searchText) {
    var url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${searchText}&api-key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let movies = data.results
            console.log(data.results)
            for (var i = 0; i < movies.length; i++) {
                movieList2.innerHTML += `
                        <div class="movie">
                            <img src="${movies[i].multimedia.src}" alt="">
                            <div class="title">${movies[i].display_title}</div>
                            <div class="info">
                                <h3>Movie Info</h3>
                                <p>${movies[i].summary_short}</p>
                                <p style="margin-top:20px">Price : $<span class="price">200</span></p>
                            </div>
                            <div class="show-time">
                                <h3>Show Time</h3>  
                                <p>Publication date:${movies[i].publication_date}</p> 
                                <p>Opening date:${movies[i].opening_date}</p> 
                            </div>
                            <div class="actions">
                                <a class="add-to-cart" onclick="addMovie('${encodeURIComponent(JSON.stringify(movies[i]))}')">Add to Cart</a>
                            </div>
                        </div>
                        `
                if (i >= 3) {
                    break;
                }
            }
        });
}

getMovies("iron")
getMovies2("spider")


/* Cart Open & Close */
document.querySelector('.cart-btn').onclick = function () {
    document.querySelector('.cart-box').classList.toggle('opened')
    document.querySelector('body').classList.toggle('fixed')
}
document.querySelector('.cart-box .close').onclick = function () {
    document.querySelector('.cart-box').classList.toggle('opened')
    document.querySelector('body').classList.toggle('fixed')
}



/*Add items in cart*/
function addMovie(movie) {
    obj = JSON.parse(decodeURIComponent(movie))
    cartMovies.push(obj)
    for (var i = 0; i < cartMovies.length; i++) {
        document.querySelector('.cart-box .items').innerHTML += `
                <div class="item">
                    <img src="${cartMovies[i].multimedia.src}" alt="">
                    <h3>${cartMovies[i].display_title}</h3>
                    <div>$ <span class="price">200</span></div>
                </div>
            
            `

        document.querySelector('.cart-box').classList.toggle('opened')
        document.querySelector('body').classList.toggle('fixed')
    }
}


var total = 0;
document.querySelector('.total .value').innerHTML = total;
document.querySelector('.form select').onchange = function () {
    if (this.value == 100) {
        total = 100;
    } else if (this.value == 200) {
        total = 200;
    } else {
        total = 0
    }
    document.querySelector('.total .value').innerHTML = total;
}
/**Form submit & Validation */
document.querySelector('.form form').onsubmit = function (e) {
    e.preventDefault()
    if (document.querySelector('.form form select').value == "0") {
        document.querySelector('.error').classList.add('show')
        setTimeout(function () {
            document.querySelector('.error').classList.remove('show')
        }, 3000)
    } else {
        document.querySelector('.message').classList.add('show')
        setTimeout(function () {
            document.querySelector('.message').classList.remove('show')
        }, 3000)
    }
}