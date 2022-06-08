const asyncHandler = require('express-async-handler');
const { status } = require('express/lib/response');
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

        const txs = new Transaction(myWalletAddress, recipient, Number(amount))
        txs.signTransaction(myKeyPair)

        console.log('adding transaction to pending list....')
        myChain.addTransaction(txs)

        res.status(200).json(myChain.getPendingTxs())
    }
)

const minePendingTxs = asyncHandler(
    async (req, res) => {
        statusMining = myChain.minePendingTransactions(process.env.minorWallet)
        res.status(200).json(statusMining)
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