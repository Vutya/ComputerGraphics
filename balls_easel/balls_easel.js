function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game"); //указываем id для <canvas>

    // Хотим добавить спрайт на сцену.
    // Спрайт - это объект, показывающий анимацию.
    // Настриваем с помощью SpriteSheet

    var earthSpriteSheet = new createjs.SpriteSheet( { // Объект с настройками
        images: ["earth_and_explosion.png"], // набор картинок с кадрами
        frames: { // объект с описанием размеров и положений кадров
            // можно вместо объекта указать массив, и перечислять каждый
            // спрайт по-отдельности (см. документацию)
            width: 100,
            height: 100,
            regX: 50, // опорная точка, эта точка кртинки (центр) будет рисоваться
            regY: 50 // в координатах (0, 0) спрайта
            // margin: границы картинки
            // spaces: пропуски между спрайтаи
        },
        animations: { // набор анимаций, названия сами придумаем
            rotate: [0, 47, "rotate"], // с 0 по 47, а после этого перейти к анимаци rotate
            explode: [48, 83, null] // с 48 по 83, и остановиться
            // можно указать последовательность кадров вручную, см. документацию
        },
        framerate: 20, // частота кадров
    });

    var earthSprite = new createjs.Sprite(earthSpriteSheet);
    stage.addChild(earthSprite);
    earthSprite.x = 100;
    earthSprite.y = 100;

    // Перейти к определённой анимациюю и начать её воспроизводить
    earthSprite.gotoAndPlay("rotate");

    // Теперь давайте сделаем так, что при нажатии на Землю она взрывается
    earthSprite.addEventListener('click', function () {
        earthSprite.gotoAndPlay("explode");
    });

    // У нас будет контейнер, на нём - прямоугольник (область полёта шариков) Shape
    // и на нём же будут летать шары Sprite

    const WIDTH = 380;
    const HEIGHT = 300;
    const R = 50;

    var field = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics
        .beginStroke("blue")
        .beginFill("#EEE")
        .drawRect(0, 0, WIDTH, HEIGHT);

    stage.addChild(field);
    field.addChild(background);

    function ball_tick(e) {
        var ball = e.target; // e - информация о событии, e.target - для кого вызвано
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.y > HEIGHT - R || ball.y < R)
            ball.dy *= -1;
        if (ball.x > WIDTH - R || ball.x < R)
            ball.dx *= -1;
    }

    function ball_click(e) {
        var ball = e.target;

        if (ball.exploded) // Сначаоа ball.exploded это undefined
            return;

        ball.gotoAndPlay("explode");
        // После взрыва не надо лететь дальше
        ball.dx = 0;
        ball.dy = 0;
        ball.exploded = true;
        // Уберём шарик, когда закончится анимация
        ball.addEventListener('animationend', function () {
            field.removeChild(ball);
        });
    }

    function add_ball(x, y, dx, dy) {
        if (x > WIDTH - R || x < R || y  > HEIGHT - R || y < R)
            return;
        var ball = new createjs.Sprite(earthSpriteSheet);
        field.addChild(ball);
        ball.x = x; // x, y задают положение шарика на родителе
        ball.y = y;
        ball.dx = dx; // у спрайта нет параметров dx, dy, но это JavaScript,
        ball.dy = dy; // поэтому что хотим, то и дописываем.
        ball.exploded = false;
        ball.addEventListener('tick', ball_tick);
        ball.addEventListener('click', ball_click);
    }

    field.addEventListener('click', function (e) {
        // Это событие ловит все нажатия на содержимое контейнера: фон и шаркики
        if (e.target === background) {
            // нажали на фон
            var random_angle = Math.random() * 2 * Math. PI;
            add_ball(e.localX, e.localY, Math.cos(random_angle), Math.sin(random_angle));
        }
    });

    add_ball(70, 50, 1, 1);
    add_ball(100, 100, 1, 1);
    add_ball(200, 150, 1, 1);

    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.timerMode = createjs.Ticker.RAF_SYNCHED;
}