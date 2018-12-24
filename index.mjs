/**
 * @module obso
 */

/**
 * @alias module:obso
 */
class Emitter {
  /**
   * Emit an event.
   * @param eventName {string} - the event name to emit
   * @param ...args {*} - args to pass to the event handler
   */
  emit (eventName, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = []
      this._listeners.forEach(listener => {
        if (listener.eventName === eventName) {
          listener.handler.apply(this, args)
        } else if (listener.eventName === '__ALL__') {
          const handlerArgs = args.slice()
          handlerArgs.unshift(eventName)
          listener.handler.apply(this, handlerArgs)
        }
        if (listener.once) toRemove.push(listener)
      })
      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1)
      })
    }
    if (this.parent) this.parent.emit(eventName, ...args)
  }

   /**
    * Register an event listener.
    * @param {string} eventName - the event name to watch
    * @param {function} handler - the event handler
    * @param {object} [options]
    * @param {boolean} [options.once]
    */
  on (eventName, handler, options) {
    createListenersArray(this)
    options = options || {}
    if (arguments.length === 1 && typeof eventName === 'function') {
      this._listeners.push({ eventName: '__ALL__', handler: eventName, once: options.once })
    } else {
      this._listeners.push({ eventName: eventName, handler: handler, once: options.once })
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
    })
    if (index > -1) this._listeners.splice(index, 1)
  }

  /**
   * Once.
   * @param {string} eventName - the event name to watch
   * @param {function} handler - the event handler
   */
  once (eventName, handler) {
    /* TODO: the once option is browser-only */
    this.on(eventName, handler, { once: true })
  }

  /**
   * Propagate.
   * @param {string} eventName - the event name to propagate
   * @param {object} from - the emitter to propagate from
   */
  propagate (eventName, from) {
    from.on(eventName, (...args) => this.emit(eventName, ...args))
  }
}

/**
 * Alias for `on`.
 */
Emitter.prototype.addEventListener = Emitter.prototype.on

function createListenersArray (target) {
  if (target._listeners) return
  Object.defineProperty(target, '_listeners', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: []
  })
}

export default Emitter
