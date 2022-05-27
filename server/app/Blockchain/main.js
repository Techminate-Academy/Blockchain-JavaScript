// const Block = require('./Block');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const { isChainValid } = require('./Validation');

// const block = new Block(Date.parse('2017-01-01'), [], '0');

let myChain = new Blockchain();
myChain.addBlock(new Block(Date.now(), {amount: 4}))
myChain.addBlock(new Block(Date.now(), {amount: 20}))
myChain.addBlock(new Block(Date.now(), {amount: 40}))

console.log(JSON.stringify(myChain, null, 4))

chainValid = isChainValid(myChain)

console.log('is chain valid ? ' + chainValid)

myChain.chain[1].transactions = {amount : 100}

chainValid = isChainValid(myChain)
console.log('is chain valid after mutation ? ' + chainValid)