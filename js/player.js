class Player {

    constructor(ctx, canvasSize, playerPosition, playerSize, keys) {
        //context
        this.ctx = ctx;
        //canvasSize
        this.canvasSize = canvasSize
        //playerPosition
        this.playerPosition = {
            x: 20,
            y: canvasSize.h / 2
            // y: canvasSize.height / 2
        }
        //playerSize
        this.playerSize = {
            width: 150,
            height: 150
        }
        //playerSpeed
        this.playerSpeed = 25;
        //playerImage
        this.image = new Image();
        this.image.src = "./image/raven.png";
        this.image.frames = 0;
        this.image.framesIndex = 0;
        //control
        this.keys = keys
        //Array of bullets for shooting
        this.bullets = []
    }
    //methods of player
    setEventHandlers() {

        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.playerPosition.y >= 0) {
                        this.playerPosition.y -= this.playerSpeed
                    }
                    break;
                case 'ArrowDown':
                    if (this.playerPosition.y <= this.canvasSize.h - this.playerSize.height) {
                        this.playerPosition.y += this.playerSpeed
                    }
                    break;
                case 'ArrowRight':
                    if (this.playerPosition.x <= this.canvasSize.w - this.playerSize.width) {
                        this.playerPosition.x += this.playerSpeed
                    }
                    break
                case 'ArrowLeft':
                    if (this.playerPosition.x >= 0) {
                        this.playerPosition.x -= this.playerSpeed
                    }
                    break;
                case 'f':
                    this.shoot()
                    break;
            }
        }
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.playerPosition, this.playerSize, this.keys))
    }

    draw() {
        this.ctx.drawImage(this.image, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height)
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
    }

}

