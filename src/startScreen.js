var start = {
    drawBackground:function(ctx){
    canvas = document.getElementById('gameCanvas');
            bgPath='./res/Normal/skybackground.png';
            bg = new Image();
            bg.src = bgPath;
            bg.onload=function(){
            ctx=canvas.getContext('2d');
            ctx.drawImage(bg, 0, 0);
            var y = (ctx.canvas.height) / 2;
            start.centerTxt(ctx);
            y = (ctx.canvas.height - img.height)/2;
            x=(ctx.canvas.width - img.width) / 2;
            ctx.drawImage(img, x, y);
            }

    },
    centerTxt:function(ctx) {
            y = 50;

            canvas = document.getElementById('gameCanvas');
                    titlePath='./res/Normal/title.png';
                    title = new Image();
                    title.src = titlePath;
                    title.onload=function(){
                    var x = (ctx.canvas.width - title.width)/ 2;
                    ctx.drawImage(title, x, y);
                    }


    },
    startScreen:function(){
        canvas = document.getElementById('gameCanvas');
        imgPath='./res/Normal/nekostart.png';
        img = new Image();
        img.src = imgPath;
        img.onload=function(){
            ctx=canvas.getContext('2d');
            start.drawBackground(ctx);

        }
        //alert(canvas.width);
        //alert(canvas.height);
    }
};