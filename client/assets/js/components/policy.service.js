(function() {

    'use strict';

    angular.module('application').
    service('policyService', policyService);

    policyService.$inject = ['$rootScope', 'firebase', '$firebaseObject','requestService', 'fileService'];

    /* Endpoints */
    const prefix = 'policies';
    const recommendations_prefix = 'recommendations';
    const recommended_suffix = 'recommended'
    const company_prefix = 'companies';
    const offer_prefix = 'offers';
    const mandates_prefix = 'mandates';

    /* Model */
    var model = {}

    function policyService($rootScope, firebase, $firebaseObject, requestService, fileService) {

        /* Register Existing Policy From Recommendation */
        function registerExistingPolicyFromRecommendation(company_uid, recommend_uid = '', recommendation_uid, newUpdateDocuments, document_list, callback, err_call){

          var document_map = {}
          for(var key in document_list){
            document_map[document_list[key].key] = document_list[key]
          }
          requestService.getMultipleKeys([{
            name:'company', route:[company_prefix, company_uid, prefix]
          },{
            name:'policy', route:[prefix]
          },{
            name:'recommendation', route:[recommendations_prefix, recommendation_uid, recommended_suffix, recommend_uid]
          }], keys => {
            var newUpdate = {}, now = requestService.getTimestamp();
            newUpdate[keys['company'].route+keys['policy'].key] = true;
            newUpdate[keys['policy'].route+keys['policy'].key] = {
              company:company_uid, status:'pending', subject:recommend_uid, created_at: now, updated_at:now, documents:document_map,display_version: 2
            }
            newUpdate[keys['recommendation'].route+'uploaded'] = true;
            newUpdate[keys['recommendation'].route+'policy'] = keys['policy'].key;
            Object.assign(newUpdate, newUpdateDocuments);
            requestService.multiPathUpdate(newUpdate, callback, err_call);
          });
        }

        //TODO: this function is not called anywhere, decide weather we need it.
        /* Register Existing Policy */
        function registerExistingPolicy(company_uid, file_url, callback, err_call){
          requestService.getMultipleKeys([{
            name:'company', route:[company_prefix, company_uid, prefix]
          },{
            name:'policy', route:[prefix]
          }], keys => {
            var newUpdate = {}, now = requestService.getTimestamp();;
            newUpdate[keys['company'].route+keys['policy'].key] = true;
            newUpdate[keys['policy'].route+keys['policy'].key] = {
              file:file_url, company:company_uid, status:'pending', created_at:now, updated_at:now, display_version: 2
            }
            requestService.multiPathUpdate(newUpdate, callback, err_call);
          });
        }

        /* Get and Store Sigle Policy */
        function getAndStoreSinglePolicy(key, callback, err_call){
          if($rootScope.company.policies[key]===false){
            return;
          }
          if($rootScope.company.policies[key]===true && model[key]){
            console.log('Returning policy model');
            callback(model[key]);
            return;
          }
          requestService.on_child_value([prefix, key], policy => {
            console.log('Updating policy');
            model[key] = policy;
            callback(model[key]);
          }, error => {
            err_call(error);
          });
        }

        /* Get Pending Policies */
        function getPoliciesWithFilter(sort_param, sort_value, callback, err_call){
          requestService.getDataOnceEqualTo([prefix], sort_param, sort_value, callback, err_call);
        }

        //TODO: this function is not called anywhere, decide weather we need it.
        /* Save Policy */
        function savePolicy(policy_uid, data, callback, err_call){
          requestService.updateData([prefix, policy_uid], data, callback, err_call)
        }

        /* Change Policy Status */
        function change_policy_status(policy_uid, status, callback, err_call){
          requestService.updateData([prefix, policy_uid], {status:status}, callback, err_call)
        }

        /* Delete Policy */
        function delete_policy(company_uid, policy_uid, callback, err_call){
          requestService.getMultipleKeys([{
            name:'company', route:[company_prefix, company_uid, prefix, policy_uid]
          },{
            name:'policy', route:[prefix, policy_uid]
          }], keys => {
            var newUpdate = {}, now = requestService.getTimestamp();;
            newUpdate[keys['company'].route] = false;
            newUpdate[keys['policy'].route+'status'] = 'deleted';
            newUpdate[keys['policy'].route+'updated_at'] = now;
            requestService.multiPathUpdate(newUpdate, callback, err_call);
          });
        }

        /* Upload Policy */
        function uploadPolicy(fileItem, company_uid, callback, err_call){
          fileService.uploadFileWithCustomEndpoint([prefix, company_uid], "", fileItem, callback, err_call);
        }

        /* Download Policy */
        function downloadPolicy(file_url, company_uid, callback, err_call){
          fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_url, callback, err_call);
        }

        /* Return Stuff */
        return {
            savePolicy : savePolicy,
            uploadPolicy : uploadPolicy,
            downloadPolicy : downloadPolicy,
            getPoliciesWithFilter : getPoliciesWithFilter,
            registerExistingPolicyFromRecommendation : registerExistingPolicyFromRecommendation,
            getAndStoreSinglePolicy : getAndStoreSinglePolicy,
            registerExistingPolicy : registerExistingPolicy,
            change_policy_status : change_policy_status,
            delete_policy : delete_policy
        }
    }
})();
