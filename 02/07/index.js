var view = document.getElementById("view");
var map = Array.prototype.map;

var foster = function(parent, size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        var div = document.createElement("div");
        parent.appendChild(div);
        arr.push(div)
    }
    return arr;
}

var buildTree = function(root, level, size) {

    if (level == 1) foster(root, size);
    if (level > 1) foster(root, size).map(function(a) {
        buildTree(a, level - 1, size);
    })

}



function getChildren(obj) {
    var objChild = [];
    var objs = obj.getElementsByTagName('*');
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

var getTree = function(root, type) {

    var tree = [];
    var func = function(root) {
        if (getChildren(root).length == 0) tree.push(root);
        else {
            switch (type) {
                case 'pre':
                    tree.push(root)
                    getChildren(root).map(func)
                    break;
                case 'in':
                    func(getChildren(root)[0])
                    tree.push(root)
                    func(getChildren(root)[1])
                    break;
                case 'post':
                    getChildren(root).map(func)
                    tree.push(root)
                    break;
            };
        }
    }

    func(root);

    return tree;

}

buildTree(view, 2, 2);

var display = function(order) {
    var t = getTree(view, order);
    var l = t.length;
    var i = 0;
    var int = setInterval(function() {

        map.call(t, function(a) {
            a.style.border = '1px solid #000';
        })

        t[i].style.border = '1px solid #f00';
        i++;
        if (i == l) window.clearInterval(int);
    }, 500)


}
