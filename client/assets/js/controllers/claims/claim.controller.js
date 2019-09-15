// Angular Module
angular.module('application').controller('ClaimController', ClaimController);

// Injections
ClaimController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'claimService', 'redirectService', 'backofficeService'];

// Function
function ClaimController($rootScope, $scope, $stateParams, $state, $controller, claimService, redirectService, backofficeService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));



}
