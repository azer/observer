observer.js
===========
An implementation of the observer design pattern. 

Tested Platforms: V8 (Node)

From NPM
========
npm install observer

Usage
=====
To create an observation table:
    var EventBroker = require('observer').EventBroker;

    var events = new EventBroker;
    events.create('foobar');

    events.subscribe('foobar', console.log.bind(console,'observer#1:') );
    events.subscribe('foobar', console.log.bind(console,'observer#2:') );

    events.publish('foobar',3,14);

    // => observer#1, 3, 14
    // => observer#2, 3, 14

To create an observable class:
    var Observable = require('observer').Observable,
        inherits   = require('util').inherits;

    function Foobar(){
      Observable.call(this);
      this.create('qux');
    }

    var f = new Foobar();
    f.on('qux', console.log.bind(console, 'observer#3:');
    f.events.publish('qux',3,14);

    // => observer#3, 3, 14

Testing
=======
node test/test.js
