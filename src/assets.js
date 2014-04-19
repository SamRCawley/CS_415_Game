var s_Player = './res/Normal/NekoSprite.png';
var s_EnemyA = './res/Normal/birdenemy.png';
var s_Projectile = './res/Normal/redLaser.png';
var s_PlayerProjectile = './res/Normal/greenLaser.png';
var s_background1 = './res/Normal/skybackground.png';
var s_background2 = './res/Normal/skybackground2.png';
var s_background3 = './res/Normal/skybackground3.png';
var s_background4 = './res/Normal/skybackground4.png';

var assets = {
    img_Player:new Image(),
    img_EnemyA:new Image(),
    img_Projectile:new Image(),
    img_PlayerProjectile:new Image(),
    img_background1:new Image(),
    img_background2:new Image(),
    img_background3:new Image(),
    img_background4:new Image(),
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
    }
};