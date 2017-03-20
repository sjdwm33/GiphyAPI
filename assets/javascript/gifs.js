$(document).ready(function(){
	var actors = ["Amy Poehler", "Nick Offerman", "Aubrey Plaza", "Chris Pratt", "Aziz Ansari", "Jim O'Heir", "Retta", "Rashida Jones", "Adam Scott", "Rob Lowe"];

	function displayActorGifs() {

        var actor = $(this).attr("data-actor");
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for a button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	  $("#actors-view").empty();
	          var results = response.data;

	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item'>");
	            var rating = results[i].rating;
	            var p = $("<p>").text("Rating: " + rating);
	            
	            var actorImage = $("<img>");
	            actorImage.attr("src", results[i].images.fixed_height_still.url);
	            actorImage.attr("data-animate", results[i].images.fixed_height.url);
	            actorImage.attr("data-still", results[i].images.fixed_height_still.url);
	            actorImage.attr("data-state", "still");
	            actorImage.addClass("gif");
	            // actorImage.attr("onclick", "clickTest()");

	            gifDiv.prepend(actorImage);
	            gifDiv.prepend(p);

	            $("#actors-view").prepend(gifDiv);
	    }

	    //changes the image from still to animated
  		$(".gif").on("click", function() {
  			console.log("test")
      		var state = $(this).attr("data-state");

		      if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
    	}); 
		});
    };
    //Creates the buttons
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < actors.length; i++) {

          var a = $("<button>");
          a.addClass("actor");
          a.attr("data-actor", actors[i]);
          a.text(actors[i]);
          $("#buttons-view").append(a);
        }
    }

    //gets and displays the GIFs when a button is clicked
   $("#add-actor").on("click", function(event) {
        event.preventDefault();
        var actor = $("#actor-input").val().trim();
        actors.push(actor);
        renderButtons();
      });

      $(document).on("click", ".actor", displayActorGifs);
      renderButtons(); 

     
});


