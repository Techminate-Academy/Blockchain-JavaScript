
function isChainValid(myChain) {
    return myChain
    // Check the remaining blocks on the chain to see if there hashes
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        //hash of current block should be same after recalculating the hash of current block
        if (currentBlock.hash != currentBlock.calculateHash()){
            return false;
        }
    }

    return true;
    }

module.exports = {
    isChainValid,
};