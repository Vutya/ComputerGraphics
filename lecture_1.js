// JavaScript~Java
// if (x==7) {}
var x =5;

х = 10; // (хэ)
 /*
for (var i = 0; i < 10; i++), можно без var
var - переменная заводится на всю функцию
*/

Console.log("...");// - отладка
Console.debug("...");
Console.time();
Console.info();

function f(x, y) {
    return x+y;
}

Console.log(f(1, 2));
function kek() {
    function g() {
        // g - вложенная функция
        return 1;
    }
    return 2;
}

/*
Функции в JS - объекты первого рода. Можно хранить в переменных.
 */

function f1(x, y) {
    return x + y;
}

function f2(x, y) {
    return x - y;
}

var h;
if (x)
    h = f1;
else
    h = f2;
// h(1, 2) - return 3 или -1

/*
Анонимная функция
function () {}
var f = function(x) {return x+1;};

Замыкания
var a = 1;
function add(x) {return x + a;};
console.log(add(10));
Ответ 11

a=2;
Изменили внешюю переменную;
console.log(add(10));
Ответ будет 12
А в Java ответ чуть-чуть другой: невозможно изменять переменные, используемые внутри функции

var print = [null, null, null];
for (var i=0; i<3; i++)
    print[i] = function() {console.log(i);};
Что напечатает print[1]?
print[1]() напечатает i=3
Решение: функция возвращает другую функцию
 */

var print = [null, null, null];
for (var i=0; i<3; i++)
    print[i] = function() {console.log(i);};
print[1]();

/*
Массивы:
a1 = [];
a2 = ["xyz", 1, 10, [1,2,3]];
a3 = new Array(10); - из 10 элементов
a2[1] -> 1
a2[2] -> 10
a2[2] = "ooo";
a2.length
a = [10, 20, 30]
a.push(40);
b = a.slice(); - копия
a.splice(1, 1, "abc", "def"); - меняет содержимое массива
a -> [10 , "abc", "def", 20, 30]

Всё хранится ссылками
a=[10, 20, 30];
b = a;
b[1] = 21;
[10, 21, 30] - оба массива
 */

/*
Объекты
Прототипное наследование
var o1 = {name: "Vutyan", age: 19} - набор значений полей
o1.name - обращение к полю
o1.name = "Viktor";
o1.age = 42;
o1.surname = "Timokhov";
o1["name"] - как будто это ассоциативный массив
Массив шариков - [{x: 10, y: 20}, {x: 21, y: 40}];
 */

/*
MDN - помощь по JS
https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial

 */