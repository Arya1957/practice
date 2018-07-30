//  详细参考链接： https://segmentfault.com/a/1190000000394948

/* 超级简单版本  */
let template = '<p>Hello,my name is <%name%>. I am  <%age%> years old.</p>';
let data = {name: "Krasimir", age: 29};

function TemplateEngine(tpl, data) {
    let regex = /<%([^%>]+)?%>/g;
    while (result = regex.exec(tpl)) {
        // RegExp.prototype.exec() 此时返回一个结果数组
        //  result 为 ["<%name%>","name"],["<%age%>","age"] .
        // 正则匹配返回的结果中还有input 、index 等属性，但是第一个参数是整个匹配成功的结果，第二个是圆括号对应的匹配成功的组
        tpl = tpl.replace(result[0], data[result[1]])
    }
    return tpl
}

TemplateEngine(template, data);
// 返回结果：  "<p>Hello,my name is Krasimir. I am  29 years old.</p>"



