function init() {
    console.info("page loaded");

    var stage = new createjs.Stage("game"); //указываем id для <canvas>

    function create_house() {
        var h = new createjs.Container();

        var chimney = new createjs.Shape();
        chimney.graphics
            .beginFill("Purple").drawRect(50, -145, 20, 100);

        var roof = new createjs.Shape();
        roof.graphics
            .beginFill("DarkRed").moveTo(-80, -75).lineTo(80, -75).lineTo(0, -155).lineTo(-80, -75);

        var base = new createjs.Shape();
        base.graphics
            .beginFill("DarkBlue").beginStroke("Black").moveTo(-90, 0).lineTo(90, 0).lineTo(90, -75)
            .lineTo(-90, -75).lineTo(-90, 0);

        var window = new createjs.Shape();
        window.graphics
            .beginFill("Black").drawRect(-70, -65, 40, 50);

        var smoke1 = new createjs.Shape();
        var smoke2 = new createjs.Shape();
        var smoke3 = new createjs.Shape();
        smoke1.graphics
            .beginStroke("black").drawCircle(75, -165, 15);
        smoke2.graphics
            .beginStroke("black").drawCircle(95, -180, 20);
        smoke3.graphics
            .beginStroke("black").drawCircle(115, -195, 25);

        h.addChild(smoke1, smoke2, smoke3, chimney, roof, base, window);

        h.regY = -40;

        return h;
    }

    //Домик - крыша, труба, окна, дым
    //Shape: окно, стены, крыша, труба - дом
    //Весь дома в Container, чтобы его можно было двигать по сцене.

    var house1 = create_house();
    var house2 = create_house();
    var house3 = create_house();
    var house4 = create_house();
    var house5 = create_house();

    house5.scaleX = 1.2;
    house5.scaleY = 1.2;
    house5.x = 340;
    house5.y = 230;

    house4.scaleX = 0.8;
    house4.scaleY = 0.7;
    house4.x = 200;
    house4.y = 410;

    house3.scaleX = 1.1;
    house3.scaleY = 1.2;
    house3.rotation = 120;
    house3.x = 350;
    house3.y = 350;

    house2.rotation = 10;
    house2.x = 110;
    house2.y = 250;

    house1.scaleX = 3;
    house1.scaleY = 3;
    house1.x = 290;
    house1.y = 280;
    house1.rotation = 8;

    stage.addChild(house1, house2, house3, house4, house5);

    stage.update();
}