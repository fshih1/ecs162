
/* Called when the user pushes the 'submit' button */
/* Sends a request to the API using the JSONp protocol */

var book_counter = 0;
// var bookList;

function transition() {
	var w = parseInt(window.innerWidth)
	if(w  > 600){
		var text = document.getElementById('Search');
		text.style.display = 'none';

		var head = document.getElementById('book_club');
		head.style.width = '10%';

		var header = document.getElementById('header');
		header.style.display = 'flex';

		$(document).ready(function() {
				$('#place_holder').appendTo('header');
				$('#button').appendTo('header');
	 });

		// document.getElementsByTagName("main").style.background
		document.body.style.backgroundColor = "#EDEDED";

	 document.getElementById('place_holder').style.marginLeft = '0px';
	 document.getElementById('button').style.marginLeft = '0px';
	 document.getElementById('button2').style.margin = '0px';
	}
	else{
		var head = document.getElementById('book_club');
		// head.style.width = '90%';

		var header = document.getElementById('header');
		head.style.display = 'flex';

		var text = document.getElementById('Search');
		text.style.display = 'none';

		var placeHolder = document.getElementById('place_holder');
		placeHolder.style.display = 'none';

		var button = document.getElementById('button');
		button.style.display = 'none';

		var sign = document.getElementById('sign');
		sign.style.width='10%';
		sign.style.display = 'flex';
	}


}

function newRequest() {

	var author = document.getElementById('author').value;
	author = author.trim();
	author = author.replace(' ','+');

	var title = document.getElementById('title').value;
	title = title.trim();
	title = title.replace(' ','+');

	var isbn = document.getElementById('isbn').value;
	isbn = isbn.trim();
	isbn = isbn.replace('-','');

	var description = document.getElementById('description');
	if(description != null) {
		description = description.trim();
	}

	// Connects possible query parts with pluses
	var query = ['',title,author,isbn].reduce(fancyJoin);

	// The JSONp part.  Query is executed by appending a request for a new
	// Javascript library to the DOM.  It's URL is the URL for the query.
	// The library returned just calls the callback function we specify, with
	// the JSON data we want as an argument.
	if (query != '') {
		// remove old script
		var oldScript = document.getElementById('jsonpCall');
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = 'https://www.googleapis.com/books/v1/volumes?q='
		var callback = '&callback=newRequest.handleResponseM'

		script.src = beginning+query+callback
		script.id = 'jsonpCall';

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
		}

	newRequest.handleResponseM = function(bookListObj) {
		handleResponse(bookListObj, title, author, isbn);
	}
}

/* Used above, for joining possibly empty strings with pluses */
function fancyJoin(a,b) {
    if (a == '') { return b; }	    else if (b == '') { return a; }    else { return a+'+'+b; }}

/* The callback function, which gets run when the API returns the result of our query */
/* Replace with your code! */
function handleResponse(bookListObj, title, author, isbn) {

	console.log(title);
	var overlay = document.getElementById('overlay');
	overlay.style.display = 'block';
	if (bookListObj.totalItems != 0) {
		bookList = bookListObj.items;
		replace();
	} else {
		error();
	}
}

function getTile() {
	var book = bookList[book_counter];
	var title = book.volumeInfo.title;
	var author = book.volumeInfo.authors[0];
	var descriptions = book.volumeInfo.description;
	var cover = book.volumeInfo.imageLinks.thumbnail;

	var tile = document.createElement('div');
	tile.setAttribute('class', 'div1');
	tile.id = book_counter;

	var coverPgh = document.createElement('img');
	coverPgh.src = cover;
	tile.append(coverPgh);
	//
	var subTile = document.createElement('div');
	subTile.setAttribute('class', 'div2');
	tile.append(subTile);
	//
	var titlePgh = document.createElement('p');
	// 		/* ALWAYS AVOID using the innerHTML property */
	titlePgh.textContent = title;
	subTile.append(titlePgh);
	//
	var authorPgh = document.createElement('p');
	authorPgh.textContent = author;
	subTile.append(authorPgh);
	//

	if (descriptions == null) {
		var emptyDescription = document.createElement('p');
		subTile.append(emptyDescription);
		return tile;
	}

	var des = descriptions.split(' ', 30);
	var first30des = des.join(' ') + '. . .';
	var first30desPgh = document.createElement('p');
	first30desPgh.textContent = first30des;
	subTile.append(first30desPgh);

	return tile;
}

