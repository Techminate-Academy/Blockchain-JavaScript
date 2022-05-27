// const Block = require('./Block');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

// const block = new Block(Date.parse('2017-01-01'), [], '0');

let myChain = new Blockchain();
myChain.addBlock(new Block(Date.now(), {amount: 4}))
myChain.addBlock(new Block(Date.now(), {amount: 20}))
myChain.addBlock(new Block(Date.now(), {amount: 40}))

console.log(JSON.stringify(myChain, null, 4))

