var input = document.getElementById("input");
var ul = document.getElementById("show");
var li = document.getElementById("show").getElementsByTagName("li");
var qb = document.getElementById("querybox");
var map = Array.prototype.map;

var leftin = function() {
    if (valid()) {
        var arr = input.value.trim().replace(/\s*[,_、]\s*|\s+/g, ' ').split(' ');

        arr.map(function(a) {
            paint(a, ul, 'left')
        })
    } else alert('请输入有效字符');
}

var rightin = function() {
    if (valid()) {
        var arr = input.value.trim().replace(/\s*[,_、]\s*|\s+/g, ' ').split(' ');
        arr.map(function(a) {
            paint(a, ul, 'right')
        })
    } else alert('请输入有效字符');
}

var leftout = function() {
    var left = li[0];
    alert(left.innerHTML)
    left.parentNode.removeChild(left);


}

var rightout = function() {

    var right = li[li.length - 1]
    alert(right.innerHTML)
    right.parentNode.removeChild(right);

}

var valid = function() {

    return input.value.replace(/\s*[,_、]\s*|\s+/g, '');
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

var query = function() {

    map.call(li, function(a) {

        a.style.color = '#000'


    })

    map.call(li, function(a) {

        if (a.innerHTML.indexOf(qb.value) > -1) {
            a.style.color = '#f00'
        }

    })

}

var init = function() {
    var op = document.getElementById("op").getElementsByTagName('button');

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
