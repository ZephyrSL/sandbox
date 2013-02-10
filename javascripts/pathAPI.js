function drawFace(context) {
  //the nose polyline
  context.beginPath();
  context.moveTo(250,275);
  context.lineTo(200,375);
  context.lineTo(250,375);
  context.stroke();

  //convert deg to radians
  var d2R = Math.PI/180;

  //the eyebrow: circular arcs
  context.beginPath();
  context.arc(190, 220, 40, 210*d2R, 300*d2R);
  context.stroke();
  context.beginPath();
  context.arc(310, 220, 40, 240*d2R, 330*d2R);
  context.stroke();

  //the eyeball: circles
  context.beginPath();
  context.arc(190, 250, 40, 0, 2*Math.PI, false);
  context.stroke();
  context.beginPath();
  context.arc(310, 250, 40, 0, 2*Math.PI, false);
  context.stroke();

  //the lower lip: cubic Bezier curve
  context.moveTo(200, 400);
  context.bezierCurveTo(225,475,275,475,300,400);

  //the upper lip: quadratic Bezier curve
  context.moveTo(200,400);
  context.quadraticCurveTo(250,450,300,400);
  context.stroke();
}

function draw() {
  var canvas = document.getElementById("pathAPICanvas");
  if (canvas.getContext) {
    var context = canvas.getContext("2d");

    context.lineWidth=7;
    context.strokeStyle = "yellow";

    // issue drawing commands here
    drawFace(context);
  }
}