const Stellar = require('stellar-sdk')
const accounts = require('./accounts.json')
const { TimeoutInfinite } = require('stellar-base')
const server = new Stellar.Server("https://horizon-testnet.stellar.org"); 


const runtransaction = async(alicePubKey, aliceSecret, bobPubkey) => {
    const standardFee = await server.fetchBaseFee(); 

    const txOptions = {
        fee: standardFee, 
        networkPassphrase: Stellar.Networks.TESTNET
    }; 

    const paymentToBob ={
        destination: bobPubkey, 
        asset: Stellar.Asset.native(), 
        amount: "100"
    }; 

    const aliceAccount = await server.loadAccount(alicePubKey); 

    const transaction = new Stellar.TransactionBuilder(aliceAccount, txOptions)
    .addOperation(Stellar.Operation.payment(paymentToBob))
    .setTimeout(TimeoutInfinite)
    .build()


    transaction.sign(aliceSecret); 

    await server.submitTransaction(transaction); 
}


const [alice, bob] = accounts; 


runtransaction(alice.publicKey, Stellar.Keypair.fromSecret(alice.secret), bob.publicKey)
.then(() => console.log("ok"))
.catch(e => {
    console.log(e)
    throw e;
})