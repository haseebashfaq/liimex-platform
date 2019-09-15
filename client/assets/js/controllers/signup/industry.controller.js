// Angular Module
angular.module('application').controller('IndustryController', IndustryController);

// Injections
IndustryController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller','$resource', 'metaService', 'companyService', 'redirectService', 'backofficeService','industryService'];

// Controller
function IndustryController($rootScope, $scope, $stateParams, $state, $controller, $resource, metaService, companyService, redirectService, backofficeService, industryService) {
  angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
  
  $scope.searches = {};
  $scope.categories = {};
  $scope.is_valid = {};
  $scope.cat_limit = 1;
  $scope.chosen = {};
  $scope.searchResults =[];
  $scope.picked_levels = {};
  $scope.picked_levels[1] = {};
  $scope.picked_levels[2] = {};
  $scope.picked_levels[3] = {};
  $scope.industry_set = new Set();
  $scope.isEditMode = $stateParams.isEdit;
  $scope.showIndustrySelectorPage = false;
  var forceurl_pickFinancials = null;
  var forceurl_pickActivity = null;
  var fuse_en,fuse_de,fuse;
  var industryCodesLeafnodes = [];
  var childNode = "";
  
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
  
  if($scope.isEditMode){
    // clear forceurl, when you land to this page in edit mode.
    if($rootScope.user && $rootScope.user.force_url)
      $rootScope.user.force_url = '';
  }
  
  /* Get Industries */
  $scope.GetIndustries = function(){
    if(!$rootScope.currentUser){
      return;
    }
    // $rootScope.authenticating = true;
    metaService.getIndustryCodes(codes => {
      $scope.industries = [];
      $scope.top_levels = {};
      $scope.second_levels ={};
      
      for(var key in codes){
        if(codes[key].level == 1)
          $scope.top_levels[codes[key].code] = codes[key];
        else if(codes[key].level == 2)
          $scope.second_levels[codes[key].code] = codes[key];
      }
      
      for(var key in codes){
        $scope.industry_set.add(codes[key].code);
        var parentIndustryCode = String(codes[key].code).split('.')[0];
        var secondParentIndustryCode;
        if(String(codes[key].code).split('.')[1])
          secondParentIndustryCode = parentIndustryCode +'.'+ String(codes[key].code).split('.')[1];
        
        $scope.industries.push({key:key, code:codes[key], parent:$scope.top_levels[parentIndustryCode], secondParent:$scope.second_levels[secondParentIndustryCode]});

      }
      setUpSearchableIndustryCodes();
      $scope.GetSelectedIndustries();
      $scope.safeApply(f=>f);
      // $rootScope.authenticating = null;
    }, error => {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'industry','error',()=>{},()=>{});
      
      // $rootScope.authenticating = null;
    });
  }
  
  /* Pick */
  $scope.Pick = function(industry, i, code){
    if($rootScope.langPreference === 'en'){
      $scope.searches[i] = industry.name_en;
    } else {
      $scope.searches[i] = industry.name_de;
    }
    $scope.categories[i] = code;
    document.CheckCategories();
    $scope.searchResults =[];
  }
  
  /* Remove Cat*/
  $scope.RemoveCat = function(){
    $scope.cat_limit = $scope.cat_limit-1;
    
  }
  
  
  /* Refresh Model */
  $scope.RefreshModel = function(cat_num, models){
    for(var i in models){
      if($scope.picked_levels[cat_num][models[i]]){
        $scope.picked_levels[cat_num][models[i]] = null;
      }
    }
    validatedDuplicatePickedIndustries(cat_num);
    $scope.safeApply(fn => fn);
  }

  function resetPickedLeavels(){
    $scope.picked_levels = {};
    $scope.picked_levels[1] = {};
    $scope.picked_levels[2] = {};
    $scope.picked_levels[3] = {};
  }

  /* check if the selected industrie is already previously selected */
  function validatedDuplicatePickedIndustries(cat_num){
    let currentPickedSubCatagory = 1;
    for(let catagory in $scope.picked_levels[cat_num]){
      if($scope.picked_levels[cat_num][catagory]){
        currentPickedSubCatagory = catagory;
      }
    }

    /* if there are no more leaf nodes left, check if this code is already picked */
    if(!$scope.industry_set.has($scope.picked_levels[cat_num][currentPickedSubCatagory].concat('.1'))){
      let currentSelectedIndustrycode = $scope.picked_levels[cat_num][currentPickedSubCatagory];
      for(let level in $scope.picked_levels){
        if(level == cat_num) continue;
        let picked_level = $scope.picked_levels[level];
        for(let catagory in picked_level){
          if(picked_level[catagory]){
            if(!$scope.industry_set.has($scope.picked_levels[level][catagory].concat('.1'))){
                /* if dupicate codes exist */
              if($scope.picked_levels[level][catagory] == currentSelectedIndustrycode){
                if($rootScope.langPreference == "en"){
                  $rootScope.genService.showDefaultErrorMsg('en/duplicate-industry-codes-selected');
                }
                else{
                  $rootScope.genService.showDefaultErrorMsg('de/duplicate-industry-codes-selected');
                }
                /* remove the last picked_level that is duplicated */
                if(level > cat_num){
                  $scope.picked_levels[level] = null;
                }
                else{
                  $scope.picked_levels[cat_num] = null;
                }
              }
            }
          }
        }
        
      }
    }
    
  }

  
  /* Submit Categories */
  document.CheckCategories = function(){
    for(var i=1;i<=$scope.cat_limit;i++){
      
      if(!$scope.categories[i] || !$scope.searches[i]){
        $scope.is_valid[i] = false;
        return false;
      }
      if($rootScope.langPreference === 'en'){
        if($scope.categories[i].code.name_en !== $scope.searches[i]){
          $scope.is_valid[i] = false;
          return false;
        }
      } else {
        if($scope.categories[i].code.name_de !== $scope.searches[i]){
          $scope.is_valid[i] = false;
          return false;
        }
      }
      $scope.is_valid[i] = true;
      $scope.chosen[i] = $scope.categories[i].code.code;
    }
    return true;
  }
  
  function isPickedIndustryCodesValid(){
    for(var i=1;i<=$scope.cat_limit;i++){
      if(!$scope.picked_levels[i][1]){
        $scope.is_valid[i] = false;
        return false;
      }
      $scope.is_valid[i] = true;
    }
    return true;
  }
  
  $scope.changeSearchText = function(searchString){
    if(searchString && searchString.length > 0){
      let searchResults = [];
      if($rootScope.langPreference =='en')
        searchResults = fuse_en.search(searchString);
      else
        searchResults = fuse_de.search(searchString);
      
        /* remove previously selected industries from the search results */
      for(let cat_num in $scope.categories){
        let selectedCode = $scope.categories[cat_num].code.code;
        let indexOfSelectedCode = searchResults.findIndex(industryObj=>industryObj.code.code == selectedCode);
        if(indexOfSelectedCode > -1){
          searchResults.splice(indexOfSelectedCode,1);
        }
      }
      $scope.searchResults = searchResults;
    }
  }
  
  $scope.CleanLevels = function(){
    for(var level in $scope.picked_levels){
      if(level > $scope.cat_limit){
        $scope.picked_levels[level] = {};
      }
    }
  }
  
  /* Submit Categories */
  $scope.SubmitCategories = function(form){
    console.log('HEN')
    if($scope.showIndustrySelectorPage)
      {
      if(!$scope.picked_levels[1][1] || !isPickedIndustryCodesValid()) return;
      
    }
    else
      {
      if(!$scope.chosen[1] || !document.CheckCategories()) return;
    }
    $scope.CleanLevels();
    
    var industry_codes = [];
    
    /*get industry codes from the search results*/
    
    if(!$scope.showIndustrySelectorPage)
      for(var i=1;i<=$scope.cat_limit;i++){
      industry_codes[i-1] = $scope.chosen[i];
    }
    else{
      outer_loop:
      for(var level in $scope.picked_levels){
        if(!$scope.picked_levels[level][1]){
          continue outer_loop;
        }
        for(var cat = 4; cat>0; cat--){
          if($scope.picked_levels[level][cat]){
            industry_codes.push($scope.picked_levels[level][cat])
            continue outer_loop;
          }
        }
      }
    }
    /* remove duplicate code in the array, only for dev purpose , the ui should not allow this to happen */
    industry_codes = industry_codes.filter((code, index, arr) => arr.indexOf(code) === index); 

    if(!$scope.isEditMode){
      forceurl_pickActivity = "pickactivity";
    }
    
    companyService.updateIndustryCodesInSignup($rootScope.company_uid, $rootScope.currentUser, industry_codes,forceurl_pickActivity, () => {
      $rootScope.user.force_url = 'pickactivity';
      $rootScope.genService.showDefaultSuccessMsg('Industry Codes Added');
      if($scope.isEditMode){
        redirectService.changeStateWithLang('pickactivity',{"previousEditPage": 'pickindustry'});
      }
      else{
        redirectService.changeStateWithLang('pickactivity');
      }
    }, error => {
      console.error(error);
      $rootScope.genService.showDefaultErrorMsg(error.code);
      backofficeService.logpost(error,$scope.currentUser,'industry','error',()=>{},()=>{});
      
    });
  }
  
  /* Get Activity Questions for cache */
  $scope.GetActivities = function(){
    metaService.getActivityQuestions( q => q, error => {
      console.error(error);
    });
  }
  
  /*Get industries if it's already previously selected*/
  $scope.GetSelectedIndustries = function(callback){
    $scope.searches ={};
    $scope.cat_limit = 1;
    companyService.getCompanyFromModel($rootScope.company_uid, company => {
      if(company.industry_codes){
        $scope.cat_limit = company.industry_codes.length;
        for(var i=1;i<=$scope.cat_limit;i++){
          var industry = getIndustryObjForIndustryCode(company.industry_codes[i-1]);
          $scope.chosen[i] = industry.code.code;
          if(industry){
            if($rootScope.langPreference === 'en'){
              $scope.searches[i] = industry.code.name_en;
            } else {
              $scope.searches[i] = industry.code.name_de;
            }
            $scope.categories[i] = industry;
          }
        }
      }
      if(callback) callback();
    });
  }
  
  $scope.RebuildIndustries = function(industryCodesList){
    if(!$rootScope.company){
      return;
    }
    for(var i in industryCodesList){
      var code = industryCodesList[i];
      var split = code.split('.');
      var next = "";
      for(var number in split){
        next += next === "" ? split[number] : '.'+split[number]
        $scope.picked_levels[Number(i)][Number(number)] = next;
      }
    }
  }
  
  $scope.selectCurrentCompanyIndustryCodes = function(){
    if(!$rootScope.company){
      return;
    }
    resetPickedLeavels();
    let industryCodesList = $rootScope.company.industry_codes;
    for(var i in industryCodesList){
      var code = industryCodesList[i];
      var split = code.split('.');
      var next = "";
      for(var number in split){
        next += next === "" ? split[number] : '.'+split[number]
        $scope.picked_levels[Number(i)+1][Number(number)+1] = next;
      }
    }
    $scope.safeApply(fn => fn);    
  }
  
  $scope.Back = function(){
    redirectService.changeStateWithLang('account');
  }
  
  $scope.toogleShowIndustrySelector = function(isShowIndustrySelectorPage){
    $scope.showIndustrySelectorPage = isShowIndustrySelectorPage;
    $scope.GetSelectedIndustries(() => {
      $scope.selectCurrentCompanyIndustryCodes();      
    });
  }
  $scope.openContactus = function(){
    $rootScope.user.force_url = 'contactus'
    
    redirectService.changeStateWithLang("contactus");
    companyService.updateCompanyInformation( $rootScope.company_uid , {'could_not_find_industry':true} ,()=>{
    },f=>f )
    
  }
  
  function setUpSearchableIndustryCodes(){
    industryCodesLeafnodes =[];
    industryCodesLeafnodes = industryService.getIndustryCodesLeafNodes($scope.industries);
    fuse_en = new Fuse(industryCodesLeafnodes, {keys: ['code.name_en','code.synonyms_en']});
    fuse_de = new Fuse(industryCodesLeafnodes, {keys: ['code.name_de','code.synonyms_de']});
  }
  
  function getIndustryObjForIndustryCode(code){
    return $scope.industries.find(industry=> industry.code.code == code);
  }
  
  function getParentIndustryObj(industryCode){
    
  }
  
  
  
  /* Controller Load */
  $scope.GetIndustries();
  $scope.GetActivities();
  $scope.selectCurrentCompanyIndustryCodes();
  //$scope.RebuildIndustries($rootScope.company.industry_codes);
  
}
