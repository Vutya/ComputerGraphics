function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    var alpha = 0;
    const r = 25;
    const L = 90;
    const R = 130;
    const APS = 10;

    function get_time() {
        return new Date().getTime() / 1000;
    }

    var last_redraw_time = get_time();

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
            ctx.rotate(Math.PI / 6);
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
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(320, 200);

        for (var i = 0; i < 12; i++) {
            ctx.save();
            ctx.rotate(alpha + i * 2 * Math.PI / 12);
            draw_paddle(R);
            ctx.translate(0, R);
            ctx.rotate(-(alpha + i * 2 * Math.PI / 12));
            draw_rope(L);
            ctx.translate(0, L);
            ctx.rotate(10 * alpha);
            draw_sticks_in_circle(r);
            ctx.restore();
        }
        ctx.restore();
    }

    function update_animation_parameters(elapsed_time) {
        alpha += (APS * Math.PI / 180) * elapsed_time;
    }

    function animation_step() {
        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw_time;
        last_redraw_time = current_time;

        if(elapsed_time > 1)
            elapsed_time = 0;

        update_animation_parameters(elapsed_time);
        draw();
    }

    requestAnimationFrame(animation_step);
}