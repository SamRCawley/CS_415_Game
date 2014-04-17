var EnemyA = Class.create(Entity, {
    health:1,
    _currX:0,
    _currY:0,
    scale:0.1,
    enemyProjectile:["Projectile"],
    pSprite:null,
    initialize: function($super, x, y) {
            $super(x,y);
            this.pSprite = assets.img_EnemyA;
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
            fixDef.filter.categoryBits = categories.bird;
            fixDef.filter.maskBits = ~categories.wall;
            // half width, half height.
            fixDef.shape.SetAsBox((self.pSprite.width)*0.8 / 2 /b2Unit, (self.pSprite.height)*0.8 / 2 /b2Unit);
            self._body = gameEngine.world.CreateBody(bodyDef)
            self._body.CreateFixture(fixDef);

            this.moveSprite(Math.floor(Math.random() * 60) % 60,Math.floor(Math.random() * 60) % 60);
    },

    update:function($super){
            $super();
          if(Math.floor(Math.random() * 30) % 30 == 0 && this._body)  //1 in 30 chance * 60 frames per second = 2 per second
          {
          var proj = new window[this.enemyProjectile[0]](this._currX, this._currY+this.pSprite.height/2+assets.img_Projectile.height/2);
          proj.moveSprite(0,500);
          gameEngine.Entities.push(proj);
          }
    }
});