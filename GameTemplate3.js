//sources
// https://eloquentjavascript.net/code/chapter/17_canvas.js
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event

//initializing global variables to create a canvas
let canvasDiv;
let canvas;
let ctx;
let initialized = false;

// setup mouse position variables
let mouseX = 0;
let mouseY = 0;
//object setting mousePos
letmousePos={
    x:0,
    y:0
};
let mouseClickX = 0;
let mouseClickY = 0;


function init() {
  // create a new div element
  canvasDiv = document.createElement("div");
  canvasDiv.id = "chuck";
  // and give it some content
  canvas = document.createElement('canvas');
  // add the text node to the newly created div
  canvasDiv.appendChild(canvas);
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(canvasDiv, currentDiv);
  canvas.width = 500;
  canvas.height = 500;
  // chuck changes width and size of canvas 
  document.getElementById("chuck").style.width = canvas.width +'px';
  document.getElementById("chuck").style.height = canvas.height +'px';
  ctx = canvas.getContext('2d');
  initialized = true;
}

// create an object to hold attributes in order to draw a shape on canvas
// more comments
let oSquare = {
  w: 50,
  h: 50,
  x: 150,
  y: 200,
  // we're gunna use this later
  vx: 3,
  vy: 0,
  color: 'black'
};

// gets mouse position when clicked
addEventListener('mousemove', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

// gets mouse position when clicked
addEventListener('mousedown', mouseClick);

function mouseClick(e) {
  console.log(`Screen X/Y: ${e.screenX}, ${e.screenY}, Client X/Y: ${e.clientX}, ${e.clientY}`);
  mouseClickX = e.clientX;
  mouseClickY = e.clientY;
  return [mouseClickX, mouseClickY];
}

// updates all elements on canvas
function update() {
    //updates squares postion delta = now - then;y
  mySquare.x += mySquare.vx;
  if (mySquare.x + mySquare.w > canvas.width || mySquare.x < 0) {
      //detirmines velocity
    mySquare.vx *= -1;
  }
}

// draws text on canvas
function drawText(color, font, align, base, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  ctx.fillText(text, x, y);
}

// draws a square, circle, or rectangle
function drawSquare() {
  ctx.fillStyle = mySquare.color;
  ctx.fillRect(mySquare.x, mySquare.y, mySquare.w, mySquare.h);
  ctx.strokeRect(mySquare.x, mySquare.y, mySquare.w, mySquare.h);
}

// function drawCircle() {
//   ctx.fillStyle = myCircle.color;
//   ctx.beginPath();
//   ctx.arc(myCircle.x, myCircle.y, myCircle.r, 0, 2 * Math.PI);
//   ctx.stroke();
//   ctx.fill();
// }

// draws all the stuff on the canvas that you want to draw
function draw() {
  // clears the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText('black', "24px Helvetica", "left", "top", "FPS: " + fps, 400, 0);
  drawText('black', "24px Helvetica", "left", "top", "mousepos: " + mouseX + " " + mouseY, 0, 0);
  drawText('black', "24px Helvetica", "left", "top", "mouseclick: " + mouseClickX + " " + mouseClickY, 0, 32);
  drawSquare();
}

// set variables necessary for game loop
let delta;
let fps;
let gameDelta;
let then = performance.now();
let now;

//main game loop
function main() {
//measure time in miliseconds
  let now = performance.now();
// detirmines time since last frame
  delta = now - then;
// I have no clue
  gameDelta = Math.min(delta, 0.25);
//finds fps to nearest whole number
  fps = (Math.ceil(1000 / delta));
  // when the code begins running the remaining code makes it animate and continue animating
  if (initialized) {
    update();
    draw();
  }
  // the difference in time between now and when the code ran
  then = now;
  requestAnimationFrame(main);
}