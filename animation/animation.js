function init() {
    console.info("page loaded");

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    /*
    В прошлый раз мы видели, что можно сделать анимацию с помощью метода setInterval,
    который повторяет указанное действие с указанной частотой.

    Для анимации в браузере есть метод requestAnimationFrame(действие).
    Он просит браузер в удобный для браузера момент времени отвлечься, выполнить “действие” и
    перерисовать содержимое экрана. Т.е. этот метод аналогичен setTimeout, но не нужно указывать,
    сколько времени ждать. Ждать надо до тех пор, пока браузеру не станет удобно перерисовать содержимое экрана.
     */

    // Что запрогать?
    // Все размеры делаем константами, внутри прямоугольника Canvas прямоугольник фиксированного размера
    // Пусть на каждом шаге обе координаты увеличиваются на небольшое число (x += 0.1)

    // Заведём параметры анимации
    /*
    Анимация с точным заданием скорости изменения параметра

    Сначала научимся определять, сколько точно времени прошло с прошлой перерисовки. Добавим глобальную функцию
    */
    function get_time() {
        // return Date.now();
        return new Date().getTime();
    }
    // Она возвращает количество миллисекунд, прошедших с начала эпохи Unix (01.06.1970)
    /*
    var time1 = get_time();
    // долгое вычисление
    var time2 = get_time();
    console.log('долгое вычисление длилось', time2 - time1, 'мс');
    // Заведём глобальную переменную last_redraw = get_time();
    // Изменим методы animation_step и update_animation_parameters
    */

    const COORD_X = 60;
    const COORD_Y = 40;
    const WIDTH = 520;
    const HEIGHT = 400;
    const SPEED = 20;

    const RADIUS = 40;
    // V = random;
    // Math.cos(Math.random() * 2 * Math.PI) * V

    var x = 330;
    var y = 230;

    var balls = [{x: x, y: y, dx: Math.random() * 3, dy: Math.random() * 3, rgb: "rgb(255, 200, 100)"},
        {x: 160, y: 110, dx: -Math.random() * 3, dy: Math.random() * 3, rgb: "rgb(255, 255, 255)"},
        {x: 500, y: 360, dx: Math.random() * 3, dy: -Math.random() * 3, rgb: "rgb(255, 255, 255)"}];
    var last_redraw_time = get_time();

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        //
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(COORD_X, COORD_Y, WIDTH, HEIGHT); // координаты левого верхнего угла, высота и ширина
        //это полная очистка canvas
        for (var i = 0; i < balls.length; i++) {
            ctx.beginPath();
            ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = balls[i].rgb;
            ctx.fill();
            ctx.closePath();
        }
    }

    function update_animation_parameters(elapsed_time_sec) {
        //здесь обновляем значение всех анимируемых параметров
        //допустим, скорость изменения x - это SPEED_x.
        //для определенности SPEED_x = 10 пикселей в секунду

        //простейшее обновление - это изменение на
        //фиксированную величину:
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x + RADIUS >= COORD_X + WIDTH || balls[i].x - RADIUS <= COORD_X)
                balls[i].dx = -balls[i].dx;

            if (balls[i].y + RADIUS >= COORD_Y + HEIGHT || balls[i].y - RADIUS <= COORD_Y)
                balls[i].dy = -balls[i].dy;

            balls[i].x += balls[i].dx ; // сдвигаем на 0.1 пикселя
            balls[i].y += balls[i].dy;
        }
    }

    function animation_step() {
        //эта функция должна постоянно вызываться
        requestAnimationFrame(animation_step); // сразу просим повторить ещё раз

        var current_time = get_time();
        var elapsed_time_sec = current_time - last_redraw_time;
        last_redraw_time = current_time;

        update_animation_parameters(elapsed_time_sec / 1000);
        draw();
    }

    requestAnimationFrame(animation_step);

    // Изменение угла на рандомную величину.
    // Скорость со временем менять.
}