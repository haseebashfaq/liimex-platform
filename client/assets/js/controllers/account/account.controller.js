// Angular Module
angular.module('application').controller('AccountController', AccountController);

// Injections
AccountController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'companyService',
    'userService', 'metaService', 'FoundationApi','authService', 'redirectService', 'mandateService',
    'documentService', 'backofficeService', 'fileService'];

// Function
function AccountController($rootScope, $scope, $stateParams, $state, $controller, companyService, userService,
                            metaService, FoundationApi, authService, redirectService, mandateService,
                            documentService, backofficeService, fileService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));


    var industry_levels = [];
    var industry_codes;
    $scope.show_me = true;
    $scope.show_other = false;
    $scope.is_active = [];
    $scope.is_active['company'] = true;

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
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    /* Get My Address */
    $scope.GetMyAddresses = function(){
      $scope.addresses = [];
      $rootScope.local_load = true;
      for(var key in $rootScope.company.addresses){
        if($rootScope.company.addresses[key] !== true){
          continue;
        }
        companyService.getAndStoreAddresses(key, result => {
          var address = result.val();
          if(address.main === true){
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
          backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});
        });
      }
    }

    /* Get My Industries */
    $scope.GetMyIndustries = function(){
      $scope.industry_codes = [];
      getIndustryCodesWithCategory();
      metaService.getIndustryCodes(codes => {
        industry_codes = []
        for(var key in codes){
          industry_codes.push(codes[key])         
        }
        for(var i=0 ; i< industry_levels.length; i++){
          $scope.industry_codes[i] = [];
          for (var j=0; j<industry_levels[i].length; j++){
            var code = industry_levels[i][j];
            var industryCode = industry_codes.find(industry=> industry.code == code);
            $scope.industry_codes[i].push(industryCode);
            $scope.safeApply(fn => fn);
          }
        }
      }, error => {
        console.error(error);
      });
    }

    function getIndustryCodesWithCategory(){
      if(!$rootScope.company){
        return;
      }
      for(var i in $rootScope.company.industry_codes){
        var code = $rootScope.company.industry_codes[i];
        industry_levels[i]=[];
        var split = code.split('.');
        var next = "";
        for(var number in split){
          next += next === "" ? split[number] : '.'+split[number]
          industry_levels[Number(i)][Number(number)] = next;
        }
      }
    }


    /* Get My Activities */
    $scope.GetMyActivities = function(){
      $scope.activities = [];
      $scope.activity_in_group = {};
      for(var key in $rootScope.company.activities){
        companyService.getAndStoreMyActivities($rootScope.company.activities[key], activity => {
          if(!activity.val()){
            return
          }
          var activity = activity.val();
          $scope.activities.push(activity);
          $scope.activity_in_group[activity.group] = true;
          $scope.safeApply(fn => fn);
        }, error => {
          console.error(error);
          $rootScope.genService.showDefaultErrorMsg(error.code);
          backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});
        });
      }
    }

    /* Get Groups */
    $scope.GetGroups = function(){
      metaService.getGroups( groups => {
        $scope.groups = {};
        for(var key in groups){
          if(groups[key].disabled){
            continue;
          }
          $scope.groups[groups[key].group] = groups[key];
        }
        $scope.safeApply(fn => fn);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});
      });
    }

    /*Get User account*/
    $scope.GetUserAccount =function(){
      $scope.user_account = {};
      angular.copy($rootScope.user, $scope.user_account);
      $scope.safeApply(fn => fn);
    }

    /* Save Company */
    $scope.SaveCompany = function(form){
      if(!form.$valid){ return; }
      companyService.updateCompanyInformation($rootScope.company_uid, {name:$rootScope.company.name, phone:$rootScope.company.phone, url:$rootScope.company.url}, () => {
        $rootScope.genService.showDefaultSuccessMsg('Saved');
        $state.reload();
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'account (save company)','error',()=>{},()=>{});
      });
    }

    /* Save Address */
    $scope.SaveAddress = function(form){
      if(!form.$valid){ return; }
      companyService.updateAddress($scope.main_address_key, {street:$scope.main_address.street, zip:$scope.main_address.zip, city:$scope.main_address.city, country:$scope.main_address.country}, () => {
        $rootScope.genService.showDefaultSuccessMsg('Saved');
        $state.reload();
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});
      });
    }

    $scope.SaveUserData = function(form){
      if(!form.$valid){ return; }
      userService.updateUserInformation($rootScope.currentUser,$rootScope.user,$scope.user_account,() => {
        $rootScope.genService.showDefaultSuccessMsg('Saved');
        $state.reload();
      },() =>{
          FoundationApi.publish('reauth_modal','show');
      },
      error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});
      })
    }

  $scope.Reauthenticate = function(passwd){
      authService.login({email: $rootScope.user.email,password: passwd}, ()=>{
      $rootScope.genService.showDefaultSuccessMsg("Successfully confirmed password");
      $scope.SaveUserData();
    }, ()=>{
      /* on error callback*/
      $rootScope.genService.showDefaultErrorMsg("Authentication failed");
      $state.reload();
    })
  }

  /* Download Mandate */
  $scope.DownloadMandate = function(){
      const url_for_download = 'mandates/' + $rootScope.company_uid + '/' + $scope.mandate.signed_document_url;
      const rename_to = ($rootScope.langPreference === 'en'
      ? 'Liimex ' + $scope.user_account.first_name + ' ' + $scope.user_account.last_name + ' Broker Mandate'
      : 'Liimex ' + $scope.user_account.first_name + ' ' + $scope.user_account.last_name + ' Maklermandat') + '.pdf';
      fileService.downloadWithName(url_for_download, rename_to);
  };

  /* Get My Mandate */
  $scope.GetMyMandate = function(){
    if(!$rootScope.company.mandate){
      return;
    }
    documentService.getAndStoreMandate($rootScope.company.mandate, result => {
      $scope.mandate = result.val();
      $scope.safeApply(f => f);
    }, error => {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'account','error',()=>{},()=>{});

    });
  }

  $scope.editFinancials = function(){
    $rootScope.user.force_url = 'pickfinancials';
    redirectService.changeStateWithLang('pickfinancials',{isEdit:true});
  }

  $scope.editActivity = function(){
    $rootScope.user.force_url = 'pickactivity';
    redirectService.changeStateWithLang('pickactivity',{isEdit:true});
  }

  $scope.editIndustry = function(){
    $rootScope.user.force_url = 'pickindustry';
    redirectService.changeStateWithLang('pickindustry',{isEdit:true});
  }


  $scope.ResetPassword = function(){
    authService.resetPassword({email:$scope.user_account.email}, () => {
      $rootScope.genService.showTopSuccessNotification('We have sent you an email with instructions');
    },  () => {
      $rootScope.genService.showDefaultErrorMsg('SWW');
      backofficeService.logpost('Could not reset password',$scope.currentUser,'account','error',()=>{},()=>{});
    });
  }

  $scope.GetOtherUsers = function(){
    $scope.other_user = {};

    for(let user in $rootScope.company.users){
      if(user!=$scope.currentUser){
        userService.getSingleUser(user, getUser => {
          $scope.other_user[user] = getUser;
          console.log($scope.other_user)
        }, error => {
          console.log(error);
        }, true);
      }
    }    
  }

  $scope.showUser = function(user_type, user_id){
    $scope.otherUserObj = $scope.other_user[user_id];
    if(user_type==='me'){
      $scope.show_me = true;
      $scope.show_other = false;
    } else {
      $scope.show_me = false;
      $scope.show_other = true;
    }
  }

  $scope.AccountSection = function(section){
    if(section){
      $scope.is_active = [];
      $scope.is_active[section] = true;
    }
  }

  /* On Load */
  $scope.GetOtherUsers();

  /* Get My Addresses */
  $scope.GetMyAddresses();
  $scope.GetMyIndustries();
  $scope.GetMyActivities();
  $scope.GetGroups();
  $scope.GetMyMandate()

  /*Get User account*/
  $scope.GetUserAccount();
  
}