function off() {
    document.getElementById('overlay').style.display = 'none';
}

function keep() {
		var tileWrapper = document.getElementById('tileWrapper');
		var cur_tile = getTile();
		var button = document.createElement("button");
		button.textContent = '&#10006';
		button.class = 'closeTile';
		button.onclick = 'remove()';
		cur_tile.append(button);
		tileWrapper.append(cur_tile);
}

function remove(element, func) {
}

function replace() {
	var toBeReplaced = document.getElementById('overTile');
	var replacement = getTile();
	var copy_replacement = replacement.cloneNode(true);
	toBeReplaced.replaceChild(copy_replacement, toBeReplaced.childNodes[1]);
	document.getElementById('off').style.display = 'block';
}

function error() {
	var errorOverlay = document.createElement('div');
	errorOverlay.id = 'errorOverlay';

	var errorMsgs = document.createElement('div');
	errorMsgs.id = 'errorMsgs';

	// var msg = document.createElement('div');
	// errorMsgs.id = 'msg';
	// errorMsgs.append(msg);
	var inline_title = document.createElement('b');
	inline_title.textContent = title.value;
	var inline_author = document.createElement('b');
	inline_author.textContent = author.value;
	var inline_isbn = document.createElement('b');
	inline_isbn.textContent = isbn.value;

	var msg1 = document.createElement('p');
	msg1.id = 'msg1';
	msg1.textContent = 'The book ';
	msg1.append(inline_title);
	msg1.append(' by ');
	msg1.append(inline_author);
	msg1.append(' or ISBN ');
	msg1.append(inline_isbn);
	msg1.append(' could not be found.');

	var msg2 = document.createElement('p');
	msg2.id = 'msg2';
	msg2.textContent = 'Try another search.';

	errorMsgs.append(msg1);
	errorMsgs.append(msg2);

	var ok = document.createElement('button');
	ok.setAttribute('onclick', 'off()');
	ok.textContent = 'OK';
	ok.id = 'OK';

	errorOverlay.append(errorMsgs);
	errorOverlay.append(ok);

	document.getElementById('off').style.display = 'none';

	var overlay = document.getElementById('overlay');
	overlay.replaceChild(errorOverlay, overlay.childNodes[1]);
}

function left() {
	if(book_counter == 0) {
		document.getElementById(book_counter).style.display = 'none';
		document.getElementById('left').style.visibility = 'hidden';
	} else {
		document.getElementById('left').style.visibility = 'visible';
		document.getElementById('right').style.visibility = 'visible';

		document.getElementById('right').style.display = 'block';
		document.getElementById('left').style.display = 'block';
		// document.getElementById(book_counter).style.display = 'none';
		if (book_counter - 1 >= 0) {
			book_counter = book_counter - 1;
			if (book_counter == 0) {
				document.getElementById('left').style.visibility = 'hidden';
			}
			replace();
		}
	}
}
		// document.getElementById(book_counter).style.d

function right() {
		if(book_counter == bookList.length - 1 ) {
			// document.getElementById(book_counter).style.display = 'none';
			document.getElementById('right').style.visibility = 'hidden';
		}
		else{
			document.getElementById('left').style.visibility = 'visible';
			document.getElementById('right').style.visibility = 'visible';


			document.getElementById('right').style.display = 'block';
			document.getElementById('left').style.display = 'block';
			// document.getElementById(book_counter).style.display = 'none';
			if(book_counter + 1 <= bookList.length) {
				book_counter = book_counter + 1;
				replace();
				if (book_counter == bookList.length - 1) {
					document.getElementById('right').style.visibility = 'hidden';
				}
			}
		}
}
