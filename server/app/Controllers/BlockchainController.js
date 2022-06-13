const asyncHandler = require('express-async-handler');
const { status } = require('express/lib/response');
const Blockchain = require('../Blockchain/Blockchain');
const Transaction = require('../Blockchain/Transaction');
const { isChainValid } = require('../Blockchain/Validation');
const { ConnectNodes } = require('../Blockchain/Network');

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

const chainValidation = asyncHandler(
    async (req, res) => {
        res.status(200).json(isChainValid(myChain))
    }
)

const nodeConnection = asyncHandler(
    async (req, res) => {
        res.status(200).json(ConnectNodes(myChain, req))
    }
)

const chainSync = asyncHandler(
    async (req, res) => {
        // const network = myChain.nodes
        // if (network.length > 0) {
        //     for (let i = 0; i < network.length; i++) {
        //         console.log(network[i])
        //         const response = await fetch(`${network[i]}/api/chainList`);
        //         const data = await response.json();
                
        //         if (data.status == 200){
        //             const length = data.length
        //             const chainList = data.chain
        //         }
                
        //     }
        // res.status(200).json('ok')
        // }else{
        //     res.status(200).json('no')
        // }

        // const response = await fetch('http://127.0.0.1:8001/api/chainList');
        // const data = await response.json();
        // res.status(200).json(data)

        res.status(200).json(myChain.replaceChain())
    }
)


module.exports = {
    transactionCreate,
    minePendingTxs,
    chainList,
    chainValidation,
    nodeConnection,
    chainSync
}