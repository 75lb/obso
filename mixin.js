import Emitter from './emitter.js'

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
    Object.defineProperty(Mixed.prototype, propName, Object.getOwnPropertyDescriptor(Emitter.prototype, propName))
  }
  return Mixed
}

export default Mixin
