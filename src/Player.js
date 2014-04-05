var Player = {
    var health = 1;
    var _currX = 0;
    var _currY = 0;
    var scale = 0.1;
    var pSprite:null;


    moveSprite:function(x,y, ctx)
    {
        _currX = x;
        _currY = y;
        ctx.drawImage(this.getSprite(),_currX,_currY);
    },

    getScale:function()
    {
        return scale;
    },

    setNewScale:function(nScale)
    {
        scale = nScale;
    }

    getSprite:function(ctx)
    {
            pSprite = new Image();
            pSprite.onload = function() {
            ctx.drawImage(pSprite, 250, 250);
            };
            pSprite.src = './res/Normal/nekopewpew3.jpg';

            return pSprite;
    },

    getHealth:function()
    {
        return health;
    },

    getX:function()
    {
        return _currX;
    },

    getY:function()
    {
        return _currY;
    }

});