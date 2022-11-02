
class PowerUp {
    constructor(ctx, canvasSize) {
        this.ctx = ctx

        this.powerUpPosition = {
            x: Math.random() * 800,
            y: 0
        }

        this.powerUpSize = {
            width: 60,
            height: 60
        }
        this.powerUpSpeed = { x: 0, y: 1 }
        this.powerUpPhysics = { gravity: 0 }

        this.canvasSize = canvasSize

        this.image = new Image();
        this.image.src = "./image/pumpkin.png";
        this.image.frames = 0;
        this.image.framesIndex = 0;
    }
    //Dibuja a los enemigos, cuadrados, más tarde usar sprites
    draw() {
        this.ctx.drawImage(this.image, this.powerUpPosition.x, this.powerUpPosition.y, this.powerUpSize.width, this.powerUpSize.height)
        this.movePowerUp()
    }

    movePowerUp() {

        this.powerUpPosition.y += this.powerUpSpeed.y
    }
}