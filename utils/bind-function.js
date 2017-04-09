
'use strict'

var bind = (fn, ...begin) =>
    (...end) => fn(...begin, ...end)

module.exports = bind
