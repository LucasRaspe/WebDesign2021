https//upload.wikimedia.org/wikipedia/commons/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG

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