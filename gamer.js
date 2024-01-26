function startGame() {

    var gameField = document.createElement('div');
    gameField.classList.add('game-field');
    gameField.classList.add('hide-cursor');

///BackGround///
var imageElement = document.createElement('img');
imageElement.src= 'background.jpg';
imageElement.style.width='100%';
imageElement.style.height='100%';
gameField.appendChild(imageElement);
///ButterflyNet///
var pngImage = document.createElement('img');
pngImage.src = 'nettor.png';
pngImage.style.position = 'absolute';
pngImage.style.width='150px';
pngImage.style.height='auto';
pngImage.style.pointerEvents = 'none';
pngImage.style.zIndex = '999';
gameField.appendChild(pngImage);


gameField.addEventListener('mousemove',function (event)
{
    var rect = gameField.getBoundingClientRect();
    var x = event.clientX - rect.left - pngImage.width /2;
    var y = event.clientY - rect.top - pngImage.height /2;


    pngImage.style.left = x + 'px';
    pngImage.style.top = y + 'px';
});
gameField.addEventListener('mouseleave',function()
{
    document.body.classList.remove('hide-cursor');
});

document.body.appendChild(gameField);
document.querySelector('.before-start').style.display = 'none';

    // Add event listeners to toggle the custom cursor class
    // gameField.addEventListener('mouseenter', handleMouseEnter);
    // gameField.addEventListener('mouseleave', handleMouseLeave);
    // document.addEventListener('mousemove',handleMouseMove);
}

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
