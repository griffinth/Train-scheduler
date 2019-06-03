// Initialize Firebase
$(document).ready(function () {
  console.log

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDlQAAHKgsvcxJX3FnDfooTKCZaFM2Lf_M",
    authDomain: "fasttrains-aa18c.firebaseapp.com",
    databaseURL: "https://fasttrains-aa18c.firebaseio.com",
    projectId: "fasttrains-aa18c",
    storageBucket: "fasttrains-aa18c.appspot.com",
    messagingSenderId: "503804973291",
    appId: "1:503804973291:web:7e7fa2a462589f17"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;

// functions
  $("#addTrain").on("click", function () {

    trainName = $('#nameInput').val().trim();
    destination = $('#destinationInput').val().trim();
    firstTrainTime = $('#firstTrainInput').val().trim();
    frequency = $('#frequencyInput').val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });

    return false;
  });


// child added ref and function
  database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    // update the variable with data from the database
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().firstTrainTime;
    frequency = snapshot.val().frequency;


    var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
    var nowMoment = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
    var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    var minutesAway = frequency - minutesSinceLastArrival;

    var nextArrival = nowMoment.add(minutesAway, 'minutes');
    var formatNextArrival = nextArrival.format("HH:mm");


    // add table
    var tr = $('<tr>');
    var a = $('<td>');
    var b = $('<td>');
    var c = $('<td>');
    var d = $('<td>');
    var e = $('<td>');
    a.append(trainName);
    b.append(destination);
    c.append(frequency);
    d.append(formatNextArrival);
    e.append(minutesAway);
    tr.append(a).append(b).append(c).append(d).append(e);
    $('#newTrains').append(tr);

 }, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

  });
})