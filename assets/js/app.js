var topics = ["Hulk Hogan", "John Cena", "CM Punk", "Randy Savage", "Ric Flair", "The Rock","Stone Cold", "Seth Rollins", "AJ Styles"];
var stills =[];
var animated = [];


$.each(topics, function() {
	$("#buttons").append("<button class='name'>" + this + "</button>")
})
$("#buttons").on("click", ".name", function(){
	var term = $(this).text().split(' ').join('+');
	$("#gifs").html("")
	stills =[];
	animated = [];
	callAPI(term)
})

$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		addItem();
	}
})

$("button[id='submit']").on("click", addItem)


function addItem() {
	if ($("input[type='text']").val()) {
		topics.push($("input[type='text']").val());
		$("#buttons").append("<button class='name'>" + $("input[type='text']").val() + "</button>")
		$("input[type='text']").val('')
	}
}


function callAPI(term) {
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&limit=12&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: 'GET',
		dataType: 'json'
	})
	.done(function(response){
		// console.log(JSON.stringify(response))
		for (var i = 0; i < response.data.length; i++) {
			// console.log(response.data[i])
			// console.log(response.data[i]['images']['original_still']['url']);
			$("#gifs").append("<div class = 'result'><img id = '" + i + "' class = 'preview' src='" + response.data[i]['images']['fixed_height_still']['url'] + "'><br><h3 class='rating'>Rating: " + response.data[i]['rating'] + "</h3</div>")
			stills.push(response.data[i]['images']['fixed_height_still']['url'])
			animated.push(response.data[i]['images']['fixed_height']['url'])

		}
		console.log($(".preview"))
		console.log(response)

	})

}

$("#gifs").on("click", "img", function(){
	var i = $(this).attr("id");
	if ($(this).attr("src") === stills[i]) {
		$(this).attr("src", animated[i]);
	}
	else {
		$(this).attr("src", stills[i]);
	}
})


