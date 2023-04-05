const { time } = require("console");
const Block = require("./block");
const cryptoHash = require("./crypto-hash");



class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];

    }
    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock : this.chain[this.chain.length-1],
            data,

        });
        this.chain.push(newBlock);
    }


    replacechain(chain){
        if(chain.length<=this.chain.length){
            console.error("the incoming chain is not longer")
            return;

        }
        if(!Blockchain.isvalidchain(chain))
        {
            console.log("the incoming chain is not valid")
            return;
        }
        this.chain=chain;
        
    }


    static isvalidchain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis()))
         return false;
         for(let i=1;i<chain.length;i++)
         {
            const {timestamp,prevhash,hash,nonce,difficulty,data}=chain[i];
            const lastdifficulty=chain[i-1].difficulty;
            const reallastHash=chain[i-1].hash;

            if(prevhash!==reallastHash) return false;

            const validtedhash=cryptoHash(timestamp,prevhash,nonce,difficulty,date);
            if(hash!==validtedhash) return false;
            if(Math.abs(lastdifficulty-difficulty) > 1 ) return false;
         }
         return true;


    }


    
}

const blockchain = new Blockchain();
blockchain.addBlock({data:"Block1"});
blockchain.addBlock({data:"Block2"});

//const result = Blockchain.isvalidchain(blockchain.chain);
//console.log(result);
console.log(blockchain);
module.exports=Blockchain;
