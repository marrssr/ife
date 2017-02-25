var input = document.getElementById("input");
var btn = document.getElementById("validate");
var message = document.getElementById('message');


var validate = function() {

    hint('normal')
    if (input.value) {
        if (/^[A-Za-z0-9]{4,16}$/.test(input.value.replace(/[\u4e00-\u9fa5]/g, 'aa'))) {
            hint('pass', '通过');
        } else {
            hint('alarm', '请输入长度为4~16个字符');
        }
    } else {
        hint('alarm', '名称不能为空');
    }
}

var hint = function(type, mes) {
    message.innerHTML = mes || "必填，长度为4~16个字符";
    input.setAttribute('class', type);
    message.setAttribute('class', type)
}

var init = function() {
    btn.onclick = validate;
}

init();
