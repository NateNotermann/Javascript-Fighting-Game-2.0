const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

// ---- Sprite Class ----
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
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
    }
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
    }
})

// -- Hold value for Key press. Default is false -- 
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

let lastKey

// ---- Main Animate function ---- //
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.width )
    player1.update()
    player2.update()

    player1.velocity.x = 0

    if (keys.a.pressed && keys.d.pressed) {
        player1.velocity.x = 0
    } else if (keys.d.pressed) {
        player1.velocity.x = 1 
    } else if (keys.a.pressed) {
        player1.velocity.x = -1
    }
    
    // if (keys.a.pressed && lastKey === 'a') {
    //     player1.velocity.x = -1
    // } else if (keys.d.pressed && lastKey === 'd') {
    //     player1.velocity.x = 1 
    // } 
}
animate()

// -- Listen for key press  --
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player1.velocity.y = -13
            break
    }
    console.log(event.key) //, event.keyCode);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    console.log(event.key, event.keyCode);
})
