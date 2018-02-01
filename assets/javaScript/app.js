var config = {
    apiKey: "AIzaSyAHzNBJqCS2r7gX05MSwUWFDZBkwgGiW0I",
    authDomain: "trainschedulemanagement.firebaseapp.com",
    databaseURL: "https://trainschedulemanagement.firebaseio.com",
    projectId: "trainschedulemanagement",
    storageBucket: "trainschedulemanagement.appspot.com",
    messagingSenderId: "605370759206"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = 0;

  $("#submit").on("click", function(event) {
  	event.preventDefault();

  	trainName = $("#trainName").val().trim();
  	destination = $("#destination").val().trim();
  	trainTime = moment($("#trainTime").val().trim(), " hh:mm A").format(" hh:mm A");
  	frequency = $("#frequency").val().trim();
  	
  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#trainTime").val("");
  	$("#frequency").val("");

  	database.ref().push({
  		name: trainName,
  		destination: destination,
  		time: trainTime,
  		frequency: frequency
  	});
  });

  database.ref().on("child-added", function(childSnapshot) {
  	var addedTrainName = childSnapshot.val().trainName;
  	var addedDestination = childSnapshot.val().destination;
  	var addedTrainTime = childSnapshot.val().trainTime;
  	var addedFrequency = childSnapshot.val().frequency;

  	var minsAway = ;

  	$("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  		empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

  });



