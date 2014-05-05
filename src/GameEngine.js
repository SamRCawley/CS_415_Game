var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

var gameEngine = {
    background:null,
    world:null,
    contactListener:null,
    Entities:null,
    player:null,
    entityTypes:['EnemyA','SquirrelEnemy','wall'],
    timeout:null,
    entitySpawner:null,
    pointerLocked:false,
    vy:0,
    worldPaused:false,
    worldStopped:true,
    gameOver:true,
    runTime:0,
    setup:function(){
        document.getElementById("gameCanvas").addEventListener('click', gameEngine.onCanvasClick, false);
        document.addEventListener('pointerlockchange', gameEngine.pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', gameEngine.pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', gameEngine.pointerLockChange, false);
        assets.loadAssets();
        start.startScreen();
    },
    pointerLockChange:function() {
      if (document.mozPointerLockElement === document.getElementById('gameCanvas') ||
          document.webkitPointerLockElement === document.getElementById('gameCanvas')) {
          gameEngine.pointerLocked = true;
        if(gameEngine.worldStopped)
            gameEngine.startWorld();
        else
            gameEngine.unPauseWorld();

      } else {
       gameEngine.pointerLocked = false;
        gameEngine.pauseWorld();
      }
    },
    startWorld:function()
    {
        var self = this;
        document.onkeydown=function(e){
              if  (e.keyCode=='83'){
                   var boss = new window["StanBoss"](c.width*1/2, 20);
                   self.Entities.push(boss);
              }};
        this.vy=0;
        this.runTime=0;
        this.prevUpdate = new Date();
        this.gameOver = false;
        this.worldPaused = false;
        this.worldStopped = false;
        document.getElementById("gameCanvas").addEventListener('mousemove',gameEngine.onMouseMoved,false);
        document.getElementById("gameCanvas").style.cursor = "none";
        this.world = new b2World(new b2Vec2(0, 0), false);
        this.defineWalls();
        var self = this;

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
        gameEngine.update();

    },
    stopWorld:function()
    {
        this.worldStopped=true;
        //window.clearInterval(this.updateLoop);
        window.clearInterval(this.entitySpawner);
        //this.Entities = new Array();
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
    pauseWorld:function()
    {
        this.worldPaused = true;
        if(this.Entities[0].attackBuffTimer != null)
            this.Entities[0].attackBuffTimer.pause();
        if(this.Entities[0].defenseBuffTimer != null)
            this.Entities[0].defenseBuffTimer.pause();
        window.clearInterval(this.entitySpawner);
    },
    unPauseWorld:function()
    {
        if(this.Entities[0].attackBuffTimer != null)
            this.Entities[0].attackBuffTimer.resume();
        if(this.Entities[0].defenseBuffTimer != null)
            this.Entities[0].defenseBuffTimer.resume();
        this.prevUpdate = new Date();
        var self = this;
        this.worldPaused = false;
        this.entitySpawner = setInterval(function(){self.spawnEntities();}, 2000);
        setTimeout(function(){gameEngine.update()}, 1000/80);
    },
    getEntType:function(){
        var shift = this.runTime/40<2?this.runTime/40:2;
        var entRand = Math.random()*2-1+Math.random()*2-1+Math.random()*2-1;
        var entType = Math.floor(entRand*this.entityTypes.length+shift-2);
        entType = entType>0? entType:0;
        entType = entType<this.entityTypes.length?entType:this.entityTypes.length-1;
        return entType;
    },
    spawnEntities:function(){
    var c=document.getElementById("gameCanvas");
    var timeMulti = 70*Math.pow(this.runTime, 1/4)-1;

    if(Math.floor(Math.random()*timeMulti) > 90){  //MIDDLE SPAWN POINT
        var newEnt = new window[this.entityTypes[this.getEntType()]](c.width/2,20);
        this.Entities.push(newEnt);
        }
       if(Math.floor(Math.random()*timeMulti) > 90)  //LEFT SPAWN POINT
       {
           var newEnt = new window[this.entityTypes[this.getEntType()]](20,20);
           this.Entities.push(newEnt);
       }
       if(Math.floor(Math.random()*timeMulti) > 90)  //RIGHT SPAWN POINT
       {
           var newEnt = new window[this.entityTypes[this.getEntType()]](900,20);
           this.Entities.push(newEnt);
       }
       if(Math.floor(Math.random()*timeMulti) > 90)//LEFT-MIDDLE SPAWN POINT
          {
              var newEnt = new window[this.entityTypes[this.getEntType()]](c.width/4,20);
              this.Entities.push(newEnt);
          }
       if(Math.floor(Math.random()*timeMulti) > 90) //RIGHT-MIDDLE SPAWN POINT
         {
             var newEnt = new window[this.entityTypes[this.getEntType()]](c.width*3/4,20);
             this.Entities.push(newEnt);
         }
       /*if(Math.floor(Math.random()*100 > 30))
         {
            var newWall = new window["wall"](c.width*1/2, 20);
            newWall.moveSprite(0, 200);
            this.Entities.push(newWall);
         }*/
       if(Math.floor(Math.random()*500+1 > 500))
         {
            var boss = new window["StanBoss"](c.width*1/2, 20);
            this.Entities.push(boss);
         }
    },
    prevUpdate:new Date(),
    update:function(){
        var dt = (new Date()-this.prevUpdate)/1000.0;
        this.runTime += dt;
        this.prevUpdate = new Date();
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
                this.Entities[i].onRemove();
                this.world.DestroyBody(this.Entities[i]._body);
                this.Entities.splice(i, 1);
            }
            else
                this.Entities[i].update();
        }
        //gameEngine.Entities[0].moveSprite(0, 0);
        this.Entities[0].displayHealth();
        this.Entities[0].displayScore();
        if(this.gameOver)
        {
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
        if(!(this.worldPaused || this.worldStopped))
            setTimeout(function(){gameEngine.update()}, 1000/80);  //delay as if 80 frames per second
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
        //gameEngine.startWorld();
        }
     else if(havePointerLock && gameEngine.pointerLocked){
        document.exitPointerLock = document.exitPointerLock ||
        			   document.mozExitPointerLock ||
        			   document.webkitExitPointerLock;
        document.exitPointerLock();
        // Ask the browser to lock the pointer
        gameEngine.pointerLocked = false;
        //gameEngine.stopWorld();
        }

    },
    moveBackground:function()
    {
        var progressPercent = 1<this.runTime/120?1:this.runTime/120;
        var progressToRainbow = 0;
        if(progressPercent == 1)
            progressToRainbow = 1<(this.runTime-120)/120?1:(this.runTime-120)/120;
        var dProgress = progressPercent*2<1?progressPercent*2:1;
        var c = document.getElementById("gameCanvas");
        var ctx = c.getContext('2d');
        var gradient=ctx.createLinearGradient(0,0,0,c.height);
        var firstColor = "rgb("+parseInt(50+145*dProgress)+",50,"+parseInt(255-205*progressPercent)+")";
        gradient.addColorStop("0", firstColor);
        var secondColor = "rgb("+parseInt(50+145*dProgress)+",150,"+parseInt(255-105*dProgress)+")";
        gradient.addColorStop("0.5",secondColor);
        var thirdColor = "rgb(255,"+parseInt(255-205*progressPercent)+","+parseInt(255-205*progressPercent)+")";
        gradient.addColorStop("1.0",thirdColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,c.width, c.height);
        ctx.fillStyle = "rgba(0,0,0,"+progressPercent+")";
        ctx.fillRect(0,0,c.width, c.height);
        ctx.globalAlpha = 0>(progressPercent-0.5)*2?0:(progressPercent-0.5)*2;
        ctx.drawImage(assets.img_stars,0,this.vy, assets.img_stars.width, assets.img_stars.height);
        ctx.drawImage(assets.img_stars,0,this.vy-assets.img_stars.height, assets.img_stars.width, assets.img_stars.height);
        ctx.globalAlpha = -2*Math.abs(progressPercent-0.5)+1;
        ctx.drawImage(assets.img_clouds2,0,this.vy, assets.img_clouds2.width, assets.img_clouds2.height);
        ctx.drawImage(assets.img_clouds2,0,this.vy-assets.img_clouds2.height, assets.img_clouds2.width, assets.img_clouds2.height);
        ctx.globalAlpha = 0>(1-progressPercent*2)?0:(1-progressPercent*2);
        ctx.drawImage(assets.img_clouds,0,this.vy, assets.img_clouds.width, assets.img_clouds.height);
        ctx.drawImage(assets.img_clouds,0,this.vy-assets.img_clouds.height, assets.img_clouds.width, assets.img_clouds.height);
        ctx.globalAlpha = progressToRainbow;
        ctx.drawImage(assets.img_rainbow,0,this.vy, assets.img_rainbow.width, assets.img_rainbow.height);
        ctx.drawImage(assets.img_rainbow,0,this.vy-assets.img_rainbow.height, assets.img_rainbow.width, assets.img_rainbow.height);
        ctx.globalAlpha = 1;
        /*var bg1;
        if(this.Entities[0].score > 900 && this.Entities[0].score < 2000)
            bg1 = assets.img_background2;
        else if(this.Entities[0].score > 1900 && this.Entities[0].score < 3000)
            bg1 = assets.img_background3;
        else if(this.Entities[0].score > 2900)
            bg1 = assets.img_background4;
        else
            bg1 = assets.img_background1;


        */
        if(Math.abs(this.vy) > assets.img_stars.height)
            this.vy = 0;
        this.vy+=2;
    }
};
