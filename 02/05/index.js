var input = document.getElementById("num");
var map = Array.prototype.map;

var leftin = function() {
    var l = document.getElementById("show").getElementsByTagName("li").length;
    if (l < 61) {
        if (valid()) {
            var li = document.getElementById("show");
            paint(input.value, li, 'left')
        } else alert('请输入10-100之间的数字');
    } else {
        alert('队列已满');
    }
}


var rightin = function() {
    var l = document.getElementById("show").getElementsByTagName("li").length;
    if (l < 61) {
        if (valid()) {
            var ul = document.getElementById("show");
            paint(input.value, ul, 'right')
        } else alert('请输入10-100之间的数字');
    } else {
        alert('队列已满');
    }
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

var sorting = function() {


    var l = document.getElementById("show").getElementsByTagName("li").length;
    var li = document.getElementById("show").getElementsByTagName("li");
    var i = 0;
    var int = setInterval(function() {

        map.call(li, function(a) {
            a.style.background = '#000';
        })

        for (j = i + 1; j < l; j++) {

            hx = li[i].style.height;
            hy = li[j].style.height;

            if (hx > hy) {
                li[i].style.background = '#f00';
                li[j].style.background = '#00f';
                li[j].parentNode.insertBefore(li[i], li[j].nextElementSibling);
                li[j].parentNode.insertBefore(li[j - 1], li[i]);



            }


        }
        i++;
        if (i == l) window.clearInterval(int);

    }, 500)



}

var valid = function() {

    if (/^\d+$/.test(input.value))
        if (input.value > 9 && input.value < 101) return true
    return false;
}

var paint = function(a, parent, pos) {

    var li = document.createElement('li');

    li.onclick = del;
    li.style.height = a;
    if (pos == 'left') parent.insertBefore(li, parent.childNodes[0]);
    if (pos == 'right') parent.appendChild(li)

}

var del = function() {

    var a = window.event.target;
    a.parentNode.removeChild(a);


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
