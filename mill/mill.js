function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    var alpha = 0;

    function draw_stick(r) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, r);
        ctx.stroke();
        ctx.restore();
    }

    function draw_sticks_in_circle(r) {
        ctx.save();
        for (var i = 0; i < 12; i++) {
            draw_stick(r);
            ctx.rotate( Math.PI / 6);
        }
        ctx.restore();
    }

    function draw_rope(L) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, L);
        ctx.stroke();
        ctx.restore();
    }

    function draw_paddle(R) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, R);
        ctx.stroke();
        ctx.restore();
    }

    function draw() {
    }

    function update_animation_parameters() {
        //здесь обновляем значение всех анимируемых параметров

        //простейшее обновление - это изменение на
        //фиксированную величину:
        //x += 0.1 // сдвигаем на 0.1 пикселя

        //как сделать равномерное изменение параметра
        //см. далее
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step); // сразу просим повторить

        update_animation_parameters();
        draw();
    }

    ctx.translate(320, 180);
    draw_sticks_in_circle(30);


    requestAnimationFrame(animation_step);
}