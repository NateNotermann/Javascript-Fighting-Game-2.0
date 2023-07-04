const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(canvas, c);
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({position, velocity}) {
        this.position = position
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
}
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

player1.draw()

const player2 = new Sprite({
    x: 400, 
    y: 100
})

player2.draw()

console.log(player1);
console.log(player2);

function animate(){
    window.requestAnimationFrame(animate)
    console.log("animate function running!");
}
