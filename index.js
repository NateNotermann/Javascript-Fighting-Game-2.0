const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024  //visualViewport.width - 10
canvas.height = 576  //visualViewport.height - 10

c.fillRect(0, 0, canvas.width, canvas.height)

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
        x: 600,
        y: 257
    },
    imageSrc: './img/shop.png',
    scale: 1.75
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
    color: 'red'
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
    color: 'blue'
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

// ---- Main Animate Function ---- //
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height )
    background.update()
    shop.update()
    player1.update()
    player2.update()


    player1.velocity.x = 0
    player2.velocity.x = 0

    // -- Player 1 Movement --  
    if (keys.a.pressed && keys.d.pressed) {
        player1.velocity.x = 0
    } else if (keys.d.pressed) {
        player1.velocity.x = 5 
    } else if (keys.a.pressed) {
        player1.velocity.x = -5
    }

    // -- Player 2 Movement -- 
    if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
        player2.velocity.x = 0
    } else if (keys.ArrowRight.pressed) {
        player2.velocity.x = 5
    } else if (keys.ArrowLeft.pressed) {
        player2.velocity.x = -5
    }
    // --  not using this code. Was tutorials version of movement logic
    // if (keys.a.pressed && lastKey === 'a') {
    //     player1.velocity.x = -1
    // } else if (keys.d.pressed && lastKey === 'd') {
    //     player1.velocity.x = 1 
    // } 

if (
    rectangularCollision({
        rectangle1: player1,
        rectangle2: player2 
    })  
    && player1.isAttacking
    ) {
        player1.isAttacking = false
        player2.health -= 5
        document.querySelector('#player2Health').style.width = player2.health + '%'
        console.log('player 1 attack!');
    }

// ---- player 2 ----
if (
    rectangularCollision({
        rectangle1: player2,
        rectangle2: player1 
    })  
    && player2.isAttacking
    ) {
        player2.isAttacking = false
        player1.health -= 5
        document.querySelector('#player1Health').style.width = player1.health + '%'
        console.log('player 2 attack!');
    }

    // -- end game based on players health -- 
    if (player1.health <= 0 || player2.health <= 0 ) {
        determineWinner({player1, player2, timerId})
    }

}

animate()

// -- Listen for key press  --
window.addEventListener('keydown', (event) => {
    // console.log(event.key) //, event.keyCode);
    switch (event.key) {
    // ---- Player 1 ----
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

    // ---- Player 2 ----
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
