const TestRunner = require('test-runner')
const Emitter = require('./')
const Counter = require('test-runner-counter')

const runner = new TestRunner()

runner.test('on', function () {
  const counter = Counter.create(2)
  const emitter = new Emitter()
  emitter.on('something', function () {
    counter.pass('good')
  })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('addEventListener', function () {
  const counter = Counter.create(2)
  const emitter = new Emitter()
  emitter.addEventListener('something', function () {
    counter.pass('good')
  })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('once', function () {
  const counter = Counter.create(1)
  const emitter = new Emitter()
  emitter.once('something', function () {
    counter.pass('good')
  })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('once, as an option', function () {
  const counter = Counter.create(1)
  const emitter = new Emitter()
  emitter.on('something', function () {
    counter.pass('good')
  }, { once: true })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('propagate', function () {
  const counter1 = Counter.create(2)
  const counter2 = Counter.create(2)
  const emitter1 = new Emitter()
  const emitter2 = new Emitter()
  emitter1.on('one', function () {
    counter1.pass('emitter1')
  })
  emitter2.on('one', function () {
    counter2.pass('emitter2')
  })
  emitter1.emit('one')
  emitter2.propagate('one', emitter1)
  emitter1.emit('one')
  emitter2.emit('one')
  return Promise.all([ counter1.promise, counter2.promise ])
})

runner.test('event on child bubbles up to parent')
