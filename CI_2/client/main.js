var TankOnline = {
      config: {
        TANK_SPEED: 350,
        BULLET_SPEED: 700
      }


};


window.onload = function (){
    TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    "",
                                    { preload: preload,
                                    create: create,
                                    update: update
                                    }
                                  );

}

  var preload = function(){

    TankOnline.game.load.image('tankDown','./images/tank_player1_down_c0_t1_s1.png');
    TankOnline.game.load.image('tankUp','./images/tank_player1_up_c0_t1_s1.png');
    TankOnline.game.load.image('tankLeft','./images/tank_player1_left_c0_t1_s1.png');
    TankOnline.game.load.image('tankRight','./images/tank_player1_right_c0_t1_s1.png');

    TankOnline.game.load.image('bulletUp','./images/bullet_up.png');
    TankOnline.game.load.image('bulletDown','./images/bullet_down.png');
    TankOnline.game.load.image('bulletLeft','./images/bullet_left.png');
    TankOnline.game.load.image('bulletRight','./images/bullet_right.png');
}

  var create = function() {

    TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
    TankOnline.keyboard = TankOnline.game.input.keyboard;

    TankOnline.player1 = TankOnline.game.add.sprite(500, 500, 'tankUp');
    TankOnline.player2 = TankOnline.game.add.sprite(200, 200, 'tankDown');
    TankOnline.game.physics.arcade.enable(TankOnline.player1);
    TankOnline.game.physics.arcade.enable(TankOnline.player2);
    TankOnline.player1.anchor.set(0.5, 0.5);
    TankOnline.player2.anchor.set(0.5, 0.5);
}

    var direction1 = Phaser.Point(0, 0);
    var direction2 = Phaser.Point(0, 0);
    var isFire1 = false;
    var isFire2 = false;
  var update = function() {

// Player1 move
    if(TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)){
      TankOnline.player1.body.velocity.y = TankOnline.config.TANK_SPEED;
      TankOnline.player1.loadTexture('tankDown');
      direction1 = new Phaser.Point(0,1);

    } else if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)){
      TankOnline.player1.body.velocity.y = - TankOnline.config.TANK_SPEED;
      TankOnline.player1.loadTexture('tankUp');
      direction1 = new Phaser.Point(0,-1);

    }
    else{
      TankOnline.player1.body.velocity.y = 0;
    }

    if(TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)){
      TankOnline.player1.body.velocity.x = TankOnline.config.TANK_SPEED;
      TankOnline.player1.loadTexture('tankRight');
      direction1 = new Phaser.Point(1,0);

    } else if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)){
      TankOnline.player1.body.velocity.x = - TankOnline.config.TANK_SPEED;
      TankOnline.player1.loadTexture('tankLeft');
      direction1 = new Phaser.Point(-1,0);

    }
    else{
      TankOnline.player1.body.velocity.x = 0;
    }

// Player2 move

    if(TankOnline.keyboard.isDown(Phaser.KeyCode.S)){
      TankOnline.player2.body.velocity.y = TankOnline.config.TANK_SPEED;
      TankOnline.player2.loadTexture('tankDown');
      direction2 = new Phaser.Point(0,1);
    } else if(TankOnline.keyboard.isDown(Phaser.KeyCode.W)){
      TankOnline.player2.body.velocity.y = - TankOnline.config.TANK_SPEED;
      TankOnline.player2.loadTexture('tankUp');
      direction2 = new Phaser.Point(0,-1);

    }
    else{
      TankOnline.player2.body.velocity.y = 0;
    }
    if(TankOnline.keyboard.isDown(Phaser.KeyCode.D)){
      TankOnline.player2.body.velocity.x = TankOnline.config.TANK_SPEED;
      TankOnline.player2.loadTexture('tankRight');
      direction2 = new Phaser.Point(1,0);

    } else if(TankOnline.keyboard.isDown(Phaser.KeyCode.A)){
      TankOnline.player2.body.velocity.x = - TankOnline.config.TANK_SPEED;
      TankOnline.player2.loadTexture('tankLeft');
      direction2 = new Phaser.Point(-1,0);
    }
    else{
      TankOnline.player2.body.velocity.x = 0;
    }

 // Player1 hit SPACEBAR
    if(TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
      if (isFire1 == false){

    var texture;
    if (direction1.x == 1 && direction1.y == 0) texture = 'bulletRight';
    else if (direction1.x == -1 && direction1.y == 0) texture = 'bulletLeft';
    else if (direction1.x == 0 && direction1.y == -1) texture = 'bulletUp';
    else if (direction1.x == 0 && direction1.y == 1) texture = 'bulletDown';

    var newBullet = TankOnline.game.add.sprite(TankOnline.player1.position.x, TankOnline.player1.position.y, texture);
    TankOnline.game.physics.arcade.enable(newBullet);
    newBullet.body.velocity = new Phaser.Point(direction1.x*TankOnline.config.BULLET_SPEED, direction1.y*TankOnline.config.BULLET_SPEED);
    newBullet.anchor.set(0.5, 0.5);
    isFire1 = true;
    var res = setTimeout(function(){isFire1 = false;}, 200);
      }
  }


// player2 hit SHIFT
    if(TankOnline.keyboard.isDown(Phaser.KeyCode.SHIFT)){
      if(isFire2 == false){
    var texture;
    if (direction2.x == 1 && direction2.y == 0) texture = 'bulletRight';
    else if (direction2.x == -1 && direction2.y == 0) texture = 'bulletLeft';
    else if (direction2.x == 0 && direction2.y == -1) texture = 'bulletUp';
    else if (direction2.x == 0 && direction2.y == 1) texture = 'bulletDown';

    var newBullet = TankOnline.game.add.sprite(TankOnline.player2.position.x, TankOnline.player2.position.y, texture);
    TankOnline.game.physics.arcade.enable(newBullet);
    newBullet.body.velocity = new Phaser.Point(direction2.x*TankOnline.config.BULLET_SPEED, direction2.y*TankOnline.config.BULLET_SPEED);
    newBullet.anchor.set(0.5, 0.5);
    isFire2 = true;
    var res = setTimeout(function(){isFire2 = false;}, 200);
      }
    }


};
