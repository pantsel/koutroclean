angular.module('app.admin.settings',[])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin/settings', {
                templateUrl: 'js/admin-settings/admin-settings.html',
                controller : 'AdminSettingsController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminSettingsController', ['$log','$scope', 'AuthService', '$location','$document','InitializationService','DataService',
        function($log,$scope, AuthService, $location, $document, InitializationService, DataService) {

            DataService.getSettings().then(function(response){
                $log.info('Retrieved Settings: ',response)
                $scope.settings = response.data
            })

            $scope.saveSettings = function() {
                DataService.upsertSettings($scope.settings).then(function(response){
                    $scope.settings = response.data
                })
            }

        }
    ]);
