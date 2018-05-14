## janky, planetary file system

JPFS is a simple JavaScript module for [content-addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage) and retrieval of arbitrary data by its hash, in Node.js or the browser.

It's like [IPFS](https://ipfs.io), but all data comes from a single peer, so it's not good for large data like videos. But it also works without any configuration or surprises, even in the browser, with a simple API.

```bash
$ npm install jpfs

or:

$ npm install -g jpfs
```

## Usage

```js
// server.js
let { serve } = require('jpfs')
let { hash, close } = serve('hello world')
console.log(hash) // 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'

// close() to stop serving
```

```js
// client.js
let { get } = require('jpfs')

async function main() {
  let data = await get(
    'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
  )
  console.log(data) // 'hello world'
}

main()
```

## CLI
```bash
# server:
$ cat mydata.txt | jpfs
# outputs hash

# client, on another machine:
$ jpfs <hash>
# outputs contents of mydata.txt
```

