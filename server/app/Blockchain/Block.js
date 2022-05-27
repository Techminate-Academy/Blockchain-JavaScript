const crypto = require('crypto');

class Block {
    /**
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    constructor(timestamp, transactions, previousHash = '') {
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
      this.timestamp = timestamp;
      this.transactions = transactions;
    }
  
    /**
     * Returns the SHA256 of this block (by processing all the data stored
     * inside this block)
     *
     * @returns {string}
     */
    calculateHash() {
      return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
    }
}
module.exports = Block;