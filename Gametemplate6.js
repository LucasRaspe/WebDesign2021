//sources
// https://eloquentjavascript.net/code/chapter/17_canvas.js
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event

//initializing GLOBAL variables to create a canvas
let canvasDiv;
let canvas;
let ctx;
let WIDTH = 1024;
let HEIGHT= 768;
let GRAVITY = 9.8; 
let timerThen = Math.floor(Date.now() / 1000);

//container array for mobs/enemies
let mobs = [];

// lets us know if game is initialized
let initialized = false;

// setup mouse position variables
let mouseX = 0;
let mouseY = 0;

// object setting mousePos
let mousePos = {
  x: 0,
  y: 0
};

let mouseClicks = {
  x: 0,
  y: 0
};

let mouseClickX = 0;
let mouseClickY = 0;

// creating object with keys pressed

let keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.key];
}, false);

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
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.getElementById("chuck").style.width = canvas.width + 'px';
  document.getElementById("chuck").style.height = canvas.height + 'px';
  ctx = canvas.getContext('2d');
  initialized = true;
}

class Sprite {
  constructor(w, h, x, y, c) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.color = c;
    this.spliced = false;
    }
    inbounds(){
      if (this.x + this.w < WIDTH &&
          this.x > 0 &&
          this.y > 0 &&
          this.y + this.h < HEIGHT){
            console.log ('inbounds..');
        return true;
      }
      else{
        return false;
      }
    }
    collide(obj) {
      if (this.x <= obj.x + obj.w &&
        obj.x <= this.x + this.w &&
        this.y <= obj.y + obj.h &&
        obj.y <= this.y + this.h
        
      ) {
        console.log('collided with ' + obj);
        return true;
      }
    }
}

class Player extends Sprite {
  constructor(w, h, x, y, c, vx, vy) {
  super(w, h, x, y, c);
  this.vx = vx;
  this.vy = vy;
  //tried usuing hte random integer plug in but cant find one  that changes for a changing speed
  this.speed = 4;
  class Sprite {
    constructor(w, h, x, y, c) {
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
      this.color = c;
      this.spliced = false;
      }
      inbounds(){
        if (this.x + this.w < WIDTH &&
            this.x > 0 &&
            this.y > 0 &&
            this.y + this.h < HEIGHT){
              console.log ('inbounds..');
          return true;
        }
        else{
          return false;
        }
      }
      collide(obj) {
        if (this.x <= obj.x + obj.w &&
          obj.x <= this.x + this.w &&
          this.y <= obj.y + obj.h &&
          obj.y <= this.y + this.h
          
  
          
        ) {
          console.log('collided with ' + obj);
          return true;
        }
      }
  }
  this.canjump = true;
  }
  moveinput() {
    if ('w' in keysDown || 'W' in keysDown) { // Player control
        this.vx = 0;
        this.vy = -this.speed;
    } else if ('s' in keysDown || 'S' in keysDown) { // Player control
        this.vx = 0;
        this.vy = this.speed;

    } else if ('a' in keysDown || 'A' in keysDown) { // Player control
        this.vy = 0;
        this.vx = -this.speed;

    } else if ('d' in keysDown || 'D' in keysDown) { // Player control
        this.vy = 0;
        this.vx = this.speed;
    } else if ('e' in keysDown || 'E' in keysDown) { // Player control
      this.w += 1;
  }
  else if ('p' in keysDown || 'P' in keysDown) { // Player control
    paused = true;
}
    else if (' ' in keysDown && this.canjump) { // Player control
      console.log(this.canjump);
      this.vy -= 45;
      this.canjump = false;
      
  }
    else{
      this.vx = 0;
      this.vy = 0;
    }
}
  update(){
    this.moveinput();
    if (!this.inbounds()){
      if (this.x <= 0) {
        this.x = 0;
      }
      if (this.x + this.w >= WIDTH) {
        this.x = WIDTH-this.w;
      }
      if (this.y+this.h >= HEIGHT) {
        this.y = HEIGHT-this.h;
        this.canjump = true;
      }
      // alert('out of bounds');
      // console.log('out of bounds');
    }
    
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}

class Mob extends Sprite {
  constructor(w, h, x, y, c, vx, vy) {
    super(w, h, x, y, c);
    this.vx = vx;
    this.vy = vy;
    this.type = "normal";
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if (!this.inbounds()){
        if (this.x < 0 || this.x > WIDTH) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > HEIGHT) {
          this.vy *= -1;
        }
        // alert('out of bounds');
        // console.log('out of bounds');
      }
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}

// create instance of class
let player = new Player(25, 25, WIDTH/2, HEIGHT/2, 'blue', 0, 0);

// adds two different sets of mobs to the mobs array
for (i = 0; i < 10; i++){
  mobs.push(new Mob(60,60, 200, 100, 'pink', Math.random()*-2, Math.random()*-2));
  console.log(mobs);
}

while (mobs.length < 20){
  mobs.push(new Mob(10,10, 250, 200, 'purple', Math.random()*-2, Math.random()*-2));
}

// gets mouse position when clicked
addEventListener('mousemove', e => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  // we're gonna use this
  mousePos = {
    x: mouseX,
    y: mouseY
  };
});

