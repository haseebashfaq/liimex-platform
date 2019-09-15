// Angular Module
angular.module('application').controller('ContactusController', ContactusController);

// Injections
ContactusController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'metaService', 'companyService', 'authService', 'recommendationService', 'redirectService', 'backofficeService'];

// Function
function ContactusController($rootScope, $scope, $stateParams, $state, $controller, metaService, companyService, authService, recommendationService, redirectService, backofficeService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
    const start_hour = 8
    const finish_hour = 17
    const start_time = start_hour * 3600 - 7200
    const finish_time = finish_hour * 3600 - 7200

    $scope.is_past_working_hours = function (){
      var current_time = Math.floor(Date.now() / 1000)%(3600*24)
      if ((current_time < start_time) || (current_time > finish_time))
       return true
      return false
    }
    if ($rootScope.user && $rootScope.user.force_url){
     $scope.user.force_url = "pickindustry"
    }
  }
