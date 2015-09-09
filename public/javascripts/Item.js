/**
 * Created by wangb on 2015/8/26.
 */
/*var con_item = document.getElementById("itemCanvas");
 var context_item = con_item.getContext("2d");*/
var item_canvas_w = 930;
var item_canvas_h = 115;
var scale_itemX = item_canvas_w / 1584;
var scale_itemY = item_canvas_h / 197;
var item = {
    getItem: function (data, callBack) {
        var bg_Img = img_loads[9];//common.image("images/h_10.png");
        var head_img = img_loads[4]; //common.image("images/h_5.png");
        var delete_img = img_loads[3];// common.image("images/h_4.png");
        var chat_img = img_loads[2]; //common.image("images/h_3.png");
        var name_bg_img = img_loads[8];// common.image("images/h_9.png");
        var con_item = document.createElement("canvas");
        var xys = [];
        con_item.width = item_canvas_w;
        con_item.height = item_canvas_h;
        var context_item = con_item.getContext("2d");
        context_item.clearRect(0, 0, con_item.width, con_item.height);
        context_item.drawImage(bg_Img, 0, 0, con_item.width, con_item.height);
        context_item.drawImage(head_img, 10, 10, head_img.width * scale_itemX, head_img.height * scale_itemY);
        context_item.drawImage(delete_img, con_item.width - 80, (con_item.height - delete_img.height) + 10, delete_img.width * scale_itemX, delete_img.height * scale_itemY);
        context_item.drawImage(chat_img, con_item.width - 150, (con_item.height - chat_img.height) + 10, chat_img.width * scale_itemX, chat_img.height * scale_itemY);
        context_item.drawImage(name_bg_img, 93 + name_bg_img.width * scale_itemX, 12, name_bg_img.width * scale_itemX, name_bg_img.height * scale_itemY);
        common.drawText(context_item, "13pt Arial", "#ffffff", data.text, 36 + name_bg_img.width * scale_itemX, 24, true, "left");
        common.drawText(context_item, "13pt Arial", "#ffffff", data.vipLv, 120 + name_bg_img.width * scale_itemX, 24, true);
        common.drawText(context_item, "14pt Arial", "#ffffff", "删除", con_item.width - 55, (con_item.height - chat_img.height) + 36, true);
        common.drawText(context_item, "14pt Arial", "#ffffff", "私聊", con_item.width - 125, (con_item.height - chat_img.height) + 36, true);
        common.drawText(context_item, "14pt Arial", "#ffffff", data.lv, 15 + head_img.width * scale_itemX, 90, true, "left");
        common.drawText(context_item, "14pt Arial", "#ffffff", data.time, 650, 90, true, "left");

        xys.push([con_item.width - 150,chat_img.width * scale_itemX,(con_item.height - chat_img.height) + 10, chat_img.height * scale_itemY]);
        xys.push([con_item.width - 80,delete_img.width * scale_itemX, (con_item.height - delete_img.height) + 10, delete_img.height * scale_itemY]);

        if (callBack) {
            callBack(con_item,xys);
        }
        console.log("name_bg_img");
        console.log(parseInt("f", 36), parseInt("ff", 36));
    }
}


