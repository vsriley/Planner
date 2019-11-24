var currentHour = moment().hour();
var morning = "AM";
var afternoon = "PM";

var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

console.log("Moment: " + moment());
console.log('Current Hour: ' + moment().hour());

function getCurrentDate(){
    //get current date
    var currentDate = moment().format('LL'); 
    console.log("Current Date: " + currentDate);
    $("#currentDay").text(currentDate);
};

function createTimeBlocks(){
    //create time blocks from 9AM to 5PM (9 hour span)
    //current time in red, past time in gray, future time in green
    //create three separate columns, one of time, one of input, and one with save button
    for (var i = 0; i < 9; i++){
        var newRow = $('<div>');
        var timeColumn = $('<div>');
        var inputBox = $('<input>');
        var saveButton = $('<button>');
        var fontAwesomeLock = $('<i>');

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
        inputBox.attr("name", hours[i]);
        console.log("InputBox Name: " + inputBox.attr('name'));
        
        //set events stored in local storage
        var currentPlans = localStorage.getItem(hours[i]);
        console.log("currentPlans: " + currentPlans);
        if(currentPlans != null){
            inputBox.val(currentPlans);
        }
       

        //set saveButton attributes
        fontAwesomeLock.attr("class", "fas fa-unlock-alt");
        saveButton.append(fontAwesomeLock);
        saveButton.attr("class", "saveBtn col-md-2");
        saveButton.attr("id", hours[i]);
        //append all items to the page
        newRow.append(timeColumn);
        newRow.append(inputBox);
        newRow.append(saveButton);
        $(".container").append(newRow);
    }

};


getCurrentDate();
createTimeBlocks();


$(".saveBtn").on("click", function(){
    console.log("Button clicked");
    console.log($(this).attr('id'));      //returns with the hour
    var currentPosition = $(this).attr('id');
    //gets the value from the corresponding text box
    console.log($('input[name=' +currentPosition +']').val());
    var plannerInfo = $('input[name=' +currentPosition +']').val();
    localStorage.setItem(currentPosition, plannerInfo);
});