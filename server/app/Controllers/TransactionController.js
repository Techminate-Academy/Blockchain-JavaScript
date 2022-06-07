const Transaction = require('../Blockchain/Transaction');

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const asyncHandler = require('express-async-handler')

const transactionCreate = asyncHandler(
    async (req, res) => {
        const { recipient, amount } = req.body
        //privateKey, reciepent
        const myKeyPair = ec.keyFromPrivate(process.env.privateKey)
        const myWalletAddress = myKeyPair.getPublic('hex');

        const txs = new Transaction(myWalletAddress, recipient, amount)
        txs.signTransaction(myKeyPair)

        res.status(200).json(txs)
    }
)

module.exports = {
    transactionCreate
}