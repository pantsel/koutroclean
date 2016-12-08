angular.module('app', [
    'app.core',
    'app.admin',
    'app.home',
    'app.blog',
    'app.blog.post',
    'duScroll',
    'ui.router',
    'ui.tinymce',
    'ngCookies',
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
    .config(function($logProvider){
        $logProvider.debugEnabled(false);
    })
  .config(['$localStorageProvider',
    function ($localStorageProvider) {
      $localStorageProvider.setKeyPrefix('koutro-');
    }])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBcGG5inWsXj0veWuerygM6cnEiAHSz01g',
    });
  })
    .config(['$animateProvider', function($animateProvider){
        // restrict animation to elements with the bi-animate css class with a regexp.
        // note: "bi-*" is our css namespace at @Bringr.
        $animateProvider.classNameFilter(/^((?!(fa-spinner)).)*$/);
    }])
  .config(['$routeProvider', '$locationProvider', 'NotificationProvider',
    function($routeProvider, $locationProvider, NotificationProvider) {
      $routeProvider
          .when('/404', {
            templateUrl: 'js/errors/404.html',
            controller: function(InitializationService){

                $('<img/>').attr('src', '../images/bg_grass.jpg').on('load',function() {
                    $(this).remove();


                    $('.init-hidden').css('display','block')
                    $(".initialization-spinner-wrapper").hide()

                    try{
                        reveal()
                    }catch(err){}




                });

            }
          })
          .otherwise({
            redirectTo : '/404'
      });

      // Use the HTML5 History API
      $locationProvider.html5Mode(true).hashPrefix('!');

      NotificationProvider.setOptions({
        positionX: 'left',
        positionY: 'bottom'
      });
    }
  ])
    .provider('myCSRF',[function(){
      var headerName = 'X-CSRF-Token';
      var cookieName = '_csrf';
      var allowedMethods = ['GET'];

      this.setHeaderName = function(n) {
        headerName = n;
      }
      this.setCookieName = function(n) {
        cookieName = n;
      }
      this.setAllowedMethods = function(n) {
        allowedMethods = n;
      }
      this.$get = [function(){
        return {
          'request': function(config) {
            if(allowedMethods.indexOf(config.method) === -1) {
              // do something on success
              config.headers[headerName] = document.getElementsByName('_csrf')[0].content;
            }
            return config;
          }
        }
      }];
    }]).config(function($httpProvider) {
    $httpProvider.interceptors.push('myCSRF');
})
  .run(['$http',function($http) {

  }])
  .controller('MainController', ['$scope', 'AuthService', '$location','DataService','$log','$http',
    function($scope, AuthService, $location,DataService, $log, $http) {
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
        //$log.debug('Retrieved Settings: ',response)
        $scope.settings = response.data

        $scope.socials = []

          if($scope.settings.social) {
              Object.keys($scope.settings.social).forEach(function(key){
                  if($scope.settings.social[key]) {
                      $scope.socials.push({
                          icon : key,
                          link : $scope.settings.social[key]
                      })
                  }

              })
          }

          $scope.map = { center: { latitude: $scope.settings.addressLat, longitude: $scope.settings.addressLon }, zoom: 16 };
      })


      DataService.queryPosts({
        page : 1,
        perPage : 4
      }).then(function(success){

        //console.log("Retrieved posts!",success)
        $scope.posts = success.data.posts
        $scope.pagination = success.data.meta.paginate
      }).catch(function(error){

      })

        $http({
            url: '/api/current_offers',
            method: "GET",
            params : {
                validFrom: new Date(),
                validUntil: new Date()

            }
        }).then(function(response) {
            $scope.currentOffer = response.data


        }, function(response) {
            //$log.debug("$scope.currentOffer fetch error",response)
        });


      





    }
  ]);

angular.element(document).ready(function() {


  angular.bootstrap(document, ['app']);

});
