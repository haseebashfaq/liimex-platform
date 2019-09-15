(function() {

    'use strict';

    angular.module('application').
    service('endpointService', endpointService);

    endpointService.$inject = ['$rootScope', 'dynamicConfig'];

    /* Consts */
    const api_prefix = '/api';

    /* Service Function */
    function endpointService($rootScope, dynamicConfig) {

      /* New Endpoint */
      String.prototype.makeEndpoint = function(){
        return dynamicConfig.backofficeUrl.concat(api_prefix, this);
      }

      /* Instant Purchase Process */
      const INSTANT_PURSHACE_PROCESS = '/instant_purchase/process/:process_id'.makeEndpoint();
      const INSTANT_PURCHASE_QUESTIONS = '/instant_purchase/questions'.makeEndpoint();
      const INSTANT_PURCHASE_ANSWERS = '/instant_purchase/answers'.makeEndpoint();
      const INSTANT_PURCHASE_PRODUCTS = '/instant_purchase/products'.makeEndpoint();
      const INSTANT_PURCHASE_COMPARISON = '/instant_purchase/comparison'.makeEndpoint();
      const INSTANT_PURCHASE_ADDITIONALS = '/instant_purchase/additionals'.makeEndpoint();
      const INSTANT_PURCHASE_USER = '/instant_purchase/user_information'.makeEndpoint();
      const INSTANT_PURCHASE_INFORMATION = '/instant_purchase/insurance_information'.makeEndpoint();
      const INSTANT_PURCHASE_DOCUMENTS = '/instant_purchase/documents'.makeEndpoint();
      const INSTANT_PURCHASE_CHECKOUT = '/instant_purchase/checkout'.makeEndpoint();
      const INSTANT_PURCHASE_STATUS = '/instant_purchase/status'.makeEndpoint();
      const INSTANT_PURCHASE_REQUEST = '/instant_purchase/instant_product_request'.makeEndpoint();
      const INSTANT_PURCHASE_PROCESS_COMPLETE = '/instant_purchase/process_complete'.makeEndpoint();

      /* Company */
      const COMPANY = '/company/:company_id'.makeEndpoint();

      /* Mandate */
      const MANDATE = '/company/:company_id/mandate'.makeEndpoint();

      /* Return Stuff */
      return {
        INSTANT_PURSHACE_PROCESS,
        INSTANT_PURCHASE_QUESTIONS,
        INSTANT_PURCHASE_ANSWERS,
        INSTANT_PURCHASE_PRODUCTS,
        INSTANT_PURCHASE_COMPARISON,
        INSTANT_PURCHASE_ADDITIONALS,
        INSTANT_PURCHASE_USER,
        INSTANT_PURCHASE_INFORMATION,
        INSTANT_PURCHASE_DOCUMENTS,
        INSTANT_PURCHASE_CHECKOUT,
        INSTANT_PURCHASE_STATUS,
        INSTANT_PURCHASE_REQUEST,
        COMPANY,
        MANDATE,
        INSTANT_PURCHASE_PROCESS_COMPLETE
      }
    }
})();
