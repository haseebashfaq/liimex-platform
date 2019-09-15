(function() {

    'use strict';

    angular.module('application').
    service('backofficeService', backofficeService);

    backofficeService.$inject = ['$rootScope', 'requestService'];

    function backofficeService($rootScope, requestService) {

      /* Endpoints */
      const API_LOG = '/api/log';
      const API_EMAIL = '/api/email/';
      const API_COUNTRIES = '/api/countries';
      const API_MANDATE = '/api/company/:company_uid/mandate';
      const API_INIT_MANDATE = '/api/company/:company_uid/mandate/init';

        /* Get Office Logs */
        function logpost(logs_object, user, program, level, callback, err_call){
          const params = {
                logs_object:logs_object,
                user:user,
                program:program,
                level:level,
                source:'platform'
          };
          requestService.postLiimexResourceWithParams($rootScope.backoffice_url + API_LOG, params, callback, err_call);
        }

        /* Email Check Post */
        function emailcheckpost(email, callback, err_call){
          const params = {email};
          requestService.postLiimexResourceWithParams($rootScope.backoffice_url + API_EMAIL, params, callback, err_call);
        }

        /* Get Countries */
        function getcountries(callback, err_call){
          requestService.getResource($rootScope.backoffice_url + API_COUNTRIES, {}, callback, err_call);
        }

        function postMandate(mandate_data, callback, err_call) {
            const request_url = $rootScope.backoffice_url + API_MANDATE.replace(':company_uid', mandate_data.company_uid);
            requestService.postLiimexResourceWithParams(request_url, mandate_data, callback, err_call);
        }

        function initMandate(company_uid, callback, err_call) {
            const request_url = $rootScope.backoffice_url + API_INIT_MANDATE.replace(':company_uid', company_uid);
            requestService.postLiimexResourceWithParams(request_url, {}, callback, err_call);
        }

        /* Return Stuff */
        return {
            logpost,
            emailcheckpost,
            getcountries,
            postMandate,
            initMandate
        }
    }
})();
