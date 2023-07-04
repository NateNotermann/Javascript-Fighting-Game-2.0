const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(canvas, c);
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

// ---- Sprite Class ----
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
    update() {
        this.draw()
        this.position.y += 10
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


console.log(player1);
console.log(player2);

function animate(){
    window.requestAnimationFrame(animate)
    // c.fillStyle = 'black'
    // c.fillRect(0, 0, canvas.width, canvas.height)
    // c.clearRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()
}
