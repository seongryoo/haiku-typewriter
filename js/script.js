var carriage = document.getElementById("carriage");
var paper = document.getElementById("paper");
var cursor = document.getElementById("cursor");
var bigdiv = document.getElementById("centerdiv");
var carv = document.getElementById("carriage-view");
var bigdrag = document.getElementById("bigdrag");
var justHereToLoadIt = new sound("type.wav");
/*
var justHereToLoadIt2 = new sound("return.wav");
var justHereToLoadIt3 = new sound("carriage.wav");*/
var maxright = bigdiv.offsetWidth - carriage.offsetWidth;

carriage.style.left = maxright + "px";
carv.style.left = (carriage.offsetLeft - 160) + "px";

bigdrag.style.left = (carv.offsetLeft + 50) + "px";

var ctx = paper.getContext('2d');
ctx.font = '16px Courier New';
document.addEventListener('keydown', (event) => {
    const keyName = event.keyCode;

    if ((keyName >= 48 && keyName <= 90) || keyName == 32 || keyName == 222 || (keyName >= 186 && keyName <= 193)) {
        if (keyName == 32) {
            event.preventDefault();
        }
        var myString = String.fromCharCode(keyName);
        if (keyName == 186) myString = ";";
        if (keyName == 187) myString = "=";
        if (keyName == 188) myString = ",";
        if (keyName == 189) myString = "-";
        if (keyName == 190) myString = ".";
        if (keyName == 191) myString = "/";

        if (keyName == 222) myString = "\'";

        if (event.shiftKey) {
            if (keyName == 48) myString = ")";
            if (keyName == 49) myString = "!";
            if (keyName == 50) myString = "@";
            if (keyName == 51) myString = "#";
            if (keyName == 52) myString = "$";
            if (keyName == 53) myString = "%";
            if (keyName == 54) myString = "^";
            if (keyName == 55) myString = "&";
            if (keyName == 56) myString = "*";
            if (keyName == 57) myString = "(";
            if (keyName == 186) myString = ":";
            if (keyName == 187) myString = "+";
            if (keyName == 188) myString = "<";
            if (keyName == 189) myString = "_";
            if (keyName == 190) myString = ">";
            if (keyName == 191) myString = "?";
            if (keyName == 222) myString = "\"";
        } else {
            myString = myString.toLowerCase();
        }
        ctx.fillText(myString, 20 + maxright - carriage.offsetLeft, 30 - paper.offsetTop + 116);
        carriage.style.left = (carriage.offsetLeft - 10) + "px";

        paper.classList.remove("bounce");
        cursor.classList.remove("bounce");
        void paper.offsetWidth;
        paper.classList.add("bounce");
        cursor.classList.add("bounce");
        checkWidth();
        var mySound = new sound("type.wav");
        mySound.play();

    }
    //enter key
    if (keyName == 13 && yesHeight()) {
        event.preventDefault();
        paper.style.top = (paper.offsetTop - 20) + "px";
        var mySound = new sound("return.wav");
        mySound.play();
        carv.classList.remove("bounce");
        void carv.offsetWidth;
        carv.classList.add("bounce");
    }

    carv.style.left = (carriage.offsetLeft - 160) + "px";

    bigdrag.style.left = (carv.offsetLeft + 50) + "px";
});
dragElement(carriage);

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function checkWidth() {
    if (carriage.offsetLeft > (bigdiv.offsetWidth - carriage.offsetWidth)) {
        carriage.style.left = (bigdiv.offsetWidth - carriage.offsetWidth) + "px";
    }
    if ((carriage.offsetLeft < 0)) {
        carriage.style.left = 0 + "px";
    }
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    /*
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:       document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
    bigdrag.onmousedown = dragMouseDown;
    bigdrag.ontouchstart = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;


        carv.classList.remove("bounce");
        carriage.classList.remove("bounce");
        void carriage.offsetWidth;
        carriage.classList.add("bounce");
        carv.classList.add("bounce");

        document.onmouseup = closeDragElement;
        
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDragTouch;



        var mySound = new sound("carriage.wav");
        mySound.play();
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        checkWidth();
        carv.style.left = (elmnt.offsetLeft - 160) + "px";
        bigdrag.style.left = (carv.offsetLeft + 50) + "px";
    }

    function elementDragTouch(e) {
        e.preventDefault();
        
        var touch = e.touches[0];
        var x = touch.pageX;
        var y = touch.pageY;
        // calculate the new cursor position:
        pos1 = pos3 - x;
        pos2 = pos4 - y;
        pos3 = x;
        pos4 = y;
        // set the element's new position:
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        checkWidth();
        carv.style.left = (elmnt.offsetLeft - 160) + "px";
        bigdrag.style.left = (carv.offsetLeft + 50) + "px";
    }
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchstart = null;
        document.ontouchmove = null;
    }
}

function yesHeight() {
    if (paper.offsetTop > (116 - 350 + 40)) {
        return true;
    } else {
        return false;
    }
}


var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = paper.toDataURL('image/png');
    button.href = dataURL;
});
