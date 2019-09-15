(function() {

  'use strict';

  angular.module('application').
  service('apiService', apiService);

  apiService.$inject = ['$rootScope', '$resource', 'endpointService'];

  /* Service Function */
  function apiService($rootScope, $resource, endpointService) {

    // /* Instant Purchase Process */
    // const InstantPurchaseProcess = $resource(endpointService.INSTANT_PURSHACE_PROCESS, {
    //   process_id : false
    // }, {
    //   new : {method: 'POST'},
    //   get : {method: 'GET'}
    // });

    /* Get Instant Product Questions */
    const InstantPurchaseQuestions = $resource(endpointService.INSTANT_PURCHASE_QUESTIONS);

    /* Save Instant Product Answers */
    const InstantPurchaseAnswers = $resource(endpointService.INSTANT_PURCHASE_ANSWERS);

    /* Get Instant Product Comparison */
    const InstantPurchaseComparisons = $resource(endpointService.INSTANT_PURCHASE_COMPARISON);

    /* Save Instant Product Comparison */
    const InstantPurchaseComparisonAnswers = $resource(endpointService.INSTANT_PURCHASE_COMPARISON);

    /* Get Additional Instant Product Comparison */
    const InstantPurchaseAdditionalComparisons = $resource(endpointService.INSTANT_PURCHASE_ADDITIONALS);

    /* Save Additional Instant Product Comparison */
    const InstantPurchaseAdditionalComparisonAnswers = $resource(endpointService.INSTANT_PURCHASE_ADDITIONALS);

    /* Save User */
    const InstantPurchaseUser = $resource(endpointService.INSTANT_PURCHASE_USER);

    /* Get User */
    const InstantPurchaseUserInfo = $resource(endpointService.INSTANT_PURCHASE_USER);

    /* Get the whole Instant Product object */
    const InstantPurchaseRequest = $resource(endpointService.INSTANT_PURCHASE_REQUEST, null, {
      get : {method: 'GET', cancellable: true},
      save : {method: 'POST', cancellable: true},
      update : {method: 'PUT', cancellable: true}
    });

    /* Save the document */
    const InstantPurchaseUpload = $resource(endpointService.INSTANT_PURCHASE_DOCUMENTS);

    /* Mandate */
    const Mandate = $resource(endpointService.MANDATE, {
      company_id : false
    }, {
      sign : {method: 'POST'}
    });

    // /* Company */
    const Company = $resource(endpointService.COMPANY);

    /* Checkout */
    const InstantPurchaseCheckout = $resource(endpointService.INSTANT_PURCHASE_CHECKOUT);

    /* Process Complete */
    const InstantPurchaseProcessComplete = $resource(endpointService.INSTANT_PURCHASE_PROCESS_COMPLETE);

    /* Return Stuff */
    return {
      InstantPurchaseQuestions,
      InstantPurchaseAnswers,
      InstantPurchaseComparisons,
      InstantPurchaseComparisonAnswers,
      InstantPurchaseAdditionalComparisons,
      InstantPurchaseAdditionalComparisonAnswers,
      InstantPurchaseUser,
      InstantPurchaseUserInfo,
      InstantPurchaseRequest,
      InstantPurchaseUpload,
      Company,
      Mandate,
      InstantPurchaseCheckout,
      InstantPurchaseProcessComplete
    }
  }
})();
