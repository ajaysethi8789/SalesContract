var express = require('express');
var router = express.Router();
const Web3 = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:22000'));
const buyerNode = new Web3(new Web3.providers.HttpProvider('http://localhost:22001'));
const buyerBank = new Web3(new Web3.providers.HttpProvider('http://localhost:22002'));
const sellerBank = new Web3(new Web3.providers.HttpProvider('http://localhost:22003'));
const shipperNode = new Web3(new Web3.providers.HttpProvider('http://localhost:22004'));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

var address = "0x77ff5fdedfede1b81b547571caf5ad30e99f5ca2";

var abi = [{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"}],"name":"updateVisibilityStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"date","type":"string"},{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"productDescription","type":"string"}],"name":"createSalesContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"role","type":"string"}],"name":"getSalesContractDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salesContractID","type":"uint256"},{"indexed":false,"name":"date","type":"string"},{"indexed":false,"name":"sellerName","type":"string"},{"indexed":false,"name":"buyerName","type":"string"},{"indexed":false,"name":"productDescption","type":"string"},{"indexed":false,"name":"visibilityStatus","type":"bool"}],"name":"SalesContractEvent","type":"event"}];


const myContract = new web3.eth.Contract(abi, address);



/* GET users listing. */
router.post('/approveByBuyer', function (req, res, next) {
  var salesContractID = req.body.salesContractID;

  try {

    salesContractID = parseInt(salesContractID);

    myContract.methods.updateVisibilityStatus(salesContractID).send({ from: '0xd6e1ced384cfdc7f4d3a603dc5015a6f32901417' }, (error, transactionHash) => {
      if (error) {
        console.log("Error Occurred in updateVisibilityStatus");
        res.send(error).status(400);
      }
      console.log("TX Submitted, Tx hash is", transactionHash);
      res.send('updateVisibilityStatus changed.').status(200);
    });
  }
  catch (err) {
    res.sendStatus(500);
    return;

  }

});

/* GET users listing. */
router.post('/createSalesContract', function (req, res, next) {
  var salesContractID = req.body.salesContractID;
  var sellerName = req.body.sellerName;
  var buyerName = req.body.buyerName;
  var productDescription = req.body.productDescription;
  var date = req.body.date;
  console.log("Parameter",date,sellerName,buyerName,productDescription,salesContractID);
 

    date = web3.utils.toHex(date);
    sellerName = web3.utils.toHex(sellerName);
    buyerName = web3.utils.toHex(buyerName);
    productDescription = web3.utils.toHex(productDescription);
    salesContractID = parseInt(salesContractID);

console.log("Parameter in try block",date,sellerName,buyerName,productDescription,salesContractID);

    myContract.methods.createSalesContract(salesContractID, date,sellerName,buyerName,productDescription).send({ from: '0xd6e1ced384cfdc7f4d3a603dc5015a6f32901417',gas: '50000000' }, (error, transactionHash) => {
      if (error) {
        console.log("Error Occurred in createSalesContract");
        res.send(error).status(400);
      }
      else{
        
      console.log("TX Submitted, Tx hash is", transactionHash);
      res.send('SalesContract Created.').status(200);
      }

    });
  }
  
);

/* GET users listing. */
router.post('/getSalesContract', function (req, res, next) {
  var salesContractID = req.body.salesContractID;
  var role = req.body.role;
  var resultArray=[];
  try {

    //role = web3.utils.toHex(role);
    salesContractID = parseInt(salesContractID);
    console.log("Role After Converting to Hex", role);

    myContract.methods.getSalesContractDetails(salesContractID,role).call({from:'0xd6e1ced384cfdc7f4d3a603dc5015a6f32901417'}).then((result) => {
      console.log("getSalesContractDetails-->Result", result);
      console.log("getSalesContractDetails-->Result Length", result.length);
      for(var i=0;i<4;i++){
        console.log("Array Data",web3.utils.toAscii(result[i]));
        resultArray.push(web3.utils.toAscii(result[i]));
      }
      res.send(resultArray).status(200);
    });
  }
  catch (err) {
    res.sendStatus(500);
    return;

  }
});

module.exports = router;
