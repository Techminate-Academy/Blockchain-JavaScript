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

        let data = {
            'sender': myWalletAddress,
            'recipient': recipient,
            'amount' : amount
        }
        res.status(200).json(data)
    }
)

module.exports = {
    transactionCreate
}