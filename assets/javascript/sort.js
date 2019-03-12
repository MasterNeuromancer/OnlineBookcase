console.log("sort.js linked");
/*	userData is pushed the books from the DB on when page loads, when value are added to DB from ISBN_to_firebase	*/

$("#title-header").click(function () {
	sort(userData, "title");
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


function printTable(array) {
	$("#table-data").html("");
	for (var i = 0; i < array.length; ++i) {
		var row = $("<tr>");

		var popover = $("<button>");
		popover.attr("data-toggle", "popover");
		popover.attr("type", "button");
		popover.attr("class", "btn btn-secondary");
		popover.attr("data-content", array[i].snippet);
		popover.attr("title", array[i].title);
		popover.attr("data-placement", "left");
		popover.attr("data-container", "body");
		popover.html("<i>").attr("class", "fas fa-book-open");
		
		var removeBTN = $("<button>");
    		removeBTN.attr("type", "button");
    		removeBTN.attr("class", "remove btn btn-secondary");
    		removeBTN.attr("style", "color:red;");
		removeBTN.attr("value", "array[i].key);
    		removeBTN.html("<i>").attr("class", "far fa-trash-alt");

		row.append($("<td>").text(array[i].title));
		row.append($("<td>").text(array[i].author));
		row.append($("<td>").text(array[i].genre));
		row.append($("<td>").text(array[i].date));
		row.append($("<td>").text(array[i].pages));
		row.append($("<td>").text(array[i].ISBN));
		row.append($("<td class='text-center'>").html(popover.popover()));
		row.append($("<td class='text-center'>").html(removeBTN));
		$("#table-data").append(row);

	}
}
