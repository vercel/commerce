import update, { Context } from 'immutability-helper'

const c = new Context()

c.extend('$auto', function (value, object) {
  return object ? c.update(object, value) : c.update({}, value)
})

c.extend('$autoArray', function (value, object) {
  return object ? c.update(object, value) : c.update([], value)
})

export default c.update
