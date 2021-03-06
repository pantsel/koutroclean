angular.module('app.ike',[
    'ngFileUpload',
    'ui.bootstrap.tabs'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/ike', {

                templateUrl: 'js/ike/ike.html',
                controller: 'IkeController',
                name : 'ike',
                resolve : {
                    init : function() {
                        $('.init-hidden').css('display','block')
                        return true
                    }
                }
            });
    }])
    .controller('IkeController', ['$scope', '$location','$document',
        function($scope, AuthService, $location, $document) {

            $scope.$location = $location

            $scope.details = [
                {
                    key : "Επωνυμία",
                    value : "BUILDING CLEANING AND GENERAL SERVICES ΙΔΙΩΤΙΚΗ ΚΕΦΑΛΑΙΟΥΧΙΚΗ ΕΤΑΙΡΕΙΑ"
                },
                {
                    key : "Διακρητικός τίτλος",
                    value : "BCGS Ι.Κ.Ε."
                },
                {
                    key : "Δραστηριότητα",
                    value : "ΔΙΑΧΕΙΡΙΣΗ ΚΑΙ ΕΞΥΠΗΡΕΤΗΣΗ ΚΤΙΡΙΩΝ"
                },
                {
                    key : "Α.Φ.Μ",
                    value : "800767968"
                },
                {
                    key : "Δ.Ο.Υ",
                    value : "ΙΓ Αθηνών"
                },
                {
                    key : "Αριθμός Γ.Ε.Μ.Η",
                    value : "140235203000"
                },
                {
                    key : "Διεύθυνση",
                    value : "Γιαννιτσών 15, Αθήνα"
                },
                {
                    key : "Τηλέφωνο",
                    value : "+030.211 2127 378"
                },
                {
                    key : "Email",
                    value : "<a href='mailto:bcgs.athens@gmail.com'>bcgs.athens@gmail.com</a>"
                },
            ]
        }
    ]);
