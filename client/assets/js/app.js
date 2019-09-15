

/******************************************
 *  _ _                                   *
 *  | |   (_(_)                           *
 *  | |    _ _ _ __ ___   _____  __       *
 *  | |   | | | '_ ` _ \ / _ \ \/ /       *
 *  | |___| | | | | | | |  __/>  <        *
 *  \_____|_|_|_| |_| |_|\___/_/\_\        *
 *                                        *
 * Build 182                              *
 * (C) 2016-2017 Liimex GmbH              *
 * All Rights Reserved                    *
 * https://www.liimex.com                 *
 ******************************************/


 (function() {
   'use strict';

   angular.module('application', [
     'ui.router',
     'ngAnimate',
     'foundation',
     'ngResource',
     'foundation.dynamicRouting',
     'foundation.dynamicRouting.animations',
     'firebase',
     'dynamicNumber',
     'infinite-scroll',
     'ngFileUpload',
     'angularUUID2'
     ]).config(config).run(run);


  // App Constants
  var land_at = "overview_en";
  var no_auth_land_at = "login_en";
  var road_block = new Set();
  var backoffice_url;
  road_block.add('my_en');

  // Inject Providers
  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider', '$resourceProvider', 'dynamicConfig'];

	// Provider Configurations
  function config($urlProvider, $locationProvider, $stateProvider, $resourceProvider, dynamicConfig) {

    // App Init
    firebase.initializeApp(dynamicConfig.firebase_config);
    backoffice_url = dynamicConfig.backofficeUrl;

    // Start URL if not other Specified
    $urlProvider.otherwise('de/login');
    $locationProvider.html5Mode({
     enabled:false,
     requireBase: false
   });
    $locationProvider.hashPrefix('!');
    $resourceProvider.defaults.stripTrailingSlashes = false;

  }

    // Ensure Company and User Loaded
    function getInitialInformation(currentUser, success, err_call, userService, companyService, $rootScope, recommendationService, documentService){
      console.log('..');
      userService.getUserInformation(currentUser,function(user){
        console.log('...');
        $rootScope.user = user;
          // update the forceurl to it's preferred lang
          if($rootScope.user && $rootScope.user.force_url)
          {
            /* if force_url already contains a lang suffix, remove it */
            $rootScope.user.force_url = $rootScope.user.force_url.split('_')[0];
            if($rootScope.langPreference) {
              $rootScope.user.force_url += '_'+$rootScope.langPreference;
            }
            else {
              $rootScope.user.force_url +='_de';
            }
          }
          userService.getEmployment(currentUser,  function(employment) {
            console.log('....');
            if(!employment) {
              err_call('error')
              return
            }
            $rootScope.company_uid = employment.company;
            companyService.getCompanyFromModel($rootScope.company_uid, function(company){
              console.log('.....');
              $rootScope.company = company;
              success();
              documentService.getAndStoreMandate($rootScope.company.mandate, () => {}, () => {});
              //recommendationService.getRecommendations(Object.keys(company.recommendations)[0], f=>{
              //   console.log('......');
              // }, error => {
              //   console.error(error);
              // });
            } , function(error) {
              console.error(error);
            });
          }, function(error) {
            console.error(error);
          });
        }, function(error){
          err_call(error);
        });
    }

  	// App run( -> )
  	function run($rootScope, $state, authService, companyService, userService, $firebaseAuth, genService, recommendationService, documentService, backofficeService, $anchorScroll, $location, apiService, externalService) {

      $rootScope.backoffice_url = backoffice_url;

      FastClick.attach(document.body);

      // Getting Init Information
      //$rootScope.authenticating = false;
   		// Make Services Available from RootScope
   		$rootScope.authService = authService;
   		$rootScope.genService = genService;

      /* Signout */
      $rootScope.Signout = function(){
        authService.logout(function(){
          $rootScope.genService.showDefaultSuccessMsg('You have successfully logged out');
        }, function(error){
          $rootScope.genService.showDefaultErrorMsg('Could not log you out');
        });
      }

      $rootScope.langPreference  = 'de';

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-84062630-2', 'auto');

 		  // Watch for StateChanges to Complete
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        // Location tracking for Google Analytics

        ga('send', 'pageview', $location.url());

      // Set Language Preference when Url changes
      $rootScope.langPreference = toState.name.split('_')[1];

      // Defining Lanuage Dependent Variables
      var language_vars = {};
      language_vars.de = {}
      language_vars.en = {}
      language_vars.de.land_at = 'overview_de'
      language_vars.de.no_auth_land_at = 'login_de'
      language_vars.de.road_block = 'my_de'
      language_vars.en.land_at = 'overview_en'
      language_vars.en.no_auth_land_at = 'login_en'
      language_vars.en.road_block = 'my_en'

      // Setting Lanuage Dependent Variables
      land_at = language_vars[$rootScope.langPreference].land_at;
      no_auth_land_at = language_vars[$rootScope.langPreference].no_auth_land_at;
      road_block.add(language_vars[$rootScope.langPreference].road_block);

      // update the forceurl to it's preferred lang
      if($rootScope.user && $rootScope.user.force_url)
      {
        /* if force_url already contains a lang suffix, remove it */
        $rootScope.user.force_url = $rootScope.user.force_url.split('_')[0];
        if($rootScope.langPreference) {
          $rootScope.user.force_url += '_'+$rootScope.langPreference;
        }
        else {
          $rootScope.user.force_url +='_de';
        }
      }

      // check to hide navigation
      if (toState.data.vars.hide_navigation) {
        $rootScope.hide_navigation = true
      }
      else {
        $rootScope.hide_navigation = false
      }

      if (toState.data.vars.hide_footer) {
        $rootScope.hide_footer = true
      }
      else {
        $rootScope.hide_footer = false
      }


      // On Logout, keep checking status of login
      $rootScope.authService.getCurrentUser(function(firebaseUser){
        if(!firebaseUser){
         $rootScope.currentUser = undefined;
       }
     });

      var loginRequired = toState.data.vars.loginRequired;
      $rootScope.currentState = toState.name;
      console.log('Current State:',toState.name);
      console.log('Current User:', $rootScope.currentUser);

      // Check for Force URL
      if(loginRequired && $rootScope.user && $rootScope.user && $rootScope.user.force_url !== toState.name && $state.href($rootScope.user.force_url)){
        $state.go($rootScope.user.force_url);
      }

      if($rootScope.user && !$rootScope.user.force_url && toState.data.vars.forceRequired && $rootScope.currentUser){
        $state.go(land_at);
      }

      if(road_block.has(toState.name)){
        $state.go(land_at);
      }

      if(toState.data.vars.logoutRequired && $rootScope.currentUser ){
        $state.go(land_at);
        return;
      }

      //user is authenticated but on login page, redirecct to overview.
      $firebaseAuth().$waitForSignIn().then(function(status){
        if(status!==null && toState.data.vars.logoutRequired){
          $state.go(land_at);
        }
      })

      // if(authService.isEmailVerified() === false && !$rootScope.user.force_url){
      //   $state.go('verify');
      // }

      if ((loginRequired && typeof $rootScope.currentUser === 'undefined') || (toState.data.vars.logoutRequired && $rootScope.currentUser )) {
        $rootScope.authenticating = true;
        console.log('.');
        $firebaseAuth().$waitForSignIn().then(function(status){
          console.log('Auth Resolved');
          if(!status){
            $state.go(no_auth_land_at);
            $rootScope.authenticating = false;
          }
          else{
            $rootScope.currentUser = status.uid;
            getInitialInformation(status.uid, function(){
              $rootScope.authenticating = false;
              if($rootScope.user.force_url && $rootScope.user.force_url !== toState.name && $state.href($rootScope.user.force_url)){
                $state.go($rootScope.user.force_url);
              }else{
                $state.go(land_at)
                $state.reload();
              }
              console.log('Current User:', $rootScope.currentUser);

            }, function(error){
              console.error(error);
              $state.go(no_auth_land_at);
              authService.logout(function(){}, function(){});
              $rootScope.authenticating = false;
            }, userService, companyService, $rootScope, recommendationService, documentService);
          }
        });
      }
      $anchorScroll();
    });

    // Make a green header bar above everything #563
    var url = window.location.href;
    $rootScope.developmentEnvironment = !/^https?:\/\/lmx3.liimex.com/.test(url);
  }
})();

