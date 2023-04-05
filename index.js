const express =require('express');
const bodyParser=require('body-parser');
const Blockchain=require('./blockchain');
const request = require('request')
const PubSub=require("./publishsubscribe")

const app =express();
const blockchain = new Blockchain();
const pubsub = new PubSub(({blockchain}))

const DEFULT_PORT =3000;
const ROOT_NODE_ADDRESS =`http://localhost:${DEFULT_PORT}`;
setTimeout(()=> pubsub.broadcastChain(),1000);

app.use(bodyParser.json())
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})

app.post("/api/mine",(req,res)=>{
    const{data}=req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks') //return to main page means goes to app.get
})

//we need any expres bcz json does  not capable to write data to directly so thats why we need midnware.

const synChains=()=>{
    request(
        {url:`${ROOT_NODE_ADDRESS}/api/blocks`},
        (error,reposnse,body)=>{
       if(!error && reposnse.statusCode===200){
        const rootChain = JSON.parse(body);
        console.log('Replace chain on sync with',rootChain)
        blockchain.replacechain(rootChain)
       } 
    })
}
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT || DEFULT_PORT ;
app.listen(PORT,()=>{
    
   console.log(`listening to PORT http://localhost:${PORT}`);
   synChains();
});