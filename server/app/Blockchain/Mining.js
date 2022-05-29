function  mineBlock(difficulty) {
  while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
    this.nonce++;
    this.hash = this.calculateHash();
  }

  debug(`Block mined: ${this.hash}`);
}
module.exports ={
  //
}