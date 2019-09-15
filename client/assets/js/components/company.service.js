(function() {

  'use strict';

  angular.module('application').
  service('companyService', companyService);

  companyService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService'];

  /* Endpoints */
  const company_prefix = 'companies';
  const address_prefix = 'addresses';
  const industry_suffix = 'industry_codes';
  const activity_suffix = 'activities';
  const users_prefix = 'users';
  const force_suffix = 'force_url';
  const meta_prefix = 'meta';
  const financials_suffix = 'financials';
  const insurance_questionnaire_suffix = 'insurance_questionnaire';

  const company_model = {};
  const address_model = {};
  const industry_codes_model = {};
  const activity_model = {};


  function companyService($rootScope, firebase, $firebaseObject, requestService) {

    /* Get Company Info */
    function getCompanyInformation(company_uid, callback, err_call){
      requestService.getDataOnce([company_prefix, company_uid], callback, err_call);
    }

    /* Get Company Address */
    function getCompanyAddress(company_uid, callback, err_call){
      requestService.getDataOnce([address_prefix, company_uid], callback, err_call);
    }

    /* Update Company Information */
    function updateCompanyInformation(company_uid, params, callback, err_call){
      requestService.updateData([company_prefix, company_uid], params, callback, err_call);
    }

    /* Update Address */
    function updateAddress(address_uid, params, callback, err_call){
      requestService.updateData([address_prefix, address_uid], params, callback, err_call);
    }

    /* Update Industry Codes */
    function updateIndustryCodesInSignup(company_uid, user_uid, industry_codes,forceurl_pickFinancials, callback, err_call){
      requestService.deepWrite([
        {
            route : [company_prefix, company_uid],
            uid:industry_suffix,
            data : industry_codes},
        {
            route : [users_prefix, user_uid],
            uid:force_suffix ,
            data : forceurl_pickFinancials}
      ], false, callback, err_call);
    }

    /* Update Financials */
    function updateFinancials(company_uid, user_uid, financials,forceurl_pickActivity, callback, err_call){
      requestService.deepWrite([
        {
            route : [company_prefix, company_uid],
            uid : financials_suffix,
            data : financials},
        {
            route : [users_prefix, user_uid],
            uid : force_suffix ,
            data : forceurl_pickActivity}
      ], false, callback, err_call);
    }

    /* Update insurance questions and answers; for the given array, save answers of  main questions and it's triggermatching sub questions */
    function updateInsuraceAnswer(company_uid, insuranceQuestions, callback, err_call){
      const newUpdate = {};
      insuranceQuestions.forEach(mainQuestion => {
        if(mainQuestion.key && mainQuestion.answer !== undefined){
          const answerObj = {'answer': mainQuestion.answer};
          const path = company_prefix + '/' + company_uid + '/' + insurance_questionnaire_suffix + '/' + mainQuestion.key + '/';
          newUpdate[path] = answerObj;
        }
        if(mainQuestion.triggerMarchingSubQs){
          mainQuestion.triggerMarchingSubQs.forEach(subQuestion=>{
            if(subQuestion.key && subQuestion.answer!== undefined){
              const answerObj = {'answer': subQuestion.answer};
              const path = company_prefix + '/' + company_uid + '/' + insurance_questionnaire_suffix + '/' + subQuestion.key + '/';
              newUpdate[path] = answerObj;
            }
          });
        }
      });
      requestService.multiPathUpdate(newUpdate,callback, err_call);
    }

    /* On Child Value Changed */
    function getCompanyFromModel(company_uid, callback, err_call){
      if(company_model.company && company_uid === company_model.key){
        console.log('Returnng company');
        callback(company_model.company);
        return;
      }
      requestService.on_child_value([company_prefix, company_uid], company => {
        console.log('Company Model Updated!');
        company_model.key = company.key;
        company_model.company = company.val();
        callback(company_model.company);
      }, error => {
        err_call(error);
      });
    }

    /* Get Addresses */
    function getAndStoreAddresses(key, callback, err_call){
      if($rootScope.company.addresses[key]===true && address_model[key]){
        console.log('Returning address model');
        callback(address_model[key]);
        return;
      }
      requestService.on_child_value([address_prefix, key], address => {
        console.log('Updating address');
        address_model[key] = address;
        callback(address_model[key]);
      }, error => {
        err_call(error);
      });
    }

    /* Get Industry Codes */
    function getAndStoreIndustryCodes(key, callback, err_call){
      if(industry_codes_model[key]){
        console.log('Returning industry model');
        callback(industry_codes_model[key]);
        return;
      }
      requestService.on_child_value_order_by([meta_prefix, industry_suffix], 'code', key, industry_code => {
        console.log('Updating Industry');
        industry_codes_model[key] = industry_code;
        callback(industry_codes_model[key]);
      }, error => {
        err_call(error);
      });
    }

    /* Get Activities */
    function getAndStoreMyActivities(key, callback, err_call){
      if(activity_model[key]){
        console.log('Returning Activity');
        callback(activity_model[key]);
        return;
      }
      requestService.on_child_value([meta_prefix, activity_suffix, key], activity => {
        console.log('Updating Activity');
        activity_model[key] = activity;
        callback(activity_model[key]);
      }, error => {
        err_call(error);
      });
    }

    /* Return Stuff */
    return {
      getCompanyInformation: getCompanyInformation,
      getCompanyAddress : getCompanyAddress,
      updateCompanyInformation : updateCompanyInformation,
      updateAddress : updateAddress,
      updateIndustryCodesInSignup : updateIndustryCodesInSignup,
      getCompanyFromModel : getCompanyFromModel,
      getAndStoreAddresses : getAndStoreAddresses,
      getAndStoreIndustryCodes : getAndStoreIndustryCodes,
      getAndStoreMyActivities : getAndStoreMyActivities,
      updateFinancials : updateFinancials,
      updateInsuraceAnswer:updateInsuraceAnswer
    }
  }
})();
