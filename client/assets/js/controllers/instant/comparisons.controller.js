// Angular Module
angular.module('application').controller('InstantProductSelectController', InstantProductSelectController);

// Injections
InstantProductSelectController.$inject = [
	'$rootScope',
	'$scope',
	'$stateParams',
	'$state',
	'$controller',
	'redirectService',
	'backofficeService',
	'apiService',
	'$sce',
	'instantService'
];

// Function
function InstantProductSelectController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, $sce, instantService) {
	angular.extend(this, $controller('DefaultController', {
		$scope,
		$stateParams,
		$state
	}));

	/** Scope Variables **/
	$scope.deductible = $scope.page_data.chosen_deductible ? $scope.page_data.chosen_deductible : 500;

	/**
	 * Get Comparisons
	 */
	$scope.GetComparisons = function(){
		$scope.comparisons = $scope.page_data.comparisons;
		console.log($scope.comparisons)
	}

	$scope.GetComparisonPlan = function(val){
		if(val){
			$scope.comparisonPlan = $scope.page_data.comparisons[val];
			//console.log(val,$scope.comparisonPlan);
		}
	}

	$scope.goBack = function(){
		$scope.previousPage();
	}

	/* Save Product */
	$scope.SaveComparison = function(comparison_type, deductible, nextPage){
		$scope.setChildLoader(true);		
		$scope.page_data.chosen_comparison = comparison_type;
		$scope.page_data.chosen_deductible = eval(deductible);
		instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, $scope.page_data, ()=> {
			$scope.setChildLoader(false);
			if(nextPage){
				$scope.nextPage();
			}
		}, error => {
			$rootScope.genService.showDefaultErrorMsg(error.status);			
		});
	}

	/* Transform into Html */
  $scope.transformToHtml = function(html){
  	if(html){
  		$scope.transformed_html = $sce.trustAsHtml(html);
    		return true;
  	} else {
  		return false;
  	}
  }

	/* On Controller Load */
	$scope.GetComparisons()

}
