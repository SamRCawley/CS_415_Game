var Entity = Class.create({
    health:1,
    _currX:0,
    _currY:0,
    scale:0.1,
    pSprite:null,

    initialize: function() {
    },

    moveSprite:function(x,y)
    {
        this._currX = x;
        this._currY = y;
    },

    getScale:function()
    {
        return this.scale;
    },

    setNewScale:function(nScale)
    {
        this.scale = nScale;
    },

    getSprite:function(ctx)
    {
            return this.pSprite;
    },

    getHealth:function()
    {
        return this.health;
    },

    getX:function()
    {
        return this._currX;
    },

    getY:function()
    {
        return this._currY;
    },

    redraw:function(){
        var ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.drawImage(this.getSprite(),this._currX,this._currY, this.pSprite.width, this.pSprite.height);
    }

});