angular.module('app.admin.create-service-modal',[])
    .controller('CreateServiceModalController', ['$scope', '$http', 'DataService', 'Notification', '$uibModalInstance','PubSub','service',
        function($scope, $http, DataService, Notification, $uibModalInstance,PubSub,service) {

            $scope.closeModal = function() {
                $uibModalInstance.dismiss();
            };

            if(service) {
                $scope.service = service
            }else{
                $scope.service = {
                    title : '',
                    description: '',
                    details : [],
                }

            }

            $scope.addListDetail = function() {
                $scope.service.details.push({
                    content : ''
                })
            }

            $scope.removeDetail = function(index){
                $scope.service.details.splice(index,1)
            }


            $scope.submit = function() {
                DataService.upsertService($scope.service)
                    .then(function success(response) {
                        console.log("DataService.upsertService",response)
                        $uibModalInstance.close();
                    }, function error(error) {
                        console.log("DataService.upsertService error: ",error)
                    });
            };



        }
    ]);
