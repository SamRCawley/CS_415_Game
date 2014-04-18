var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2AABB = Box2D.Collision.b2AABB
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2Fixture = Box2D.Dynamics.b2Fixture
    , b2World = Box2D.Dynamics.b2World
    , b2MassData = Box2D.Collision.Shapes.b2MassData
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    , b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
    , b2Shape = Box2D.Collision.Shapes.b2Shape
    , b2Joint = Box2D.Dynamics.Joints.b2Joint
    , b2Settings = Box2D.Common.b2Settings;
 var b2Unit = 30;

 var categories = {
    projectile:0x0001,
    bird:0x0002,
    player:0x0004,
    wall:0x0008,
    playerBarrier:0x000F
 }

var Entity = Class.create({
    health:1,
    _currX:0,
    _currY:0,
    scale:0.1,
    pSprite:null,
    _body:null,
    _removeTrigger:false,
    initialize: function(x, y) {
        this.setPosition(x,y);
    },
    setPosition:function(x,y){
        this._currX = x;
        this._currY = y;
    },
    moveSprite:function(x,y)
    {
        if(this._body)
            this._body.SetLinearVelocity(new b2Vec2(x/b2Unit,y/b2Unit));
    },

    getScale:function()
    {
        return this.scale;
    },

    setNewScale:function(nScale)
    {
        this.scale = nScale;
    },

    getSprite:function(ctx)
    {
            return this.pSprite;
    },

    getHealth:function()
    {
        return this.health;
    },

    getX:function()
    {
        return this._currX;
    },

    getY:function()
    {
        return this._currY;
    },

    update:function()
    {
        this.redraw();
    },

    redraw:function(){
        var ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.drawImage(this.getSprite(),this._currX - this.pSprite.width/2, this._currY - this.pSprite.height/2, this.pSprite.width, this.pSprite.height);
    },

    onCollide:function(ent)
    {
        if(ent instanceof Player)
        {
            ent.takeDamage(100)
            this._removeTrigger = true;
            if(ent.health <= 0)
            {
                gameEngine.stopWorld();
                var c=document.getElementById("gameCanvas");
                var ctx=c.getContext("2d");
                //var measurement = ctx.measureText(text);
                ctx.textBaseline="middle";
                ctx.textAlign="center";
                var y = 300
                var gradient=ctx.createLinearGradient(0,y-40,0,y+40);
                gradient.addColorStop("0","blue");
                gradient.addColorStop("0.5","lightskyblue");
                gradient.addColorStop("1.0","white");
                ctx.clearRect(0,0, c.width, c.height);
                var ctx = document.getElementById("gameCanvas").getContext("2d");
                ctx.font="50pt Georgia";
                ctx.fillStyle = gradient;
                ctx.fillText("Game Over!",c.width/2,y);
            }
        }
            ent.takeDamage(100);
    }

});