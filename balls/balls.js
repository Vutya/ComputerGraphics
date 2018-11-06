function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    var explosion = document.getElementById("a-img");
    var sprite = document.getElementById("b-img");
    var button = document.getElementById("c-img");

    const sprites = [
        {srcX: 0, srcY: 10, srcW: 50, srcH: 40, dstW: 50, dstH: 40},
        {srcX: 0, srcY: 40, srcW: 50, srcH: 60, dstW: 75, dstH: 90},
        {srcX: 0, srcY: 100, srcW: 50, srcH: 50, dstW: 50, dstH: 50},
        {srcX: 0, srcY: 150, srcW: 50, srcH: 62, dstW: 60, dstH: 72}
    ];

    const expl_spr = [{srcX: 30, srcY: 25, srcW: 75, srcH: 75},
        {srcX: 155, srcY: 25, srcW: 75, srcH: 75},
        {srcX: 280, srcY: 25, srcW: 75, srcH: 75},
        {srcX: 410, srcY: 25, srcW: 75, srcH: 75},

        {srcX: 20, srcY: 155, srcW: 80, srcH: 80},
        {srcX: 145, srcY: 155, srcW: 80, srcH: 80},
        {srcX: 275, srcY: 150, srcW: 80, srcH: 80},
        {srcX: 405, srcY: 150, srcW: 80, srcH: 80},

        {srcX: 25, srcY: 280, srcW: 75, srcH: 75},
        {srcX: 160, srcY: 285, srcW: 70, srcH: 70},
        {srcX: 280, srcY: 285, srcW: 75, srcH: 75},
        {srcX: 410, srcY: 285, srcW: 75, srcH: 75},

        {srcX: 30, srcY: 410, srcW: 75, srcH: 75},
        {srcX: 155, srcY: 410, srcW: 70, srcH: 70},
        {srcX: 285, srcY: 410, srcW: 75, srcH: 75},
        {srcX: 410, srcY: 410, srcW: 75, srcH: 75},];

    var balls = [
        {
            srcX: 0, srcY: 10, srcW: 50, srcH: 40, dstX: 60, dstY: 140, dstW: 50, dstH: 40, dx: 3, dy: 3,
            maxW: 440, frame_index: 0, FPS: 15, toExplode: false, explosion_frame: 0
        },
        {
            srcX: 0, srcY: 40, srcW: 50, srcH: 60, dstX: 190, dstY: 60, dstW: 75, dstH: 90, dx: 2, dy: 2,
            maxW: 440, frame_index: 0, FPS: 20, toExplode: false, explosion_frame: 0
        },
        {
            srcX: 0, srcY: 100, srcW: 50, srcH: 50, dstX: 300, dstY: 250, dstW: 50, dstH: 50, dx: 3, dy: 3,
            maxW: 440, frame_index: 0, FPS: 25, toExplode: false, explosion_frame: 0
        },
        {
            srcX: 0, srcY: 150, srcW: 50, srcH: 62, dstX: 350, dstY: 300, dstW: 60, dstH: 72, dx: 4, dy: 4,
            maxW: 440, frame_index: 0, FPS: 10, toExplode: false, explosion_frame: 0
        }
    ];

    function get_time() {
        return new Date().getTime() / 1000;
    }

    canvas.addEventListener('click', (e) => {
        const mouseClick = {
            x: e.offsetX,
            y: e.offsetY
        };
        if (mouseClick.x > 595 && mouseClick.x < 635 &&
            mouseClick.y > 435 && mouseClick.y < 475) {
            for (var i = 0; i < balls.length; i++)
                balls[i].toExplode = true;
            return;
        }
        for (var i = 0; i < balls.length; i++) {
            if (mouseClick.x > balls[i].dstX && mouseClick.x < balls[i].dstX + balls[i].dstW &&
                mouseClick.y > balls[i].dstY && mouseClick.y < balls[i].dstY + balls[i].dstH) {
                balls[i].toExplode = true;
                return;
            }
        }
        let num = Math.floor(Math.random() * (3 + 1));
        let sign1 = Math.random() * 2 - 1;
        let sign2 = Math.random() * 2 - 1;
        var ball = {
            srcX: sprites[num].srcX, srcY: sprites[num].srcY, srcW: sprites[num].srcW,
            srcH: sprites[num].srcH, dstX: mouseClick.x, dstY: mouseClick.y, dstW: sprites[num].dstW,
            dstH: sprites[num].dstH, dx: Math.floor(Math.random() * (4 - 2 + 1) + 2) * sign1,
            dy: Math.floor(Math.random() * (3 - 1 + 1) + 1) * sign2, maxW: 440, frame_index: 0,
            FPS: Math.floor(Math.random() * (25 - 10 + 1) + 10), toExplode: false, explosion_frame: 0
        };
        if (Math.floor(Math.random() * (2 + 1)) === 0)
            for (var j = 0; i < balls.length; j++)
                balls[j].toExplode = true;
        balls.push(ball);
    });

    var last_redraw_time = get_time();
    var start_time = get_time();
    const num_frames = 10;
    var fr_index;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].toExplode === true) {
                ctx.drawImage(explosion, expl_spr[balls[i].explosion_frame].srcX,
                    expl_spr[balls[i].explosion_frame].srcY, expl_spr[balls[i].explosion_frame].srcW,
                    expl_spr[balls[i].explosion_frame].srcH, balls[i].dstX, balls[i].dstY,
                    balls[i].dstW, balls[i].dstH);
                continue;
            }
            ctx.drawImage(sprite, balls[i].srcX, balls[i].srcY, balls[i].srcW, balls[i].srcH,
                balls[i].dstX - balls[i].srcW / 2, balls[i].dstY - balls[i].srcH / 2, balls[i].dstW, balls[i].dstH);
        }
        ctx.drawImage(button, 0, 0, 512, 512, 590, 430, 50, 50);
    }

    function update_animation_parameters(elapsed_time, current_time) {
        for (var i = 0; i < balls.length; i++) {
            fr_index = Math.floor((current_time - start_time) * balls[i].FPS) % num_frames;
            if (balls[i].toExplode === true && fr_index !== balls[i].frame_index) {
                balls[i].explosion_frame += 1;
                if (balls[i].explosion_frame === 16) {
                    balls.splice(i, 1);
                }
                continue;
            }
            balls[i].frame_index = fr_index;
            balls[i].srcX = balls[i].frame_index * balls[i].srcW;

            if (balls[i].dstX + balls[i].dstW >= canvas.width || balls[i].dstX <= 0)
                balls[i].dx = -balls[i].dx;

            if (balls[i].dstY + balls[i].dstH >= canvas.height || balls[i].dstY <= 0)
                balls[i].dy = -balls[i].dy;

            balls[i].dstX += balls[i].dx;
            balls[i].dstY += balls[i].dy;
        }
    }

    function animation_step() {
        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        if (elapsed_time > 1)
            elapsed_time = 0;

        update_animation_parameters(elapsed_time, current_time);
        draw();
    }

    requestAnimationFrame(animation_step);
}

/*
canvas.add
Мельница, 12 лопастей с нитками на концах
На конце нити внизу что-то есть
Сделаем с помощью трансформаций
 */