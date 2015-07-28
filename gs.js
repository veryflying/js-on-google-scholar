javascript: c = document.getElementsByClassName("gs_ri");
var al = new Array();
for (var i = 0; i < c.length; i++) {
    d = c[i].getElementsByTagName('a');
    for (var j = 0; j < d.length; j++) {
        if (d[j].text == "引用") {
            al.push([d[j].attributes[0].value.substring(22, 34), d[j].attributes[0].value.substring(37, 38)]);
        }
    }
}
var para = document.getElementById("gs_ab");
var r = document.createElement('div');
r.style.height = "300px";
r.style.paddingTop = "60px";
para.style.height = "400px";
var p = document.createElement('p');
p.innerHTML = "本页论文引用如下：";
r.appendChild(p);
var page = get_page();
var j = 1;
for (var i = 0; i < al.length; i++) {
    gs_ajax('/scholar?q\x3dinfo:{id}:scholar.google.com/\x26output\x3dcite\x26scirp\x3d{p}\x26hl\x3dzh-CN'.replace('{id}', al[i][0]).replace('{p}', al[i][1]), "",
    function(c, t) {
        if (c != 200) {
            console.log("系统目前无法执行此操作，请稍后再试。")
        } else {
            d = gs_id("gs_citd");
            d.innerHTML = t;
            var p = document.createElement('p');
            p.innerHTML = (j+++(page - 1) * 10) + ".\t" + gs_id("gs_cit0").innerText + "<br>";
            r.appendChild(p);
        }
    })
}
para.appendChild(r);
function get_page() {
    var bs = document.getElementsByClassName("gs_ico gs_ico_nav_current");
    if (bs.length == 0) return 1;
    return parseInt(bs[0].nextElementSibling.innerText);
}