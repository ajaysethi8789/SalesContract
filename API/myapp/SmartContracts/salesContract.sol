pragma solidity ^0.4.24;

contract SaleContract {
    
    string shipperRole="shipper";
    string buyerRole="buyer";
    
    struct SalesContract{
        uint salesContractID;
        string date;
        string sellerName;
        string buyerName;
        string productDescription;
        bool visibilityStatus;
    }

    mapping(uint=>SalesContract) SalesContractList;

//Order event
  event SalesContractEvent(
        uint256 salesContractID,
        string date,
        string sellerName,
        string buyerName,
        string productDescption,
        bool visibilityStatus

  );


 

   // Function to create a SalesContract
  function createSalesContract(uint salesContractID,string date,string sellerName,string buyerName,string productDescription) public  {

        require(SalesContractList[salesContractID].salesContractID != salesContractID);
      SalesContract sc = SalesContractList[salesContractID];
      sc.salesContractID=salesContractID;
      sc.date=date;
      sc.sellerName=sellerName;
      sc.buyerName=buyerName;
      sc.productDescription=productDescription;
      sc.visibilityStatus=false;


  }
  
  function getSalesContractDetails(uint256 salesContractID,string role) view returns(
 string,string,string,string){

require(SalesContractList[salesContractID].salesContractID !=0);

if(SalesContractList[salesContractID].visibilityStatus == false){
    require(keccak256(role) == keccak256(buyerRole));
}
else{
    require(SalesContractList[salesContractID].visibilityStatus == true);
}
require(keccak256(role) != keccak256(shipperRole));

    return(
     SalesContractList[salesContractID].date,
     SalesContractList[salesContractID].sellerName,
     SalesContractList[salesContractID].buyerName,
     SalesContractList[salesContractID].productDescription
     );
 }
 
 function updateVisibilityStatus(uint256 salesContractID)  {
     require(SalesContractList[salesContractID].salesContractID !=0);
     SalesContractList[salesContractID].visibilityStatus=true;
 }

}
