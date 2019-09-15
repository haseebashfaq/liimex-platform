// Angular Module
angular.module('application').controller('FooterController', FooterController);

// Injections
FooterController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'userService', 'backofficeService'];

// Controller
function FooterController($rootScope, $scope, $stateParams, $state, $controller,userService,backofficeService) {

     var _templateUrl = 'partials/en/footer.html';

     $scope.changeLang = function(lang){
        $rootScope.langPreference = lang;
        /*crop the last tree chars of the state name*/
        var currentLangSuffix = $state.current.name.slice(-3);
        var currentUrlName = $state.current.name.slice(0,-3);
        var reRouteTo =$state.current.name;
        if (currentLangSuffix =='_de' || currentLangSuffix =='_en' ) {
          reRouteTo = currentUrlName + '_' + lang;
          if ($state.href(reRouteTo)) {
              saveLangPreferenceInDB(lang);
              $state.go(reRouteTo);
          }
        }
     }

    $scope.getTemplateUrl = function() {
        if($rootScope.langPreference =='de') {
          _templateUrl = 'partials/de/footer.html';
        }
        else {
          _templateUrl = 'partials/en/footer.html';
        }
        return _templateUrl;
    }

    function saveLangPreferenceInDB (lang){
      if ($rootScope.currentUser && $rootScope.user) {
          var newUserData ={};
          angular.copy($rootScope.user, newUserData);
          newUserData.language_preference = lang;
          userService.updateUserInformation($rootScope.currentUser,$rootScope.user,newUserData);
      }
    }
}
