// Angular Module
angular.module('application').controller('VerifyController', VerifyController);

// Injections
VerifyController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'authService', 'userService', 'redirectService', 'backofficeService', '$window'];

// Function
function VerifyController($rootScope, $scope, $stateParams, $state, $controller, authService, userService, redirectService, backofficeService, $window) {

  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    /* Resend Verification Email */
    $scope.ResendVerificationEmail = function(){
      if($rootScope.local_load === true) {
        return
      }
      $rootScope.local_load = true;
      userService.sendVerificationEmail($rootScope.currentUser, ()=> {
        $rootScope.genService.showDefaultSuccessMsg('Sent');
        $rootScope.local_load = null;
      }, error=>{
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'verify','error',()=>{},()=>{});
      });
    }

    $scope.recheck = function(){
      $window.location.reload();
    }

    $scope.CheckIfVerified = function(){
      if(!$rootScope.currentUser) {return}
      if(authService.isEmailVerified() === true){
        userService.update($rootScope.currentUser, {force_url:'pickindustry'}, f=>{
          $state.reload();
        });
      }
    }

    $scope.Reload = function(){
      $state.reload();
    }

    /* Check If Verified */
    $scope.CheckIfVerified();
}
