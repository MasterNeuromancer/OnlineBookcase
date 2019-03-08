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

Initialize Firebase
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

var testing = "testing"

var userName = "matt"

database.ref(userName).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data

    var row = $("<tr>");
    row.append($("<th>").text(sv.author);
    row.append($("<th>").text(sv.genre);
    row.append($("<th>").text(sv.title);
    row.append($("<th>").text(monthsWorked));
    row.append($("<th>").text(snapshot.val().rate));
    row.append($("<th>").text(monthsWorked * parseInt(snapshot.val().rate)));

    $("#employee-data").append(row);
    console.log(sv.author);
    console.log(sv.genre);
    console.log(sv.title);
});