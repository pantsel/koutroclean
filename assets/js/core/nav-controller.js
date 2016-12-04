angular.module('app.core.nav', [])
  .controller('NavController',
      ['$scope','$location','$document','$rootScope','$timeout','$log',
          function($scope, $location, $document, $rootScope, $timeout,$log) {
    //$scope.shouldHideNavMobile = true;
    //$scope.toggleNavMobile = function() {
    //  $scope.shouldHideNavMobile = !$scope.shouldHideNavMobile;
    //};
    //$scope.hideNavMobile = function() {
    //  $scope.shouldHideNavMobile = true;
    //};
      $scope.activeSection = "";
      $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
          $log.debug("$routeChangeSuccess:next",next)

          if(next.$$route.originalPath !== '/') {
              $scope.activeSection = next.$$route.name || ""
          }

          if(next.$$route.originalPath == '/' && $scope.activeSection != "") {
              $timeout(function(){
                  $scope.scrollTo($scope.activeSection)
              },1000)
          }
      });


      $scope.scrollTo = function(id){
          $scope.navCollapsed = true
          $scope.activeSection = id

          if($location.$$path != '/') {
              $location.$$path = '/'
              return false
          }

          var offset = 60;
          var someElement = angular.element(document.getElementById(id));
            $document.scrollToElement(someElement, offset, 1000).then(function() {
          });

      }

      $scope.scrollTop = function(){
          $scope.navCollapsed = true
          if($location.$$path != '/') {
              $scope.activeSection = ""
              $location.$$path = '/'
              return false
          }
          $document.scrollTop(0, 1000).then(function() {
              $scope.activeSection = ""

          });
      }
  }]);
