//jQuery - everything in the ready(function(){..code.. })
$(document).ready(function(){
    let isWorking = false;
    let isPaused = false;
    let timerObj;
    let currentStateDuration; //will change bassed on what is toggled
    const workDuration = 25 * 60;
    const restDuration = 5 * 60;
    const clockDisplay = $('#clock');  //select element wiht ID of 'clock'

    function parseTime(durationInSeconds) {
        //Given int of seconds, return strings for minutes, seconds
        //Parse Minutes & Seconds
        minutes = parseInt(durationInSeconds / 60, 10);
        seconds = parseInt(durationInSeconds % 60, 10);
        //Append a leading 0
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return [minutes, seconds];
    }

    function setTimeText(display, durationInSeconds) {
        //will set the time on the display object
        timeToShow = parseTime(durationInSeconds);
        display.text(timeToShow[0] + ' : ' + timeToShow[1]);
    }

    function resetApp(display, duration) {
        //Called on reset button and changing state work/rest
        clearInterval(timerObj);
        setTimeText(display, duration);
        //Return to initial state
        isWorking = false;
        isPaused = false;
    }

    //Initialize to Work values
    currentStateDuration = workDuration;
    $('#work').css("text-decoration","underline");
    $('#work').css("background-color", "#5ebdf5");
    setTimeText(clockDisplay, currentStateDuration);

    //Run timer
    function startTimer(duration, display) {
        let timeRemaining = duration;
        //Update Clock, called each second
        let updateClock = function() {
            if (!isPaused) {
                //If isPaused, it is paused, no updates, no decrementing, timer still running
                setTimeText(display, timeRemaining);
                //Decrement
                timeRemaining -= 1;

                //If time completed, kill timer & break/next session
                if (timeRemaining < 0) {
                    clearInterval(timerObj);
                    display.text("DONE");
                    //if was working, offer break
                    //if was on break, offer work
                }
            }
        }
        //Actually run the timer
        timerObj = setInterval(updateClock, 1000);
    }

    //### Handle Button Logic ###
    //Start button
    $('.start').click(function() {  //select elements with class of 'start'
        if (isWorking === false & isPaused === false) {
            clockDisplay.text('START!');
            startTimer(currentStateDuration, clockDisplay);
            isWorking = true; //will prevent multiple timer objects from running
        }
        if (isPaused) {
            //Resume
            isPaused = false;
        } 
    })
    //Stop button
    $('.stop').click(function() {
        //Pause
        isPaused = true;
        //Disable Stop button & Enable Start
        
    })
    //Reset button
    $('.reset').click(function() {
        resetApp(clockDisplay, currentStateDuration);
    })
    //Work State
    $('#work').click(function() {
        //If not on work, change the time and reset
        if (currentStateDuration != workDuration) {
            currentStateDuration = workDuration;
            resetApp(clockDisplay, currentStateDuration);
        }//else do nothing
        //Button css
        $('#work').css("text-decoration","underline");
        $('#rest').css("text-decoration","none");
        $('#work').css("background-color", "#5ebdf5");
        $('#rest').css("background-color", "rgb(0, 114, 245)");
    })
    //Rest State
    $('#rest').click(function() {
        if (currentStateDuration != restDuration) {
            currentStateDuration = restDuration;
            resetApp(clockDisplay, currentStateDuration);
        } //else do nothing
        //Button css
        $('#rest').css("text-decoration","underline");
        $('#work').css("text-decoration","none");
        $('#rest').css("background-color", "#5ebdf5");
        $('#work').css("background-color", "rgb(0, 114, 245)");
    })

})
