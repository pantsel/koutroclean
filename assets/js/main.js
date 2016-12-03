angular.module('app', [
    'app.core',
    'app.admin',
    'app.home',
    'app.blog',
    'app.blog.post',
    'duScroll',
    'ui.router',
    'ui.tinymce'
  ])
    .directive('errSrc', function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
        }
      }
    })
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
  .controller('MainController', ['$scope', 'AuthService', '$location','DataService','$log',
    function($scope, AuthService, $location,DataService, $log) {
      $scope.isAuthenticated = AuthService.isAuthenticated;
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

      DataService.getSettings().then(function(response){
        $log.debug('Retrieved Settings: ',response)
        $scope.settings = response.data

        $scope.socials = []

        Object.keys($scope.settings.social).forEach(function(key){
          $scope.socials.push({
            icon : key,
            link : ( $scope.settings.social[key].indexOf("http://") < 0 || $scope.settings.social[key].indexOf("https://") < 0 )? "http://" + $scope.settings.social[key] : $scope.settings.social[key]
          })
        })
      })


      DataService.queryPosts({
        page : 1,
        perPage : 4
      }).then(function(success){

        console.log("Retrieved posts!",success)
        $scope.posts = success.data.posts
        $scope.pagination = success.data.meta.paginate
      }).catch(function(error){

      })


      





    }
  ]);

angular.element(document).ready(function() {


  angular.bootstrap(document, ['app']);

});
