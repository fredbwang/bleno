var util = require('util');
var events = require('events');
var jsonfile1 = require('/home/pi/SPI-Py/MFRC522-python/data/data.json');
var fs = require("fs");
var jsonfile = fs.readFileSync("/home/pi/SPI-Py/MFRC522-python/data/data.json");
var jsonContent = JSON.parse(jsonfile)

console.log(jsonContent);

var id = 0;

var PizzaCrust = {
  NORMAL:    0,
  DEEP_DISH: 1,
  THIN:      2,
};

var PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

var PizzaBakeResult = {
  HALFBAKED:  jsonContent[912117634230][1],
  BAKED:      1,
  CRISPY:     2,
  BURNT:      jsonContent[10111520174149],
  ON_FIRE:    4
};

function Pizza() {
  events.EventEmitter.call(this);
  this.toppings = PizzaToppings.NONE;
  this.crust = PizzaCrust.NORMAL;
}

util.inherits(Pizza, events.EventEmitter);

Pizza.prototype.bake = function(item) {
  var time = item * 10;
  var self = this;
  console.log('item', item, 'is requested for its location');
  setTimeout(function() {
    var newjsonfile = fs.readFileSync("/home/pi/SPI-Py/MFRC522-python/data/data.json");
    var newjsonContent = JSON.parse(newjsonfile)

    console.log('item1:', newjsonContent[10111520174149])
    console.log('item2:', newjsonContent[912117634230])

    var result =
      (item == 1) ? newjsonContent[10111520174149]:
      (item == 3) ? newjsonContent[10111520174149][1]:
      (item == 2) ? newjsonContent[912117634230]:
      (item == 4) ? newjsonContent[912117634230][1]:
      (item == 5) ? "-1":
      (item == 6) ? "1":
                    PizzaBakeResult.ON_FIRE;
    self.emit('ready', result);
  }, time);
};

module.exports.Pizza = Pizza;
module.exports.PizzaToppings = PizzaToppings;
module.exports.PizzaCrust = PizzaCrust;
module.exports.PizzaBakeResult = PizzaBakeResult;
module.exports.PizzaBakeResult = jsonContent;
