class Background {

    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.image = new Image();
        this.image.src = "./image/background.jpg";
        this.posX = 0;
        this.posY = 0;
        this.velX = 1;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.canvasSize.w, this.canvasSize.h);
    }

    move() {
        if (this.poxX <= -this.width) {
            this.posX = 1;
        }
        this.posX -= this.velX;
    }
}
