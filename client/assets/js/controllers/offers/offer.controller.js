// Angular Module
angular.module('application').controller('OfferController', OfferController);

// Injections
OfferController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'offerService',
    'companyService', 'metaService', 'redirectService', 'backofficeService', 'documentService', '$sce',
    'genService', 'langService', 'fileService'];

// Function
function OfferController($rootScope, $scope, $stateParams, $state, $controller, offerService, companyService,
                         metaService, redirectService, backofficeService, documentService, $sce, genService,
                         langService, fileService) {

    angular.extend(this, $controller('DefaultController',
        {
            $scope: $scope,
            $stateParams: $stateParams,
            $state: $state}
            ));

    /*
    IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT !! IMPORTANT
    IF YOU ARE COMPARING WITH CURRENT POLICY, set offer_is_replacement = true
    */

    // Safety check
    if(!$rootScope.company){
      return;
    } else if($rootScope.company && !$rootScope.company.offers){
      redirectService.changeStateWithLang('overview');
      return;
    }

    // Scope Variables
    $scope.custom_fields = {};
    $scope.offer_v2_specific = [];
    $scope.langService = langService;
    // $scope.deductableValue = {};
    $scope.show_highlights = true;

    /*TODO: remove hardcoding of setting show_details to always true*/
    $scope.show_details = true;
    $scope.accept_offer_modal_accept_message = $scope.accept_offer_modal_accept_message || false;

    const DISPLAY_VERSION_2 = 2;

    /* Safe Apply */
    $scope.safeApply = function(fn) {
      if(!this.$root){
        return;
      }
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    /* Transform into Html */
    $scope.transformToHtml = function(html){
      return $sce.trustAsHtml(html);
    }

    /* Get Pushed Offer */
    $scope.GetSingleOffer = function(){
      offerService.getAndStoreSingleOffer($stateParams.offer_id, result=>{
        var offer = result.val();
        if(offer.status === 'pushed' && offer.comparisons){
          $scope.offer = offer;
          $scope.num_comparisons = Object.keys(offer.comparisons).length;
          $scope.GetPolicySpecificCriteria();
          $scope.GetIndustrySpecificCriteria();
        } else if(!$scope.accept_offer_modal_accept_message){
          redirectService.changeStateWithLang('overview');
        }
        // Check if the Offer is of Version 2
        if(offer.display_version === DISPLAY_VERSION_2) {
          $scope.offer_v2 = offer;
          $scope.BuildAdditionalArray($scope.offer_v2);
          let offer_v2 = $scope.offer_v2;
          $scope.Additional_function();
          for(var comparisonId in offer_v2.comparisons) {
            var comparisonInsuranceData = offer_v2.comparisons[comparisonId].insurance_types;
            for(var comparisonInsuranceId in comparisonInsuranceData) {
              if(comparisonInsuranceId===offer_v2.subject) {
                $scope.comparisonInsuranceId = comparisonInsuranceId;
                $scope.offer_v2_general = comparisonInsuranceData;
              } else {
                for(var specific_id in comparisonInsuranceData[comparisonInsuranceId].specific) {
                  if(comparisonInsuranceData[comparisonInsuranceId].specific[specific_id].included===true){
                    $scope.offer_v2_specific = specific_id;
                  }
                }
              }
            }
          }
        }
        $scope.safeApply(fn => fn);
      }, error => {
        console.error(error);
        redirectService.changeStateWithLang('overview');
      });
    }

    function composeDefaultDocumentName(carrier_name) {
        return $rootScope.langPreference === 'en'
            ? 'Liimex Offer '+carrier_name
            : 'Liimex Angebot '+carrier_name;
    }

    /* Prepare Downloads */
    /* Documents:list */
    $scope.PrepareDownloads = function(offer){
        const {documents} = offer;
        const carrier_name = $scope.carriers[offer.basic.carrier].name;
        $scope.documentsOffer = offer;
        $scope.loading_documents = true;
        $scope.documents = {};
        $scope.blank_documents = documents;
        let downloaded = 0;
        for (let index in documents) {
            const new_index = index;
            documentService.getDocument(documents[index].route, documents[index].key, document => {
                downloaded++;
                $scope.loading_documents = downloaded == documents.length ? null : true;
                if (!document.alias && carrier_name) {
                    document.alias = composeDefaultDocumentName(carrier_name);
                }
                $scope.documents[new_index] = document;
                $scope.safeApply(f => f);
            }, error => {
                console.error(error);
                $rootScope.genService.showDefaultErrorMsg(error.code);
                backofficeService.logpost(error, $scope.currentUser, 'comparison (preparing downloads)', 'error', () => {
                }, () => {
                });
                downloaded++;
                $scope.loading_documents = downloaded == documents.length ? null : true;
                $scope.safeApply(f => f);
            })
        }
    };

    /* Download Document */
    $scope.DownloadDocument = function (document, old) {
        if (!document || !document.file) {
            return;
        }
        const url_for_download = (old ? "policies" : "documents") + '/' + $rootScope.company_uid + '/' + document.file;
        const rename_to = document.alias ? document.alias+'.pdf' : document.file;
        fileService.downloadWithName(url_for_download, rename_to);
    };

    /* Get Policy Specific Criteria */
    $scope.GetPolicySpecificCriteria = function(){
      metaService.getPolicySpecificCriteriaFromSubjectTrigger($scope.offer.subject, policy_specific_criteria => {
        for(var key in policy_specific_criteria){
          if(policy_specific_criteria[key].disabled) {
            continue
          }
          for(var field_key in policy_specific_criteria[key].fields){
            if(policy_specific_criteria[key].fields[field_key].disabled) {
              continue
            }
            $scope.custom_fields[field_key] = policy_specific_criteria[key].fields[field_key];
          }
        }
        $scope.safeApply(f => f);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
      });
    }

    /* Get Industry Specific Criteria */
    $scope.GetIndustrySpecificCriteria = function(){
      metaService.getIndustrySpecificCriteriaFromPolicyTrigger($scope.offer.subject, industry_criteria => {
        for(var key in industry_criteria){
          if(industry_criteria[key].disabled) {
            continue
          }
          for(var field in industry_criteria[key].fields){
            if(industry_criteria[key].fields[field].disabled) {
              continue
            }
            $scope.custom_fields[field] = industry_criteria[key].fields[field];
          }
        }
        $scope.safeApply(f => f);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
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
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
      });
    }

    /* Get Carriers */
    $scope.GetCarriers = function(){
      $rootScope.local_load = true;
      $scope.carriers = {};
      metaService.getCarriers(carriers => {
        $scope.carriers = carriers;
        $rootScope.local_load = null;
        $scope.safeApply(fn=>fn);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
      });
    }

    /* Select Offer */
    $scope.SelectOffer = function(offer, key){
      $scope.accept_offer_modal_accept_message = false;
      $scope.selected_offer = offer;
      $scope.selected_offer_key = key;
      $scope.safeApply(fn=>fn);
    }

    /* Dismiss Offer */
    $scope.DismissOffer = function(){
      offerService.changeStatus($stateParams.offer_id, 'dismissed', () => {
        redirectService.changeStateWithLang('overview');
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
      });
    }

    /* Accept Offer */
    $scope.AcceptOffer = function(){
      $scope.accept_offer_modal_accept_message = true;
      offerService.appectOffer($stateParams.offer_id, $scope.selected_offer, $scope.selected_offer_key, $scope.offer.subject, () => {
        $scope.safeApply(fn=>fn);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});
      });
    }

    /* Download Policy */
    $scope.Download = function(file){
      $rootScope.local_load = true;
      offerService.downloadFile(file, $rootScope.company_uid, url_for_download => {
        $rootScope.local_load = null;
        $rootScope.genService.downloadWithLink(url_for_download);
        $scope.safeApply(fn=>fn);
      }, error => {
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'offer','error',()=>{},()=>{});

      });
    }

    $scope.HidePopup = function(){
      angular.element('#popup')[0].classList.remove('tether-enabled');

    }

    /* Build Additional Array */
    $scope.BuildAdditionalArray = function(offer){
      $scope.additional_insurance_modules_list = [];
      $scope.additional_insurance_modules_dict = {};
      for(let comparison_key in offer.comparisons){
        if(!offer.comparisons[comparison_key]) {
          continue;
        }
        for(let insurance_type in offer.comparisons[comparison_key].insurance_types){
          if(!offer.comparisons[comparison_key].insurance_types[insurance_type] || insurance_type === offer.subject){
            continue;
          }
          $scope.additional_insurance_modules_dict[insurance_type] = true;
        }
      }
      for(let key in $scope.additional_insurance_modules_dict){
        $scope.additional_insurance_modules_list.push({key:key});
      }
      $scope.safeApply(fn => fn);
    }

    $scope.GetSpecificComparisonCriteriaName = function(){
      metaService.getComparisonCriteriaForPolicy(specificComparisonData=>{
        $scope.specificComparisonData = specificComparisonData;
        $scope.safeApply(f => f);
      });
    }

    $scope.IsShowDetails = function(){
      if($scope.show_details === true) {
        $scope.show_details = false;
      } else {
        $scope.show_details = true;
      }
      $scope.safeApply(f => f);
    }

    $scope.RedirectToNewTab = function(url_id){
      var url_to_go = $state.href(url_id);
      window.open(url_to_go,'_blank');
    }

    $scope.InsuranceDescriptionBind = function(insurance_description){
      return $sce.trustAsHtml(insurance_description);
    }

    $scope.Additional_function = function(){
      for(let comparison_id in $scope.offer_v2.comparisons) {
        let comparison_obj = $scope.offer_v2.comparisons[comparison_id];
        for(let insurance_id in $scope.offer_v2.comparisons) {
          if(insurance_id !== comparison_id){
            let comparison_insurance_object = $scope.offer_v2.comparisons[insurance_id];
            for(let insurance_key in comparison_obj.insurance_types) {
              let insurance_obj = comparison_obj.insurance_types[insurance_key];
              for(let specific_id in insurance_obj.specific) {
                if(!comparison_insurance_object.insurance_types[insurance_key] || !comparison_insurance_object.insurance_types[insurance_key].specific || !comparison_insurance_object.insurance_types[insurance_key].specific[specific_id]) {
                  if(!comparison_insurance_object.insurance_types[insurance_key]) {
                    comparison_insurance_object.insurance_types[insurance_key] = {}
                  }
                  if(!comparison_insurance_object.insurance_types[insurance_key]["specific"]) {
                    comparison_insurance_object.insurance_types[insurance_key]["specific"] = {};
                  }
                  comparison_insurance_object.insurance_types[insurance_key].specific[specific_id] = {included:false}
                }
              }
            }
          }
        }
      }
      $scope.SortSpecificCriteriasForSubject($scope.offer_v2.comparisons);
    }

    $scope.IsDisplay = function(additional_key){
      let show_additional_module = false;
      for(let comparison_id in $scope.offer_v2.comparisons) {
        let comparison_obj = $scope.offer_v2.comparisons[comparison_id];
        let insurance_obj = comparison_obj.insurance_types[additional_key];
        if(insurance_obj && insurance_obj.specific) {
          for(let specific_id in insurance_obj.specific) {
            if(insurance_obj.specific[specific_id].included) {
              show_additional_module = true;
              break;
            }
          }
          if(show_additional_module)
            break;
        }
      }
      return show_additional_module;
    }

    $scope.SortSpecificCriteriasForSubject = function(comparison_obj){
      $scope.sorted_general_specific_criteria = {};
      for(let comparison_id in comparison_obj) {
        $scope.sorted_general_specific_criteria[comparison_id] = [];
        let comparison_item = comparison_obj[comparison_id];
        if(comparison_item.insurance_types && comparison_item.insurance_types[$scope.offer_v2.subject] && comparison_item.insurance_types[$scope.offer_v2.subject].specific) {
          for(let specific_id in comparison_item.insurance_types[$scope.offer_v2.subject].specific) {
            $scope.sorted_general_specific_criteria[comparison_id].push({key:specific_id,value:comparison_item.insurance_types[$scope.offer_v2.subject].specific[specific_id]});
          }
        }
      }
      $scope.safeApply(f => f);
    }

    $scope.IsDisplayComparisonCriteria = function(specific_key,insurance_key){
      let display_comparison = false;
      for(let comparison_key in $scope.offer_v2.comparisons){
        let comparison_obj = $scope.offer_v2.comparisons[comparison_key];
        let insurance_obj = comparison_obj.insurance_types[insurance_key];
        if(!insurance_obj){
          continue;
        }
        let specific_obj = insurance_obj.specific[specific_key];
        if(specific_obj.included){
          display_comparison = true;
          break;
        }
      }
      $scope.safeApply(f => f);
      return display_comparison;
    }

    $scope.IsHighlight = function(){
      let _return = false;
      for(let comparison_id in $scope.offer.comparisons){
        for(let specific_id in $scope.offer.comparisons[comparison_id].insurance_types[$scope.offer.subject].specific){
          if($scope.offer.comparisons[comparison_id].insurance_types[$scope.offer.subject].specific[specific_id].included===true){
            _return = true;
            break;
          }
        }
      }
      return _return;
    }

    /* On Controller Load */
    $scope.GetSingleOffer();
    $scope.GetInsuranceTypes();
    $scope.GetCarriers();
    $scope.GetSpecificComparisonCriteriaName();

}