/*  Responsiveness Stuff  */

$(window).load(function () {

  $('.outerlogoutright').click(function(){
    if($('.navbar-logout-inner').css('display') == 'none') {
      $('.navbar-logout-inner').show();
      $('.logout-modal').removeClass('fadeOut');
      $('.logout-modal').addClass('ng-leave is-active ng-leave-active fadeIn');
    } else {
      $('.navbar-logout-inner').hide();
      $('.logout-modal').removeClass('ng-leave is-active ng-leave-active fadeIn');
      $('.logout-modal').addClass('fadeOut');
    }
  });

  $('.logout-modal').click(function(){
    $('.navbar-logout-inner').hide();
  });

  if($(window).width()>319 && $(window).width()<768) {
    var dropdown_status = 0;
    $(".navbar-hamburger").click(function(){
      if(dropdown_status == 0) {
        $('.mobile-sidebar-nav').show();
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','none');
        dropdown_status = 1;

        $('.mobile-sidebar-nav .sidebar-item').click(function(){
          $('.mobile-sidebar-nav').hide();
          $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','drop-shadow(0px 0px 20px #b3ceff)');
          dropdown_status = 0;
        });

      } else {
        $('.mobile-sidebar-nav').css('display','none');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','drop-shadow(0px 0px 20px #b3ceff)');
        dropdown_status = 0;
      }
    });
  } else {

  }

  if($(window).width()>600 && !$(".login-card")[0]) {
    $('.navbar-hamburger-outer').css('cssText','padding-top: 0 !important;');
  }

  // if($(window).width()>600) {
  // } else {
  //   $('.innerlogoutright').css('cssText','padding-top: 1rem !important');
  //   $('i.logout-icon-right').css('cssText','height: auto !important');
  // }
});

$(window).on('resize', function(){

  var dropdown_status = 0;

  if($(window).width()>319 && $(window).width()<768 && !$(".login-card")[0]) {
    $(".navbar-hamburger").click(function(){
      if(dropdown_status == 0) {
        $('.mobile-sidebar-nav').css('display','block');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','none');
        $(".fixed-details-right").css('border', 'none');
        dropdown_status = 1;
        $('.mobile-sidebar-nav .sidebar-item').click(function(){
          $('.mobile-sidebar-nav').hide();
          $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','drop-shadow(0px 0px 20px #b3ceff)');
          dropdown_status = 0;
        });
      } else {
        $('.mobile-sidebar-nav').css('display','none');
        $('.fixed-card.card.nav-corner.bg-white.shadow').css('filter','drop-shadow(0px 0px 20px #b3ceff)');
        dropdown_status = 0;
      }
    });
  }

  // if($(window).width()>600) {
  //   $('.innerlogoutright').css('cssText','padding-top: 0.15rem !important');
  // } else {
  //   $('.innerlogoutright').css('cssText','padding-top: 1rem !important');
  //   $('i.logout-icon-right').css('cssText','height: auto !important');
  // }
});
