/*
 * TODO:
 * - change color of circles, so they aren't all the same shade
 * - add a decleration speed, so when the mouse is hovering over
 * 		circle and moves out, the circle keeps moving in that
 * 		direction, and slowly slows down
 * - change speeds of circles so they aren't as slow
 * 		- change speeds of circles based on location of page?
 * - change size of canvas when window resizes
 *
 */

// canvas info
var canvasID = "backgroundAnimationCanvas";
var canvasParentID = "backgroundAnimationParent";

var canvasWidth = 0;
var canvasHeight = 0;

var canvas;


// resize canvas with window change
var resizeTimer;

$(window).on('resize', function(e) {

	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {

		canvasWidth = document.body.clientWidth;
		canvasHeight = window.innerHeight;

		//$("#" + canvasID).height(canvasHeight).width(canvasWidth);
		canvas = createCanvas(canvasWidth, canvasHeight);
		canvas.id(canvasID);
		canvas.parent(canvasParentID);

		fill(61, 27, 95, 175);

	}, 250);

});


// background info
var backgroundRed = 51;
var backgroundGreen = 17;
var backgroundBlue = 85;


// properties of bursts
var diameterMin = 200;
var diameterMax = 500;
var speedMin = 0.1;
var speedMax = 0.3;

var redMin = 51, redMax = 71;
	//redMin = 201; redMax = 221;
var greenMin = 17, greenMax = 37;
	//greenMin = 167; greenMax = 187;
var blueMin = 85, blueMax = 105;
	//blueMin = 235; blueMax = 255;

var numberBursts = 0;
var burstsRatio = 80000;
var burstsArray = [];

var randomDiameters = [
	416, 428, 477, 473, 366,	367, 352, 322, 275, 390,
	423, 480, 421, 230, 410,	314, 204, 462, 482, 288,
	313, 228, 218, 442, 381,	304, 416, 203, 330, 379,
	467, 297, 270, 436, 306,	445, 257, 469, 482, 407,
	219, 383, 445, 396, 495, 	401, 266, 308, 421, 212
];
var randomPositionSpeeds = [
	[ 0.1,  0.1], [ 0.1,  0.1], [ 0.1,  0.1], [-0.1, -0.1], [-0.1, -0.1],
	[-0.1,  0.1], [-0.1, -0.1], [ 0.1,  0.1], [ 0.1,  0.1], [-0.1,  0.1],

	[ 0.1,  0.1], [ 0.1,  0.1], [ 0.1, -0.1], [-0.1, -0.1], [ 0.1, -0.1],
	[ 0.1, -0.1], [ 0.1, -0.1], [ 0.1,  0.1], [ 0.1,  0.1], [-0.1,  0.1],

	[ 0.1, -0.1], [-0.1, -0.1], [-0.1, -0.1], [ 0.1, -0.1], [ 0.1, -0.1],
	[ 0.1,  0.1], [-0.1,  0.1], [-0.1,  0.1], [ 0.1, -0.1], [-0.1, -0.1],

	[ 0.1,  0.1], [-0.1, -0.1], [-0.1,  0.1], [-0.1, -0.1], [-0.1, -0.1],
	[ 0.1, -0.1], [-0.1,  0.1], [-0.1, -0.1], [-0.1, -0.1], [ 0.1, -0.1],

	[ 0.1,  0.1], [-0.1, -0.1], [-0.1, -0.1], [ 0.1,  0.1], [ 0.1, -0.1],
	[ 0.1, -0.1], [-0.1, -0.1], [ 0.1, -0.1], [ 0.1, -0.1], [ 0.1, -0.1],
];
var randomColors = [
	[59, 30,  85], [52, 27,  92], [70, 17,  88], [69, 35, 101], [53, 28,  98],
	[54, 18,  88], [55, 21, 101], [60, 25,  96], [59, 30,  93], [69, 26,  96],

	[64, 32,  98], [60, 32, 101], [54, 26,  96], [67, 25,  90], [53, 35, 101],
	[58, 26,  95], [51, 20, 103], [62, 26,  87], [65, 29,  98], [51, 19, 104],

	[63, 19,  94], [64, 23,  95], [51, 19,  98], [61, 25,  94], [62, 27,  90],
	[70, 30,  98], [55, 25,  94], [65, 36,  86], [56, 20,  99], [57, 36, 101],

	[53, 30,  98], [69, 18,  86], [52, 34, 102], [53, 21, 101], [64, 21, 101],
	[68, 25, 103], [57, 18,  91], [66, 21, 100], [54, 22,  92], [53, 34, 101],

	[61, 32,  93], [63, 24,  91], [54, 30,  96], [65, 23,  95], [68, 32,  87],
	[66, 21, 102], [51, 17,  92], [65, 22, 103], [53, 20,  89], [55, 34,  86]
];
var randomColorSpeeds = [
	[ 0.3,  0.3,  0.3], [ 0.3, -0.3,  0.3], [ 0.3, -0.3, -0.3], [ 0.3, -0.3, -0.3], [-0.3, -0.3,  0.3],
	[ 0.3,  0.3, -0.3], [-0.3,  0.3,  0.3], [-0.3, -0.3, -0.3], [-0.3,  0.3,  0.3], [-0.3, 0.3,  -0.3],

	[ 0.3, -0.3,  0.3], [-0.3, -0.3,  0.3], [-0.3,  0.3, -0.3], [ 0.3,  0.3, -0.3], [-0.3, -0.3, -0.3],
	[ 0.3, -0.3,  0.3], [ 0.3, -0.3, -0.3], [-0.3, -0.3, -0.3], [ 0.3, -0.3,  0.3], [ 0.3, -0.3,  0.3],

	[ 0.3,  0.3,  0.3], [ 0.3,  0.3,  0.3], [-0.3,  0.3, -0.3], [-0.3,  0.3, -0.3], [-0.3, -0.3,  0.3],
	[-0.3,  0.3,  0.3], [ 0.3, -0.3, -0.3], [ 0.3,  0.3,  0.3], [-0.3,  0.3, -0.3], [ 0.3, -0.3, -0.3],

	[-0.3,  0.3, -0.3], [ 0.3,  0.3,  0.3], [-0.3, -0.3,  0.3], [-0.3, -0.3, -0.3], [ 0.3,  0.3, -0.3],
	[-0.3,  0.3,  0.3], [ 0.3,  0.3, -0.3], [-0.3, -0.3,  0.3], [ 0.3, -0.3, -0.3], [-0.3, -0.3, -0.3],

	[-0.3, -0.3, -0.3], [-0.3,  0.3,  0.3], [-0.3, -0.3,  0.3], [-0.3, -0.3, -0.3], [ 0.3, -0.3, -0.3], [-0.3, -0.3, -0.3], [ 0.3, -0.3,  0.3], [ 0.3,  0.3, -0.3], [-0.3, -0.3, -0.3], [ 0.3,  0.3,  0.3]
];



