// Angular Module
angular.module('application').controller('DashboardController', DashboardController);

// Injections
DashboardController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'authService', 'userService', 'FoundationApi', 'companyService', 'redirectService', 'backofficeService', '$window'];

// Function
function DashboardController($rootScope, $scope, $stateParams, $state, $controller, authService, userService, FoundationApi, companyService, redirectService, backofficeService, $window) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    /* Signout */
  	$scope.Signout = function(){
      authService.logout(function(){
        $rootScope.genService.showDefaultSuccessMsg('You have successfully logged out');
      }, function(error){
        $rootScope.genService.showDefaultErrorMsg('Could not log you out');
      });
    }

    // Performing Requests to update models

}
