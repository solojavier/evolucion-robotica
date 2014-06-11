var Cylon = require('cylon');

Cylon.api({
  host: '0.0.0.0',
  port: '8080',
  ssl:  false
});

Cylon.robot({
  name: 'pebble',
  connections: [
    { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-YBW-RN-SPP' },
    { name: 'pebble', adaptor: 'pebble' }
  ],
  devices: [
    { name: 'sphero', driver: 'sphero' },
    { name: 'pebble', driver: 'pebble' }
  ],
  heading: 0,

  work: function(my) {
    every((1).second(), function() {
      my.sphero.roll(100, my.heading);
    });

    my.pebble.on('accel', function(data) {
      values = data.split(",");
      x      = values[0];
      y      = values[1];

      my.heading = ((180.0 - (Math.atan2(y,x) * (180.0 / Math.PI))));
    });
  }

});

Cylon.start();
