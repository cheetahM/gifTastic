// array for your serach topics
let topics = [
    "Husky"
];

var gifButtons = $("#topics-gallery");
var gifsGallery = $("#gifs-gallery");
var a = $("<button>");

function displayGifInfo() {
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
     url: queryURL,
     method: 'GET'
    }).done(function(response) {
        response.data.map((i) => {
            var li = $("<li>");
            var img = $("<img>");
            var rating = i.rating;
        	var defaultAnimatedSrc = i.images.fixed_height.url;
        	var staticSrc = i.images.fixed_height_still.url;
            li.addClass("imgGif-container");
            img.attr("src", staticSrc);
            img.addClass("imgGif");
            img.attr("data-state", "still");
        	img.attr("data-still", staticSrc);
        	img.attr("data-animate", defaultAnimatedSrc);
            li.append(img);
            gifsGallery.append(li);
        });
    });
}

function playGif() {
    var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

topics.map((i) => {
    // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          //var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("gifButton");
          // Added a data-attribute
          a.attr("data-name", i);
          // Provided the initial button text
          a.text(i);
          // Added the button to the buttons-view div
          gifButtons.append(a);
});

// Adding click event listeners to all elements with a class of "gifButton"
$(document).on("click", ".gifButton", displayGifInfo);

// Adding click event listeners to all elements with a class of "imgGif-container"
$(document).on("click", ".imgGif", playGif);



