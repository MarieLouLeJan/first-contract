import * as dotenv from 'dotenv'
dotenv.config()
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import inboxContract from './compile.js'

const abi = inboxContract.abi;
const evm = inboxContract.evm;

const mnemonicPhrase = process.env.MNEMONIC_PHRASE
const infuraUrl = process.env.INFURA_URL

// console.log('mnemonicPhrase', mnemonicPhrase)
// console.log('url', infuraUrl)
// console.log('abi', abi)
// console.log('evm', evm)

const provider = new HDWalletProvider({
    mnemonic : {
        phrase: mnemonicPhrase
    }, 
    providerOrUrl: 'https://goerli.infura.io/v3/05d4b879233249e0b075b66657ceeba6'
});


const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000', });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();