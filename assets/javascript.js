// Initialize Firebase
$(document).ready(function () {
  console.log

   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyDABzdc-kR06HoO_f0yP1bdbJvXYuK9cvc",
    authDomain: "trainschedule-85fd7.firebaseapp.com",
    databaseURL: "https://trainschedule-85fd7.firebaseio.com",
    projectId: "trainschedule-85fd7",
    storageBucket: "trainschedule-85fd7.appspot.com",
    messagingSenderId: "60763308452",
    appId: "1:60763308452:web:1b7335e98dbb2898"
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