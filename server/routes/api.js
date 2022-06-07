const express = require('express')
const router = express.Router()

const { generateKeys } = require('../app/Controllers/WalletController')
const { transactionCreate } = require('../app/Controllers/TransactionController')

router.get('/generateKeys', generateKeys)
router.post('/transactionCreate', transactionCreate)

module.exports = router