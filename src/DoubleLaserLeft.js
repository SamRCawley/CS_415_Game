var DoubleLaserLeft = Class.create(Entity, {
    health:1,
    _currX:0,
    _currY:0,
    scale:0.2,
    pSprite:null,
    initialize: function($super, x, y) {
            $super(x-5,y);
            this.pSprite= assets.img_doubleLaser;
            var self = this;
            self.pSprite.width = (self.pSprite.naturalWidth * self.scale);
            self.pSprite.height = (self.pSprite.naturalHeight * self.scale);
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_dynamicBody;
            bodyDef.position.x = self._currX/b2Unit; //Note: Tutorials indicate position is based on center
            bodyDef.position.y = self._currY/b2Unit; //Note: Using 10 pixels per box2d unit
            bodyDef.fixedRotation = true;
            bodyDef.userData = self;
            var fixDef = new b2FixtureDef();
            fixDef.density = 1.0;
            fixDef.friction = 0.3;
            fixDef.restitution = 0.8;
            fixDef.shape = new b2PolygonShape();
            fixDef.filter.categoryBits = categories.projectile;
            fixDef.filter.maskBits = ~(categories.wall|categories.projectile|categories.player); //not walls or projectiles
            // half width, half height.
            fixDef.shape.SetAsBox((self.pSprite.width) / 2 /b2Unit, (self.pSprite.height) / 2 /b2Unit);
            self._body = gameEngine.world.CreateBody(bodyDef)
            self._body.CreateFixture(fixDef);

    },

    update:function($super){
        $super();
        if(this._body)
        {
            if(this._currX > document.getElementById("gameCanvas").width + 50 || this._currY > document.getElementById("gameCanvas").height + 50 || this._currX < -50)
                this._removeTrigger = true;
            var vel = this._body.GetLinearVelocity();
        }
    },
    onCollide:function(ent){
        if(!(ent instanceof wall))
        {
            ent._removeTrigger = true; //change to damage in future update
            this._removeTrigger = true;
            //gameEngine.Entities[0].increaseScore(100);
        }

    }

});