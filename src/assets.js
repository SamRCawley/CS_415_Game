var s_Player = './res/Normal/nekopewpew3.jpg';
var s_EnemyA = './res/Normal/birdenemy.png';
var s_Projectile = './res/Normal/redLaser.png';
var s_PlayerProjectile = './res/Normal/greenLaser.png';

var assets = {
    img_Player:new Image(),
    img_EnemyA:new Image(),
    img_Projectile:new Image(),
    img_PlayerProjectile:new Image(),
    loadAssets:function()
    {
        this.img_Player.src=(s_Player);
        this.img_EnemyA.src=(s_EnemyA);
        this.img_Projectile.src=(s_Projectile);
        this.img_PlayerProjectile.src=(s_PlayerProjectile);
    }
};