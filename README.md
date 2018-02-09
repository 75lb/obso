## emitter
**Example**  
```js
import Emitter from 'obso'

class Something extends Emitter {}
const something = new Something()
something.on('load', () => {
  console.log('load event fired.')
})
```

* [emitter](#markdown-header-emitter)
    * [Emitter](#markdown-header-emitter) ⏏
        * [.emit(eventName)](#markdown-header-emitteremiteventname)
        * [.on(eventName, handler)](#markdown-header-emitteroneventname-handler)
        * [.removeEventListener(eventName, handler)](#markdown-header-emitterremoveeventlistenereventname-handler)

### Emitter ⏏
**Kind**: Exported class  
#### emitter.emit(eventName)
Emit an event.

**Kind**: instance method of Emitter  

| Param | Type | Description |
| --- | --- | --- |
| eventName | string | the event name to emit |
| ...args | * | args to pass to the event handler |

#### emitter.on(eventName, handler)
Register an event listener.

**Kind**: instance method of Emitter  

| Param | Type | Description |
| --- | --- | --- |
| eventName | string | the event name to watch |
| handler | function | the event handler |

#### emitter.removeEventListener(eventName, handler)
Remove an event listener.

**Kind**: instance method of Emitter  

| Param | Type | Description |
| --- | --- | --- |
| eventName | string | the event name |
| handler | function | the event handler |

