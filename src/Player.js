var Player = Class.create(Entity, {
    health:1,
    _currX:400,
    _currY:500,
    scale:0.1,
    pSprite:null,

    initialize: function() {
        this.pSprite= new Image();
        this.pSprite.src = './res/Normal/nekopewpew3.jpg';
        var self = this;
        this.pSprite.onload = function(){
                self.pSprite.width = (self.pSprite.width * self.scale);
                self.pSprite.height = (self.pSprite.height * self.scale);
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
                // half width, half height.
                fixDef.shape.SetAsBox((self.pSprite.width) / 2 /b2Unit, (self.pSprite.height) / 2 /b2Unit);
                self._body = gameEngine.world.CreateBody(bodyDef)
                self._body.CreateFixture(fixDef);
        }

    },
    update:function($super){
            $super();
            }
});