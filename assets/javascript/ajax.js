var topics = ["Michael Jackson", "Prince", "Whitney Houston", "Lady Gaga", "Justin Timberlake" ];

      function renderButtons() {
        $("#artists-view").empty();      
        for (var i = 0; i < topics.length; i++) {          
          var a = $("<button>");          
          a.addClass("artist");          
          a.attr("data-artist", topics[i]);          
          a.text(topics[i]);    
          $("#artists-view").append(a);
        }
      }



function dispayArtistInfo() {

	var artist = $(this).attr("data-artist");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
        url: queryURL,
        method: "GET"
      })

	.done(function(response) {
		var results = response.data;
		$("#gifs-appear-here").html("");
		for (var i = 0; i < results.length; i++) {
			if (results[i] !== "r" && results[i] !== "pg-13") {
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var artistImage = $("<img>");
				artistImage.attr("src", results[i].images.fixed_height_still.url);
				artistImage.attr("data-still", results[i].images.fixed_height_still.url);
				artistImage.attr("data-animate", results[i].images.fixed_height.url);
				artistImage.attr("data-state", "still");
				artistImage.attr("class", "gif");
				//artistImage.on("click", ImageClicked());
				gifDiv.append(p);
				gifDiv.append(artistImage);
				$("#gifs-appear-here").prepend(gifDiv);
				console.log(response);
			}
		}
	})
};

function ImageClicked()
{
	 var state = $(this).attr("data-state");
      //
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        //console.log(state);
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        //console.log(state);
      }
}

/*$(".item").on("click", function() {
   
     var state = $(this).attr("data-state");
      console.log("in");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
       console.log(state);
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
       console.log(state);
     }
 });*/




$("#add-artist").on("click", function(event) {
	event.preventDefault();
	var artist = $("#artist-input").val().trim();
	topics.push(artist);
	renderButtons();
	
});







$(document).on("click", ".artist", dispayArtistInfo);
$(document).on("click", ".gif", ImageClicked);

renderButtons();

