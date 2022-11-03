const app = {
    appName: 'Nuestro canvas',
    version: '1.0.0',
    license: undefined,
    authors: 'Alejandro Abad/João Pedro',
    description: 'Primer proyecto',
    ctx: undefined,
    player: undefined,
    enemies: [],
    enemiesSpeed: 1,
    powerUp: [],
    background: undefined,
    imageInstance: undefined,
    canvasSize: {
        w: undefined, h: undefined
    },
    intervalID: undefined,
    FPS: 60,
    framesCounter: 0,
    score: 0,

    init() {
        document.querySelector('#myCanvas').style = "display:block"
        document.querySelector('#game-intro').style = "display:none"
        this.setDimensions()
        this.setContext()
        this.start()
        let initMusic = new Audio('./sounds/juego.mp3')
        initMusic.play()
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        document.querySelector('#myCanvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('#myCanvas').setAttribute('width', this.canvasSize.w)
    },

    drawEnemies() {
        this.enemies.push(new Enemies(this.ctx, this.canvasSize, this.enemiesSpeed))
    },

    drawPowerUp() {
        this.powerUp.push(new PowerUp(this.ctx, this.canvasSize))
    },

    start() {
        this.reset()
        this.intervalID =
            setInterval(() => {

                this.framesCounter++

                if (this.framesCounter % 60 === 0) {
                    this.drawEnemies()
                    this.score++
                }
                if (this.framesCounter % 300 === 0) {
                    this.drawPowerUp()
                }

                if (this.framesCounter % 600 === 0) {
                    this.enemiesSpeed += 1 / 4
                }

                this.clearAll()
                this.drawAll()
                this.moveAll()
                this.checkColisionsBullets()
                this.checkColisionsEnemies()
                this.checkColisionPowerUp()
                this.player.setEventHandlers()
            }, 30)
    },

    reset() {
        //Instancias de las clases
        this.background = new Background(this.ctx, this.canvasSize)
        this.player = new Player(this.ctx, this.canvasSize, this.playerPosition, this.playerSize)
        this.player.setEventHandlers()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.player.bullets = this.player.bullets.filter(bullet => bullet.bulletsPosition.x < this.canvasSize.w)
        this.powerUp = this.powerUp.filter(powerUp => powerUp)
    },

    moveAll() {
        this.enemies.forEach(elm => elm.moveEnemies())
        this.powerUp.forEach(elm => elm.movePowerUp())
        this.player.movePlayer()
    },

    //Todos los dibujos en el escenario
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.enemies.forEach(elm => elm.draw())
        this.powerUp.forEach(elm => elm.draw())
        this.drawScore()
    },

    //Colisión del enemigo
    checkColisionsEnemies() {
        this.enemies.forEach(enemie => {
            if (
                (enemie.enemiesPosition.x <= this.player.playerPosition.x + this.player.playerSize.width &&
                    enemie.enemiesPosition.x + enemie.enemiesSize.width >= this.player.playerPosition.x &&
                    enemie.enemiesPosition.y <= this.player.playerPosition.y + this.player.playerSize.height &&
                    enemie.enemiesPosition.y + enemie.enemiesSize.height >= this.player.playerPosition.y) || (enemie.enemiesPosition.x === 0)
            ) { this.gameOver() }
        })
    },

    //Colisión de las balas
    checkColisionsBullets() {
        this.player.bullets.forEach(bullet => {
            this.enemies.forEach(enemie => {
                if (

                    (enemie.enemiesPosition.x <= bullet.bulletsPosition.x + bullet.bulletsSize.width && //límite izdo eje x
                        enemie.enemiesPosition.x + enemie.enemiesSize.width >= bullet.bulletsPosition.x && // límite dcho eje x 
                        enemie.enemiesPosition.y <= bullet.bulletsPosition.y + bullet.bulletsSize.height && //límite superior
                        enemie.enemiesPosition.y + enemie.enemiesSize.height >= bullet.bulletsPosition.y)

                ) {
                    let elem = this.player.bullets.indexOf(bullet) //defino elemento como variable para almacenar el índice donde se encuentra la bala en el array
                    this.player.bullets.splice(elem, 1)
                    let elm = this.enemies.indexOf(enemie)
                    this.enemies.splice(elm, 1)
                    this.score += 10
                }
            })
        })
    },

    //Colisión powerUp problemas

    checkColisionPowerUp() {
        this.powerUp.forEach(pwrUp => {
            if (

                this.player.playerPosition.x <= pwrUp.powerUpPosition.x + pwrUp.powerUpSize.width &&
                this.player.playerPosition.x + this.player.playerSize.width >= pwrUp.powerUpPosition.x &&
                this.player.playerPosition.y <= pwrUp.powerUpPosition.y + pwrUp.powerUpSize.height &&
                this.player.playerPosition.y + this.player.playerSize.height >= pwrUp.powerUpPosition.y

            ) {
                let elem = this.powerUp.indexOf(pwrUp)
                this.powerUp.splice(elem, 1)
                this.changeVelocity()
            }

        })
    },

    //PowerUpEffects
    changeVelocity() {

        this.enemiesSpeed = this.enemiesSpeed / 2

        this.enemies.forEach((elem) => {
            elem.enemiesSpeed = this.enemiesSpeed / 2
        })

        setTimeout(() => {

            this.enemiesSpeed = 2 * this.enemiesSpeed

            this.enemies.forEach((elem) => {
                elem.enemiesSpeed = 2 * this.enemiesSpeed
            })


        }, 5000)

    },

    drawScore() {
        this.ctx.font = "40px Fantasy";
        this.ctx.fillStyle = "#CD1504";
        this.ctx.fillText(`Score: ${this.score}`, 5, 60);
    },
    //Game Over
    gameOver() {

        this.ctx.fillStyle = '#CD1504'
        this.ctx.font = '80px Fantasy'
        this.ctx.fillText('GAME OVER', 170, 300)

        this.ctx.fillStyle = 'white'
        this.ctx.font = '40px Fantasy'
        this.ctx.fillText(`Your Score is ${this.score}`, 220, 400)
        clearInterval(this.intervalID)
    }

}
