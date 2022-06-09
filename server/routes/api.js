const express = require('express')
const router = express.Router()

const {
    generateKeys
} = require('../app/Controllers/WalletController')
const {
    chainList,
    transactionCreate,
    minePendingTxs,
    chainValidation,
    nodeConnection
} = require('../app/Controllers/BlockchainController')

router.get('/generateKeys', generateKeys)
router.post('/transactionCreate', transactionCreate)
router.get('/minePendingTxs', minePendingTxs)

router.get('/chainList', chainList)
router.get('/chainValidation', chainValidation)

router.post('/nodeConnection', nodeConnection)

module.exports = router