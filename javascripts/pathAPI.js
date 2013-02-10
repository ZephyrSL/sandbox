// code from: http://khronosgroup.github.com/siggraph2012course/CanvasCSSAndWebGL/canvas_and_css.html

var isMouseDown = false;
var draggedPaths = [];

function drawString(context, str, x, y) {
  context.font = "20pt Arial";
  context.fillText(str, x, y);
}

function drawFace(context) {
  //the nose polyline
  context.beginPath();
  context.moveTo(250, 275);
  context.lineTo(200, 375);
  context.lineTo(250, 375);
  context.stroke();

  //convert deg to radians
  var d2R = Math.PI / 180;

  //the eyebrow: circular arcs
  context.beginPath();
  context.arc(190, 220, 40, 210 * d2R, 300 * d2R);
  context.stroke();
  context.beginPath();
  context.arc(310, 220, 40, 240 * d2R, 330 * d2R);
  context.stroke();

  //the eyeball: circles
  context.beginPath();
  context.arc(190, 250, 40, 0, 2 * Math.PI, false);
  context.stroke();
  context.beginPath();
  context.arc(310, 250, 40, 0, 2 * Math.PI, false);
  context.stroke();

  //the lower lip: cubic Bezier curve
  context.moveTo(200, 400);
  context.bezierCurveTo(225, 475, 275, 475, 300, 400);

  //the upper lip: quadratic Bezier curve
  context.moveTo(200, 400);
  context.quadraticCurveTo(250, 450, 300, 400);
  context.stroke();
}

function findOffset(obj) {
  var canvas = document.getElementById("pathAPICanvas");
  var curX, curY;
  curX = curY = 0;
  if(obj.offsetParent) {
    do {
      curX += obj.offsetLeft;
      curY += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return {
      x: curX,
      y: curY
    };
  }
}

function pathAPICanvasDown(e) {
  isMouseDown = true;
  var tempPath = [];
  draggedPaths.push(tempPath);
}

function pathAPICanvasUp(e) {
  isMouseDown = false;
}

function drawDraggedPaths(context) {
  var i, j;
  for(i = 0; i < draggedPaths.length; i++) {
    var tempPath = draggedPaths[i];
    if(!tempPath || !tempPath.length) {
      continue;
    }
    context.beginPath();
    context.moveTo(tempPath[0][0], tempPath[0][1]);
    for(j = 1; j < tempPath.length; j++) {
      context.lineTo(tempPath[j][0], tempPath[j][1]);
    }
    context.stroke();
  }
}

function pathAPICanvasMove(e) {
  var canvas = document.getElementById("pathAPICanvas");
  var mouseX, mouseY;
  if(canvas) {
    var pos = findOffset(canvas);
    mouseX = e.pageX - pos.x;
    mouseY = e.pageY - pos.y;

    //get the context and draw to it IF the mouse is down
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (draggedPaths.length)
      drawString(context, "Opps you make my face dirty!", 20, 40);
    else
      drawString(context, "Hey what do you wanna do?!", 20, 40);

    drawFace(context);
    drawDraggedPaths(context);

    if(isMouseDown) {
      var tempPath = draggedPaths[draggedPaths.length - 1];
      tempPath.push([mouseX, mouseY]);
    }

  }
}

function pathAPICanvasDraw() {
  var canvas = document.getElementById("pathAPICanvas");
  var mouseX, mouseY;
  var curX, curY;

  if(canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";

    // draw face first
    drawFace(ctx);

    canvas.addEventListener('mousemove', pathAPICanvasMove, false);
    canvas.addEventListener('mousedown', pathAPICanvasDown, false);
    canvas.addEventListener('mouseup', pathAPICanvasUp, false);
  }
}