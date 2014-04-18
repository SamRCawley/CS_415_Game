var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

var gameEngine = {
    updateLoop:null,
    background:null,
    world:null,
    contactListener:null,
    Entities:null,
    player:null,
    entityTypes:['EnemyA','Projectile'], //Added projectile
    timeout:null,
    entitySpawner:null,
    pointerLocked:false,
    vy:0,
    setup:function(){
        document.getElementById("gameCanvas").addEventListener('click', gameEngine.onCanvasClick, false);
        assets.loadAssets();
        start.startScreen();
    },
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
        var player = new Player(400,500);
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
        window.clearInterval(this.entitySpawner);
        this.Entities = new Array();
        document.getElementById("gameCanvas").removeEventListener('mousemove',gameEngine.onMouseMoved,false);
        if(havePointerLock && gameEngine.pointerLocked){
        document.exitPointerLock = document.exitPointerLock ||
                       document.mozExitPointerLock ||
                       document.webkitExitPointerLock;
        document.exitPointerLock();
        // Ask the browser to lock the pointer
        gameEngine.pointerLocked = false;
        }

    },
    spawnEntities:function(){
    var c=document.getElementById("gameCanvas");
    if(parseInt(Math.random()*10%2) == 0){  //MIDDLE SPAWN POINT
        var newEnt = new window[this.entityTypes[0]](c.width/2,20);
        this.Entities.push(newEnt);
        }
       if(Math.floor(Math.random()*10%3) == 0)  //LEFT SPAWN POINT
       {
           var newEnt = new window[this.entityTypes[0]](20,20);
           this.Entities.push(newEnt);
       }
       if(Math.floor(Math.random()*10%3) == 0) //RIGHT SPAWN POINT
       {
           var newEnt = new window[this.entityTypes[0]](900,20);
           this.Entities.push(newEnt);
       }
       if(Math.floor(Math.random()*10%7) == 0) //LEFT-MIDDLE SPAWN POINT
          {
              var newEnt = new window[this.entityTypes[0]](c.width/4,20);
              this.Entities.push(newEnt);
          }
       if(Math.floor(Math.random()*10%7) == 0) //RIGHT-MIDDLE SPAWN POINT
         {
             var newEnt = new window[this.entityTypes[0]](c.width*3/4,20);
             this.Entities.push(newEnt);
         }
    },
    update:function(dt){

        var c=document.getElementById("gameCanvas");
        var ctx=c.getContext("2d");
        ctx.clearRect(0,0, c.width, c.height);
        this.moveBackground();
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
        for(var i=0; i<this.Entities.length; i++)
        {
            if(this.Entities[i]._removeTrigger)
            {
                this.world.DestroyBody(this.Entities[i]._body);
                this.Entities.splice(i, 1);
            }
            else
                this.Entities[i].update();
        }
        //gameEngine.Entities[0].moveSprite(0, 0);
        this.Entities[0].displayHealth();
        this.Entities[0].displayScore();
    },
    onMouseMoved:function(event)
    {
          var x = event.movementX ||
              event.mozMovementX          ||
              event.webkitMovementX       ||
              0;
          var y = event.movementY ||
              event.mozMovementY      ||
              event.webkitMovementY   ||
              0;
        var sensitivity = 15; //higher is faster
        var pBody = gameEngine.Entities[0]._body;
        gameEngine.Entities[0].mouseJoint.SetTarget(new b2Vec2(pBody.GetPosition().x+x/b2Unit*sensitivity, pBody.GetPosition().y+y/b2Unit*sensitivity));  //x and y are small due to mouse movement triggers
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
        topWall.filter.categoryBits = categories.wall;
        // half width, half height.
        topWall.shape.SetAsEdge(new b2Vec2(-unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,-unitHalfCanHeight) );
        body.CreateFixture(topWall);
        var bottomWall = new b2FixtureDef();
        bottomWall.density = 1.0;
        bottomWall.friction = 0.3;
        bottomWall.restitution = 0.0;
        bottomWall.shape = new b2PolygonShape();
        bottomWall.filter.categoryBits = categories.wall;
        // half width, half height.
        bottomWall.shape.SetAsEdge(new  b2Vec2(-unitHalfCanWidth,unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(bottomWall);
        var leftWall = new b2FixtureDef();
        leftWall.density = 1.0;
        leftWall.friction = 0.3;
        leftWall.restitution = 0.0;
        leftWall.shape = new b2PolygonShape();
        leftWall.filter.categoryBits = categories.wall;
        // half width, half height.
        leftWall.shape.SetAsEdge( new b2Vec2(-unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(-unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(leftWall);
        var rightWall = new b2FixtureDef();
        rightWall.density = 1.0;
        rightWall.friction = 0.3;
        rightWall.restitution = 0.0;
        rightWall.shape = new b2PolygonShape();
        rightWall.filter.categoryBits = categories.wall;
        // half width, half height.
        rightWall.shape.SetAsEdge( new b2Vec2(unitHalfCanWidth,-unitHalfCanHeight), new b2Vec2(unitHalfCanWidth,unitHalfCanHeight) );
        body.CreateFixture(rightWall);
        var playerWall = new b2FixtureDef();
        playerWall.density = 1.0;
        playerWall.friction = 0.3;
        playerWall.restitution = 0.0;
        playerWall.shape = new b2PolygonShape();
        playerWall.filter.categoryBits = categories.wall;
        playerWall.filter.maskbits = categories.player; //Only set to collide with player
        // half width, half height.
        playerWall.shape.SetAsEdge( new b2Vec2(-unitHalfCanWidth, -unitHalfCanHeight/2), new b2Vec2(unitHalfCanWidth,-unitHalfCanHeight/2) ); //current player wall at 75% up canvas (mostly example, I don't think I like it)
        body.CreateFixture(playerWall);

    },
    onCanvasClick:function(){
    if(havePointerLock && !gameEngine.pointerLocked){
        var element =  document.getElementById("gameCanvas");
        element.requestPointerLock = element.requestPointerLock ||
                         element.mozRequestPointerLock ||
                         element.webkitRequestPointerLock;
        // Ask the browser to lock the pointer
        element.requestPointerLock();
        gameEngine.pointerLocked = true;
        gameEngine.startWorld();
        }
     else if(havePointerLock && gameEngine.pointerLocked){
        document.exitPointerLock = document.exitPointerLock ||
        			   document.mozExitPointerLock ||
        			   document.webkitExitPointerLock;
        document.exitPointerLock();
        // Ask the browser to lock the pointer
        gameEngine.pointerLocked = false;
        gameEngine.stopWorld();
        }

    },
    moveBackground:function()
    {
        var bg1;
        if(this.Entities[0].score > 900 && this.Entities[0].score < 2000)
            bg1 = assets.img_background2;
        else if(this.Entities[0].score > 1900 && this.Entities[0].score < 3000)
            bg1 = assets.img_background3;
        else if(this.Entities[0].score > 2900)
            bg1 = assets.img_background4;
        else
            bg1 = assets.img_background1;
        var c = document.getElementById("gameCanvas");
        var ctx = c.getContext('2d');
        ctx.drawImage(bg1,0,this.vy);
        ctx.drawImage(bg1,0,bg1.height-Math.abs(this.vy));
        if(Math.abs(this.vy) > bg1.height)
            this.vy = 0;
        this.vy-=2;

    }
};
