var gameEngine = {
    updateLoop:{},
    world:{},
    contactListener:{},
    Entities:{},
    player:null,
    startWorld:function()
    {
        document.getElementById("gameCanvas").addEventListener('mousemove',gameEngine.onMouseMoved,false);
        document.getElementById("gameCanvas").style.cursor = "none";
//        var	b2Vec2 = Box2D.Common.Math.b2Vec2,
//        b2BodyDef = Box2D.Dynamics.b2BodyDef,
//        b2Body = Box2D.Dynamics.b2Body,
//        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
//        b2World = Box2D.Dynamics.b2World,
//        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
//        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
        this.world = new b2World(new b2Vec2(0, 0), false);
        var self = this;
        this.updateLoop = setInterval(function(){self.update(17);}, 17); /*updates ~60 times per second*/
        this.contactListener = new Box2D.Dynamics.b2ContactListener;
        this.contactListener.BeginContact = function(contact) {
            var entA = contact.GetFixtureA().GetBody().GetUserData();
            var entB = contact.GetFixtureB().GetBody().GetUserData();
            if(typeof entB !== 'undefined' && entB !== null && typeof entA !== 'undefined' && entA !== null)
            {
                entA.onCollide(entB);
                entB.onCollide(entA);
            }

             };
        this.contactListener.EndContact = function(contact) {
             };
        this.contactListener.PostSolve = function(contact, impulse) {
             };
        this.contactListener.PreSolve = function(contact, oldManifold) {
             };
        this.world.SetContactListener(this.contactListener);
        this.Entities = new Array(); /*an array of the entities may or may not be useful*/
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        var player = new Player();
        this.Entities.push(player);
        var enemy = new EnemyA();
        this.Entities.push(enemy);
         /*add additional world setup stuff*/
         /*this.stopWorld();*/
    },
    stopWorld:function()
    {
        window.clearInterval(updateLoop);
    },
    spawnEntity:function(EntityType){
        /*Do some stuff to create entity and register with box2d or have entity do it itself*/
    },
    update:function(dt){
/*      this.world.Step(dt, 10, 10);
        var nextBody = world.GetBodyList();
        while(nextBody)
        {
            var currentBody = nextBody;
            nextBody = currentBody.m_next;
            if(typeof currentBody.GetUserData() !== 'undefined' && currentBody.GetUserData() !== null)
            {
                *//*Update entity position.  UserData should be this object of entity.*//*
            }
        }*/
//        var c=document.getElementById("gameCanvas");
//        var ctx=c.getContext("2d");
//        ctx.clearRect(0,0, c.width, c.height);
//        this.Entities[0].moveSprite(50,50,ctx);
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.clearRect(0,0, c.width, c.height);
        for(var i=0; i<this.Entities.length; i++)
        {
            this.Entities[i].update();
        }
    },
    onMouseMoved:function(event)
    {
        //25 offsets the image so that the mouse is in the center of it
        gameEngine.Entities[0].moveSprite((event.layerX - 25),(event.layerY - 25));
    }
};
