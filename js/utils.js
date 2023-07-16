
// --  Reusable rectangle collision function
function rectangularCollision( { rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        // AND <= p1.A-box.pos.X <= (p2.pos.X + p2.width)
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        // AND (p1.A-box.pos.Y + p1.A-box.height) >= p2.pos.Y
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        // AND p2.A-box.pos.Y <= (p2.pos.y + p2.heigh)
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.isAttacking 
    )
}

let timer = 30
let timerId
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  // Call a Winner 
function determineWinner({ player1, player2, timerId }){
    document.querySelector('#displayText').style.display = 'flex'
    if (player1.health === player2.health ) {
        document.querySelector('#displayText').innerHTML = 'Tie! OverTime!!!'
        timer += 5
    } else if (player1.health > player2.health ) {
        clearTimeout(timerId) // stop the timer
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!!!'
    } else if (player1.health < player2.health ) {
        clearTimeout(timerId) // stop the timer
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!!!'
    }
 }

// Decrease time
function decreaseTimer() {
    if (timer > 0) {
       timerId = setTimeout(decreaseTimer, 1000)
        timer --  
    // const hours = Math.floor(timer / 60 /60)
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    // const result = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
    document.querySelector('#timer').innerHTML = result
    if (timer == 0 ){
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({player1, player2, timerId}) 
        } else document.querySelector('#displayText').style.display = 'none'
    }
}