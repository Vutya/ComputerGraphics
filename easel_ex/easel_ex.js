function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game"); //указываем id для <canvas>
    /*stage - это сцена, на которой расположены все объекты
        Какие объекты можно располагать на сцене?
        Text - объекты с тектом, настраиваются текст, шрифт
        Shape - статичные рисунки, на которых может быть нарисовано то же, что на Canvas.
                Т.е. линии, круги, прямоугольники и т.п.
        Sprite - это анимированное изображение, анимация настраивается через SpriteSheet
        Bitmap - это картинки <img> и другие canvas или даже <video>
        Container - контейнер для элементов, на нём тоже могут быть Shape, Sprite, Bitmap, Text и другие контейнеры.

        Всё это - DisplayObject. Объекты, которые можно располагать на сцене. У них у всех есть размеры
        (высота, ширина), координаты (где они находятся) и трансоформации (сжатия, растяжения, повороты).
    */

    // Начнём с создания Sprite:
    var circle = new createjs.Shape();
    //после создания Shape пустой, на нём ничего не нарисовано. А мы хотим нарисовать кружок.
    var g = circle.graphics; //graphics - это холст, то, на чём можно рисовать, похоже по смыслу на ctx
    g.beginFill("red").drawCircle(0, 0, 50); //рисуем закрашенный круг в (0, 0) с радиусом 40
    // тут координаты внутри Shape

    // этот код аналогичен
    // g.beginFill("red");
    // g.drawCircle(0, 0, 40);
    // но короче, потому что не надо повторять g.
    // Это называется flow-стиле, метод вызывается от прошлого метода, см. JQuery

    circle.x = 100; // это координаты круга в его контейнере (на сцене)
    circle.y = 100; // т.е. мы говорим, где в контейнере начало координат у Shape

    // надо обязательно добавить объект на сцену, иначе мы его не увидим
    stage.addChild(circle);

    // добавим ещё Shape (треугольник)
    // методы для Graphics
    // https://createjs.com/docs/easeljs/classes/Graphics.html

    var triangle = new createjs.Shape();
    triangle.graphics
        .beginFill("green").moveTo(-30, 0).lineTo(30, 0).lineTo(0, -30).lineTo(-30, 0);
    // мы нарисовали равнобедленный треугольник. Точка (0, 0) у него в середине основания.

    triangle.x = 100;
    triangle.y = 100;

    stage.addChild(triangle);

    var triangle2 = new createjs.Shape();
    triangle2.graphics
        .beginFill("blue").moveTo(-30, 0).lineTo(30, 0).lineTo(0, -30).lineTo(-30, 0);

    triangle2.x = 100;
    triangle2.y = 100;
    triangle2.regX = 0; // (0, -30) - это точкав треугольнике - верхняя вершина
    triangle2.regY = -30; // значит в контейнере мы будем указывать координаты верхней вершины
    // regX, regY в системе координат Shape задают опорную точку (pivot point)

    stage.addChild(triangle2);

    // давайте теперь добавим Bitmap для примера
    var img = new createjs.Bitmap("http://www.setwalls.ru/pic/201305/1280x800/setwalls.ru-30057.jpg");
    stage.addChild(img);

    // и надо дать команду на перерисовку сцены
    stage.update(); // здесь картинка, скорее всего, ещё не успеет загрузиться

    // сделаем update через 2 секунды
    setTimeout(function () {
        // узнаем размер картинки после загрузки
        // это универсальный метод для любого объекта на сцене
        var rect = img.getBounds();
        // rect.width, rect.height
        img.scaleX = 300 / rect.width;
        img.scaleY = 200 / rect.height;
        img.x = 100;
        img.y = 100;

        stage.update();},
        1000);
    // дальше этим не будем заниматься, у нас будет анимация с постоянной перерисовкой сцены

    // А давайте теперь добавим анимацию. Будем двигать котика, постепенно увеличивая его x и y.

    createjs.Ticker //это таймер, один класс на всю программу.
                     //его не надо создавать, он уже есть
        .addEventListener("tick", stage);
    //мы добавили сцену как слушателя "tick", это событие срабатывает 60 раз в секунду(настриваемо)
    //теперь все объекты на сцене тоже получают событие tick
    //по этому событию оюъекты можно анимировать

    //теперь сцена автоматически делает update 60 раз в секунду, т.е. старый update не нужен

    img.addEventListener("tick", function () {
        img.x += 1; // сдвигаем на 1 пиксель
        img.y += 1;
    });
    //нет большой разницы в том, на какой объект повесить событие tick, мы могли повесить такое же
    //событие хоть на треугольник. Но логично действия с картинкой повесить на картинку.

    //скорость анимации
    createjs.Ticker.framerate = 60; //60 в секунду
    createjs.Ticker.interval = 20; //20 мс между срабатываниями (50 раз/сек)
    //режим
    createjs.Ticker.timerMode = createjs.Ticker.RAF;
    //RAF - requestAnimationFrame, это как мы делали. Но в этом режиме нельзя настраивать скорость.
    //RAF_SYCHED - это тоже requestAnimationFrame, но с попыткой синхронизировать скорость срабатывания
    //с указанной
    //TIMEOUT - через функцию setTimeout
}