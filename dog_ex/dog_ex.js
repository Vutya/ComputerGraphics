function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');

    // заведём параметры анимации
    var x = 0; // положение картинки
    var frame_index; // номер кадра для отображения, от 0 до количества кадров-1

    // Эти параметры не анимируются, но они влияют на анимацию, если мы захотим включить другую анимацию, то
    // их надо будет поменять.
    var num_frames = 10;
    var sprite_width = 78;
    var sprite_height = 95;
    var sprite_sheet = new Image();
    sprite_sheet.src = 'dog1.jpg';

    var FPS = 20; // показываем 20 кадров в секунду
    var SPEED = 20; // двигаемся на 20 пикселей в секунду

    function get_time() {
        return new Date().getTime() / 1000; // возвращает в секундах
    }

    var last_redraw = get_time();
    var animation_start = get_time();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var sprite_x = frame_index * sprite_width;
        var sprite_y = 0;
        ctx.drawImage(
            sprite_sheet,
            sprite_x, sprite_y,
            sprite_width, sprite_height,
            x, 10, //т.к. x изменяется, картинка движется
            sprite_width, sprite_height
        )
    }

    function update_animation_parameters(elapsed_time, current_time) {
        x += elapsed_time * SPEED; //10 пикселей в секунду

        frame_index = Math.floor((current_time - animation_start) * FPS) % num_frames;
    }

    function animation_step() {
        requestAnimationFrame(animation_step);

        var current_time = get_time();
        var elapsed_time = current_time - last_redraw;
        last_redraw = current_time;

        if(elapsed_time > 1)
            elapsed_time = 0;

        update_animation_parameters(elapsed_time, current_time);
        draw();
    }

    requestAnimationFrame(animation_step);
}