var StanBoss = Class.create(Entity, {
    health:200,
    _currX:0,
    _currY:0,
    scale:0.1,
    enemyProjectile:["EnemyScatter"],
    pSprite:null,
    initialize: function($super, x, y) {
            $super(x,y+30);
            this.pSprite = assets.img_stanBoss;
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
            fixDef.density = 1000.0;
            fixDef.friction = 0.3;
            fixDef.restitution = 0.8;
            fixDef.shape = new b2PolygonShape();
            fixDef.filter.categoryBits = categories.bird;
            fixDef.filter.maskBits = ~(categories.wall|categories.plane);
            // half width, half height.
            fixDef.shape.SetAsBox((self.pSprite.width)*0.8 / 2 /b2Unit, (self.pSprite.height)*0.8 / 2 /b2Unit);
            self._body = gameEngine.world.CreateBody(bodyDef)
            self._body.CreateFixture(fixDef);

            this.moveSprite(Math.random()*30-15, Math.random()*10+20);

//            this.SetLinearVelocity(b2Vec2((document.getElementById("gameCanvas").width/2/b2Unit - this._currX)/SPEED_RATIO,(size.height - document.getElementById("gameCanvas").height/2/b2Unit - this._currY)/SPEED_RATIO));
    },

    update:function($super){
            $super();
          if(Math.floor(Math.random() * 100+1) > 70 && this._body)  //1 in 30 chance * 60 frames per second = 2 per second
          {
              for(var i= -120; i<=120; i+=20)
              {
                  var proj = new window[this.enemyProjectile[0]](this._currX+i, this._currY+this.pSprite.height/2+assets.img_Projectile.height/2);
                  proj.moveSprite(i*5,200);
                  gameEngine.Entities.push(proj);
              }
          }
          if(this._currY == document.getElementById("gameCanvas").height/2/b2Unit)
          {
            this.moveSprite(0,0);
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
            },

     takeDamage:function(damage)
     {
        if((this.health - damage) < 0 )
            this.health = 0;
        else
            this.health-=damage;
     },

    onRemove:function($super){
        $super();
    }
});