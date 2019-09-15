// Angular Module
angular.module('application').controller('InstantProductCheckoutController', InstantProductCheckoutController);

// Injections
InstantProductCheckoutController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function InstantProductCheckoutController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

  /* Scope Variables */
  var today = new Date();
  $scope.date_today = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  $scope.checkout = {};
  $scope.disable_fields = {};
  $scope.plantype = "";
  let checkoutPageNumber;
  $scope.isMandateSigned = false;

  /* Get All the Data of instant product request */
  function initCheckoutPage(){
    $scope.data_set = $scope.page_data.pages;
    for(let pageNumber in $scope.data_set){
      if($scope.data_set[pageNumber].checkout){
        checkoutPageNumber = pageNumber;
        $scope.checkout = $scope.data_set[pageNumber].checkout;
        $scope.checkout_page = $scope.data_set[pageNumber];
        $scope.user = $scope.checkout.user;
        break;
      }
    }
    $scope.plantype = $scope.checkout.chosen_package ? $scope.checkout.chosen_package : 'yearly';
    $scope.mandate = $scope.checkout.mandate ? true : false;
    $scope.disable_fields = angular.copy($scope.checkout);
    GetComparisons();
    GetAdditionals();
    $scope.CalculatePremium();
    $scope.safeApply(fn => fn);
  }

  /* Get Comparison Data */
  function GetComparisons(){
    for(let page_id in $scope.data_set){
      if($scope.data_set[page_id].comparisons){
        $scope.chosen_comparison = $scope.data_set[page_id].comparisons[$scope.data_set[page_id].chosen_deductible][$scope.data_set[page_id].chosen_comparison];
      }
    }
  }

  /* Get Additional comparison Data */
  function GetAdditionals(){
    for(let page_id in $scope.data_set){
      if($scope.data_set[page_id].additionals){
        $scope.chosen_additional = $scope.data_set[page_id];
      }
    }
  }

	/* Calculate the net premium */
  $scope.CalculatePremium = function(){
    if($scope.chosen_comparison){
      if($scope.plantype==='yearly'){
        $scope.premium_comparison = $scope.chosen_comparison.premium_monthly*12;
      } else {
        $scope.premium_comparison = $scope.chosen_comparison.premium_monthly;
      }
    }
    if($scope.chosen_additional.chosen_additional>=0){
      if($scope.plantype==='yearly'){
        $scope.premium_additional = $scope.chosen_additional.chosen_premium*12;
      } else {
        $scope.premium_additional = $scope.chosen_additional.chosen_premium;
      }
    }
    $scope.GetTotalNetSum();
    $scope.safeApply(fn => fn);
  }

  $scope.GetTotalNetSum = function(){
    /* Add values for tax and discount */
    if($scope.plantype==='yearly'){
      $scope.total_net_premium = ($scope.chosen_comparison.premium_monthly * 12) + (($scope.chosen_additional.chosen_premium || 0) * 12);
      $scope.tax_calculated = $scope.total_net_premium * $scope.checkout.tax_percent / 100;
      $scope.discount_value = $scope.total_net_premium * $scope.checkout.yearly_discount / 100;
      $scope.total_payable = $scope.total_net_premium + $scope.tax_calculated - $scope.discount_value;
    } else {
      $scope.total_net_premium = $scope.chosen_comparison.premium_monthly + ($scope.chosen_additional.chosen_premium || 0);
      $scope.tax_calculated = $scope.total_net_premium * $scope.checkout.tax_percent / 100;
      $scope.discount_value = null;
      $scope.total_payable = $scope.total_net_premium + $scope.tax_calculated - $scope.discount_value;
    }
  }

  $scope.SaveCheckoutData = function(){
    if(!$scope.checkout.sepa || !$scope.checkout.company){
      return;
    }
    let checkout_obj = {
      "chosen_package": $scope.plantype,
      "company": {
        "name": $scope.checkout.company.name,
        "type": $scope.checkout.company.type,
        "phone": $scope.checkout.company.phone
      },
      "address": {
        "street": $scope.checkout.address.street,
        "zip": $scope.checkout.address.zip,
        "city": $scope.checkout.address.city
      },
      "sepa": {
        "account_holder": $scope.checkout.sepa.account_holder,
        "bic": $scope.checkout.sepa.bic,
        "iban": $scope.checkout.sepa.iban 
      },
      "mandate": {
        "signature": $scope.dataurl
      },
      "yearly_discount": $scope.checkout.yearly_discount,
      "tax_percent": $scope.checkout.tax_percent,
      "validity_years": $scope.checkout.validity_years,
    }
    instantService.saveCheckout($stateParams.page, $stateParams.process_id, checkout_obj, checkout=>{
      console.log(checkout);
      //$state.go('instantproductthankyou_en');
      $scope.nextPage();
    }, error => {
      log_error(error);
      $scope.safeApply(fn => fn)
    });
  }

  $scope.RemoveAdditional = function(){
    let additional_page_number;
    for(let pageNumber in $scope.data_set){
      if($scope.data_set[pageNumber].additionals){
        additional_page_number = pageNumber;
      }
    }
    let addons = {
      "chosen_additional":null,
      "chosen_premium":null,
    };
    instantService.updateInstantProcess(additional_page_number, $stateParams.process_id, addons, additionals=>{
      $scope.safeApply(fn => fn);
      $state.reload();
    }, error => {
      log_error(error);
      $scope.safeApply(fn => fn)
    });
  }

  $scope.goBack = function(){
    $scope.previousPage();
  }

  $scope.AcceptMandate = function(){
    $scope.mandate = true;
  }

  $scope.AcceptSepaMandate = function(){
    $scope.sepa = true;
  }

  $scope.AcceptTermsAndConditions = function(){
    $scope.termsAndConditions = true;
  }
  
  /* On Controller Load */
  initCheckoutPage();
}
