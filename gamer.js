

///levels before start
var difficulty = "easy"; //default
var intervalSpeed = 2500;
var timer = 10;


//3 levels
var difficultySettings = {
    easy: { intervalSpeed: 2500, timerDuration: 15 },
    medium: { intervalSpeed: 1000, timerDuration: 9 },
    hard: { intervalSpeed: 500, timerDuration: 5 }
};

//set difficulty
function updateDifficulty() {
    intervalSpeed = difficultySettings[difficulty].intervalSpeed;
    timer = difficultySettings[difficulty].timerDuration;
    timerDisplay.textContent = 'Time: ' + timer + 's';
}

//reset pushing effect of button
function resetDepthEffect() {
    document.getElementById('button1').classList.remove('clicked');
    document.getElementById('button2').classList.remove('clicked');
    document.getElementById('button3').classList.remove('clicked');
}

function handleButton1() {
    // handleLevelButtonClick(1);
    difficulty = "easy";
    updateDifficulty();
    resetDepthEffect();
    document.getElementById('button1').classList.add('clicked');

}

function handleButton2() {
    // handleLevelButtonClick(2);
    difficulty = "medium";
    updateDifficulty();
    resetDepthEffect();
    document.getElementById('button2').classList.add('clicked');

}

function handleButton3() {
    // handleLevelButtonClick(3);
    difficulty = "hard";
    updateDifficulty();
    resetDepthEffect();
    document.getElementById('button3').classList.add('clicked');

}

// function handleLevelButtonClick(level) {
//     // Remove the "clicked" class from all buttons
//     var buttons = document.querySelectorAll('.levels button');
//     buttons.forEach(function (button) {
//         button.classList.remove('clicked');
//     });
//
//     // Add the "clicked" class to the clicked button
//     var clickedButton = document.getElementById('button' + level);
//     clickedButton.classList.add('clicked');
//
// }


///timer is global

// var timer = 5;
var timerDisplay = document.createElement('div');
timerDisplay.classList.add('timer-display');
timerDisplay.textContent = 'Time: ' + timer + 's';
timerDisplay.style.position = 'absolute';
// timerDisplay.style.top = '20px';
timerDisplay.style.left = '35%';
timerDisplay.style.bottom = '20px';
timerDisplay.style.transform = 'translateX(-50%)';
timerDisplay.style.fontSize = '54px';
timerDisplay.style.color = 'white';


