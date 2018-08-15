var topics = ["office space", "talladega nights","the other guys", "tropic thonder", "the hangover", "game night movie", "deadpool"];

function displayMovieGif() {
    var searchMovGif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchMovGif + "&api_key=kM0j3LWq6cWx1mSBhuFLep5C6oJGemSD&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // $("gifMovies").text(JSON.stringify(response));
        console.log(response);
        var results = response.data

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='movie'>");
            var rating = results[i].rating;
            var pR = $("<p>").text("Rating: " + rating);
            gifDiv.append(pR);
            var gifURL = results[i].images.downsized_medium.url;
            var gif = $("<img>").attr("src", gifURL);
            gifDiv.append(gif);
            $("#gifMovies").prepend(gifDiv);
        }
    });
       
}


function renderGifButtons() {
//   empty div 
    $("#gifButtons").empty();
//   looping topics array
    for (var i = 0; i < topics.length; i++) {
        var addB = $("<button>");
        addB.addClass("movie");
        addB.attr("data-name", topics[i]);
        addB.text(topics[i]);
        $("#gifButtons").append(addB);
    }    

}



$("#addGifMovie").on("click", function(event) {
    event.preventDefault();

    var gifMovie = $("#movie-input").val().trim();
    console.log();
    topics.push(gifMovie);

    

renderGifButtons();
});
$(document).on("click", ".movie", displayMovieGif);
renderGifButtons();