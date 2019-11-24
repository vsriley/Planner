var day = "";
var monthNumber = "";
var monthWord = "";
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var year = "";
var currentDate = "";
var newDate = new Date();
var currentHour = newDate.getHours();
var morning = "AM";
var afternoon = "PM";

var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

function getCurrentDate(){
    console.log(Date());
    console.log("Date: " + newDate.getDate());
    console.log("Month: " + newDate.getMonth());
    console.log("Year: " + newDate.getFullYear());
    console.log("Current Hour: " + newDate.getHours());
    day = newDate.getDate();
    year = newDate.getFullYear();
    monthNumber = newDate.getMonth();
    monthWord = months[monthNumber];
    currentDate = monthWord + " " + day + ", " + year;
    console.log("Current Date: " + currentDate);
    $("#currentDay").text(currentDate);
};

function createTimeBlocks(){
    //create time blocks from 9AM to 5PM (9 hour span)
    //current time in red, past time in gray, future time in green
    //create three separate columns, one of time, one of input, and one with save button?
    for (var i = 0; i < 9; i++){
        var newRow = $('<div>');
        var timeColumn = $('<div>');
        var inputBox = $('<input>');
        var buttonColumn = $('<div>');
        var saveButton = $('<button>');

        newRow.attr("class", "row time-block");
        //set timeColumn attributes
        timeColumn.attr("class", "hour col-md-2");
        if(hours[i] > 8 && hours[i] < 12){
            timeColumn.text(hours[i] + morning);
            
        } else {
            timeColumn.text(hours[i] + afternoon);
        }
        
        //set input column attributes (make sure they correspond with current hour)
        var hourInMilitaryTime;
        if(hours[i] < 8){
            hourInMilitaryTime = hours[i]+12;
        } else {
            hourInMilitaryTime = hours[i];
        }

        if(hourInMilitaryTime === currentHour){
            //current hour
            inputBox.attr("class", "col-md-8 present")
        } else if (hourInMilitaryTime < currentHour){
            //past hour
            inputBox.attr("class", "col-md-8 past")
        } else{
            //future hour
            inputBox.attr("class", "col-md-8 future")
        };

        inputBox.attr("type", "text");


        //set saveButton attributes
        buttonColumn.attr("class", "col-md-2");
        saveButton.attr("class", "saveBtn");
        buttonColumn.append(saveButton);

        //append all items to the page
        newRow.append(timeColumn);
        newRow.append(inputBox);
        newRow.append(buttonColumn);
        $(".container").append(newRow);
    }

}

getCurrentDate();
createTimeBlocks();