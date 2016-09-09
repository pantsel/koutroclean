angular.module('app.admin.profile',[])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/admin/profile', {
                templateUrl: 'js/admin-profile/admin-profile.html',
                controller : 'AdminProfileController',
                data: {
                    private: true
                }
            });
    }])
    .controller('AdminProfileController', ['$scope', 'AuthService', '$location','$document','InitializationService','DataService',
        function($scope, AuthService, $location, $document, InitializationService, DataService) {

            $scope.tinymceModel = null;

            $scope.tinymceOptions = {
                setup: function(editor) {
                    editor.on("init", function() {
                        //editor.execCommand("fontName", false, "Lato");
                        //this.getDoc().body.style.fontFamily = 'Lato';
                    });
                    editor.on("click", function() {

                    });
                },
                onChange: function(e) {
                    // put logic here for keypress and cut/paste changes
                },
                inline: false,
                plugins : 'advlist autolink link image lists charmap print preview',
                skin: 'lightgray',
                theme : 'modern'
            };

            DataService.getProfile().then(function(success){
                console.log("Retrieved profile!",success)
                $scope.tinymceModel = success.data
            })

            $scope.saveProfile = function() {
                DataService.upsertProfile({
                    profile : $scope.tinymceModel
                }).then(function(success){
                    console.info("Homepage Updated",success)
                })
            }
        }
    ]);
