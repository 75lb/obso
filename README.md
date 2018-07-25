<a name="module_obso"></a>

## obso
Make an object observable.

**Example**  
```js
import Emitter from './node_modules/obso/emitter.mjs'

class Something extends Emitter {}
const something = new Something()
something.on('load', () => {
  console.log('load event fired.')
})
```

* [obso](#module_obso)
    * [Emitter](#exp_module_obso--Emitter) ⏏
        * [.emit(eventName)](#module_obso--Emitter+emit)
        * [.on(eventName, handler)](#module_obso--Emitter+on)
        * [.removeEventListener(eventName, handler)](#module_obso--Emitter+removeEventListener)

<a name="exp_module_obso--Emitter"></a>

### Emitter ⏏
**Kind**: Exported class  
<a name="module_obso--Emitter+emit"></a>

#### emitter.emit(eventName)
Emit an event.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to emit |
| ...args | <code>\*</code> | args to pass to the event handler |

<a name="module_obso--Emitter+on"></a>

#### emitter.on(eventName, handler)
Register an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to watch |
| handler | <code>function</code> | the event handler |

<a name="module_obso--Emitter+removeEventListener"></a>

#### emitter.removeEventListener(eventName, handler)
Remove an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_obso--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name |
| handler | <code>function</code> | the event handler |

