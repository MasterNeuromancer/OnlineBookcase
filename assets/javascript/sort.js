console.log("sort.js linked");
/*	userData is pushed the books from the DB on when page loads, when value are added to DB from ISBN_to_firebase	*/




var sortFlag = false;
var reverseFlag = false;
function setupHeaderHandlers(ID, prop){
	$(ID).click(function() {
		if(sortFlag !== prop){
			sort(userData, prop);
			sortFlag = prop;
			reverseFlag = false;
			printTable(userData);
		}else{
			if(reverseFlag){
				printTable(userData); //it's already in reverse, so reverse it again
				reverseFlag = false;
			}else{
				printTable(userData, true); //reverse printing with optional arg
				reverseFlag = true;
			}
		}
		console.log("sort by"+prop+"clicked");
	});
}




setupHeaderHandlers("#title-header", "title");
setupHeaderHandlers("#author-header", "author");
setupHeaderHandlers("#genre-header", "genre");
setupHeaderHandlers("#date-header", "date");
setupHeaderHandlers("#pages-header", "pages");
setupHeaderHandlers("#isbn-header", "ISBN");
setupHeaderHandlers("#snippet-header", "snippet");

/////////////abstract this into function
/*
$("#title-header").click(function () {
	sort(userData, "title");
	console.log("sort by title clicked!");
	printTable(userData);
});
$("#author-header").click(function () {
	sort(userData, "author");
	printTable(userData);
});
$("#genre-header").click(function () {
	sort(userData, "genre");
	printTable(userData);
});
$("#date-header").click(function () {
	sort(userData, "date");
	printTable(userData);
});
$("#pages-header").click(function () {
	sort(userData, "pages");
	printTable(userData);
});
$("#isbn-header").click(function () {
	sort(userData, "ISBN");
	printTable(userData);
});
$("#snippet-header").click(function () {
	sort(userData, "snippet");
	printTable(userData);
});
*/

function sort(array, prop) {
	for (var i = 0; i < array.length - 1; i++) {
		for (var j = 0; j < array.length - 1 - i; j++) {
			if (array[j][prop] > array[j + 1][prop]) {
				swap(j, j + 1);
			}
		}
	}
	function swap(a, b) {
		var t = array[a];
		array[a] = array[b];
		array[b] = t;
	}
}


function printTable(array, reverse = false) {
	$("#table-data").html("");
	for (var i = 0; i < array.length; ++i) {
		var row = $("<tr>");

		var popover = $("<button>");
		popover.attr("data-toggle", "popover");
		popover.attr("type", "button");
		popover.attr("data-content", array[i].snippet);
		popover.attr("title", array[i].title);
		popover.attr("data-placement", "left");
		popover.attr("data-container", "body");
		popover.html("<i class='fas fa-book-open'>");

		var removeBTN = $("<button>");
		removeBTN.attr("type", "button");
		removeBTN.addClass("remove");
		removeBTN.attr("style", "color:red;");
		removeBTN.attr("value", array[i].key);
		removeBTN.html("<i class='far fa-trash-alt'>")
//		console.log("Print Table");
		row.append($("<td>").text(array[i].title));
		row.append($("<td>").text(array[i].author));
		row.append($("<td>").text(array[i].genre));
		row.append($("<td>").text(array[i].date));
		row.append($("<td>").text(array[i].pages));
		row.append($("<td>").text(array[i].ISBN));
		row.append($("<td class='text-center'>").html(popover.popover()));
		row.append($("<td class='text-center'>").html(removeBTN));
		
		if(!reverse){
			$("#table-data").append(row);
		}else if(reverse){
			$("#table-data").prepend(row);
			
		}
	}
		console.log("printTable called");
}
