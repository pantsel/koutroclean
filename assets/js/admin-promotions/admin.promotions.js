angular.module('app.admin.promotions',[])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin/promotions', {
                templateUrl: 'js/admin-promotions/admin-promotions.html',
                controller : 'AdminPromotionsController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminPromotionsController', ['$scope','DataService','$uibModal','PubSub','InitializationService',
        function($scope, DataService, $uibModal, PubSub, InitializationService) {

            $scope.loadingData = false;

            PubSub.subscribe('data-change', function() {
                loadData()
            });

            function loadData(){
                $scope.loadingData = true;
                DataService.getPromotions().then(function(response){
                    $scope.loadingData = false;
                    $scope.promotions = response.data
                    $scope.promotions.sort(function(a, b){
                        return a.ordering - b.ordering;
                    });
                },function(err){
                    $scope.loadingData = false;
                })
            }

            loadData();

            $scope.removeDetail = function(promotion,index){
                promotion.details.splice(index,1)
            }

            $scope.addPromotionDetail = function(promotion) {
                promotion.details.push({
                    content : ''
                })
            }

            $scope.savePromotion = function(promotion) {
                DataService.upsertPromotion(promotion)
                    .then(function success(response) {
                        console.log("DataService.upsertPromotion",response)
                    }, function error(error) {
                        console.log("DataService.upsertPromotion error: ",error)
                    });
            }

        }
    ]);
