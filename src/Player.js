var Player = Class.create(Entity, {
    health:1,
    _currX:400,
    _currY:500,
    scale:0.1,
    pSprite:null,
    playerProjectile:["PlayerProjectile"],

    initialize: function($super, x,y) {
        $super(x,y);
        this.pSprite= assets.img_Player;
        var self = this;
        self.pSprite.width = (self.pSprite.naturalWidth * self.scale);
        self.pSprite.height = (self.pSprite.naturalHeight * self.scale);
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = self._currX/b2Unit; //Note: Tutorials indicate position is based on center
        bodyDef.position.y = self._currY/b2Unit;
        bodyDef.fixedRotation = true;
        bodyDef.userData = self;
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape();
        fixDef.filter.categoryBits = categories.player;
        // half width, half height.
        fixDef.shape.SetAsBox((self.pSprite.width) / 2 /b2Unit, (self.pSprite.height) / 2 /b2Unit);
        self._body = gameEngine.world.CreateBody(bodyDef)
        self._body.CreateFixture(fixDef);


    },
    update:function($super){
            $super();
//            if(Math.floor(Math.random() * 30) % 30 == 0 && this._body)  //1 in 30 chance * 60 frames per second = 2 per second
//            {
//                var proj = new window[this.playerProjectile[0]](this._currX, this._currY+this.pSprite.height);
//                proj.moveSprite(0,500);
//                gameEngine.Entities.push(proj);
//            }
    }
});