(function() {

    'use strict';

    angular.module('application').
    service('fileService', fileService);

    fileService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'uuid2'];

    // Parse File Name
    function parseFileName(userId, blob, uuid2){
        var extension = blob.type.split('/')[1];
        return uuid2.newuuid()+'.'+extension;
    }

    /* Get Dynamic Endpoint */
    /* Needed to reset endpoint between users sign in/out */
    function getEndpoint(routeList){
        var route = "";
        for(var i in routeList){
          route = route.concat(routeList[i],'/');
        }
        console.log('Requested Storage Route:',route);
        return firebase.storage().ref().child(route);
    }

    function fileService($rootScope, firebase, $firebaseObject, uuid2) {

        // Policies Reference
        const policiesRef = firebase.storage().ref().child('policies/');

        /* Download A Policy */
        function downloadSinglePolicy(file_url, callback){
            var policyRef = policiesRef.child(file_url);
            policyRef.getDownloadURL().then(url => {
                callback(url);
            }, error => {
            });
        }

        /* Upload file */
        function uploadFile(company_uid ,fileItem, callback, err){
            var file_url = parseFileName(company_uid, fileItem, uuid2);
            var newPolicyRef = policiesRef.child(file_url);
            newPolicyRef.put(fileItem).then(snapshot => {
                callback(file_url)
            }, error => {
                err(error);
            });
        }

        /* Upload File With Custom Endpoint */
        function uploadFileWithCustomEndpoint(route, file_id, fileItem, callback, err_call){
          var file_url = parseFileName(file_id, fileItem, uuid2);
          var storageRef = getEndpoint(route).child(file_url);
          storageRef.put(fileItem).then(snapshot => {
              callback(file_url)
          }, error => {
              err_call(error);
          });
        }

        /* Upload File With Custom Endpoint and custom name */
        function uploadFileWithCustomEndpointCustomName(route, fileItem, custom_name, callback, err_call){
          // Var file_url = parseFileName(file_id, fileItem);
          var directory = route[0] + "/" + route[1] + "/" + custom_name;
          var storageRef = firebase.storage().ref();
          var fileRef = storageRef.child(directory);
          fileRef.put(fileItem).then(snapshot => {
              callback(custom_name)
          }, error => {
              err_call(error);
          });
        }

        /* Download File With Custom Endpoint */
        function downloadFileWithCustomEndpoint(route, file_url, callback, err_call){
          var storageRef = getEndpoint(route).child(file_url);
          storageRef.getDownloadURL().then(url => {
              callback(url);
          }, error => {
              err_call(error)
          });
        }

        function downloadWithName(from, rename_to) {
            const rename_to_urlencoded = encodeURIComponent(rename_to);
            window.location.assign($rootScope.backoffice_url + "/api/download?from=" + from + "&as=" + rename_to_urlencoded);
        }

        /* Return Stuff */
        return {
            uploadFile,
            downloadWithName,
            downloadSinglePolicy,
            uploadFileWithCustomEndpoint,
            downloadFileWithCustomEndpoint,
            uploadFileWithCustomEndpointCustomName
        }
    }
})();
