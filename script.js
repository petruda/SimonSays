// THE COMPUTER GENERATED PATTERN
var gamePattern = [];
// THE USER GENERATED PATTERN
var userClickedPattern = [];
// THE COLORS FOR THE COMPUTER SO IT CAN GENERATE A RANDOM PATTERN BASED ON AN INDEX FROM THE ARRAY
var buttonColours = ["red", "blue", "green", "yellow"];
// LEVEL COUNT / WRONG DISPLAY
var level = 0 ;
// JESUS CHRIST THIS FUNCTION IS HELL, IT BASICALLY JUST CHECK IF BOTH PATTERNS ARE CORRECT.
//STRATS OVER THE GAME WHEN WRONG
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        // set a variable to count how many colors the user got right
        var count = 0;
        // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
        for (var i = 0; i < gamePattern.length; i++) {
          if(gamePattern[i] === userClickedPattern[i]){
            // if the two values matche, count + 1
            count++;
          }
        }
        // ONLY if the count is the same number as gamePattern length,
        // (meaning each one of the colors was right) then it's success
        if(count === gamePattern.length){
          console.log("success");
          setTimeout(function(){
              nextSequence();
            }, 1000);
        }
        // otherwise, it's wrong and trigger Game Over
      } else {
        console.log("wrong");
          var wrongAudio = new Audio("sounds/wrong.mp3");
          wrongAudio.play();
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          },200);
          $("h1").text("Game Over Press Any Key to Restart.");
          startOver();
      }
    }
// GENERATES THE NEXT SEQUENCE AND UPDATES THE LEVEL DISPLAY/ RESETS THE PATTERN OF THE PLAYER FOR EVERY LEVE
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var colourId = "#" + randomChosenColour;
    $(colourId).fadeOut(100).fadeIn(100);
     var audio = new Audio("./sounds/" + randomChosenColour + ".mp3" );
     audio.play();
}
// TO PRESS A BUTTON AND THEN IT PUSHES IT INTO THE THE ARRAY, ALL THE BUTTON WORK
$(".btn").on("click", function(){
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour); 
     playSound(userChosenColour); 
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.lastIndexOf(userChosenColour)); 
})

// TO PLAY THE SOUNDS 
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3" );
    audio.play();
}
//ANIMATES THE BUTTONS WHEN PRESSED
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed")
    }, 100)
};
//FOR THE FIRST KEY PRESS
var pressed = false;
var level = 0;
 
$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
})
//ENDS HERE



//RESETS EVERYTHING THAT NEEDS TO BE RESETED IN ORDER FOR THE GAME TO BE PLAYED AGAIN    
function startOver(){
 level = 0;
 gamePattern = [];
 pressed = false;
 }