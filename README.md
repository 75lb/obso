[![view on npm](https://img.shields.io/npm/v/obso.svg)](https://www.npmjs.org/package/obso)
[![npm module downloads](https://img.shields.io/npm/dt/obso.svg)](https://www.npmjs.org/package/obso)
[![Build Status](https://travis-ci.org/75lb/obso.svg?branch=master)](https://travis-ci.org/75lb/obso)
[![Dependency Status](https://badgen.net/david/dep/75lb/obso)](https://david-dm.org/75lb/obso)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

## obso

Make an object observable.

```js
import Emitter from './node_modules/obso/emitter.mjs'
class Something extends Emitter {}
const something = new Something()
something.on('load', () => {
  console.log('load event fired.')
})
```

<a name="module_obso"></a>

## obso

* [obso](#module_obso)
    * [Emitter](#exp_module_obso--Emitter) ⏏
        * [.addEventListener](#module_obso--Emitter+addEventListener)
        * [.emit(eventName)](#module_obso--Emitter+emit)
        * [.on([eventName], handler, [options])](#module_obso--Emitter+on)
        * [.removeEventListener(eventName, handler)](#module_obso--Emitter+removeEventListener)
        * [.once(eventName, handler)](#module_obso--Emitter+once)
        * [.propagate(eventName, from)](#module_obso--Emitter+propagate)

<a name="exp_module_obso--Emitter"></a>

### Emitter ⏏
**Kind**: Exported class  
<a name="module_obso--Emitter+addEventListener"></a>

#### emitter.addEventListener
Alias for `on`.

**Kind**: instance property of [<code>Emitter</code>](#exp_module_obso--Emitter)  
<a name="module_obso--Emitter+emit"></a>

#### emitter.emit(eventName)
Emit an event.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to emit. |
| ...args | <code>\*</code> | args to pass to the event handler |

<a name="module_obso--Emitter+on"></a>

#### emitter.on([eventName], handler, [options])
Register an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| [eventName] | <code>string</code> | The event name to watch. Omitting the name will catch all events. |
| handler | <code>function</code> | The function to be called when `eventName` is emitted. Invocated with `this` set to `emitter`. |
| [options] | <code>object</code> |  |
| [options.once] | <code>boolean</code> | If `true`, the handler will be invoked once then removed. |

<a name="module_obso--Emitter+removeEventListener"></a>

#### emitter.removeEventListener(eventName, handler)
Remove an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name |
| handler | <code>function</code> | the event handler |

<a name="module_obso--Emitter+once"></a>

#### emitter.once(eventName, handler)
Once.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to watch |
| handler | <code>function</code> | the event handler |

<a name="module_obso--Emitter+propagate"></a>

#### emitter.propagate(eventName, from)
Propagate events from the supplied emitter to this emitter.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to propagate |
| from | <code>object</code> | the emitter to propagate from |


* * *

&copy; 2018-19 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
