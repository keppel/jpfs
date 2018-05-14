#!/usr/bin/env node
let { serve, get } = require('../index.js')
let concat = require('concat-stream')

let hash = process.argv[2]

if (hash) {
  get(hash).then(function(data) {
    process.stdout.write(data)
    process.stdout.on('finish', function() {
      process.exit()
    })
  })
} else {
  // we're a server, listen for stuff from stdin
  let concatStream = concat(function(data) {
    let { hash, close } = serve(data)
    process.stdout.write(hash)
  })
  process.stdin.pipe(concatStream)
}
