/**
 * Created by wangb on 2015/8/25.
 */

var con = document.getElementById("canvasCon");
var context = con.getContext("2d");
var hashClicks = {};
var scaleX = con.width / 1920;
var scaleY = con.height / 1080;
var left_x = con.getBoundingClientRect().left;
var top_y = con.getBoundingClientRect().top;
var images = [];
for (var i = 1; i <= 12; i++) {
    images.push("images/h_" + i + ".png");
}
var img_loads = [];
var ev = eval("100+100");
console.log("ev = ", eval("100+100"), ev);
var isChrome;
var isFirefox;
var isIe ;
var isEdge;
window.onload = function () {
    //判断浏览器
     isChrome = window.navigator.userAgent.indexOf("Chrome") != -1 && window.navigator.userAgent.indexOf("Edge") == -1;
     isFirefox = window.navigator.userAgent.indexOf("Firefox") != -1;
     isIe = "ActiveXObject" in window;
     isEdge = window.navigator.userAgent.indexOf("Edge") != -1;
    if (isChrome) {
        left_x = 0;
        top_y = 0;
    }
    if(isFirefox){
        top_y = top_y + document.documentElement.scrollTop;
    }

    console.log(isChrome,isFirefox,isIe,isEdge);
    // 预加载图片
    Load.loadImages(images).done(function (images) {
        var x = 0;
        img_loads = images;
        console.log("images = ", images.length, images[0]);
        context.drawImage(images[11], 0, 0, con.width, con.height);
        context.drawImage(images[10], 20, 20, con.width - 50, con.height - 50);
        var names = ["好友列表", "添加好友", "好友申请"];
        for (var i = 0; i < names.length; i++) {
            context.drawImage(images[7], i * (images[7].width + 50) * scaleX + 180, 50, images[7].width * scaleX, images[7].height * scaleY);
            common.drawText(context, "20pt Arial", "#000000", names[i], i * (images[7].width + 50) * scaleX + 265, 78, true);
            x = left_x + (i * (images[7].width + 50) * scaleX + 180 );
            hashClicks["list" + i] = [names[i], [x, images[7].width * scaleX + x, 50 + top_y, images[7].height * scaleY + 48 + top_y]];
        }
        context.drawImage(images[0], 0, 0, images[0].width * scaleX, images[0].height * scaleY);
        drawItem();
        hashClicks["images0"] = ["返回", [left_x, left_x + images[0].width * scaleX, top_y, top_y + images[0].height * scaleY]];
        drawBottomPanel();
    });
    con.addEventListener("click", friendListOnClick);
}
function friendListOnClick(event) {
    event.preventDefault();
    var isClick;
    for (var key in hashClicks) {
        isClick = common.isPointClick(event, hashClicks[key][1]);
        if (isClick == true) {
            alert("你点击了" + hashClicks[key][0] + "发现打开了百度");
            // window.location = "http://www.baidu.com";
            break;
        }
    }
}
var datas = [{text: "好友1", lv: "Lv.8", vipLv: "Lv.21", time: "1小时前"},
    {text: "好友2", lv: "Lv.9", vipLv: "Lv.50", time: "3小时前"},
    {text: "好友3", lv: "Lv.10", vipLv: "Lv.8", time: "4小时前"}];

function drawItem() {
    var index = 0;
    for (var i = 0; i < 3; i++) {
        item.getItem(datas[i], function ($item, $xys) {
            context.drawImage($item, 100, ($item.height + 10) * index + 120, $item.width, $item.height);
            for (var j = 0; j < $xys.length; j++) {
                $xys[j][0] += 100 + left_x;
                $xys[j][1] += $xys[j][0];
                $xys[j][2] += ($item.height + 10) * index + 120 + top_y;
                $xys[j][3] += $xys[j][2];
            }
            console.log($xys[0], $xys[1]);
            hashClicks["delete" + index] = ["删除" + index, $xys[1]];
            hashClicks["chat" + index] = ["私聊" + index, $xys[0]];
            index++;
            console.log("index = ", index)
        });
    }
}
function drawBottomPanel() {
    var friendNum_img = img_loads[1];//common.image("images/h_2.png");
    var createRoom_img = img_loads[6];// common.image("images/h_7.png");
    var addRoom_img = img_loads[5]; //common.image("images/h_6.png");
    var btn_x;
    var btn_y;
    context.drawImage(friendNum_img, 100, con.height - (friendNum_img.height - 5), friendNum_img.width * scaleX, friendNum_img.height * scaleY);
    btn_x = con.width - 110 - ( addRoom_img.width * scaleX + createRoom_img.width * scaleX );
    btn_y = con.height - 38 - friendNum_img.height * scaleY;
    context.drawImage(createRoom_img, btn_x, btn_y, createRoom_img.width * scaleX, createRoom_img.height * scaleY);
    hashClicks["createRoom_img"] = ["创建房间", [btn_x + left_x, btn_x + left_x + addRoom_img.width * scaleX, btn_y + top_y, btn_y + top_y + friendNum_img.height * scaleX]];
    console.log(btn_x, btn_x + addRoom_img.width * scaleX, btn_y + top_y, btn_y + top_y + friendNum_img.height * scaleX, btn_y, btn_y + top_y, top_y)
    btn_x = con.width - addRoom_img.width * scaleX - 100;
    btn_y = con.height - 38 - (friendNum_img.height * scaleY);
    context.drawImage(addRoom_img, btn_x, btn_y, addRoom_img.width * scaleX, addRoom_img.height * scaleY);
    common.drawText(context, "16pt Arial", "#d29354", "格子数量 20/50", 100 + friendNum_img.width * scaleX * 0.5, con.height - (friendNum_img.height - 42), true);
    common.drawText(context, "14pt Arial", "#000000", "今日剩余体力赠送次数1/2", 500 + friendNum_img.width * scaleX * 0.5, con.height - (friendNum_img.height - 50), true);
    common.drawText(context, "14pt Arial", "#ffffff", "创建房间", con.width - 305, con.height - 88, true);
    common.drawText(context, "14pt Arial", "#ffffff", "加入房间", con.width - 165, con.height - 88, true);
    hashClicks["addRoom_img"] = ["加入房间", [btn_x + left_x, btn_x + left_x + addRoom_img.width * scaleX, btn_y + top_y, btn_y + top_y + addRoom_img.height * scaleX]];
    console.log(btn_x, btn_x + addRoom_img.width * scaleX, btn_y + top_y, btn_y + top_y + addRoom_img.height * scaleX, btn_y, btn_y + top_y, top_y, left_x);

}


function range(rorm, t) {
    var r = inherit(range.methods);
    r.rorm = rorm;
    r.t = t;
    return r;
}
range.methods = {
    add: function (x, y) {
        return x + y;
    }
}

var r = new range(10, 10);

console.log(r.add(10, 10), r.methods);

//setTimeout(function(){console.log("setTimeout")},1000);
//setInterval(function(){console.log("setInterval")},1000);