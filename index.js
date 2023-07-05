const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

// -- Gravity -- 
const gravity = 0.7

// ---- Sprite Class ----
class Sprite {
    constructor({position, velocity, color = 'red'}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: this.position ,
            width: 100, 
            height: 50,
        }
        this.color = color
        this.isAttacking
    }
    draw() {
        // player box
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        // attache box
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // this.position.y += 10
        
        // --  This is what stops player from falling through the floor -- 
        if (this.position.y + this.height + this.velocity.y >= canvas.height ) {
            this.velocity.y = 0  // make this negative to make objects bounce // 
        } else 
        this.velocity.y += gravity
    } 
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100) // timeout in milliseconds

    }
}

// ---- Player 1 ----
const player1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red'
})


// ---- Player 2 ----
const player2 = new Sprite({
    position: {
        x: 400, 
        y: 100
    },
    velocity: {
        x: 0,
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
// ---- Main Animate function ---- //
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.width )
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

    // ---- Detect for collision ----
    // If (p1.A-box.pos + p1 width) >= p2.pos
    if (player1.attackBox.position.x + player1.attackBox.width >= player2.position.x
        // AND <= p1.A-box.pos.X <= (p2.pos.X + p2.width)
        && player1.attackBox.position.x <= player2.position.x + player2.width 
        // AND (p1.A-box.pos.Y + p1.A-box.height) >= p2.pos.Y
        && player1.attackBox.position.y + player1.attackBox.height >= player2.position.y
        // AND p2.A-box.pos.Y <= (p2.pos.y + p2.heigh)
        && player1.attackBox.position.y <= player2.position.y + player2.height
        && player1.isAttacking
        ) {
        console.log('go') 
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
