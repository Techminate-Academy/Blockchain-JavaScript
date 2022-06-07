const asyncHandler = require('express-async-handler')
const Blockchain = require('../Blockchain/Blockchain');

const blockChain = asyncHandler(
    async (req, res) => {
        let abcChain = new Blockchain();

        console.log('creating transaction 1....')
        const txs1 = new Transaction(myWalletAddress, recipient, '10')
        txs1.signTransaction(myKeyPair)


        console.log('adding transaction 1 to pending list....')
        abcChain.addTransaction(txs1)
    }
)


module.exports = {
    blockChain
}