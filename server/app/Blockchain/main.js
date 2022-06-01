// const Block = require('./Block');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const Transaction = require('./Transaction');
const { isChainValid } = require('./Validation');

// const block = new Block(Date.parse('2017-01-01'), [], '0');

let myChain = new Blockchain();

// console.log('Mining block 1 ....')
// myChain.addBlock(new Block(Date.now(), {amount: 40}))

// console.log('Mining block 2 ....')
// myChain.addBlock(new Block(Date.now(), {amount: 20}))

console.log('add transaction 1 ....')
myChain.createTransaction(new Transaction('address1', 'address2', '100'))

console.log('add transaction 2 ....')
myChain.createTransaction(new Transaction('address2', 'address3', '100'))

myChain.minePendingTransactions('sazidaddress')

console.log('mining reward' ,myChain.getBalanceOfAddress('sazidaddress'))

var chainJson = JSON.stringify(myChain.getChain(), null, 4)
console.log(chainJson)

// console.log('is chain valid ? ' + isChainValid(myChain.getChain()))

// myChain.chain[1].transactions = { amount : 100 }
// myChain.chain[1].hash = myChain.chain[1].calculateHash()

// console.log('is chain valid after mutation ? ' + isChainValid(myChain.getChain()))