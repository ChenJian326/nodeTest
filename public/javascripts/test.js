/**
 * Created by wangb on 2015/8/25.
 */

var isChrome;
var isFirefox;
var isIe;
var isEdge;
var left_x = document.getElementById("canvasCon").getBoundingClientRect().left;
var top_y = document.getElementById("canvasCon").getBoundingClientRect().top;
var clothing_scaleX = document.getElementById("canvasCon").width / 1920;
var clothing_scaleY = document.getElementById("canvasCon").height / 1080;
var common = {
    initBrowserName: function(){
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
    },
    //判断点击目标
    isPointClick: function (ev, pv) {
        var flag = false;
        p = this.getEventPosition(ev);
        if (p.x > pv[0] & p.x < pv[1] & p.y > pv[2] & p.y < pv[3]) {
            flag = true;
        }
        return flag;
    },
    //得到点击的坐标
    getEventPosition: function (ev) {
        var x, y;
        if (ev.layerX || ev.layerX == 0) {
            x = ev.layerX;
            y = ev.layerY;
            if(isIe || isEdge){
                y = y + document.documentElement.scrollTop;
                x = x + document.documentElement.scrollLeft;
            }
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            x = ev.offsetX;
            y = ev.offsetY;
        }
        return {x: x, y: y};
    },
    image: function (obj) {
        var image = new Image();
        image.src = obj;
        return image;
    },
    drawText: function (cxt, strFont, strColor, strText, intX, intY, binFill,align) {
        cxt.font = strFont;
        if(align == null || align == ""){
            align = "center";
        }
        cxt.textAlign = align;
        cxt.textBaseline = "middle";
        if (binFill) {
            cxt.fillStyle = strColor;
            cxt.fillText(strText, intX, intY)
        } else {
            cxt.strokeStyle = strColor;
            cxt.strokeText(strText, intX, intY)
        }
    },
    MainAjax: function (param, callback) {
        $.ajax({
            type: "post",
            url: "/index",
            dataType: "json",
            data: param,
            success: callback
        })
    },
    getScaleWH: function(w,isScaleW,scale){
        isScaleW = isScaleW || true;
        if(isScaleW){
            scale = scale || clothing_scaleX;
        }else{
            scale = scale || clothing_scaleY;
        }
        return w * scale;
    },
    drawNewLineText: function(cxt,lineHeight, strFont, strColor, strText, intX, intY, binFill,align){
        var texts = String(strText).split("\n");
        var len = texts.length;
        binFill = binFill || true;
        for(var i = 0; i < len ; i++){
            common.drawText(cxt,strFont,strColor,texts[i],intX,intY + (i * lineHeight),binFill,align);
        }
        console.log(texts);
    }
}

var Load = {
    loadImages: function (arr) {
        var newImages = [], loadedImages = 0;
        var postAction = function () {
        }
        var arr = (typeof arr != "object") ? [arr] : arr;
        console.log(" typeof= ",typeof arr);
        function imageLoadPost() {
            loadedImages++;
            if (loadedImages == arr.length) {
                postAction(newImages)
            }
        }

        for (var i = 0; i < arr.length; i++) {
            newImages[i] = new Image();
            newImages[i].src = arr[i];
            newImages[i].onload = function () {
                imageLoadPost()
            }
            newImages[i].onerror = function () {
                imageLoadPost()
            }
        }
        return {
            done: function (f) {
                postAction = f || postAction
            }
        }
    }
}
//继承
function inherit(p){
    if(p == null){
        throw TypeError();
    }
    if(Object.create){
        return Object.create(p);
    }
    var t = typeof p;
    if(t == "object" && t !== "function"){
        function f(){};
        f.prototype = p;
    }
    return f();
}


