angular.module('app.admin.promotions',[
    'ui.bootstrap.datepickerPopup'
])
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
            $scope.activeIndex = 0

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
    ])
    .controller('AdminCurrentOfferController', ['$scope','Notification','$uibModal','$log','$http',
        function($scope, Notification, $uibModal, $log, $http) {


            $scope.currentOffer = {}

            $scope.dateOptions = {
                dateDisabled: false,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function() {
                $scope.popup2.opened = true;
            };

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            $scope.submitCurrentOffer = function(isValid) {
                $scope.currentOffer.validFrom = moment($scope.currentOffer.validFrom).startOf('day')
                $scope.currentOffer.validUntil = moment($scope.currentOffer.validUntil).endOf('day')


                $http({
                    url: '/api/current_offers',
                    method: "POST",
                    data: $scope.currentOffer
                }).then(function(response) {
                    Notification.success('Η τρέχουσα προσφορά ενημερώθηκε με επιτυχία.');
                    $log.debug("$scope.currentOffer",response)
                    response.data.validFrom = new Date(response.data.validFrom)
                    response.data.validUntil = new Date(response.data.validUntil)
                    $scope.currentOffer = response.data
                    $scope.isRunning = isRunning()
                }, function(response) {

                    var errorTitle = 'Παρουσιάστηκε πρόβλημα κατά την αποστολή της φόρμας';

                    showErrors(response, errorTitle);
                });
            }

            var showErrors = function(response, errorTitle) {
                if (!response) {
                    return Notification.error({
                        title: errorTitle,
                        message: 'An Unkown Error Occurred.'
                    });
                }

                $scope.invalidAttributes = []

                Object.keys(response.data.invalidAttributes).forEach(function(key){
                    $scope.invalidAttributes.push(key)
                })

                if($scope.invalidAttributes.length) {
                    response.data.message = "Υπάρχουν υποχρεωτικά πεδία που δεν έχετε συμπληρώσει"
                }

                Notification.error({
                    title: errorTitle,
                    message: response.data.error || response.data.message || response.data.details || response.summary || 'An Unkown Error Occurred.'
                });
            };



            $http({
                url: '/api/current_offers',
                method: "GET",
                params : {
                    //validUntil: new Date()
                }
            }).then(function(response) {
                $log.debug("$scope.currentOffer",response)

                if(!response.data) return false;
                response.data.validFrom = new Date(response.data.validFrom)
                response.data.validUntil = new Date(response.data.validUntil)
                $scope.currentOffer = response.data
                $scope.isRunning = true


            }, function(response) {
                $log.debug("$scope.currentOffer fetch error",response)
            });

            function isRunning() {
                return $scope.currentOffer && $scope.currentOffer.validFrom <= new Date() && $scope.currentOffer.validUntil >= new Date()
            }

        }
    ]);
