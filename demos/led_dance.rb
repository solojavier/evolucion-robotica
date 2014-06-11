require 'artoo'

LEDS = 6
TIME = 0.05

connection :firmata, :adaptor => :firmata, :port => '/dev/tty.usbmodem1411' #osx
device :board, :driver => :device_info

LEDS.times do |i|
  device "led_#{i+1}", :driver => :led, :pin => (i+2)
end

work do
  current = 0
  leds    = devices.to_a.select {|d| d[1].name.include?('led') }

  every(TIME) do
    led = leds[current % LEDS][1]

    led.on? ? led.off : led.on

    current += 1
  end
end