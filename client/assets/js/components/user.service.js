(function() {

    'use strict';

    angular.module('application').
    service('userService', userService);

    userService.$inject = ['$rootScope', 'firebase', '$firebaseObject', 'authService', 'requestService', 'backofficeService'];

    /* Endpoints */
    const prefix = 'users';
    const company_prefix = 'companies';
    const address_prefix = 'addresses';
    const employment_prefix = 'employments';

    /* Models */
    var model = {};

    /* User Service */
    function userService($rootScope, firebase, $firebaseObject, authService, requestService, backofficeService) {

        function createAndLinkMandate(company_uid, callback, err_call) {
            backofficeService.initMandate(company_uid, callback, err_call);
        }

        /* Create User */
        function createUserAndCompany(firebase_user, user_params, company_params, address_params, callback, err_call){
          user_params.password = null;
          user_params.force_url = "verify";
          company_params.users = {};
          company_params.users[firebase_user.uid] = true;
          company_params.liimex_id = $rootScope.genService.generateCompanyId(company_params, address_params);
          requestService.getMultipleKeys([{
            name:'user',
            route:[prefix]
          },{
            name:'company',
            route:[company_prefix]
          },{
            name:'address',
            route:[address_prefix]
          },{
            name:'employment',
            route:[employment_prefix]
          }], keys => {
            const newUpdate = {},
            now = requestService.getTimestamp();
            user_params.created_at = now;
            user_params.updated_at = now;
            user_params.welcome_email_sent = false;
            user_params.verification_email_sent = false;
            address_params.company = keys.company.key;
            address_params.main = true;
            company_params.addresses = {};
            company_params.created_at = now;
            company_params.updated_at = now;
            company_params.addresses[keys.address.key] = true;
            newUpdate[keys.user.route+firebase_user.uid] = user_params;
            newUpdate[keys.address.route+keys.address.key] = address_params;
            newUpdate[keys.company.route+keys.company.key] = company_params;
            newUpdate[keys.employment.route+firebase_user.uid] = {
                company:keys.company.key,
                created_at:now,
                updated_at:now
            };
            // Console.log(newUpdate);
              requestService.multiPathUpdate(newUpdate, () => {
                  createAndLinkMandate(keys.company.key, callback, err_call);
              }, err_call);
          });
        }

        /* Create User */
        function createUserAndCompanyWithoutForceUrl(firebase_user, user_params, company_params, address_params, callback, err_call){
          user_params.password = null;
          company_params.users = {};
          company_params.users[firebase_user.uid] = true;
          company_params.liimex_id = $rootScope.genService.generateCompanyId(company_params, address_params);
          requestService.getMultipleKeys([{
            name:'user',
            route:[prefix]
          },{
            name:'company',
            route:[company_prefix]
          },{
            name:'address',
            route:[address_prefix]
          },{
            name:'employment',
            route:[employment_prefix]
          }], keys => {
            const newUpdate = {},
            now = requestService.getTimestamp();
            user_params.created_at = now;
            user_params.updated_at = now;
            user_params.welcome_email_sent = false;
            user_params.verification_email_sent = false;
            address_params.company = keys.company.key;
            address_params.main = true;
            company_params.addresses = {};
            company_params.created_at = now;
            company_params.updated_at = now;
            company_params.addresses[keys.address.key] = true;
            newUpdate[keys.user.route+firebase_user.uid] = user_params;
            newUpdate[keys.address.route+keys.address.key] = address_params;
            newUpdate[keys.company.route+keys.company.key] = company_params;
            newUpdate[keys.employment.route+firebase_user.uid] = {
                company:keys.company.key,
                created_at:now,
                updated_at:now
            };
            // Console.log(newUpdate);
            requestService.multiPathUpdate(newUpdate, () => {
                createAndLinkMandate(keys.company.key, callback, err_call);
            }, err_call);
          });
        }

        /* Get User Information */
        function getUserInformation(user_id, callback, err_call,fromLocalStorage){
          if (fromLocalStorage){
            if(model.user && model.user.email === $rootScope.user.email && model.user_key === $rootScope.currentUser && model.user_key !== null){
              console.log('Returning User');
              callback(model.user);
              return;
            }
          }
          requestService.on_child_value([prefix, user_id], user => {
            console.log('User updated');
            model.user = user.val();
            model.user_key = user.key;
            callback(model.user);
          }, error => {
            err_call({message: "Cant sign in"});
            $rootScope.genService.showDefaultErrorMsg(error.code);
          });
        }

        // Update User Information
        function updateUserInformation(user_id, prev_parmas, params, callback, reauth, err_call){
          if(params.force_url){

            /* If force_url already contains a lang suffix, remove it */
            params.force_url = params.force_url.split('_')[0];
          }
          if(prev_parmas.email !== params.email){
            console.log('Detected: New Email');
            authService.getCurrentUser(userObj => {
              authService.changeEmail(userObj, params.email, () => {
                  requestService.updateData([prefix, user_id], params, callback, err_call);
              }, error => {
                  if(error.code === 'auth/requires-recent-login'){ // REPLACE WITH: Reauth Code
                      reauth();
                  } else{
                      err_call(error)
                  }
              });
            });
          }else{
            requestService.updateData([prefix, user_id], params, callback, err_call);
          }
        }

        /* Get Employment */
        function getEmployment(user_id, callback, err_call){
          requestService.getDataOnce([employment_prefix, user_id], callback, err_call)
        }

        /* Update */
        function update(user_uid, data, callback, err_call){
          requestService.updateData([prefix, user_uid], data, callback, err_call);
        }


        /* Send New Verification Email */
        function sendVerificationEmail(user_uid, callback, err_call){
          requestService.updateData([prefix, user_uid], {verification_email_sent : false}, callback, err_call, true);
        }

        /*Return single user info*/
        function getSingleUser(userid, callback, err_call){
          requestService.getDataOnce([prefix, userid], callback, err_call);
        }

        /* Return Stuff */
        return {
            createUserAndCompany,
            createUserAndCompanyWithoutForceUrl,
            getUserInformation,
            updateUserInformation,
            getEmployment,
            update,
            sendVerificationEmail,
            getSingleUser
        }
    }
})();
