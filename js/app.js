"use strict";
// Main class
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

// Enemies our player must avoid
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
		// checkCollisions
		if (player.x < this.x + 80 &&	player.x + 80 > this.x &&
				player.y < this.y + 60 &&	player.y + 60 > this.y) {
			//return Player to initial coordinates
			// setTimeout(()=>{
			//
			//
			// });
			player.x = 200;
			player.y = 400;
			// console.log(`${}+${}`);
			console.log('Collision');

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
	//Position the player (x,y coordinates)
	handleInput(keypress) {
		switch (keypress) {
			case 'up':
				this.y > 0 && (this.y -= 83);
				if (player.y == -15) {
					console.log('you win');
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


// Place the player object in a variable called player
let player = new Player(200, 400);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// let allEnemies = [];

let allEnemies = [];
// let level=1;
// for (let i = 0; i < numOfEnemies; i++) {
for (let enemyRowPosition = 68; enemyRowPosition <= 232; enemyRowPosition += 82) {
	// let enemy = new Enemy(0, (Math.random() * 184) + 50, Math.random() * 456);
	// let enemy = new Enemy(0, 68+(82*i), (Math.random() * 140) + 30);
	let enemy = new Enemy(-100, enemyRowPosition, (Math.random() * 140) + 30);
	allEnemies.push(enemy);
	// for (let i=0 ; i<=2 ; i++){
	// 	console.log(` x:${allEnemies[i].x} y:${allEnemies[i].y} `);
	// }
}
// }

// This listens for key presses and sends the keys to your
// Player.HandleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
