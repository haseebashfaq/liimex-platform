(function() {
  
  'use strict';
  
  angular.module('application').
  service('insurancequestionsService', insurancequestionsService);
  
  insurancequestionsService.$inject = [ 'companyService','metaService' ,'$rootScope' ,'industryService'];
  function insurancequestionsService(companyService,metaService,$rootScope, industryService){
    
    var insuranceTypesGroups_tracker = [];
    var currentInsuranceTypesGroups_tracker = 0;
    var generalInsuranceQuestions = [];
    var confirmatoryInsuranceQuestions = [];
    var insuranceTypesGroups = {};
    var selectedInsuranceQuestions = [];
    var selectedProducts =[];
    var selectedInsuranceTypes = [];
    
    var selectedMappingObjs = [];
    var selectedInsurance_Products = [];
    var allInsuranceQuestionMappings = [];
    var allProductsQuestionMappings = [];
    
    var allInsuranceQuestions = [];
    var allProductsQuestions = [];
    
    var previousView = 'generalQuestions';
    
    var insurance_types = {};
    
    var allIndustryCode= {};
    
    var ProductPretriggerQuestions =[];
    var productsPassingKnockoutTriggers = [];
    
    
    function saveInsuranceQuestions(_insuranceQuestions){
      _insuranceQuestions.forEach((_mainQuestion)=>{
        if(_mainQuestion.key && _mainQuestion.answer){
          var answerObj = {'answer': _mainQuestion.answer};
          companyService.updateInsuraceAnswer($rootScope.company_uid,_mainQuestion.key, answerObj);
        }
        if(_mainQuestion.triggerMarchingSubQs){
          _mainQuestion.triggerMarchingSubQs.forEach((_subQuestion)=>{
            if(_subQuestion.key && _subQuestion.answer){
              var answerObj = {'answer': _subQuestion.answer};
              companyService.updateInsuraceAnswer($rootScope.company_uid,_subQuestion.key, answerObj);
            }
          });
        }
      });
    }
    
    /* get Insurance objs */
    function getInsuranceObjs(selectedInsurancesKeys,callback, err_call){
      selectedInsuranceTypes = [];
      metaService.getInsuranceTypes(insurTypes=>{
        for(let key in insurTypes){
          let isSelectedInsurance = selectedInsurancesKeys.find(selectedInsurance=> selectedInsurance == key);
          if(isSelectedInsurance){
            selectedInsuranceTypes.push({key: key,selectedInsuranceType: insurTypes[key]});
          }
        }
        if(callback)
          callback(selectedInsuranceTypes);
      },err_call);
    }
    
    function getQsForSelectedInsurances(selectedInsurancesKeys, callback, err_call){
      selectedInsuranceQuestions = [];
      selectedInsuranceTypes = [];
      selectedMappingObjs 
      insurance_types = insurance_types;
      getInsuranceObjs(selectedInsurancesKeys,(selectedInsurancesObjs)=>{
        getAllMappingObjs(selectedInsurancesKeys,()=>{
          selectedInsuranceTypes.forEach((selectedInsuranceType)=>{
            var _selectedMappingObj = allInsuranceQuestionMappings.find((mappingsObj)=>mappingsObj.insuranceType == selectedInsuranceType.key);
            if(_selectedMappingObj)
              selectedMappingObjs.push(_selectedMappingObj);
          });
          selectedMappingObjs.forEach((selectedMObj)=>{
            for(var qKey in selectedMObj.mappings){
              var mainQuestion = getInsuranceQsByQId(qKey);
              if(mainQuestion){
                mainQuestion.subQuestions = [];
                mainQuestion.insurance_type = selectedMObj.insuranceType;
                mainQuestion.order = selectedMObj.mappings[qKey].order;
                if(selectedMObj.mappings[qKey].children){
                  for(var childQKey in selectedMObj.mappings[qKey].children){
                    var childQuestion = getInsuranceQsByQId(childQKey);
                    if(childQuestion){
                      childQuestion.trigger = selectedMObj.mappings[qKey].children[childQKey].trigger;
                      mainQuestion.subQuestions.push(childQuestion);
                    }
                  }
                }
                selectedInsuranceQuestions.push(mainQuestion);
              }
            }
          });
          /*remove duplicate question objs*/
          selectedInsuranceQuestions = [...new Set(selectedInsuranceQuestions)];
          
          assignExistingAnswersForQuesions(selectedInsuranceQuestions);
          divideQuestionTypes(selectedInsuranceQuestions);          
          if(callback)
            callback();
        },err_call);
      },err_call);
    }
    
    
    function divideQuestionTypes(selectedInsuranceQuestions) {
      generalInsuranceQuestions = [];
      insuranceTypesGroups = {};
      insuranceTypesGroups_tracker = [];
      confirmatoryInsuranceQuestions = [];
      
      selectedInsuranceQuestions.forEach((insuranceQuestion)=>{
        if(insuranceQuestion.insurance_type == 'general')
          generalInsuranceQuestions.push(insuranceQuestion);
        else if(insuranceQuestion.insurance_type == 'confirmatory')
          confirmatoryInsuranceQuestions.push(insuranceQuestion);
        else{
          if(!insuranceTypesGroups[insuranceQuestion.insurance_type]){
            insuranceTypesGroups[insuranceQuestion.insurance_type] =[];
            insuranceTypesGroups_tracker.push(insuranceQuestion.insurance_type);
          }
          insuranceTypesGroups[insuranceQuestion.insurance_type].push(insuranceQuestion);
        }
      });
      pushConfirmatoryQsToEnd(insuranceTypesGroups);
    }
    
    function getGeneralQuestions(callback, err_call){
      if(callback)
        callback(generalInsuranceQuestions);
    }
    
    function getSpecificQuestions(callback, err_call){
      getGeneralQuestions(generalInsuranceQuestions=>{
        getProductPretriggerQs(productPretriggerQuestions=>{
          getProductQuestions(generalInsuranceQuestions,productPretriggerQuestions,producQuestionsByInsuranceId=>{
            insuranceTypesGroups = filterSpecificQuestionsPresentInProductQuestions(insuranceTypesGroups,producQuestionsByInsuranceId);
            if(callback)
              callback({'insuranceTypesGroups': insuranceTypesGroups , 'insuranceTypesGroups_tracker':insuranceTypesGroups_tracker , 'currentInsuranceTypesGroups_tracker' : currentInsuranceTypesGroups_tracker, 'producQuestionsByInsuranceId': producQuestionsByInsuranceId});
          });
        });
      });      
    }
    
    function getConfirmatoryQuestions(callback, err_call){
      if(callback)
        callback(confirmatoryInsuranceQuestions);      
    }
    
    /* returns the insurance question object for the given question ids*/
    function getInsuranceQsByQId(qkey){
      return allInsuranceQuestions.find((insuranceQuestion)=>insuranceQuestion.key == qkey);
    }
    
    const getPreviousViewState = ()=>{
      return previousView;
    }
    
    function setPreviousViewState(_previousView){
      previousView = _previousView;
    }
    
    function assignExistingAnswersForQuesions(questionsArr){
      questionsArr.forEach((question)=>{
        if($rootScope.company.insurance_questionnaire && $rootScope.company.insurance_questionnaire[question.key])
          question.answer = $rootScope.company.insurance_questionnaire[question.key].answer;
        if(question.subQuestions)
          question.subQuestions.forEach((subQ)=>{
          if($rootScope.company.insurance_questionnaire && $rootScope.company.insurance_questionnaire[subQ.key]){
            subQ.answer = $rootScope.company.insurance_questionnaire[subQ.key].answer;
            if(!question.triggerMarchingSubQs)
              question.triggerMarchingSubQs = [];
            question.triggerMarchingSubQs.push(subQ);            
          }
        });
        if(question.triggerMarchingSubQs)
          question.triggerMarchingSubQs = [...new Set(question.triggerMarchingSubQs)];    
      });
    }
    
    /* reset the trigger matiching subquestions */
    function refreshTriggerMatchingSubQuestions(questionsArr){
      questionsArr.forEach((mainQuestion)=>{
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
      });
      return questionsArr;
    }
    
    function getTriggerMarchingSubQs(mainQuestion){
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
      $scope.safeApply(e=>e);
    }
    
    function pushConfirmatoryQsToEnd(insuranceTypesGroups){
      if(insuranceTypesGroups.confirmatory){
        insuranceTypesGroups.confirmatory.order = 0;      
      }    
    }   
    
    function getAllMappingObjs(selectedInsurancesKeys,callback,err_call){
      metaService.getInsuranceQuestionMappings((_allInsuranceQuestionMappings)=>{
        selectedMappingObjs = [];
        for(let index in _allInsuranceQuestionMappings.insurance_types){
          let mappingsObj = _allInsuranceQuestionMappings.insurance_types[index].questions;
          allInsuranceQuestionMappings.push({insuranceType: index, mappings: mappingsObj});
        }
        for(let index in _allInsuranceQuestionMappings.products){
          let mappingsObj = _allInsuranceQuestionMappings.products[index].questions;
          allProductsQuestionMappings.push({productType: index, mappings: mappingsObj});
        }
        
        /*add all the general question to the selected mappings list*/
        selectedMappingObjs.push(allInsuranceQuestionMappings.find((mappingsObj)=> mappingsObj.insuranceType == 'general'));
        selectedMappingObjs.push(allInsuranceQuestionMappings.find((mappingsObj)=> mappingsObj.insuranceType == 'confirmatory'));
        /* filter the products mapping objs according to the insurance types selected.*/
        getProductsForSelectedInsurances(selectedInsurancesKeys,()=>{
          getProductsForIndustryCodes(()=>{
            if(callback)
              callback();
          });
          
        },err_call);        
      });
    }
    
    const getInsuranceNameById = (insuranceKey)=> insurance_types[insuranceKey]?insurance_types[insuranceKey].name_en: insuranceKey;
    
    function setCurrentInsuranceTypesGroups_tracker(_CurrentInsuranceTypesGroups_tracker){
      currentInsuranceTypesGroups_tracker = _CurrentInsuranceTypesGroups_tracker
    }
    
    function getCurrentInsuranceTypesGroups_tracker(){
      return currentInsuranceTypesGroups_tracker;
    }
    
    /* get the products objs for the insurance types selected */
    function getProductsForSelectedInsurances(selectedInsurancesKeys,callback,err_call){
      selectedInsurance_Products =[];
      
      selectedInsurancesKeys.forEach((insurancesKey)=>{
        let _selectedInsurance_products = allProductsQuestions.filter
        (productObj=>productObj.product.insurance_type == insurancesKey);
        selectedInsurance_Products.push(..._selectedInsurance_products);        
      });
      selectedInsurance_Products = [...new Set(selectedInsurance_Products)];
      if(callback)
        callback();
    }
    
    /* get the products for the industrycodes */
    function getProductsForIndustryCodes(callback, err_call){
      ProductPretriggerQuestions =[];
      selectedInsurance_Products.forEach(productObj=>{
        let isExcludeIndustryCodes = productObj.product.pre_triggers.industry.exclude_all;
        let productPretriggerIndustryCodes = getProductPreTriggerIndustryCodes(productObj.product);
        let allIndustryCodesWithParentsForCompany = industryService.getAllIndustryCodesWithParentsForCompany();
        for(let industryCode in allIndustryCodesWithParentsForCompany){
          /* if exclude all is set to true then, include all the industry codes matching my industry code. */
          if(isExcludeIndustryCodes){
            if(productPretriggerIndustryCodes.indexOf(industryCode) > -1 ){
              ProductPretriggerQuestions.push(productObj);
              break;
            }
          }
          else{
            if(productPretriggerIndustryCodes.indexOf(industryCode) == -1 ){
              ProductPretriggerQuestions.push(productObj);
            }
            else{
              /*  if u find any one of user's industry code matching the product's pretrigger industry codes then remove it */
              ProductPretriggerQuestions = ProductPretriggerQuestions.filter(productPreTriggerQ=> productPreTriggerQ.productType != productObj.productType);
              break;
            }
          }
        }        
      });
      ProductPretriggerQuestions =   [...new Set(ProductPretriggerQuestions)];
      if(callback)
        callback();
    }    
    
    /* returns the products objects which match the industry codes */
    function getProductPretriggerQs(callback,err_call){
      if(callback){
        callback(ProductPretriggerQuestions);
      }      
    }
    
    function getProductPreTriggerIndustryCodes(productObj){
      let productIndustryCodes = [];
      if(productObj && productObj.pre_triggers && productObj.pre_triggers.industry && productObj.pre_triggers.industry.industry_codes){
        for(let industryCode_id in productObj.pre_triggers.industry.industry_codes){
          let industryCode = allIndustryCode[industryCode_id].code;
          if(industryCode)
            productIndustryCodes.push(industryCode);
        }
      }
      return productIndustryCodes;
    }
    
    function getPretriggerMatchingProducts(generalQuestions,productPretriggerQs,callback,err_call){
      let pretriggerMatchingProducts = [];
      generalQuestions = refreshTriggerMatchingSubQuestions(generalQuestions);
      productPretriggerQs.forEach(productQ=>{
        if(productQ.product.pre_triggers){
          if(productQ.product.pre_triggers.questions){
            for(let questionId in productQ.product.pre_triggers.questions){
              /* find the answer provided for the question id in the general questions and it's subquestions */
              let generalquestionObj = getQuestionForQuestionId(questionId,generalQuestions);
              /* if question is not found in the genral question (bcos the subquestion was not triggered)  then include the product */
              if(generalquestionObj ==  undefined){
                pretriggerMatchingProducts.push(productQ);
                //break;
              }
              else{
                let productPretriggerQ = productQ.product.pre_triggers.questions[questionId];
                if(isProductPreTriggerMatch(generalquestionObj,productPretriggerQ)){
                  pretriggerMatchingProducts.push(productQ);
                }
                else{
                  pretriggerMatchingProducts = pretriggerMatchingProducts.filter(productObj=>productObj.productType != productQ.productType);
                  break; 
                }                  
              }
            }
          }
          else{
            /* if there are nor questions then the products are added */
            pretriggerMatchingProducts.push(productQ);
          }
        }        
      });
      if(callback){
        callback(pretriggerMatchingProducts);
      }
    }
    
    function getProductQuestions (generalQuestions,productPretriggerQs,callback,err_call){
      let productQuestions = [];
      let productQuestionsGroups = {};
      getPretriggerMatchingProducts(generalQuestions,productPretriggerQs,(pretriggerMatchingProducts)=>{
        let productIds = pretriggerMatchingProducts.map(product=>{
          return product.productType;
        });
        getProductMappingsForProductIds(productIds,(ProductMappingsData)=>{
          let productMappingObjs = ProductMappingsData.productMappingObjs;
          /* if the products does not have product mapping obj, then add it to products matching the knockout trigger, by default. */
          productsPassingKnockoutTriggers = ProductMappingsData.productsWithOutProductMappings;
          productMappingObjs.forEach((productMObj)=>{
            for(var qKey in productMObj.mappings){
              let mainQuestion = getInsuranceQsByQId(qKey);
              if(mainQuestion){
                mainQuestion.subQuestions = [];
                mainQuestion.product_type = productMObj.productType;
                mainQuestion.insurance_type = allProductsQuestions.find(product=>productMObj.productType == product.productType).product.insurance_type;
                mainQuestion.order = productMObj.mappings[qKey].order;
                mainQuestion.knockout_trigger = productMObj.mappings[qKey].knockout_trigger;
                if(productMObj.mappings[qKey].children){
                  for(let childQKey in productMObj.mappings[qKey].children){
                    let childQuestion = getInsuranceQsByQId(childQKey);
                    if(childQuestion){
                      childQuestion.trigger = productMObj.mappings[qKey].children[childQKey].trigger;
                      childQuestion.knockout_trigger = productMObj.mappings[qKey].children[childQKey].knockout_trigger;
                      childQuestion.product_type = productMObj.productType;
                      childQuestion.insurance_type = allProductsQuestions.find(product=>productMObj.productType == product.productType).product.insurance_type;
                      mainQuestion.subQuestions.push(childQuestion);
                    }
                  }
                }
                productQuestions.push(mainQuestion);
              }
            }
          });
          /*remove duplicate question objs*/
          productQuestions = [...new Set(productQuestions)];
          assignExistingAnswersForQuesions(productQuestions);
          productQuestionsGroups = groupProducQuestionsByInsuranceId(productQuestions);
          if(callback){
            callback(productQuestionsGroups);
          }
        },err_call);
      },err_call);
    }
    
    /* group the product questions to there productids */
    function groupProducQuestionsByProductId(productQuestions){
      let productTypesGroups = {};
      productQuestions.forEach(productQ=>{
        if(!productTypesGroups[productQ.product_type]){
          productTypesGroups[productQ.product_type] =[];
        }
        productTypesGroups[productQ.product_type].push(productQ);
      });
      return productTypesGroups;
    }
    
    /* group the product questions to there productids */
    function groupProducQuestionsByInsuranceId(productQuestions){
      let insuranceTypesGroups = {};
      productQuestions.forEach(productQ=>{
        if(!insuranceTypesGroups[productQ.insurance_type]){
          insuranceTypesGroups[productQ.insurance_type] =[];
        }
        insuranceTypesGroups[productQ.insurance_type].push(productQ);
      });
      return insuranceTypesGroups;
    }
    
    function getProductMappingsForProductIds(productIds,callback,err_call){
      let productMappingObjs =[];
      let productsWithOutProductMappings = [];
      productIds.forEach(productid=>{
        let _productMappingObj =  allProductsQuestionMappings.find(productMapping=> productMapping.productType == productid);
        if(_productMappingObj){
          productMappingObjs.push(_productMappingObj);
        }
        else{
          productsWithOutProductMappings.push(productid);
        }
      });
      if(callback){
        callback({"productMappingObjs":productMappingObjs, "productsWithOutProductMappings": productsWithOutProductMappings});
      }        
    }
    
    function getQuestionForQuestionId(questionId,questionsArr){
      /* find for the answer in main questions*/
      let returnQuestionObj;
      questionsArr.forEach(mainQuestion=>{
        if(mainQuestion.key == questionId){
          returnQuestionObj = mainQuestion;
        }
        else{
          /* try finding for the Qid in the answered subquestions */
          if(mainQuestion.triggerMarchingSubQs)
            mainQuestion.triggerMarchingSubQs.forEach(subQ=>{
            if(subQ.key == questionId){
              returnQuestionObj = subQ;
            }
          });
        }
      });
      return returnQuestionObj;
    }
    
    function isProductPreTriggerMatch(generalquestionObj,productPretriggerQ){
      let PretriggerCondition = productPretriggerQ.trigger.condition;
      let pretriggerValueOn = productPretriggerQ.trigger.on;
      let answer = generalquestionObj.answer;
      let _return = false;
      switch (PretriggerCondition) {
        case '>' :
        if( answer > pretriggerValueOn)
          _return=true;
        break;
        case '<' :
        if(answer < pretriggerValueOn)
          _return=true;
        break;
        case '<=' :
        if(answer <= pretriggerValueOn)
          _return=true;
        break;
        case '>=' :
        if(answer >=  pretriggerValueOn)
          _return=true;
        break;
        case '!=' :
        if(answer  != pretriggerValueOn)
          _return=true;
        break;
        case '==' :
        if(answer == pretriggerValueOn)
          _return=true;
        break;
        case '<>':
        if(answer<=productPretriggerQ.trigger.max && answer >= productPretriggerQ.trigger.min)
          _return = true;
        break;
        case 'no_threshold':
        _return = true;
        break;
      }
      return _return;
    }
    
    function isProductKnockoutTriggerMatch(productQ){
      /* if knockout trigger is not mentioned for a question, then consider the question to match the knockout trigger */
      if(productQ.knockout_trigger == undefined ){
        return true;
      }
      let knockoutTriggerCondition = productQ.knockout_trigger.condition;
      let knockoutTriggerValueOn = productQ.knockout_trigger.on;
      let answer = productQ.answer;
      let _return = false;
      switch (knockoutTriggerCondition) {
        case '>' :
        if( answer > knockoutTriggerValueOn)
          _return=true;
        break;
        case '<' :
        if(answer < knockoutTriggerValueOn)
          _return=true;
        break;
        case '<=' :
        if(answer <= knockoutTriggerValueOn)
          _return=true;
        break;
        case '>=' :
        if(answer >=  knockoutTriggerValueOn)
          _return=true;
        break;
        case '!=' :
        if(answer  != knockoutTriggerValueOn)
          _return=true;
        break;
        case '==' :
        if(answer == knockoutTriggerValueOn)
          _return=true;
        break;
        case '<>':
        if(answer<=productQ.knockout_trigger.max && answer >= productQ.knockout_trigger.min)
          _return = true;
        break;
        case 'no_threshold':
        _return = true;
        break;
      }
      return _return;
    }
    
    /* updates the list of products which pass the knockout triggers */
    function updateTriggerMatchingProducts(productTypesGroups, callback, err_call){
      for(let productId in productTypesGroups){
        let productQs = productTypesGroups[productId];
        /* include the trigger matching subquestions */
        productTypesGroups[productId].forEach(productQobj => {
          if(productQobj.triggerMarchingSubQs){
            productQs = productQs.concat(productQobj.triggerMarchingSubQs);  
          }
        });
        
        let isEligiableForProduct = true;
        for(let index in productQs){
          if(!isProductKnockoutTriggerMatch(productQs[index])){
            isEligiableForProduct = false;
            break;
          }
        }
        if(isEligiableForProduct){
          productsPassingKnockoutTriggers.push(productId);
        }
      }
      //removeSpecificQsForTriggerMatchingProducts(productsPassingKnockoutTriggers);
      if(callback)
        callback(productsPassingKnockoutTriggers);
    }
    
    /* retuns true if elegiable for one product in the given product questions */
    function showInsuranceSpecificQuestions(productQuestionsForInsuranceType, callback, err_call){
      
      let productQs = productQuestionsForInsuranceType;
      /* include the trigger matching subquestions */
      productQuestionsForInsuranceType.forEach(productQobj => {
        if(productQobj.triggerMarchingSubQs){
          productQs = productQs.concat(productQobj.triggerMarchingSubQs);  
        }
      });
      
      /* get all the productids present in the above questions(for one insurance type)*/
      let productIdsPerInsuranceType = productQs.map(productQ=>productQ.product_type);
      // keep the productids unique
      productIdsPerInsuranceType = [...new Set(productIdsPerInsuranceType)];
      for(var index in productIdsPerInsuranceType){
        let productQuestionsPerProductId = productQs.filter(productQ=>productQ.product_type == productIdsPerInsuranceType[index]);
        let isEligiableForProduct = true;
        for(let index in productQuestionsPerProductId){
          if(!isProductKnockoutTriggerMatch(productQs[index])){
            isEligiableForProduct = false;
            break;
          }
        }
        if(isEligiableForProduct){
          productsPassingKnockoutTriggers.push(productIdsPerInsuranceType[index]);
        }
      }
      if(productsPassingKnockoutTriggers.length > 0){
        return false;
      }
      else{
        return true;
      }
    }
    
    /* here we pop out the insurance specific questions, based on the trigger matching products */
    function removeSpecificQsForTriggerMatchingProducts(productsPassingKnockoutTriggers){
      productsPassingKnockoutTriggers.forEach(productId=>{
        let productObj = allProductsQuestions.find(product=>product.productType == productId);
        let insurance_type = productObj.product.insurance_type;
        if(insuranceTypesGroups[insurance_type]){
          delete insuranceTypesGroups[insurance_type];
          let index = insuranceTypesGroups_tracker.indexOf(insurance_type);
          insuranceTypesGroups_tracker.splice(index, 1);
        }
      });
    }
    
    
    function getInsuranceTypesAndProductsDict(eligibleproducts,insurancesKeys, callback, err_call){
      let productIdArr = eligibleproducts;
      let productObjArr = [];
      let insuranceTypesAndProductsDict = {};
      productIdArr.forEach(productId=>{
        productObjArr.push(allProductsQuestions.find(product=>product.productType == productId));       
      });
      insurancesKeys.forEach(insuranceKey=>{
        insuranceTypesAndProductsDict[insuranceKey]= {};
        let productsMatchInsuranceTypes = productObjArr.filter(product=>product.product.insurance_type == insuranceKey);
        if(productsMatchInsuranceTypes){
          let productsMatchInsuranceTypes_keys =  {};
          productsMatchInsuranceTypes.forEach(product=>{
            productsMatchInsuranceTypes_keys[product.productType] = true;             
          });
          insuranceTypesAndProductsDict[insuranceKey] = productsMatchInsuranceTypes_keys;
        }
      });
      if(callback)
        callback(insuranceTypesAndProductsDict);
    }
    
    function getProductsPassingKnockoutTriggers(producQuestionsByInsuranceId, callback, err_call){
      /* conver the products questions that are grouped by insuranceids, to grouping them by product ids */
      let productQuestionsArr = [];
      let producQuestionsByProductId = {};
      for(var insuranceId in producQuestionsByInsuranceId){
        productQuestionsArr = productQuestionsArr.concat(producQuestionsByInsuranceId[insuranceId]);
      }
      productQuestionsArr = refreshTriggerMatchingSubQuestions(productQuestionsArr);
      producQuestionsByProductId = groupProducQuestionsByProductId(productQuestionsArr);
      updateTriggerMatchingProducts(producQuestionsByProductId,callback,err_call);
    }
    
    /* removes the questions from specific questions that are already asked in the product questions */
    function filterSpecificQuestionsPresentInProductQuestions(specificQuestionsByInsuranceId,producQuestionsByInsuranceId){
      for(let insuranceId in producQuestionsByInsuranceId){
        let specificQuestions = specificQuestionsByInsuranceId[insuranceId];
        let productQuestions = producQuestionsByInsuranceId[insuranceId];
        productQuestions.forEach(productQuestion =>{
          if(specificQuestions){
            let specificQuestionIndex = specificQuestions.findIndex(specificQ => specificQ.key == productQuestion.key);
            if(specificQuestionIndex > -1){
              specificQuestions.splice(specificQuestionIndex,1);
            }
          }          
        });
      }
      return specificQuestionsByInsuranceId;
    }
    
    /* Self executing function*/
    (()=>{
      metaService.getInsuranceQuestions((_allInsuranceQuestions)=> {
        for(var index in _allInsuranceQuestions){
          /* uncomment below line when, insurance questions disable feature is required */
          //if(!_allInsuranceQuestions[index].disabled)
          allInsuranceQuestions.push({key:index,insuranceQuestionObj: _allInsuranceQuestions[index]});
        }
      });
      
      metaService.getInsuranceQuestionMappings((_allInsuranceQuestionMappings)=>{
        for(var index in _allInsuranceQuestionMappings.insurance_types ){
          var mappingsObj = _allInsuranceQuestionMappings.insurance_types[index].questions;
          allInsuranceQuestionMappings.push({insuranceType: index, mappings: mappingsObj});
        }
        /*add all the general question to the selected mappings list*/
        selectedMappingObjs.push(allInsuranceQuestionMappings.find((mappingsObj)=> mappingsObj.insuranceType == 'general'));
        selectedMappingObjs.push(allInsuranceQuestionMappings.find((mappingsObj)=> mappingsObj.insuranceType == 'confirmatory'));
      });
      
      metaService.getInsuranceTypes(types => {
        insurance_types = types;
      });
      
      metaService.getInsuranceProducts(_allProduct=>{
        for(let index in _allProduct){
          if(_allProduct[index].disabled)
            continue;
          allProductsQuestions.push( {productType: index, product: _allProduct[index]} );
        }
      });
      
      metaService.getIndustryCodes(_allIndustryCode=>{
        allIndustryCode = _allIndustryCode;
      });
      
    })()
    
    /* Return Stuff */
    return {
      saveInsuranceQuestions: saveInsuranceQuestions,
      getQsForSelectedInsurances:getQsForSelectedInsurances,
      getGeneralQuestions: getGeneralQuestions,
      getSpecificQuestions: getSpecificQuestions,
      getConfirmatoryQuestions: getConfirmatoryQuestions,
      getPreviousViewState: getPreviousViewState,
      setPreviousViewState: setPreviousViewState,
      getInsuranceNameById: getInsuranceNameById,
      getCurrentInsuranceTypesGroups_tracker: getCurrentInsuranceTypesGroups_tracker,
      setCurrentInsuranceTypesGroups_tracker: setCurrentInsuranceTypesGroups_tracker,
      getProductPretriggerQs: getProductPretriggerQs,
      getProductQuestions: getProductQuestions,
      getInsuranceTypesAndProductsDict: getInsuranceTypesAndProductsDict,
      showInsuranceSpecificQuestions: showInsuranceSpecificQuestions,
      getProductsPassingKnockoutTriggers:getProductsPassingKnockoutTriggers
    }
  }
  
})();
