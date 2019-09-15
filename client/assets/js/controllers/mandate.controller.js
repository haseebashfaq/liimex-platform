// Angular Module
angular.module('application').controller('MandateController', MandateController);

// Injections
MandateController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'companyService', '$window', 'mandateService', 'genService', 'documentService', 'redirectService', 'backofficeService'];

// Function
function MandateController($rootScope, $scope, $stateParams, $state, $controller, companyService, $window, mandateService, genService, documentService, redirectService, backofficeService) {
    angular.extend(this, $controller('DefaultController',
        {
            $scope: $scope,
            $stateParams: $stateParams,
            $state: $state
        }));

    const SCOPE_REFRESH_INTERVAL = 500;


    // Return if Not Company
    if(!$rootScope.company){
      return;
    }

    /* Safe Apply */
    $scope.safeApply = function(fn) {
      if(!this.$root){
        return;
      }
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    /* Get My Mandate */
    $scope.getMyMandate = function(){
      if(!$rootScope.company.mandate){
        return;
      }
      documentService.getAndStoreMandate($rootScope.company.mandate, result => {
        $scope.mandate = result.val();
        $scope.mandate_link = $scope.mandate.signed_document_url;
        $scope.safeApply(f => f);
        if($scope.mandate_link){
          clearInterval($scope.refresher);
          redirectService.changeStateWithLang('mandatesigned');
          $rootScope.authenticating = false;
          $rootScope.loadMsg_en = null;
          $rootScope.loadMsg_de = null;
        }
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'mandate','error');

      });
    };

    /* Get My Address */
    $scope.GetMyAddresses = function(){
      $scope.addresses = [];
      $rootScope.local_load = true;
      for(const key in $rootScope.company.addresses) {
            if ($rootScope.company.addresses[key] !== true) {
              continue;
            }
            companyService.getAndStoreAddresses(key, result => {
              var address = result.val();
              if (address.main === true) {
                  $scope.main_address = address;
                  $scope.main_address_key = result.key;
              } else {
                  $scope.addresses.push(address);
              }
              $rootScope.local_load = null;
              $scope.safeApply(fn => fn);
            }, error => {
              console.error(error);
              $rootScope.genService.showDefaultErrorMsg(error.code);
              backofficeService.logpost(error, $scope.currentUser, 'mandate', 'error');

            });
      }
    };

    /* Done */
    $scope.Done = function () {
      $scope.sigExists = true;
      $rootScope.authenticating = true;
      $rootScope.loadMsg_en = 'Please wait while we process your mandate. This can take up to 15 seconds';
      $rootScope.loadMsg_de = 'Geben Sie uns ein paar Sekunden während wir Ihr Mandat verarbeiten';
      $state.reload();
      const blobToUpload = genService.dataURItoBlob($scope.dataurl);
      mandateService.signMandate(blobToUpload, $rootScope.company.mandate, $rootScope.currentUser, $rootScope.company_uid, () => {
          $rootScope.loadMsg_en = null;
          $rootScope.loadMsg_de = null;

            $scope.refresher = setInterval(() => {
            $scope.getMyMandate();
            }, SCOPE_REFRESH_INTERVAL);

      }, error => {
        $rootScope.authenticating = false;
        $rootScope.loadMsg_en = null;
        $rootScope.loadMsg_de = null;
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'mandate','error',()=>{},()=>{});

      });
    };


    /* Download Mandate */
    $scope.DownloadMandate = function(file){
      $rootScope.local_load = true;
      mandateService.downloadMandateWithFilename($rootScope.company_uid, $scope.mandate.signed_document_url, url_for_download => {
        $rootScope.local_load = null;
        $rootScope.genService.downloadWithLink(url_for_download);
        $scope.safeApply(fn=>fn);
      }, error => {
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'mandate','error',()=>{},()=>{});

      });
    };

    /* Call On Controller Load */
    $scope.sigExists = false;
    $scope.getMyMandate();
    $scope.GetMyAddresses();
    console.log('$rootScope', $rootScope.currentUser);

}
