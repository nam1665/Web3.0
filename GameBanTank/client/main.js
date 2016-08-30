var TankOnline = {};

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
    TankOnline.game.load.image('tank','./images/tank_player1_down_c0_t1_s1.png');
  }

var create = function() {
    TankOnline.game.add.sprite(200, 200, 'tank');
  }
var update = function() {}
