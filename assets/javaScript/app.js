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

    var timeArr = addedTrainTime.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % addedFrequency;
        tMinutes = addedFrequency - tRemainder;
        // To calculate the arrival time, add the tMinutes to the currrent time
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");


      $("#schedule").append("<tr><td>" + addedTrainName + "</td><td>" + addedDestination + "</td><td>" +
          addedFrequency  + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  }


  });



