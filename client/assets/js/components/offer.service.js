(function() {

  'use strict';

  angular.module('application').
  service('offerService', offerService);

  offerService.$inject = ['$rootScope', 'firebase', '$firebaseObject','requestService', 'fileService'];

  /* Endpoints */
  const prefix = 'offers';
  const policy_prefix = 'policies';
  const company_prefix = 'companies';

  /* Model */
  var model = {};

  /* Offer Service */
  function offerService($rootScope, firebase, $firebaseObject, requestService, fileService) {

    /* Get Single Offer */
    function getSingleOffer(offer_uid, callback, err_call){
      requestService.getDataOnce([prefix, offer_uid], callback, err_call);
    }

    /* Change Status of Offer */
    function changeStatus(offer_uid, status, callback, err_call){
      requestService.updateData([prefix, offer_uid], {status:status}, callback, err_call);
    }

    /* Download File */
    function downloadFile(file_url, company_uid, callback, err_call){
      fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_url, callback, err_call);
    }

    /* Appect Offer */
    function appectOffer(offer_uid, offer, comparison_uid, subject, callback, err_call){
      requestService.getMultipleKeys([{
        name:'offer', route:[prefix, offer_uid]
      }], keys => {
        var newUpdate = {}, now = requestService.getTimestamp();
        newUpdate[keys['offer'].route+'/status'] = 'accepted';
        newUpdate[keys['offer'].route+'/notified'] = false;
        newUpdate[keys['offer'].route+'/updated_at'] = now;
        newUpdate[keys['offer'].route+'/chosen_comparison'] = comparison_uid;
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Request Offer With Insurance Type */
    function requestOfferWithInsuranceType(company_uid, subject, callback, err_call){
      requestService.getMultipleKeys([{
        name:'company', route:[company_prefix, company_uid, prefix]
      },{
        name:'offer', route:[prefix]
      }], keys => {
        var newUpdate = {}, now = requestService.getTimestamp();
        newUpdate[keys['company'].route+keys['offer'].key] = true;
        newUpdate[keys['offer'].route+keys['offer'].key] = {
          company:company_uid, status:'requested', subject:subject,created_at:now, updated_at:now, notified:false
        }
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Get and Store Sigle Offer */
    function getAndStoreSingleOffer(key, callback, err_call){
      if($rootScope.company.offers[key]===true && model[key]){
        console.log('Returning offer model');
        callback(model[key]);
        return;
      } else if($rootScope.company.offers[key] !== true){
        err_call('PERMISSION_DENIED');
        return;
      }
      requestService.on_child_value([prefix, key], offer => {
        console.log('Updating offer');
        model[key] = offer;
        callback(model[key]);
      }, error => {
        err_call(error);
      });
    }

    /* Request Multiple Offers At Once */
    function requestMultipleOffers(insuranceTypesAndProductsDict, company_uid, callback, err_call) {
      const keyArray = [];
      insuranceTypesAndProductsDict
      for(let insuranceTypeKey in insuranceTypesAndProductsDict){
        keyArray.push({
          name:insuranceTypeKey+'offer',
          route:[prefix]
        });
      }

      requestService.getMultipleKeys(keyArray, keys => {
        var newUpdate = {}, now = requestService.getTimestamp();
        for(let insuranceTypeKey in insuranceTypesAndProductsDict){
          newUpdate[company_prefix+'/'+company_uid+'/'+prefix+'/'+keys[insuranceTypeKey+'offer'].key] = true;
          newUpdate[keys[insuranceTypeKey+'offer'].route+keys[insuranceTypeKey+'offer'].key] = {
            company:company_uid,
            status:'requested',
            display_version: 2,
            insurance_report_generated:false,
            subject:insuranceTypeKey,
            created_at:now,
            updated_at:now,
            notified:false,
            products: insuranceTypesAndProductsDict[insuranceTypeKey]
          };
        }
        requestService.multiPathUpdate(newUpdate, callback, err_call);
      });
    }

    /* Return Stuff */
    return {
      downloadFile : downloadFile,
      getSingleOffer : getSingleOffer,
      changeStatus : changeStatus,
      appectOffer : appectOffer,
      getAndStoreSingleOffer : getAndStoreSingleOffer,
      requestOfferWithInsuranceType : requestOfferWithInsuranceType,
      requestMultipleOffers : requestMultipleOffers
    }
  }
})();
