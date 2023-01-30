import assert from 'assert';
import ganache from 'ganache';
import Web3 from 'web3';
import inboxContract from '../compile.js'

const abi = inboxContract.abi;
const evm = inboxContract.evm

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there !'

beforeEach(async () => {
    
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there !'] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there !') 
    });

    it('can change a new message', async () => {
        await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye') 
    })
})