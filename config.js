const INITIAL_DIFFICULTY = 2;
//const hextToBinary=require("hex-to-binary");
const MINE_RATE =1000; //1s=1000ms
const GENESIS_DATA={
    timestamp:1,
    prevHash:'0x000',
    hash:'ox123',
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    data:[],

}
module.exports={GENESIS_DATA,MINE_RATE}
