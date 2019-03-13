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
    userName = $("#username-input").val().trim();
    $("#username-display").text(userName);
    userName = userName.toLowerCase();
    $("#table-data").empty();

    database.ref(userName).on("child_added", function (snapshot) {
        var book = snapshot.val();
        var key = snapshot.key;
        book.key = key;
        userData.push(book);
        ISBNArray.push(book.ISBN);
        printTable(userData);
    });

    $("#username-input").val("");
    $("#username-modal").modal("hide");

});

//Remove book by key
function removeByKey(key) {
    database.ref(userName).child(key).remove();
    for (var i = 0; i < userData.length; ++i) {
        if (userData[i].key === key) {
            userData.splice(i, 1);
            break;
        }
    }
    printTable(userData);
}

/*    Function Takes ISBN, Makes AJAX Call To API, Pushes To Firebase    */
function ISBN_to_firebase(ISBN, title = false) {


    var PATH = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
    if (title) {
        PATH = "https://www.googleapis.com/books/v1/volumes?q=intitle:"
    }
    var queryURL = PATH + ISBN;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (r) {
        console.log(r);
        if (ISBNArray.includes(r.items[0].volumeInfo.industryIdentifiers[0].identifier)) {
            return;
        }
        //pull the isbn out of the response and add it to ISBNArray. This is to catch when we add books by title
        ISBNArray.push(r.items[0].volumeInfo.industryIdentifiers[0].identifier);
        ISBNArray.push(ISBN);
        if ("items" in r) {
            var authorToLog = "";
            var genreToLog = "";
            var pageCountToLog = "";
            var publishedDateToLog = "";
            var snippetToLog = "";
            var titleToLog = "";
            var ISBNToLog = ""

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
                publishedDateToLog = r.items[0].volumeInfo.publishedDate.slice(0, 4);
            }

            if ("description" in r.items[0].volumeInfo) {
                snippetToLog = r.items[0].volumeInfo.description;
            }

            if ("industryIdentifiers" in r.items[0].volumeInfo) {
                ISBNToLog = r.items[0].volumeInfo.industryIdentifiers[0].identifier;
            }

            database.ref(userName).push({
                author: authorToLog,
                title: titleToLog,
                genre: genreToLog,
                pages: pageCountToLog,
                date: publishedDateToLog,
                ISBN: ISBNToLog,
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
    navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: { ideal: 'environment' } } }).then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.play();
        isLooping = setInterval(loopReadVideo, 100);
    });
})

//this runs when the modal is closed and stops the video and the barcode scanning
$('#exampleModal').on('hidden.bs.modal', function (e) {
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

$("#ISBN-entry-submit").click(function (event) {
    ISBN_to_firebase($("#ISBN-entry").val());
    $("#ISBN-entry").val("");
})

$("#title-entry-submit").click(function (event) {
    ISBN_to_firebase($("#title-entry").val(), true);
    $("#title-entry").val("");
})

$(document).on("click", ".remove", function (event) {
    removeByKey($(this).val());
})

$("#delete-entry-button").click(function (event) {
    if (deleteShown) {
        $(".remove").hide();
        $("#delete-header").css("opacity", ".2")
        deleteShown = false
    } else {
        $("#delete-header").css("opacity", "1")
        $(".remove").show();
        deleteShown = true;
    }
}) 