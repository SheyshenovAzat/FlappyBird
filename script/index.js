const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipebottom = new Image()

bird.src = './img/bird.png'
bg.src = './img/bg.png'
fg.src = './img/fg.png'
pipeUp.src = './img/pipeUp.png'
pipebottom.src = './img/pipeBottom.png'

const fly = new Audio()
const score = new Audio()


fly.src = './audio/fly.mp3'
score.src = './audio/score.mp3'


let yPos = 150
let xPos = 10
let gravity = 1
let gap = 100
let count = 0

//create pipe
const pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}

const moveUp = () => {
    yPos -= 30
}
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        moveUp()
        fly.play()
    }
})

const draw = () => {
    context.drawImage(bg, 0, 0)
    context.drawImage(fg, 0, canvas.height - fg.height)
    context.drawImage(bird, xPos, yPos)
    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipebottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
        pipe[i].x--

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= canvas.height - fg.height) {
            location.reload()
        }
        if (pipe[i].x == 5) {
            count++
            score.play()
        }
    }

    yPos += gravity
    context.fillText('Score: ' + count, 10, canvas.height, -20)
    context.fillStyle = '#000'
    context.font = '24px Verdana'
    requestAnimationFrame(draw)
}

pipebottom.onload = draw