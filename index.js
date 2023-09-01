const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024     //window.innerWidth  //visualViewport.width - 10
canvas.height = 576  //visualViewport.height - 10

c.fillRect(0, 0, canvas.width, canvas.height)

// ---- GAMEPAD variables ---- //
let playerWidthAndHeight = 0
let playerX = 0;
let playerY = 0;
let playerColor = 'orange';
let velocity = 0;

let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let bluePressed = false;
let yellowPressed = false;
let redPressed = false;
let greenPressed = false;

let connected = false
let gameLoopCheck = false
// ---- GAMEPAD variables ---- //


// // ------ dynamic resize width only: start ------ //
// function setUpCanvas(){ // sets default player attributes
//     canvas.width = window.innerWidth;       // Example Width 1000px
//     // canvas.height = window.innerHeight;     // Example Height 1000px
//     // playerWidthAndHeight = canvas.width *0.1;   // Makes player WH = 100px. (1000 * 0.1)
//     // velocity = canvas.width * 0.01;             // Makes player Velocity 1.  (1000 * 0.01)

//     // playerX = (canvas.width - playerWidthAndHeight) / 2;        // (1000px - 100px) / 2.   aka 900 / 2 = 450.
//     // playerY = (canvas.height - playerWidthAndHeight) / 2;       // (1000px - 100px) / 2.   aka 900 / 2 = 450.
// }
// setUpCanvas(); 
// window.addEventListener('resize', setUpCanvas);
// // ------ dynamic resize width only: End ------ //


window.addEventListener('gamepadconnected', (event) => {    // gamepad Connected event listener. Must press button first.
    connected = true
    controllerIndex = event.gamepad.index;
    console.log('gamepad Connected Status: ', connected);
})

window.addEventListener('gamepaddisconnected', (event) => {    // gamepad Disconnected event listener
    connected = false
    controllerIndex = event.gamepad.index;
    console.log('gamepad Connected Status: ', connected);
})

function checkPlayerAttributes (){
    console.log('player W/H: ', playerWidthAndHeight, "x", playerWidthAndHeight);
    console.log('playerX: ', playerX, ". ", "playerY: ", playerY);
    console.log('gamepad Connected Status: ', connected);
    console.log('playerColor:', playerColor);
    if (gameLoopCheck) { console.log('gameLoop running');}
    // console.log(gamepad.controllerIndex);
    // console.log(gamepad.buttons);
}

function controllerInput() {
    if(controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex]
        const buttons = gamepad.buttons;
        upPressed = buttons[12].pressed;
        downPressed = buttons[13].pressed;
        leftPressed = buttons[14].pressed;
        rightPressed = buttons[15].pressed;

        const stickDeadZone = 0.4;              // change to 0.8 to only allow movement in one direction at a time.
        const leftRightValue = gamepad.axes[0];
        const upDownValue = gamepad.axes[1];

        if(leftRightValue >= stickDeadZone) {   // if gamepad left/right axes is >= than deadZone, move right
            rightPressed = true;
        } 
        else if (leftRightValue <= -stickDeadZone) {    // if gamepad left/right axes is <= than deadZone, move left
            leftPressed = true;
        }

        if(upDownValue >= stickDeadZone) { // if gamepad up/down axes is >= than deadZone, move up
            downPressed = true;
        } 
        else if (upDownValue <= -stickDeadZone) { // if gamepad up/down axes is <= than deadZone, move down
            upPressed = true;
        }

        greenPressed = buttons[0].pressed;
        redPressed = buttons[1].pressed;
        bluePressed = buttons[2].pressed;
        yellowPressed = buttons[3].pressed;

    }
};

// function movePlayer() {
//     if(upPressed) {
//         playerY -= velocity;
//     }
//     if(downPressed) {
//         playerY += velocity;
//     }
//     if(leftPressed) {
//         playerX -= velocity;
//     }
//     if(rightPressed) {
//         playerX += velocity;
//     }
// }

function checkButtonPressed() {     // green[0], red[1], blue[2], yellow[3]
    if (controllerIndex !== null ){

    
        const gamepad = navigator.getGamepads()[controllerIndex]
        const buttons = gamepad.buttons;

        if(greenPressed) {              // [0]
            player1.velocity.y = -10
            // changePlayerColor("green")  // green
        } 
        if(buttons[1].pressed) {        // [1]
            // changePlayerColor("red")    // red
            // playerColor = "red"         
        } 
        if(buttons[2].pressed) {        // [2]
            player1.attack()
            // changePlayerColor("blue")   // blue
            // playerColor = "blue"        
        } 
        if(buttons[3].pressed) {        // [3]
            // changePlayerColor("yellow") // yellow
            // playerColor = "yellow"      
        }
    }
}




















// -- Gravity -- 
const gravity = 0.7

// --- Background --- //
const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imageSrc: './img/background.png'
})

// --- shop --- //
const shop = new Sprite({
    position: {
        x: 700,
        y: 257
    },
    imageSrc: './img/shop.png',
    scale: 1.75,
    framesMax: 6
})


