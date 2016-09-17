class Client{
  constructor(x,y){
    this.socket = io();


    this.socket.on('create', function(data){
      TankOnline.inputControllers.push(
        new InputController(
          {
            up    : Phaser.KeyCode.UP,
            down  : Phaser.KeyCode.DOWN,
            left  : Phaser.KeyCode.LEFT,
            right : Phaser.KeyCode.RIGHT,
            fire  : Phaser.KeyCode.SPACEBAR
          },
          new TankController(TankOnline.inputControllers.length, data.newpos1, data.newpos2,
                          TankOnline.tankGroup, TankOnline.bulletGroup)
        )
      );
    });

    this.socket.emit('update', {
      newpos1 : x, newpos2 : y
    });

  }
}
