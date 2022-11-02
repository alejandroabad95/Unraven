class Bullets {

    constructor(ctx, playerPosition, playerSize) {
        //Contexto
        this.ctx = ctx;
        //Bullets position
        this.bulletsPosition = {
            x: playerPosition.x + playerSize.width,
            y: playerPosition.y
        }
        //Bullets size
        this.bulletsSize = {
            width: 50,
            height: 50
        }
        //Velocidad de las balas
        this.bulletsSpeed = 8;
        //Bullet Images
        this.image = new Image();
        this.image.src = "image/flame.png";
    }

    draw() {
        //dibujamos la bala
        this.ctx.drawImage(this.image, this.bulletsPosition.x, this.bulletsPosition.y, this.bulletsSize.width, this.bulletsSize.height)
        //movemos la bala
        this.move()
    }

    move() {
        this.bulletsPosition.x += this.bulletsSpeed
    }

}


