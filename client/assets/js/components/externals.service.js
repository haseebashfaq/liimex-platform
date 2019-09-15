(function() {
  
  'use strict';
  
  angular.module('application').
  service('externalService', externalService);
  
  externalService.$inject = [ 'companyService', 'metaService', '$rootScope', '$window', 'uuid2'];
  
  function externalService(companyService, metaService, $rootScope, $window, uuid2){

    /**
     * Init FreshChat
     */
    function initFreshChat(){
      if(!($rootScope.user && $rootScope.company && document)) return;  

      // document.write('<script type="text/javascript" src="https://wchat.freshchat.com/js/widget.js" async>// ProductionAnalyticsCodeHere</script>');
      // $window.fcSettings = {
      //   token: "32875de7-d02c-4787-9f7f-0680de683c95",
      //   host: "https://wchat.freshchat.com",
      //   externalId: "uuid2.newuuid()",
      //   firstName: "$rootScope.user.first_name",
      //   lastName: "$rootScope.user.last_name",
      //   email: "$rootScope.user.email",
      //   phone: "$rootScope.company.phone",
      //   phoneCountryCode: "+49"
      // }
    }

    /* Return Stuff */
    return {
      initFreshChat
    }
    
  }
    
})();
