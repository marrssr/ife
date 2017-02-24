var input = document.getElementById("num");

var leftin = function() {
    if (valid()) {
        var li = document.getElementById("show");
        paint(input.value, li, 'left')
    } else alert('请输入数字');
}

var rightin = function() {
    if (valid()) {
        var ul = document.getElementById("show");
        paint(input.value, ul, 'right')
    } else alert('请输入数字');
}

var leftout = function() {
    var left = document.getElementById("show").getElementsByTagName("li")[0];
    alert(left.innerHTML)
    left.parentNode.removeChild(left);


}

var rightout = function() {
    var li = document.getElementById("show").getElementsByTagName("li");
    var right = li[li.length - 1]
    alert(right.innerHTML)
    right.parentNode.removeChild(right);

}

var valid = function() {

    return /^\d+$/.test(input.value);
}

var paint = function(a, parent, pos) {

    var li = document.createElement('li');
    li.innerHTML = a;
    li.onclick = del;
    if (pos == 'left') parent.insertBefore(li, parent.childNodes[0]);
    if (pos == 'right') parent.appendChild(li)

}

var del = function() {

    var a = window.event.target;
    a.parentNode.removeChild(a);


}

var init = function() {
    var op = document.getElementById("op").getElementsByTagName('button');

    var map = Array.prototype.map;
    map.call(op, function(a) {
        a.onclick = eval(a.id)
    });
}

init();
/*
document.getElementById("leftin").onclick = leftin
document.getElementById("leftout").onclick = leftout
document.getElementById("rightin").onclick = rightin
document.getElementById("rightout").onclick = rightout*/
