(function() {

  'use strict';

  angular.module('application').
  service('instantService', instantService);

  instantService.$inject = ['$rootScope', 'apiService'];

  /* Service Function */
  function instantService($rootScope, apiService) {

    let InstantProcess = null;
    let InstantPurchaseRequest = null;
    const InstantProcessResult = {};

    /* Get Instant Process */
    function getInstantProcess(process_id, page_number, callback, err_call){
      if(InstantProcess){
        InstantProcess.$cancelRequest()
      }
      InstantProcess = apiService.InstantPurchaseRequest.get({
        instant_product_request_id: process_id,
        page_number: page_number
      }, data => {
        InstantProcessResult.process_id = process_id;
        InstantProcessResult.data = data;
        callback(data);
      }, err_call)
    }

    /* Post New Instant Process */
    function postInstantProcess(product_id, callback, err_call){
      InstantPurchaseRequest = new apiService.InstantPurchaseRequest();
      InstantPurchaseRequest.product_id = product_id;
      InstantPurchaseRequest.$save(callback, err_call);
    }

    /* Update Current Instant Process */
    function updateInstantProcess(page_number, instant_product_request_id, page_data, callback, err_call){
      InstantPurchaseRequest = new apiService.InstantPurchaseRequest();
      InstantPurchaseRequest.page_data = page_data;
      InstantPurchaseRequest.$update({page_number,
      instant_product_request_id}, callback, err_call);
    }

    /* Save User */
    function saveUser(type, process_id, data, page_number, callback, err_call){
      const InstantPurchaseUser = new apiService.InstantPurchaseUser({"type":type,
      "instant_product_request_id":process_id,
      "user":data,
      "page_number":page_number});
      InstantPurchaseUser.$save(signup=>{
        callback(signup);
      }, error=>{
        err_call(error.data.error);
      });
    }

    function saveCheckout(page_number, instant_product_request_id, page_data, callback, err_call){
      const InstantPurchaseCheckout = new apiService.InstantPurchaseCheckout({"instant_product_request_id":instant_product_request_id,
      "checkout":page_data,
      "page_number":page_number});
      InstantPurchaseCheckout.$save(checkout=>{
        callback(checkout);
      }, error=>{
        err_call(error.data.error);
      });
    }

    function processComplete(instant_product_request_id, callback, err_call){
      const InstantPurchaseProcessComplete = new apiService.InstantPurchaseProcessComplete({"instant_product_request_id":instant_product_request_id, "process_status":"completed"});
      InstantPurchaseProcessComplete.$save(process_complete=>{
        callback(process_complete);
      }, error=>{
        err_call(error.data.error);
      });
    }

    /* Return Stuff */
    return {
      getInstantProcess,
      postInstantProcess,
      updateInstantProcess,
      saveUser,
      saveCheckout,
      processComplete
    }
  }
})();
