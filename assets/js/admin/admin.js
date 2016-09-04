angular.module('app.admin',[
    'app.admin.profile',
    'app.admin.settings',
    'app.admin.services',
    'app.admin.create-service-modal',
    'app.admin.promotions',
    'app.admin.create-promotions-modal'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl: 'js/admin/admin.html',
                //controller : 'AdminController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminController', ['$scope', 'AuthService', '$location','$document',
        function($scope, AuthService, $location, $document) {

            $scope.$location = $location
        }
    ]);
