
const Block = require('./Block');
const Transaction = require('./Transaction');
const { isChainValid } = require('./Validation');
const fetch = require('node-fetch');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.nodes = [];
  }

  /**
   * @returns {Block}
   */
  createGenesisBlock() {
    return new Block(Date.now(), [], '0');
  }

  /**
   * Returns the latest block on our chain. Useful when you want to create a
   * new Block and you need the hash of the previous Block.
   *
   * @returns {Block[]}
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Returns the list of blocks in the chain
   *
   */
  getChain() {
    return {
      'length': this.chain.length,
      'blockchain' : this.chain
    };
  }

  /**
   * creates a new block 
   * includes the block to the chain
   *
   */

  // addBlock(newBlock){
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.hash = newBlock.calculateHash();
  //   newBlock.mineBlock(this.difficulty)
  //   this.chain.push(newBlock);
  // }

  minePendingTransactions(miningRewardAddress) {
    if (this.pendingTransactions.length > 0) {
      const txsMiningReward = new Transaction(null, miningRewardAddress, this.miningReward);
      this.pendingTransactions.push(txsMiningReward);

      const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
      block.mineBlock(this.difficulty);

      console.log('Block successfully mined!');
      this.chain.push(block);

      this.pendingTransactions = [];
      return 'Block successfully mined!'
    } else {
      return 'nothing to mine'
    }
  }

  addTransaction(txs) {
    if (!txs.fromAddress || !txs.toAddress) {
      throw new Error('Transaction must include from and to address');
    }

    // Verify the transactiion
    if (!txs.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }

    this.pendingTransactions.push(txs)
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const txs of block.transactions) {
        if (txs.fromAddress === address) {
          balance -= txs.amount;
        }

        if (txs.toAddress === address) {
          balance += txs.amount;
        }
      }
    }

    console.log('getBalanceOfAdrees:', balance);
    return balance;
  }

  getPendingTxs() {
    return this.pendingTransactions;
  }

  addNodes(address) {
    this.nodes.push(address)
  }

  // async replaceChain() {
  //   const network = this.nodes
    
  //   let longestChain = null
  //   let maxLength = this.chain.length

  //   if (network.length > 0) {
  //     for (let i = 0; i < network.length; i++) {
  //       return fetch(`http://127.0.0.1:8000/chainList`)
        
  //       if (data.status == 200){
  //         const length = data.length
  //         const chainList = data.chain

  //         if (length > maxLength && isChainValid(chainList)){
  //           maxLength = length
  //           longestChain = chainList
  //         }
  //       }
  //     }
  //     if (longestChain != null){
  //       this.chain = longestChain
  //       return true
  //     }else{
  //       return false
  //     }
  //   }else{
  //     return 'connect to network first'
  //   }
  // }

  async replaceChain() {
    const network = this.nodes
    let longestChain = null
    let maxLength = this.chain.length

    if (network.length > 0) {
      for (let i = 0; i < network.length; i++) {
        console.log(network[i])
        const response = await fetch(`${network[i]}/api/chainList`);
        const data = await response.json();
        
        console.log(JSON.stringify(data, null, 4))

        if (response.status == 200){
          const length = data.length
          const chainList = data.blockchain
          console.log(length)
          console.log(JSON.stringify(chainList, null, 4))

          if (length > maxLength && isChainValid(JSON.stringify(chainList, null, 4))){
            maxLength = length
            longestChain = chainList
          }
        }
      }
      return 'ok'
      // if (longestChain != null){
      //   this.chain = longestChain
      //   return true
      // }else{
      //   return false
      // }
    }else{
      return 'connect to network first'
    }
  }

}

module.exports = Blockchain;