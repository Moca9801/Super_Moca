const SPEED = 120;
const JUMP = 300;
const ENEMY_SPEED = 20;
const FALL_DEATH = 400;

kaboom({
    global: true,
    fullscreen: true,
    scale: 1.2,
    debug: true,
    clearColor: [0,0,0,1],
})

let isJumping = true

loadSprite('piso','resources/img/M6rwarW.png')
loadSprite('mario', 'resources/img/Wb1qfhK.png')
loadSprite('tecolote','resources/img/KPO3fR9.png')
loadSprite('tubo_descenso','resources/img/rl3cTER.png')
loadSprite('ladrillo','resources/img/pogC9x5.png')
loadSprite('caja_sorpresa','resources/img/RMqCc1G.png')

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '      @@@@@                        ',
        '                                   ',
        '                                   ',
        '     -    n                        ',
        '         <                <    <   ',
        '==========   ====   ===============',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('piso'), solid()],
        '-': [sprite('ladrillo'), solid()],
        '@': [sprite('caja_sorpresa'), solid(), scale(0.5)],
        '<': [sprite('tecolote'), solid(), 'dangerous'],
        '=': [sprite('piso'), solid()],
        'n': [sprite('tubo_descenso'), solid(), scale(1.5)],
    }

    const gameLevel = addLevel(map, levelCfg)

    const player = add([
        sprite('mario'), solid(),
        pos(40, 0),
        body(),
        origin('bot')
    ])

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('dangerous', (d) => {
        if (isJumping==true) {
            destroy(d)
        } else {
          go('lose')
        }
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose')
        }
    })

    keyDown('left', () => {
        player.move(-SPEED, 0)
    })

    keyDown('right', () => {
        player.move(SPEED, 0)
    })

    player.action(() => {
        if(player.grounded()) {
          isJumping = false
        }
    })

    keyPress('space', () => {
        if (player.grounded()) {
          isJumping = true
          player.jump(300);
        }
    })
})

start("game")
