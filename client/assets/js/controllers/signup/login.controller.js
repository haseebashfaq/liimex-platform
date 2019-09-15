// Angular Module
angular.module('application').controller('LoginController', LoginController);

// Injections
LoginController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller','$resource', 'authService','FoundationApi', 'companyService', 'userService', 'backofficeService', 'redirectService'];

// Controller
function LoginController($rootScope, $scope, $stateParams, $state, $controller, $resource, authService, FoundationApi, companyService, userService, backofficeService, redirectService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope,
$stateParams: $stateParams,
$state: $state}));

  	$scope.login = {};
    $scope.forgot = {};
    $scope.disableNxtBtn = false;
    $scope.countries = [{code:'DE', name:'Deutschland'}];
    $scope.signup = {};
    $scope.signup.address = {};
    $scope.signup.address.country = 'Deutschland';

    /** Login Function **/
    $scope.Login = function(form){
      var params = $scope.login;
      if(!form.$valid){
 return;
}
      backofficeService.emailcheckpost($scope.login.email, () => {
        authService.login(params, user => {
          redirectService.changeStateWithLang('overview');
          $scope.login.password = null;
        }, error => {
          $scope.login.password = null;
          $rootScope.genService.showDefaultErrorMsg(error.code);
          console.error(error);
          backofficeService.logpost(error,$scope.login.email,'login','error',()=>{},()=>{});
        });
      }, error=>{
        console.error(error);
        backofficeService.logpost(error,$scope.login.email,'login','error',()=>{},()=>{});
      })
    }

    /* Reset Password */
    $scope.ResetPassword = function(form){
      if(!form.$valid){return;}
      authService.resetPassword($scope.forgot, () => {
        $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
      }, () => {
        $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
      });
    };

    /****************************/
    /*          Signup          */
    /****************************/

    // Signup Model
    $scope.signup = {
        user: {},
        company: {},
        address: {
            country: 'Deutschland'
        }
    };

    $scope.countries = [{code:'DE', name:'Deutschland'}];

    // Check Set
    const checkset = new Set();

    // Signup Function
    $scope.Signup = function(form){
      if(!form.$valid) {
 return
}
      updateLanguagePreference();
      const params = $scope.signup;
      $scope.disableNxtBtn = true;
      $rootScope.authenticating = true;
      backofficeService.emailcheckpost($scope.signup.user.email,()=>{
        authService.createUser(params.user, firebase_user => {
            userService.createUserAndCompany(firebase_user, params.user, params.company, params.address, () => {
            $scope.disableNxtBtn = false;
            $rootScope.authenticating = null;
            //AuthService.sendEmailVerification(f=>f, f=>f); this is commented out since we changed to custom verification emails
            $rootScope.genService.showDefaultSuccessMsg('Welcome!');
            redirectService.changeStateWithLang('verify');
          }, error => {
            console.log('Revoking user creation');
            authService.deleteUser(f=>f, f=>f);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error',()=>{},()=>{});
            $scope.disableNxtBtn = false;
            $rootScope.authenticating = null;
          });
        }, error => {
          backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error',()=>{},()=>{});
          $rootScope.genService.showDefaultErrorMsg(error.code);
          console.error(error);
          $scope.disableNxtBtn = false;
          $rootScope.authenticating = null;
        });
      },error => {
        console.error(error);
        backofficeService.logpost(error, $scope.signup.user.email, 'signup', 'error',()=>{},()=>{});
        $scope.disableNxtBtn = false;
        $rootScope.authenticating = null;
      })
    };

    /* Country */
    // $scope.countries = backofficeService.getcountries(data=>{
    //   $scope.countries = [{code:'DE', name:'Deutschland'}];
    //   $scope.signup.address.country = 'Deutschland';
    // }, error => {
    //   Console.error(error);
    //   BackofficeService.logpost(error, $scope.signup.user.email, 'fetch countries', 'error',()=>{},()=>{});
    // });


    function updateLanguagePreference(){
      if($rootScope.langPreference) {
        $scope.signup.user.language_preference = $rootScope.langPreference;
      }
    }

}
