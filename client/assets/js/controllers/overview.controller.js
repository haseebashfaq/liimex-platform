// Angular Module
angular.module('application').controller('OverviewController', OverviewController);

// Injections
OverviewController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'companyService', 'recommendationService', 'Upload', 'policyService', 'documentService', 'offerService', 'metaService', 'FoundationApi', 'redirectService', 'backofficeService', '$sce'];

// Function
function OverviewController($rootScope, $scope, $stateParams, $state, $controller, companyService, recommendationService, Upload, policyService, documentService, offerService, metaService, FoundationApi, redirectService, backofficeService, $sce) {
  angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));


  /* Scope Variables */
  $scope.disableGetQuoteBtn= false;
  $scope.disableUploadBtn= false;
  $scope.files_to_upload = {};
  $scope.weighted_recommendedInsurance = {};
  $scope.weighted_recommendedInsurance.essential = [];
  $scope.weighted_recommendedInsurance.additional = [];
  let upper_quartile_score = 75;
  let middle_score = 50;
  let lower_quartile_score = 25;


  /* Insurance Card Icons */
  $scope.insurance_icons = {
    '-KbjclPv0LbnqBlC6tlv' : 'public_liability.svg',
    '-Kbjy8O7cor_ocMejerh' : 'public_liability.svg',
    '-Kbjy9R4dIDYb0zlwckc' : 'interuption.svg',
    '-KbjyAMh5OoJO_WbxhVI' : 'cyber.svg',
    '-KbjyWaNBfh7mkyJzplQ' : 'd_o.svg',
    '-KbjybKLFl8sj0Sx5-sz' : 'building.svg',
    '-Kbjz1OQ7D51UsZtedVG' : 'contents.svg',
    '-Kbjz9_tHHQgQ0kn59_u' : 'machine.svg',
    '-KbjzH0-OGml8Bv4GziN' : 'product_liability.svg',
    '-KbjzTD4YzqsIahUO_uf' : 'legal.svg',
    '-KbjzycPPJ0iZdbwI5jQ' : 'transport.svg',
    '-Kbk-2hizMxWljDJA_ky' : 'financial_liability.svg',
    '-Ke5TjQzVXs5hVW2oL9S' : 'electronics.svg',
    '-Ke5Ttp3QBYWJZ87P7de' : 'car.svg',
    '-Ke5Z1jJx8U6APka2E-a' : 'contract.svg',
    '-Ke5ZnsQKtJ-JLoiKSYL' : 'environmental.svg',
    '-Ke5dEzmLR0n0MpMXsb-' : 'accident.svg',
    'other' : 'shield.svg'
  }

  // Safety Check
  if(!$rootScope.company || !$rootScope.company.recommendations ){
    return;
  }

  /* Safe Apply */
  $scope.safeApply = function(fn) {
    if(!this.$root){
      return;
    }
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  /* Get Recommendations */
  $scope.GetRecommendations = function(){
    if (!$rootScope.company.recommendations){
      return
    }
    $rootScope.authenticating = true
    recommendationService.getRecommendations(Object.keys($rootScope.company.recommendations)[0], recommendation => {
      $scope.num_outstanding = 0;
      $scope.recommendation = recommendation;
      $scope.interval && clearInterval($scope.interval);
      $rootScope.authenticating = null
      setWeightsForRecommendedInsurance(recommendation);
      $scope.safeApply(e=>e);
    }, error => {
      console.error(error);
      $rootScope.authenticating = null
      backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
    })
  }

  /* Set weights for recommended insurances */
  function setWeightsForRecommendedInsurance(recommendation){
    if(!recommendation.recommended){
      return
    }

    $scope.demand = {};
    $scope.demand.essential = [];
    $scope.demand.additional = [];

    const recommended = recommendation.recommended;
    for(var key in recommended){
      if(recommended[key].score >= upper_quartile_score){
        $scope.demand.essential.push({key:key, score:recommended[key].score, essential : true});
      }
    }

    for(var key in recommended){
      if(recommended[key].score == middle_score){
        $scope.demand.additional.push({key:key, score:recommended[key].score});
      }
    }

    if($scope.demand.additional.length + $scope.demand.essential.length <= 3) {
      for(var index in $scope.demand.additional){
        let tmp_element = $scope.demand.additional[index];
        tmp_element.essential = true;
        $scope.demand.essential.push(tmp_element);
      }
      $scope.demand.additional = [];
    }

    for(var key in recommended){
      if(recommended[key].score === lower_quartile_score){
        $scope.demand.additional.push({key:key, score:recommended[key].score});
      }
    }

    $scope.safeApply(fn => fn);
  }

  /* Set Insurance Type */
  $scope.SelectInsuranceType = function(key){
    $scope.SelectedInsurance = $scope.insurance_types[key];
    $scope.SelectedRecommendationKey = key;

    if($rootScope.langPreference=='de') {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_de);
    } else {
      $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_en);
    }

    $scope.safeApply(f => f);
  }

  /* Perform upload */
  $scope.PerformUpload = function(files){
    if(Object.keys(files).length <= 0){return}
    $rootScope.local_load = true;
    $scope.disableUploadBtn= true;
    documentService.uploadPolicies(files, $rootScope.company_uid, file_urls => {
      documentService.createDocuments(file_urls, $rootScope.company_uid, (newUpdateDocuments, document_list) => {
        policyService.registerExistingPolicyFromRecommendation($rootScope.company_uid, $scope.SelectedRecommendationKey, Object.keys($rootScope.company.recommendations)[0], newUpdateDocuments, document_list, policy => {
          $scope.disableUploadBtn= false;
          $rootScope.local_load = null;
          $rootScope.genService.showDefaultSuccessMsg('File Uploaded');
          FoundationApi.publish('uploaded_success_modal','show');
          $scope.safeApply(f => f);
        }, error => {
          $scope.disableUploadBtn= false;
          $rootScope.local_load = null;
          console.error(error);
          $rootScope.genService.showDefaultErrorMsg(error.code);
          backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
        })
      });
    }, error => {
      $scope.disableUploadBtn= false;
      $rootScope.local_load = null;
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
    });
  }

  /* Are All Essential Policies Gotten */
  $scope.HaveAllEssentialPolicies = function(){
    if(!$scope.demand || !$scope.demand.essential){
      return;
    }

    for(var key in $scope.demand.essential){
      if(!$scope.in_active_policies[$scope.demand.essential[key].key]){
        return false;
      }
    }
    return true;
  }

  /* Are All Additional Policies Gotten */
  $scope.HaveAllAdditionalPolicies = function(){
    if(!$scope.demand || !$scope.demand.additional){
      return;
    }

    for(var key in $scope.demand.additional){
      if(!$scope.in_active_policies[$scope.demand.additional[key].key]){
        return false;
      }
    }
    return true;
  }

  /* Get All Polies */
  $scope.GetMyPolicies = function(){
    $scope.not_disabled_policies = {}
    $scope.in_pending_policies = {};
    $scope.in_active_policies = {};
    $scope.num_active_policies = 0;
    $scope.num_pending_policies = 0;

    var pending_policies_subjects = {};
    var active_policies_subjects = {};
    for(var key in $rootScope.company.policies){
      policyService.getAndStoreSinglePolicy(key, result=>{
        var policy = result.val();
        if(policy.subject && policy.status === 'pending'){
          addPendingPolicies(policy);
          pending_policies_subjects[policy.subject] = true;
          $scope.num_pending_policies = Object.keys(pending_policies_subjects).length;
        }
        if(policy.subject && policy.status === 'active'){
          addActivePolicies(policy);
          active_policies_subjects[policy.subject] = true;
          $scope.num_active_policies = Object.keys(active_policies_subjects).length;
        }
        if(policy.status !== "deleted" && policy.status !== 'disabled'){
          addDisabledPlicies(policy,result.key);
        }
        $scope.safeApply(f => f);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
      });
    }
  }

  function addPendingPolicies(policy){
    $scope.in_pending_policies[policy.subject] = true;
    if(policy.insurance_types){
      for(let insuranceId in policy.insurance_types){
        $scope.in_pending_policies[insuranceId] = true;
      }
    }
  }

  function addActivePolicies(policy){
    $scope.in_active_policies[policy.subject] = true;
    if(policy.insurance_types){
      for(let insuranceId in policy.insurance_types){
        $scope.in_active_policies[insuranceId] = true;
      }
    }
  }

  function addDisabledPlicies(policy,key){
    $scope.not_disabled_policies[policy.subject] = {'key':key, 'policy':policy};
    if(policy.insurance_types){
      for(let insuranceId in policy.insurance_types){
        $scope.not_disabled_policies[insuranceId] = {'key':key, 'policy':policy};
      }
    }
  }


  /* File Changed */
  $scope.FileChanged = function(file){
    if(!file || Object.keys($scope.files_to_upload).length >= 5){
      return;
    }
    $scope.files_to_upload[file.name] = file;
  }

  /* Remove From Uploads */
  $scope.RemoveFromUploads = function(key, files){
    if(!$scope.files_to_upload[key]){
      return;
    }
    delete $scope.files_to_upload[key];
    if(Object.keys($scope.files_to_upload).length === 0){
      // Nothing Yet
    }
    $scope.safeApply(fn => fn);
  }

  /* Get My Offers */
  $scope.GetMyOffers = function(){
    $scope.requested_offers = {};
    $scope.pushed_offers = {};
    $scope.accepted_offers = {};
    $scope.not_dismissed_offers = {};
    $scope.num_offers_collecting = 0;
    $scope.num_offers_pushed = 0;

    var offers_collecting_subject = {};
    var offers_pushed_subject = {};
    for(var key in $rootScope.company.offers){
      offerService.getAndStoreSingleOffer(key, result=>{
        if($state.current.data.vars.name_no_lang !== 'overview'){
          return;
        }
        var offer = result.val();
        if(offer.status === 'accepted'){
          addAccepted_offers(offer,result.key);
        } else if(offer.status === 'requested'){
          addRequested_offers(offer,result.key);
          offers_collecting_subject[offer.subject] = true;
          $scope.num_offers_collecting = Object.keys(offers_collecting_subject).length;
        } else if(offer.status === 'pushed' && offer.comparisons){
          addPushed_offers(offer,result.key);
          offers_pushed_subject[offer.subject] = true;
          $scope.num_offers_pushed = Object.keys(offers_pushed_subject).length;
        }
        // Inserting into not_dismissed
        if(offer.status !== 'dismissed' && offer.status !== 'deleted') {
          addNot_dismissed_offers(offer,key);
        }
        $scope.safeApply(f => f);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});

      });
    }
  }

  function addAccepted_offers(offer,key){
    $scope.accepted_offers[offer.subject] = { 'key':key, 'offer':offer};
    if(offer.comparisons){
      for(let comparisonId in offer.comparisons){
        let comparison = offer.comparisons[comparisonId];
        if(comparison.insurance_types){
          for(let insuranceId in comparison.insurance_types){
            $scope.accepted_offers[insuranceId] = { 'key':key, 'offer':offer};
          }
        }
      }
    }
  }

  function addRequested_offers(offer,key){
    $scope.requested_offers[offer.subject] = { 'key':key, 'offer':offer};
    if(offer.comparisons){
      for(let comparisonId in offer.comparisons){
        let comparison = offer.comparisons[comparisonId];
        if(comparison.insurance_types){
          for(let insuranceId in comparison.insurance_types){
            $scope.requested_offers[insuranceId] = { 'key':key, 'offer':offer};
          }
        }
      }
    }
  }

  function addPushed_offers(offer,key){
    $scope.pushed_offers[offer.subject] = {key:key, offer:offer};
    for(let comp_key in offer.comparisons){
      for(let type_key in offer.comparisons[comp_key].insurance_types){
        if(type_key !== offer.subject){
          $scope.pushed_offers[type_key] = {key:key, offer:offer, additional:true}
          $scope.safeApply(fn => fn)
        }
      }
    }
  }

  function addNot_dismissed_offers(offer,key){
    $scope.not_dismissed_offers[offer.subject] = {'key':key, 'offer':offer};
    if(offer.comparisons){
      for(let comparisonId in offer.comparisons){
        let comparison = offer.comparisons[comparisonId];
        if(comparison.insurance_types){
          for(let insuranceId in comparison.insurance_types){
            $scope.not_dismissed_offers[insuranceId] = { 'key':key, 'offer':offer};
          }
        }
      }
    }
  }

  /* Get Mandate */
  $scope.GetMyMandate = function(){
    if(!$rootScope.company.mandate){
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, result => {
      $scope.mandate = result.val();
      $scope.safeApply(f => f);
    }, error => {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
    });
  }

  /* Get Insurance Types */
  $scope.GetInsuranceTypes = function(){
    metaService.getInsuranceTypes(types => {
      $scope.insurance_types = types;
      $scope.safeApply(f => f);
    }, error => {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
    });
  }

  /* Get Quote */
  $scope.GetQuote = function(input_array){
    let type_array = [];
    for(var index in input_array){
      if($scope.in_active_policies[input_array[index].key]){
        continue;
      }
      type_array.push(input_array[index].key)
    }
    redirectService.changeStateWithLang('pickinsurance', {preselected : type_array});
  }

  function getSelectedRecommendation(){
    var SelectedInsurance = recommendationService.getModel().SelectedInsurance;
    var SelectedRecommendationKey = recommendationService.getModel().SelectedRecommendationKey;
    if($scope.mandate && $scope.mandate.status === 'signed'){
      if(SelectedInsurance && SelectedRecommendationKey){
        setTimeout(function(){
          if($scope.insurance_types){
            $scope.SelectInsuranceType(SelectedRecommendationKey);
            FoundationApi.publish('get_quote_modal','open');
            /* reset the model variables, so that the popup dosent open again */
            recommendationService.getModel().SelectedInsurance = undefined;
            recommendationService.getModel().SelectedRecommendationKey = undefined;
          }
        }, 500);
      }
    }
  }

  $scope.GetSubInsuranceType = function(item) {
    let sub_insurance_key = {};
    for(let offer_id in item.offer.comparisons){
      let offer = item.offer.comparisons[offer_id];
      let comparison_insurance_type = offer.insurance_types;
      for(let insurance_key in comparison_insurance_type){
        if(item.offer.subject!==insurance_key){
          sub_insurance_key[insurance_key] = true;
        }
      }
    }
    if(Object.keys(sub_insurance_key).length === 0){
      return false;
    }
    return sub_insurance_key;
  }

  /* Call On Controller Load */
  if(!$scope.recommendation || !$scope.recommendation.recommended) {
    $scope.GetRecommendations();
    $scope.interval = setInterval(function(){
      $scope.GetRecommendations();
    }, 500);
  }

  $scope.GetMyOffers();
  $scope.GetInsuranceTypes();
  $scope.GetMyPolicies();
  $scope.GetMyMandate();

  /* previously selected recommendation */
  getSelectedRecommendation();
}
