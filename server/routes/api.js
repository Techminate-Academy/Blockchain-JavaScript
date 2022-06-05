const express = require('express')
const router = express.Router()

const { generateKeys } = require('../app/Controllers/WalletController')

router.get('/generateKeys', generateKeys)

module.exports = router