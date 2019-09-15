// Angular Module
angular.module('application').controller('InstantProductUserController', InstantProductUserController);

// Injections
InstantProductUserController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'authService', 'instantService'];

// Function
function InstantProductUserController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, authService, instantService) {
  angular.extend(this, $controller('DefaultController', {$scope: $scope,
    $stateParams: $stateParams,
    $state: $state}));
    
    /* Scope Variables */
    $scope.signin ={};
    $scope.user ={};
    
    $scope.SaveUser = function(){
      const user_data = {
        "email":$scope.user.email,
        "first_name":$scope.user.first_name,
        "last_name":$scope.user.last_name,
        "phone":$scope.user.phone
      };
      instantService.saveUser('signup',$stateParams.process_id, user_data, $stateParams.page, ()=>$state.reload(), error => {
        $rootScope.genService.showDefaultErrorMsg(error);
        log_error(error);
        $scope.safeApply(fn => fn)
      });
    }
    
    /** Login Function **/
    $scope.Login = function(form){
      var params = $scope.signin;
      if(!form.$valid){
        return; 
      }
      backofficeService.emailcheckpost($scope.signin.email, () => {
        authService.login(params, () => {
          instantService.saveUser('login',$stateParams.process_id, {"email":$scope.signin.email}, $stateParams.page, ()=>{
            $scope.signin.password = null;
            $state.reload()
          }, error => {
            log_error(error);
            $scope.safeApply(fn => fn)
          });
        }, error => {
          $scope.signin.password = null;
          $rootScope.genService.showDefaultErrorMsg(error.code);
          console.error(error);
          backofficeService.logpost(error,$scope.signin.email,'login','error',()=>{},()=>{});
        });
      }, error=>{
        console.error(error);
        backofficeService.logpost(error,$scope.signin.email,'login','error',()=>{},()=>{});
      })
    }
    
    $scope.goBack = function(){
      $scope.previousPage();
    }
    
    /* On Controller Load */
    
  }
  