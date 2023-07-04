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
// player1.draw()
// player2.draw()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.width )
    player1.update()
    player2.update()
}
animate()
