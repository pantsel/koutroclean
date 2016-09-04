angular.module('app.admin.services',[])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin/services', {
                templateUrl: 'js/admin-services/admin-services.html',
                controller : 'AdminServicesController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminServicesController', ['$scope','DataService','$uibModal','PubSub','InitializationService',
        function($scope, DataService, $uibModal, PubSub, InitializationService) {

            PubSub.subscribe('data-change', function() {
                DataService.getServices().then(function(response){
                    $scope.services = response.data
                    $scope.services.sort(function(a, b){
                        return a.ordering - b.ordering;
                    });
                })
            });

            DataService.getServices().then(function(response){
                $scope.services = response.data
                $scope.services.sort(function(a, b){
                    return a.ordering - b.ordering;
                });
            })
            //DataService.getHomeData('services').then(function(success){
            //    console.log("Retrieved services!",success)
            //})

            $scope.deleteService = function(service,index) {

                var r = confirm("Θέλετε σίγουρα να διαγράψετε την επιλεγμένη υπηρεσία;");
                if (r == true) {
                    DataService.deleteService(service.id).then(function(response){
                        console.log("Destroyed service!",response)
                    })
                }
            }

            $scope.updateService = function(service) {
                console.log("Servic to be updated",service)
                DataService.upsertService(service)
                    .then(function success(response) {
                        console.log("DataService.upsertService",response)
                    }, function error(error) {
                        console.log("DataService.upsertService error: ",error)
                    });
            }

            $scope.onUpdateService = function(service,index) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size : 'lg',
                    templateUrl: 'js/admin-services/create/create-service-modal.html',
                    controller: 'CreateServiceModalController',
                    resolve : {
                        service : service
                    }
                });

                modalInstance.result.then(function() {}, function() {});
            }

            $scope.onCreateService = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    size : 'lg',
                    templateUrl: 'js/admin-services/create/create-service-modal.html',
                    controller: 'CreateServiceModalController',
                    resolve : {
                        service : null
                    }
                });

                modalInstance.result.then(function() {}, function() {});
            }


        }
    ]);
