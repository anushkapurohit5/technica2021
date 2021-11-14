const fs = require('fs')
const Stellar = require('stellar-sdk')

const fileName = "accounts.json"

fs.writeFileSync(
    fileName, 
    JSON.stringify(
        ["ALICE","Bob"].map(name => {
            const pair = Stellar.Keypair.random(); 

            return{
                name, 
                secret: pair.secret(), 
                publicKey: pair.publicKey() 
            }; 

            }
        )
    )
);