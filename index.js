//////////////////////////////////////////
//  Spritesheet Animation[Horizontal]  //
/////////////////////////////////////////

//image reference
const imageElement = document.querySelector('#animation');

//original width of a image
const originalWidth = 1920;
const originalHeight = 1080;

//scaling factor of the image
const scaleFactor = 0.2;

//scaled width and height of an image
const width = originalWidth*scaleFactor;
const height = originalHeight*scaleFactor;

//total scaled sprite width and height of the image
const totalHeight = 1*height;
const totalWidth = 13*width;

//frame related constants
const frameRate = 50;
const frameInterval = 1000/frameRate;
const totalDuration = 13;
const lastFrame = 3;
const firstFrame = 0;

//inital constraints
const initTop = 0;
const initLeft = -firstFrame*width;

//final constraints
const lastLeft = -(totalWidth - (totalDuration-lastFrame)*width);
const lastTop = 0;

//variables that track the latest frame
let latestTop;
let latestLeft;

//holds the animation
let animation;

//setting the width and height for the sprite
imageElement.width = totalWidth;
imageElement.height = totalHeight;

//setting the initial position of the image
imageElement.style.left = `${initLeft}px`;
imageElement.style.top = `${initTop}px`;

///stopping the animation
function stopAnimation() {
    if(animation)clearInterval(animation);
}

///play the animation left to right
function playAnimationForward() {

    //initialising latest positions in the first iteration
    if(!latestLeft || Math.abs(latestLeft) === totalWidth - width) latestLeft = initLeft;
    if(!latestTop) latestTop = initTop;

    //stopping already running animations
    stopAnimation();

    //initialise current positions
    let currentLeft = latestLeft;
    let currentTop = latestTop;

    //Creating animation
    animation = setInterval(function() {
        
        //update position
        currentLeft -= width;
        
        //setting the position of the image
        imageElement.style.left = `${currentLeft}px`;
        imageElement.style.top = `${currentTop}px`;

        //update latest position
        latestLeft = currentLeft;
        latestTop = currentTop;

        //stop animation if
        //the last sprite is reached
        if(currentLeft === lastLeft) {
            stopAnimation()
        }
    }, frameInterval);
} 

///play the animation right to left
function playAnimationBackward() {
    
    //if the animation didn't begin yet
    //or if it is at the starting position
    //abort this function
    if(!latestLeft || latestLeft === initLeft) return;

    //stop already running 
    //animations
    stopAnimation();

    //update current position
    let currentLeft = latestLeft;
    let currentTop = latestTop;

    //setting the animation
    animation = setInterval(function() {

        //update the current postion
        currentLeft += width;

        //set position
        imageElement.style.left = `${currentLeft}px`;
        imageElement.style.top = `${currentTop}px`;
        
        //update latest position
        latestLeft = currentLeft;
        latestTop = currentTop;

        //stop animation if it 
        //reaches the beginning
        if(currentLeft === initLeft) {
            stopAnimation()
        }
    }, frameInterval);
} 
