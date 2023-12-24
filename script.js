window.addEventListener("load", function() {
    var c;
    var canvas = document.getElementById("canvas");
    c = document.getElementById("canvas");
    c.width = innerWidth;
    c.height = innerHeight;
    c = c.getContext("2d")
    c.font = '60px sans-serif';
    var innerX = innerWidth / 2;
    var innerY = innerHeight / 2;
    var bradius = 30;
    var plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
    var plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
    var dx = 5 * plusOrMinusX; 
    var dy = 5 * plusOrMinusY;
    var line1X = 1;
    var line1Y = innerY;
    var line1w = 10;
    var line1h = 300;
    var line2X = innerWidth - 10;
    var line2Y = innerY;
    var line2w = 10;
    var line2h = 300;
    var scorp1 = 0;
    var scorp2 = 0;
    var Ai = 5;
    var bounce = new Audio("assets/tennis-ball-hit-151257.wav");
    var countdown = new Audio("assets/start.mp3");

    window.addEventListener("mousemove", function(e) {
        if (dx < 0) {
            line1Y = e.clientY - line1h / 2;
            e.preventDefault();
        }
        else {
            line2Y = e.clientY - line2h / 2;
            e.preventDefault();
        }
    });
    
    function reset() {
    innerX = innerWidth / 2;
    innerY = innerHeight / 2;
    dx = 5;
    dy = 5;
    }

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height); 
        c.beginPath();
        c.arc(innerX, innerY, bradius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
        c.beginPath();
        c.fillRect(line1X, line1Y, line1w, line1h);
        c.beginPath();
        c.fillRect(line2X, line2Y, line2w, line2h);
        c.fillText(scorp1, 100, 50);
        c.fillText(scorp2, canvas.width - 100, 50);
        var allColors = [
            "#ff0000",
            "#ff7b00",
            "#fffb00",
            "#7bff00",
            "#00ff6a",
            "#00fff2",
            "#008cff",
            "#1900ff",
            "#e100ff",
            "#ff0080",
            "#680637",
            "#0f5c48",
          ];
          var randomcolors = allColors[Math.floor(Math.random () * allColors.length)];
          function line1bounce() {
            if (innerX - bradius < 0) {
                if (innerY >= line1Y && innerY <= line1Y + line1h) {
                    dx = -dx + 0.8;
                    c.fillStyle = randomcolors;
                    bounce.play();
                }
                else {
                    scorp2 ++;
                    reset();
                }
            }
          }
          function line2bounce() {
            if (innerX + bradius > canvas.width) {
                if (innerY >= line2Y && innerY <= line2Y + line2h) {
                    dx = -dx - 0.8;
                    c.fillStyle = randomcolors;
                    bounce.play();
                }
                else {
                    scorp1 ++;
                    reset();
                }
            }
          }
          function bounce() {
            if(innerY + bradius > canvas.height || innerY - bradius < 0) {
                dy = -dy;
            }
          }
          function moveball() {
            innerX += dx;
            innerY += dy;
          }
          function ai() {
            if(line2Y + line2h / 2 < innerY) {
                line2Y += Ai;
            }
            else {
                line2Y -= Ai;
            }
          }
    ai();
    moveball();
    line1bounce();
    line2bounce();
    bounce();
    }
    animate();
});