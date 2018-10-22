const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const threshold = 0.002;
const force = 20;
const gravity = 0.98;
const friction = 0.9;

const mouse = {
    x: undefined,
    y: undefined
}

// Event Listeners
addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

// Object
function Ball(x, y, dx, dy, radius, color) {
    this.x = x; 
    this.y = y; 
    this.dy = dy; 
    this.dx = dx;
    this.radius = radius; 
    this.color = color;

    this.update = function() {
        // update position of the ball
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x && mouse.y) {
            let distX = this.x - mouse.x;
            let distY = this.y - mouse.y;
            if (Math.abs(distX) < this.radius + force && Math.abs(distY) < this.radius + force) {
                if( distX > 0) {
                    // mouse is on the left of ball
                    this.dx += force;
                }
                else {
                    // mouse is on the right of the ball
                    this.dx -= force;
                }
                if(distY > 0) {
                    // mouse is on top of the ball
                    this.dy += force;
                }
                else {
                    // mouse is on the the bottom
                    this.dy -= force;
                }
            }
        }

        if (this.dx !== 0 || this.dy !== 0) {
            if(this.y + this.radius + this.dy > canvas.height){
                // ball hit floor
                this.y = canvas.height - this.radius;
                this.dy = -this.dy * friction;
                this.dx = this.dx * friction;
            } else if(this.y - this.radius - this.dy <= 0) {
                // ball hit ceiling
                this.y = this.radius;
                this.dy = -this.dy * friction;
            } else {
                // ball is in the air
                this.dy += gravity;
            }
    
            if (this.x + this.radius + this.dx > canvas.width){
                // ball hit right wall
                this.x = canvas.width - this.radius;
                this.dx = -this.dx * friction;
            } else if(this.x - this.radius - this.dx <= 0) {
                // ball hit left wall
                this.x = this.radius;
                this.dx = -this.dx * friction;
            } 
    
            if (Math.abs(this.dx) < threshold) {
                this.dx = 0;
            }
            if (Math.abs(this.dy) < threshold) {
                this.dy = 0;
            }
        }  
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

// Implementation
let ball;
export function init() {
    ball = new Ball(canvas.width/2, canvas.height/6, 1, 1, 60, '#f47106');
}

// Animation Loop
export function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
}