
/* Called when the user pushes the "submit" button */
/* Sends a request to the API using the JSONp protocol */
// function chooseBooks() {
// 	var overlay = document.getElementById("overlay");
// 	overlay.style.display = "block";
// 	var tileId = 0;
// 	var overlayTile = document.getElementById(tileId);
// 	overlay.replaceChild(overlayTile, overlay.childNodes[1]);
//
// }
var book_counter = 0;
var bookList;

function transition() {
	var w = parseInt(window.innerWidth)
	if(w  > 600){
		var text = document.getElementById("Search");
		text.style.display = "none";

		var head = document.getElementById("book_club");
		head.style.width = "10%";

		var header = document.getElementById("header");
		header.style.display = "flex";

		$(document).ready(function() {
				$("#place_holder").appendTo("header");
				$("#button").appendTo("header");
	 });

	 document.getElementById("place_holder").style.marginLeft = "0px";
	 document.getElementById("button").style.marginLeft = "0px";
	 document.getElementById("button2").style.margin = "0px";
	}
	else{
		var head = document.getElementById("book_club");
		// head.style.width = "90%";

		var header = document.getElementById("header");
		head.style.display = "flex";

		var text = document.getElementById("Search");
		text.style.display = "none";

		var placeHolder = document.getElementById("place_holder");
		placeHolder.style.display = "none";

		var button = document.getElementById("button");
		button.style.display = "none";

		var sign = document.getElementById("sign");
		sign.style.width="10%";
		sign.style.display = "flex";
	}


}

function newRequest() {

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");

	var description = document.getElementById("description");
	if(description != null){
		description = description.trim();
	}

	// Connects possible query parts with pluses
	var query = ["",title,author,isbn].reduce(fancyJoin);

	// The JSONp part.  Query is executed by appending a request for a new
	// Javascript library to the DOM.  It's URL is the URL for the query.
	// The library returned just calls the callback function we specify, with
	// the JSON data we want as an argument.
	if (query != "") {
		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
		}



}


/* Used above, for joining possibly empty strings with pluses */
function fancyJoin(a,b) {
    if (a == "") { return b; }	    else if (b == "") { return a; }    else { return a+"+"+b; }}

function tile_func(i) {

}

/* The callback function, which gets run when the API returns the result of our query */
/* Replace with your code! */
function handleResponse(bookListObj) {
	bookList = bookListObj.items;
	/* where to put the data on the Web page */
	// var bookDisplay = document.getElementById("bookDisplay");
	//
	// // var authorDisplay = document.getElementById("authorDisplay");
	// /* write each title as a new paragraph */
	// var book = bookList[book_counter];
	// var title = book.volumeInfo.title;
	// var author = book.volumeInfo.authors[0];
	// var descriptions = book.volumeInfo.description;
	// var cover = book.volumeInfo.imageLinks.thumbnail;
	// //
	// var tile = document.createElement("div");
	// // 		tile.style.display = "none";
	// tile.class = "div1";
	// tile.id = book_counter;
	// // 		bookDisplay.append(tile);
	//
	// var overlay = document.getElementById("overlay");
	// overlay.style.display = "block";
	// overlay.append(tile);//
	// var coverPgh = document.createElement("img");
	// coverPgh.src = cover;
	// tile.append(coverPgh);
	// //
	// var subTile = document.createElement("div");
	// subTile.setAttribute("class", "div2");
	// tile.append(subTile);
	// //
	// var titlePgh = document.createElement("p");
	// // 		/* ALWAYS AVOID using the innerHTML property */
	// titlePgh.textContent = title;
	// subTile.append(titlePgh);
	// //
	// var authorPgh = document.createElement("p");
	// authorPgh.textContent = author;
	// subTile.append(authorPgh);
	// //
	// var des = descriptions.split(" ", 30);
	// var first30des = des.join(" ") + ". . .";
	// var first30desPgh = document.createElement("p");
	// first30desPgh.textContent = first30des;
	// subTile.append(first30desPgh);
	response();
}

function response(){
	bookDisplay = document.getElementById("bookDisplay");

	// var authorDisplay = document.getElementById("authorDisplay");
	/* write each title as a new paragraph */
	var book = bookList[book_counter];
	var title = book.volumeInfo.title;
	var author = book.volumeInfo.authors[0];
	var descriptions = book.volumeInfo.description;
	var cover = book.volumeInfo.imageLinks.thumbnail;
	//
	var tile = document.createElement("div");
	// 		tile.style.display = "none";
	tile.class = "div1";
	tile.id = book_counter;
	// 		bookDisplay.append(tile);

	var overlay = document.getElementById("overlay");
	overlay.style.display = "block";
	overlay.append(tile);//
	var coverPgh = document.createElement("img");
	coverPgh.src = cover;
	tile.append(coverPgh);
	//
	var subTile = document.createElement("div");
	subTile.setAttribute("class", "div2");
	tile.append(subTile);
	//
	var titlePgh = document.createElement("p");
	// 		/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;
	subTile.append(titlePgh);
	//
	var authorPgh = document.createElement("p");
	authorPgh.textContent = author;
	subTile.append(authorPgh);
	//
	var des = descriptions.split(" ", 30);
	var first30des = des.join(" ") + ". . .";
	var first30desPgh = document.createElement("p");
	first30desPgh.textContent = first30des;
	subTile.append(first30desPgh);
}


function off() {
    document.getElementById("overlay").style.display = "none";
}

function keep() {
		var main = document.getElementById("main");
		var tileWrap = document.createElement("div");
		tileWrap.id = "tileWrapper";
		main.append(tileWrap);

		var wrapped_tile = document.getElementById(book_counter);
		tileWrap.append(wrapped_tile);

}

function left(){
		document.getElementById(book_counter).style.display = "none";
		if(book_counter - 1 >= 0){
			book_counter = book_counter - 1;
			response();
		}
}

function right(){
		document.getElementById(book_counter).style.display = "none";
		if(book_counter + 1 <= 9){
			book_counter = book_counter + 1;
			response();
		}
}
