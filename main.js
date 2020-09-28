const SHA256 = require('crypto-js/SHA256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;

    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();

    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined  " + this.hash);
    }

}

class Blockchain {
    constructor() {
        this.chain = [
            this.createGenesisBlock()
        ];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "30/04/2019", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            const nextBlock = this.chain[i + 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                let errorIndex = currentBlock.index;
                let efalse = "Data Error in Index " + errorIndex;
                return efalse;
            }
            if (currentBlock.previousHash != previousBlock.hash) {
                let errorIndex = currentBlock.index;
                let efalse = "Hash Value Error in Index " + (errorIndex - 1) + " and " + (errorIndex) + "\n" + "Index " + (errorIndex - 1) + ".CurrentHash are not eqqual to " + (errorIndex) + ".Previous Hash";
                return efalse;
            }

            // if (currentBlock.hash != nextBlock.previousHash){
            //     return false;
            // }


        }
        return true;

    }

}

let indVerify = new Blockchain();

console.log("Mining Block......1");
indVerify.addBlock(new Block(1, "31/04/2019", {amount: 30}));

console.log("Mining Block......2");
indVerify.addBlock(new Block(2, "1/05/2019", {amount: 70}));

console.log("Mining Block......3");
indVerify.addBlock(new Block(3, "2/05/2019", {amount: 80}));

indVerify.chain[1].data = {amount: 140};
indVerify.chain[1].hash = indVerify.chain[1].calculateHash();


console.log(JSON.stringify(indVerify, null, 10));
console.log("Validity Check " + indVerify.isChainValid())