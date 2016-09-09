angular.module('app', [
    'app.core',
    'app.admin',
    'app.home',
    'duScroll',
    'uiGmapgoogle-maps',
    'ui.router',
    'ui.tinymce'
  ])
  .filter('unsafe', function($sce) {
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  })
  .filter('chargeinterval', function($sce) {
    return function(val) {

      var result = ""

      switch(val) {
        case "month":
              result = "μήνα"
              break;
        case "twomonths":
          result = "2μηνο"
          break;
        case "threemonths":
          result = "3μηνο"
          break;
        case "sixmonths":
          result = "6μηνο"
          break;
        case "year":
          result="χρόνο"
          break;
      }

      return result;
    };
  })
  .config(['$localStorageProvider',
    function ($localStorageProvider) {
      $localStorageProvider.setKeyPrefix('koutro-');
    }])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyA33F1KN83lF7EZCNPhEsLxdU_-qhOeUV8',
    });
  })
  .config(['$routeProvider', '$locationProvider', 'NotificationProvider',
    function($routeProvider, $locationProvider, NotificationProvider) {
      $routeProvider
          .when('/404', {
            templateUrl: 'js/errors/404.html',
            controller: function(){

            }
          })
          .otherwise({
            redirectTo : '/404'
      });

      // Use the HTML5 History API
      $locationProvider.html5Mode(true);

      NotificationProvider.setOptions({
        positionX: 'left',
        positionY: 'bottom'
      });
    }
  ])
  .run([function() {

    }
  ])
  .controller('MainController', ['$scope', 'AuthService', '$location','$document','$route',
    function($scope, AuthService, $location,$document,$route) {
      $scope.isAuthenticated = AuthService.isAuthenticated;

      //$scope.isMenuVisible = false;
      //$scope.toggleMenu = function(){
      //  $scope.isMenuVisible = !$scope.isMenuVisible;
      //}


      $scope.$location = $location;



      $scope.isActive = function(path) {
        return $location.path() == path
      }

      $scope.canAccessAdminArea = function() {
        return AuthService.canAccessAdminArea()
      }
      $scope.doneLoading = true;

      $scope.isNarrow = function() {
        return window.innerWidth <= 500
      }

      $scope.isShort = function() {
        return window.innerHeight <= 500
      }


      $scope.activeSection = "";
      $scope.scrollTo = function(id){
        $scope.isMenuVisible = false;
        var offset = 50;
        var someElement = angular.element(document.getElementById(id));
        $document.scrollToElement(someElement, offset, 1000).then(function() {
          $scope.activeSection = id
        });
        $scope.navCollapsed = true
      }

      $scope.scrollTop = function(){
        $scope.navCollapsed = true
        $document.scrollTop(0, 1000).then(function() {
          $scope.activeSection = ""

        });
      }


      $scope.socials = [
        {
          icon : 'facebook',
          link :'#'
        },{
          icon : 'twitter',
          link :'#'
        },{
          icon : 'linkedin',
          link :'#'
        },{
          icon : 'youtube',
          link :'#'
        },{
          icon : 'pinterest',
          link :'#'
        },{
          icon : 'skype',
          link :'#'
        }
      ]


    }
  ]);

angular.element(document).ready(function() {


  angular.bootstrap(document, ['app']);

});
