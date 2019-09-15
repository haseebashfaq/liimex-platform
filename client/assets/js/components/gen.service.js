(function() {

    'use strict';

    angular.module('application').
    service('genService', genService);

    genService.$inject = ['$rootScope', 'FoundationApi'];

    function genService($rootScope, FoundationApi) {

      const notificationDic = {
        'auth/app-deleted' : "Something went wrong, please contact us (1)",
        'auth/app-not-authorized' : "Something went wrong, please contact us (2)",
        'auth/argument-error': "Error while logging in. Please contact us",
        'auth/email-already-in-use' : "Email Already In Use",
        'auth/invalid-api-key': "Invalid api key",
        'auth/invalid-email': "Invalid Email",
        'auth/invalid-user-token': "Please sign in again",
        'auth/network-request-failed': "Network request failed, please check your internet connection",
        'auth/operation-not-allowed': "Operation not allowed",
        'auth/requires-recent-login' : "Please sign in again",
        'auth/too-many-requests': "Too many requests",
        'auth/weak-password': "Passwords must be at least 6 characters",
        'auth/unauthorized-domain': "App domain is not authorized",
        'auth/user-disabled': "Your account has been disabled by an administrator",
        'auth/user-token-expired': "Credential has expired",
        'auth/web-storage-unsupported': "Your browser does not support web storage",
        'auth/wrong-password': "Invalid Email or Password",
        'auth/user-not-found': "User not found",
        'PERMISSION_DENIED': "permission denied",
        'SWW' : "Something went wrong. Please contact us or try again (3)",
        '500' : "Something went wrong. Please contact us or try again (Status: 500)",
        '-1' : "Request Timed Out",
        'upload_error' : "Could not upload file, please try again. (Status: 400)",
        'en/duplicate-industry-codes-selected': "Industry code already selected",
        'de/duplicate-industry-codes-selected': "Diese Branche wurde bereits ausgewählt",

      }

      const number_dict = {}
      number_dict.en = {};
      number_dict.de = {};
      number_dict.en[1] = 'First'
      number_dict.en[2] = 'Second'
      number_dict.en[3] = 'Third'
      number_dict.en[4] = 'Fourth'
      number_dict.en[5] = 'Fifth'
      number_dict.en[6] = 'Sixth'

      number_dict.de[1] = 'Erste'
      number_dict.de[2] = 'Zweite'
      number_dict.de[3] = 'Dritte'
      number_dict.de[4] = 'Vierte'
      number_dict.de[5] = 'Fünfte'
      number_dict.de[6] = 'Sechste'

        /*******************************/
        /**      Screen Messages      **/
        /*******************************/

        /* Show Success Message */
        function showDefaultSuccessMsg(msg){
            // FoundationApi.publish('success-notification', {
            //     content: '   ' + msg,
            //     color:"success",
            //     autoclose:3000
            // });
            $rootScope.local_load = null;
            try{
              //$rootScope.$apply();
            }
            catch(e){
              console.log('Apply Caught!');
            }
        }

        /* Show Error Message */
        function showDefaultErrorMsg(id, time=3000){
          /*TODO: actually fix it in firebase*/
          if(id=="PERMISSION_DENIED") return;
            var msg= notificationDic[id];
            if(msg==undefined)
            {
              msg=id;
            }
            FoundationApi.publish('top-notification', {
                content: '   ' + msg,
                color:"success",
                autoclose:time
            });
            $rootScope.local_load = null;
            try{
              //$rootScope.$apply();
            }
            catch(e){
              console.log('Apply Caught!');
            }
        }

        /* Show Top Error Message */
        function showTopErrorMessage(msg){
          FoundationApi.publish('top-notification', {
              content: '   ' + msg,
              color:"success",
              autoclose:3000
          });
        }

        /* Show Top Success Message */
        function showTopSuccessNotification(msg){
          console.log('YO');
          FoundationApi.publish('top-success-notification', {
              content: '   ' + msg,
              color:"success",
              autoclose:3000
          });
        }

        /*******************************/
        /**       DATA Objects        **/
        /*******************************/

        /* Data URI to Blob */
        function dataURItoBlob(dataURI) {
          var byteString;
          if (dataURI.split(',')[0].indexOf('base64') >= 0){
            byteString = atob(dataURI.split(',')[1]);
          }
          else {
            byteString = unescape(dataURI.split(',')[1]);
          }
          // separate out the mime component
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          // write the bytes of the string to a typed array
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ia], {type:mimeString});
        }


        /*******************************/
        /**      DOM (custom inputs)  **/
        /*******************************/

        /* Save Dates From HTML to model */
        function saveDOMValueToVariable(model, value_bind_array){
          for(var key in value_bind_array){
            model[value_bind_array[key]] = document.getElementById(value_bind_array[key]).value;
          }
        }

        /*******************************/
        /**           Numbers         **/
        /*******************************/

        /* Get Number With Thousand Seperator */
        function getSepThousands(number){
          if(number === undefined){ return }

          var decimal = number.toString().split('.')[1]
          decimal = decimal ? decimal : '00'
          decimal = decimal.charAt(1) ? decimal : decimal+'0'
          decimal = decimal.split("").reverse().join("");
          number = number.toString().split('.')[0]
          var string = number.toString().split("").reverse().join("");
          var new_string = "";
          for(var i=0; i<string.length;i++){
            new_string += (i+1)%3===0 && i<string.length-1 ? string[i]+'.' : string[i]
          }
          new_string = decimal+','+new_string;
          return new_string.split("").reverse().join("");
        }

        /*get the deductable type based on the suffix added (% for percent)*/
        function getDeductableType(str) {
          str = str.toString();
          if (str){
            var suffix = str.toString().slice(-1);
            if (suffix == "%"){
              return str;
            }
            else{
              var thousandSepStr = getSepThousands(str);
              return '€'+ thousandSepStr;
            }
          }
        }

        /* Capitalize */
        function capitalize(string){
            if(string === undefined)
                return

            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /* Generate Company IDs */
        function generateCompanyId(company, address){
            var lower_code = company.name[0] + address.street[0] + address.country[0];
            if(lower_code){
              var upper_code = lower_code.toUpperCase();
            } else {
              var upper_code = lower_code;
            }
            var date = new Date(),
                milistamp = date.getTime().toString().slice(-4),
                random_num = Math.floor((Math.random() * 9999));
            random_num = '0'.repeat(4-random_num.toString().length).concat(random_num);
            var final_code = upper_code+'-'+random_num+'-'+milistamp;
            return final_code;
        }

        /*******************************/
        /**       Convinience         **/
        /*******************************/

        /* JS Download */
        function downloadWithLink(url_for_download){
          var a = document.createElement('a');
          a.href = url_for_download;
          a.download = 'document_name';
          a.target = '_self';
          a.click();
        }

        /* Set Confirm Action */
        function setConfirmAction(action){
          if (action) {
            $rootScope.confirm_action = action;
          } else {
            console.log('No Confirm Action!');
          }
        }

        /* Execute Confirm Action */
        function executeConfirmAction(){
          if ($rootScope.confirm_action) {
            $rootScope.confirm_action();
          } else {
            console.log('No Confirm Action!');
          }
        }

        /*******************************/
        /**         Formatting        **/
        /*******************************/

        // Generate Variable Name
        function generateVariableName(str){
          return str.replace(/ /g, "_").toLowerCase();
        }

        /*******************************/
        /**           Time           **/
        /*******************************/

        /* Get Timestamp */
        function getTimestamp(){
            var date = new Date();
            return date.toString();
        }

        /* Get Timestamp Mili */
        function getTimestampMili(){
            var date = new Date();
            return date.getTime().toString();
        }

        /* Prettify String */
        function prettify(input){
          var no_score = input.replace('_', ' ');
          return capitalize(no_score);
        }

        /* Num To Word Certain */
        function numToWordC(num){
          return number_dict[$rootScope.langPreference][num]
        }

        /* Prettify Bool */
        function prettyBool(bool){
          if($rootScope.langPreference === "en"){
            return bool === true ? 'Yes' : 'No'
          } else {
            return bool === true ? 'Ja' : 'Nein'
          }
        }

        /*returns js date obj for utc adte string*/
        function getDateObj (dateStr){
          return new Date(dateStr);
        }

        /**/
        function dictToArray(dictionary){
          const to_return = [];
          for(const key in dictionary){
            to_return.push({
              key: key,
              item: dictionary[key]
            })
          }
          return to_return
        }

        /* Return Stuff */
        return {
            getSepThousands: getSepThousands,
            capitalize: capitalize,
            getTimestamp: getTimestamp,
            getTimestampMili: getTimestampMili,
            generateCompanyId: generateCompanyId,
            showDefaultSuccessMsg: showDefaultSuccessMsg,
            showDefaultErrorMsg: showDefaultErrorMsg,
            prettify : prettify,
            saveDOMValueToVariable : saveDOMValueToVariable,
            generateVariableName : generateVariableName,
            downloadWithLink : downloadWithLink,
            setConfirmAction : setConfirmAction,
            executeConfirmAction : executeConfirmAction,
            prettyBool : prettyBool,
            numToWordC : numToWordC,
            dataURItoBlob : dataURItoBlob,
            getDateObj: getDateObj,
            getDeductableType: getDeductableType,
            showTopSuccessNotification : showTopSuccessNotification,
            dictToArray : dictToArray
        }
    }
})();
