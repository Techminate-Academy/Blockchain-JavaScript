const asyncHandler = require('express-async-handler')
const Blockchain = require('../Blockchain/Blockchain');
const Transaction = require('../Blockchain/Transaction');
const EC = require('elliptic').ec;

let myChain = new Blockchain();
const ec = new EC('secp256k1');

const transactionCreate = asyncHandler(
    async (req, res) => {
        const { recipient, amount } = req.body

        const myKeyPair = ec.keyFromPrivate(process.env.privateKey)
        const myWalletAddress = myKeyPair.getPublic('hex');

        const txs = new Transaction(myWalletAddress, recipient, amount)
        txs.signTransaction(myKeyPair)

        console.log('adding transaction to pending list....')
        myChain.addTransaction(txs)

        res.status(200).json(myChain.getPendingTxs())
    }
)

const minePendingTxs = asyncHandler(
    async (req, res) => {
        myChain.minePendingTransactions(process.env.minorWallet)
        console.log('Block successfully mined!');
        res.status(200).json('Block successfully mined!')
    }
)

const chainList = asyncHandler(
    async (req, res) => {
        res.status(200).json(myChain.getChain())
    }
)


module.exports = {
    transactionCreate,
    minePendingTxs,
    chainList
}