var EventBroker = exports.EventBroker = function EventBroker(){
  this.subjects = {};
};

EventBroker.prototype.subscribe = function(subject,callback){
  this.get(subject).push(callback);
};

EventBroker.prototype.create = function(subject){
  this.subjects[subject] = []; 
};

EventBroker.prototype.get = function(subject){
  if( !this.has(subject) ) {
    throw new Error("Subject Not Found: "+subject);
  }

  return this.subjects[subject];
};

EventBroker.prototype.has = function(subject){
  return this.subjects.hasOwnProperty(subject);
}

EventBroker.prototype.publish = function(subject){
  var subscribers = this.get(subject),
      args = Array.prototype.slice.call(arguments,1);

  args.splice(0,0, undefined);

  for(var i = -1, len=subscribers.length; ++i < len; ){
    setTimeout(Function.prototype.bind.apply(subscribers[i], args), 0);   
  };
};

function Observable(){
  this.events = new EventBroker;
  this.on = this.events.subscribe.bind(this.events);
};

module.exports = {
  'Observable':Observable,
  'EventBroker':EventBroker
};
