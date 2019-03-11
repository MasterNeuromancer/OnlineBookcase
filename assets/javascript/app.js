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