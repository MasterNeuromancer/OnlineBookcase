console.log("sort.js linked");
/*	userData is pushed the books from the DB on when page loads, when value are added to DB from ISBN_to_firebase	*/

$("#title-header").click(function(){
	sort(userData, "title");
	printTable(userData);
});
$("#author-header").click(function(){
	sort(userData, "author");
	printTable(userData);
});
$("#genre-header").click(function(){
	sort(userData, "genre");
	printTable(userData);
});
$("#date-header").click(function(){
	sort(userData, "date");
	printTable(userData);
});
$("#pages-header").click(function(){
	sort(userData, "title");
	printTable(userData);
});
$("#isbn-header").click(function(){
	sort(userData, "title");
	printTable(userData);
});
$("#snippet-header").click(function(){
	sort(userData, "snippet");
	printTable(userData);
});

function sort(array, prop){	
	for(var i=0; i < array.length-1; i++){
		for(var j=0; j < array.length-1-i; j++){
			if(array[j][prop] > array[j+1][prop]){
				swap(j,j+1);
			}
		}
	}	
	function swap(a, b){
		var t = array[a];
		array[a] = array[b];
		array[b] = t;
	}
}


function printTable(array){
    $("#table-data").html("");
	for(var i=0; i<array.length; ++i){
		var row = $("<tr>");
    	row.append($("<td>").text(array[i].title));
    	row.append($("<td>").text(array[i].author));
    	row.append($("<td>").text(array[i].genre));
    	row.append($("<td>").text(array[i].date));
    	row.append($("<td>").text(array[i].pages));
    	row.append($("<td>").text(array[i].ISBN));
    	$("#table-data").append(row);
	}
}