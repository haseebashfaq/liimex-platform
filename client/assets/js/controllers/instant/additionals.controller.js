// Angular Module
angular.module('application').controller('InstantProductAdditionalController', InstantProductAdditionalController);

// Injections
InstantProductAdditionalController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function InstantProductAdditionalController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {
  angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

  /* Scope Variables */
  $scope.show_next = $scope.page_data.chosen_premium ? true : false;
  
	/* Save Additional Product */
	$scope.SaveProduct = function(comparison_type, product_value, next_page){
		// for the displaying of 'next' or 'skip button'
		if(product_value){
			$scope.show_next = true;	
		} else {
			$scope.show_next = false;
		}
		$scope.page_data.chosen_additional = comparison_type;
		let addons = {
			"chosen_additional":comparison_type,
			"chosen_premium":product_value,
		};
		instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, addons, additionals=>{
  		if(next_page){
  			$scope.nextPage();	
  		}
  		$scope.safeApply(fn => fn);
  	}, error => {
      log_error(error);
      $scope.safeApply(fn => fn)
    });
	}

	$scope.goBack = function(){
		$scope.previousPage();
	}

	// $scope.SkipToNextPage = function(){
	// 	$scope.nextPage();
	// }

  /* On Controller Load */
    
  }
