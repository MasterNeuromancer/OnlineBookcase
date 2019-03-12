console.log("sort.js linked");

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
