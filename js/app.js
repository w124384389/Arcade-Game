var CANVAS_WIDTH = 500;
// Enemies our player must avoid
var Enemy = function(x,y) {
    "use strict";

    //Setting the Enemy initial location
    this.x = x;
    this.y = y;
    //Setting the Enemy speed
    this.speed = Math.random() * 300;
    // The image/sprite for our enemies
    //Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //when the bugs go out of boundries, reset the x position and assign a new random speed
    if(this.x > CANVAS_WIDTH){
        this.x = -100;
        this.newSpeed();
    }
    //check the bug's boundry 
    var bugRight = this.x + 50;
    var bugLeft = this.x - 50;
    var bugUp = this.y - 50;
    var bugDown = this.y +50;
    //Handles collision with the Player
    if (player.x < bugRight && player.x > bugLeft && player.y < bugDown && player.y > bugUp){
        player.resetPos();
    }
};

//method that generates a random new speed 
Enemy.prototype.newSpeed = function(){
    "use strict";
    this.speed = Math.random() * 300;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//Setting the Player initial location
var Player = function(x, y){
    "use strict";
    //Loading the image by setting this.sprite to the appropriate image in the 
    //image folder
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    //set the starting point
    this.x = x;
    this.y = y;
};

//Reset player to initial position
Player.prototype.resetPos = function(){
    "use strict";
    this.x = 200;
    this.y = 300;
};
//update the player's position using handleInput
Player.prototype.update =function(dt){
};

// Draw the player on the screen, required method for game
Player.prototype.render =function(){
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The handleInput method, which should receive user input, allowedKeys (the key which was pressed) 
//and move the player according to that input. In particular:
//Left key should move the player to the left, right key to the right, up should move the player up 
//and down should move the player down.
//Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
//If the player reaches the water the game should be reset by moving the player back
//to the initial location (you can write a separate reset Player method to handle that).
Player.prototype.handleInput = function(input){
    var leftWall = 100;
    var rightWall = 300;
    var topWall = 100;
    var bottomWall = 300;
    var stepVertical = 80;
    var stepParallel = 100;
    if (input === 'left'){
        if (this.x < leftWall){
            return null;
        }
        this.x -= stepParallel;
    }
    else if (input === 'right'){
        if (this.x > rightWall){
            return null;
        }
        this.x += stepParallel;
    }
    else if (input === 'up'){
        if (this.y < topWall){
            this.x = 200;
            this.y = 400;
        }
        this.y -= stepVertical;
    }
    else if (input === 'down'){
        if (this.y > bottomWall){
            return null;
        }
        this.y += stepVertical;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i <3; i++){
    allEnemies.push(new Enemy(-100, 60 + 80 * i));
}
for (var i = 0; i <2; i++){
    allEnemies.push(new Enemy(0, 60 + 80 * i));
}
var player = new Player(200, 300);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