///all game
function startGame() {



    /////lottie
    var lottieAnimations = [
        'butterfly1.json',
        'butterfly2.json',
        'butterfly3.json',
        'butterfly4.json',
        'butterfly2.json',
        'butterfly3.json',
        'butterfly1.json',

    ];


//gamefield
    var gameField = document.createElement('div');
    gameField.classList.add('game-field');
    gameField.classList.add('hide-cursor');

    ////score
    var score = 0;
    var scoreCounter = document.createElement('div');
    scoreCounter.classList.add('score-counter');
    scoreCounter.textContent = 'Score: ' + score;

    scoreCounter.style.position = 'absolute';
    scoreCounter.style.bottom = '20px';
    scoreCounter.style.left = '65%';
    // scoreCounter.style.fontFamily = "Arial";
    scoreCounter.style.transform = 'translateX(-50%)';
    scoreCounter.style.fontSize = '54px';
    scoreCounter.style.color = 'white';

    gameField.appendChild(scoreCounter);

    ///timer that became global and implementation outside of function
    gameField.appendChild(timerDisplay);

    ///track if game ended
    var gameEnded = false;

    var countdownInterval = setInterval(function () {
        timer--;
        timerDisplay.textContent = 'Time: ' + timer + 's';
        if(timer === 0 && !gameEnded) {
            clearInterval(countdownInterval);
            // endGame('lose');
            alert('Time Expired! Your final score is ' + score);
            endGame('Time Expired');
        }
    },1000);


///BackGround///
    var imageElement = document.createElement('img');
    imageElement.src = 'background.jpg';
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    gameField.appendChild(imageElement);

///ButterflyNet///
    var pngImage = document.createElement('img');
    pngImage.src = 'nettor.png';
    pngImage.style.position = 'absolute';
    pngImage.style.width = '190px';
    pngImage.style.height = 'auto';
    pngImage.style.pointerEvents = 'none';
    pngImage.style.zIndex = '999';
    gameField.appendChild(pngImage);

//butterfly
    lottieAnimations.forEach(function (animationPath) {
        var animationContainer = document.createElement('div');
        //
        // //add for lumos
        // animationContainer.classList.add('butterfly-container');
        // ///
        animationContainer.style.position = 'absolute';
        // var butterflyWidth = Math.random() * (200 - 50) + 50;
        // var butterflyHeight = Math.random() * (200 - 50) + 50;
        var butterflyWidth = 150;
        var butterflyHeight = 150;
        animationContainer.style.width = butterflyWidth + 'px';
        animationContainer.style.height = butterflyHeight + 'px';
        // animationContainer.style.width = '250px';
        // animationContainer.style.height = 'auto';
        animationContainer.style.pointerEvents = 'none';
        animationContainer.style.zIndex = '999';

        //
        // lumosContainer.appendChild(animationContainer)
        //
//Load lottie
        var anim = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath,
        });

        var x = Math.random() * (gameField.offsetWidth - butterflyWidth);
        var y = Math.random() * (gameField.offsetHeight - butterflyHeight);


        animationContainer.style.left = x + 'px';
        animationContainer.style.top = y + 'px';

        gameField.appendChild(animationContainer);


///mouse enter?///

//         animationContainer.addEventListener('mouseenter',function ()
//         {
//             animationContainer.remove();
//             score++;
//             scoreCounter.textContent = 'Score: ' + score;
//
//             if(score === lottieAnimations.length){
//                 alert('All butterflies caught! You win!');
//             }
//         });

        ///continuos check cursor?
        gameField.addEventListener('mousemove',function (event)
        {
            var rect = animationContainer.getBoundingClientRect();
            var netRect = pngImage.getBoundingClientRect();
            if(
                rect.left < netRect.right &&
                rect.right > netRect.left &&
                rect.top < netRect.bottom &&
                rect.bottom > netRect.top
            ){
                animationContainer.remove();
                score++;
                scoreCounter.textContent = 'Score: ' + score;

                if(score === lottieAnimations.length){
                    alert('All butterflies caught! You win!');
                    endGame('All butterflies caught');

                }
            }
        });

        ///butterfly movement
        setInterval(function () {
            var newX = Math.random() * (gameField.offsetWidth - butterflyWidth);
            var newY = Math.random() * (gameField.offsetHeight - butterflyHeight);

            animationContainer.style.transition = 'left 2s, top 2s';
            animationContainer.style.left = newX + 'px';
            animationContainer.style.top = newY + 'px';

        },difficultySettings[difficulty].intervalSpeed);
    });

            // var rect = animationContainer.getBoundingClientRect();
            // var netRect = pngImage.getBoundingClientRect();
            //
            // if(
            //     rect.left < netRect.right &&
            //     rect.right > netRect.left &&
            //     rect.top < netRect.bottom &&
            //     rect.bottom > netRect.top
            // )
            // {
            //     animationContainer.remove();
            //     score++;
            //     scoreCounter.textContent = 'Score: ' + score;
            //
            //
            //     if(score === lottieAnimations.length){
            //         alert('All butterflies caught! You win!');
            //     }
            // }


// ///hover to catch
//         animationContainer.addEventListener('mouseenter', function () {
//             // Caught
//
//             animationContainer.remove();
//             score++;
//             scoreCounter.textContent = 'Score: ' + score;
//
//             // If all caught
//             if (score === lottieAnimations.length) {
//                 alert('All butterflies caught! You win!');
//             }
//         });



    //check catch


    // }, 1000);


    //     ///handle butterfly movement
    //     setInterval(function () {
    //         var newX = Math.random() * (gameField.offsetWidth - butterflyWidth);
    //         var newY = Math.random() * (gameField.offsetHeight - butterflyHeight);
    //
    //         animationContainer.style.transition = 'left 2s, top 2s';
    //         animationContainer.style.left = newX + 'px';
    //         animationContainer.style.top = newY + 'px';
    //
    //
    //     }, 2000);
    // });


    gameField.addEventListener('mousemove', function (event) {
        var rect = gameField.getBoundingClientRect();
        var x = event.clientX - rect.left - pngImage.width / 2;
        var y = event.clientY - rect.top - pngImage.height / 2;


        pngImage.style.left = x + 'px';
        pngImage.style.top = y + 'px';
    });

///cursor back
    gameField.addEventListener('mouseleave', function () {
        document.body.classList.remove('hide-cursor');
    });


//create field and clear start field
    document.body.appendChild(gameField);
    document.querySelector('.before-start').style.display = 'none';


