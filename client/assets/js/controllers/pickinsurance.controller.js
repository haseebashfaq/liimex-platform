// Angular Module
angular.module('application').controller('PickinsuranceController', PickinsuranceController);

// Injections
PickinsuranceController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService','metaService','recommendationService','$sce'];

// Function
function PickinsuranceController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, metaService, recommendationService,$sce) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
    
    /* Scope Variables */
    $scope.weighted_insurance_types = {};
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
    
    
    /* Local variables */
    var weighted_recommendedInsurance = {};
    
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
    
    /* Get Recommendations */
    function GetRecommendations(){
        if (!$rootScope.company || !$rootScope.company.recommendations) { return };
        const index_of_recommended = 0;
        recommendationService.getRecommendations(Object.keys($rootScope.company.recommendations)[index_of_recommended], recommendation => {
            $scope.recommendation = recommendation.recommended;
            setWeightsForRecommendedInsurance();
            getAllInsuranceTypes();
        }, error => {
            console.error(error);
            $rootScope.authenticating = null
            backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
        })
    }
    
    /* set weights for recommended insurances */
    function setWeightsForRecommendedInsurance(){
        weighted_recommendedInsurance.essential = [];
        weighted_recommendedInsurance.additional = [];
        let seventyfiveAboveScores =[] , fiftyScores = [], twentyFiveScores=[], fiftyScoreslength = 0, seventyfiveAboveScoresLength =0;
        for(var index in $scope.recommendation){
            let score = $scope.recommendation[index].score;
            switch (score) {
                case 100:
                case 75:
                seventyfiveAboveScores.push(index);
                break;
                case 50:
                fiftyScores.push(index);
                break;
                case 25:
                twentyFiveScores.push(index);
                break;
                default:
                break;
            }
        }
        weighted_recommendedInsurance.essential.push(...seventyfiveAboveScores);
        weighted_recommendedInsurance.additional.push(...twentyFiveScores);
        
        fiftyScoreslength = fiftyScores.length;
        seventyfiveAboveScoresLength = seventyfiveAboveScores.length;
        
        if(seventyfiveAboveScoresLength + fiftyScoreslength <= 3)
            weighted_recommendedInsurance.essential.push(...fiftyScores);
        else
            weighted_recommendedInsurance.additional.push(...fiftyScores);
    }
    
    /* Get Insurance Types */
    function getAllInsuranceTypes(){
        metaService.getEnabledInsuranceTypes(types => {
            $scope.insurance_types = types;
            $scope.weighted_insurance_types.essential = [];
            $scope.weighted_insurance_types.additional = [];
            $scope.weighted_insurance_types.others = [];
            for(var key in types){
                if(weighted_recommendedInsurance.essential.indexOf(key) !== -1)
                    $scope.weighted_insurance_types.essential.push({key:key, type:types[key]});
                else if(weighted_recommendedInsurance.additional.indexOf(key) !== -1)
                    $scope.weighted_insurance_types.additional.push({key:key, type:types[key]});
                else
                    $scope.weighted_insurance_types.others.push({key:key, type:types[key]});
            }
            mapPreselectedInsuranceTypes();
            $scope.safeApply(f => f);
        }, error => {
            console.error(error);
            $rootScope.genService.showDefaultErrorMsg(error.code);
            backofficeService.logpost(error,$scope.currentUser,'overview','error',()=>{},()=>{});
        });
    }
    
    /* Map Preselected Insurance Types */
    function mapPreselectedInsuranceTypes() {
        let preselected;
        
        if(typeof $stateParams.preselected === 'string'){
            preselected = new Set()
            preselected.add($stateParams.preselected)
        } else {
            preselected = new Set($stateParams.preselected)
        }
        for(var index in $scope.insurance_types){
            if(preselected.has(index)){
                $scope.insurance_types[index].selected = true;
            } else {
                $scope.insurance_types[index].selected = false;
            }
        }
        
    }
    
    /* Set Insurance Type */
    $scope.SelectInsuranceType = function(key){
        $scope.SelectedInsurance = $scope.insurance_types[key];
        $scope.SelectedRecommendationKey = key;
        
        if($rootScope.langPreference=='de') {
            $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_de);  
        } else {
            $scope.SelectedInsuranceDescription = $sce.trustAsHtml($scope.SelectedInsurance.description_en);
        }
    }
    
    $scope.cancelProcess = function(){
        var resetInsurance = setInterval(function () {
            window.location.reload();
            clearInterval(resetInsurance);
        }, 10);
        redirectService.changeStateWithLang('overview');
    }

    $scope.getQsForSelectedInsurances = function(){
        let selectedInsurances = [];
        for(let key in  $scope.insurance_types){
            if($scope.insurance_types[key].selected)
                selectedInsurances.push(key);
        }
        if(selectedInsurances.length > 0){
            redirectService.changeStateWithLang('process',{'selectedInsurances':selectedInsurances,'view': 'generalQuestions'});
        }
        else{
            $scope.showInsuranceTypeError = true;
        }
    }
    
    
    /* Initialize the Controller */
    GetRecommendations();
    
}
