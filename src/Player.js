var Player = Class.create(Entity, {
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

    }

});