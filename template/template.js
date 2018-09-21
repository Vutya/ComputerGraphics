function init() {
    console.info("page loaded");

    //заведем параметры анимации
    //x = ...
    //y = ...
    //r = ...

    function draw() {
        //здесь перерисовывается содержимое экрана
        //используем значение параметров анимации
        //
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //это полная очистка canvas
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

    requestAnimationFrame(animation_step);

}