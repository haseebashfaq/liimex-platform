// Angular Module
angular.module('application').controller('PolicyController', PolicyController);

// Injections
PolicyController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', '$controller', 'metaService',
    'policyService', 'redirectService', 'offerService', 'documentService', 'FoundationApi', 'langService',
    'fileService', 'backofficeService'];

// Function
function PolicyController($rootScope, $scope, $stateParams, $state, $controller, metaService, policyService, redirectService, offerService, documentService, FoundationApi, langService, fileService, backofficeService) {
    angular.extend(this, $controller('DefaultController', {
        $scope: $scope,
        $stateParams: $stateParams,
        $state: $state
    }));

    if (!$rootScope.company) {
        return;
    }

    /* Scope Variables */
    $scope.new_offer = {}
    $scope.comparisonDataAdditional = {}
    $scope.langService = langService;

    /*TODO: remove hardcoding of setting show_details to always true*/
    $scope.show_details = true;
    const DISPLAY_VERSION_2 = 2;

    var not_dismissed_policies = {};

    /* Safe Apply */
    $scope.safeApply = function (fn) {
        if (!this.$root) {
            return;
        }
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && typeof fn === 'function') {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    /* Get All Policy Criteria */
    $scope.GetMyPolicies = function(){
      $scope.policies = [];
      not_dismissed_policies = {}
      $scope.total_premium = 0;
      for(var key in $rootScope.company.policies){
        policyService.getAndStoreSinglePolicy(key, result=>{
          var policy = result.val();
          policy.status = policy.status || "pending"
          if(policy.status !== 'deleted' && policy.status !== 'disabled' && policy.status !== 'pending') {
            $scope.policies.push({key:result.key, policy:policy});
            not_dismissed_policies[policy.subject] = {key:result.key, policy:policy};
            $scope.show_total = true;
            if(policy.premium || policy.basic.premium){
              if(policy.basic) {
                $scope.total_premium += policy.basic.premium * (1+policy.basic.insurance_tax*0.01)
              } else {
                $scope.total_premium += policy.premium
              }
            }
          }
          $scope.safeApply(fn => fn);
        }, error => {
          console.error(error);
          $rootScope.genService.showDefaultErrorMsg(error.code);
          backofficeService.logpost(error,$scope.currentUser,'policy','error',()=>{},()=>{});
        });
      }
    }

    /* Remove Policy */
    $scope.RemovePolicy = function (uid) {
        policyService.delete_policy($rootScope.company_uid, uid, () => {
            $rootScope.genService.showDefaultSuccessMsg('Removed');
            $state.reload();
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });
        })
    }

    /* Get Insurance Types */
    $scope.GetInsuranceTypes = function () {
        $scope.insurance_types = {};
        metaService.getInsuranceTypes(insurance_types => {
            $scope.insurance_types = insurance_types;
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', fn => fn, fn => fn);
        });
    }

    /* Get Carriers */
    $scope.GetCarriers = function () {
        $scope.carriers = {};
        metaService.getCarriers(carriers => {
            $scope.carriers = carriers;
            $scope.safeApply(fn => fn);
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });

        });
    }

    /* Download Policy */
    $scope.Download = function (file) {
        $scope.DownloadDocument(file, true);
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

    function composeDefaultDocumentName(policy) {
        return $rootScope.langPreference === 'en'
                ? 'Liimex Policy ' + policy.basic.policy_number
                : 'Liimex Police ' + policy.basic.policy_number;
    }

    /* Prepare Downloads */
    /* Documents:list */
    $scope.PrepareDownloads = function (policy) {
        const {documents} = policy;
        $scope.documentsPolicy = policy;
        $scope.loading_documents = true;
        $scope.documents = {};
        $scope.blank_documents = documents;
        let downloaded = 0;
        for (const index in documents) {
            const new_index = index;
            documentService.getDocument(documents[index].route, documents[index].key, document => {
                downloaded++;
                if (!document.alias && policy.basic.policy_number) {
                    document.alias = composeDefaultDocumentName(policy);
                }
                $scope.loading_documents = downloaded == documents.length ? null : true;
                $scope.documents[new_index] = document;
                $scope.safeApply(f => f);
            }, error => {
                console.error(error);
                $rootScope.genService.showDefaultErrorMsg(error.code);
                backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
                }, () => {
                });
                downloaded++;
                $scope.loading_documents = downloaded == documents.length ? null : true;
                $scope.safeApply(f => f);
            })
        }
    }

    /* Perform upload */
    $scope.PerformUpload = function (file) {
        if (!file) {
            return
        }
        $rootScope.local_load = true;
        policyService.uploadPolicy(file, $rootScope.company_uid, file_url => {
            policyService.registerExistingPolicy($rootScope.company_uid, file_url, policy => {
                $rootScope.local_load = null;
                $rootScope.genService.showDefaultSuccessMsg('File Uploaded');
                $scope.safeApply(f => f);
            }, error => {
                console.error(error);
                $rootScope.genService.showDefaultErrorMsg(error.code);
                backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
                }, () => {
                });
            })
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });

        });
    }

    /* Select Policy */
    $scope.SelectPolicy = function (key, policy) {
        $scope.selected_policy_key = key;
        $scope.selected_policy = policy;
    }

    /* Cancel Policy */
    $scope.CancelPolicy = function (key) {
        policyService.delete_policy($rootScope.company_uid, key, () => {
            $rootScope.genService.showDefaultSuccessMsg('Deleted');
            $state.reload();
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });

        })
    }

    /* Get Policy Specific Criteria */
    $scope.GetPolicySpecificCriteria = function () {
        metaService.getPolicySpecificCriteria(policy_specific_criteria => {
            $scope.custom_fields = {}
            $scope.policy_specific_criteria = policy_specific_criteria;
            for (var key in policy_specific_criteria) {
                if (policy_specific_criteria[key].disabled === true) {
                    continue;
                }
                for (var field in policy_specific_criteria[key].fields) {
                    if (policy_specific_criteria[key].fields[field].disabled === true) {
                        continue;
                    }
                    $scope.custom_fields[field] = policy_specific_criteria[key].fields[field]
                }
            }
            $scope.safeApply(f => f);
            $scope.GetIndustrySpecificCriteria();
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });
        });
    }

    /* Get Mandate */
    $scope.GetMyMandate = function () {
        if (!$rootScope.company.mandate) {
            return;
        }
        documentService.getAndStoreMandate($rootScope.company.mandate, result => {
            $scope.mandate = result.val();
            $scope.safeApply(f => f);
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            
            });
        });
    }

    /* Get Quote From Dropdown */
    $scope.GetQuoteFromDropdown = function () {
        if ($scope.new_offer.subject) {
            // If($scope.mandate.status === 'signed'){
            $rootScope.local_load = true;
            $scope.disableGetQuoteBtn = true;
            offerService.requestOfferWithInsuranceType($rootScope.company_uid, $scope.new_offer.subject, () => {
                $rootScope.local_load = null;
                $scope.disableGetQuoteBtn = false;
                $scope.new_offer.subject = null;
                $scope.safeApply(f => f);
                $rootScope.genService.showDefaultSuccessMsg('Collecting Offer');
                FoundationApi.publish('offer_success_modal', 'show');
            }, error => {
                console.error(error);
                $rootScope.local_load = null;
                $rootScope.genService.showDefaultErrorMsg(error.code);
                backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
                }, () => {
                });
                $scope.disableGetQuoteBtn = false;
            });
            // } else {
            //   FoundationApi.publish('sign_reminder_modal','show');
            // }
        }
    }

    /* Get Industry Specific Criteria */
    $scope.GetIndustrySpecificCriteria = function () {
        metaService.getIndustryCriteria(industry_criteria => {
            $scope.industry_criteria = industry_criteria;
            for (var key in industry_criteria) {
                if (industry_criteria[key].disabled === true) {
                    continue;
                }
                for (var field in industry_criteria[key].fields) {
                    if (industry_criteria[key].fields[field].disabled === true) {
                        continue;
                    }
                    $scope.custom_fields[field] = industry_criteria[key].fields[field]
                }
            }
            $scope.safeApply(f => f);
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.currentUser, 'policy', 'error', () => {
            }, () => {
            });
        });
    }

    /**
     * Get The specific Criteria for all Policies
     */
    $scope.GetSpecificDataForPolicy = function () {
        metaService.getComparisonCriteriaForPolicy(comparisonData => {
            $scope.comparisonData = comparisonData;
            $rootScope.local_load = null;
            $scope.safeApply(fn => fn);
        });
    }

    /**
     * Checks if a module is included
     */
    $scope.IsAdditionalModule = function(insurance_object){
        let isValidInsuranceType = false;
        if(insurance_object.general){
          isValidInsuranceType = true;
        }
        return isValidInsuranceType;
    }

    /**
     * Checks if a module has specific criteria
     */
    $scope.IsAdditionalModuleCriteria = function(insurance_object){
        let isAdditionalCriteria = false;
        for(let specificId in insurance_object.specific){
            let specificobj = insurance_object.specific[specificId];
            if(specificobj.included){
                isAdditionalCriteria = true;
                break
            }
        }
        return isAdditionalCriteria;
    }

    /**
     * Checks if an Additional Module is included
     */
    $scope.IsDisplayMore = function (policy_obj) {
        let isDisplayAdditionalModule = false;
        for (const insurance_key in policy_obj.insurance_types) {
            if (insurance_key !== policy_obj.subject) {
                const insurance_object = policy_obj.insurance_types[insurance_key];
                if ($scope.IsAdditionalModule(insurance_object)) {
                    isDisplayAdditionalModule = true;
                    break;
                }
            }
        }
        return isDisplayAdditionalModule;
    }

    /**
     * Check If there are any specific Criteria
     */
    $scope.IsDisplayHighlights = function(highlight_obj){
      let isDisplayHighlight = false;
      if(highlight_obj!==undefined){
        for(let specificId in highlight_obj){
          let specificobj = highlight_obj[specificId];
          if(specificobj.included){
            isDisplayHighlight = true;
            break;
          }
        }
      }
      return isDisplayHighlight;
    }

    /* On Controller Load */
    $scope.GetMyPolicies();
    $scope.GetCarriers();
    $scope.GetInsuranceTypes();
    $scope.GetPolicySpecificCriteria();
    $scope.GetMyMandate();
    $scope.GetSpecificDataForPolicy();
    
}
