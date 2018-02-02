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
  	trainTime = moment($("#trainTime").val().trim(), " hh:mm").format("hh:mm");
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

  database.ref().on("child_added", function(childSnapshot) {
  	var addedTrainName = childSnapshot.val().name;
  	var addedDestination = childSnapshot.val().destination;
  	var addedFrequency = childSnapshot.val().frequency;
  	var addedTrainTime = childSnapshot.val().time;
  	console.log(addedTrainTime);

  	var trainTimeConverted = moment(addedTrainTime, "hh:mm").subtract(1, "years");
  	console.log(trainTimeConverted._i);

  	var currenTime = moment();

  	var diffTime = moment().diff(moment(addedTrainTime), "mintues");
  	console.log(diffTime);

  	var tRemainder = diffTime % addedFrequency;	
  	console.log(tRemainder);

  	var minsAway = addedFrequency - tRemainder;
		console.log(minsAway);

  	$("#schedule").append("<tr><td>" + addedTrainName + "</td><td>" + addedDestination + "</td><td>" +
  		addedFrequency  + "</td><td>" + addedTrainTime + "</td><td>" + minsAway + "</td></tr>");

  });



