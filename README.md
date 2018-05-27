<a name="module_emitter"></a>

## emitter
**Example**  
```js
import Emitter from './node_modules/emitter/emitter.js'

class Something extends Emitter {}
const something = new Something()
something.on('load', () => {
  console.log('load event fired.')
})
```

* [emitter](#module_emitter)
    * [Emitter](#exp_module_emitter--Emitter) ⏏
        * [.emit(eventName)](#module_emitter--Emitter+emit)
        * [.on(eventName, handler)](#module_emitter--Emitter+on)
        * [.removeEventListener(eventName, handler)](#module_emitter--Emitter+removeEventListener)

<a name="exp_module_emitter--Emitter"></a>

### Emitter ⏏
**Kind**: Exported class  
<a name="module_emitter--Emitter+emit"></a>

#### emitter.emit(eventName)
Emit an event.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_emitter--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to emit |
| ...args | <code>\*</code> | args to pass to the event handler |

<a name="module_emitter--Emitter+on"></a>

#### emitter.on(eventName, handler)
Register an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_emitter--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name to watch |
| handler | <code>function</code> | the event handler |

<a name="module_emitter--Emitter+removeEventListener"></a>

#### emitter.removeEventListener(eventName, handler)
Remove an event listener.

**Kind**: instance method of [<code>Emitter</code>](#exp_module_emitter--Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | the event name |
| handler | <code>function</code> | the event handler |

