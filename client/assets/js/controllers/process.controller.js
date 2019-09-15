// Angular Module
angular.module('application').controller('ProcessController', ProcessController);

// Injections
ProcessController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'companyService', 'recommendationService', 'Upload', 'policyService', 'documentService', 'offerService', 'metaService', 'FoundationApi', 'redirectService', 'backofficeService','insurancequestionsService','$anchorScroll','$window'];

// Function
function ProcessController($rootScope, $scope, $stateParams, $state, $controller, companyService, recommendationService, Upload, policyService, documentService, offerService, metaService, FoundationApi, redirectService, backofficeService,insurancequestionsService, $anchorScroll,$window) {
  angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
  
  /* Scope Variables */
  $scope.disableGetQuoteBtn= false;
  $scope.disableUploadBtn= false;
  $scope.files_to_upload = {};
  
  $scope.generalInsuranceQuestions =[];
  $scope.specificInsuranceQuestions =[];
  $scope.confirmatoryInsuranceQuestions =[];
  $scope.insuranceTypesGroups = {};
  $scope.weighted_insurance_types = {};
  
  $scope.dates = {};
  $scope.dates.year = {};
  $scope.dates.month = {};
  $scope.dates.day = {};
  
  $scope.currentInsuranceTypesGroups_tracker = 0;
  
  $scope.productPretriggerQs =[];
  $scope.productTypesGroups ={};
  $scope.producQuestionsByInsuranceId = {};
  $scope.selectedInsurancesKeys = [];
  $scope.showspecificQuestionsErrorMessage = false;
  $scope.showGeneralQuestionsErrorMessage = false;
  $scope.showconfirmatoryQuestionsErrorMessage = false;
  
  /* Local variables */
  var allInsuranceQuestions = [];
  var selectedInsuranceQuestions = [];
  var selectedInsuranceTypes = [];
  var allInsuranceQuestionMappings = [];
  var selectedMappingObjs = [];
  var weighted_recommendedInsurance = {};
  
  var selectedInsurancesKeys = [];
  var selectedInsurancesObjs =[];
  
  var currentInsurance;
  
  /* Insurance Card Icons */
  $scope.insurance_icons = {
    '-KbjclPv0LbnqBlC6tlv' : 'public_liability.svg',
    '-Kbjy8O7cor_ocMejerh' : 'public_liability.svg',
    '-Kbjy9R4dIDYb0zlwckc' : 'interuption.svg',
    '-KbjyAMh5OoJO_WbxhVI' : 'cyber.svg',
    '-KbjyWaNBfh7mkyJzplQ' : 'd_o.svg',
    '-KbjybKLFl8sj0Sx5-sz' : 'building.svg',
    '-Kbjz1OQ7D51UsZtedVG' : 'contents.svg',
    '-Kbjz9_tHHQgQ0kn59_u' : 'machine.svg',
    '-KbjzH0-OGml8Bv4GziN' : 'product_liability.svg',
    '-KbjzTD4YzqsIahUO_uf' : 'legal.svg',
    '-KbjzycPPJ0iZdbwI5jQ' : 'transport.svg',
    '-Kbk-2hizMxWljDJA_ky' : 'financial_liability.svg',
    '-Ke5TjQzVXs5hVW2oL9S' : 'electronics.svg',
    '-Ke5Ttp3QBYWJZ87P7de' : 'car.svg',
    '-Ke5Z1jJx8U6APka2E-a' : 'contract.svg',
    '-Ke5ZnsQKtJ-JLoiKSYL' : 'environmental.svg',
    '-Ke5dEzmLR0n0MpMXsb-' : 'accident.svg',
    'other' : 'shield.svg'
  }
  
  /*Safety Check*/
  if(!$rootScope.company || !$rootScope.company.recommendations){
    return
  }
  
  /*****scope functions****/
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
  
  /*handel change in views */
  $scope.changeViewTo = function(stateParam){
    insurancequestionsService.setPreviousViewState($scope.currentView);
    redirectService.changeStateWithLang('process',stateParam);    
  }
  
  $scope.gotoPickInsurance = function(){
    redirectService.changeStateWithLang('pickinsurance', {preselected : selectedInsurancesKeys});
  }
  
  
  /*function to update all insurance questions, based on the insrance types selected*/
  function getQsForSelectedInsurances(selectedInsuranceskeys, callback, err_call){
    insurancequestionsService.getQsForSelectedInsurances(selectedInsuranceskeys,callback, err_call);
  }
  
  $scope.dateChange = function(questionObj) {
    var unixSecondsTime,previousSelectedYear, previousSelectedMonth, previousSelectedDate;
    if(questionObj.answer){
      unixSecondsTime = new Date(questionObj.answer * 1000);
      previousSelectedYear = unixSecondsTime.getFullYear();
      previousSelectedMonth = unixSecondsTime.getMonth() + 1; // bcos js months are 0 indexed.
      previousSelectedDate = unixSecondsTime.getDate();
    }
    
    var uid = questionObj.key;
    var getMonth = $scope.dates.month[uid] ? $scope.dates.month[uid]: previousSelectedMonth;
    var getDay = $scope.dates.day[uid] ? $scope.dates.day[uid]: previousSelectedDate;
    var getYear = $scope.dates.year[uid] ? $scope.dates.year[uid]:  previousSelectedYear;
    
    if(!isNaN(getMonth) && !isNaN(getDay) && !isNaN(getYear)) {
      var fullDate = getYear+'-'+getMonth+'-'+getDay;
      fullDate = fullDate.replace(/-/g,'/');
      var dateObject = new Date(fullDate);
      var unixDate = dateObject.getTime()/1000;
      
      questionObj.answer = unixDate;
    }
  }
  
  $scope.getSubQuestions = function(mainQuestion){
    var triggerMarchingSubQs = [];
    if(mainQuestion.subQuestions)
      triggerMarchingSubQs = mainQuestion.subQuestions.filter((subQ)=>{
      var _return = false;
      switch(subQ.trigger.condition){
        case '>' :
        if( mainQuestion.answer > subQ.trigger.on)
          _return=true;
        break;
        case '<' :
        if(mainQuestion.answer < subQ.trigger.on)
          _return=true;
        break;
        case '<=' :
        if(mainQuestion.answer <= subQ.trigger.on)
          _return=true;
        break;
        case '>=' :
        if(mainQuestion.answer >=  subQ.trigger.on)
          _return=true;
        break;
        case '!=' :
        if(mainQuestion.answer  != subQ.trigger.on)
          _return=true;
        break;
        case '==' :
        if(mainQuestion.answer == subQ.trigger.on)
          _return=true;
        break;
      }
      return _return;
    });
    mainQuestion.triggerMarchingSubQs = triggerMarchingSubQs;
    return triggerMarchingSubQs;
    $scope.safeApply(e=>e);
  }
  
  $scope.getTriggerMarchingSubQs = function(mainQuestion){
    return $scope.getSubQuestions(mainQuestion);
  }
  
  /*saves general questions with there answers*/
  $scope.saveGeneralQsAndAs = function(form){
    if(!form.$valid){
      $scope.showGeneralQuestionsErrorMessage = true;
      return; 
    }
    saveQAndAs($scope.generalInsuranceQuestions,()=>{
      $scope.changeViewTo({view:'specificQuestions',currentInsuranceTypesGroups_tracker:0,previousBtnClick: false});
    }
    ,error=>{
      console.log("error while saving the general questions",error);
    });
  }
  
  $scope.saveProductQsAndAs = function(form){
    if(!form.$valid){return;}
    let productQs = [];
    for(var productType in $scope.productTypesGroups){
      productQs = productQs.concat($scope.productTypesGroups[productType]);
    }
    saveQAndAs(productQs,()=>{
      $scope.changeViewTo({view:'specificQuestions'});
    });    
  }
  
  /*saves confirmatory question with there answers*/
  $scope.saveConfirmatoryQsAndAs = function(form){
    if(!form.$valid){ 
      $scope.showconfirmatoryQuestionsErrorMessage = true;
      return; 
    }
    saveQAndAs($scope.confirmatoryInsuranceQuestions,()=>{
      $scope.changeViewTo({view:'checkOut'});
    });
  }
  
  /*display the previous insurance type specificQuestions*/
  $scope.getPreviousInsuranceGroupSpecificQuestions = function (){
    
    if($scope.showspecificQuestions){
      $scope.changeViewTo({'view':'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:true });
    }
    else{
      
      $scope.currentInsuranceTypesGroups_tracker--;
      if ($scope.currentInsuranceTypesGroups_tracker < 0){
        $scope.changeViewTo({'view':'generalQuestions', 'currentInsuranceTypesGroups_tracker': 0});
      }
      else{
        /* check if the user was eligible for a product in the previous page */
        let insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
        let isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);
        
        if(isshowSpecificQuestions){
          $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:true, previousBtnClick:true });
        }
        else{
          $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:true });
        }
      }
    }
  }
  
  /* when previous button on confirmatory questions is clicked*/
  $scope.confirmQuestions_previousBtnClick = function(){
    /* check if the user was eligible for a product in the previous page */
    let insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
    let isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);
    
    if(isshowSpecificQuestions){
      $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:true, previousBtnClick:true });
    }
    else{
      $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:true });
    }
  }
  
  
  $scope.goBack = function() {
    $window.history.back();    
  };
  
  /*dispaly the next insurance type specificQuestions*/
  $scope.getNextInsuranceGroupSpecificQuestions = function(form){
    if(!form.$valid){
      $scope.showspecificQuestionsErrorMessage = true;
      return; 
    }
    if(!$scope.showspecificQuestions){
      saveQAndAs($scope.producQuestionsByInsuranceId[currentInsurance],()=>{
        /* if the specific questions are disabled then check for the knockout for the product answers */
        let isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[currentInsurance]);
        /* if user is not elegiable for any products for the given insurane type then show the specific questions */
        if(isshowSpecificQuestions){
          if(isSpecificQsEmpty(currentInsurance)){
            $scope.currentInsuranceTypesGroups_tracker++;
            $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:false });
          }
          else{
            $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:true, previousBtnClick:false });
          }
        }
        else{
          $scope.currentInsuranceTypesGroups_tracker++;
          $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:false });
        }
      });
    }
    else{
      saveQAndAs($scope.insuranceTypesGroups[currentInsurance],()=>{
        $scope.currentInsuranceTypesGroups_tracker++;
        $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:false });
      });
    }
  }
  
  /* Finalize Checkout */
  $scope.FinalizeCheckout = function(){
    selectedInsurancesKeys
    offerService.requestMultipleOffers($scope.InsuranceTypesAndProductsDict, $rootScope.company_uid,f=>f,err=>{
      console.log("error while uploading offers", error);
      $rootScope.genService.showDefaultErrorMsg({code:'OFFER_ERROR_1'});
      backofficeService.logpost(error,$rootScope.currentUser,'process','error',()=>{},()=>{});
      console.log("error while uploading offers", error);
    });
  }
  
  
  /*****local functions******/
  
  function saveQAndAs(_insuranceQuestions, callback, err_call){
    companyService.updateInsuraceAnswer($rootScope.company_uid,_insuranceQuestions,callback,err_call);
  }
  
  $scope.cancelProcess = function(){
    var resetInsurance = setInterval(function () {
      window.location.reload();
      clearInterval(resetInsurance);
    }, 10);
    redirectService.changeStateWithLang('overview');
  }
  
  $scope.specificQuestionsHeadings = function(getInsuranceType){
    /* show default messages when displaying the product questions. or for specific questions displayed bcos the product questions were empty */
    if(!$scope.showspecificQuestions || isProductQsEmpty(currentInsurance)){
      
      if($scope.currentInsuranceTypesGroups_tracker == 0 && $scope.currentInsuranceTypesGroups_tracker != selectedInsurancesKeys.length-1 && $scope.currentInsuranceTypesGroups_tracker != selectedInsurancesKeys.length-2){
        if($rootScope.langPreference=='de') {
          return "Juhu. Jetzt geht's erst richtig los. Wir starten mit den Fragen für die "+$scope.insurance_types[getInsuranceType].name_de+'.';
        } else {
          return "Great! Let's get started with the "+$scope.insurance_types[getInsuranceType].name_en+" questions.";
        }
      }
      
      if($scope.currentInsuranceTypesGroups_tracker == selectedInsurancesKeys.length-2){
        if($rootScope.langPreference=='de') {
          return "Geschafft! Machen wir weiter mit der "+$scope.insurance_types[getInsuranceType].name_de+'.';
        } else {
          return "Done! Let's continue with the questions for the "+$scope.insurance_types[getInsuranceType].name_en+'.';
        }
      }
      
      if($scope.currentInsuranceTypesGroups_tracker == selectedInsurancesKeys.length-1){
        if($rootScope.langPreference=='de') {
          return "Durchhalten! Es geht weiter mit der "+$scope.insurance_types[getInsuranceType].name_de+'.';
        } else {
          return "Almost complete! Let's finish with the questions for "+$scope.insurance_types[getInsuranceType].name_en+'.';
        }
      }
      
      if($rootScope.langPreference=='de') {
        return "Wir probieren übrigens alles, um Versicherer davon zu überzeugen die Fragebögen zu kürzen! Nun aber erstmal die "+$scope.insurance_types[getInsuranceType].name_de+'.';
      } else if($rootScope.langPreference=='en') {
        return "Let's get on with the questions for the "+$scope.insurance_types[getInsuranceType].name_en+'.';
      }
    }
    
    /* else it means the product questions are non empty and ur on specific questions (ur are knockedout) */
    else {
      if($rootScope.langPreference=='de') {
        return "Leider brauchen wir in Ihrem Fall einige weitere Informationen zur "+$scope.insurance_types[getInsuranceType].name_de+'.';
      } else {
        return "Unfortunately, in your case, we need some more information for the "+$scope.insurance_types[getInsuranceType].name_en+".";
      }
    }
  }
  
  $scope.unixSecondsToDate = function(unixValue){
    var unixSecondsTime = new Date(unixValue * 1000);
    var year = unixSecondsTime.getFullYear();
    var month = unixSecondsTime.getMonth();
    var date = unixSecondsTime.getDate();
    
    if($rootScope.langPreference=='en') {
      switch (month)
      {
        case 0:
        month = 'January';
        break;
        case 1:
        month = 'February';
        break;
        case 2:
        month = 'March';
        break;
        case 3:
        month = 'April';
        break;
        case 4:
        month = 'May';
        break;
        case 5:
        month = 'June';
        break;
        case 6:
        month = 'July';
        break;
        case 7:
        month = 'August';
        break;
        case 8:
        month = 'September';
        break;
        case 9:
        month = 'October';
        break;
        case 10:
        month = 'November';
        break;
        case 11:
        month = 'December';
        break;
      }
    } else if($rootScope.langPreference=='de') {
      switch (month)
      {
        case 0:
        month = 'Januar';
        break;
        case 1:
        month = 'Februar';
        break;
        case 2:
        month = 'Marz';
        break;
        case 3:
        month = 'April';
        break;
        case 4:
        month = 'Mai';
        break;
        case 5:
        month = 'Juni';
        break;
        case 6:
        month = 'Juli';
        break;
        case 7:
        month = 'August';
        break;
        case 8:
        month = 'September';
        break;
        case 9:
        month = 'Oktober';
        break;
        case 10:
        month = 'November';
        break;
        case 11:
        month = 'Dezember';
        break;
      }
    }
    
    
    if(unixValue>0) {
      $scope.unixToDate = {};
      $scope.unixToDate.year = year;
      $scope.unixToDate.month = month;
      $scope.unixToDate.date = date;
      
      return $scope.unixToDate;
    }
  }
  
  $scope.getProductsForInsuranceType = function(insuranceType){
    return $scope.producQuestionsByInsuranceId[insuranceType];      
  }
  
  function addSelectedInsuranceToSpecificQsAndProductQs(){
    let specificQskeys = Object.keys($scope.insuranceTypesGroups);
    let productQsKeys = Object.keys($scope.producQuestionsByInsuranceId);
    
    if(specificQskeys.length < selectedInsurancesKeys.length){
      selectedInsurancesKeys.forEach(selectInsurType=>{
        let isSpecificQsPresent =  specificQskeys.find(_specificQskey=> _specificQskey == selectInsurType);
        if(!isSpecificQsPresent){
          $scope.insuranceTypesGroups[selectInsurType] = [];
        }
      });
    }
    if(productQsKeys.length < selectedInsurancesKeys.length){
      selectedInsurancesKeys.forEach(selectInsurType=>{
        let isProductQsPresent = productQsKeys.find(_productQsKey=> _productQsKey == selectInsurType);
        if(!isProductQsPresent){
          $scope.producQuestionsByInsuranceId[selectInsurType] = [];
        }
      });
    }
  }
  
  /* return true of false based on if there are any specific or product questions */
  function isSpecificAndProductionQsEmpty(selectedInsurance){
    if($scope.insuranceTypesGroups[selectedInsurance].length == 0 && $scope.producQuestionsByInsuranceId[selectedInsurance].length == 0)
      return true;
    else 
      return false;
  }
  
  function isSpecificQsEmpty(selectedInsurance){
    if($scope.insuranceTypesGroups[selectedInsurance].length == 0){
      return true;
    }
    else{
      return false;
    }
  }
  function isProductQsEmpty(selectedInsurance){
    if($scope.producQuestionsByInsuranceId[selectedInsurance].length == 0){
      return true;
    }
    else{
      return false;
    }
  }
  
  /* get questions for the current view, from the model stored in the service. and redirect to different view if needed */
  function getQuestionsForCurrentViewAndCheckForRedirect(currentView){
    metaService.getInsuranceTypes(types =>$scope.insurance_types = types);
    insurancequestionsService.getProductPretriggerQs((productPretriggerQs)=>{
      $scope.productPretriggerQs = productPretriggerQs;
    });
    let previousViewState = insurancequestionsService.getPreviousViewState();
    switch(currentView){
      case 'generalQuestions':
      insurancequestionsService.getGeneralQuestions((generalInsuranceQuestions)=>{
        $scope.generalInsuranceQuestions = generalInsuranceQuestions;
      });
      break;
      case 'specificQuestions':
      insurancequestionsService.getSpecificQuestions(specificQuestionsObj=>{
        $scope.insuranceTypesGroups = specificQuestionsObj.insuranceTypesGroups;
        $scope.producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
        $scope.currentInsuranceTypesGroups_tracker = Number($stateParams.currentInsuranceTypesGroups_tracker);
        $scope.previousBtnClick = ($stateParams.previousBtnClick == 'true');
        $scope.showspecificQuestions =($stateParams.showspecificQuestions == 'true');
        currentInsurance = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
        addSelectedInsuranceToSpecificQsAndProductQs();
        if($scope.currentInsuranceTypesGroups_tracker >= selectedInsurancesKeys.length){
          $scope.currentInsuranceTypesGroups_tracker = selectedInsurancesKeys.length-1;
          $scope.changeViewTo({'view':'confirmatoryQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker});
          return;
        }
        else if($scope.currentInsuranceTypesGroups_tracker < 0){
          $scope.changeViewTo({'view':'generalQuestions','currentInsuranceTypesGroups_tracker': 0});
          return;
        }
        /* get the direction from which*/
        if($scope.previousBtnClick){
          if($scope.showspecificQuestions){
            if(isSpecificQsEmpty(currentInsurance)){
              $scope.changeViewTo({'view':'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false,previousBtnClick:true });
            }
          }
          else if(isProductQsEmpty(currentInsurance)){
            $scope.currentInsuranceTypesGroups_tracker--;
            if($scope.currentInsuranceTypesGroups_tracker < 0){
              $scope.changeViewTo({'view':'generalQuestions','currentInsuranceTypesGroups_tracker': 0});
              return;
            }
            /* check if the user is eligible for a product in the previous page */
            let insuranceKey = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
            let isshowSpecificQuestions = insurancequestionsService.showInsuranceSpecificQuestions($scope.producQuestionsByInsuranceId[insuranceKey]);
            
            if(isshowSpecificQuestions){
              $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:true, previousBtnClick:true });
            }
            else{
              $scope.changeViewTo({'view': 'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:true });
            }
          }
        }
        else{
          if(!$scope.showspecificQuestions){
            if(isProductQsEmpty(currentInsurance)){
              $scope.changeViewTo({'view':'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:true, previousBtnClick:false });
            }
          }
          else if(isSpecificQsEmpty(currentInsurance)){
            $scope.currentInsuranceTypesGroups_tracker++;
            $scope.changeViewTo({'view':'specificQuestions','currentInsuranceTypesGroups_tracker': $scope.currentInsuranceTypesGroups_tracker,showspecificQuestions:false, previousBtnClick:false });
          }
        }        
      });
      
      break;
      case 'confirmatoryQuestions':
      insurancequestionsService.getSpecificQuestions(specificQuestionsObj=>{
        $scope.insuranceTypesGroups = specificQuestionsObj.insuranceTypesGroups;
        $scope.producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
        $scope.currentInsuranceTypesGroups_tracker = Number($stateParams.currentInsuranceTypesGroups_tracker);
        $scope.previousBtnClick = ($stateParams.previousBtnClick == 'true');
        $scope.showspecificQuestions =($stateParams.showspecificQuestions == 'true');
        currentInsurance = selectedInsurancesKeys[$scope.currentInsuranceTypesGroups_tracker];
        addSelectedInsuranceToSpecificQsAndProductQs();
      });
      insurancequestionsService.getConfirmatoryQuestions((confirmatoryInsuranceQuestions)=>{
        $scope.confirmatoryInsuranceQuestions = confirmatoryInsuranceQuestions;        
      });
      break;
      case 'checkOut':
      insurancequestionsService.getSpecificQuestions(specificQuestionsObj=>{
        let producQuestionsByInsuranceId = specificQuestionsObj.producQuestionsByInsuranceId;
        insurancequestionsService.getProductsPassingKnockoutTriggers(producQuestionsByInsuranceId,(eligibleproducts) =>{
          insurancequestionsService.getInsuranceTypesAndProductsDict(eligibleproducts,selectedInsurancesKeys,(InsuranceTypesAndProductsDict)=>{
            $scope.InsuranceTypesAndProductsDict = InsuranceTypesAndProductsDict;
          });        
        });
      });
      
      break;
    }
    $scope.safeApply(e=>e);
  }
  
  /* get the state params, parse em and set the ui accordingly */
  function parseStateParams(){
    $scope.currentView = $stateParams.view;
    if($stateParams.selectedInsurances){
      /* only one insurance is selected add it to an array */
      if(typeof $stateParams.selectedInsurances === 'string'){
        selectedInsurancesKeys.push($stateParams.selectedInsurances);  
      }
      else{
        selectedInsurancesKeys = $stateParams.selectedInsurances;
      }
      $scope.selectedInsurancesKeys = selectedInsurancesKeys;
      getQsForSelectedInsurances(selectedInsurancesKeys,()=>getQuestionsForCurrentViewAndCheckForRedirect($scope.currentView),error=>console.log("error while getting insurance question",error));
    }
  }
  
  /* Initialize the Controller */
  parseStateParams();
}
