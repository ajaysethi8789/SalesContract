var express = require('express');
var router = express.Router();
const Web3 = require('web3');
var sleep = require('sleep');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const buyerNode = new Web3(new Web3.providers.HttpProvider('http://localhost:22001'));
const buyerBank = new Web3(new Web3.providers.HttpProvider('http://localhost:22002'));
const sellerBank = new Web3(new Web3.providers.HttpProvider('http://localhost:22003'));
const shipperNode = new Web3(new Web3.providers.HttpProvider('http://localhost:22004'));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

var address = "0x17e736c35671adad103b5fb3a9ad70011c637ce4";

var abi = [{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"}],"name":"updateVisibilityStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"date","type":"string"},{"name":"sellerName","type":"string"},{"name":"buyerName","type":"string"},{"name":"productDescription","type":"string"}],"name":"createSalesContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"salesContractID","type":"uint256"},{"name":"role","type":"string"}],"name":"getSalesContractDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"salesContractID","type":"uint256"},{"indexed":false,"name":"date","type":"string"},{"indexed":false,"name":"sellerName","type":"string"},{"indexed":false,"name":"buyerName","type":"string"},{"indexed":false,"name":"productDescption","type":"string"},{"indexed":false,"name":"visibilityStatus","type":"bool"}],"name":"SalesContractEvent","type":"event"}];


const myContract = new web3.eth.Contract(abi, address);



/* GET users listing. */
router.post('/approveByBuyer', function (req, res, next) {
  var salesContractID = req.body.salesContractID;

  try {

    salesContractID = parseInt(salesContractID);

    myContract.methods.updateVisibilityStatus(salesContractID).send({ from:'0x1102662f2a673c136a636e1256346c00aec62514' }, (error, transactionHash) => {
      if (error) {
        console.log("Error Occurred in updateVisibilityStatus");
        res.send("Error Occurred.").status(400);
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
        var response="";
        var error="";
  var salesContractID = req.body.salesContractID;
  var sellerName = req.body.sellerName;
  var buyerName = req.body.buyerName;
  var productDescription = req.body.productDescription;
  var date = req.body.date;
  console.log("Parameter",date,sellerName,buyerName,productDescription,salesContractID);


    salesContractID = parseInt(salesContractID);
    myContract.methods.createSalesContract(salesContractID, date,sellerName,buyerName,productDescription).send({ from: '0x1102662f2a673c136a636e1256346c00aec62514',gas: '50000000' }, (err, resp) => {
                if(err){
                        console.log("Error",err);
                        return;
                }
                else{
                console.log("Resp",resp);
                res.send("SalesContract has been Created").status(200);
        }
        });

/*myContract.methods.createSalesContract(salesContractID, date,sellerName,buyerName,productDescription).send({from: '0x1102662f2a673c136a636e1256346c00aec62514',gas:'50000000'})
.on('transactionHash', (hash) => {
    console.log("hash",hash);
})
.on('confirmation', (confirmationNumber, receipt) => {
    console.log("Con Number",confirmationNumber);

})
.on('receipt', (receipt) => {console.log("Receipt",receipt);
  })
.on('error',// res.send("Error Occurred.").status(400)
);

       res.send("SalesContract Created.").status(200);*/

  }

);

/* GET users listing. */
router.get('/getSalesContract', function (req, res, next) {
  var salesContractID = req.body.salesContractID;
  var role = req.body.role;
  var resultArray=[];
  try {

    //role = web3.utils.toHex(role);
    salesContractID = parseInt(salesContractID);
    console.log("Role After Converting to Hex", role);

        myContract.methods.getSalesContractDetails(salesContractID,role).call({from:'0x1102662f2a673c136a636e1256346c00aec62514'}, (error, result) => {
        if(error){
                console.log("Error Fetching the data");
                res.send("Error Occurred while fetching the SalesContract Data.").status(400);
                return;
        }else{
         console.log("getSalesContractDetails-->Result", result);
      console.log("getSalesContractDetails-->Result Length", result.length);
      for(var i=0;i<4;i++){
        console.log("Array Data",result[i]);
        resultArray.push(result[i]);
      }
      res.send(resultArray).status(200);
        }
})

    /*myContract.methods.getSalesContractDetails(salesContractID,role).call({from:'0x1102662f2a673c136a636e1256346c00aec62514'}).then((result) => {
 if(result){
console.log("getSalesContractDetails-->Result", result);
    console.log("getSalesContractDetails-->Result Length", result.length);
    for(var i=0;i<4;i++){
       console.log("Array Data",web3.utils.toAscii(result[i]));
       resultArray.push(web3.utils.toAscii(result[i]));
      }
     res.send(resultArray).status(200);
        }
else{
        console.log("error",result);
        res.send("Error").status(400);
        }
    });*/
  }
  catch (err) {
    console.log("In Catch Block");
    return;

  }
});

module.exports = router;
