// particel js
/**
 * Generates random particles using canvas
 * 
 * @class Particles
 * @constructor
 */
function Particles() {
    //particle colors
    this.colors = [
            '255, 255, 255',
            '255, 99, 71',
            '129, 129, 19'
        ]
        //adds gradient to particles on true
    this.blurry = false;
    //adds white border
    this.border = false;
    //particle radius min/max
    this.minRadius = 10;
    this.maxRadius = 35;
    //particle opacity min/max
    this.minOpacity = .005;
    this.maxOpacity = .5;
    //particle speed min/max
    this.minSpeed = .05;
    this.maxSpeed = .5;
    //frames per second 
    this.fps = 60;
    //number of particles
    this.numParticles = 750;
    //required canvas variables
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
}

/**
 * Initializes everything
 * @method init
 */
Particles.prototype.init = function() {
    this.render();
    this.createCircle();
}

/**
 * generates random number between min and max values
 * @param  {number} min value
 * @param  {number} max malue
 * @return {number} random number between min and max
 * @method _rand
 */
Particles.prototype._rand = function(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Sets canvas size and updates values on resize
 * @method render
 */
Particles.prototype.render = function() {
    var self = this,
        wHeight = $(window).height(),
        wWidth = $(window).width();

    self.canvas.width = wWidth;
    self.canvas.height = wHeight;

    $(window).on('resize', self.render);
}

/**
 * Randomly creates particle attributes
 * @method createCircle
 */
Particles.prototype.createCircle = function() {
    var particle = [];

    for (var i = 0; i < this.numParticles; i++) {
        var self = this,
            color = self.colors[~~(self._rand(0, self.colors.length))];
        vy = self._rand(self.minSpeed, self.maxSpeed);
        vx = self._rand(self.minSpeed, self.maxSpeed);
        r = 1; //Math.sqrt(Math.sqr(vx)+Math.sqr(vy));
        particle[i] = {
            radius: r,
            xPos: self._rand(0, canvas.width),
            yPos: self._rand(0, canvas.height),
            xVelocity: self._rand(self.minSpeed, self.maxSpeed),
            yVelocity: vy,
            color: 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
        }

        //once values are determined, draw particle on canvas
        self.draw(particle, i);
    }
    //...and once drawn, animate the particle
    self.animate(particle);
}

/**
 * Draws particles on canvas
 * @param  {array} Particle array from createCircle method
 * @param  {number} i value from createCircle method
 * @method draw
 */
Particles.prototype.draw = function(particle, i) {
    var self = this,
        ctx = self.ctx;

    if (self.blurry === true) {
        //creates gradient if blurry === true
        var grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius / 1.25);

        grd.addColorStop(1.000, particle[i].color);
        grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)');
        ctx.fillStyle = grd;
    } else {
        //otherwise sets to solid color w/ opacity value
        ctx.fillStyle = particle[i].color;
    }

    if (self.border === true) {
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

/**
 * Animates particles 
 * @param  {array} particle value from createCircle & draw methods
 * @method animate
 */
Particles.prototype.animate = function(particle) {
    var self = this,
        ctx = self.ctx;

    setInterval(function() {
        //clears canvas
        self.clearCanvas();
        //then redraws particles in new positions based on velocity
        for (var i = 0; i < self.numParticles; i++) {
            particle[i].xPos += particle[i].xVelocity;
            particle[i].yPos -= particle[i].yVelocity;

            //if particle goes off screen call reset method to place it offscreen to the left/bottom
            if (particle[i].xPos > self.canvas.width + particle[i].radius || particle[i].yPos > self.canvas.height + particle[i].radius) {
                self.resetParticle(particle, i);
            } else {
                self.draw(particle, i);
            }
        }
    }, 1000 / self.fps);
}

/**
 * Resets position of particle when it goes off screen
 * @param  {array} particle value from createCircle & draw methods
 * @param  {number} i value from createCircle method
 * @method resetParticle
 */
Particles.prototype.resetParticle = function(particle, i) {
    var self = this;

    var random = self._rand(0, 1);

    if (random > .5) {
        // 50% chance particle comes from left side of window...
        particle[i].xPos = -particle[i].radius;
        particle[i].yPos = self._rand(0, canvas.height);
    } else {
        //... or bottom of window
        particle[i].xPos = self._rand(0, canvas.width);
        particle[i].yPos = canvas.height + particle[i].radius;
    }
    //redraw particle with new values
    self.draw(particle, i);
}

/**
 * Clears canvas between animation frames
 * @method clearCanvas
 */
Particles.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// go go go!
var particle = new Particles();
particle.init();
// headline js
let yourtext = [
    ["POORAB", "rgb(248, 249, 250)"],
    ["A FullStack Developer", "rgb(248, 249, 250)"],
    ["A Freelancer", "rgb(248, 249, 250)"],
];

let x = 0;
let y = 0;
//how fast typing is
let wait = 200;
//how long you want to text stay before overwriting
let additionalwait = 10;
let txt = yourtext[0][0].split("");
let out = "";
let retyping = setInterval(function() {
    document.getElementById("changingText").innerHTML = out;
    if (x > txt.length - 1) {} else {
        out += txt[x];
    }
    x++;
    if (x == txt.length + 2 + additionalwait) {
        if (y == yourtext.length - 1) {
            y = 0;
            txt = yourtext[y][0].split("");
            out = "";
            document.getElementById("changingText").innerHTML = out;
            document.getElementById("changingText").style.color = yourtext[y][1];
            x = 0;
        } else {
            y += 1;
            txt = yourtext[y][0].split("");
            out = "";
            document.getElementById("changingText").innerHTML = out;
            document.getElementById("changingText").style.color = yourtext[y][1];
            x = 0;
        }
    }
}, wait);