// ---- Player 1 ----
const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    // color: 'red'
    imageSrc: './img/samuraiMack/Idle.png',
    scale: 2.5,
    framesMax: 8,
    offset:  {
        x: 215,
        y: 157
    },
    sprites: {
        idle: { 
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: { 
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: { 
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: { 
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        attack2: { 
            imageSrc: './img/samuraiMack/Attack2.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        }
    },

    attackBox: {
        offset: {
            x: 65,
            y: 50
        },
        width: 165,
        height: 75
    }
})


// ---- Player 2 ----
const player2 = new Fighter({
    position: {
        x: 400, 
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    // color: 'blue'
    imageSrc: './img/kenji/Idle.png',
    scale: 2.5,
    framesMax: 4,
    offset:  {
        x: 215,
        y: 169
    },
    sprites: {
        idle: { 
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        run: { 
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: { 
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: { 
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        attack2: { 
            imageSrc: './img/kenji/Attack2.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        }
    },

    attackBox: {
        offset: {
            x: -155,
            y: 50
        },
        width: 165,
        height: 75
    }
})

// -- Hold value for Key press. Default is false -- 
const keys = {
    // -- Player 1 -- 
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    
    // -- Player 2 -- 
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
let x = 0


decreaseTimer()
// ------ frame/refresh rate limiting code: variables: start ------ //
let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;
// ------ frame/refresh rate limiting code: variables: end ------ //


// ---- Main Animate Function ---- //
function animate(){
    window.requestAnimationFrame(animate)

    // ---- GAMEPAD CODE ---- //
    checkPlayerAttributes();     // Checks/Console logs gamepad attributes
    controllerInput();
    checkButtonPressed();
    // ---- GAMEPAD CODE ---- //


    // ------ frame/refresh rate limiting code: start ------ //
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
    // ------ frame/refresh rate limiting code: open bracket ------ //

        c.fillStyle = 'black'
        c.fillRect(0,0, canvas.width, canvas.height )
        background.update()
        shop.update()
        c.fillStyle = 'rgba(255, 255, 255, 0.15'
        c.fillRect(0,0, canvas.width, canvas.height)
        player1.update()
        player2.update()


        player1.velocity.x = 0
        player2.velocity.x = 0

        // -- Player 1 Movement --  
        if (keys.a.pressed && keys.d.pressed) {
            player1.velocity.x = 0
            player1.switchSprite('idle')
            // player1.image = player1.sprites.idle.image
        } else if (keys.d.pressed || rightPressed ) {
            player1.velocity.x = 5 
            player1.switchSprite('run')
            // player1.image = player1.sprites.run.image
        } else if (keys.a.pressed || leftPressed) {
            player1.velocity.x = -5
            player1.switchSprite('run')
            // player1.image = player1.sprites.run.image
        } else {
            player1.velocity.x = 0
            player1.switchSprite('idle')
            // player1.image = player1.sprites.idle.image
        }

        // -- Player 2 Jump ARROWS--
        if(player1.velocity.y < 0 ){
            player1.switchSprite('jump')
        } else if (player1.velocity.y > 0 ) {
            player1.switchSprite('fall')
        }

        // -- Player 2 Movement ARROWS-- 
        if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
            player2.velocity.x = 0
            player2.switchSprite('idle')
        } else if (keys.ArrowRight.pressed) {
            player2.velocity.x = 5
            player2.switchSprite('run')
        } else if (keys.ArrowLeft.pressed) {
            player2.velocity.x = -5
            player2.switchSprite('run')
        } else {
            player2.velocity.x = 0
            player2.switchSprite('idle')
            // player1.image = player1.sprites.idle.image 
        }

        // -- Player 2 Jump ARROWS-- 
        if(player2.velocity.y < 0 ){
            player2.switchSprite('jump')
        } else if (player2.velocity.y > 0 ) {
            player2.switchSprite('fall')
        }

        // --  not using this code. Was tutorials version of movement logic
        // if (keys.a.pressed && lastKey === 'a') {
        //     player1.velocity.x = -1
        // } else if (keys.d.pressed && lastKey === 'd') {
        //     player1.velocity.x = 1 
        // } 


        // ---- player 1 Detect collision & player 2 gets hit ---- 
        if (rectangularCollision({
            rectangle1: player1,
            rectangle2: player2 
        })  
        && player1.isAttacking 
        && player1.framesCurrent === 4
        ) {
            player2.takeHit()
            player1.isAttacking = false 
            // player2.health -= 5 (Doing this in .takehit()
            // document.querySelector('#player2Health').style.width = player2.health + '%'
            gsap.to('#player2Health', {
                width: player2.health + '%'
            })
            // console.log('player 1 attack!');
        } 
        // -- if player1 misses
        if (player1.isAttacking && player1.framesCurrent === 4){
            player1.isAttacking = false
        }


        // ---- player 2 Detect collision  ----
        if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1 
        })  
        && player2.isAttacking 
        && player2.framesCurrent === 2
        ) { 
            player1.takeHit()
            player2.isAttacking = false
            // player1.health -= 5
            // document.querySelector('#player1Health').style.width = player1.health + '%'
            gsap.to('#player1Health', {
                width: player1.health + '%'
            })
            // console.log('player 2 attack!');
        }
        // -- if player2 misses
        if (player2.isAttacking && player2.framesCurrent === 2){
            player2.isAttacking = false
        }


        // ------ end game based on players health ------ //  
        if (player1.health <= 0 || player2.health <= 0 ) {
            determineWinner({player1, player2, timerId})
        }

    }  // ------ frame/refresh rate limiting code: closing bracket ------ //
}

animate()

// -- Listen for key press  --
window.addEventListener('keydown', (event) => {
    // console.log(event.key) //, event.keyCode);

    // ---- Player 1 ----
    if (!player1.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player1.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player1.lastKey = 'a'
                break
            case 'w':
                player1.velocity.y = -20
                break
            case ' ':
                player1.attack()
                break
        }
    }

    // ---- Player 2 ----
    if (!player2.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                player2.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                player2.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                player2.velocity.y = -20 
                break
            case 'Control':
                player2.attack()
                break
        }
    }
})

// -- Listen for key unpressed  --
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // -- Player 1 --
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        // -- Player 2 --    
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})
