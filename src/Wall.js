var wall = Class.create(Entity, {
    health:1,
    _currX:0,
    _currY:0,
    scale:0.7,
    pSprite:null,
    initialize: function($super, x, y) {
            $super(x,y);
            this.pSprite= assets.img_plane;
            var self = this;
            self.pSprite.width = (self.pSprite.naturalWidth * self.scale);
            self.pSprite.height = (self.pSprite.naturalHeight * self.scale);
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_kinematicBody;
            bodyDef.position.x = self._currX/b2Unit; //Note: Tutorials indicate position is based on center
            bodyDef.position.y = self._currY/b2Unit; //Note: Using 10 pixels per box2d unit
            bodyDef.fixedRotation = true;
            bodyDef.userData = self;
            var wings = new b2FixtureDef();
            wings.density = 5000.0;
            wings.friction = 0.3;
            wings.restitution = 0.0;
            wings.shape = new b2PolygonShape();
            wings.filter.categoryBits = categories.plane;
            wings.filter.maskBits = ~(categories.wall|categories.plane); //not walls or projectiles
            // half width, half height.
            wings.shape.SetAsBox((self.pSprite.width) / 2 /b2Unit, (self.pSprite.height) / 10 /b2Unit);
            var planeBody = new b2FixtureDef();
            planeBody.density = 5000.0;
            planeBody.friction = 0.3;
            planeBody.restitution = 0.0;
            planeBody.shape = new b2PolygonShape();
            planeBody.filter.categoryBits = categories.plane;
            planeBody.filter.maskBits = ~(categories.wall|categories.plane); //not walls or projectiles
            // half width, half height.
            planeBody.shape.SetAsBox((self.pSprite.width) / 10 /b2Unit, (self.pSprite.height) / 2 /b2Unit);
            self._body = gameEngine.world.CreateBody(bodyDef)
            self._body.CreateFixture(wings);
            self._body.CreateFixture(planeBody);
            this.moveSprite(0, 200);
    },
    update:function($super){
        $super();
        if(this._body)
        {
            if(this._currX > document.getElementById("gameCanvas").width + 50 || this._currY > document.getElementById("gameCanvas").height + 50 || this._currX < -50)
                this._removeTrigger = true;
        }
    },
    onCollide:function($super, ent){
        $super(ent);
        if(!(ent instanceof Player))
        {
            ent._removeTrigger = true;
        }
        else
        {
            ent.takeDamage(5000);
            if(ent.health == 0)
            {
                gameEngine.stopWorld();
                gameEngine.gameOver=true;
            }
        }
    }

});