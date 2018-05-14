let { serve } = require('../index.js')

let { hash, close } = serve('hello world')
console.log(hash)
