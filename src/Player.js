var Player = Class.create(Entity, {
    health:100,
    score: 0,
    _currX:400,
    _currY:500,
    scale:0.1,
    pSprite:null,
    fireTimer:null,
    mouseJoint:null,
    playerProjectile:["PlayerProjectile","ScatterLeft","ScatterCenter","ScatterRight"],
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
        this.mouseDef = new b2MouseJointDef();
        this.mouseDef.bodyA = gameEngine.world.GetGroundBody();
        this.mouseDef.bodyB = this._body;
        this.mouseDef.target = this._body.GetPosition();
        this.mouseDef.collideConnected = true;
        this.mouseDef.maxForce = 1000 * this._body.GetMass();
        this.mouseDef.dampingRatio = 0.9;
        this.mouseJoint = gameEngine.world.CreateJoint(this.mouseDef);
    },
    update:function($super){
       $super();
       var currentTime = new Date();
       if(this.fireTimer == null || currentTime - this.fireTimer >= 500)  //1 shot every 0.5 seconds
       {
         this.fireTimer = currentTime
         var proj = new window[this.playerProjectile[0]](this._currX, this._currY-this.pSprite.height/2-assets.img_PlayerProjectile.height/2); //have to modified on projectile side to adjust up for projectile sprite
         proj.moveSprite(0,-500);
         gameEngine.Entities.push(proj);
       }
     },

     takeDamage:function(damage)
     {
        if((this.health - damage) < 0 )
            this.health = 0;
        else
            this.health-=damage;
     },

     increaseScore:function(points)
     {
        this.score+=points;
     },

     displayHealth:function()
     {
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.textBaseline="bottom";
        ctx.textAlign="right";

        //ctx.clearRect(0,0, 400, 400);
        ctx.font="50pt Georgia";
        if(this.health < 30)
            ctx.fillStyle = 'red';
        else
            ctx.fillStyle = 'green';
        var measurement = ctx.measureText("" + this.health + "/100");
        ctx.fillText("" + this.health + "/100",c.width,c.height);
     },

     displayScore:function()
     {
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.textBaseline="bottom";
        ctx.textAlign="left";
        //var measurement = ctx.measureText(text);
        //ctx.clearRect(0,0, 400, 400);
        ctx.font="50pt Georgia";
        var measurement = ctx.measureText("" + this.score);
        ctx.fillText("" + this.score,0,c.height);
     },

     onCollide:function($super, ent){
             $super(ent);
             if(ent instanceof ScatterShotMod)
             {
                 ent._removeTrigger = true;
                 var proj = new window[this.playerProjectile[1]](this._currX, this._currY-this.pSprite.height/2-assets.img_scatterProjectile.height/2); //have to modified on projectile side to adjust up for projectile sprite
                 proj.moveSprite(0,-500);
                 gameEngine.Entities.push(proj);
                 var proj = new window[this.playerProjectile[2]](this._currX, this._currY-this.pSprite.height/2-assets.img_scatterProjectile.height/2); //have to modified on projectile side to adjust up for projectile sprite
                 proj.moveSprite(0,-500);
                 gameEngine.Entities.push(proj);
                 var proj = new window[this.playerProjectile[3]](this._currX, this._currY-this.pSprite.height/2-assets.img_scatterProjectile.height/2); //have to modified on projectile side to adjust up for projectile sprite
                 proj.moveSprite(0,-500);
                 gameEngine.Entities.push(proj);
             }
         }

});