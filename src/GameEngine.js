var gameEngine = {
    updateLoop:null,
    world:null,
    contactListener:null,
    Entities:null,
    player:null,
    entityTypes:['EnemyA'],
    timeout:null,
    entitySpawner:null,
    startWorld:function()
    {
        document.getElementById("gameCanvas").addEventListener('mousemove',gameEngine.onMouseMoved,false);
        document.getElementById("gameCanvas").style.cursor = "none";
        this.world = new b2World(new b2Vec2(0, 0), false);
        this.defineWalls();
        var self = this;
        this.updateLoop = setInterval(function(){self.update(1.0/60.0);}, 1000/60); /*updates ~60 times per second*/
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
        //var enemy = new EnemyA();
        //this.Entities.push(enemy);
        this.entitySpawner = setInterval(function(){self.spawnEntities();}, 2000);
         /*add additional world setup stuff*/
         /*this.stopWorld();*/
    },
    stopWorld:function()
    {
        window.clearInterval(this.updateLoop);
        window.clearInterval(this.entitySpawner)
    },
    spawnEntities:function(){
    if(parseInt(Math.random()*10%2) == 0){
        var newEnt = new window[this.entityTypes[0]]();
        newEnt.setPosition(500, 20);
        this.Entities.push(newEnt);
        }
       if(parseInt(Math.random()*10%3) == 0)
       {
           var newEnt = new window[this.entityTypes[0]]();
           newEnt.setPosition(20, 20);
           this.Entities.push(newEnt);
       }
       if(parseInt(Math.random()*10%3) == 0)
       {
           var newEnt = new window[this.entityTypes[0]]();
           newEnt.setPosition(900, 20);
           this.Entities.push(newEnt);
       }
    },
    update:function(dt){
      this.world.Step(dt, 10, 10);
      this.world.ClearForces();
        var nextBody = this.world.GetBodyList();
        while(nextBody)
        {
            var currentBody = nextBody;
            nextBody = currentBody.m_next;
            if(typeof currentBody.GetUserData() !== 'undefined' && currentBody.GetUserData() !== null)
            {
                var ent = currentBody.GetUserData();
                ent.setPosition(currentBody.GetPosition().x*b2Unit, currentBody.GetPosition().y*b2Unit);
            }
        }
        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.clearRect(0,0, c.width, c.height);
        for(var i=0; i<this.Entities.length; i++)
        {
            this.Entities[i].update();
        }
    },
    timeout:null,
    prevMouseX:null,
    prevMouseY:null,
    onMouseMoved:function(event)
    {
       clearTimeout(gameEngine.timeout);
       gameEngine.timeout = setTimeout(gameEngine.onMouseStop, 50);
        //25 offsets the image so that the mouse is in the center of it
        var x = event.layerX;
        var y = event.layerY;
        if(this.prevMouseX && this.prevMouseY)
        {
            var sensitivity = b2Unit*.0001; //higher is slower
            gameEngine.Entities[0].moveSprite((x-this.prevMouseX)/sensitivity, (y-this.prevMouseY)/sensitivity);
        }
        this.prevMouseX = x;
        this.prevMouseY = y;
    },
    onMouseStop:function()
    {
        gameEngine.Entities[0].moveSprite(0, 0);
    },
    defineWalls:function()
    {
        var unitHalfCanWidth = document.getElementById("gameCanvas").width/2/b2Unit;
        var unitHalfCanHeight = document.getElementById("gameCanvas").height/2/b2Unit;
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        //Center position on canvas
        bodyDef.position.x = unitHalfCanWidth; //Note: Tutorials indicate position is based on center
        bodyDef.position.y = unitHalfCanHeight; //Note: Using 10 pixels per box2d unit
        var body = gameEngine.world.CreateBody(bodyDef);
        var topWall = new b2FixtureDef();
        topWall.density = 1.0;
        topWall.friction = 0.3;
        topWall.restitution = 0.0;
        topWall.shape = new b2PolygonShape();
        // half width, half height.
        topWall.shape.SetAsEdge(new b2Vec2(-unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,-unitHalfCanHeight) );
        body.CreateFixture(topWall);
        var bottomWall = new b2FixtureDef();
        bottomWall.density = 1.0;
        bottomWall.friction = 0.3;
        bottomWall.restitution = 0.0;
        bottomWall.shape = new b2PolygonShape();
        // half width, half height.
        bottomWall.shape.SetAsEdge(new  b2Vec2(-unitHalfCanWidth,unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(bottomWall);
        var leftWall = new b2FixtureDef();
        leftWall.density = 1.0;
        leftWall.friction = 0.3;
        leftWall.restitution = 0.0;
        leftWall.shape = new b2PolygonShape();
        // half width, half height.
        leftWall.shape.SetAsEdge( new b2Vec2(-unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(-unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(leftWall);
        var rightWall = new b2FixtureDef();
        rightWall.density = 1.0;
        rightWall.friction = 0.3;
        rightWall.restitution = 0.0;
        rightWall.shape = new b2PolygonShape();
        // half width, half height.
        rightWall.shape.SetAsEdge( new b2Vec2(unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(rightWall);
    }
};
