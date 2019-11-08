// Waits for html to load
$(document).ready(function() {

// Global variables declared
var topics = ["cities", "memes", "technology", "animals", "nature", "people", "food", "shoes", "movies", "music", "school", "airplanes"];
var buttonsDiv = $("#buttons-div");
var blankSpace = $(".blank");

// Clears gifs from gif box
$(document.body).on("click", "#clear-gifs", function() {
    $("#gif-box").empty();
    $("#gif-box").append($("<h1 class='blank'>Gifs!</h1>"));
    blankSpace.show();
});

// Removes all buttons
$(document.body).on("click", "#clear-buttons", function() {
    topics.length = 0;
    buttonsDiv.empty();
});

// Removes all buttons, gifs, and input values
$(document.body).on("click", "#clear-all", function() {
    topics.length = 0;
    buttonsDiv.empty();
    $("#gif-box").empty();
    $("#food-input").val("");
    $("#gif-box").append($("<h1 class='blank'>Gifs!</h1>"));
    blankSpace.show();
    showButtons();
});

// This will create buttons from the topics array
function showButtons() {
    buttonsDiv.empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<Button type='button' class='btn btn-secondary btn-lg'>")
        newButton.addClass("new-button");
        // The split and join replaces spaces with an underscore so they function properly with the api request
        newButton.attr("data-name", topics[i].split(" ").join("_")); 
        newButton.text(topics[i]);
        buttonsDiv.append(newButton);
    }
};

// Pulls data from the Giphy API and displays it in the gif box
function getValue() {
    var value = $(this).attr("data-name");
    var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + apiKey + "&limit=10";
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
                var rating = results[i].rating;
                var text = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
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

// Makes use of attributes to allow us to click to pause and play the gifs
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
});

// Adds new buttons using the input from the add buttons form
$("#add-value").on("click", function (event) {
    event.preventDefault();
    var value = $("#value-input").val().trim();
    if (topics.indexOf(value) == -1) {
        topics.push(value);
    }
    else {
        $(this).val().empty();
    }
    showButtons();
});

// Lets you press enter to add new button
$("#value-input").keypress(function(event){
    if (event.which == 13) {
        $("#add-value").click();
    }
});

// Generates one random gif when the random gif button is pressed
$(document.body).on("click", "#add-random", function() {
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

// runs the function to call on the Giphy API when a button is clicked
$(document).on("click", ".new-button", getValue);

// Shows the buttons using the default topics in the topics array when the page loads
showButtons();
});