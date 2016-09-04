angular.module('app.home', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/home/home.html',
        controller: 'HomeController as vm'
      });
  }])
  .controller('HomeController', ['$scope','InitializationService','DataService',
    function($scope,InitializationService,DataService) {

        $('<img/>').attr('src', '../images/bg_grass.jpg').load(function() {
            $(this).remove();

            $('.section-header').css('background', 'url(../images/bg_grass.jpg) no-repeat center center fixed');
            $('.section-header').css('-webkit-background-size', 'cover');
            $('.section-header').css('-moz-background-size', 'cover');
            $('.section-header').css('-o-background-size', 'cover');
            $('.section-header').css('background-size', 'cover');
            $('.init-hidden').css('display','block')
            $(".initialization-spinner-wrapper").hide()

            reveal()


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

        $scope.map = { center: { latitude: 38.000199, longitude: 23.772889 }, zoom: 16 };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 38.000199,
                longitude: 23.772889
            },
            options: {
                draggable: false,
                icon:'/images/map-marker.png'
            }
        };

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
            sr.reveal('.section-promotions .container')
            sr.reveal('.section-blog .container')
            sr.reveal('.blog-post',{origin: 'bottom',distance : '50px'},100)
            sr.reveal('.services-pic',{origin: 'right'})
            sr.reveal('.service-details .cntnt',{origin: 'left'})
        }








    }


  ]);
