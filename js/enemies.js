class Enemies {

    //posX fija, posy aleatoria
    constructor(ctx, canvasSize, enemiesSpeed) {

        //context
        this.ctx = ctx

        //canvas size
        this.canvasSize = canvasSize

        //enemiesSize
        this.enemiesSize = {
            width: 100,
            height: 100
        }

        //enemiesPosition , intentarlo con CanvasSize en un futuro
        this.enemiesPosition = {
            x: canvasSize.w,
            y: Math.random() * (canvasSize.h - this.enemiesSize.height)
        }

        //enemiesSpeed

        this.enemiesSpeed = enemiesSpeed
        this.image = new Image();
        this.image.src = "./image/bat.png";

    }
    //Dibuja a los enemigos, cuadrados, más tarde usar sprites
    draw() {
        this.ctx.drawImage(this.image, this.enemiesPosition.x, this.enemiesPosition.y, this.enemiesSize.width, this.enemiesSize.height)
        this.moveEnemies()
    }

    moveEnemies() {
        this.enemiesPosition.x -= this.enemiesSpeed;
    }
}





