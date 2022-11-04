class Player {

    constructor(ctx, canvasSize, playerPosition, playerSize) {

        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.playerPosition = {
            x: 20,
            y: canvasSize.h / 2

        }
        this.playerSize = {
            width: 180,
            height: 180
        }
        this.playerSpeed = 30;
        this.image = new Image();
        this.image.src = "./image/raven.png";
        this.image.frames = 0;
        this.image.framesIndex = 0;
        this.keys = { up: false, right: false, down: false, left: false }
        this.bullets = []
    }

    setEventHandlers() {

        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.keys.up = true
                    break;
                case 'ArrowDown':
                    this.keys.down = true
                    break;
                case 'ArrowRight':
                    this.keys.right = true
                    break
                case 'ArrowLeft':
                    this.keys.left = true
                    break;
                case 'f':
                    this.shoot()
                    break;
            }
        }
        document.onkeyup = event => {
            switch (event.key) {
                case 'ArrowUp':
                    this.keys.up = false
                    break;
                case 'ArrowDown':
                    this.keys.down = false
                    break;
                case 'ArrowRight':
                    this.keys.right = false
                    break
                case 'ArrowLeft':
                    this.keys.left = false
                    break;
            }
        }

    }

    movePlayer() {

        if (this.keys.up === true && this.playerPosition.y >= 0) { this.playerPosition.y -= this.playerSpeed }

        if (this.keys.right === true && this.playerPosition.x <= this.canvasSize.w - this.playerSize.width) { this.playerPosition.x += this.playerSpeed }

        if (this.keys.down === true && this.playerPosition.y <= this.canvasSize.h - this.playerSize.height) { this.playerPosition.y += this.playerSpeed }

        if (this.keys.left === true && this.playerPosition.x >= 0) { this.playerPosition.x -= this.playerSpeed }
    }


    shoot() {
        if (this.bullets.length < 5) {
            this.bullets.push(new Bullets(this.ctx, this.playerPosition, this.playerSize, this.keys))
            console.log(this.bullets)
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.playerPosition.x, this.playerPosition.y, this.playerSize.width, this.playerSize.height)
        this.bullets.forEach(bullet => {
            bullet.draw()

        })
    }

}

