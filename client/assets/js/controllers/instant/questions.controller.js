// Angular Module
angular.module('application').controller('IPQController', IPQController);

// Injections
IPQController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'backofficeService', 'instantService'];

// Function
function IPQController($rootScope, $scope, $stateParams, $state, $controller, backofficeService, instantService) {

	/* Get Questions */
	function getQuestions(){
    	if($scope.page_data){
			$scope.questions = $scope.page_data.questions;
			$scope.display_questions = $rootScope.genService.dictToArray($scope.questions);
			$scope.safeApply(fn => fn);
		}
	}

	/* Submit Answers */
	$scope.submitAnswers = function(){
		$scope.setChildLoader(true);
		instantService.updateInstantProcess($stateParams.page, $stateParams.process_id, $scope.page_data, ()=> {
				$scope.setChildLoader(false);							
				$scope.nextPage();
		}, error => {
			$rootScope.genService.showDefaultErrorMsg(error.status);			
		});
	}

	/* Go Back */
	$scope.goBack = function(){
		$scope.previousPage();
	}

	/* On Controller Load */
	getQuestions();
}
