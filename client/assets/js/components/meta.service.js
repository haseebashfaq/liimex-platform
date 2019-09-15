(function() {

    'use strict';

    angular.module('application').
    service('metaService', metaService);

    metaService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService', 'fileService'];

    // Routes
    const prefix = 'meta';
    const mandate_suffix = 'mandate'
    const policies_suffix = 'policy_criteria'
    const industry_suffix = 'industry_criteria'
    const custom_field_suffix = 'fields'
    const products_suffix = 'products'
    const carrier_suffix = 'carriers'
    const insurance_suffix = 'insurance_types'
    const codes_suffix = 'industry_codes'
    const activity_questions_suffix = 'activities'
    const activity_group_suffix = 'activity_groups'
    const insurance_questionnaire_suffix = 'insurance_questionnaire'
    const insurance_question_mapping_suffix = 'insurance_question_mapping'
    const comparison_criteria_suffix = 'comparison_criteria'
    /* Models */
    var model = {};

    function metaService($rootScope, firebase, $firebaseObject, requestService, fileService) {

      /*********************************************/
      /**                 Mandate                 **/
      /*********************************************/

        /* Add Mandate */
        function addMandate(file_url, callback, err_call){
          var data = {
            file: file_url,
            status: 'inactive'
          }
          requestService.pushData([prefix, mandate_suffix], data, callback, err_call);
        }

        /* Get Mandates */
        function getMandates(callback, err_call){
          requestService.getDataOnce([prefix, mandate_suffix], callback, err_call);
        }

        /* Get Single Mandate */
        function getSingleMandate(mandate_uid, callback, err_call){
          requestService.getDataOnce([prefix, mandate_suffix, mandate_uid], callback, err_call);
        }

        /* Upload Mandate */
        function uploadMandate(fileItem, callback, err_call){
          fileService.uploadFileWithCustomEndpoint([prefix, mandate_suffix], "", fileItem, callback, err_call);
        }

        /* Download Mandate */
        function downloadMandate(file_url, callback, err_call){
          fileService.downloadFileWithCustomEndpoint([prefix, mandate_suffix], file_url, callback, err_call);
        }

        /* Mark Mandate Active */
        function activateMandate(mandate_uid, callback, err_call){
          var data = {
            status : 'active'
          }
          requestService.updateData([prefix, mandate_suffix, mandate_uid], data, callback, err_call)
        }

        /* Mark Mandate Inactive */
        function deactivateMandate(mandate_uid, callback, err_call){
          var data = {
            status : 'inactive'
          }
          requestService.updateData([prefix, mandate_suffix, mandate_uid], data, callback, err_call)
        }

        /*********************************************/
        /**             Policy Criteria             **/
        /*********************************************/

        /* Add Policy Criteria */
        function addPolicyCriteria(callback, err_call){
          requestService.pushData([prefix, policies_suffix], {}, callback, err_call);
        }

        /* Add Custom Field To Policy Criteria */
        function addCustomField(policy_uid, callback, err_call){
          requestService.pushData([prefix, policies_suffix, policy_uid, custom_field_suffix], {}, callback, err_call);
        }

        /* Save Policy Criteria */
        function savePolicyCriteria(policy_uid, data, callback, err_call){
          requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call)
        }

        /* Disable Custom Field */
        function disableCustomField(policy_uid, field_uid, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, policies_suffix, policy_uid, custom_field_suffix, field_uid], data, callback, err_call)
        }

        /* Enable Custom Field */
        function enableCustomField(policy_uid, field_uid, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, policies_suffix, policy_uid, custom_field_suffix, field_uid], data, callback, err_call)
        }

        /* Delete Policy Criteria */
        function deletePolicyCriteria(policy_uid, data, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call);
        }

        /* Enable Policy Criteria */
        function enablePolicyCriteria(policy_uid, data, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, policies_suffix, policy_uid], data, callback, err_call);
        }

        /* Get Policy Criteriaa */
        function getPolicyCriteria(callback, err_call){
          requestService.getDataOnce([prefix, policies_suffix], callback, err_call);
        }

        /* Get Single Policy Criteria */
        function getSinglePolicyCriteria(policy_uid, callback, err_call){
          requestService.getDataOnce([prefix, policies_suffix, policy_uid], callback, err_call);
        }

        /* Get Policy Specific Criteria From Subject Trigger */
        function getPolicySpecificCriteriaFromSubjectTrigger(subject_trigger, callback, err_call){
          requestService.getDataOnceEqualTo([prefix, policies_suffix], 'trigger', subject_trigger, callback, err_call);
        }

        /* Get Policy Specific Criteria */
        function getPolicySpecificCriteria(callback, err_call){
          if(model.policy_criteria){
            console.log('Returning Policy Criteria');
            callback(model.policy_criteria)
            return;
          }
          requestService.getDataOnce([prefix, policies_suffix], result => {
            model.policy_criteria = result;
            callback(result)
          }, err_call);
        }

        /*********************************************/
        /**               Industry Criterias        **/
        /*********************************************/

        /* Add Industry Criteria */
        function addIndustryCriteria(callback, err_call){
          requestService.pushData([prefix, industry_suffix], {}, callback, err_call);
        }

        /* Get Industry Criteriaa */
        function getIndustryCriteria(callback, err_call){
          if(model.industry_criteria){
            console.log('Returning Industry Criteria');
            callback(model.industry_criteria)
            return;
          }
          requestService.getDataOnce([prefix, industry_suffix], result => {
            model.industry_criteria = result;
            callback(result)
          }, err_call);
        }

        /* Get Single Industry Criteria */
        function getSingleIndustryCriteria(criteria_uid, callback, err_call){
          requestService.getDataOnce([prefix, industry_suffix, criteria_uid], callback, err_call);
        }

        /* Save Industry Criteria */
        function saveIndustryCriteria(criteria_uid, data, callback, err_call){
          requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call)
        }

        /* Add Custom Field To Industry Criteria */
        function addInudstryCustomField(criteria_uid, callback, err_call){
          requestService.pushData([prefix, industry_suffix, criteria_uid, custom_field_suffix], {}, callback, err_call);
        }

        /* Disable Custom Field */
        function disableIndustryCustomField(criteria_uid, field_uid, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, industry_suffix, criteria_uid, custom_field_suffix, field_uid], data, callback, err_call)
        }

        /* Enable Custom Field */
        function enableIndustryCustomField(criteria_uid, field_uid, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, industry_suffix, criteria_uid, custom_field_suffix, field_uid], data, callback, err_call)
        }

        /* Delete Industry Criteria */
        function disableIndustryCriteria(criteria_uid, data, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call);
        }

        /* Enable Industry Criteria */
        function enableIndustryCriteria(criteria_uid, data, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, industry_suffix, criteria_uid], data, callback, err_call);
        }

        /* Get Industry Specific Criteria From Subject Trigger */
        function getIndustrySpecificCriteriaFromPolicyTrigger(policy_trigger, callback, err_call){
          requestService.getDataOnceEqualTo([prefix, industry_suffix], 'policy_trigger', policy_trigger, callback, err_call);
        }


        /*********************************************/
        /**               Product Types             **/
        /*********************************************/

        /* Add Insurance Product */
        function addInsuranceProduct(callback, err_call){
          var data = {
            disabled : true
          }
          requestService.pushData([prefix, products_suffix], data, callback, err_call);
        }

        /* Get Insurance Products */
        function getInsuranceProducts(callback, err_call){
          requestService.getDataOnce([prefix, products_suffix], callback, err_call);
        }

        /* Get Single Product */
        function getSingleProduct(product_uid, callback, err_call){
          requestService.getDataOnce([prefix, products_suffix, product_uid], callback, err_call);
        }

        /* Disable Product */
        function disableProduct(product_uid, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call);
        }

        /* Enable Product */
        function enableProduct(product_uid, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call);
        }

        /* Save Product */
        function saveProduct(product_uid, data, callback, err_call){
          requestService.updateData([prefix, products_suffix, product_uid], data, callback, err_call)
        }


        /* get products for the given insurance type */
        function getProductForInsuranceType(insurance_type, callback, err_call){
          requestService.getDataOnceEqualTo([prefix, products_suffix], 'insurance_type', insurance_type, callback, err_call);
        }

        /* get products mapping for the given product id */
        function getSingleProductMapping(product_id,callback,err_call){
          requestService.getDataOnce([prefix, insurance_question_mapping_suffix, products_suffix , product_id], callback, err_call);
        }

        /* get products mappings */

        function getProductMappings(callback,err_call){
          requestService.getDataOnce([prefix, insurance_question_mapping_suffix, products_suffix], callback, err_call);
        }

        /*********************************************/
        /**               Carriers                  **/
        /*********************************************/

        /* Get Carriers */
        function getCarriers(callback, err_call){
          if(model.carriers){
            callback(model.carriers);
            return
          }
          requestService.getDataOnce([prefix, carrier_suffix], result=> {
            model.carriers = result;
            callback(model.carriers);
          }, err_call);
        }

        /* Download Carrier Photo */
        function downloadCarrier(file_url, callback, err_call){
          fileService.downloadFileWithCustomEndpoint([prefix, carrier_suffix], file_url, callback, err_call);
        }


        /*********************************************/
        /**             Insurance Types             **/
        /*********************************************/

        /* Get Insurance Types */
        function getInsuranceTypes(callback, err_call){
          if(model.insurance_types){
            console.log('Returning Insurance Types');
            callback(model.insurance_types);
            return;
          }
          requestService.getDataOnce([prefix, insurance_suffix], result => {
            console.log('Updating Insurance Types');
            model.insurance_types = result;
            callback(model.insurance_types);
          }, err_call);
        }

        /* Get only enabled Insurance Type */
        function getEnabledInsuranceTypes(callback, err_call){
          if(model.insurance_types){
            console.log('Returning Insurance Types');
            callback(model.insurance_types);
            return;
          }
          requestService.getDataOnceEqualTo([prefix, insurance_suffix],'disabled',false, result => {
            console.log('Updating Insurance Types');
            model.insurance_types = result;
            callback(model.insurance_types);
          }, err_call);
        }

        //requestService.getDataOnceEqualTo([prefix, products_suffix], 'insurance_type', insurance_type, callback, err_call);

        /*********************************************/
        /**             Industry Codes             **/
        /*********************************************/

        /* Add Industry Code */
        function addIndustryCode(callback, err_call){
          var data = {
            disabled : true
          }
          requestService.pushData([prefix, codes_suffix], data, callback, err_call);
        }

        /* Get Industry Codes */
        function getIndustryCodes(callback, err_call){
          if(model.industryCodes){
            callback(model.industryCodes);
          }
          else{
            requestService.getDataOnce([prefix, codes_suffix], industryCodes =>{
              model.industryCodes = industryCodes;
              callback(industryCodes);
            } , err_call);
          }
        }

        /* Get Single Insurance Type */
        function getSingleIndustryCode(code_uid, callback, err_call){
          requestService.getDataOnce([prefix, codes_suffix, code_uid], callback, err_call);
        }

        /* Disable Industry Code */
        function disableIndustryCode(code_uid, callback, err_call){
          var data = {
            disabled : true
          }
          requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call);
        }

        /* Enable Industry Code */
        function enableIndustryCode(code_uid, callback, err_call){
          var data = {
            disabled : false
          }
          requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call);
        }

        /* Save Industry Code */
        function saveIndustryCode(code_uid, data, callback, err_call){
          requestService.updateData([prefix, codes_suffix, code_uid], data, callback, err_call)
        }

        /* Get Policy Specific Criteria From Subject Trigger */
        function getCodeDataFromCode(code, callback, err_call){
          requestService.getDataOnceEqualTo([prefix, codes_suffix], 'code', code, callback, err_call);
        }

        /*********************************************/
        /**           Activity Questions            **/
        /*********************************************/

        /* Activity Questions */
        function getActivityQuestions(callback, err_call){
          if(model.activities){
            callback(model.activities);
            return;
          }
          requestService.getDataOnce([prefix, activity_questions_suffix], activities => {
            model.activities = activities;
            callback(activities);
          }, err_call);
        }

        /* Activity Groups */
        function getGroups(callback, err_call){
          if(model.groups){
            callback(model.groups)
          }
          requestService.getDataOnce([prefix, activity_group_suffix], groups => {
            model.groups = groups;
            callback(model.groups);
          }, err_call);
        }



        /*********************************************/
        /**             Insurance Questions             **/
        /*********************************************/

        /* Get Insurance Questions */
        function getInsuranceQuestions(callback, err_call){
          if(model.insurance_questions){
            callback(model.insurance_questions);
            return;
          }
          requestService.getDataOnce([prefix, insurance_questionnaire_suffix], result => {
            console.log('Updating Insurance Questions');
            model.insurance_questions = result;
            callback(model.insurance_questions);
          }, err_call);
        }

        function getInsuranceQuestionMappings(callback, err_call){
          if(model.insurance_questions){
            callback(model.insurance_question_mappings);
            return;
          }
          requestService.getDataOnce([prefix, insurance_question_mapping_suffix], result => {
            console.log('Updating Insurance Question mappings');
            model.insurance_question_mappings = result;
            callback(model.insurance_question_mappings);
          }, err_call);
        }


        /*********************************************/
        /**   Comparison criteria for policy view   **/
        /*********************************************/

        /* Get comparison criteria for policy page */
        function getComparisonCriteriaForPolicy(callback, err_call) {
          if(!model.comparison_criteria){
            requestService.getDataOnce([prefix, comparison_criteria_suffix], result => {
              model.comparison_criteria = result;
              callback(result);
            }, err_call);            
          } else {
            callback(model.comparison_criteria);
          }
        }

        function getComparisonCriteriaForPolicyAdditional(comparison_uid, callback, err_call) {         
          requestService.getDataOnce([prefix, comparison_criteria_suffix, comparison_uid], callback, err_call);
        }


        /* Return Stuff */
        return {
          getMandates : getMandates,
          addMandate : addMandate,
          uploadMandate : uploadMandate,
          getSingleMandate : getSingleMandate,
          downloadMandate : downloadMandate,
          activateMandate : activateMandate,
          deactivateMandate : deactivateMandate,
          addPolicyCriteria : addPolicyCriteria,
          savePolicyCriteria : savePolicyCriteria,
          getPolicyCriteria : getPolicyCriteria,
          getSinglePolicyCriteria : getSinglePolicyCriteria,
          addCustomField : addCustomField,
          disableCustomField : disableCustomField,
          deletePolicyCriteria : deletePolicyCriteria,
          addInsuranceProduct : addInsuranceProduct,
          getInsuranceProducts : getInsuranceProducts,
          getCarriers : getCarriers,
          downloadCarrier : downloadCarrier,
          getInsuranceTypes : getInsuranceTypes,
          getEnabledInsuranceTypes: getEnabledInsuranceTypes,
          getSingleProduct : getSingleProduct,
          disableProduct : disableProduct,
          enableProduct : enableProduct,
          saveProduct : saveProduct,
          addIndustryCode : addIndustryCode,
          getIndustryCodes : getIndustryCodes,
          getSingleIndustryCode : getSingleIndustryCode,
          disableIndustryCode : disableIndustryCode,
          enableIndustryCode : enableIndustryCode,
          saveIndustryCode : saveIndustryCode,
          enablePolicyCriteria : enablePolicyCriteria,
          getPolicySpecificCriteriaFromSubjectTrigger : getPolicySpecificCriteriaFromSubjectTrigger,
          getIndustrySpecificCriteriaFromPolicyTrigger : getIndustrySpecificCriteriaFromPolicyTrigger,
          enableCustomField : enableCustomField,
          addIndustryCriteria : addIndustryCriteria,
          getIndustryCriteria : getIndustryCriteria,
          getSingleIndustryCriteria : getSingleIndustryCriteria,
          saveIndustryCriteria : saveIndustryCriteria,
          addInudstryCustomField : addInudstryCustomField,
          disableIndustryCustomField : disableIndustryCustomField,
          enableIndustryCustomField : enableIndustryCustomField,
          disableIndustryCriteria : disableIndustryCriteria,
          enableIndustryCriteria : enableIndustryCriteria,
          getCodeDataFromCode : getCodeDataFromCode,
          getActivityQuestions : getActivityQuestions,
          getGroups : getGroups,
          getPolicySpecificCriteria : getPolicySpecificCriteria,
          getInsuranceQuestions: getInsuranceQuestions,
          getInsuranceQuestionMappings: getInsuranceQuestionMappings,
          getProductForInsuranceType: getProductForInsuranceType,
          getSingleProductMapping: getSingleProductMapping,
          getComparisonCriteriaForPolicy : getComparisonCriteriaForPolicy,
          getComparisonCriteriaForPolicyAdditional : getComparisonCriteriaForPolicyAdditional
        }
    }
})();
