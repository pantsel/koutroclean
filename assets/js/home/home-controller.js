angular.module('app.home', ['uiGmapgoogle-maps',])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/home/home.html',
        controller: 'HomeController as vm',
      });
  }])
  .controller('HomeController', ['$scope','InitializationService','DataService','$uibModal','$log','Notification',
    function($scope,InitializationService,DataService,$uibModal,$log,Notification) {

        $('<img/>').attr('src', '../images/bg_grass.jpg').on('load',function() {
            $(this).remove();

            $('.section-header').css('background', 'url(../images/bg_grass.jpg) no-repeat center center fixed');
            $('.section-header').css('-webkit-background-size', 'cover');
            $('.section-header').css('-moz-background-size', 'cover');
            $('.section-header').css('-o-background-size', 'cover');
            $('.section-header').css('background-size', 'cover');
            $('.init-hidden').css('display','block')
            $(".initialization-spinner-wrapper").hide()

            try{
                reveal()
            }catch(err){}




        });

        $scope.ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu nulla ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tempus orci vel enim elementum dignissim. Sed in velit orci. Suspendisse tempus ornare elit id eleifend...';


        $scope.setActiveService = function(service) {
            $scope.activeService = service;
        }


        DataService.getHome().then(function(response){
            $scope.home = response.data
        })




        DataService.getServices().then(function(response){
            $scope.services = response.data
            $scope.services.sort(function(a, b){
                return a.ordering - b.ordering;
            });
            $scope.activeService = $scope.services[0]
        })

        DataService.getPromotions().then(function(response){
            $scope.promotions = response.data
            $scope.promotions.sort(function(a, b){
                return a.ordering - b.ordering;
            });
        })



        if($scope.settings) {
            $scope.map = { center: { latitude: $scope.settings.addressLat, longitude: $scope.settings.addressLon }, zoom: 16 };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: $scope.settings.addressLat,
                    longitude: $scope.settings.addressLon
                },
                options: {
                    draggable: false,
                    icon:'/images/map-marker.png'
                }
            };
        }


        $scope.newsletter = {
            email : ''
        }

        $scope.saveEmail = function() {
            DataService.saveEmail($scope.newsletter.email).then(function(success){
                $scope.newsletter.email = ''
            },function(err){

            })
        }


        function reveal() {

            window.sr = ScrollReveal({duration:1000})
            sr.reveal('.section-header .title',{origin: 'left',distance : '50px'})
            sr.reveal('.section-header .sub-title',{origin: 'right',distance : '50px'})
            sr.reveal('.section-header .actions')
            sr.reveal('.section-header .building',{origin: 'bottom',distance : '50px'})
            sr.reveal('.section-header .current-offer')
            sr.reveal('.section-header .scroll-down')
            sr.reveal('.section-about-inner')
            sr.reveal('.social a',{origin: 'bottom'},70)
            sr.reveal('.section-services .container')
            sr.reveal('.section-current-offer .container-fluid')
            sr.reveal('.section-promotions .container')
            sr.reveal('.section-blog .container')
            sr.reveal('.blog-post',{origin: 'bottom',distance : '50px'},100)
            sr.reveal('.services-pic',{origin: 'right'})
            sr.reveal('.service-details .cntnt',{origin: 'left'})
        }

        $scope.openCurrentOfferModal = function(currentOffer) {

                $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/js/home/current-offer-modal.html',
                    controller: function($scope,$uibModalInstance,DataService,Notification,_currentOffer){
                        $scope.currentOffer = _currentOffer
                        $scope.contact = {
                            name : '',
                            phone: '',
                            hours: 'morning'
                        }

                        $log.debug(" $scope.currentOffer", $scope.currentOffer)

                        $scope.ok = function () {

                            $scope.errors = []

                            if(!$scope.contact.name || !$scope.contact.phone) {
                                if(!$scope.contact.name) $scope.errors.push('name')
                                if(!$scope.contact.phone) $scope.errors.push('phone')
                                Notification.error("Δεν έχετε συμπληρώσει τα απαραίτητα πεδία.")
                                return false;
                            }

                            $scope.submitting = true;

                            DataService.submitOfferInterest({
                                promotion : $scope.currentOffer,
                                contact : $scope.contact
                            }).then(function(success){
                                $scope.submitting = false;
                                $uibModalInstance.close();
                            }).catch(function(err){
                                $scope.submitting = false;
                            })

                        };

                        $scope.close = function () {
                            $uibModalInstance.close();

                        };

                    },
                    size: 'lg',
                    resolve: {
                        _currentOffer: function () {
                            return currentOffer;
                        }
                    }
                });
        }


        $scope.openPromotionModal = function(promotion) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/js/home/promotion-modal.html',
                controller: function($uibModalInstance,promotion){
                    var $ctrl = this
                    $ctrl.promotion = promotion

                    $ctrl.contact = {
                        name : '',
                        phone: '',
                        hours: 'morning'
                    }

                    $ctrl.ok = function () {

                        $ctrl.errors = []

                        if(!$ctrl.contact.name || !$ctrl.contact.phone) {
                            if(!$ctrl.contact.name) $ctrl.errors.push('name')
                            if(!$ctrl.contact.phone) $ctrl.errors.push('phone')
                            Notification.error("Δεν έχετε συμπληρώσει τα απαραίτητα πεδία.")
                            return false;
                        }

                        $ctrl.submitting = true;

                        DataService.submitOfferInterest({
                            promotion : $ctrl.promotion,
                            contact : $ctrl.contact
                        }).then(function(success){
                            $ctrl.submitting = false;
                            $uibModalInstance.close();
                        }).catch(function(err){
                            $ctrl.submitting = false;
                        })


                    };

                    $ctrl.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };


                },
                controllerAs: '$ctrl',
                size: 'md',
                resolve: {
                    promotion: function () {
                        return promotion;
                    }
                }
            });
        }


        $scope.contact = {}
        $scope.zipRegex = /(?!.*)/;
        $scope.submitContactForm = function(isValid) {

            if($scope.submittingContact || !isValid) return false;

            $scope.contactErrors = []
            if(!$scope.contact.name) {
                $scope.contactErrors.push('name')
            }
            if(!$scope.contact.email) {
                $scope.contactErrors.push('email')
            }

            if(!$scope.contact.phone) {
                $scope.contactErrors.push('phone')
            }

            if(!$scope.contact.text) {
                $scope.contactErrors.push('text')
            }

            if($scope.contactErrors.length) return false;

            $scope.submittingContact = true

            DataService.submitContactForm($scope.contact)
                .then(function(success){
                    $scope.contact = {}
                    $scope.contactErrors = []
                    $scope.submittingContact = false
                },function(err){
                    $scope.submittingContact = false
                })
        }




    }


  ]);
