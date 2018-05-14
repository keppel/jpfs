let { createHash } = require('crypto')
let { connect } = require('peer-channel')

module.exports = function(expectedHash) {
  return new Promise((resolve, reject) => {
    let pc = connect(expectedHash)

    pc.on('connect', function(conn) {
      let bytes = Buffer.alloc(0)
      conn.on('data', function(data) {
        bytes = Buffer.concat([bytes, data])
      })
      conn.on('end', function() {
        let hash = createHash('sha256').update(bytes).digest('hex')
        if (hash === expectedHash) {
          resolve(bytes)
          pc.close()
        }
      })
    })
  })
}
