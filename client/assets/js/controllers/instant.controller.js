// Angular Module
angular.module('application').controller('InstantController', InstantController);

// Injections
InstantController.$inject = [
  '$rootScope',
  '$scope',
  '$stateParams',
  '$state',
  '$controller',
  'redirectService',
  'backofficeService',
  'apiService',
  'instantService'
];

/* Variables */
let PAGE_SKIP = 1;
const START_INDEX = 0;
const RETRY_PAGE = 'retry';

/* Constructor */
function InstantController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {

  /* Scope Variables */
  $scope.show_prev = Number($stateParams.page) > START_INDEX;

  /* Safe Apply */
  $scope.safeApply = function(fn) {
    if(!this.$root){
      return;
    }
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  }

  /* Log Error */
  function log_error(error){
    backofficeService.logpost(error, 'user-unknown','instant','error', fn=>fn, fn=>fn);
  }

  /* Child Loader */
  $scope.setChildLoader = function(value = false){
    $scope.child_loading = value;
    $scope.safeApply(fn => fn);
  }

  /* Next Page */
   $scope.nextPage = function(){
    const next_page_number = Number($stateParams.page) + PAGE_SKIP;
    directToInstantPage($scope.data, $stateParams.process_id, next_page_number)
  }

  /* Previous Page */
  $scope.previousPage = function(){
    const prev_page_number = Number($stateParams.page) - PAGE_SKIP;
    directToInstantPage($scope.data, $stateParams.process_id, prev_page_number);
  }

  /* Get Parent Data */
  $scope.getParentData = function(){
    return $scope.data;
  }

  /* Direct To Instant Page */
  function directToInstantPage(data, process_id, page_number){
    const stateparam_page = eval($stateParams.page);
    const next_page = data.instant_product_request;
    let forceredirect = page_number;
    $scope.retryObj = data;
    if(!data.instant_product_request) {
      $scope.page_type = RETRY_PAGE;
      return log_error()
    }
    if(next_page){
      $scope.page_data = next_page;
      $scope.page_type = $scope.page_data.page_type;
      if($scope.page_data.login_required){
        $scope.isLoggedIn = Boolean(data.uid);
      }
      if(stateparam_page > eval(next_page.current_page)){
        forceredirect = eval(next_page.current_page);
      } 
      redirectService.changeStateWithLang('instant', {
        product_id: null,
        new: null,
        page: forceredirect,
        process_id: process_id
      });
    }
    return $scope.safeApply(fn => fn)
  }

  /* Get Instant Process */
  function getInstantProcess(process_id, callback){
    const page_number = $stateParams.page || 0;
    instantService.getInstantProcess(process_id, page_number, data => {
      $scope.data = data;
      callback($scope.data);
    }, error => {
      $scope.page_type = RETRY_PAGE;
      log_error(error);
      $scope.safeApply(fn => fn)
    })
  }

  /* Post Instant Process */
  function postInstantProcess(callback){
    instantService.postInstantProcess($stateParams.product_id, callback, error => {
      $rootScope.genService.showDefaultErrorMsg(error.status);
      $scope.page_type = RETRY_PAGE;
      log_error(error);
      $scope.safeApply(fn => fn)
    });
  }

  /* New Instant Process */
  function newInstantProcess(){
    if($stateParams.product_id){
      postInstantProcess(data => {
        getInstantProcess(data.instant_product_request_id, process => {
          directToInstantPage(process, data.instant_product_request_id, START_INDEX);
        })
      });
    }
  }

  /* Existing Instant Process */
  function existingInstantProcess(){
    getInstantProcess($stateParams.process_id, process => {
      directToInstantPage(process, $stateParams.process_id, $stateParams.page || START_INDEX);
    })
  }

  /* Checking for Child or Parent */
  if($stateParams.new === 'true' && $stateParams.product_id){
    newInstantProcess();
  } else {
    existingInstantProcess();
  }
}
