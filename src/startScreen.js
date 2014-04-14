var start = {
    centerTxt:function(ctx, text, y) {
            var measurement = ctx.measureText(text);
            var x = (ctx.canvas.width - measurement.width) / 2;
            ctx.fillText(text, x, y);
    },
    startScreen:function(){
        canvas = document.getElementById('gameCanvas');
        imgPath='./res/Normal/nekostart.png';
        img = new Image();
        img.src = imgPath;
        img.onload=function(){
            ctx=canvas.getContext('2d');
            var y = ctx.canvas.height / 2;
            title='Neko Pew Pew!';
            ctx.fillStyle = 'white';
            ctx.font = '48px monospace';
            start.centerTxt(ctx, title, y);
            x=(ctx.canvas.width - img.width) / 2;
            ctx.drawImage(img, x, y);
        }
        //alert(canvas.width);
        //alert(canvas.height);
    }
};