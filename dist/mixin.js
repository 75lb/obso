(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.emitter = factory());
}(this, (function () { 'use strict';

/**
 * @module emitter
 * @example
 * import Emitter from './node_modules/emitter/emitter.js'
 *
 * class Something extends Emitter {}
 * const something = new Something()
 * something.on('load', () => {
 *   console.log('load event fired.')
 * })
 */

/**
 * @alias module:emitter
 */
class Emitter {
  /**
   * Emit an event.
   * @param eventName {string} - the event name to emit
   * @param ...args {*} - args to pass to the event handler
   */
  emit (eventName, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = [];
      this._listeners.forEach(listener => {
        if (listener.eventName === eventName) {
          listener.handler.apply(this, args);
        } else if (listener.eventName === '__ALL__') {
          const handlerArgs = args.slice();
          handlerArgs.unshift(eventName);
          listener.handler.apply(this, handlerArgs);
        }
        if (listener.once) toRemove.push(listener);
      });
      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
      });
    }
    if (this.parent) this.parent.emit(eventName, ...args);
  }

   /**
    * Register an event listener.
    * @param eventName {string} - the event name to watch
    * @param handler {function} - the event handler
    */
  on (eventName, handler, options) {
    createListenersArray(this);
    options = options || {};
    if (arguments.length === 1 && typeof eventName === 'function') {
      this._listeners.push({ eventName: '__ALL__', handler: eventName, once: options.once });
    } else {
      this._listeners.push({ eventName: eventName, handler: handler, once: options.once });
    }
  }

  /**
   * Remove an event listener.
   * @param eventName {string} - the event name
   * @param handler {function} - the event handler
   */
  removeEventListener (eventName, handler) {
    if (!this._listeners || this._listeners.length === 0) return
    const index = this._listeners.findIndex(function (listener) {
      return listener.eventName === eventName && listener.handler === handler
    });
    if (index > -1) this._listeners.splice(index, 1);
  }

  once (eventName, handler) {
    this.on(eventName, handler, { once: true });
  }

  propagate (eventName, from) {
    from.on(eventName, (...args) => this.emit(eventName, ...args));
  }
}

/* alias */
Emitter.prototype.addEventListener = Emitter.prototype.on;

function createListenersArray (target) {
  if (target._listeners) return
  Object.defineProperty(target, '_listeners', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: []
  });
}

/**
 * @module emitter
 * @example
 * import Emitter from './node_modules/emitter/emitter.js'
 *
 * class Something extends Emitter {}
 * const something = new Something()
 * something.on('load', () => {
 *   console.log('load event fired.')
 * })
 */

/**
 * @alias module:emitter
 */
const Mixin = Base => {
  class Mixed extends Base {}
  for (const propName of Object.getOwnPropertyNames(Emitter.prototype)) {
    if (propName === 'constructor') continue
    Object.defineProperty(Mixed.prototype, propName, Object.getOwnPropertyDescriptor(Emitter.prototype, propName));
  }
  return Mixed
};

return Mixin;

})));
