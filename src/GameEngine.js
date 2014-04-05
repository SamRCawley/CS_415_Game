var gameEngine = {
    updateLoop:{},
    world:{},
    contactListener:{},
    Entities:{},
    player:null,
    startWorld:function()
    {
        var	b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2World = Box2D.Dynamics.b2World,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
        this.world = new b2World(new b2Vec2(0, 0), false);
        this.updateLoop = window.setInterval(function(){gameEngine.update(1000);}, 1000); /*updates ~60 times per second*/
        this.contactListener = new Box2D.Dynamics.b2ContactListener;
        this.contactListener.BeginContact = function(contact) {
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
        var imageObj = new Image();
        imageObj.onload = function() {
          ctx.drawImage(imageObj, 250, 250);
        };
        imageObj.src = './res/Normal/CloseSelected.png';

        this.Entities.push(imageObj);
         /*add additional world setup stuff*/
         /*this.stopWorld();*/

         player = new Player();
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
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.clearRect(0,0, c.width, c.height);
        var x = (Math.random()*800)%800;
        var y = (Math.random()*600)%600;
        ctx.drawImage(this.Entities[0], x, y);
        player.moveSprite(x,y,ctx);
        //This is just a test to get an image on the screen


    }
};
