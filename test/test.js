var assert = require('assert'),
    inherits = require('util').inherits,
    Observable = require('../lib/observer').Observable;

function Cal(){
  Observable.call(this);

  this.events.create('sum');
  this.events.create('sub');
  this.events.create('mul');
}

inherits(Cal, Observable);

Cal.prototype.sum = function(x,y){
  this.events.publish('sum', x+y);
};

Cal.prototype.sub = function(x,y){
  this.events.publish('sub',y-x);
};

Cal.prototype.mul = function(x,y){
  this.events.publish('mul', x*y);
  async = true;
};

var pi = new Cal(),
    async = false;

pi.on('sum', pi.sub.bind(pi,0.43));
pi.on('sub', pi.mul.bind(pi,2));
pi.on('mul', function(val){
  assert.ok(async);
  pi.value = val;
});

pi.sum(1.3,0.7);

process.addListener('exit', function(){
  assert.ok(pi.value, 3.14);
});
