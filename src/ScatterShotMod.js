var ScatterShotMod = Class.create(Entity, {
    health:1,
    _currX:0,
    _currY:0,
    scale:0.2,
    pSprite:null,
    initialize: function($super, x, y) {
            $super(x,y);
            this.pSprite= assets.img_scatterShotMod;
            var self = this;
            self.pSprite.width = (self.pSprite.naturalWidth * self.scale);
            self.pSprite.height = (self.pSprite.naturalHeight * self.scale);
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_kinematicBody;
            bodyDef.position.x = self._currX/b2Unit; //Note: Tutorials indicate position is based on center
            bodyDef.position.y = self._currY/b2Unit; //Note: Using 10 pixels per box2d unit
            bodyDef.fixedRotation = true;
            bodyDef.userData = self;
            var fixDef = new b2FixtureDef();
            fixDef.density = 1.0;
            fixDef.friction = 0.3;
            fixDef.restitution = 0.8;
            fixDef.shape = new b2PolygonShape();
            fixDef.filter.categoryBits = categories.mods;
            fixDef.filter.maskBits = ~(categories.wall|categories.projectile|categories.plane|categories.bird);
            // half width, half height.
            fixDef.shape.SetAsBox((self.pSprite.width) / 2 /b2Unit, (self.pSprite.height) / 2 /b2Unit);
            self._body = gameEngine.world.CreateBody(bodyDef)
            self._body.CreateFixture(fixDef);
            var startTime = 0;


            this.moveSprite(0,250);
    },
    update:function($super){
        $super();
        if(this._body)
        {
            if(this._currX > document.getElementById("gameCanvas").width + 50 || this._currY > document.getElementById("gameCanvas").height + 50 || this._currX < -50)
                this._removeTrigger = true;
            var vel = this._body.GetLinearVelocity();
        }
        if(this.runtime ==5000)//60000
        {
            ent.playerProjectile = ["PlayerProjectile"];
            this._removeTrigger = true;
        }
    },
    onCollide:function(ent){
        this._removeTrigger = true;
        if(ent instanceof Player)
        {
            if(ent.attackBuffTimer == null)
                ent.attackBuffTimer = new Timer(function(){
                    ent.attackBuffTimer = null;
                    ent.playerProjectile = ["PlayerProjectile"];}, 10000);
            else
            {
                ent.attackBuffTimer.clear();
                ent.attackBuffTimer = new Timer(function(){
                    ent.attackBuffTimer = null;
                    ent.playerProjectile = ["PlayerProjectile"];}, 10000);
            }
            ent.fireRate = 500;
            ent.playerProjectile = ["ScatterLeft","ScatterCenter","ScatterRight"];
            this._removeTrigger = true;
        }
    }

});