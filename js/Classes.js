
// ---- Main Image Sprite Class ----
class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x:0, y:0 }  }) {
        this.position = position
        this.height = 150
        this.width = 50 
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,

            this.position.x - this.offset.x, 
            this.position.y -this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            
            )
    }

    animateFrames() {
        this.framesElapsed++
        if( this.framesElapsed % this.framesHold === 1 ) {

            if( this.framesCurrent < this.framesMax -1  ) {
                this.framesCurrent++
            } 
            else {
                this.framesCurrent = 0 
            }
        }   
    }

    update() {
        this.draw()
      this.animateFrames()
    } 
}

// ---- Fighter Class ----
class Fighter extends Sprite {
    constructor({position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y:0 },  
        sprites
    }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },

            offset,

            width: 100, 
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        console.log(this.sprites);
    }
    // draw() {
    //     // player box
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, 50, this.height)

    //     // attack box
    //     if (this.isAttacking) {
    //         c.fillStyle = 'green'
    //         c.fillRect(
    //             this.attackBox.position.x, 
    //             this.attackBox.position.y, 
    //             this.attackBox.width, 
    //             this.attackBox.height)
    //     }
    // }
    update() {
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // --  This is what stops player from falling through the floor -- 
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96 ) {
            this.velocity.y = 0  // make this negative to make objects bounce // 
            this.position.y = 330
        } else 
        this.velocity.y += gravity
    } 
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100) // timeout in milliseconds

    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image 
            && this.framesCurrent < this.sprites.attack1.framesMax -1 ) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = player1.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = player1.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                this.image = player1.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = player1.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                    }
                break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = player1.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                    }
                break  
            
        }
    }



}
