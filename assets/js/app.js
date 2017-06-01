// array for your serach topics
let topics = [
    "Husky",
    "Cats"
];

var gifButtons = $("#topics-gallery");
var gifsGallery = $("#gifs-gallery");
var a = $("<button>");

function addTopic(e) {
    e.preventDefault();
    var topic = $("#addTopic").val();
    topics.push(topic);
    showTopics(topics);
}

function displayGifInfo() {
    gifsGallery.empty();
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
     url: queryURL,
     method: 'GET'
    }).done(function(response) {
        response.data.map((i) => {
            var li = $("<li>");
            var h3 = $("<h3>");
            var img = $("<img>");
            var rating = i.rating;
        	var defaultAnimatedSrc = i.images.fixed_height.url;
        	var staticSrc = i.images.fixed_height_still.url;
            li.addClass("card imgGif-container");
            img.attr("src", staticSrc);
            img.addClass("imgGif");
            img.attr("data-state", "still");
        	img.attr("data-still", staticSrc);
        	img.attr("data-animate", defaultAnimatedSrc);
            h3.addClass("card-text");
            h3.text("Rating: " + rating);
            li.append(h3);
            li.prepend(img);
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

function showTopics(topics) {
    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    gifButtons.empty();
    topics.map((i) => {
    // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var btn = $("<button>");
          var li = $("<li>");
          // Adds a class of movie to our button
          btn.addClass("gifButton");
          // Added a data-attribute
          btn.attr("data-name", i);
          // Provided the initial button text
          btn.text(i);
          li.append(btn);
          // Added the button to the buttons-view div
          gifButtons.append(li);
    });
};

showTopics(topics);

// Adding click event listeners to add a Topic
$(document).on("click", "#showTopic", addTopic);

// Adding click event listeners to all elements with a class of "gifButton"
$(document).on("click", ".gifButton", displayGifInfo);

// Adding click event listeners to all elements with a class of "imgGif-container"
$(document).on("click", ".imgGif", playGif);





