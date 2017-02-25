var view = document.getElementById("view");
var qb = document.getElementById("querybox");
var map = Array.prototype.map;
var int1 = setInterval();
var int2 = setInterval();


var random = function() {
    var Range = 3;
    var Rand = Math.random();
    return (2 + Math.round(Rand * Range));
}

var foster = function(parent, size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        var div = document.createElement("div");
        var a = document.createElement('a');
        a.innerHTML = random();
        div.appendChild(a);
        parent.appendChild(div);
        arr.push(div)
    }
    return arr;
}

var buildTree = function(root, level) {

    if (level == 1) foster(root, random());
    if (level > 1) foster(root, random()).map(function(a) {
        buildTree(a, level - 1, random());
    })

}

function getChildren(obj) {
    var objChild = [];
    var objs = obj.getElementsByTagName('div');
    for (var i = 0, j = objs.length; i < j; ++i) {
        if (objs[i].nodeType != 1) {
            alert(objs[i].nodeType);
            continue;
        }
        var temp = objs[i].parentNode;
        if (temp.nodeType == 1) {
            if (temp == obj) {
                objChild[objChild.length] = objs[i];
            }
        } else if (temp.parentNode == obj) {
            objChild[objChild.length] = objs[i];
        }
    }
    return objChild;
}

var getTree = function(root) {

    var tree = [];
    var func = function(root) {
        if (getChildren(root).length == 0) tree.push(root);
        else {

            tree.push(root);
            getChildren(root).map(func);

        }
    }

    func(root);

    return tree;

}

buildTree(view, 2);

var display = function() {
    var t = getTree(view);
    var l = t.length;
    var i = 0;
    window.clearInterval(int1);
    window.clearInterval(int2);
    map.call(t, function(a) {
        a.style.border = '1px solid #000';
    });
    int1 = setInterval(function() {

        if (i < l) {
            t[i].style.border = '1px solid #f00';
            i++;
        } else {
            map.call(t, function(a) {
                a.style.border = '1px solid #000';
            });
            window.clearInterval(int1);
        }
    }, 500)


}

var query = function() {

    var t = getTree(view);
    var l = t.length;
    var i = 0;
    window.clearInterval(int1);
    window.clearInterval(int2);
    map.call(t, function(a) {
        a.style.border = '1px solid #000';
    });
    int2 = setInterval(function() {

            if (i < l) {
                t[i].style.border = '1px solid #f00';
                if (t[i].getElementsByTagName('a')[0].innerHTML == qb.value)
                    t[i].style.background = '#aaa';
                i++;
            } else {
                map.call(t, function(a) {
                    a.style.border = '1px solid #000';
                    a.style.background = '#fff';
                });
                window.clearInterval(int2);
            }
        },
        500)


}
