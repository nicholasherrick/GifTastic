$(document).ready(function() {

var topics = ["tacos", "burgers", "pizza", "salad", "pasta", "candy", "cake", "sandwiches", "sushi", "burritos", "chicken wings", "ramen"];
var buttonsDiv = $("#buttons-div");


function showButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<Button type='button' class='btn btn-secondary btn-lg'>")
        newButton.addClass("new-button");
        newButton.attr("data-name", topics[i]);
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
        });

};

$(document).on("click", ".new-button", getFood);

// test();
showButtons();
});














































// $(document).ready(function() {


// var topics = ["tacos", "burgers", "pizza", "salad", "pasta", "candy", "cake", "sandwiches", "sushi", "burritos", "chicken wings", "ramen"];
// var buttonsDiv = $("#buttons-div");

// renderButtons();

// function renderButtons() {
    
//     var newButton = $("<button type='button' class='btn btn-secondary btn-lg'>");
//     $("#buttons-div").empty();
//     for (var i = 0; i < topics.length; i++) {
//         newButton.addClass("new-button");
//         newButton.attr("data-name", topics[i]);
//         newButton.text(topics[i]);
//         buttonsDiv.append(newButton);
//     }

// };

// // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + addNew + "&api_key=" + apiKey + "&limit=10";
// // var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";

// var addNew = $("#food-input").val().trim();
// // var topics = ["tacos", "burgers", "pizza", "salad", "pasta", "candy", "cake", "sandwiches", "sushi", "burritos", "chicken wings", "ramen"];

// function showFood() {
//     var food = $(this).attr("data-name");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=" + apiKey + "&limit=10";
//     var apiKey = "rQ6AHv1YvrXWOwMEJYDSe60UnMh4AgIB";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         var rating = response;
//         $("#gif-box").append();
//     });
// };

// $(document).on("click", ".new-Button", showFood);


// // var newButton = $("<button type='button' class='btn btn-secondary btn-lg new-Button'>");


// $("#add-food").on("click", function (event) {
//     event.preventDefault();
//     var food = $("#food-input").val().trim();
//     topics.push(food);
//     renderButtons();
// });

// });