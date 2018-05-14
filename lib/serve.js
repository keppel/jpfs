let { createHash } = require('crypto')
let { createServer } = require('peer-channel')

module.exports = function(content) {
  let buf

  if (typeof content === 'string') {
    buf = Buffer.from(content, 'utf8')
  } else if (Buffer.isBuffer(content)) {
    buf = content
  } else {
    throw new Error('serve() must receive a string or buffer as its argument')
  }

  let hash = createHash('sha256').update(content).digest('hex')
  let { close, listen } = createServer(function(conn) {
    conn.send(content)
    conn.end()
  })
  listen(hash)
  return { hash, close }
}
