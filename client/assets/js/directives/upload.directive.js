/*
* This Directive handles File Uploads
*/
angular.module('application').directive("fileUpload", [
  '$compile',
  '$http',
  '$templateCache',
  '$templateRequest',
  '$sce',
  '$stateParams',
  '$rootScope',
  'backofficeService',
  'fileService', function($compile, $http, $templateCache, $templateRequest, $sce, $stateParams, $rootScope, backofficeService, fileService) {

  /* Constants */
  const UPLOAD_ERROR = 'upload_error';
  const SENDLOG_ID = 'uploader';
  const INSTANT_DIRECTORY = 'product_documents';

  /* Linker */
  function linker(scope, element, attrs){

    /* Scope Variables */
    scope.files_to_upload = {};
    scope.showUploader = false;
    scope.isUploadDone = false;

    /* Safe Apply */
    scope.safeApply = function(fn) {
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

    /* Upload Files */
    scope.uploadFiles = function(file, process_id, callback, err_call){
      fileService.uploadFileWithCustomEndpoint([INSTANT_DIRECTORY, process_id], "", file, result =>{
        scope.ngModel = INSTANT_DIRECTORY.concat('/',process_id,'/',result);
        scope.showUploader = false;
        scope.isUploadDone = true;
        return callback(result);
      }, ()=>{
        err_call({code:UPLOAD_ERROR})
        return null;
      });
    }

    /* Perform Upload */
    scope.performUpload = function(files){
      scope.uploadFiles(files, $stateParams.process_id, file_url => {
        scope.safeApply(fn => fn);
      }, error => {
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error, $scope.currentUser, SENDLOG_ID, 'error',()=>{},()=>{});
      });
    }

    /* File Change preview */
    scope.FileChanged = function(file){
      scope.isChanged = true;
      scope.showUploader = true;
      scope.performUpload(file);
    }
  }

  return {
    restrict: 'AEC',
    scope: false,
    link: linker,
    replace: false
  };
}]);
