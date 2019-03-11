<<<<<<< HEAD
/*    FIREBASE BOILERPLATE    */
=======
// Initialize Firebase
>>>>>>> 06081d5b636fae110d0172c245b95f615d48135f
var config = {
    apiKey: "AIzaSyDWe0UI_fJcDGtzqvfFuvHPkbAZddTW9cI",
    authDomain: "project1-36185.firebaseapp.com",
    databaseURL: "https://project1-36185.firebaseio.com",
    projectId: "project1-36185",
    storageBucket: "project1-36185.appspot.com",
    messagingSenderId: "112275278683"
};
firebase.initializeApp(config);
<<<<<<< HEAD
var database = firebase.database();

/*    Function Takes ISBN, Makes AJAX Call To API, Pushes To Firebase    */
function ISBN_to_firebase(ISBN){
	var PATH = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
	var queryURL = PATH + ISBN;
	$.ajax({
    	url: queryURL,
    	method: "GET"
	}).then(function (r) {
    	console.log(r);
   		console.log(r.items[0].volumeInfo.authors[0]);
   		console.log(r.items[0].volumeInfo.title);
   		console.log(r.items[0].volumeInfo.categories[0]);
   		console.log(r.items[0].volumeInfo.pageCount);
		console.log(r.items[0].volumeInfo.publishedDate);

		database.ref(userName).push({
			author: r.items[0].volumeInfo.authors[0],
			title: r.items[0].volumeInfo.title,
			genre: r.items[0].volumeInfo.categories[0],	
			pages: r.items[0].volumeInfo.pageCount,
			date: r.items[0].volumeInfo.publishedDate

		});
	});
}
TestingISBN = "0451524934";
ISBN_to_firebase(TestingISBN);

/*    Update UI From DB    */
var userName = "matt"
database.ref(userName).on("child_added", function (snapshot) {
    var book = snapshot.val();
    var row = $("<tr>");
    row.append($("<th>").text(book.title));
    row.append($("<th>").text(book.author));
    row.append($("<th>").text(book.genre));
    row.append($("<th>").text(book.date));
    row.append($("<th>").text(book.pages));
    row.append($("<th>").text("..."));
    $("#table-data").append(row);
});






=======


//dynamsoft setup stuff. Don't touch!
dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
dynamsoft.dbrEnv.licenseKey = "t0068NQAAAHxEehhBKsGc6F+dzhfc1x96c1PdDvXS0QvdKSCJ5MRbnktL10RRpebZDoQTgQn9srBJcFZI/x+ZJeMmSj3Zmo4=";
//this holds the setInterval for the barcode reading function.
var isLooping = 0;


var apiGoogle = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

var bookISBN = "0451524934";

var queryURL = apiGoogle + bookISBN;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log(response.items[0].volumeInfo.authors[0]);
    console.log(response.items[0].volumeInfo.title);
    console.log(response.items[0].volumeInfo.categories[0]);
    console.log(response.items[0].volumeInfo.pageCount);
    console.log(response.items[0].volumeInfo.publishedDate);
});

//When the scan barcode button is clicked, this brings up the modal containing the video and asks for webcam persmission and starts barcode scanning
var videoElement = $("#video")[0];
$("#scan-barcode").click(function () {
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: { ideal: 'environment' } } }).then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.play();
        isLooping = setInterval(loopReadVideo, 100);
    });
})

//this runs when the modal is closed and stops the video and the barcode scanning
$('#exampleModal').on('hidden.bs.modal', function (e) {
    console.log("CLOSED!")
    var stream = videoElement.srcObject;
    var videoTrack = stream.getTracks();
    videoTrack[0].stop();
    clearInterval(isLooping);
})

//reads the barcode every 100ms
var loopReadVideo = function () {
    var reader = new dynamsoft.BarcodeReader();
    reader.decodeFileInMemory($('#video')[0]).then(results => {
        for (var i = 0; i < results.length; ++i) {
            var result = results[i];
            console.log(result.BarcodeText);
        }
        return reader.deleteInstance();
    }).catch(ex => {
        reader.deleteInstance();
    });
};
>>>>>>> 06081d5b636fae110d0172c245b95f615d48135f
