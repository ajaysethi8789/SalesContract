const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:22000'));
var address = "0x77ff5fdedfede1b81b547571caf5ad30e99f5ca2";

var abi = [{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"}],"name":"updateVisibilityStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"date","type":"string"},{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"productDescription","type":"string"}],"name":"createSalesContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"role","type":"string"}],"name":"getSalesContractDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salesContractID","type":"uint256"},{"indexed":false,"name":"date","type":"string"},{"indexed":false,"name":"sellerName","type":"string"},{"indexed":false,"name":"buyerName","type":"string"},{"indexed":false,"name":"productDescption","type":"string"},{"indexed":false,"name":"visibilityStatus","type":"bool"}],"name":"SalesContractEvent","type":"event"}];

const myContract = new web3.eth.Contract(abi, address);
var buyer="BP";
var seller="HDFC";
var date="10-2-2019";
var productDescription="Car";



myContract.methods.createSalesContract(200,date,buyer,seller,productDescription).send({ from: '0xd6e1ced384cfdc7f4d3a603dc5015a6f32901417',gas: '50000000'}, (error, transactionHash) => {
      if (error) {
        console.log("Error Occurred in createSalesContract");
        
      }
      else{
        
      console.log("TX Submitted, Tx hash is", transactionHash);
      
      }

    });
