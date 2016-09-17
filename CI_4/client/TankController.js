class TankController {
  constructor(id, x, y, group, bulletGroup){
    this.sprite = group.create(x, y, 'tankDown');
    this.sprite.id = id;
    TankOnline.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5,0.5);
    this.allowShooting = true;
    this.bulletGroup = bulletGroup;
  }

  move(direction){
    if(direction.y > 0){
      this.sprite.body.velocity.y = TankOnline.config.TANK_SPEED;
      this.sprite.loadTexture('tankDown');
    }
    else if(direction.y < 0){
      this.sprite.body.velocity.y = -TankOnline.config.TANK_SPEED;
      this.sprite.loadTexture('tankUp');
    }
    else{
      this.sprite.body.velocity.y = 0;
    }

    if(direction.x > 0){
      this.sprite.body.velocity.x = TankOnline.config.TANK_SPEED;
      this.sprite.loadTexture('tankRight');
    }
    else if(direction.x < 0){
      this.sprite.body.velocity.x = -TankOnline.config.TANK_SPEED;
      this.sprite.loadTexture('tankLeft');
    }
    else{
      this.sprite.body.velocity.x = 0;
    }
  }

  fire(){
    if(this.allowShooting){
      var texture;
      var speed;
      switch(this.sprite.key){
        case "tankRight":
          texture = 'bulletRight';
          speed = new Phaser.Point(TankOnline.config.BULLET_SPEED, 0);
          break;
        case "tankLeft":
          texture = 'bulletLeft';
          speed = new Phaser.Point(-TankOnline.config.BULLET_SPEED, 0);
          break;
        case "tankUp":
          texture = 'bulletUp';
          speed = new Phaser.Point(0, -TankOnline.config.BULLET_SPEED);
          break;
        case "tankDown":
        default:
          texture = 'bulletDown';
          speed = new Phaser.Point(0, TankOnline.config.BULLET_SPEED);
          break;
      }

      var newBullet = this.bulletGroup.create(this.sprite.position.x, this.sprite.position.y, texture);
      TankOnline.game.physics.arcade.enable(newBullet);
      newBullet.tankId = this.sprite.id;
      newBullet.anchor.set(0.5,0.5);
      newBullet.body.velocity = speed;

      this.allowShooting = false;
      setTimeout(function(){
        this.allowShooting = true;
      }.bind(this), 300);
    }
  }
}
