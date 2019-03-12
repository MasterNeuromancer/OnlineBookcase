/*    FIREBASE BOILERPLATE    */
var config = {
    apiKey: "AIzaSyDWe0UI_fJcDGtzqvfFuvHPkbAZddTW9cI",
    authDomain: "project1-36185.firebaseapp.com",
    databaseURL: "https://project1-36185.firebaseio.com",
    projectId: "project1-36185",
    storageBucket: "project1-36185.appspot.com",
    messagingSenderId: "112275278683"
};
firebase.initializeApp(config);

var database = firebase.database();
var ISBNArray = [0];
var userData = [];
var userName = "default";
$("#username-modal").modal("show");
$("#username-submit").click(function (event) {
    if ($("#username-input").val().trim() === "") {
        return;
    }
    event.preventDefault();
    userName = $("#username-input").val().trim();
    $("#username-display").text(userName);
    userName.toLowerCase();
    console.log(userName);
    $("#table-data").empty();

	database.ref(userName).on("child_added", function (snapshot) {
    	var book = snapshot.val();
    	ISBNArray.push(book.ISBN);
		  userData.push(book);
		  printTable(userData);
    
        /*var popover = $("<button>");
        popover.attr("data-toggle", "popover");
        popover.attr("type", "button");
        popover.attr("class", "btn btn-secondary");
        popover.attr("data-content", book.snippet);
        popover.attr("title", book.title);
        popover.attr("data-placement", "bottom");
        popover.attr("data-container", "body");
        popover.html("Plot Summary");

        */
    	
	});

    $("#username-modal").modal("hide");

})
/* 		ISBN_to_firebase can be in a serperate file 	*/
/*    Function Takes ISBN, Makes AJAX Call To API, Pushes To Firebase    */
function ISBN_to_firebase(ISBN) {
    if (ISBNArray.includes(ISBN)) {
        return;
    }
    ISBNArray.push(ISBN);
    var PATH = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
    var queryURL = PATH + ISBN;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (r) {
        console.log(r);
        if ("items" in r) {
            var authorToLog = "'No Author Listed'";
            var genreToLog = "'No Genre Listed'";
            var pageCountToLog = "'Pages Not Listed'";
            var publishedDateToLog = "'Date Not Listed'";
            var snippetToLog = "'Description Not Listed'";
            var titleToLog = "'Title Not Listed'";

            if ("authors" in r.items[0].volumeInfo) {
                authorToLog = r.items[0].volumeInfo.authors[0];
            }

            if ("title" in r.items[0].volumeInfo) {
                titleToLog = r.items[0].volumeInfo.title;
            }

            if ("categories" in r.items[0].volumeInfo) {
                genreToLog = r.items[0].volumeInfo.categories[0];
            }

            if ("pageCount" in r.items[0].volumeInfo) {
                pageCountToLog = r.items[0].volumeInfo.pageCount;
            }

            if ("publishedDate" in r.items[0].volumeInfo) {
                publishedDateToLog = r.items[0].volumeInfo.publishedDate;
            }

            if ("description" in r.items[0].volumeInfo) {
                snippetToLog = r.items[0].volumeInfo.description;
            }

            database.ref(userName).push({
                author: authorToLog,
                title: titleToLog,
                genre: genreToLog,
                pages: pageCountToLog,
                date: publishedDateToLog,
                ISBN: ISBN,
                snippet: snippetToLog
            });

        }
    });
}


//dynamsoft setup stuff. Don't touch!
dynamsoft = self.dynamsoft || {};
dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
dynamsoft.dbrEnv.licenseKey = "t0068NQAAAHxEehhBKsGc6F+dzhfc1x96c1PdDvXS0QvdKSCJ5MRbnktL10RRpebZDoQTgQn9srBJcFZI/x+ZJeMmSj3Zmo4=";
//this holds the setInterval for the barcode reading function.
var isLooping = 0;

//When the scan barcode button is clicked, this brings up the modal containing the video and asks for webcam persmission and starts barcode scanning
var videoElement = $("#video")[0];
$("#scan-barcode").on("click", function () {
    console.log("Start Video");
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
            ISBN_to_firebase(result.BarcodeText);
        }
        return reader.deleteInstance();
    }).catch(ex => {
        reader.deleteInstance();
    });
};


