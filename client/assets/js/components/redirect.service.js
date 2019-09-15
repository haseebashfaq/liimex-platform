(function() {

    'use strict';

    angular.module('application').
    service('redirectService', redirectService);

    redirectService.$inject = ['$rootScope', '$state'];


    /* User Service */
    function redirectService($rootScope, $state) {

      /* Change State with Language */
      function changeStateWithLang(state, stateParam){
        if($rootScope && $rootScope.langPreference) {
          $state.go(state+'_'+$rootScope.langPreference,stateParam)
        } else {
          $state.go(state+'_de', stateParam)
        }
        // console.log('GOING TO;',state);
        // $state.go(state,stateParam);
      }

      /* Return Stuff */
      return {
        changeStateWithLang : changeStateWithLang
      }
    }
})();
