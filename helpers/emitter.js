const EventEmitter = function () {
    this.events = {};
}

EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = new Set();
    }
    this.events[event].add(listener);
    return (function () { this.off(event, listener) }).bind(this);
};

EventEmitter.prototype.off = function (event, listener) {
    var t = Object(this.events[event])
    if ('delete' in t) t.delete(listener)
};

EventEmitter.prototype.emit = async function (event) {
    var i, args = [].slice.call(arguments, 1);
    var t = Object(this.events[event] || new Set())
    for (i of t) {
        i.apply(this, [event, ...args]);
    }
};
EventEmitter.prototype.once = function (event, listener) {
    this.on(event, function g() {
        this.off(event, g);
        listener.apply(this, arguments);
    });
};
EventEmitter.prototype.clear = function (event) {
    delete this.events[event]
};

const emitter = new EventEmitter()

export default emitter;
