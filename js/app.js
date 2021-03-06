"use strict";
/**/
let gameInstructions = document.getElementById("instructions"),
    playerMsg = document.getElementById('msgContent'), //Show a message when the player collides with enemy
    modal = document.getElementById("congratulations"),//Show a message when player reaches the water
    playerSound;
/*Initialize the game*/
startGame();

function startGame() {
   showInstructions();
   playerSound = new sound("sounds/ouch.mp3");
}
/*Courtesy of W3School:https://www.w3schools.com/graphics/game_sound.asp*/
function sound(src) {
   this.sound = document.createElement("audio");
   this.sound.src = src;
   document.body.appendChild(this.sound);
   this.play = (() => {
      this.sound.play();
   })
}
/*Game instructions*/
function showInstructions() {
   setTimeout(() => {
      let spanInstructions = document.getElementsByClassName("closeInstructions")[0];
      gameInstructions.style.display = "block";
      // When the user clicks on <span> (x), close the modal
      spanInstructions.onclick = function() {
         gameInstructions.style.display = "none";
         if (gameInstructions.style.display === "none") {
            player.x = 200;
            player.y = 400;
         }
      };
   }, 100);
}
/*Main class*/
class GameCharacters {
   constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
   }
   // Draw the enemy on the screen, required method for game
   render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
}
/*Enemy Class:Enemies our player must avoid*/
class Enemy extends GameCharacters {
   constructor(x, y, speed) {
      super(x, y, speed);
      this.sprite = 'images/enemy-bug.png';
   }
   // Update the enemy's position, required method for game
   // Parameter: dt, a time delta between ticks
   // Enemy.prototype.update = function (dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   update(dt) {
      this.x += this.speed * dt;
      if (this.x >= 500) {
         this.x = 0;
      }
      // Check collisions
      if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
         playerMsg.innerText = "Ouch......";
         playerSound.play();
         //Message dissapear
         setTimeout(() => {
            playerMsg.innerText = "";
         }, 1000);
         playerReset();
      }
   }
}
// Now write your own player class
// This class requires an update(), render() and
// a HandleInput() method.
class Player extends GameCharacters {
   constructor(x, y) {
      super(x, y);
      this.sprite = 'images/char-boy.png';
   }
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   // update(dt){}
   handleInput(keypress) {
      switch (keypress) {
         case 'up':
            this.y > 0 && (this.y -= 83);
            //Check if Player reach the water && shows pop=up screen
            if (player.y == -15) {
               setTimeout(() => {
                  let span = document.getElementsByClassName("close")[0];
                  modal.style.display = "block";
                  // When the user clicks on <span> (x), close the modal
                  span.onclick = function() {
                     modal.style.display = "none";
                     if (modal.style.display == "none") {
                        playerReset();
                     }
                  };
                  if (modal.style.display == "block") {
                     //Position the player outside the canvas (x,y coordinates)
                     player.x = -300;
                     player.y = -300;
                  }
               }, 400);
            }
            break;
         case 'down':
            this.y < 400 && (this.y += 83);
            break;
         case 'left':
            this.x > 0 && (this.x -= 101);
            break;
         case 'right':
            this.x < 400 && (this.x += 101);
            break;
      }
   }
}
/* Return Player to initial coordinates*/
function playerReset() {
   player.x = 200;
   player.y = 400;
}
// Place the player object in a variable called player
let player = new Player(-100, -100);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let enemyRowPosition = 68; enemyRowPosition <= 232; enemyRowPosition += 82) {
   // let enemy = new Enemy(0, (Math.random() * 184) + 50, Math.random() * 456);
   // let enemy = new Enemy(0, 68+(82*i), (Math.random() * 140) + 30);
   let enemy = new Enemy(-100, enemyRowPosition, (Math.random() * 240) + 30);
   allEnemies.push(enemy);
}
// This listens for key presses and sends the keys to your
// Player.HandleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
   var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };
   player.handleInput(allowedKeys[e.keyCode]);
});
