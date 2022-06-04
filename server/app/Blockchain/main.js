// const Block = require('./Block');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const Transaction = require('./Transaction');
const { isChainValid } = require('./Validation');

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const myKeyPair = ec.keyFromPrivate('7fd2f65e349beec25671e2c5ca1733fcf7b334fae8144c8afed5e5b23b573ab7')
const myWalletAddress = myKeyPair.getPublic('hex');

const reciepent = '040ef9a52f76711b5c150f429a3c93fe7e074dd7d09420cb0d9a6c84e430bf6d4cebfa05c03edb71fa2bba672e0c25bd742946c0976dc5c761b50c1651933a56a3'


// const block = new Block(Date.parse('2017-01-01'), [], '0');

let myChain = new Blockchain();

console.log('creating a transaction ....')
const txs1 = new Transaction(myWalletAddress, reciepent, '10')
txs1.signTransaction(myKeyPair)


console.log('adding a transaction 1 ....')
myChain.addTransaction(txs1)

// console.log('Mining block 1 ....')
// myChain.addBlock(new Block(Date.now(), {amount: 40}))

// console.log('Mining block 2 ....')
// myChain.addBlock(new Block(Date.now(), {amount: 20}))

// console.log('add transaction 1 ....')
// myChain.createTransaction(new Transaction('address1', 'address2', '100'))

// console.log('add transaction 2 ....')
// myChain.createTransaction(new Transaction('address2', 'address3', '100'))

// mine block
myChain.minePendingTransactions(myWalletAddress)

console.log('mining reward' ,myChain.getBalanceOfAddress(myWalletAddress))

var chainJson = JSON.stringify(myChain.getChain(), null, 4)
console.log(chainJson)

// console.log('is chain valid ? ' + isChainValid(myChain.getChain()))

// myChain.chain[1].transactions = { amount : 100 }
// myChain.chain[1].hash = myChain.chain[1].calculateHash()

// console.log('is chain valid after mutation ? ' + isChainValid(myChain.getChain()))