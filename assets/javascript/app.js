
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9970dStsxk9HoxpB8yLX-8LI943tNxHI",
    authDomain: "trainsheet-dae01.firebaseapp.com",
    databaseURL: "https://trainsheet-dae01.firebaseio.com",
    projectId: "trainsheet-dae01",
    storageBucket: "trainsheet-dae01.appspot.com",
    messagingSenderId: "43706391620"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#train-name-input").val().trim();
  var Destination = $("#dest-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#freq-input").val().trim();

  var newTrain ={
    name : name,
    Destination : Destination,
    firstTrain:firstTrain,
    frequency:frequency,
  };
//current time
//var currentTime = moment();
//console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
// Logs everything to console
//console.log(trainName);
//console.log(trainDest);
//console.log(firstTrain);
//console.log(trainFreq);

database.ref().push(newTrain);
alert("Train successfully added");
// Clears all of the text-boxes
$("#train-name-input").val("");
$("#dest-input").val("");
$("#firstTrain-input").val("");
$("#freq-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var name = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;

// consolelog  Info user
console.log(childSnapshot.trainName);
console.log(childSnapshot.trainDest);
console.log(childSnapshot.firstTrain);
console.log(childSnapshot.trainFreq);

// First Time (pushed back 1 year to make sure it comes before current time)
var trainTimeCalc = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTrain);

// Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(trainTimeCalc), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var trainArrival = moment(nextTrain).format("hh:mm");

// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(name),
  $("<td>").text(destination),
  $("<td>").text(frequency),
  $("<td>").text(nextTrain),
  $("<td>").text(trainArrival),
  
);
// Append the new row to the table
$("#train-table > tbody").append(newRow);
});



    

