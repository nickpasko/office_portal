/**
 * Created by nikolay on 24.12.17.
 */
var score = 0;

function random(min,max){
    return Math.round(Math.random() * (max-min) + min);
}

// function setBG(){
//     if (Math.round(Math.random())){
//         return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Frankenstein-icon.png";
//     } else {
//         return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Scream-icon.png";
//     }
// }

function dropBox(){
    var length = random(100, ($(".game").width() - 100));
    var velocity = random(3000, 10000);
    var size = random(50, 150);
    var thisBox = $("<div/>", {
        class: "box",
        style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
    });

    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    if(thisBox.data("test")){
        thisBox.css({"background": "url('/static/images/hans.ico')", "background-size":"contain"});
    } else {
        thisBox.css({"background": "url('/static/images/nerd.png')", "background-size":"contain"});
    }

    $(".game").append(thisBox);

    //random start for animation
    setTimeout(function(){
        thisBox.addClass("move");
    }, random(0, 5000) );

    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function(event) {
            $(this).remove();
        });
}

for (i = 0; i < 10; i++) {
    dropBox();
}

$(document).on('click', '.box', function(){
    if($(this).data("test")){
        score += 1;
        new Audio("/static/sound/win.wav").play();
    } else {
        score -= 1;
        new Audio("/static/sound/error.wav").play();
    }

    $(".score").html(score);
    $(this).remove();
});

var runGame = setInterval(function(){
    for (i = 0; i < 10; i++) {
        dropBox();
    }
}, 5000);

function countdown() {
    var seconds = 60;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            alert("Game over");
            clearInterval(runGame);
        }
    }
    tick();
}

countdown();

var backgroundMusic = new Audio('/static/sound/piano_guitar.mp3');
backgroundMusic.volume = 0.5;
backgroundMusic.addEventListener('ended', function() {
    this.play();
}, false);
backgroundMusic.play();