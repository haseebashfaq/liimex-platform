(function() {

    'use strict';

    angular.module('application').
    service('mandateService', mandateService);

    mandateService.$inject = ['requestService', 'fileService', 'backofficeService'];

    /* Prefix */
    const prefix = 'mandates';
    const document_prefix = 'documents';

    const STATUS_SIGNED = 'signed';

    /* Service Function */
    function mandateService(requestService, fileService, backofficeService) {

        /* Get Mandates For Company */
        function getMandatesForCompany(company_uid, callback, err_call){
            requestService.getDataOnce([prefix, company_uid], mandates => {
                callback(mandates)
            }, error => {
                err_call(error);
            });
        }

        /* Get Single Mandate */
        function getSingleMandate(company_uid, mandate_uid, callback, err_call){
          requestService.getDataOnce([prefix, company_uid, mandate_uid], mandate => {
              callback(mandate)
          }, error => {
              err_call(error);
          });
        }

        /* Get All Mandates */
        function getAllMandates(callback, err_call){
          requestService.getDataOnce([prefix], mandates => {
              callback(mandates)
          }, error => {
              err_call(error);
          });
        }

        /* Download Mandate with filename */
        function downloadMandateWithFilename(company_uid, file_name, callback, err_call){
          fileService.downloadFileWithCustomEndpoint([prefix, company_uid], file_name, callback, err_call);
        }

        /* Register Mandate */
        function registerMandate(company_uid ,file_url, callback, err_call){
            const data = {
                file: file_url
            };
            requestService.pushData([prefix, company_uid], data, response => {
              callback(response.key);
            }, error => {
              err_call(error);
            });
        }

        /* Upload Signature */
        function uploadSignature(fileItem, company_uid, callback, err_call){
          fileService.uploadFileWithCustomEndpoint([prefix, company_uid], "", fileItem, callback, err_call);
        }

        /* Attach Signature*/
        function attach_signature(mandate_uid, signature_url, callback, err_call) {
          requestService.updateData([document_prefix, prefix, mandate_uid],
            {
                signature_url : signature_url,
                status:'signing_requested'
            }, callback, err_call, false, true)
        }

        function checkMandate(mandate_uid, company_uid, callback, err_call) {
            if (mandate_uid) {
                return callback(mandate_uid);
            }
            backofficeService.initMandate(company_uid, res => callback(res.mandate_uid), err_call);
        }

        function signMandate(signature_blob, mandate_uid, user_uid, company_uid, callback, err_call) {
            checkMandate(mandate_uid, company_uid, correct_mandate_uid => {
                uploadSignature(signature_blob, company_uid, signature_filename => {
                    fileService.downloadFileWithCustomEndpoint([prefix, company_uid], signature_filename, signature_path => {
                        const mandate_data = {
                            signature_path,
                            company_uid,
                            user_uid
                        };
                        backofficeService.postMandate(mandate_data, res => {
                            requestService.updateData([document_prefix, prefix, correct_mandate_uid], {
                                signature_url: signature_filename,
                                signed_document_url: res.data,
                                status: STATUS_SIGNED
                            }, callback, err_call)
                        }, err_call);
                    }, err_call);
                }, err_call);
            }, err_call);
        }

        /* Return Stuff */
        return {
          getMandatesForCompany,
          getSingleMandate,
          registerMandate,
          getAllMandates,
          uploadSignature,
          attach_signature,
          downloadMandateWithFilename,
          signMandate
        }
    }
})();
