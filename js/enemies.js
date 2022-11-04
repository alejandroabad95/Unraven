class Enemies {

    constructor(ctx, canvasSize, enemiesSpeed) {

        this.ctx = ctx

        this.canvasSize = canvasSize

        this.enemiesSize = {
            width: 100,
            height: 100
        }

        this.enemiesPosition = {
            x: canvasSize.w,
            y: Math.random() * (canvasSize.h - this.enemiesSize.height)
        }

        this.enemiesSpeed = enemiesSpeed
        this.image = new Image();
        this.image.src = "./image/bat.png";

    }

    draw() {
        this.ctx.drawImage(this.image, this.enemiesPosition.x, this.enemiesPosition.y, this.enemiesSize.width, this.enemiesSize.height)
        this.moveEnemies()
    }

    moveEnemies() {
        this.enemiesPosition.x -= this.enemiesSpeed;
    }
}





