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
                var gif = results[i].images.original_still.url;
                var animatedGifs = results[i].images.original.url;
                text.attr("class", "rating");
                image.attr("src", gif);
                image.attr("data-state", "still");
                image.attr("data-animate", animatedGifs);
                image.attr("data-still", gif);
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
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    console.log(this);
});

$("#add-food").on("click", function (event) {
    event.preventDefault();
    var food = $("#food-input").val().trim();
    if (topics.indexOf(food) == -1) {
        topics.push(food);
    }
    else {
        $(this).val().empty();
    }
    showButtons();
});

$("#add-random").on("click", function() {
    var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";
    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        var newDiv = $("<div>");
        var gifBox = $("#gif-box");
        var image = $("<img>");
        var gif = results.images.original_still.url;
        image.attr("src", gif);
        image.attr("data-state", "still");
        image.attr("data-animate", results.images.original.url);
        image.attr("data-still", results.images.original_still.url);
        image.attr("class", "gif");
        newDiv.append(image);
        gifBox.prepend(newDiv);
        blankSpace.hide();
    });
});

$(document).on("click", ".new-button", getFood);

showButtons();
});