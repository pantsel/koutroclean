angular.module('app.core.auth', [
    'app.core.auth.service',
    'app.core.auth.login',
    'app.core.auth.logout',
    'angular-jwt'
  ]).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .directive('authToolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/auth-toolbar.html'
    };
  })

  .config(['$httpProvider', 'jwtInterceptorProvider',
    function($httpProvider, jwtInterceptorProvider) {
      // Please note we're annotating the function so that the $injector works when the file is minified
      jwtInterceptorProvider.tokenGetter = ['AuthService', function(AuthService) {
        return AuthService.getToken();
      }];

      $httpProvider.interceptors.push('jwtInterceptor');

      $httpProvider.interceptors.push(['$q','$location',function ($q,$location) {
        return {
          'request' : function( request ) {
            return request;
          },
          'response': function (response) {
            return response;
          },
          'responseError': function (rejection) {
            console.error("Httpinterceptor got ", rejection)
            switch(rejection.status) {
              case 401:
                return $q.reject(rejection);
                break;
              case 400:
                return $q.reject(rejection);
                break;
              case -1:
                return $q.reject(rejection);
                //console.error("Httpinterceptor got " + rejection.status + " error")
                //window.location.href = '/auth/logout';
              case 403:
                return $q.reject(rejection);
                //console.error("Httpinterceptor got " + rejection.status + " error")
                window.location.href = '/auth/logout';
                break;
              default:
                return $q.reject(rejection);
            }
          }
        };
      }]);
    }
  ])
  .run(['$rootScope', 'AUTH_EVENTS', 'AuthService', 'Notification', '$location','$localStorage',
    function($rootScope, AUTH_EVENTS, AuthService, Notification, $location, $localStorage) {
      $rootScope.$on('$routeChangeStart', function(event, next) {
        // Consider whether to redirect the request if it is unauthorized
        if (
          next.data &&
          next.data.private
        ) {
          if (!AuthService.isAuthenticated()) {
            rejectRequest()

          }
        }


        function rejectRequest() {
          console.log('Unauthorized request, redirecting...');
          event.preventDefault();
          // User is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

          Notification.error({
            title: 'Unauthorized',
            message: 'Please login'
          });

          delete $localStorage.user;
          delete $localStorage.token;
          delete $localStorage.tokenContents;

          $location.path('/auth/login');

        }
      });
    }
  ]);

