var Player = Class.create({
    health:1,
    _currX:0,
    _currY:0,
    scale:0.1,
    pSprite:null,

    initialize: function() {
        this.pSprite= new Image();
        this.pSprite.src = './res/Normal/nekopewpew3.jpg';
        var self = this;
        this.pSprite.onload = function(){
                self.pSprite.width = (self.pSprite.width * self.scale);
                self.pSprite.height = (self.pSprite.height * self.scale);
        }

    },

    moveSprite:function(x,y, ctx)
    {
        this._currX = x;
        this._currY = y;
        ctx.drawImage(this.getSprite(),this._currX,this._currY, this.pSprite.width, this.pSprite.height);
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
    }

});