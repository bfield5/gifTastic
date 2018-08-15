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

            var gifDiv = $("<div class='gifDiv'>");
            var rating = results[i].rating;
            var pR = $("<p>").text("Rating: " + rating);
            gifDiv.append(pR);
            //test code
            var stillGif = results[i].images.fixed_height_still.url;
            //test code end
            var animGif = results[i].images.fixed_height.url;
            var gif = $("<img class= 'gif'>").attr("src", stillGif);
            gif.attr("data-still", stillGif);
            gif.attr("data-animate", animGif);
            gif.attr("data-state", "still");

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

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

$("#addGifMovie").on("click", function(event) {
    event.preventDefault();

    var gifMovie = $("#movie-input").val().trim();
    console.log();
    topics.push(gifMovie);

    

renderGifButtons();
});

$(document).on("click", ".movie", displayMovieGif);
renderGifButtons();