var start = {
    centerTxt:function(ctx, text, y) {
            ctx.font = '70pt Comic Sans MS Bold';
            //var measurement = ctx.measureText(text);
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            var gradient=ctx.createLinearGradient(0,y-35,0,y+35);
            gradient.addColorStop("0","blue");
            gradient.addColorStop("0.5","lightskyblue");
            gradient.addColorStop("1.0","white");
            ctx.fillStyle = gradient;
            var x = ctx.canvas.width / 2;
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

            start.centerTxt(ctx, title, y);
            x=(ctx.canvas.width - img.width) / 2;
            ctx.drawImage(img, x, y);
        }
        //alert(canvas.width);
        //alert(canvas.height);
    }
};