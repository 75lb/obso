const TestRunner = require('test-runner')
const Emitter = require('./')
const Counter = require('test-runner-counter')
const a = require('assert')

const runner = new TestRunner()

runner.test('on: multiple args', function () {
  const counter = Counter.create(1)
  const emitter = new Emitter()
  emitter.on('something', function (x, y, z) {
    counter.pass()
    a.strictEqual(x, 1)
    a.strictEqual(y, 2)
    a.strictEqual(z, 3)
  })
  emitter.emit('something', 1, 2, 3)
  return counter.promise
})

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

runner.test('on: multiple events', function () {
  const counter = Counter.create(3)
  const emitter = new Emitter()
  emitter.on('one', function () {
    counter.pass('good')
  })
  emitter.on('two', function () {
    counter.pass('good')
  })
  emitter.emit('one')
  emitter.emit('two')
  emitter.emit('two')
  return counter.promise
})

runner.test('on: handle all events', function () {
  const counter = Counter.create(3)
  const emitter = new Emitter()
  emitter.on(function () {
    counter.pass('good')
  })
  emitter.emit('one')
  emitter.emit('two')
  emitter.emit('two')
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

runner.test('event on child bubbles up to parent', function () {
  const counter = Counter.create(3)
  const parent = new Emitter()
  const child = new Emitter()
  child.parent = parent
  parent.on('parent', function (x, y) {
    a.strictEqual(this, parent)
    a.strictEqual(x, 1)
    a.strictEqual(y, 2)
    counter.pass()
  })
  parent.on('child', function (x, y) {
    a.strictEqual(this, child)
    a.strictEqual(x, 3)
    a.strictEqual(y, 4)
    counter.pass()
  })
  child.on('child', function (x, y) {
    a.strictEqual(this, child)
    a.strictEqual(x, 3)
    a.strictEqual(y, 4)
    counter.pass()
  })
  parent.emit('parent', 1, 2)
  child.emit('child', 3, 4)
  return counter.promise
})

runner.test('this', function () {
  const emitter = new Emitter()
  emitter.on('one', function () {
    a.strictEqual(this, emitter)
  })
  emitter.emit('one')
})
