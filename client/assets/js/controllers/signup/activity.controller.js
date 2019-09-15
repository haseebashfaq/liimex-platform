// Angular Module
angular.module('application').controller('ActivityController', ActivityController);

// Injections
ActivityController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'metaService', 'companyService', 'authService', 'recommendationService', 'redirectService', 'backofficeService'];

// Function
function ActivityController($rootScope, $scope, $stateParams, $state, $controller, metaService, companyService, authService, recommendationService, redirectService, backofficeService) {
  	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

    /* Safety Check */
    if(!$rootScope.company_uid){
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

    // Scope Variables
    $scope.current_question_group = 1;
    $scope.picked_activities = new Set();
    $scope.disableFinishBtn = false;
    var isEditMode = $stateParams.isEdit;    

    if(isEditMode){
      // clear forceurl
      $rootScope.user.force_url = '';
    }

  	/* Get My Activities */
  	$scope.GetActivityQuestions = function(){
      $scope.questions_to_display = [];
      metaService.getActivityQuestions( questions => {
        $scope.activities = questions;
        companyService.getCompanyFromModel($rootScope.company_uid, company => {
          $scope.industry_codes = company.industry_codes;
          var num_set = new Set();
          question_loop:
          for(var key in questions){
            var question = questions[key];
            if(question.disabled === true) {continue};
            if(question.exclude_codes) {
              let exclusion_set = new Set(question.exclude_codes);
              for(var index in company.industry_codes){
                let codestring =  company.industry_codes[index];
                let codes = codestring.split('.');
                let codeStringBuilder = codes[0];
                for (var i=1; i<=codes.length ; i++){
                  if(exclusion_set.has(codeStringBuilder)){
                      continue question_loop;
                  }
                  codeStringBuilder = codeStringBuilder + '.'+ codes[i];
                }
              }
            }
            // Check if group is disabled before pushing would be better
            $scope.questions_to_display.push({key:key, activity:question});
            num_set.add(question.group);
          }
          $scope.num_questions = $scope.maxsize;
          for(var i=1; i<=5; i++){
            if(!num_set.has(i)){
              $scope.num_questions -= 1;
            }
          }
          $scope.safeApply(fn => fn);
        }, error => {
          console.error(error);
        });
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'activity','error',()=>{},()=>{});

      });
  	}

    /* Get Groups */
    $scope.GetGroups = function(){
      metaService.getGroups( groups => {
        $scope.groups = {};
        for(var key in groups){
          if (groups[key].disabled === true)
          {
            continue
          }
          $scope.groups[groups[key].group] = groups[key];
        }
        $scope.maxsize = Object.keys($scope.groups).length
        $scope.num_questions = $scope.maxsize;
        $scope.safeApply(fn => fn);
      }, error => {
        console.error(error);
        $rootScope.genService.showDefaultErrorMsg(error.code);
        backofficeService.logpost(error,$scope.currentUser,'activity','error',()=>{},()=>{});

      });
    }

    /* Pick */
    $scope.Pick = function(key){
      $scope.picked_activities.has(key) === true ? (
        $scope.picked_activities.delete(key)
      ) : (
        $scope.picked_activities.add(key)
      )
    }

    /* Back */
    $scope.Back = function(){
      if ($scope.current_question_group == 1)
      {
        if(isEditMode){
          redirectService.changeStateWithLang('account');
        }
        else{
          $rootScope.user.force_url = 'pickindustry';
          if($stateParams.previousEditPage == "pickindustry"){
            redirectService.changeStateWithLang('pickindustry',{isEdit:true});  
          }
          else{
            redirectService.changeStateWithLang('pickindustry');
          }
          return;
        }
      }
      for(var i=$scope.current_question_group; i>0; i--){
        if(i===$scope.current_question_group) {continue}
        for(var key in $scope.questions_to_display){
          if($scope.questions_to_display[key].activity.group === $scope.groups[i].group){
            $scope.current_question_group = i;
            return;
          }
        }
      }
    }

    /* Next */
    $scope.Next = function(){
      for(var i=$scope.current_question_group; i<=Object.keys($scope.groups).length; i++){
        if(i===$scope.current_question_group) {continue}
        for(var key in $scope.questions_to_display){
          if($scope.questions_to_display[key].activity.group === $scope.groups[i].group){
            $scope.current_question_group = i;
            return;
          }
        }
      }
    }

    /* Finish */
    $scope.Finish = function(){
      $scope.disableFinishBtn = true;
      var insurance_array = [];
      var activity_array = [];

      $scope.picked_activities.forEach(key => {
        activity_array.push(key);
        insurance_array.push($scope.activities[key].insurance_type);
      });
      insurance_array = insurance_array.filter(insurence_id=>insurence_id);
      try{
          recommendationService.attachRecommendation($rootScope.company_uid, $rootScope.currentUser, insurance_array,
           activity_array, $scope.industry_codes, null, () => {
            $rootScope.user.force_url = '';
            if(isEditMode){
              redirectService.changeStateWithLang('account');
            }
            else{
              redirectService.changeStateWithLang('overview');              
            }
          },()=>{$scope.disableFinishBtn=false});
      }
      catch(e){
       $scope.disableFinishBtn=false;
       console.error(e);
       backofficeService.logpost(e,$scope.currentUser,'activity','error',()=>{},()=>{});
      }
    }

    /* Get the previously selected activity questions and add then to pick_activities set */
    function GetSelectedActivityQuestion () {
      if($rootScope.company && $rootScope.company.activities)
        $scope.picked_activities = new Set($rootScope.company.activities);
    }


  	/* Call these functions on controller load */
    $scope.GetGroups();
    $scope.GetActivityQuestions();
    GetSelectedActivityQuestion();


}
