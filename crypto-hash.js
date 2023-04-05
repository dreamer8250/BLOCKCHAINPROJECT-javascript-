const crypto= require('crypto'); //this is module provide by js
//const hextToBinary=require("hex-to-binary");
const cryptoHash=(...inputs)=>{
      const hash=crypto.createHash("sha256");
      hash.update(inputs.join(" "));
      return hash.digest("hex");

};

result=cryptoHash("hello","world");
console.log(result);
module.exports=cryptoHash;