///lumos
    var isLumosMaximaActive = false;
    var lumosText;
    var originalCursorImage = 'nettor.png';
    var lumosCursorImage = 'newwand.png';

    ///for styling of wand///
    function setOriginalCursor () {
        pngImage.src = originalCursorImage;
        pngImage.classList.remove('lumos-cursor');
        }

        function setLumosCursor() {
            pngImage.src = lumosCursorImage;
            pngImage.classList.add('lumos-cursor');
        }


    document.addEventListener('keydown',function (event)
    {
        if(event.code === 'Space' && difficulty === 'hard') {
            isLumosMaximaActive = true;
            setLumosCursor();
// ///
//             pngImage.src = lumosCursorImage;
//             pngImage.classList.add('lumos-cursor');
//
//             ///
            lumosText = document.createElement('h1');
            lumosText.textContent = 'Lumos Maxima';
            lumosText.style.position = 'absolute';
            lumosText.style.top = '50%';
            lumosText.style.left = '50%';
            lumosText.style.transform = 'translate(-50%, -50%)';
            lumosText.style.fontSize = '108px';
            lumosText.style.color = 'white';
            lumosText.classList.add('lumos-glow');
            gameField.appendChild(lumosText);


            // Add the lumos-glow class to the game field
            gameField.classList.add('lumos-glow');

        }
    });

    document.addEventListener('keyup',function (event) {
        if(event.code === 'Space' && isLumosMaximaActive){
            isLumosMaximaActive =false;
            setOriginalCursor();

//             //
//             pngImage.src = originalCursorImage;
// ///
            if(lumosText) {
                lumosText.remove();
            }

            gameField.classList.remove('lumos-glow');


        }
    });

    setInterval(function () {
        if (isLumosMaximaActive) {
            // Move butterflies toward the cursor
            var newX = pngImage.offsetLeft;
            var newY = pngImage.offsetTop;

            document.querySelectorAll('.game-field div').forEach(function (animationContainer) {
                animationContainer.style.transition = 'left 1s, top 1s';
                animationContainer.style.left = newX + 'px';
                animationContainer.style.top = newY + 'px';
            });
        }
    }, 100);

    function endGame(outcome) {
        gameField.style.display = 'none'; // Hide the game field
        document.body.style.backgroundImage = 'url("mysticforest.jpg")'; // Set background image
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        gameEnded = true;
        if(outcome === 'All butterflies caught'){
            var winAnimationContainer = document.createElement('div');
            winAnimationContainer.style.position = 'absolute';
            winAnimationContainer.style.top = '50%';
            winAnimationContainer.style.left = '50%';
            winAnimationContainer.style.transform = 'translate(-50%, -50%)';

            document.body.appendChild(winAnimationContainer);

            var winAnimation = lottie.loadAnimation({
                container: winAnimationContainer,
                        renderer: 'svg',
                        loop: false,
                        autoplay:true,
                        path:'winner.json',
            });
        }
        else if(outcome === 'Time Expired' ){
            var loseAnimationContainer = document.createElement('div');
            loseAnimationContainer.style.position = 'absolute';
            loseAnimationContainer.style.top = '50%';
            loseAnimationContainer.style.left = '50%';
            loseAnimationContainer.style.transform = 'translate(-50%,-50%)';

            document.body.appendChild(loseAnimationContainer);
            var loseAnimation = lottie.loadAnimation({
                container: loseAnimationContainer,
                renderer:'svg',
                loop:false,
                autoplay:true,
                path:'timeexpired.json',
            });

        }

        ///lotties
    //     var lottieContainer = document.createElement('div');
    //     lottieContainer.style.position = 'absolute';
    //     lottieContainer.style.top = '50%';
    //     lottieContainer.style.left = '50%';
    //     lottieContainer.style.transform = 'translate(-50%,-50%)';
    //
    //     document.body.appendChild(lottieContainer);
    //     var animationPath = (outcome === 'win') ? 'winner.json' : 'timeexpired.json';
    //
    //     var anim = lottieAnimations.loadAnimation({
    //         container: lottieContainer,
    //         renderer: 'svg',
    //         loop: false,
    //         autoplay:true,
    //         path:animationPath,
    //     });
    //
    //     if(outcome === 'win') {
    //
    //     }else
    //     {
    //
    //     }
    //
    }
}



    // Add event listeners to toggle the custom cursor class
    // gameField.addEventListener('mouseenter', handleMouseEnter);
    // gameField.addEventListener('mouseleave', handleMouseLeave);
    // document.addEventListener('mousemove',handleMouseMove);

// function handleMouseMove(event){
//     var gameField = document.querySelector('.game-field');
//     var rect = gameField.getBoundingClientRect();
//
//     if(
//         event.clientX >= rect.left &&
//         event.clientX >= rect.right &&
//         event.clientY >= rect.top &&
//         event.clientY >= rect.bottom
//     ) {
//         document.body.classList.add('game-cursor');
//     } else
//     {
//         document.body.classList.remove('game-cursor');
//     }
// }

// function handleMouseEnter() {
//     console.log('Mouse entered game field');
//     document.body.classList.add('game-cursor');
// }
//
// function handleMouseLeave() {
//     console.log('Mouse left game field');
//     document.body.classList.remove('game-cursor');
// }
