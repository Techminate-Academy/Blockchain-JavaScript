
function isChainValid(chain) {
    // Check the remaining blocks on the chain to see if there hashes
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
        }

        if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
        }
    }

    return true;
    }

module.exports = {
    isChainValid,
};