/**
 * Created by wangb on 2015/9/7.
 */
var clothing_images = [];
var clothing_hashClicks = {};
var btnNames = ["电器店","服装店","家具城","购买","发型","连衣裙","上\n装","下\n装","袜\n子","鞋\n子","饰\n品","钻石","金币"];
(function(){
    var clothing_con = document.getElementById("canvasCon");
    var clothing_context = clothing_con.getContext("2d");

    window.onload = function(){
        common.initBrowserName();
        var imageNames = [];
        for(var i = 1;i <= 27; i++){
            imageNames.push("images/clothing/c_" + i+ ".png");
        }
        Load.loadImages(imageNames).done(function(ims){
            clothing_images = ims;
            //canvas 背景
            clothing_context.drawImage(clothing_images[17],0,0,clothing_con.width,clothing_con.height);
            clothing_context.drawImage(clothing_images[16], 80, 124, 720, 510);
            clothing_context.drawImage(clothing_images[18],0,0,clothing_con.width,clothing_con.height);
            //返回按钮
            clothing_context.drawImage(clothing_images[0], 0, 0, clothing_images[0].width * clothing_scaleX, clothing_images[0].height * clothing_scaleY);
            clothing_hashClicks["clothing_images"] = ["返回", [left_x, left_x + clothing_images[0].width * clothing_scaleX, top_y, top_y + clothing_images[0].height * clothing_scaleY]];

            for(var i = 0 ; i < 2 ; i++){
                drawNumberLabel([347 + i * 210,32],2000,clothing_images[5 + i],i);
            }
            drawLeftPanel();
            drawPeople();
            clothing();
        })
        clothing_con.onclick = clothingOnClick;
    }

    function clothingOnClick(event) {
        event.preventDefault();
        var isClick;
        for (var key in clothing_hashClicks) {
            isClick = common.isPointClick(event, clothing_hashClicks[key][1]);
            if (isClick == true) {
                alert("你点击了[" + clothing_hashClicks[key][0] + "]发现打开了百度");
                // window.location = "http://www.baidu.com";
                break;
            }
        }
    }

    function drawNumberLabel(point,text,icon,type){
        var img = clothing_images[12];
        var bg_w = img.width * clothing_scaleX;
        var bg_h = img.height * clothing_scaleY;
        var addBtn_x = bg_w - clothing_images[11].width * clothing_scaleX + point[0];
        var addBtn_y = bg_h - clothing_images[11].height * clothing_scaleY+ point[1] - 6;
        clothing_context.drawImage(img,point[0],point[1],bg_w,bg_h);
        clothing_context.drawImage(icon,point[0] - 3,point[1] + 5,icon.width ,icon.height);
        clothing_context.drawImage(clothing_images[11],addBtn_x,addBtn_y,clothing_images[11].width * clothing_scaleX,clothing_images[11].height * clothing_scaleY);
        common.drawText(clothing_context,"14pt Arial", "#000000",text,point[0] + bg_w * 0.5,point[1] + bg_h * 0.5,true);
        clothing_hashClicks["add" + type] = [btnNames[type + 11], [addBtn_x + left_x, left_x + addBtn_x + clothing_images[11].width * clothing_scaleX, addBtn_y + top_y, addBtn_y + top_y + clothing_images[11].height * clothing_scaleY]];
    }

    function drawLeftPanel(){
        //
        var img = clothing_images[2];
        var x = 120,y = 100,bg_w = img.width * clothing_scaleX,bg_h = img.height * clothing_scaleY;
        var textX = 0;
        for(var i = 0 ; i < 5 ; i++){
            if(i < 3){
                textX = x + (i * (bg_w + 20));
                clothing_context.drawImage(img,textX,y ,bg_w,bg_h);
                common.drawText(clothing_context,"18pt Arial", "#ffffff",btnNames[i],textX + bg_w * 0.5,y + bg_h * 0.5,true);
                clothing_hashClicks["store" + i] = [btnNames[i], [textX + left_x, left_x + textX + bg_w, y + top_y, y + top_y + bg_h]];
            }else{
                clothing_context.drawImage(clothing_images[9],535 + ((i - 3) * clothing_images[9].width * clothing_scaleX),500 ,clothing_images[9].width * clothing_scaleX,clothing_images[9].height * clothing_scaleY);
            }
        }
        //购买按钮
        var buy_x = 230,buy_y = 440;
        clothing_context.drawImage(clothing_images[3],buy_x,buy_y ,common.getScaleWH(clothing_images[3].width),common.getScaleWH(clothing_images[3].height,false));
        common.drawText(clothing_context,"18pt Arial", "#ffffff","购买",buy_x + common.getScaleWH(clothing_images[3].width) * 0.5,buy_y + common.getScaleWH(clothing_images[3].height,false) * 0.5,true);
        clothing_hashClicks["buy" ] = ["购买", [buy_x + left_x, left_x + buy_x + common.getScaleWH(clothing_images[3].width), buy_y + top_y, buy_y + top_y + common.getScaleWH(clothing_images[3].height,false)]];
        //提示信息
        var tip_x = 172,tip_y = 185;
        clothing_context.drawImage(clothing_images[4],tip_x, tip_y ,common.getScaleWH(clothing_images[4].width),common.getScaleWH(clothing_images[4].height,false));
        common.drawText(clothing_context,"36pt Arial", "#d29354","空谷幽兰",tip_x + common.getScaleWH(clothing_images[4].width) * 0.5,tip_y + common.getScaleWH(clothing_images[4].height,false) * 0.5 - 15,true);
        common.drawNewLineText(clothing_context,25,"14pt Arial", "#ffffff","深谷里面挺拔而娇艳的兰花.\n散发着一种让人无法摧毁的清冷与高贵",tip_x + common.getScaleWH(clothing_images[4].width) * 0.5,tip_y + common.getScaleWH(clothing_images[4].height,false) + 25 ,true);
    }
    function drawPeople(){
        clothing_context.drawImage(clothing_images[19],610,500,common.getScaleWH(clothing_images[19].width),common.getScaleWH(clothing_images[19].height,true));
        var y = common.getScaleWH(clothing_images[22].height,true) + 80;
        clothing_context.drawImage(clothing_images[22],630,80,common.getScaleWH(clothing_images[22].width),common.getScaleWH(clothing_images[22].height,true));
        clothing_context.drawImage(clothing_images[23],630,y,common.getScaleWH(clothing_images[23].width),common.getScaleWH(clothing_images[23].height,true));
        y = common.getScaleWH(clothing_images[23].height,true) + common.getScaleWH(clothing_images[22].height,true) + 80;
        clothing_context.drawImage(clothing_images[21],630,y,common.getScaleWH(clothing_images[21].width),common.getScaleWH(clothing_images[21].height,true));
        y = common.getScaleWH(clothing_images[23].height,true) + common.getScaleWH(clothing_images[22].height,true) + common.getScaleWH(clothing_images[20].height,true) + 80;
        clothing_context.drawImage(clothing_images[20],630,y,common.getScaleWH(clothing_images[20].width),common.getScaleWH(clothing_images[20].height,true));
    }

})();
function print(obj){
    console.log(obj);
}
