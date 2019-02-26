const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var address = "0x88a711d15ddea641d10c4c15d1d7750fed67b0cf";

var abi = [{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"}],"name":"updateVisibilityStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"date","type":"string"},{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"productDescription","type":"string"}],"name":"createSalesContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"role","type":"string"}],"name":"getSalesContractDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salesContractID","type":"uint256"},{"indexed":false,"name":"date","type":"string"},{"indexed":false,"name":"sellerName","type":"string"},{"indexed":false,"name":"buyerName","type":"string"},{"indexed":false,"name":"productDescption","type":"string"},{"indexed":false,"name":"visibilityStatus","type":"bool"}],"name":"SalesContractEvent","type":"event"}];

const myContract = new web3.eth.Contract(abi, address);

/*myContract.methods.createSalesContract(100,"01-02-29","A","B","bike").send({from: '0x1102662f2a673c136a636e1256346c00aec62514',gas:'5000000'})
.then((receipt) => {
        console.log("Receipt",receipt);
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
});*/
/*myContract.methods.getSalesContractDetails(101,"br").call({from: '0x1102662f2a673c136a636e1256346c00aec62514'}, (error, result) => {
        if(error){
    console.log("error");
        }else{
        console.log("result");
}
});*/

myContract.methods.createSalesContract(5000,"01-02-29","A","B","bike").send({from: '0x1102662f2a673c136a636e1256346c00aec62514',gas:'50000000'})
.on('transactionHash', (hash) => {
    console.log("hash",hash);
})
.on('confirmation', (confirmationNumber, receipt) => {
    console.log("Con Number",confirmationNumber);
        console.log("receipt",receipt);
})
.on('receipt', (receipt) => {console.log("Receipt",receipt);
  })
.on('error', console.error);
