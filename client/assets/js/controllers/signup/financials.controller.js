// Angular Module
angular.module('application').controller('FinancialsController', FinancialsController);

// Injections
FinancialsController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller','$resource', 'companyService', 'redirectService', 'backofficeService'];

// Controller

function FinancialsController($rootScope, $scope, $stateParams, $state, $controller, $resource, companyService, redirectService, backofficeService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    // Variables
    $scope.financials = {};


    var isEditMode = $stateParams.isEdit;


    // Company UID
    if(!$rootScope.company_uid){
      return;
    }
    else{
      companyService.getCompanyFromModel($rootScope.company_uid, company => {
          angular.copy(company.financials, $scope.financials);
        });
    }

    if(isEditMode){
      // clear forceurl
      $rootScope.user.force_url = '';
    }

    /* Submit Financials */
    $scope.SubmitFinancials = function(form){
      var forceurl_pickActivity = null;
      if(!isEditMode)
        forceurl_pickActivity = 'pickactivity'
      
      companyService.updateFinancials($rootScope.company_uid, $rootScope.currentUser,
        {turnover: $scope.financials.turnover}, forceurl_pickActivity,
       ()=> {
        // goto account page if this page is opened in edit mode (bypass forceurl).
        if(isEditMode){
          redirectService.changeStateWithLang('account');
        }
        else{
          $rootScope.user.force_url = forceurl_pickActivity;
          redirectService.changeStateWithLang(forceurl_pickActivity);
        }

      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.message);
      });
    }

    /*previous button click*/
    $scope.Back = function(){
      // goto account page if this page is opened in edit mode (bypass forceurl).
      if(isEditMode){
        redirectService.changeStateWithLang('account');
      }
      else{
        $rootScope.user.force_url = 'pickindustry';
        redirectService.changeStateWithLang('pickindustry');
      }
    }

}
