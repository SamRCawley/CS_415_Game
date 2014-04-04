var gameEngine = {
    var updateLoop,
    var world,
    var contactListener,
    var Entities,
    startWorld:function()
    {
        updateLoop = setInterval(update(17), 17); /*updates ~60 times per second*/
        world = new b2World(new b2Vec2(0, 0), false);
        contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact) {
             };
         contactListener.EndContact = function(contact) {
             };
             listener.PostSolve = function(contact, impulse) {
             };
             listener.PreSolve = function(contact, oldManifold) {
             };
             this.world.SetContactListener(listener);
         var Entities = new Array(); /*an array of the entities may or may not be useful*/
         /*add additional world setup stuff*/
    },
    stopWorld:function()
    {
        clearInterval(updateLoop)
    },
    spawnEntity:function(EntityType){
        /*Do some stuff to create entity and register with box2d or have entity do it itself*/
    },
    update:function(dt){
        world.Step(dt, 10, 10);
        world.ClearForces();
        var nextBody = world.GetBodyList();
        while(nextBody)
        {
            var currentBody = nextBody;
            nextBody = currentBody.m_next;
            if(typeof currentBody.GetUserData() !== 'undefined' && currentBody.GetUserData() !== null)
            {
                /*Update entity position.  UserData should be this object of entity.*/
            }
        }

    }
};
