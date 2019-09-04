/**
 * @module obso
 */

/**
 * @alias module:obso
 */
class Emitter {
  /**
   * Emit an event.
   * @param {string} eventName - the event name to emit.
   * @param ...args {*} - args to pass to the event handler
   */
  emit (eventName, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = []

      /* invoke each relevant listener */
      for (const listener of this._listeners) {
        const handlerArgs = args.slice()
        if (listener.eventName === '__ALL__') {
          handlerArgs.unshift(eventName)
        }

        if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
          listener.handler.call(this, ...handlerArgs)

          /* remove once handler */
          if (listener.once) toRemove.push(listener)
        }
      }

      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1)
      })
    }

    /* bubble event up */
    if (this.parent) this.parent._emitTarget(eventName, this, ...args)
  }

  _emitTarget (eventName, target, ...args) {
    if (this._listeners && this._listeners.length > 0) {
      const toRemove = []

      /* invoke each relevant listener */
      for (const listener of this._listeners) {
        const handlerArgs = args.slice()
        if (listener.eventName === '__ALL__') {
          handlerArgs.unshift(eventName)
        }

        if (listener.eventName === '__ALL__' || listener.eventName === eventName) {
          listener.handler.call(target, ...handlerArgs)

          /* remove once handler */
          if (listener.once) toRemove.push(listener)
        }
      }

      toRemove.forEach(listener => {
        this._listeners.splice(this._listeners.indexOf(listener), 1)
      })
    }

    /* bubble event up */
    if (this.parent) this.parent._emitTarget(eventName, target || this, ...args)
  }

   /**
    * Register an event listener.
    * @param {string} [eventName] - The event name to watch. Omitting the name will catch all events.
    * @param {function} handler - The function to be called when `eventName` is emitted. Invocated with `this` set to `emitter`.
    * @param {object} [options]
    * @param {boolean} [options.once] - If `true`, the handler will be invoked once then removed.
    */
  on (eventName, handler, options) {
    createListenersArray(this)
    options = options || {}
    if (arguments.length === 1 && typeof eventName === 'function') {
      handler = eventName
      eventName = '__ALL__'
    }
    if (!handler) {
      throw new Error('handler function required')
    } else if (handler && typeof handler !== 'function') {
      throw new Error('handler arg must be a function')
    } else {
      this._listeners.push({ eventName, handler: handler, once: options.once })
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
   * Propagate events from the supplied emitter to this emitter.
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
