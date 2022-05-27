// const Block = require('./Block');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const { isChainValid } = require('./Validation');

// const block = new Block(Date.parse('2017-01-01'), [], '0');

let myChain = new Blockchain();
myChain.addBlock(new Block(Date.now(), {amount: 40}))
myChain.addBlock(new Block(Date.now(), {amount: 20}))

chainJson = JSON.stringify(myChain, null, 4)
console.log(chainJson[0])

// console.log('is chain valid ? ' + isChainValid(myChain))

// myChain.chain[1].transactions = { amount : 100 }
// myChain.chain[1].hash = myChain.chain[1].calculateHash()

// console.log('is chain valid after mutation ? ' + isChainValid(myChain))