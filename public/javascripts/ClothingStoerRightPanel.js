/**
 * Created by wangb on 2015/9/7.
 */
function clothing(){
    var canvas = document.getElementById("canvasCon");
    var context = canvas.getContext("2d");
    var bg_x = 815,bg_y = 65,img_w = common.getScaleWH(clothing_images[1].width),img_h = common.getScaleWH(clothing_images[1].height,false);
    var i;
    var vertical_x  = bg_x - (img_w >> 1),vertical_y = bg_y + 20;
    context.drawImage(clothing_images[15],bg_x,bg_y,275,520);
    var addBtn_x,addBtn_y;
    for(i = 0; i < 7 ; i ++){
        if(i < 2){
            addBtn_x = vertical_x + 50 + i * (img_h + 10);
            addBtn_y = bg_y - 13;
            context.drawImage(clothing_images[26],addBtn_x,addBtn_y,img_h,img_w);
            common.drawText(context,"14pt Arial", "#ffffff",btnNames[4 + i],vertical_x + 86 + i * (img_h + 10),bg_y + 3,true);
            clothing_hashClicks["table" + i] = [btnNames[4 + i], [addBtn_x + left_x, left_x + addBtn_x + img_h, addBtn_y + top_y, addBtn_y + top_y + img_w]];
        }else{
            addBtn_x = vertical_x;
            addBtn_y = (i - 2) * (img_h + 10) + vertical_y;
            context.drawImage(clothing_images[1],vertical_x,addBtn_y,img_w,img_h);
            common.drawNewLineText(context,25,"14pt Arial", "#ffffff",btnNames[i + 4],vertical_x + (img_w >> 1),((i - 2) * (img_h + 10) + vertical_y) + (img_h >> 1) - 12);
            clothing_hashClicks["table" + i] = [btnNames[i + 4].replace("\n",""), [addBtn_x + left_x, left_x + addBtn_x + img_w, addBtn_y + top_y, addBtn_y + top_y + img_h]];
        }
    }
    var item_x = bg_x + 20,item_y = bg_y + 25;
    for(i = 0 ; i < 2 ; i++){
        for(var j = 0 ; j < 4 ; j++){
            var item = drawPanel(Math.floor(Math.random() * 10000),2 - i,clothing_images[22 + j]);
            context.drawImage(item,item_x + i * (item.width + 20),item_y + (item.height + 20) * j,item.width,item.height);
        }
    }
   /* iconType = 1金币 = 2 钻石
    text = 数量
    icon = 图标*/
    function drawPanel(text,iconType,icon){
        var img = clothing_images[8];
        var con_item = document.createElement("canvas");
        con_item.width = common.getScaleWH(img.width);
        con_item.height = common.getScaleWH(img.height,true);
        var context_item = con_item.getContext("2d");
        var typeIcon = iconType == 1 ? clothing_images[5] : clothing_images[6];

        context_item.drawImage(img,0,0,con_item.width,con_item.height);
        context_item.drawImage(icon,(con_item.width - common.getScaleWH(icon.width) + 8) * 0.5,5, common.getScaleWH(icon.width), common.getScaleWH(icon.height,true));
        var _w = common.getScaleWH(clothing_images[7].width),_h = common.getScaleWH(clothing_images[7].height,true);
        context_item.drawImage(clothing_images[7],12,con_item.height - (_h + 20),_w,_h);
        context_item.drawImage(typeIcon,8,con_item.height - (_h + 22),25,25);
        common.drawText(context_item,"12pt Arial", "#000000",text,con_item.width >> 1,con_item.height - (_h + 10),true);
        return con_item;
    }
};