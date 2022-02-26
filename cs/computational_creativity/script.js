var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    linenum = "line1";

var colorL = "blue",
    thickness = 2;

function init() {
    red = document.getElementById('redboard');
    red_ctx = red.getContext("2d");
    blue = document.getElementById('blueboard');
    blue_ctx = blue.getContext("2d");
    fore = document.getElementById('foreground');
    fore_ctx = fore.getContext("2d");
    fore.width = blue.width = red.width = window.innerWidth * 0.75;
    fore.height = blue.height = red.height = window.innerHeight * 0.625;

    document.getElementById(colorL).style.border = "3px solid black";
    document.getElementById(linenum).style.border = "3px solid black";


    window.addEventListener("resize", () => {
        fore.width = blue.width = red.width = window.innerWidth * 0.75;
        fore.height = blue.height = red.height = window.innerHeight * 0.625;
    })
    fore.addEventListener("mousemove", function (e) {
        movemouse(e)
    }, false);
    fore.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    fore.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    fore.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    document.getElementById(colorL).style.removeProperty("border");
    switch (obj.id) {
        case "blue":
            colorL = "blue";
            break;
        case "red":
            colorL = "red";
            break;
    }
    document.getElementById(colorL).style.border = "3px solid black";
    thickness = 2;
}

function drawVoice(ctx, canvas, e) {
    ctx.clearRect(prevX, 0, (currX - prevX), canvas.height)
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = colorL;
    ctx.lineWidth = thickness;
    ctx.stroke();
    ctx.closePath();
}

function drawLine(ctx, canvas, e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(currX, 0);
    ctx.lineTo(currX, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = colorL;
    ctx.fillRect(currX - 2, currY - 2, 4, 4);
}

function erase() {
    var m = confirm("Clear?");
    if (m) {
        blue_ctx.clearRect(0, 0, blue.width, blue.height);
        red_ctx.clearRect(0, 0, red.width, red.width);
    }
}

function save() {
    var PNG = blue.toDataURL();
    document.getElementById(linenum + 'b').src = PNG;
    PNG = red.toDataURL();
    document.getElementById(linenum + 'r').src = PNG;
}

function change(destination) {
    var m = confirm("Save changes?");
    if (m) {
        save();
    }
    document.getElementById(linenum).style.removeProperty("border");
    blue_ctx.clearRect(0, 0, blue.width, blue.height);
    red_ctx.clearRect(0, 0, red.width, red.width);
    linenum = destination.id;
    document.getElementById(linenum).style.border = "3px solid black";

}

function movemouse(e) {
    drawLine(fore_ctx, fore, e);
    if (flag) {
        if (colorL == "blue") {
            drawVoice(blue_ctx, blue, e)
        }
        else {
            drawVoice(red_ctx, red, e)
        }
    }
}


function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - fore.offsetLeft;
        currY = e.clientY - fore.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            drawVoice(blue_ctx);
        }
    }
}
