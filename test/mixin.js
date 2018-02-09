const TestRunner = require('test-runner')
const mixin = require('../dist/mixin')
const Counter = require('test-runner-counter')

const runner = new TestRunner()

runner.test('mixin: on', function () {
  const counter = Counter.create(2)
  const Observable = mixin(class {})
  const emitter = new Observable()

  emitter.on('something', function () {
    counter.pass('good')
  })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('mixin: addEventListener', function () {
  const counter = Counter.create(2)
  const Observable = mixin(class {})
  const emitter = new Observable()

  emitter.addEventListener('something', function () {
    counter.pass('good')
  })
  emitter.emit('something')
  emitter.emit('something')
  return counter.promise
})

runner.test('propagate', function () {
  const counter1 = Counter.create(2)
  const counter2 = Counter.create(2)
  const Observable = mixin(class {})
  const emitter1 = new Observable()
  const emitter2 = new Observable()
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