// gets mouse position when clicked
addEventListener('mousedown', mouseClick);

function mouseClick(e) {
  console.log(`Screen X/Y: ${e.screenX}, ${e.screenY}, Client X/Y: ${e.clientX}, ${e.clientY}`);
  mouseClickX = e.clientX;
  mouseClickY = e.clientY;
  mouseClicks = {
    x: mouseClickX,
    y: mouseClickY
  };
}

// draws text on canvas
function drawText(color, font, align, base, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = base;
  ctx.fillText(text, x, y);
}
//Timers and counters

function countUp(end) {
  timerNow = Math.floor(Date.now() / 1000);
  currentTimer = timerNow - timerThen;
  if (currentTimer >= end){
    if (mobs2.length < 10){
    spawnMob(20, mobs2);
  }
    return end;
  }
  return currentTimer;
}

function counter() {
  timerNow = Math.floor(Date.now() / 1000);
  currentTimer = timerNow - timerThen;
  return currentTimer;
}

function timerUp(x, y) {
  timerNow = Math.floor(Date.now() / 1000);
  currentTimer = timerNow - timerThen;
  if (currentTimer <= y && typeof (currentTimer + x) != "undefined") {
      return currentTimer;
      
  } else {
      timerThen = timerNow;
      return x;
  }
}

function timerDown() {
  this.time = function (x, y) {
      // this.timerThen = Math.floor(Date.now() / 1000);
      // this.timerNow = Math.floor(Date.now() / 1000);
      this.timerThen = timerThen;
      this.timerNow = Math.floor(Date.now() / 1000);
      this.tick = this.timerNow - this.timerThen;
      if (this.tick <= y && typeof (this.tick + x) != "undefined") {
          return y - this.tick;
      } else {
          this.timerThen = this.timerNow;
          return x;
      }
  };
}

// ########## updates all elements on canvas ##########
function update() {
  player.update();
  //updates all mobs in a group
  for (let m of mobs){
    m.update();{
    if (player.collide(m)){
      m.spliced = true;
      drawText ('Red', "50px Helvetica,'middle','middle', You Lose")}
      
    }

  }
  for (let m in mobs)
  if(mobs.spliced = true) drawText ('Red', "50px Helvetica,'middle','middle', You Lose")
  for (let m in mobs){
    if (mobs[m].spliced){
      mobs.splice(m, 1);
    }
  }

}

// draws all the stuff on the canvas that you want to draw
function draw() {
  // clears the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText('black', "24px Helvetica", "left", "top", "Timer: " + countUp(999), 500, 0);
  drawText('black', "24px Helvetica", "left", "top", "FPS: " + fps, 400, 0);
  drawText('black', "24px Helvetica", "left", "top", "Delta: " + gDelta, 400, 32);
  drawText('black', "24px Helvetica", "left", "top", "mousepos: " + mouseX + " " + mouseY, 0, 0);
  drawText('black', "24px Helvetica", "left", "top", "mouseclick: " + mouseClickX + " " + mouseClickY, 0, 32);
  player.draw();
  for (let m of mobs){
    m.draw();
  }
}
{

}
// set variables necessary for game loop
let fps;
let now;
let delta;
let gDelta;
let then = performance.now();

//main game loop
function main() {
  now = performance.now();
  delta = now - then;
  gDelta = (Math.min(delta, 17));
  fps = Math.ceil(1000 / gDelta);
  if (initialized) {
    update(gDelta);
    draw();
  }
  then = now;
  requestAnimationFrame(main);
}

function update() {
  player.update();
  //updates all mobs in a group
  for (let m of mobs){
    m.update();{
    if (player.collide(m)){ let (m.spliced = true);drawText ('Red', "50px Helvetica,'middle','middle', You Lose",
      m.spliced = true)
      let (m.spliced = true);drawText ('Red', "50px Helvetica,'middle','middle', You Lose",
     
      )}
  }
}}
{}
