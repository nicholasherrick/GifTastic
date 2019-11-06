$(document).ready(function() {

var topics = ["tacos", "burgers", "pizza", "salad", "pasta", "candy", "cake", "sandwiches", "sushi", "burritos", "chicken wings", "ramen"];
var buttonsDiv = $("#buttons-div");
var blankSpace = $(".blank");

$("#clear-gifs").on("click", function() {
    $("#gif-box").empty();
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    blankSpace.show();
});

$("#clear-buttons").on("click", function() {
    topics.length = 0;
    buttonsDiv.empty();
});

$("#clear-all").on("click", function() {
    topics.length = 0;
    buttonsDiv.empty();
    $("#gif-box").empty();
    $("#food-input").val("");
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    $("#gif-box").append($("<h1 class='blank'>Hello World!</h1>"));
    blankSpace.show();
    showButtons();
});


function showButtons() {
    buttonsDiv.empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<Button type='button' class='btn btn-secondary btn-lg'>")
        newButton.addClass("new-button");
        newButton.attr("data-name", topics[i].split(" ").join("_"));
        newButton.text(topics[i]);
        buttonsDiv.append(newButton);
    }
};

function getFood() {
    var food = $(this).attr("data-name");
    var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=" + apiKey + "&limit=10";
    console.log(queryURL);
    $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var newDiv = $("<div>");
                var gifBox = $("#gif-box");
                var text = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                var rating = results[i].rating;
                var gif = results[i].images.original.url;
                var stillGifs = results[i].images.original_still.url;
                console.log("gif " + gif);
                console.log("still gif " + stillGifs);
                image.attr("src", gif);
                image.attr("data-state", "animate");
                image.attr("data-animate", gif);
                image.attr("data-still", stillGifs);
                image.attr("class", "gif");
                newDiv.append(text);
                newDiv.append(image);
                gifBox.prepend(newDiv);
                blankSpace.hide();
            }
        });

};

$(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state")
    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    console.log(this);
});

$("#add-food").on("click", function (event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    topics.push(food);
    showButtons();
});

$("#add-random").on("click", function() {
    var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";
    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=" + apiKey + "&limit=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data[0];
        // for (var i = 0; i < results.length; i++) {
            var newDiv = $("<div>");
            var gifBox = $("#gif-box");
            // var text = $("<p>").text("Rating: " + rating);
            var image = $("<img src=" + gif + " class='gif'>");
            // var rating = results[i].rating;
            var gif = results.images.downsized.url;
            image.attr("data-state", "animate");
            image.attr("data-animate", results.images.downsized.url);
            image.attr("data-still", results.images.downsized_still.url);
            // newDiv.append(text);
            newDiv.append(image);
            gifBox.prepend(newDiv);
            blankSpace.hide();
        // }
    });
});

$(document).on("click", ".new-button", getFood);

showButtons();
});