function setup() {

	// setup the canvas
	canvasWidth = document.body.clientWidth;
	canvasHeight = window.innerHeight;
	//console.log(canvasWidth + " - " + canvasHeight);

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.id(canvasID);
	canvas.parent(canvasParentID);


	// background
	//background(backgroundRed, backgroundGreen, backgroundBlue);
	background(255, 255, 255);


	// attributes
	noStroke();
	frameRate(60);
	fill(61, 27, 95, 175);

	numberBursts = Math.floor( (canvasWidth*canvasHeight)/burstsRatio );
	console.log(numberBursts);

	for(var i=0; i<numberBursts; i++) {
		newBurst = {
			diameter : randomDiameters[i],
			position : {
				x: Math.floor(Math.random() * canvasWidth),
				y: Math.floor(Math.random() * canvasHeight)
			},
			positionSpeeds : {
				x: randomPositionSpeeds[i][0],
				y: randomPositionSpeeds[i][1]
			},
			color : {
				r: randomColors[i][0],
				g: randomColors[i][1],
				b: randomColors[i][2]
				//r: Math.floor(Math.random() * (redMax-redMin)) + redMin,
				//g: Math.floor(Math.random() * (greenMax-greenMin)) + greenMin,
				//b: Math.floor(Math.random() * (blueMax-blueMin)) + blueMin,
			},
			colorSpeeds	: {
				r: randomColorSpeeds[i][0],
				g: randomColorSpeeds[i][1],
				b: randomColorSpeeds[i][2]
			}
		}
		burstsArray.push(newBurst);
	}

};

function draw() {
	//

	background(35,39,44);
	background(backgroundRed, backgroundGreen, backgroundBlue);
	background(21, 7, 35);
	background(255, 255, 255);

	for(var i=0; i<numberBursts; i++) {
		drawBurst(burstsArray[i]);
	}
};

//var dist = 0;
function drawBurst(burst) {

	// hit edge - top or bottom
	if(burst.position.y <= 0 || burst.position.y >= canvasHeight) {
		burst.positionSpeeds.y *= (-1);
	}
	// hit edge -  left or right
	if(burst.position.x <= 0 || burst.position.x >= canvasWidth) {
		burst.positionSpeeds.x *= (-1);
	}
	// move it
	burst.position.x += burst.positionSpeeds.x;
	burst.position.y += burst.positionSpeeds.y;

	// check if color hitting edge
	if(burst.color.r <= redMin || burst.color.r >= redMax)
		burst.colorSpeeds.r *= (-1);
	if(burst.color.g <= greenMin || burst.color.g >= greenMax)
		burst.colorSpeeds.g *= (-1);
	if(burst.color.b <= blueMin || burst.color.b >= blueMax)
		burst.colorSpeeds.b *= (-1);
	// change color
	burst.color.r += burst.colorSpeeds.r;
	burst.color.g += burst.colorSpeeds.g;
	burst.color.b += burst.colorSpeeds.b;


	// draw it
	fill(burst.color.r, burst.color.g, burst.color.b, 175);
	ellipse(burst.position.x, burst.position.y, burst.diameter, burst.diameter);
}
