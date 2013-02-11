var axis_samples = [];
var x_samples = [];
var y_samples = [];

function sample_axis (samples, from, to, interval) {
    var x = from;
    samples.push(x);
    while (x + interval < to) {
        x = x + interval;
        samples.push(x);
    }
}

function xFunc (t) {
    var s = Math.sin(t)
    return 16 * s * s * s;
}

function yFunc (t) {
    return -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
}


function drawHeart (context, x, y, angle) {
    var canvas = context.canvas;

    // backup initial context
    context.save();

    context.translate(x, y);
    context.rotate(angle);

    drawHeartFunc(context);

    context.restore();

    // var gradient = context.createRadialGradient(x, y, 0, x, y, canvas.width/2);
    // gradient.addColorStop(0, "red");
    // gradient.addColorStop(1, "rgba(255,255,255,1.0)");
    // context.fillStyle = gradient;
    // context.fill();
}

function drawHeartFunc (context) {
    var l = axis_samples.length;
    context.beginPath();
    context.moveTo(x_samples[0], y_samples);
    for (var i = 1; i < l; i++) {
        context.lineTo(x_samples[i], y_samples[i]);
    }
    context.stroke();
}