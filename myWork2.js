function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        console.log("this thing evaluated to true...")
        //initializing variables to create canvas
        var ctx = canvas.getContext('2d');
        var c = document.getElementById("myCanvas");
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();

    }
}

function main(){
    // draws triangle and its measurement 
    drawTriangle();
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    // draws square and its measurement 
    drawSquare();
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
// draws circle and its measurement 
    drawCircle();
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
}

//makes shape two demetional
var ctx = c.getContext("2d");
ctx.beginPath();
// assigns location
ctx.rect(20, 20, 150, 100);

ctx.stroke();
 