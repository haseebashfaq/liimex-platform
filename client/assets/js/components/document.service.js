(function() {

    'use strict';

    angular.module('application').
    service('documentService', documentService);

    documentService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

    /* Endpoints */
    const document_prefix = 'documents';
    const mandate_suffix = 'mandates';
    const policy_suffix = 'policies';

    /* Model */
    let model = {}

    /* Service Function */
    function documentService($rootScope, firebase, $firebaseObject, requestService, fileService) {

      /* Upload Files */
      function uploadPolicies(files, company_uid, callback, err_call){
        let count = 0;
        let file_urls = [];
        for(var key in files){
          fileService.uploadFileWithCustomEndpoint([document_prefix, company_uid], "", files[key], file=>{
            count++;
            file_urls.push(file);
            if(count === Object.keys(files).length){
              callback(file_urls);
              return;
            }
          }, ()=>{
            err_call({code:"",message:""})
            return;
          });
        }
      }

      /* Download Document */
      function downloadPolicy(file_url, company_uid, callback, err_call){
        fileService.downloadFileWithCustomEndpoint([document_prefix, company_uid], file_url, callback, err_call);
      }

      /* Create Document */
      function createDocuments(url_list, company_uid, callback, err_call){
        let document_keys = []
        for(var elem in url_list){
          document_keys.push({ name:elem, route:[document_prefix, policy_suffix]})
        }
        requestService.getMultipleKeys(document_keys, keys => {
          var newUpdate = {}, now = requestService.getTimestamp();
          for(var elem in keys){
            newUpdate[keys[elem].route+keys[elem].key] = {
              file:url_list[elem], created_at:now, updated_at:now, company:company_uid
            };
          }
          callback(newUpdate, keys);
        });
      }

      /* Get Document */
      function getDocument(route, key, callback, err_call){
        requestService.getDataOnce((route+key).split('/'), callback, err_call);
      }

      /* Get and Store Mandate */
      function getAndStoreMandate(key, callback, err_call){
        if(model[key]){
          console.log('Returning mandate');
          callback(model[key]);
          return;
        }
        requestService.on_child_value([document_prefix, mandate_suffix, key], document => {
          console.log('Updating mandate');
          model[key] = document;
          callback(model[key]);
        }, error => {
          err_call(error);
        });
      }

      /* Return Stuff */
      return {
        getAndStoreMandate : getAndStoreMandate,
        uploadPolicies : uploadPolicies,
        createDocuments : createDocuments,
        getDocument : getDocument,
        downloadPolicy : downloadPolicy
      }
    }
})();
