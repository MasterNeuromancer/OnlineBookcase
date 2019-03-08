// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWe0UI_fJcDGtzqvfFuvHPkbAZddTW9cI",
    authDomain: "project1-36185.firebaseapp.com",
    databaseURL: "https://project1-36185.firebaseio.com",
    projectId: "project1-36185",
    storageBucket: "project1-36185.appspot.com",
    messagingSenderId: "112275278683"
};
firebase.initializeApp(config);

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


var videoElement = $("#video")[0];
$("#scan-barcode").click(function() {
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: { ideal: 'environment' } } }).then(function(stream) {
        videoElement.srcObject = stream;
        videoElement.play();

    });
})

$('#exampleModal').on('hidden.bs.modal', function (e) {
    console.log("CLOSED!")
    var stream = videoElement.srcObject;
    var videoTrack = stream.getTracks();
    videoTrack[0].stop();
  })