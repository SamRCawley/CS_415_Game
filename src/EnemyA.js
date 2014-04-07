var EnemyA = Class.create(Entity, {
    health:1,
    _currX:0,
    _currY:0,
    scale:1,
    pSprite:null,
    initialize: function() {
            this.pSprite= new Image();
            this.pSprite.src = './res/Normal/CloseSelected.png';
            var self = this;
            this._currX = 250;
            this._currY = 0;
            this.pSprite.onload = function(){
                self.pSprite.width = (self.pSprite.width * self.scale);
                self.pSprite.height = (self.pSprite.height * self.scale);

                }

    },
    update:function($super){
            $super();
            }
});