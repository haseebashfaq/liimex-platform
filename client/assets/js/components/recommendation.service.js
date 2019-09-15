(function() {

    'use strict';

    angular.module('application').
    service('recommendationService', recommendationService);

    recommendationService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'requestService'];


    /* Endpoints */
    const prefix = 'recommendations';
    const activity_suffix = 'activities';
    const company_prefix = 'companies';
    const user_prefix = 'users';

    /* Models */
    let model = {};

    /* Main Service */
    function recommendationService($rootScope, firebase, $firebaseObject, requestService) {

      /* Save */
      function updateRecommendation(){
      }

      /* Attach Recommendation */
      function attachRecommendation(company_uid, user_uid, insurance_keys, activity_keys,industry_codes,force_url, callback, err_call){
        var recommendation_data = {company:company_uid, activities:activity_keys, industry_codes:industry_codes, processed:false}
        requestService.attachAndUpdate([
          { route : [prefix], data : recommendation_data, attach_for:true, attach_on:"company", under : prefix, overwrite_existing:true},
          { route : [company_prefix, company_uid], data : {}, attach_to:true, name:"company"},
          { route : [company_prefix, company_uid, activity_suffix], data : activity_keys, no_new_key:true},
          { route : [user_prefix, user_uid, 'force_url'], data: force_url, no_new_key:true}
        ], callback, err_call);
      }

      /* Get Recommendations */
      function getRecommendations(recommendation_uid, callback, err_call){
        if(model && model.key === recommendation_uid && model.key !== null){
          callback(model.recommendation);
          return;
        }
        requestService.on_child_value([prefix, recommendation_uid], recommendation => {
          model.recommendation = recommendation.val();
          model.key = recommendation.key;
          callback(model.recommendation);
        }, error => {
          err_call(error);
        });
      }

      function getModel(){
        return model;
      }

      /* Return Stuff */
      return {
        getRecommendations : getRecommendations,
        updateRecommendation : updateRecommendation,
        attachRecommendation : attachRecommendation,
        getModel:getModel
      }
    }
})();
