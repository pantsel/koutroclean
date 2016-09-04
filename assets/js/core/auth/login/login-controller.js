angular.module('app.core.auth.login', [
    'ngStorage',
    'ngRoute'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/auth/login', {
        templateUrl: 'js/core/auth/login/login.html',
        controller: 'LoginController',
        data: {
          private: false
        }
      });
  }])
  .controller('LoginController', ['$scope', 'Notification', 'AuthService', '$location','InitializationService',
    function($scope, Notification, AuthService, $location, InitializationService) {
      if (AuthService.isAuthenticated()) {
        $location.path('/admin');
      }

      $scope.credentials = {
        email: '',
        password: ''
      };

      $scope.login = function(credentials) {
        AuthService.login(credentials).then(function(user) {

          console.log("Login success!",user)

          Notification.success({
            message: 'Login Successful'
          });

          $location.path('/admin');
        }, function(err) {
          notificationObject = {
            title: err.statusText || 'Unable to login',
            message: err.data || 'Invalid Credentials'
          };

          Notification.error(notificationObject);
        });
      };
    }
  ]);
