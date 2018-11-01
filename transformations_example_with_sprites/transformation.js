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

        if(elapsed_time > 0.4)
            elapsed_time = 0;

        update_animation_parameters(elapsed_time, current_time);
        draw();
    }

    requestAnimationFrame(animation_step);
    //давайте добави в конец преобразования для нашего canvas код, который написан ниже, выполняется
    //до того, как начнётся анимация. Анимацию мы попросили начать позже, когда удобно браузеру, это у нас
    //сделано с помощью requestAnimationFrame.
    ctx.translate(100, 200); //перенести начало системы в координат в 100, 200
    ctx.translate(1, 1); //сдвинули чуть
    ctx.rotate(Math.PI / 6); //повернуть систему координат
    ctx.scale(2, 1); //растянуть x и y
    //есть ещё, можно менять угол между осями

    //нарисовали домик
    //преобразования (ctx.translate, ctx.rotate, ...)
    //(домик остался на месте)
    //нарисовали домик ещё раз с теми же координатами
    //(домик нарисуется в новом месте, потому что теперь координаты уже считаются по другой с/к)

    //как возвращать систему координат?
    ctx.save(); //сохраняется весь контекст рисования: система координат, strokeStyle, fillStyle и
                //многие другие глобальные параметры.
    //дальше можно изменять систему координат, менять стили рисования
    ctx.restore(); //все сохранённые значения восстанавливаются.

    //можно сохранять и восстанавливать несколько раз
    ctx.save(); //(1)
    ctx.save(); //(2)
    ctx.save(); //(3)
    ctx.restore(); //(3)
    ctx.restore(); //(2)
    ctx.restore(); //(1)

    //Если у вас есть функия, которая что-то рисует, то принято сохранять и восстанавливать ctx
    function draw_something() {
        ctx.save();
        //рисуем
        ctx.restore();
    }
}

//Что ещё есть в Canvas
//рисование текста, ctx.fillText(), ctx.strokeText(). Обратить внимание на выравнивание.
//стили заливки: можно заливать не только цветом, а ещё и градиентом или шаблоном на основе картинки
//стили линий: можно делтать пунктиры, управлять тем, как выглядит конец линии и излом и т.п.
//есть цветовые фильтры, можно указать, как изменяется цвет каждого пикселя при рисовани.
//и вообще, можно напрямую обращаться к пикселям изображения, читать их и изменять.