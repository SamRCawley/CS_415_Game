var s_Player = './res/Normal/NekoSprite.png';
var s_EnemyA = './res/Normal/birdenemy.png';
var s_Projectile = './res/Normal/redLaser.png';
var s_PlayerProjectile = './res/Normal/greenLaser.png';
var s_background1 = './res/Normal/skybackground.png';
var s_background2 = './res/Normal/skybackground2.png';
var s_background3 = './res/Normal/skybackground3.png';
var s_background4 = './res/Normal/skybackground4.png';
var s_plane = './res/Normal/Plane.png';
var s_ScatterShot = './res/Normal/scattershot.png';
var s_ScatterMod = './res/Normal/scattershotmod.png';
var s_HealthMod = './res/Normal/healthmod.png';
var s_doubleLaserMod = './res/Normal/doublelasermod.png';
var s_shieldMod = './res/Normal/shieldmod.png';
var s_shieldSprite = "./res/Normal/NekoShieldSprite.png";


var assets = {
    img_Player:new Image(),
    img_EnemyA:new Image(),
    img_Projectile:new Image(),
    img_PlayerProjectile:new Image(),
    img_background1:new Image(),
    img_background2:new Image(),
    img_background3:new Image(),
    img_background4:new Image(),
    img_plane:new Image(),
    img_scatterShot:new Image(),
    img_scatterMod:new Image(),
    img_healthmod:new Image(),
    img_doubleLaserMod:new Image(),
    img_shieldMod:new Image(),
    img_shieldSprite:new Image(),

    loadAssets:function()
    {
        this.img_Player.src=(s_Player);
        this.img_EnemyA.src=(s_EnemyA);
        this.img_Projectile.src=(s_Projectile);
        this.img_PlayerProjectile.src=(s_PlayerProjectile);
        this.img_background1.src=(s_background1);
        this.img_background2.src=(s_background2);
        this.img_background3.src=(s_background3);
        this.img_background4.src=(s_background4);
        this.img_plane.src=(s_plane);
        this.img_scatterShot.src=(s_ScatterMod);
        this.img_scatterMod.src=(s_ScatterMod);
        this.img_healthmod.src=(s_HealthMod);
        this.img_doubleLaserMod.src=(s_doubleLaserMod);
        this.img_shieldMod.src=(s_shieldMod);
        this.img_shieldSprite.src=(s_shieldSprite);

    }
};