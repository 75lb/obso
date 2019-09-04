const Tom = require('test-runner').Tom
const Emitter = require('./')
const a = require('assert')

const tom = module.exports = new Tom('test')

tom.test('on: multiple args', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.on('something', function (x, y, z) {
    actuals.push('something')
    a.strictEqual(x, 1)
    a.strictEqual(y, 2)
    a.strictEqual(z, 3)
  })
  emitter.emit('something', 1, 2, 3)
  a.deepStrictEqual(actuals, ['something'])
})

tom.test('on', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.on('something', function () {
    actuals.push('something')
  })
  emitter.emit('something')
  emitter.emit('something')
  a.deepStrictEqual(actuals, ['something', 'something'])
})

tom.test('on: multiple events', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.on('one', function () {
    actuals.push('one')
  })
  emitter.on('two', function () {
    actuals.push('two')
  })
  emitter.emit('one')
  emitter.emit('two')
  emitter.emit('two')
  a.deepStrictEqual(actuals, ['one', 'two', 'two'])
})

tom.test('on: handle all events', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.on(function () {
    actuals.push('event')
  })
  emitter.emit('one')
  emitter.emit('two')
  emitter.emit('two')
  a.deepStrictEqual(actuals, ['event', 'event', 'event'])
})

tom.test('on: validate args 1', function () {
  const emitter = new Emitter()
  a.throws(
    () => emitter.on('break'),
    /handler function required/
  )
})

tom.test('on: validate args 2', function () {
  const emitter = new Emitter()
  a.throws(
    () => emitter.on('break', 'break'),
    /handler arg must be a function/
  )
})

tom.test('addEventListener', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.addEventListener('something', function () {
    actuals.push('something')
  })
  emitter.emit('something')
  emitter.emit('something')
  a.deepStrictEqual(actuals, ['something', 'something'])
})

tom.test('once', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.once('something', function () {
    actuals.push('something')
  })
  emitter.emit('something')
  emitter.emit('something')
  a.deepStrictEqual(actuals, ['something'])
})

tom.test('once, as an option', function () {
  const actuals = []
  const emitter = new Emitter()
  emitter.on('something', function () {
    actuals.push('something')
  }, { once: true })
  emitter.emit('something')
  emitter.emit('something')
  a.deepStrictEqual(actuals, ['something'])
})

tom.test('propagate', function () {
  const actuals = []
  const emitter1 = new Emitter()
  const emitter2 = new Emitter()
  emitter1.on('one', function () {
    actuals.push('one')
  })
  emitter2.on('one', function () {
    actuals.push('one2')
  })
  emitter1.emit('one')
  emitter2.propagate('one', emitter1)
  emitter1.emit('one')
  emitter2.emit('one')
  a.deepStrictEqual(actuals, ['one', 'one', 'one2', 'one2'])
})

tom.test('event on child bubbles up to parent', function () {
  const actuals = []
  const parent = new Emitter()
  const child = new Emitter()
  child.parent = parent
  parent.on('parent', function (x, y) {
    a.strictEqual(this, parent)
    a.strictEqual(x, 1)
    a.strictEqual(y, 2)
    actuals.push('parent')
  })
  parent.on('child', function (x, y) {
    a.strictEqual(this, child)
    a.strictEqual(x, 3)
    a.strictEqual(y, 4)
    actuals.push('child')
  })
  child.on('child', function (x, y) {
    a.strictEqual(this, child)
    a.strictEqual(x, 3)
    a.strictEqual(y, 4)
    actuals.push('child2')
  })
  parent.emit('parent', 1, 2)
  child.emit('child', 3, 4)
  a.deepStrictEqual(actuals, ['parent', 'child2', 'child'])
})

tom.test('this', function () {
  const emitter = new Emitter()
  emitter.on('one', function () {
    a.strictEqual(this, emitter)
  })
  emitter.emit('one')
})

tom.test('nested composite, bubbling', function () {
  const actuals = []
  const root = new Emitter()
  const one = new Emitter()
  one.parent = root
  const two = new Emitter()
  two.parent = one

  root.on('pass', (name) => {
    if (actuals.length === 0) {
      a.strictEqual(name, 'one')
      actuals.push(1)
    } else {
      a.strictEqual(name, 'two')
      actuals.push(2)
    }
  })
  one.emit('pass', 'one')
  two.emit('pass', 'two')
  a.deepStrictEqual(actuals, [ 1, 2 ])
})
