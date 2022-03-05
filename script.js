const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

let timer = [0,0,0,0];
let interval;
let runTimmer = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9){
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function startTimer(){

   
    let currentTime = leadingZero( timer[0]) + ":" + leadingZero( timer[1]) + ":" + leadingZero( timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    
    
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
    timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let testAreaValue = testArea.value;
    let originTextMatch = originText.substring(0,testAreaValue.length);

    if (testAreaValue == originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
    } else {
        if (testAreaValue == originTextMatch){
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
   
}

// Start the timer:
function start(){
   let testAreaLength = testArea.value.length;
   if (testAreaLength === 0 && !runTimmer ){
       runTimmer = true;
       interval = setInterval(startTimer,10);
   } 
   
}

// Reset everything:
function reset(){
    
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    runTimmer = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);