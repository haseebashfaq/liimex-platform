(function() {
  
  'use strict';
  
  angular.module('application').
  service('industryService', industryService);
  
  industryService.$inject = ['$rootScope','metaService'];
  
  function industryService($rootScope,metaService) {
    
    var indusCodesArr = [];
    
    function getIndustryCodesLeafNodes(industriesList){
      let industryCodesLeafnodes =[];
      let childNode ="";
      industriesList.forEach(industry=>{
        childNode = industry.code.code + ".1" ;
        childNode = industriesList.find(industryItem=> industryItem.code.code == childNode);
        if(!childNode){
          industryCodesLeafnodes.push(industry);
        }
      });
      return industryCodesLeafnodes;
    }
    
    /* Get Single industry code per industry code id without the call back */
    const getSingleIndustryCode = (industryCode_id) => indusCodesArr[industryCode_id]
    
    function getAllIndustryCodesWithParentsForCompany(){
      let object_with_all_codes = {}
      let industry_keys = $rootScope.company.industry_codes;
      for(var index in industry_keys){
        let split_code = industry_keys[index].split('.');
        let tmp_code = '';
        for (let inner_index in split_code) {
          if (split_code.hasOwnProperty(inner_index)) {
            tmp_code = inner_index == 0 ?
            tmp_code + split_code[inner_index] :
            tmp_code + '.' + split_code[inner_index];
            object_with_all_codes[tmp_code] = true;
          }
        }
      }
      return object_with_all_codes;
    }
    
    /* self executing function */
    (()=>{
      metaService.getIndustryCodes( industrycodes=>{
        for(let key in industrycodes)
          indusCodesArr[key] = industrycodes[key].code;
      });
    })()
    
    /* Return Stuff */
    return {
      getIndustryCodesLeafNodes: getIndustryCodesLeafNodes,
      getSingleIndustryCode: getSingleIndustryCode,
      getAllIndustryCodesWithParentsForCompany : getAllIndustryCodesWithParentsForCompany
    }
  }
})();
